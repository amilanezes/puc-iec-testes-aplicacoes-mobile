// src/screens/MovieList.tsx
//
// Tela inicial (após login): lista de filmes populares (mock).
// Header tem botões pra Busca e Favoritos.

import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';
import { usePopularMovies } from '@/queries/movies/get-popular-movies';
import MovieCard from '@/components/MovieCard';
import { testIDs } from '@/utils/testIDs';
import type { RootStackParamList } from '@/routes/RootStack';

export default function MovieList() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isLoading } = usePopularMovies();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerBtns}>
          <Pressable
            testID={testIDs.movieList.searchButton}
            accessibilityLabel="Buscar filmes"
            onPress={() => navigation.navigate('Search')}
            hitSlop={8}
          >
            <Text style={styles.headerIcon}>🔍</Text>
          </Pressable>
          <Pressable
            testID={testIDs.movieList.favoritesButton}
            accessibilityLabel="Ver favoritos"
            onPress={() => navigation.navigate('Favorites')}
            hitSlop={8}
          >
            <Text style={styles.headerIcon}>❤️</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View testID={testIDs.movieList.loading} style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View testID={testIDs.movieList.screen} style={styles.container}>
      <FlatList
        testID={testIDs.movieList.list}
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBtns: { flexDirection: 'row', gap: 16, paddingRight: 4 },
  headerIcon: { fontSize: 20 },
});
