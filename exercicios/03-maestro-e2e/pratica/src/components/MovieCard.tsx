// src/components/MovieCard.tsx
//
// Card de filme — usado na lista. Implementado e instrumentado com testID.
// O coração favorita/desfavorita via favoritesStore (mesma store testada na A2).

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Movie } from '@/types/movie';
import { posterUrl } from '@/utils/poster-url';
import { useFavoritesStore } from '@/store/favoritesStore';
import { testIDs } from '@/utils/testIDs';
import type { RootStackParamList } from '@/routes/RootStack';

type Props = { movie: Movie };

export default function MovieCard({ movie }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const poster = posterUrl(movie.poster_path, 'w185');

  const isFav = useFavoritesStore((s) => s.isFavorite(movie.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Pressable
      testID={testIDs.movieCard.card(movie.id)}
      accessibilityLabel={`Filme ${movie.title}`}
      onPress={() => navigation.navigate('Detail', { id: movie.id, title: movie.title })}
      style={styles.card}
    >
      {poster && <Image source={{ uri: poster }} style={styles.poster} />}
      <View style={styles.info}>
        <Text testID={testIDs.movieCard.title(movie.id)} style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>⭐ {movie.vote_average.toFixed(1)}</Text>
      </View>

      <Pressable
        testID={testIDs.movieCard.heart(movie.id)}
        accessibilityLabel={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        onPress={(e) => {
          e.stopPropagation();
          toggle(movie.id);
        }}
        style={styles.heart}
        hitSlop={8}
      >
        <Text style={styles.heartIcon}>{isFav ? '❤️' : '🤍'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  poster: { width: 60, height: 90, borderRadius: 4, backgroundColor: '#eee' },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', fontSize: 12 },
  heart: { padding: 8 },
  heartIcon: { fontSize: 24 },
});
