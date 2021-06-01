import React, { useState, useCallback } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

const CHEESE_TYPES = [
    {
        label: "Mozarela"
    },
    {
        label: "Cheddar"
    },
    {
        label: "Parmesano"
    },
    {
        label: "Sin Queso"
    }
];

const CheeseSelection = ({ route, navigation }) => {
    const [cheese, setCheese] = useState("");


    const handleCheeseSubmit = useCallback(() => {
        if (!cheese) {
            Alert.alert(
                "Error",
                "Por favor seleccione alguna opción."
            );
        } else {
            navigation.navigate('Toppings', { ...route.params, cheese });
        }
    }, [cheese]);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                Selecciona algún tipo de queso:
            </Text>
            <RadioButtonRN
                data={CHEESE_TYPES}
                selectedBtn={e => setCheese(e.label)}
                activeColor="#2A9D8F"
                boxActiveBgColor="#ffffff33"
                textColor="#264653"
                textStyle={{ fontSize: 15 }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleCheeseSubmit}>
                <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 15,
        color: "#264653"
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#264653',
    }
});

export default CheeseSelection;