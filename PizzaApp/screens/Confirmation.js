import React from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';


const Confirmation = ({ route, navigation }) => {
    const { size, dough, cheese, selectedToppings } = route.params;

    const handleConfirmation = () => { navigation.push("Done", route.params) };

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