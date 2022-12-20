import { useQuery } from '@tanstack/react-query';

const fetchAvailableStations = async () => {
  try {
    const url = `${import.meta.env.VITE_END_POINT}/available/stations`;
    const response = await fetch(url);

    return response.json() as unknown as Station[];
  } catch {
    return [];
  }
};

export const useAvailableStations = () => {
  const query = useQuery<Station[]>({
    queryKey: ['availableStations'],
    queryFn: async () => fetchAvailableStations(),
  });

  return query;
};
