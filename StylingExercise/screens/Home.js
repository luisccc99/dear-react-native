import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation }) => {
    const [colorPalettes, setColorPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleColorsApi = useCallback(async () => {
        const response = await fetch('https://color-palette-api.kadikraman.vercel.app/palettes');
        if (response.ok) {
            const colors = await response.json();
            setColorPalettes(colors);
        }
    }, []);

    useEffect(() => {
        handleColorsApi();
    }, []);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await handleColorsApi();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000)
    }, [setIsRefreshing]);

    return (
        <FlatList
            style={styles.container}
            data={colorPalettes}
            keyExtractor={item => item.paletteName}
            renderItem={({ item }) => (
                <PalettePreview
                    handlePress={() => {
                        navigation.navigate('ColorPalette', item)
                    }}
                    colorPalette={item}
                />
            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    }
});

export default Home;