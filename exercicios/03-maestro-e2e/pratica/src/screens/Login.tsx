// src/screens/Login.tsx
//
// Porta de entrada do app. Enquanto não logado, o RootStack mostra esta tela.
// Mock: email com "@" + senha 4+ chars autentica.
//
// Alvo de E2E: conditional flow (logar só se a tela aparecer) + fragment reutilizável.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { testIDs } from '@/utils/testIDs';

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = () => {
    const ok = login(email, password);
    setError(!ok);
  };

  return (
    <View testID={testIDs.login.screen} style={styles.container}>
      <Text style={styles.title}>🎬 CineFav</Text>
      <Text style={styles.subtitle}>Entre pra ver os filmes</Text>

      <TextInput
        testID={testIDs.login.emailInput}
        accessibilityLabel="Email"
        placeholder="email@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        testID={testIDs.login.passwordInput}
        accessibilityLabel="Senha"
        placeholder="senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {error && (
        <Text testID={testIDs.login.error} style={styles.error}>
          Email ou senha inválidos
        </Text>
      )}

      <Pressable
        testID={testIDs.login.submit}
        accessibilityLabel="Entrar"
        onPress={onSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: { color: '#cc0000', fontSize: 13 },
  button: {
    backgroundColor: '#0066cc',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
