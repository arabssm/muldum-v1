import { useParams, useNavigate } from 'react-router-dom';
import * as _ from './style';
import NavBar from '../../sibebar/sidebar';
import Notfound from '@_notfound/NotFound';
import DeleteModal from '@_modal/Delete/DeleteModal';
import ConfirmDeleteModal from '@_modal/Notice/ConfirmDelete';
import makeDocument from './makeDocument';
import { getNoticeDetail, deleteNotice } from '../../../../api/notice/notice';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../../../atom/User';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc1, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getNoticeDetail(Number(id))
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error('게시물을 불러오는 데 실패했습니다.', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (!id) return;
    deleteNotice(Number(id))
      .then(() => {
        setShowModal(false);
        setShowConfirmModal(true);
      })
      .catch((err) => {
        console.error('게시물을 삭제하는 데 실패했습니다.', err);
      });
  };

  let date = '';
  if (doc1?.updatedAt) {
    const d = new Date(doc1.updatedAt);
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? '오후' : '오전';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    date = `등록일 ${Y}-${M}-${D}. ${ampm} ${h}:${m}`;
  }

  if (!isLoading && !doc1) return <Notfound />;

  return (
    <_.Container>
      <NavBar />
      <_.Wrapper>
        <_.PageTitle>{doc1?.title || ''}</_.PageTitle>

        <_.AdditionRow>
          <_.AdditionLeft>
            <_.Addition>{date || ''}</_.Addition>
            <_.Addition>작성자: 교사 {doc1?.teacher || ''}</_.Addition>
          </_.AdditionLeft>

          {user.userType === "TEACHER" && doc1 && (
            <_.ButtonGroup>
              <button onClick={() => setShowModal(true)}>삭제하기</button>
              <button onClick={() => navigate(`/notice/edit/${doc1.id}`)}>수정하기</button>
            </_.ButtonGroup>
          )}
        </_.AdditionRow>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {doc1?.files?.map((file: any, idx: number) => (
            <_.pic
              key={file.fileId ?? idx}
              src={`${file.url}`}
              alt={file.fileName}
              style={{ width: 300, borderRadius: 6 }}
            />
          ))}
        </div>

        {doc1?.image && <_.Image src={doc1.image} alt="notice" />}
        {doc1?.imageCaption && <_.ImageCaption>{doc1.imageCaption}</_.ImageCaption>}

        <_.Content>
          {doc1?.content ? makeDocument(doc1.content) : ''}
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