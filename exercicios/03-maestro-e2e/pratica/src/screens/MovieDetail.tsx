// src/screens/MovieDetail.tsx
//
// Detalhe do filme. Botão de favoritar (sincroniza com a lista e com Favoritos).

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMovieById } from '@/queries/movies/get-movie-by-id';
import { posterUrl } from '@/utils/poster-url';
import { useFavoritesStore } from '@/store/favoritesStore';
import { testIDs } from '@/utils/testIDs';
import type { RootStackParamList } from '@/routes/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function MovieDetail({ route, navigation }: Props) {
  const { id } = route.params;
  const { data, isLoading } = useMovieById(id);

  const isFav = useFavoritesStore((s) => s.isFavorite(id));
  const toggle = useFavoritesStore((s) => s.toggle);

  if (isLoading) return <ActivityIndicator style={styles.center} />;
  if (!data) return <Text style={styles.center}>Filme não encontrado</Text>;

  const poster = posterUrl(data.poster_path, 'w500');

  return (
    <ScrollView testID={testIDs.movieDetail.screen} contentContainerStyle={styles.container}>
      <Pressable
        testID={testIDs.movieDetail.back}
        accessibilityLabel="Voltar"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Voltar</Text>
      </Pressable>

      {poster && <Image source={{ uri: poster }} style={styles.poster} />}

      <View style={styles.headerRow}>
        <Text testID={testIDs.movieDetail.title} style={styles.title}>
          {data.title}
        </Text>
        <Pressable
          testID={testIDs.movieDetail.favoriteButton}
          accessibilityLabel={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onPress={() => toggle(id)}
          style={styles.favBtn}
          hitSlop={8}
        >
          <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>

      <Text style={styles.meta}>
        ⭐ {data.vote_average.toFixed(1)} · {data.release_date}
      </Text>
      <Text style={styles.overview}>{data.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  backText: { fontSize: 15, color: '#0066cc', fontWeight: '500' },
  poster: { width: 200, height: 300, alignSelf: 'center', borderRadius: 8, backgroundColor: '#eee' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', flex: 1 },
  favBtn: { padding: 8 },
  favIcon: { fontSize: 28 },
  meta: { color: '#666' },
  overview: { fontSize: 14, lineHeight: 20 },
});
