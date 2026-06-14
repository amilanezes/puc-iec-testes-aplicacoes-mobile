// src/integration/AppNavigator.tsx
//
// Navegador JÁ IMPLEMENTADO (Home = lista, Detail = detalhe) embrulhado
// em NavigationContainer. Reutilizável nos testes de integração de navegação
// da Parte B — o teste só renderiza <AppNavigator /> e dispara os toques.

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/routes/RootStack';
import MovieListScreen from './MovieListScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MovieListScreen} options={{ title: 'Filmes' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhe' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
