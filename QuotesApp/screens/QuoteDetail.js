import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Alert, ToastAndroid } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Quote from '../components/Quote';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
    { name: "quotesDB.db", createFromLocation: 1, },
    () => console.debug("Connected succesfully"),
    (_, e) => console.error(e)
);

const DELETE_QUOTE = "DELETE FROM quotes WHERE id=?";

const QuoteDetail = ({ navigation, route }) => {

    const deleteQuote = useCallback(() => {
        console.debug("about to delete quote...");
        db.transaction((tx) => {
            tx.executeSql(DELETE_QUOTE, [route.params.id], (tx, results) => {
                if (results.rowsAffected > 0) {
                    ToastAndroid.show("Frase eliminada exitosamente",
                        ToastAndroid.SHORT);
                    navigation.navigate('Quotes');
                }
            },
                (_, error) => {
                    console.log(error.message);
                    Alert.alert("Error", "La frase no pudo ser eliminada");
                });
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Quote item={route.params} />
            </View>
            <View style={styles.row}>
                <Button
                    buttonStyle={styles.buttonUpdate}
                    onPress={() => {
                        navigation.navigate('QuoteEdit', {item: route.params, action: "update"});
                    }}
                    icon={
                        <Icon
                            name="edit"
                            color="white"
                            size={25}
                        />
                    } />
                <Button
                    buttonStyle={styles.buttonDelete}
                    onPress={() => {
                        Alert.alert(
                            "Eliminar frase",
                            "¿Estás seguro de eliminar esta frase?",
                            [
                                { text: 'Cancelar' },
                                {
                                    text: "Sí",
                                    onPress: deleteQuote
                                }
                            ]
                        );
                    }}
                    icon={
                        <Icon
                            name="delete"
                            color="white"
                            size={25}
                        />
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    row: {
        marginTop: 15,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    buttonUpdate: {
        backgroundColor: "#02b090",
        paddingHorizontal: 10,
        marginEnd: 10
    },
    buttonDelete: {
        backgroundColor: 'salmon',
        marginStart: 10,
        paddingHorizontal: 10,
        marginEnd: 15
    },
    box: {
        margin: 7
    }
});

export default QuoteDetail;