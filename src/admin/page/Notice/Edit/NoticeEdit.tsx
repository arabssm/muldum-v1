import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as _ from './style';
import NavBar from '../../../../all/component/sibebar/sidebar';
import EditSuccess from '@_modal/Notice/EditSuccess';
import {
  getNoticeDetail,
  updateNotice,
  saveFile
} from '../../../../api/notice/notice';
import { Notice } from './type';

export default function NoticeEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [notice, setNotice] = useState<Notice | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serverUrls, setServerUrls] = useState<string[]>([]);
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [localBlobUrls, setLocalBlobUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getNoticeDetail(Number(id));
        setNotice(data);
        if (data.files?.length) {
          setServerUrls(data.files.map((f: { url: string }) => f.url));
        }
      } catch (err) {
        console.error('공지 불러오기 실패', err);
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotice(prev => prev && { ...prev, [name]: value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotice(prev => prev && { ...prev, content: e.target.value });
  };

  const insertTag = (tag: string) => {
    if (!notice) return;
    const textarea = document.getElementById('notice-content') as HTMLTextAreaElement;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end, value } = textarea;
    const open = `<${tag}>`;
    const close = `</${tag}>`;
    const newContent = value.slice(0, start) + open + value.slice(start, end) + close + value.slice(end);
    setNotice({ ...notice, content: newContent });
    setTimeout(() => {
      textarea.focus();
      const pos = start + open.length + (end - start);
      textarea.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setLocalFiles(prev => [...prev, ...files]);
    const blobs = files.map(f => URL.createObjectURL(f));
    setLocalBlobUrls(prev => [...prev, ...blobs]);
  };

  const removeServerImage = (idx: number) => setServerUrls(prev => prev.filter((_, i) => i !== idx));
  const removeLocalImage = (idx: number) => {
    setLocalFiles(prev => prev.filter((_, i) => i !== idx));
    setLocalBlobUrls(prev => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
         const input = document.getElementById('image-upload') as HTMLInputElement;
     if (input) input.value = '';
  };

  useEffect(() => {
    return () => localBlobUrls.forEach(u => URL.revokeObjectURL(u));
  }, [localBlobUrls]);

  const handleSubmit = async () => {
  if (isSubmitting || !notice || !id) return;
  setIsSubmitting(true);

  try {
    let allUrls: string[] = [...serverUrls];
    if (localFiles.length > 0) {
      const uploadedUrls: string[] = [];
      for (const file of localFiles) {
        const { url } = await saveFile(file);
        uploadedUrls.push(url);
      }
      allUrls.map(url => ({ url }));
    }

    const patchData: any = {
      title: notice.title,
      content: notice.content,
      deadlineDate: notice.deadlineDate,
    };

    // 이미지가 있으면 files 추가
    if (allUrls.length > 0) {
      patchData.files = allUrls.map(url => ({ url }));
    }

    await updateNotice(Number(id), patchData);
    setShowModal(true);
  } catch (err) {
    console.error('공지 수정 실패', err);
    alert('공지 수정 실패');
  } finally {
    setIsSubmitting(false);
  }
};



  if (!notice) return null;

  return (
    <_.Container>
      <NavBar />
      <_.Wrapper>
        <_.PageTitle>공지사항 수정</_.PageTitle>
        <_.BoxGroup>
          <_.TextInput name="title" value={notice.title} onChange={handleChange} placeholder="공지 제목" />

          <_.TagBox>
            <_.TagButton onClick={() => insertTag('제목1')}>h1</_.TagButton>
            <_.TagButton onClick={() => insertTag('제목2')}>h2</_.TagButton>
            <_.TagButton onClick={() => insertTag('제목3')}>h3</_.TagButton>
            <_.TagButton onClick={() => insertTag('제목4')}>h4</_.TagButton>
            <_.TagButton onClick={() => insertTag('강조')}>B</_.TagButton>
          </_.TagBox>

          <_.Textarea
            id="notice-content"
            value={notice.content}
            onChange={handleContentChange}
            placeholder="공지 내용을 입력하세요"
          />

          <_.ChangeImg type="file" accept="image/*" multiple onChange={handleFilesChange} id="image-upload" />
          <_.Picture onClick={() => document.getElementById('image-upload')?.click()}>
            이미지를 클릭하여 추가해주세요
          </_.Picture>

          {serverUrls.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {serverUrls.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  style={{ width: 120, borderRadius: 6, cursor: 'pointer' }}
                  onClick={() => removeServerImage(i)}
                />
              ))}
            </div>
          )}


          {localBlobUrls.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {localBlobUrls.map((u, i) => (
                <img
                  key={`lc-${i}`}
                  src={u}
                  style={{ width: 120, borderRadius: 6, cursor: 'pointer' }}
                  onClick={() => removeLocalImage(i)}
                />
              ))}
            </div>
          )}

          <_.EnrollButton disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? '수정 중…' : '수정하기'}
          </_.EnrollButton>
        </_.BoxGroup>
      </_.Wrapper>

      {showModal && (
        <EditSuccess
          onClose={() => {
            setShowModal(false);
            navigate('/notice');
          }}
        />
      )}
    </_.Container>
  );
}