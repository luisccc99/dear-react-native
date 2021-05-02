import React from 'react';
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native';

const App = () => {
  const [name, onChangeName] = React.useState(null);
  const message = "El único modo de hacer un gran trabajo es amar lo que haces";
  const authorMessage = "Steve Jobs";
  return (
    <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          onChangeText={onChangeName}
          value={name} />
        <Button
          title="Hola?"
          color="darkorange"
          onPress={() => Alert.alert(name, `${message}\n- ${authorMessage}`)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 25
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginBottom: 10
  },
});

export default App;