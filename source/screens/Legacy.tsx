import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

function Legacy({ setSelectedScreen }): React.JSX.Element {
    const [showLoader, setShowLoader] = useState(false);
 
    useEffect(() => {
        setShowLoader(true)
        setTimeout(() => {
            setShowLoader(false)
        }, 1000)
    }, [])

    return (
        <View style={{ backgroundColor: '#F1F8FB', flex: 1 }}>
            { showLoader ? <ActivityIndicator size={'large'} style={{alignSelf:'center'}}/> :
            <>
            <TouchableOpacity onPress={() => setSelectedScreen('Main')}><Image source={require('../../images/back.png')} style={{ height: 35, width: 35 }} /></TouchableOpacity>
            <Image source={require('../../images/legacy.png')} style={{ height: '108%', width: '100%' }} />
            </>
        }
        </View>
    );
}

export default Legacy;
