import React, { useState, useCallback } from 'react';
import { API_KEY } from '@env';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';

const PicOfTheDayScreen = () => {
    const [imageResponse, setImageResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleApodApiCall = useCallback(async () => {
        fetch(`${BASE_URL}?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((json) => setImageResponse(json))
            .catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        handleApodApiCall();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{imageResponse.title}</Text>
                <Text></Text>
                <Image
                    source={{ uri: `${imageResponse.hdurl}` }}
                    style={styles.image}
                />
                <Text style={styles.textDescription}>{imageResponse.explanation}</Text>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        color: '#293241',
        marginTop: 10
    },
    image: {
        width: '91%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 7,
    },
    textDescription: {
        marginHorizontal: 16,
        marginVertical: 10,
        lineHeight: 20,
        fontWeight: '800',
    }
});

export default PicOfTheDayScreen;