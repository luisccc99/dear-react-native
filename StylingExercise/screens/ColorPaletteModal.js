import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const COLORS = [
    { colorName: 'AliceBlue', hexCode: '#F0F8FF' },
    { colorName: 'AntiqueWhite', hexCode: '#FAEBD7' },
    { colorName: 'Aqua', hexCode: '#00FFFF' },
];

const ColorPaletteModal = ({ navigation }) => {
    const [paletteName, setPaletteName] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);
    const handleSubmit = useCallback(() => {
        if (!paletteName) {
            Alert.alert("Error", "Please enter a palette name");
        } else if (selectedColors.length < 3) {
            Alert.alert("Error", "Please at least add 3 colors ")
        } else {
            const newColorPalette = {
                paletteName: paletteName,
                colors: selectedColors,
            };
            navigation.navigate('Home', { newColorPalette });
        }
    }, [paletteName, selectedColors]);
    const handleValueChange = React.useCallback((value, color) => {
        if (value) {
            setSelectedColors(colors => [...colors, color]);
        }else {
            setSelectedColors(colors => colors.filter(
                selectedColor => color.colorName !== selectedColor.colorName));
        }
    }, [])

    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.row, styles.spaceBetween, styles.separator]}>
                <Text>{item.colorName}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    onValueChange={selected => handleValueChange(selected, item)}
                    value={
                        !!selectedColors.find(color => color.colorName === item.colorName)
                    }
                >
                </Switch>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Name of your new color palette
            </Text>
            <TextInput
                style={styles.textInput}
                editable={true}
                maxLength={30}
                value={paletteName}
                onChangeText={setPaletteName}>
            </TextInput>
            <FlatList
                data={COLORS}
                renderItem={renderItem}
                keyExtractor={((_, index) => `key${index}`)}>
            </FlatList>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    row: {
        flexDirection: "row",
        paddingBottom: 5,
        marginBottom: 10
    },
    spaceBetween: {
        justifyContent: "space-between"
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: "#b3b1b1"
    },
    textInput: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        marginTop: 10,
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        height: 40,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ColorPaletteModal;