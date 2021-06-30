import React, { useState, useCallback, useEffect } from 'react';
import { API_KEY } from '@env';
import { View, StyleSheet, FlatList } from 'react-native';
import RoverPhoto from '../components/roverPhoto';

const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos';
const OPPORTUNITY_SOL_OFFSET = 1;

const OpportunityScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sol, setSol] = useState(OPPORTUNITY_SOL_OFFSET);

    const handleApiCall = useCallback(async () => {
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${BASE_URL}?camera=PANCAM&sol=${sol}&api_key=${API_KEY}`)
                .then((response) => response.json())
                .then((json) => {
                    console.debug(`Opportunity, sol: ${sol}, photos: ${json.photos.length}`);
                    setSol(sol + 1)
                    setPhotos([...photos, ...json.photos])
                    setIsLoading(false);
                })
                .catch((error) => console.error(error));

        }
    }, [sol, isLoading, photos]);

    useEffect(() => {
        handleApiCall();
    }, []);

    const renderItem = useCallback(({ item }) => (
        <RoverPhoto photo={item} />
    ), []);

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    return (
        <View style={styles.container}>
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
                style={{ backgroundColor: '#ebebeb' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default OpportunityScreen;