import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Main from './source/screens/Main';
import FiveLetterBook from './source/screens/FiveLetterBook';
import ScanAndBook from './source/screens/ScanAndBook';
import Legacy from './source/screens/Legacy';
import Meeting from './source/screens/Meeting';

const features = [{ title: "Scan And Book", screen:'ScanBook' }, { title: "Book Via 5 letter word", screen:'BookViaWord' }, { title: "Create Meeting", screen:'Meeting' },{ title: "Book via Legacy", screen:'Legacy' } ]


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedScreen, setSelectedScreen] = useState('Main');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getScreen = () => {
    switch(selectedScreen) {
      case 'Main': return <Main setSelectedScreen={setSelectedScreen} features={features}/>
      case 'BookViaWord': return <FiveLetterBook setSelectedScreen={setSelectedScreen}/>
      case 'ScanBook': return <ScanAndBook setSelectedScreen={setSelectedScreen}/>
      case 'Legacy': return <Legacy setSelectedScreen={setSelectedScreen}/>
      case 'Meeting': return <Meeting setSelectedScreen={setSelectedScreen}/>
      default: return <Main setSelectedScreen={setSelectedScreen} features={features}/>
    }
  }


  return (
    <SafeAreaView style={{ ...backgroundStyle, flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {getScreen()}
      </SafeAreaView>
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
  }
});

export default App;
