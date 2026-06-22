// src/queries/movies/get-movie-by-id.ts
//
// Detalhe de 1 filme. COM token → TMDB real; SEM token → mock.

import { useQuery } from '@tanstack/react-query';
import { api, isTokenMissing } from '@/services/api';
import { getMovieByIdMock } from '@/mocks/movies';
import type { Movie } from '@/types/movie';

const fetchReal = async (id: number): Promise<Movie> => {
  const res = await api.get<Movie>(`/movie/${id}`);
  return res.data;
};

export const useMovieById = (id: number) =>
  useQuery<Movie | undefined>({
    queryKey: ['movie', id, isTokenMissing ? 'mock' : 'real'],
    queryFn: () => (isTokenMissing ? getMovieByIdMock(id) : fetchReal(id)),
    enabled: Number.isFinite(id),
  });
