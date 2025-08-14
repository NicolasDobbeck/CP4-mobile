import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Erro ao carregar usuários</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <Button title="Tentar novamente" onPress={refetch} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Usuários</Text>
        <Button
          title={isFetching ? "Atualizando..." : "Atualizar lista"}
          onPress={refetch}
          disabled={isFetching}
          color="#187f0f"
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isFetching}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>Email: {item.email}</Text>
            <Text style={styles.info}>Cidade: {item.address.city}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#9cbd8b'
  },
    center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D9534F',
    marginBottom: 8
  },
  errorMessage: {
    color: '#555',
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },
  info: {
    fontSize: 14,
    color: '#555'
  }
});
