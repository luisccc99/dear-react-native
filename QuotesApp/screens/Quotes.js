import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Icon, FAB } from 'react-native-elements';

const Quotes = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate("QuoteModal")}
                style={({ pressed }) => [{
                    backgroundColor: pressed
                        ? '#4994F2'
                        : '#497CF2'
                },
                styles.circularButton]}
            >
                <Icon
                    name="add"
                    color="white"
                    size={30}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    circularButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        elevation: 5,
        position: 'absolute',
        marginEnd: 20,
        marginBottom: 25,
        right: 0,
        bottom: 0

    }
});

export default Quotes;