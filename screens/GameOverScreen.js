
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainButton from '../components/MainButton';
import { isAvailable } from 'expo/build/AR';

const GameOverScreen = props => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeigth] = useState(
        Dimensions.get('window').height
    );

    useEffect(() => {
        updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeigth(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>The Game is Over!</Text>

                <View style={{
                    ...styles.imageContainer,
                    ...{
                        width: availableDeviceWidth * 0.7,
                        height: availableDeviceWidth * 0.7,
                        borderRadius: (availableDeviceWidth * 0.7) / 2,
                        marginVertical: availableDeviceHeight / 30
                    }
                }} >
                    <Image
                        source={require('../assets/success.png')}
                        // source={{uri:'https://cdn.pixabay.com/photo/2012/02/18/22/52/silhouette-14682_1280.jpg'}}
                        style={styles.image}
                        resizeMode='cover' />
                </View>
                <View style={{
                    ...styles.resultContainer,
                    ...{
                        marginVertical: availableDeviceHeight / 60
                    }
                }} >
                    <Text style={{
                        ...styles.resultText,
                        ...{fontSize: availableDeviceHeight < 400 ? 16 : 20}
                    }}>
                        Your phone needed {' '}
                        <Text style={styles.highlight}>{props.roundsNumber}</Text>
                        {' '}rounds to guess the number {' '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>
                    </Text>
                </View>
                <MainButton onPress={props.onRestart}>
                    NEW GAME
            </MainButton>
            </View >
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;