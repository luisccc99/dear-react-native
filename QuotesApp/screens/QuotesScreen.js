import React, { useCallback, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Quote from '../components/Quote';
import { openDatabase } from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/native'


const db = openDatabase(
    { name: "quotesDB.db", createFromLocation: 1, },
    () => console.debug("Connected succesfully"),
    (_, e) => console.error(e)
);

const SELECT_ALL_QUOTES = 'SELECT * FROM quotes ORDER BY id DESC';

const QuotesScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(SELECT_ALL_QUOTES, [], (_, results) => {
                let n = results.rows.length;
                let temp = []
                for (let i = 0; i < n; i++) {
                    temp.push(results.rows.item(i));
                }
                setQuotes(temp);
            },
                (_, error) => console.log(`Error ${error}`))
        });

    }, [isFocused])

    return (
        <View style={styles.container}>
            <FlatList
                data={quotes}
                keyExtractor={(_, index) => `${index}key`}
                renderItem={({ item }) => (
                    <View style={styles.box}>
                        <Quote handlePress={() => {
                            navigation.navigate("QuoteDetail", item);
                        }} item={item} />
                    </View>
                )}
            />
            <Pressable
                onPress={() => navigation.navigate("QuoteModal", {action: "add"})}
                style={({ pressed }) => [{
                    backgroundColor: pressed
                        ? '#315763'
                        : '#1f363d'
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
        backgroundColor: 'white',
        paddingTop: 5
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
    },
    box: {
        borderRadius: 5,
        elevation: 1,
        paddingVertical: 15,
        paddingHorizontal: 7,
        marginBottom: 10,
        marginHorizontal: 7
    }
});

export default QuotesScreen;