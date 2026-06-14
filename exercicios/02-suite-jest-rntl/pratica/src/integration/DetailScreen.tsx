// src/integration/DetailScreen.tsx
//
// Tela de detalhe SIMPLES (só pros testes de navegação da Parte B).
// Não busca dados — recebe o título por params. Mantém o teste de
// navegação self-contained (sem precisar mockar uma segunda query).

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '@/routes/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { title } = route.params;
  return (
    <View testID="detail-screen" style={styles.container}>
      <Text style={styles.label}>Detalhes do filme</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  label: { fontSize: 14, color: '#666' },
  title: { fontSize: 22, fontWeight: 'bold' },
});
