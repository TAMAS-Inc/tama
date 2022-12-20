import { useQuery } from '@tanstack/react-query';

export interface NoticeInfo {
  noticeId: string;
  title: string;
  content: string;
}

type FetchNotice = () => Promise<NoticeInfo[]>;

const fetchNotice: FetchNotice = async () => {
  try {
    const url = `${import.meta.env.VITE_END_POINT}/notice/all`;

    const res = await fetch(url);
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
