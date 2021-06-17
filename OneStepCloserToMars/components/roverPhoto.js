import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useEffect } from 'react/cjs/react.development';


const RoverPhoto = ({ photo }) => {
    const [date, setDate] = useState('')
    useEffect(() => {
        setDate(new Date(photo.earth_date).toDateString())
    }, []);
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Id: {photo.id}</Text>
            <Text style={styles.text}>Earth: {date}</Text>
            <Text style={[styles.text, {marginBottom: 5}]}>Martian Sol: {photo.sol}</Text>
            <FastImage
                style={{ width: 300, height: 200, alignSelf: 'center' }}
                source={{
                    uri: `${photo.img_src.trim()}`,
                    priority: FastImage.priority.high,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 3
    },
    text: {
        color: '#222222',
        fontSize: 14
    }
});


export default RoverPhoto;