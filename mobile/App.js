/* IMPORTANTE!
No react Native não temos as mesmas tags que no React.js
O estilo é definido através de uma classe (objeto) javascript
O estilo não é herdado.
*/

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (    
    <View style={styles.container}>
      <Text style={styles.title}>Hello React</Text>
      <Text style={styles.title}> Native World!</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFF',
  }
});
