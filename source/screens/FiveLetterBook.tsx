import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import DateTimePickerComponent from '../components/DateTimePickerComponent';

const Reservables = [{ number: '206', floor: '15', type: 'Seat', unique5LetterWord: 'Focus' }, { number: '12', floor: '15', type: 'Meeting Room', unique5LetterWord: 'Shift' }, { number: '20', floor: '12', type: 'Training Room', unique5LetterWord: 'Boost' }, { number: '206', floor: '14', type: 'Seat', unique5LetterWord: 'Spark' }]

function FiveLetterBook({ setSelectedScreen }): React.JSX.Element {
    const [word, setWord] = useState('');
    const [result, setResult] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [buttonText, setButtonText] = useState('Search');
    const [showLoader, setShowLoader] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDateTime, setShowDateTime] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
     const [isDateSet, setIsDateSet] = useState(false);

    const searchReservation = () => {
        setShowLoader(true)
        const reservation = Reservables.find(item => item.unique5LetterWord.toLocaleLowerCase() === word.toLocaleLowerCase() ? item : null);
        console.log(reservation);
        setTimeout(() => {
            setShowLoader(false);
            setResult(reservation);
            setShowResult(true);
            setButtonText('Book'); 
        },1000)
    }

    const handleTextChange = (text) => {
        if (text.length <= 5) {
            setWord(text)
            if (showResult) {
                setButtonText('Search'); 
                setShowResult(false);
                setShowDateTime(false);
                setIsDateSet(false)
            }
        }
    }

    const handleClick = () => {
        console.log("KW102", buttonText)
        if (buttonText === 'Search') {
            searchReservation();
        } else if(buttonText === 'Book'){
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
            [{text:'Cancel',style:'cancel', onPress:() => setShowAlert(false)}, {text:'Confirm', onPress:() => Alert.alert("Reservation Confirmed")}])
    }

    return (
        <View style={{ backgroundColor: '#F1F8FB', flex: 1 }}>
            <TouchableOpacity onPress={() => setSelectedScreen('Main')}><Image source={require('../../images/back.png')} style={{ height: 35, width: 35 }}/></TouchableOpacity>
            <View style={styles.inputBox}>
                <Text style={{ fontSize: 14}} >Enter Five Letter Word</Text>
                <TextInput style={styles.txtinput} value={word} onChangeText={(text) => handleTextChange(text)} />
            </View>
            {showLoader && <ActivityIndicator size={'large'}/>}
            {showResult && <View>
                <View style={styles.reserveBox}>
                    <Text style={{ fontSize: 16}}>Found the following reservable <Text style={{color:'blue'}}>{result.type}</Text></Text>
                    <Text style={{ fontSize: 16 }}>Number: {result.number}</Text>
                    <Text style={{ fontSize: 16 }}>Floor: {result.floor}</Text>
                    <Text style={{ fontSize: 16 }}>Unique Word: {result.unique5LetterWord}</Text>
                </View>
            </View>}
            <DateTimePickerComponent showDateTime={showDateTime} date={date} setDate={setDate} handleAlert={handleAlert} isDateSet={isDateSet} setIsDateSet={setIsDateSet} />
            <View style={{flex:1, display:'flex', justifyContent:'flex-end'}}>
            <TouchableOpacity style={styles.button} disabled={word.length < 5} onPress={handleClick}><Text>{buttonText}</Text></TouchableOpacity>
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
    reserveBox:{
        backgroundColor: '#F1F8FB',
        padding: 20,
        borderWidth: 1,
        marginHorizontal:20
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

export default FiveLetterBook;
