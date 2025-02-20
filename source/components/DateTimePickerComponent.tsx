import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, SafeAreaView, Text, Touchable, TouchableOpacity } from 'react-native';

export const DateTimePickerComponent = ({showDateTime, date, setDate, handleAlert, isDateSet, setIsDateSet}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('KW101')
    if(showDateTime && !isDateSet){
      showMode('date');
    }
    if(isDateSet){
      showMode('time');
    }
  }, [showDateTime, isDateSet])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if(mode === 'date'){
      setIsDateSet(true)
    }
    setShow(false);
    setDate(currentDate);
    if(mode === 'time'){
      handleAlert();
    }

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };
  
    return (
      <SafeAreaView>
       {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
      {/* <Text>selected: {date.toLocaleString()}</Text> */}
      {show && (
         <DateTimePicker
         testID="dateTimePicker"
         value={date}
         mode={mode}
         is24Hour={true}
         onChange={onChange}
       />
      )}
      </SafeAreaView>
    );
  };

export default DateTimePickerComponent