import { useParams } from 'react-router-dom';
import makeDocument from '../../../../util/Document';
import Sidebar from '@_all/component/sibebar/sidebar';
import * as _ from './style';
import Notfound from '../../../Notfound/404';
import {getNoticeDetail} from '../../../../../api/notice/notice'
import { useEffect, useState } from 'react';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [doc1, SetData] = useState<any>();

  useEffect(() => {
    getNoticeDetail(id)
      .then((data) => {
        SetData(data);

      })
      .catch((err) => {
        // 에러 처리
      });
  }, []);
    if (id) {
      getNoticeDetail(Number(id))
        .then((data) => {
          SetData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log("게시물을 불러오는 데 실패했습니다.", err);
        });
    }
  }, [id]);

  let date = '';
  if (doc1?.createdAt) {
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

  return (
    <_.Wrapper>
      <Sidebar />
      <_.ContentArea>
        <_.Up>
          <_.Title>{doc1?.title || '제목 없음'}</_.Title>
          <_.date>{date}</_.date>
          <_.Subtitle>{doc1?.teacherName || '작성자 없음'}</_.Subtitle>
        </_.Up>
        <_.Body>
          {doc1?.content ? makeDocument(doc1.content) : '내용을 불러올 수 없습니다.'}
        </_.Body>
      </_.ContentArea>
    </_.Wrapper>
  );
}