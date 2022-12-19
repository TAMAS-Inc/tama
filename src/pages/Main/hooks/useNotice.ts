import { useQuery } from '@tanstack/react-query';

export interface NoticeInfo {
  noticeId: string;
  title: string;
  content: string;
}

type FetchNotice = () => Promise<NoticeInfo[]>;

const fetchNotice: FetchNotice = async () => {
  try {
    const END_POINT = 'http://localhost:3000/notice/all';
    const URL = `${END_POINT}`;

    const res = await fetch(URL);
    return res.json() as unknown as NoticeInfo[];
  } catch {
    throw new Error('Notice fetch error');
  }
};

export const useNotice = () => {
  const query = useQuery<NoticeInfo[]>({
    queryKey: ['notice'],
    queryFn: async () => fetchNotice(),
  });

  return query;
};
