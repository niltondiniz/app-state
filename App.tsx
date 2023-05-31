import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Font from 'expo-font';

export default function App() {

  const [counter, setCounter] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      Oswald: require('./assets/Oswald/Oswald-VariableFont_wght.ttf'),
      Oswald_Bold: require('./assets/Oswald/static/Oswald-Bold.ttf'),
    });
  }

  useEffect(() => {
    loadFonts()
      .then(() => {
        console.log('Fontes carregadas');
        setFontLoaded(true);
      })
      .catch((error) => { console.error('Erro ao carregar as fontes:', error); })
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      {fontLoaded ?
        <View style={styles.container}>
          <Text style={[styles.title, { fontFamily: 'Oswald_Bold', fontSize: 70 }]}>Você clicou</Text>
          <Text style={[styles.counter, { fontFamily: 'Oswald_Bold', fontSize: 150 }]}>{counter}</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.button} onPress={() => {
            if (counter === 10) {
              setCounter(0);
            } else {
              setCounter(counter + 1);
            }
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Error
            )
          }}>
            <Text style={styles.buttonText}>Clicar</Text>
          </TouchableOpacity>
        </View> : <></>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ec06',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    flex: 1,
    marginTop: 50
  },
  counter: {
    marginBottom: 100,
    flex: 1
  },
  button: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 100,
    height: 100,
    borderRadius: 100,
    elevation: 3
  },
  buttonText: {
    fontFamily: 'Oswald',
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  }
});
