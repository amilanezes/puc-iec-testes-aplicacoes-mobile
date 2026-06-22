// src/queries/movies/get-popular-movies.ts
//
// Lista de filmes populares. COM token → TMDB real; SEM token → mock determinístico.

import { useQuery } from '@tanstack/react-query';
import { api, isTokenMissing } from '@/services/api';
import { getPopularMoviesMock } from '@/mocks/movies';
import type { Movie, MoviesResponse } from '@/types/movie';

const fetchReal = async (): Promise<Movie[]> => {
  const res = await api.get<MoviesResponse>('/movie/popular', { params: { page: 1 } });
  return res.data.results;
};

export const usePopularMovies = () =>
  useQuery<Movie[]>({
    queryKey: ['movies', 'popular', isTokenMissing ? 'mock' : 'real'],
    queryFn: () => (isTokenMissing ? getPopularMoviesMock() : fetchReal()),
    staleTime: 1000 * 60 * 5,
  });
