import { useState } from 'react';
import { Notice } from './type';

const useNoticeState = (): [Notice, React.Dispatch<React.SetStateAction<Notice>>] => {
  const [notice, setNotice] = useState<Notice>({
    title: '',
    content: '',
    teacher: '',
    teacherId: 0,
    team_ids: [],
    startDate: '',
    endDate: '',
  });
  return [notice, setNotice];
};

export default useNoticeState;
