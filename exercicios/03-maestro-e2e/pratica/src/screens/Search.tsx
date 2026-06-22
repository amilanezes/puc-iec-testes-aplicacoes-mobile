// src/screens/Search.tsx
//
// Busca de filmes por título (filtra o mock).
// Alvo de E2E: parametrização via env (`SEARCH_TERM`) — o flow digita um termo vindo de env.

import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSearchMovies } from '@/queries/movies/search-movies';
import { posterUrl } from '@/utils/poster-url';
import { testIDs } from '@/utils/testIDs';
import type { RootStackParamList } from '@/routes/RootStack';
import { Image } from 'react-native';

export default function Search() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearchMovies(query);

  const showEmpty = query.trim().length >= 2 && !isLoading && (data?.length ?? 0) === 0;

  return (
    <View testID={testIDs.search.screen} style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          testID={testIDs.search.input}
          accessibilityLabel="Campo de busca"
          placeholder="Buscar filme..."
          value={query}
          onChangeText={setQuery}
          autoFocus
          style={styles.input}
        />
        {query.length > 0 && (
          <Pressable
            testID={testIDs.search.clear}
            accessibilityLabel="Limpar busca"
            onPress={() => setQuery('')}
            hitSlop={8}
          >
            <Text style={styles.clear}>✕</Text>
          </Pressable>
        )}
      </View>

      {isLoading && <ActivityIndicator style={styles.loading} />}

      {showEmpty && (
        <Text testID={testIDs.search.empty} style={styles.empty}>
          Nenhum filme encontrado para "{query}"
        </Text>
      )}

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const poster = posterUrl(item.poster_path, 'w185');
          return (
            <Pressable
              testID={testIDs.search.result(item.id)}
              accessibilityLabel={`Resultado ${item.title}`}
              onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })}
              style={styles.result}
            >
              {poster && <Image source={{ uri: poster }} style={styles.poster} />}
              <Text style={styles.resultTitle}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 8 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  clear: { fontSize: 18, color: '#999', padding: 4 },
  loading: { marginTop: 16 },
  empty: { color: '#666', marginTop: 16, textAlign: 'center' },
  result: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  poster: { width: 40, height: 60, borderRadius: 4, backgroundColor: '#eee' },
  resultTitle: { fontSize: 16, flex: 1 },
});
