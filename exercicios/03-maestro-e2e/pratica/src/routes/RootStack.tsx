// src/routes/RootStack.tsx
//
// Navegação do app. Login é o "porteiro": sem auth, só a tela de Login existe.
// Depois de logar: Home (lista) → Detail / Search / Favorites.

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store/authStore';
import Login from '@/screens/Login';
import MovieList from '@/screens/MovieList';
import MovieDetail from '@/screens/MovieDetail';
import Search from '@/screens/Search';
import Favorites from '@/screens/Favorites';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { id: number; title: string };
  Search: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Home" component={MovieList} options={{ title: 'Filmes' }} />
          <Stack.Screen
            name="Detail"
            component={MovieDetail}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen name="Search" component={Search} options={{ title: 'Buscar' }} />
          <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favoritos' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
