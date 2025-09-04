import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About the Project:</Text>
      <Text style={styles.info}>
        Species identifier using melting curve analysis developed by Xavier Bonavita, Victor Che, and Remy Jiang 
        under advisory from Professor Kyumin Lee and submitted to the Faculty of Worcester Polytechnic Institute in partial fulfillment 
        of the requirements for the Degree of Bachelor of Science in Computer Science. 
      </Text>
      <Text style={styles.info}>Read the resulting report: </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 15,
    width: '80%',
    fontSize: 15,
    textOverflow: 'wrap',
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'light',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
