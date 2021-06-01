import React, { useState, useCallback } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

const DOUGH_TYPES = [
    {
        label: "Delgada"
    },
    {
        label: "Crujiente"
    },
    {
        label: "Gruesa"
    }
];

const DoughSelection = ({ route, navigation }) => {
    const [dough, setDough] = useState("");
    const handleDoughSubmit = useCallback(() => {
        if (!dough) {
            Alert.alert(
                "Error",
                "Por favor seleccione un tipo de masa."
            );
        } else {
            navigation.navigate('Cheese', { ...route.params, dough });
        }
    }, [dough]);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                Selecciona algún tipo de masa:
                </Text>
            <RadioButtonRN
                data={DOUGH_TYPES}
                selectedBtn={e => setDough(e.label)}
                activeColor="#2A9D8F"
                boxActiveBgColor="#ffffff33"
                textColor="#264653"
                textStyle={{ fontSize: 15 }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleDoughSubmit}>
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

export default DoughSelection;