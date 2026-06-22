// src/screens/Favorites.tsx
//
// Lista de filmes favoritados (lê favoritesStore).
// Alvo de E2E: asserção cross-tela — favoritou na lista → aparece aqui; contador atualiza.

import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavoritesStore } from '@/store/favoritesStore';
import { MOCK_MOVIES } from '@/mocks/movies';
import { posterUrl } from '@/utils/poster-url';
import { testIDs } from '@/utils/testIDs';
import type { RootStackParamList } from '@/routes/RootStack';

export default function Favorites() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const ids = useFavoritesStore((s) => s.ids);
  const remove = useFavoritesStore((s) => s.remove);

  const movies = MOCK_MOVIES.filter((m) => ids.includes(m.id));

  return (
    <View testID={testIDs.favorites.screen} style={styles.container}>
      <Text testID={testIDs.favorites.count} style={styles.count}>
        {movies.length} {movies.length === 1 ? 'favorito' : 'favoritos'}
      </Text>

      {movies.length === 0 ? (
        <Text testID={testIDs.favorites.empty} style={styles.empty}>
          Você ainda não favoritou nenhum filme.
        </Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            const poster = posterUrl(item.poster_path, 'w185');
            return (
              <View testID={testIDs.favorites.item(item.id)} style={styles.item}>
                <Pressable
                  style={styles.itemMain}
                  accessibilityLabel={`Favorito ${item.title}`}
                  onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })}
                >
                  {poster && <Image source={{ uri: poster }} style={styles.poster} />}
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </Pressable>
                <Pressable
                  testID={testIDs.favorites.removeItem(item.id)}
                  accessibilityLabel={`Remover ${item.title} dos favoritos`}
                  onPress={() => remove(item.id)}
                  hitSlop={8}
                >
                  <Text style={styles.remove}>🗑️</Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 8 },
  count: { fontSize: 14, color: '#666', fontWeight: '600' },
  empty: { color: '#666', marginTop: 24, textAlign: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  itemMain: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  poster: { width: 40, height: 60, borderRadius: 4, backgroundColor: '#eee' },
  itemTitle: { fontSize: 16, flex: 1 },
  remove: { fontSize: 20, padding: 4 },
});
