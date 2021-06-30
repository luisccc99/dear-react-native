import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Done = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.presentationContainer}>
                <Image
                    source={{ uri: 'https://images.vexels.com/media/users/3/197251/isolated/preview/6cfbab7e0350f9ed97967c04f2619d97-lindo-chef-con-pizza-by-vexels.png' }}
                    style={{width: 200, height: 200}}
                />
                <Text style={styles.text}>Tu pizza está lista!</Text>
                <TouchableOpacity onPress={() => navigation.popToTop()}>
                    <Text style={[styles.buttonText]}>Volver Al Inicio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    presentationContainer: {
        backgroundColor: '#ef233c',
        margin: 15,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 13,
        alignItems: 'center',
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },
    buttonText: {
        marginTop: 10,
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 8,
        backgroundColor: '#32a852',
        borderRadius: 5
    }
});

export default Done;