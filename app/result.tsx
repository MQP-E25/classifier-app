import { StyleSheet, Platform, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { Text, View } from '@/components/Themed';
import ResultCard from '@/components/ResultCard'

interface ClassificationResults {
    confidence: number,
    prediction: string,
    top_5: any
  }

export default function ResultScreen() {
  const [data, setData] = useState<ClassificationResults[]>([])
  const { fileData } = useLocalSearchParams();
  const db = Platform.OS === 'web' ? null : useSQLiteContext();
  const database = db;

  async function handleSubmitResult (name : string, confidence_level : string, date_identified : string) {
    if (!database) {return;}
    try {
      await database.runAsync("INSERT INTO history (scientific_name, confidence_level, date_identified) VALUES (?, ?, ?);", [
        name,
        confidence_level,
        date_identified
      ]);
      console.log("Successfully inserted into db.")
    } catch (err) {
      console.error(err);
    }    
  }

  async function executeSubmission( fileDataObject : ClassificationResults ) {
    await handleSubmitResult(
      fileDataObject.prediction,
      (fileDataObject.confidence * 100).toFixed(2),
      new Date().toISOString()
    );
  }

  //parse fileData
  if (!fileData || typeof fileData !== 'string') {
    console.error('fileData is undefined or not a string');
    return (
      <View style={styles.container}>
        <Text>Error: No data received</Text>
      </View>
    );
  }

  const fileDataString = (fileData as string);
  console.log("fileDataString: ",fileDataString);
  const fileDataObject = JSON.parse(fileDataString);
  console.log("fileDataObject: ", fileDataObject);

  // Convert the object with numeric keys to an array of ClassificationResults
  const resultArray: ClassificationResults[] = Object.values(fileDataObject).filter(item => 
    item && typeof item === 'object' && 'confidence' in item && 'prediction' in item
  ) as ClassificationResults[];

useFocusEffect(
    useCallback (() => {
      setData(resultArray);
    }, [])
  );
  
  let imagePath = ""
  // Get the first prediction for image selection
  const firstResult = resultArray[0];
  if (firstResult) {
    switch (firstResult.prediction) {
      case "Raja_clavata": 
        imagePath = "https://i.imgur.com/XjMxHS6.jpeg";
        break;
      default: 
        imagePath = "https://picsum.photos/700" 
    }
  } else {
    imagePath = "https://picsum.photos/700";
  }

  for (const result of resultArray) { 
      executeSubmission(result);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ ({ item, index }) => {
          return(
            <ResultCard cardTitle="Classification Results: " imagePath={ imagePath }>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              <Text style={styles.body}>Index: {index + 1}</Text>
              <Text style={styles.body}>Confidence: { (item.confidence * 100).toFixed(2) }% </Text>
              <Text style={styles.body}>Scientific Name: { item.prediction } </Text>
            </ResultCard>
          )
        } }
        />
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