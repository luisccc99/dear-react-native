import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Switch, Button, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

const Home = () => {
    const [roundTip, setRoundTip] = useState(false);
    const [tipPercent, setTipPercent] = useState(5);
    const [people, setPeople] = useState(1);
    const [bill, setBill] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalTip, setTotalTip] = useState(0);
    const toggleSwitch = useCallback(() => {
        setRoundTip(previousState => !previousState);
    }, []);

    const reduceNumberOfPeople = useCallback(() => {
        if (people >= 2) {
            setPeople(people - 1);
        }
    }, [people]);

    const calculateTip = useCallback(() => {
        let tip = (Number(bill) * (Number(tipPercent) / 100) / Number(people));
        if (roundTip) {
            tip = Math.round(tip);
        }
        setTotalTip(tip);
    }, [tipPercent, bill, people]);

    const calculateTotal = useCallback(() => {
        setTotal((Number(bill)) / Number(people) + Number(totalTip));
    }, [bill, totalTip, setBill, people]);

    return (
        <SafeAreaView
            style={styles.container}>
            <View
                style={styles.priceBanner}>
                <View style={styles.horizontalOrientation}>
                    <Text style={{ color: '#212120' }}>Propina:</Text>
                    <Text style={styles.tipText}>${Number(totalTip).toFixed(2)}</Text>
                </View>
                <View style={styles.horizontalOrientation}>
                    <Text style={{ color: '#212120' }}>Total:     </Text>
                    <Text style={styles.priceText}>${Number(total).toFixed(2)}</Text>
                </View>
            </View>
            <View
                style={styles.controls}>
                <Text style={[styles.controlText, styles.smallStartPadding]}>Cuenta:</Text>
                <View style={styles.control}>

                    <TextInput
                        style={styles.controlInput}
                        keyboardType='numeric'
                        placeholder='Cuánto fue en total'
                        onChangeText={text => {
                            setBill(text);
                        }}
                    />
                </View>

                <Text style={[styles.controlText, styles.smallStartPadding]}>Personas:</Text>
                <View style={[styles.control, styles.horizontalOrientation]}>
                    <Pressable
                        style={styles.circularButton}
                        onPress={reduceNumberOfPeople}>
                        <Text style={styles.buttonText}>-</Text>
                    </Pressable>
                    <Text style={
                        {
                            padding: 10,
                            marginHorizontal: 10,
                            fontWeight: '800',
                        }
                    }>{people}</Text>
                    <Pressable
                        style={[styles.circularButton, styles.horizontalOrientation]}
                        onPress={() => setPeople(people + 1)}>
                        <Text style={styles.buttonText}>+</Text>
                    </Pressable>
                </View>
                <View style={[styles.control, styles.horizontalOrientation]}>
                    <Text style={styles.controlText}>Redondear:</Text>
                    <Switch
                        trackColor={{ false: "gray", true: "#f68b9e" }}
                        thumbColor={roundTip ? "#d41743" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={roundTip}
                    />
                </View>
                <Text style={[styles.controlText, styles.smallStartPadding]}>Propina ({tipPercent}%):</Text>
                <Slider
                    style={{ width: 300, height: 40 }}
                    step={5}
                    minimumValue={5}
                    maximumValue={100}
                    value={5}
                    onValueChange={(value) => setTipPercent(value)}
                    onSlidingComplete={calculateTip}
                    thumbTintColor='#d41743'
                    minimumTrackTintColor="#f68b9e"
                    maximumTrackTintColor="gray"
                />
                <Pressable
                    style={[styles.button]}
                    onPress={calculateTotal}>
                    <Text style={styles.buttonText}>calculate</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        backgroundColor: 'white'
    },
    priceBanner: {
        flex: 1,
        backgroundColor: '#f5f3f0',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 5
    },
    priceText: {
        color: '#212120',
        fontWeight: 'bold',
        fontSize: 50
    },
    tipText: {
        color: '#212120',
        fontSize: 50
    },
    controls: {
        marginTop: 10,
        flex: 3,
        backgroundColor: 'white',
    },
    control: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    controlText: {
        alignSelf: 'flex-start',
    },
    controlInput: {
        flexGrow: 1,
        borderColor: '#c9c8c3',
        borderRadius: 5,
        paddingStart: 5,
        marginEnd: 5,
        marginBottom: 5,
        borderWidth: 1
    },
    circularButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: 25,
        elevation: 2,
        backgroundColor: '#d41743'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        backgroundColor: '#d41743'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    horizontalOrientation: {
        flexDirection: 'row'
    },
    smallStartPadding: {
        paddingStart: 10
    }
});

export default Home;