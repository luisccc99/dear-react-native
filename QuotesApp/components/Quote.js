import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const Quote = ({ handlePress, item }) => {
    const { quote, author, about } = item;
    let _about = about? ` • ${about}` : "";
    return (
        <View
            style={styles.quoteBox}>
            <TouchableOpacity
                onPress={handlePress} >
                <Text style={styles.text}>
                    "{quote}"
            </Text>
                <Text>
                    - {author}{_about}
                </Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    quoteBox: {
        margin: 5
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 17
    }
});

export default Quote;