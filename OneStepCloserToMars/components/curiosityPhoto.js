import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';


const RoverPhoto = ({ photo }) => {
    console.debug(photo.img_src);
    return (
        <View style={styles.container}>
            <Text>Id: {photo.id} | Earth Date: {photo.earth_date}</Text>
            <Text>Sol: {photo.sol}</Text>
            <FastImage
                style={{ width: 300, height: 200, alignSelf: 'center' }}
                source={{
                    uri: `${photo.img_src.trim()}`,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 1
    }

});


export default RoverPhoto;