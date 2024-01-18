import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsersListPage = ({ route }) => {
  const { users } = route.params;

  return (
    <View style={styles.container}>
      {/* Updated header styles for full-width background */}
      <View style={styles.header}>
        <Text style={styles.title}>Users in Server</Text>
      </View>

      {users.map((user, index) => (
        <View key={index} style={styles.userContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userId}>{user.id}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  // Updated styles for the header to achieve full-width background
  header: {
    backgroundColor: '#ff6f61',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  userId: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,

  },
});

export default UsersListPage;