import React, { useState, useCallback, useEffect } from 'react';
import { API_KEY } from '@env';
import { StatusBar, View, StyleSheet, FlatList } from 'react-native';
import RoverPhoto from '../components/roverPhoto';

const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

const CuriosityScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sol, setSol] = useState(37);
    const [isEnd, setIsEnd] = useState(false);

    const handleApiCall = useCallback(async () => {
        if (!isLoading && !isEnd) {
            setIsLoading(true);
            fetch(`${BASE_URL}?camera=FHAZ&sol=${sol}&api_key=${API_KEY}`)
                .then((response) => response.json())
                .then((json) => {
                    console.debug(json.photos.length);
                    if (json.photos.length >= 0) {
                        setSol(sol + 1)
                        setPhotos([...photos, ...json.photos])
                        setIsLoading(false);
                    } else {
                        setIsEnd(true);
                        setIsLoading(false);
                    }
                })
                .catch((error) => console.error(error));

        }
    }, [sol, isLoading, isEnd, photos]);

    useEffect(() => {
        handleApiCall();
    }, []);

    const renderItem = useCallback(({ item }) => (
        <RoverPhoto photo={item} />
    ), []);

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor='#1b212b' />
            <FlatList
                data={photos}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                initialNumToRender={10}
                onRefresh={handleApiCall}
                refreshing={isLoading}
                windowSize={5}
                maxToRenderPerBatch={4}
                onEndReached={handleApiCall}
                onEndReachedThreshold={0.5}
                style={{backgroundColor: '#ebebeb'}}
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