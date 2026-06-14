// src/integration/MovieListScreen.tsx
//
// Tela de lista JÁ IMPLEMENTADA (versão completa do MovieList stub da Parte A).
// Busca filmes populares (TanStack Query) e mostra um contador de favoritos
// no header. É o alvo dos testes de integração da Parte B.
//
// Pontos de teste expostos via testID:
//   - favorites-count → texto do contador no header (ex.: "♥ 1")

import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { usePopularMovies } from '@/queries/movies/get-popular-movies';
import { useFavoritesStore } from '@/store/favoritesStore';
import MovieCardFav from './MovieCardFav';

export default function MovieListScreen() {
  const { data, isLoading, error } = usePopularMovies();
  const count = useFavoritesStore((s) => s.ids.length);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filmes</Text>
        <View style={styles.counter}>
          <Text style={styles.heart}>♥</Text>
          {/* só o número no testID → toHaveTextContent('1') casa exato */}
          <Text testID="favorites-count" style={styles.count}>
            {count}
          </Text>
        </View>
      </View>
      <FlatList
        data={data?.results ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCardFav movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heart: { fontSize: 18, color: '#C2410C' },
  count: { fontSize: 18, color: '#C2410C', fontWeight: '600' },
});
