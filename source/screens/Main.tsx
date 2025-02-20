import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';



function Main({ setSelectedScreen, features }): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const handleClick = (selectedScreen) => {
        setSelectedScreen(selectedScreen);
    }

    return (
        <View style={{ backgroundColor: '#F1F8FB', flex: 1 }}>
            <View style={{ backgroundColor: '#001659', padding: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderWidth: 1, alignItems: 'center', marginTop: 10 }}>
                <View style={{ borderRadius: 50, borderColor: 'blue', borderWidth: 1, padding: 8, backgroundColor: 'white' }}>
                    <Image source={require('../../images/user.png')} style={{ height: 80, width: 80 }} />
                </View>
                <View style={{ marginTop: 20, alignSelf: "center", alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Efficient User</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>efficientuser@aexp.com</Text>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                {features.map(item => (
                    <TouchableOpacity key={item.title} style={styles.button} onPress={() => handleClick(item.screen)}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    button: {
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center'
    },
    buttonGroup: {
        backgroundColor: '#F1F8FB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 40
    }
});

export default Main;
