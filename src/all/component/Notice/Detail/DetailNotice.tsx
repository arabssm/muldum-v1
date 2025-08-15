import { useParams, useNavigate } from 'react-router-dom';
import * as _ from './style';
import NavBar from '../../sibebar/sidebar';
import Notfound from '@_notfound/NotFound';
import DeleteModal from '@_modal/Delete/DeleteModal';
import ConfirmDeleteModal from '@_modal/Notice/ConfirmDelete';
import makeDocument from './makeDocument';
import { getNoticeDetail,DeleteNotice,Deletefile } from '../../../../api/notice/notice';
import { useEffect, useState } from 'react';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc1, setData] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getNoticeDetail(id)
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log('게시물을 불러오는 데 실패했습니다.', err);
      });
  }, [id]);

  if (!doc1) return <Notfound />;
  let date = '';
  if (doc1.createdAt) {
    const d = new Date(doc1.createdAt);
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? '오후' : '오전';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    date = `등록일 ${Y}-${M}-${D}. ${ampm} ${h}:${m}`;
  } else {
    date = '등록일 정보를 불러올 수 없습니다.';
  }


  const handleDelete = () => {
    if (doc1?.files) {
      for (const { fileId } of doc1.files) {
        Deletefile(fileId);
      }
    }
    DeleteNotice(id)
    .then((data) => {
      setData(data);
      console.log(data);
    })
    .catch((err) => {
      console.log('게시물을 삭제하는데 실패했습니다.', err);
    });
    setShowModal(false);
    setShowConfirmModal(true);
  };

  return (
    <_.Container>
      <NavBar />
      <_.Wrapper>
        <_.PageTitle>{doc1.title}</_.PageTitle>
        <_.AdditionRow>
          <_.AdditionLeft>
            <_.Addition>{date}</_.Addition>
            <_.Addition>작성자: 교사 {doc1.teacherName || '알 수 없음'}</_.Addition>
          </_.AdditionLeft>
          {role==="TEACHER"&&
          <_.ButtonGroup>
            <button onClick={() => setShowModal(true)}>삭제하기</button>
            <button onClick={() => navigate(`/notice/edit/${doc1.id}`)}>수정하기</button>
          </_.ButtonGroup>
        }
        </_.AdditionRow>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {doc1?.files?.map((file, idx) => (
                <_.pic
                  key={file.fileId ?? idx}
                  src={`${import.meta.env.VITE_API_URL}${file.filePath}`}
                  alt={file.fileName}
                  style={{ width: 300, borderRadius: 6 }}
                />
              ))}

      </div>
        {doc1.image && <_.Image src={doc1.image} alt="notice" />}
        {doc1.imageCaption && <_.ImageCaption>{doc1.imageCaption}</_.ImageCaption>}
        <_.Content>
            {doc1?.content ? makeDocument(doc1.content) : '내용을 불러올 수 없습니다.'}
        </_.Content>
      </_.Wrapper>
      <_.BackButton onClick={() => navigate(-1)}>이전</_.BackButton>
      {showModal && (
        <DeleteModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
      
      {showConfirmModal && (
        <ConfirmDeleteModal
          onClose={() => {
            setShowConfirmModal(false);
            navigate('/notice');
          }}
        />
      )}
    </_.Container>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as _ from './style';
import NavBar from '../../../../../all/component/sibebar/sidebar';
import EditSuccess from '@_modal/Notice/EditSuccess';
import {
  getNoticeDetail,
  modifynotice,
  modifynotice1,
  savefile,
} from '../../../../../api/notice/notice';
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
          setServerUrls(data.files.map(f => f.filePath));
        }
      } catch (err) {
        console.error('공지 불러오기 실패', err);
      }
    })();
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotice(prev => prev && ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotice(prev => prev && ({ ...prev, content: e.target.value }));
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
  };

  useEffect(() => () => {
    localBlobUrls.forEach(u => URL.revokeObjectURL(u));
  }, [localBlobUrls]);

  const handleSubmit = async () => {
    if (isSubmitting || !notice) return;
    setIsSubmitting(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of localFiles) {
        const { fileUrl } = await savefile(file); 
        uploadedUrls.push(fileUrl.replace(import.meta.env.VITE_API_URL as string, ''));
      }
      const allUrls = [...serverUrls, ...uploadedUrls];
      const filesPayload = allUrls.map(url => ({ url }));

      if (notice.teamId) {
        await modifynotice(
          id,
          notice.title,
          notice.content,
          filesPayload,
          notice.teacher,
          notice.teacherId,
          'TEAM',
          notice.team_id,
        );
      } else {
        await modifynotice1(
          id,
          notice.title,
          notice.content,
          filesPayload,
          'GENERAL',
          notice.teacher,
        );
      }
      setShowModal(true);
    } catch (err) {
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
          <_.TextInput name="team_id" value={notice.teamId} onChange={handleChange} placeholder="팀 ID" />

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
                  key={`sv-${i}`}
                  src={`${import.meta.env.VITE_API_URL}${p}`}
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


