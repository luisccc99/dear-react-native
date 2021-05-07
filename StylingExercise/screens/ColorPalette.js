import React from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import ColorBox from '../components/ColorBox';



const ColorPalette = ({ navigation, route }) => {
    const {colors, paletteName} = route.params;
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('ColorDetail', {
                colorName: item.colorName,
                hexCode: item.hexCode,
            });
        }}>
            <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
        </TouchableOpacity>);
    return (
        <FlatList 
            style={styles.list}
            data={colors}
            renderItem={renderItem}
            keyExtractor={(_, index) => "key" + index}
            ListHeaderComponent={<Text style={styles.title}>{paletteName}</Text>} />
    );
};

const styles = StyleSheet.create({
    list: {
        marginTop: 10,
        paddingHorizontal: 4,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    }
});

export default ColorPalette;