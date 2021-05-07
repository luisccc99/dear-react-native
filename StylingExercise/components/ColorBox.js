import React from 'react';

import { StyleSheet, View, Text } from 'react-native'

const ColorBox = ({ colorName, hexCode }) => {
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
        marginBottom: 5,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2
    },
    boxText: {
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default ColorBox;