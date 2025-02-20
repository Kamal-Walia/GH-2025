import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    PermissionsAndroid,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import DateTimePickerComponent from '../components/DateTimePickerComponent';
import { Camera, CameraType } from 'react-native-camera-kit';
import { Reservables } from '../constants';

function ScanAndBook({ setSelectedScreen }): React.JSX.Element {
    const [result, setResult] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [buttonText, setButtonText] = useState('Search');
    const [showLoader, setShowLoader] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDateTime, setShowDateTime] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isDateSet, setIsDateSet] = useState(false);
    const [qrCode, setQRCode] = useState('');

    const searchReservation = (code) => {
        setShowLoader(true)
        const reservation = Reservables.find(item => item.uniqueId.toLocaleLowerCase() === code.toLocaleLowerCase() ? item : null);
        setTimeout(() => {
            setShowLoader(false);
            setResult(reservation);
            setShowResult(true);
            setButtonText('Book');
        }, 1000)
    }

    useEffect(() => {
        permissionCheck();
    }, [])

    const permissionCheck = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleClick = () => {
        console.log("KW102", buttonText)
        if (buttonText === 'Search') {
            searchReservation();
        } else if (buttonText === 'Book') {
            setShowDateTime(true);
        }
    }

    const handleAlert = () => {
        Alert.alert("Booking Details", 
            `           Type: ${result.type}
            Number: ${result.number}
            Floor: ${result.floor}
            Unique Word: ${result.unique5LetterWord}
            Date & Time: ${date}`,
            [{ text: 'Cancel', style: 'cancel', onPress: () => setShowAlert(false) }, { text: 'Confirm', onPress: () => Alert.alert("Reservation Confirmed") }])
    }

    return (
        <View style={{ backgroundColor: '#F1F8FB', flex: 1 }}>
            <TouchableOpacity onPress={() => setSelectedScreen('Main')}><Image source={require('../../images/back.png')} style={{ height: 35, width: 35 }} /></TouchableOpacity>
            <View style={{ flex: 1, alignItems:'center' }}>

            
            <View style={{ flex: 1 }}>
                {!Object.keys(qrCode).length ? <Camera
                style={{height:300, width: 300}}
                    scanBarcode={true}
                    onReadCode={(event) => {setQRCode(event.nativeEvent.codeStringValue); searchReservation(event.nativeEvent.codeStringValue)}} // optional
                    showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
                    laserColor='blue' // (default red) optional, color of laser in scanner frame
                    frameColor='white' // (default white) optional, color of border of scanner frame
                /> : null}

            </View>
            </View>
            {showLoader && <ActivityIndicator size={'large'} />}
            {showResult && <View>
                <View style={styles.reserveBox}>
                    <Text style={{ fontSize: 16 }}>Found the following reservable <Text style={{ color: 'blue' }}>{result.type}</Text></Text>
                    <Text style={{ fontSize: 16 }}>Number: {result.number}</Text>
                    <Text style={{ fontSize: 16 }}>Floor: {result.floor}</Text>
                    <Text style={{ fontSize: 16 }}>Unique Word: {result.unique5LetterWord}</Text>
                </View>
            </View>}
            <DateTimePickerComponent showDateTime={showDateTime} date={date} setDate={setDate} handleAlert={handleAlert} isDateSet={isDateSet} setIsDateSet={setIsDateSet} />
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.button} onPress={handleClick}><Text>{buttonText}</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        margin: 10
    },
    txtinput: {
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 4
    },
    reserveBox: {
        backgroundColor: '#F1F8FB',
        padding: 20,
        borderWidth: 1,
        marginHorizontal: 20
    },
    button: {
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        alignItems: 'center'
    }
});

export default ScanAndBook;
