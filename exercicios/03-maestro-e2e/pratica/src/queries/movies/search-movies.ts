// src/queries/movies/search-movies.ts
//
// Busca de filmes por título. COM token → TMDB real; SEM token → filtra o mock.

import { useQuery } from '@tanstack/react-query';
import { api, isTokenMissing } from '@/services/api';
import { searchMoviesMock } from '@/mocks/movies';
import type { Movie, MoviesResponse } from '@/types/movie';

const fetchReal = async (query: string): Promise<Movie[]> => {
  const res = await api.get<MoviesResponse>('/search/movie', { params: { query } });
  return res.data.results;
};

export const useSearchMovies = (query: string) =>
  useQuery<Movie[]>({
    queryKey: ['movies', 'search', query, isTokenMissing ? 'mock' : 'real'],
    queryFn: () => (isTokenMissing ? searchMoviesMock(query) : fetchReal(query)),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 30,
  });
