import { useQuery } from '@tanstack/react-query';

const fetchAvailableStations = async () => {
  try {
    const END_POINT = `http://localhost:3000/available/stations`;
    const url = `${END_POINT}`;
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
