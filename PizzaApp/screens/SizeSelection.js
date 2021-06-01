import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

const SIZES = [
    {
        label: "Chica"
    },
    {
        label: "Mediana"
    },
    {
        label: "Grande"
    }
];

const SizeSelection = ({ navigation }) => {
    const [size, setSize] = useState("");
    const handleSizeSubmit = useCallback(() => {
        if (!size) {
            Alert.alert(
                "Error",
                "Por favor seleccione algún tamaño."
            );
        } else {
            navigation.navigate('Dough', { size });
        }
    }, [size]);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                Selecciona el tamaño de la pizza:
                </Text>
            <RadioButtonRN
                data={SIZES}
                selectedBtn={e => setSize(e.label)}
                activeColor="#2A9D8F"
                boxActiveBgColor="#ffffff33"
                textColor="#264653"
                textStyle={{ fontSize: 15 }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSizeSubmit}>
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

export default SizeSelection;