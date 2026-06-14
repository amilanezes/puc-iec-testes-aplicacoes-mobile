// src/integration/MovieCardFav.tsx
//
// Card de filme JÁ IMPLEMENTADO e integrado ao store de favoritos.
// Diferente do MovieCard da Parte A (stub que você completa), este aqui
// é o ALVO dos testes de integração da Parte B — você só escreve os testes.
//
// Pontos de teste expostos via testID:
//   - movie-card-{id}        → o card inteiro (clicável → navega)
//   - movie-card-heart-{id}  → o botão de favoritar

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Movie } from '@/types/movie';
import type { RootStackParamList } from '@/routes/RootStack';
import { posterUrl } from '@/utils/poster-url';
import { useFavoritesStore } from '@/store/favoritesStore';

type Props = { movie: Movie };

export default function MovieCardFav({ movie }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFav = useFavoritesStore((s) => s.ids.includes(movie.id));
  const toggle = useFavoritesStore((s) => s.toggle);
  const poster = posterUrl(movie.poster_path, 'w185');

  return (
    <Pressable
      testID={`movie-card-${movie.id}`}
      onPress={() => navigation.navigate('Detail', { id: movie.id, title: movie.title })}
      style={styles.card}
    >
      {poster && <Image source={{ uri: poster }} style={styles.poster} />}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>⭐ {movie.vote_average.toFixed(1)}</Text>
      </View>

      <Pressable
        testID={`movie-card-heart-${movie.id}`}
        accessibilityRole="button"
        accessibilityLabel={isFav ? 'Remover favorito' : 'Adicionar favorito'}
        onPress={(e) => {
          e?.stopPropagation?.(); // fireEvent.press não passa evento — proteja
          toggle(movie.id);
        }}
        style={styles.heart}
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
  poster: { width: 60, height: 90, borderRadius: 4 },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', fontSize: 12 },
  heart: { padding: 8 },
  heartIcon: { fontSize: 24 },
});
