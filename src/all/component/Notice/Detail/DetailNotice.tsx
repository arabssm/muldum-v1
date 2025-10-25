  import { useParams, useNavigate } from 'react-router-dom';
  import * as _ from './style';
  import DeleteModal from '@_modal/Delete/DeleteModal';
  import Back from '@_assets/arrow.svg';
  import ConfirmDeleteModal from '@_modal/Notice/ConfirmDelete';
  import makeDocument from './makeDocument';
  import { getNoticeDetail, deleteNotice } from '../../../../api/notice/notice';
  import { useEffect, useState } from 'react';
  import { useUserStore } from '../../../../atom/User';
  import { GetUser } from '../../../../api/user/data';
  import Loading from '@_all/component/loading/loading';

  export default function Detail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [doc1, setData] = useState<any>();
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { user, isLoading: userLoading } = useUserStore();

    useEffect(() => {
      const fetchUserData = async () => {
        if (!user) {
          try {
            await GetUser();
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }
      };

      fetchUserData();
    }, [user]);

    useEffect(() => {
      if (!id) return;
      getNoticeDetail(Number(id))
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.error('게시물을 불러오는 데 실패했습니다.', err);
        });
    }, [id]);

    if (!doc1 || userLoading) return <Loading />;

    let date = '';
    if (doc1.updatedAt) {
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
    } else {
      date = '등록일 정보를 불러올 수 없습니다.';
    }

    let deadlineText = '';
    if (doc1.deadlineDate) {
      const deadline = new Date(doc1.deadlineDate);
      const Y = deadline.getFullYear();
      const M = String(deadline.getMonth() + 1).padStart(2, '0');
      const D = String(deadline.getDate()).padStart(2, '0');
      deadlineText = `마감일 ${Y}-${M}-${D}`;
    }

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

    return (
      <>
        <_.Wrapper>
          <_.Back src={Back} alt="뒤로가기" onClick={() => navigate(-1)} />
          <_.PageTitle>{doc1.title}</_.PageTitle>
          <_.AdditionRow>
            <_.AdditionLeft>
              <_.Addition>{date}</_.Addition>
              <_.Addition>작성자: 교사 {doc1.teacher || '알 수 없음'}</_.Addition>
              {deadlineText && <_.Addition>{deadlineText}</_.Addition>}
            </_.AdditionLeft>
            {user && user.userType === "TEACHER" && (
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

          {doc1.image && <_.Image src={doc1.image} alt="notice" />}
          {doc1.imageCaption && <_.ImageCaption>{doc1.imageCaption}</_.ImageCaption>}
          <_.Content>
            {doc1?.content ? makeDocument(doc1.content) : '내용을 불러올 수 없습니다.'}
          </_.Content>
        </_.Wrapper>

        {showModal && (
          <DeleteModal
            onCancel={() => setShowModal(false)}
            onConfirm={handleDelete}
            name={doc1.title}
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
      </>
    );
  }
