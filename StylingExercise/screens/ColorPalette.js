import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import ColorBox from '../components/ColorBox';

const COLORS = [
    { colorName: 'Base03', hexCode: '#002b36' },
    { colorName: 'Base02', hexCode: '#073642' },
    { colorName: 'Base01', hexCode: '#586e75' },
    { colorName: 'Base00', hexCode: '#657b83' },
    { colorName: 'Base0', hexCode: '#839496' },
    { colorName: 'Base1', hexCode: '#93a1a1' },
    { colorName: 'Base2', hexCode: '#eee8d5' },
    { colorName: 'Base3', hexCode: '#fdf6e3' },
    { colorName: 'Yellow', hexCode: '#b58900' },
    { colorName: 'Orange', hexCode: '#cb4b16' },
    { colorName: 'Red', hexCode: '#dc322f' },
    { colorName: 'Magenta', hexCode: '#d33682' },
    { colorName: 'Violet', hexCode: '#6c71c4' },
    { colorName: 'Blue', hexCode: '#268bd2' },
    { colorName: 'Cyan', hexCode: '#2aa198' },
    { colorName: 'Green', hexCode: '#859900' },
];

const ColorPalette = ({ navigation }) => {
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
        <SafeAreaView>
            <FlatList style={styles.container}
                data={COLORS}
                renderItem={renderItem}
                keyExtractor={(_, index) => "key" + index}
                ListHeaderComponent={<Text style={styles.title}>Solarized color scheme</Text>} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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