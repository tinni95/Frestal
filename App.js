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

  useEffect(() => {
    Voice.start('it-IT').then(() => {
      Voice.onSpeechStart = () => console.log("start");
      Voice.onSpeechRecognized = () => null;
      Voice.onSpeechResults = e => onSpeechResults(e);
      Voice.onSpeechPartialResults = () => null;
      Voice.onSpeechVolumeChanged = () => console.log("changed");
      Voice.onSpeechEnd = () => console.log("end");
      Voice.onSpeechError = (e) => console.log(e);
    })
  }, [refresh])

  const onSpeechResults = (e) => {
    console.log(e.value)
    restartRecognizer()
  }

  const restartRecognizer = async () => {
    console.log(refresh)
    try {
      Voice.cancel().then(() => setRefresh(!refresh))
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
        Transcript
        </Text>
      {results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
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
