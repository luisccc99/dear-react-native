import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
    const [colorPalettes, setColorPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const newColorPalette = route.params
        ? route.params.newColorPalette
        : undefined;
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

    useEffect(() => {
        if (newColorPalette) {
            setColorPalettes(colorPalettes => [newColorPalette, ...colorPalettes]);
        }
    }, [newColorPalette]);

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
            ListHeaderComponent={
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ColorPaletteModal')
                }}>
                    <Text style={styles.buttonText}>New Color Scheme</Text>
                </TouchableOpacity>}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'teal',
        marginVertical: 8
    }
});

export default Home;