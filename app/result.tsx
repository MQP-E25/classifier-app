import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text, View } from '@/components/Themed';
import ResultCard from '@/components/ResultCard'

export default function ResultScreen() {
  const { fileData } = useLocalSearchParams();
  console.log("Raw fileData:", fileData);

  const fileDataString = (fileData as string).substring(1, (fileData as string).length - 1);
  console.log("fileDataString: ",fileDataString);
  const fileDataObject = JSON.parse(fileDataString);

  let imagePath = ""
  switch (fileDataObject.label) {
    case "Raja_clavata": 
      imagePath = "https://i.imgur.com/XjMxHS6.jpeg";
      break;
    default: 
      imagePath = "https://picsum.photos/700" 
  }

  return (
    <View style={styles.container}>
      <ResultCard cardTitle="Classification Results: " imagePath={ imagePath }>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.body}>Confidence: { fileDataObject.confidence }% </Text>
        <Text style={styles.body}>Scientific Name: { fileDataObject.label } </Text>
        <Text style={styles.body}>Sample Size?: { fileDataObject.sample } </Text>
      </ResultCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  body: {
    fontSize: 15
  },
});
