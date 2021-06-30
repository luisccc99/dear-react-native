import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
    { name: "quotesDB.db", createFromLocation: 1, },
    () => console.debug("Connected succesfully"),
    (_, e) => console.error(e)
);

const INSERT_QUOTE = "INSERT INTO quotes (quote, author, about) VALUES(?, ?, ?)";

const QuoteModal = ({ navigation }) => {
    navigation.setOptions({ title: 'Agregar Nueva Frase' });
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [about, setAbout] = useState('');


    const insertNewQuote = useCallback(() => {
        if (quote.length == 0 || author.length == 0) {
            Alert.alert("Error", "La frase y el autor son obligatorios.")
        } else {
            db.transaction((tx) => {
                tx.executeSql(INSERT_QUOTE, [quote, author, about],
                    (_, results) => {
                        console.log('duh');
                        console.log(results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Operación Exitosa',
                                'Se ha agregado una nueva frase.',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            navigation.navigate('Quotes');
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }
                    },
                    (_, error) => {
                        Alert.alert("Error", "No se pudo agregar la frase.");
                        console.error(error.message)
                    })
            })
        }
    }, [quote, author, about])
    return (
        <View style={styles.container}>
            <ScrollView>
                <Input
                    value={quote}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={150}
                    label="¿Qué dijo?"
                    onChangeText={(value) => setQuote(value)}
                    placeholder="La mejor victoria es vencer sin combatir" />
                <Input
                    value={author}
                    label="¿Quién lo dijo?"
                    onChangeText={(value) => setAuthor(value)}
                    placeholder="Sun Tzu" />
                <Input
                    value={about}
                    label="Más información"
                    placeholder="500 BC"
                    onChangeText={(value) => setAbout(value)}
                />
                <Button
                    buttonStyle={styles.buttonAccept}
                    title="Aceptar"
                    onPress={insertNewQuote}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10
    },
    buttonAccept: {
        marginHorizontal: 10,
        backgroundColor: "#1f363d",
        color: "white"
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingVertical: 10,
        borderRadius: 10
    }
});

export default QuoteModal;