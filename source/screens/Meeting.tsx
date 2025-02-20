import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePickerComponent from '../components/DateTimePickerComponent';
import { Reservables } from '../constants';

function Meeting({ setSelectedScreen }): React.JSX.Element {
    const [result, setResult] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDateTime, setShowDateTime] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isDateSet, setIsDateSet] = useState(false);

    const searchReservation = (code) => {
            setShowLoader(true)
            const reservation = Reservables.find(item => item.uniqueId.toLocaleLowerCase() === code.toLocaleLowerCase() ? item : null);
            setTimeout(() => {
                setShowLoader(false);
                setResult(reservation);
                setShowResult(true)
            }, 1000)
        }

    const handleAlert = () => {
        Alert.alert("Booking Details", 
            `           Type: ${result.type}
            Number: ${result.number}
            Floor: ${result.floor}
            Unique Word: ${result.unique5LetterWord}
            Occupancy: ${result.occupancy}
            Date & Time: ${date}`,
            [{ text: 'Cancel', style: 'cancel', onPress: () => setShowAlert(false) }, { text: 'Confirm', onPress: () => Alert.alert("Reservation Confirmed") }])
    }

    const handleBooking = () => {
        handleAlert();
    }

    const handleDateAndTime = () => {
        setShowDateTime(true);
    }

    return (
        <ScrollView style={{ backgroundColor: '#F1F8FB', flex: 1 }}>
            <TouchableOpacity onPress={() => setSelectedScreen('Main')}><Image source={require('../../images/back.png')} style={{ height: 35, width: 35 }} /></TouchableOpacity>
            
            <View style={styles.inputBox}>
                <Text style={{ fontSize: 18 }}>Create New Meeting</Text>
                <Text style={{ fontSize: 14, marginTop:10 }} >Subject</Text>
                <TextInput style={styles.txtinput} />
                <Text style={{ fontSize: 14 }} >Body</Text>
                <TextInput style={styles.txtinput} />
                <Text style={{ fontSize: 14 }} >Location</Text>
                <TextInput style={styles.txtinput} />
                <Text style={{ fontSize: 14 }} >Invite</Text>
                <TextInput style={styles.txtinput} />
                <TouchableOpacity style={{marginTop:6}} onPress={handleDateAndTime}><Text style={{ fontSize: 14 }}>Select Date And Time</Text></TouchableOpacity>
                <Text  style={{ fontSize: 14, marginTop:6 }} >Meeting Room (Optional)</Text>
                <TextInput style={styles.txtinput} />
                {showResult && <View>
                    <Text style={{ fontSize: 16, paddingTop:10}}>Found the following reservable <Text style={{color:'blue'}}>{result.type}</Text></Text>
                                <View style={styles.reserveBox}>
                                    <Text style={{ fontSize: 16 }}>Number: {result.number}</Text>
                                    <Text style={{ fontSize: 16 }}>Floor: {result.floor}</Text>
                                    <Text style={{ fontSize: 16 }}>Occupancy: {result.occupancy}</Text>
                                    <Text style={{ fontSize: 16 }}>Unique Word: {result.unique5LetterWord}</Text>
                                </View>
                            </View>}

           </View>
           <DateTimePickerComponent showDateTime={showDateTime} date={date} setDate={setDate} handleAlert={() => {}} isDateSet={isDateSet} setIsDateSet={setIsDateSet} />  
            
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={styles.button} onPress={() => searchReservation('02B-MR-207')}><Text>Suggest Meeting Room</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleBooking}><Text>Book</Text></TouchableOpacity>
                </View>
        </ScrollView>
    );
}

export default Meeting;


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
        marginHorizontal: 20,
        marginTop:10
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
