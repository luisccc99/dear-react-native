import React, { useCallback, useState } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TOPPINGS = [
    { name: "Jamón" },
    { name: "Pepperoni" },
    { name: "Pavo" },
    { name: "Salchicha" },
    { name: "Aceituna" },
    { name: "Cebolla" },
    { name: "Pimiento" },
    { name: "Piña" },
    { name: "Anchoa" },
];

const ToppingSelection = ({ route, navigation }) => {
    const [selectedToppings, setSelectedToppings] = useState([]);

    const handleToppingSelection = useCallback((value, item) => {
        if (value) {
            setSelectedToppings(toppings => [...toppings, item.name]);
        } else {
            setSelectedToppings(toppings => toppings.filter(selectedTopping => {
                return selectedTopping !== item.name;
            }));
        }
    }, []);

    const handlePizzaSubmit = useCallback(() => {
        if (selectedToppings.length > 0 && selectedToppings.length <= 5) {
            const pizza = {
                ...route.params,
                selectedToppings
            };
            navigation.navigate("Confirmation", pizza);
        } else {
            Alert.alert(
                "Error",
                "Selecciona entre 1 o 5 ingredientes."
            );
        }
    }, [selectedToppings]);

    const renderItem = ({ item }) => {
        return (
            <BouncyCheckbox
                size={25}
                fillColor="#2A9D8F"
                unfillColor="#FFFFFF"
                text={item.name}
                textStyle={{ color: "#264653", textDecorationLine: 'none' }}
                style={[styles.checkbox]}
                iconStyle={{ borderColor: "#2A9D8F" }}
                onPress={(isChecked) => handleToppingSelection(isChecked, item)}
            />);
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                Selecciona 1 a 5 ingredientes:
            </Text>

            <FlatList
                data={TOPPINGS}
                keyExtractor={(_, i) => `${i}.key`}
                renderItem={renderItem}
                style={{ paddingHorizontal: 10}}
            />

            <TouchableOpacity
                style={[styles.button]}
                onPress={handlePizzaSubmit}
            >
                <Text style={[styles.buttonText]}>Aceptar</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    checkbox: {
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 15,
        marginBottom: 10,
        paddingStart: 20,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#264653',
    },
    text: {
        fontSize: 15,
        color: "#264653",
        padding: 10
    },
});

export default ToppingSelection;