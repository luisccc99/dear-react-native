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

const UPDATE_QUOTE = "UPDATE quotes SET quote=?, author=?, about=? WHERE id=?";

const QuoteEdit = ({ navigation, route }) => {

    navigation.setOptions({ title: 'Editar Frase' });
    const [quote, setQuote] = useState(route.params.item.quote);
    const [author, setAuthor] = useState(route.params.item.author);
    const [about, setAbout] = useState(route.params.item.about);

    const updateQuote = useCallback(() => {
        console.log(quote, author, about, route.params.item.id);
        if (quote.length == 0 || author.length == 0) {
            Alert.alert("Error", "La frase y el autor son obligatorios.")
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    UPDATE_QUOTE,
                    [quote, author, about, route.params.item.id],
                    (tx, results) => {

                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                "Operación Exitosa",
                                "La frase ha sido editada con éxito.",
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            navigation.navigate('Quotes');
                                        }
                                    },
                                ],
                                { cancelable: false })
                        }
                    },
                    (_, error) => {
                        console.log("error", error.message)
                    })
            })
        }
    }, [quote, author, about]);

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
                    onPress={updateQuote}
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

export default QuoteEdit;