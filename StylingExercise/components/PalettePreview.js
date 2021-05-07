import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';

const PalettePreview = ({ handlePress, colorPalette }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={handlePress}>
                <Text style={styles.text}>{colorPalette.paletteName}</Text>
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    data={colorPalette.colors.slice(0, 5)}
                    keyExtractor={(_, index) => index + 'key'}
                    renderItem={({ item }) => (
                        <View style={[styles.box, { backgroundColor: item.hexCode }]} />
                    )}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    list: {
        marginBottom: 3,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    },
    box: {
        height: 30,
        width: 30,
        borderRadius: 5,
        marginEnd: 5,
        marginVertical: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2
    }
});

export default PalettePreview;