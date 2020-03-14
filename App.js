// App.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Voice from '@react-native-community/voice';
export default function App() {
  const [refresh, setRefresh] = useState(false)
  const [results, setResults] = useState([])
  const [lock, setLock] = useState(false)

  useEffect(() => {
    setLock(true)
    Voice.start('it-IT').then(() => {
      Voice.onSpeechStart = () => console.log("start");
      Voice.onSpeechRecognized = () => null;
      Voice.onSpeechResults = e => onSpeechResults(e);
      Voice.onSpeechPartialResults = () => null;
      Voice.onSpeechVolumeChanged = () => console.log("changed");
      Voice.onSpeechEnd = () => console.log("end");
      Voice.onSpeechError = (e) => console.log(e);
      setLock(false)
    })
  }, [refresh])

  const onSpeechResults = (e) => {
    console.log(e.value)
    if (e.value.toString().endsWith("acca") && !results.includes(e.value.toString())) {
      setResults([...results, e.value])
    }
    restartRecognizer()
  }

  const restartRecognizer = async () => {
    console.log(refresh)
    try {
      Voice.cancel().then(() => !lock ? setRefresh(!refresh) : null)
    } catch (e) {
      //eslint-disable-next-line
      console.log(e);
    }

  };

  const _startRecognition = async (e) => {
    try {
      await Voice.start('it-IT');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View>
      <Text style={styles.transcript}>
        Giacca
        </Text>
      {results.map((result, index) => <Text><Text style={styles.transcript}>{result}</Text></Text>
      )}
      <Button style={styles.transcript}
        onPress={_startRecognition}
        title="Start"></Button>
    </View>
  );
}


const styles = StyleSheet.create({
  transcript: {
    marginTop: 10,
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
});
