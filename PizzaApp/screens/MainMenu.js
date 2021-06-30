import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Size')}>
                <Text style={styles.text}>Ordenar Pizza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <Text style={styles.text}>Ver Ordenes</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: 'salmon',
        padding: 8,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default Menu;