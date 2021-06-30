import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const Order = ({item}) => {
    const {id, size, dough, cheese, ingredients } = item;

    return (
        <View style={styles.container}> 
            <Text style={{fontWeight: 'bold', fontSize: 15}}>#{id}</Text>
            <Text style={styles.text}>Tamaño: {size} • Masa: {dough}</Text>
            <Text style={styles.text}>Queso: {cheese}</Text>
            <Text style={styles.text}>Ingredientes: {ingredients}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
        marginHorizontal: 5
    },
    text: {
        fontSize: 14
    }
});


export default Order;