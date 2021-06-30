import React, {useState, useEffect} from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import Order from '../components/Order';

const db = openDatabase(
    { name: "pizzas_sqlite.db", createFromLocation: 1, },
    () => console.debug("Connected succesfully"),
    (_, e) => console.error(e)
);

const SELECT_ALL_PIZZAS = 'SELECT * FROM pizzas ORDER BY id DESC';

const OrdersScreen = () => {
    const isFocused = useIsFocused();
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(SELECT_ALL_PIZZAS, [], (_, results) => {
                let n = results.rows.length;
                let temp = []
                for (let i = 0; i < n; i++) {
                    temp.push(results.rows.item(i));
                }
                setPizzas(temp);
            },
                (_, error) => console.log(`Error ${error}`))
        });

    }, [isFocused])

    return (
        <View style={styles.container}>
            <FlatList
                style={{marginTop: 10}}
                data={pizzas}
                keyExtractor={(_, index) => `${index}key`}
                renderItem={({ item }) => (
                    <View style={styles.box}>
                        <Order item={item} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleText: {
        fontSize: 20
    }
});

export default OrdersScreen;