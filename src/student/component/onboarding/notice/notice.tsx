import Header11 from './noticeHeader';
import Box from './box';
import * as _ from './style';
import { useEffect,useState } from 'react';
import getNotice from '@_api/notice/notice'
export default function Notice() {
  const [search, setSearch] = useState('');
  
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getNotice()
      .then((data) => {
        setPosts(data?.content || []);

      })
      .catch((err) => {
        // 에러 처리
      });
  }, []);
const filtered = posts.filter(n =>
  n.title.includes(search)
);
  return (
    <>
      <Header11 value={search} onChange={setSearch} />
      <_.BoxContainer>
        {filtered.map(notice => (
          <Box
            key={notice.id}
            idx={notice.id}
            title={notice.title}
            date={notice.createdAt}
          />
        ))}
      </_.BoxContainer>
    </>
  );
}
