import React from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
    { name: "pizzas_sqlite.db", createFromLocation: 1, },
    () => console.debug("Connected succesfully"),
    (_, e) => console.error(e)
);

const INSERT_PIZZA = "INSERT INTO pizzas (size, dough, cheese, ingredients) VALUES(?, ?, ?, ?)";

const Confirmation = ({ route, navigation }) => {
    const { size, dough, cheese, selectedToppings } = route.params;

    const handleConfirmation = () => { 
        db.transaction((tx) => {
            tx.executeSql(INSERT_PIZZA, [size, dough, cheese, selectedToppings.join(', ')],
                (_, results) => {
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Operación Exitosa',
                            'Se ha agregado una nueva orden.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        navigation.push("Done", route.params);
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                    }
                },
                (_, error) => {
                    Alert.alert("Error", "No se pudo agregar la frase.");
                    console.error(error.message)
                })
        })
     };

    const renderItem = (topping) => {
        return (
            <Text style={{
                color: "#264653",
                fontSize: 16,
                marginBottom: 3
            }}>    • {topping.item}</Text>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirmar ingredientes</Text>
            <Text style={styles.text}>Tamaño: {size}</Text>
            <Text style={styles.text}>Masa: {dough}</Text>
            <Text style={styles.text}>Queso: {cheese}</Text>
            <Text style={styles.text}>Ingredientes:</Text>
            <FlatList
                data={selectedToppings}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                style={{ maxHeight: 150 }} />
            <TouchableOpacity
                style={[styles.button]}
                onPress={handleConfirmation}>
                <Text style={[styles.buttonText]}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    title: {
        color: "#264653",
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15
    },
    text: {
        color: "#264653",
        fontSize: 16,
        marginBottom: 7
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#264653',
    },
});

export default Confirmation;