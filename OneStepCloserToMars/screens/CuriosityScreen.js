import React, { useState, useCallback, useEffect } from 'react';
import { API_KEY } from '@env';
import { Image, StatusBar, Text, View, StyleSheet, FlatList } from 'react-native';
import RoverPhoto from '../components/curiosityPhoto';

const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

const CuriosityScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sol, setSol] = useState(100);

    const handleApiCall = useCallback(async () => {
        fetch(`${BASE_URL}?camera=FHAZ&sol=${sol}&api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((json) => setPhotos(json.photos))
            .catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        handleApiCall();
    }, []);

    const renderItem = (({ item }) => (
        <RoverPhoto photo={item} />
    ));
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor='#1b212b' />
            <FlatList
                data={photos}
                keyExtractor={(_, index) => `${index}key`}
                renderItem={renderItem}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default CuriosityScreen;