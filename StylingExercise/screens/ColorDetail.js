import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorDetail = ({ route }) => {
    const { colorName, hexCode } = route.params;
    const boxColor = {
        backgroundColor: hexCode
    };

    const textColor = {
        color: parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.15
            ? 'black' : 'white',
    };
    return (
        <View style={[styles.box, boxColor]}>
            <Text style={[styles.boxText, textColor]}>{colorName} {hexCode}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    boxText: {
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default ColorDetail;