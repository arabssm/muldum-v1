import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as _ from './style';
import NavBar from '../../../../all/component/sibebar/sidebar';
import NoticeSuccess from '@_modal/Notice/CreateNotice';
import '@_styles';
import useNoticeState from './useNoticeState';
import { saveFile, createNoticeGeneral, createNoticeGeneralno } from '../../../../api/notice/notice';

export default function CreateNotice() {
  const navigate = useNavigate();
  const [notice, setNotice] = useNoticeState();
  const [showModal, setShowModal] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const MinDate = `${year}-${month}-${day}`;
  const deadlineDate = getDeadlineDate(notice.startDate, notice.endDate);

  useEffect(() => {
    const createPreviews = async () => {
      const previews: string[] = await Promise.all(
        imageFiles.map(
          (file) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            }),
        ),
      );
      setPreviewUrls(previews);
    };
    if (imageFiles.length > 0) createPreviews();
  }, [imageFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };
  const isBeforeToday = (yyyyMMdd: string) => {
    if (!yyyyMMdd) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(yyyyMMdd);
    selected.setHours(0, 0, 0, 0);
    return selected < today;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "startDate" && isBeforeToday(value)) {
      alert("오늘 이후 날짜만 가능합니다.");
      setNotice(prev => ({ ...prev, startDate: "" }));
      return;
    }
    setNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotice((prev) => ({ ...prev, content: value }));
  };

  const insertTag = (tag: string) => {
    const openTag = `<${tag}>`;
    const closeTag = `</${tag}>`;
    const textarea = document.getElementById('notice-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const newValue = value.slice(0, start) + openTag + value.slice(start, end) + closeTag + value.slice(end);
    setNotice((prev) => ({ ...prev, content: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length + (end - start), start + openTag.length + (end - start));
    }, 0);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => [...prev, ...files]);

    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };
  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const urlToRevoke = prev[index];
      if (urlToRevoke?.startsWith('blob:')) URL.revokeObjectURL(urlToRevoke);
      return prev.filter((_, i) => i !== index);
    });
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) input.value = '';
  };
  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!notice.title.trim()) return alert('제목을 입력하세요.');
    if (!notice.content.trim()) return alert('내용을 입력하세요.');

    setIsSubmitting(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const url = await saveFile(file);
        uploadedUrls.push(url);
      }

      if (uploadedUrls.length === 0) {
        await createNoticeGeneralno(notice.title, notice.content, deadlineDate);
      } else {
        const filesPayload = uploadedUrls.map((url) => ({ url }));
        await createNoticeGeneral(notice.title, notice.content, filesPayload, deadlineDate);
      }

      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert('공지 등록 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => previewUrls.filter((u) => u.startsWith('blob:')).forEach(URL.revokeObjectURL);
  }, [previewUrls]);

  function getDeadlineDate(start: string, end: string): string {
    if (!start) return end || '';
    if (!end) return start || '';
    const s = new Date(start);
    const e = new Date(end);
    return s < e ? start : end;
  }

  return (
    <_.Container>
      <NavBar />
      <_.Wrapper>
        <_.PageTitle>공지사항 등록</_.PageTitle>
        <_.BoxGroup>
          <_.TextInput
            type="text"
            name="title"
            value={notice.title}
            onChange={handleChange}
            placeholder="공지사항의 제목을 등록하세요"
          />
          <_.TextInput
            type="date"
            name="startDate"
            value={notice.startDate}
            onChange={handleDateChange}
            min={MinDate}
          />
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
            placeholder="공지사항 내용을 입력하세요 (100자 이상)"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              alert('이미지는 업로드 버튼을 사용해주세요.');
            }}
          />

          <_.ChangeImg type="file" accept="image/*" id="image-upload" onChange={handleImageChange} />
          <_.Picture
            onClick={() => document.getElementById('image-upload')?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              alert('이미지는 클릭하여 업로드해주세요.');
            }}
          >
            이미지를 클릭하여 추가해주세요
          </_.Picture>

          {previewUrls.length > 0 && (
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                alert('이미지는 클릭하여 업로드해주세요.');
              }}
            >
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`미리보기 ${idx}`}
                  style={{ width: 120, borderRadius: 6, cursor: 'pointer' }}
                  onClick={() => handleRemoveImage(idx)}
                  onDragStart={(e) => e.preventDefault()}
                />
              ))}
            </div>
          )}

          <_.EnrollButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </_.EnrollButton>
        </_.BoxGroup>
      </_.Wrapper>

      {showModal && (
        <NoticeSuccess
          onClose={() => {
            setShowModal(false);
            navigate('/notice');
          }}
        />
      )}
    </_.Container>
  );
}
