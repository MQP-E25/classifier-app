import { StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

import { View } from '@/components/Themed';
import StyledCard from '@/components/StyledCard';
import CsvUpload from '@/components/CsvUpload';

export default function TabOneScreen() {
  const [resultData, setResultData] = useState<any>(null);
  const router = useRouter();
  const database = useSQLiteContext();

  const handleSubmitResult = async (name : string, confidence_level : string, date_identified : number) => {
    try {
      database.runAsync("INSERT INTO history (scientific_name, confidence_level, date_identified) VALUES (?, ?, ?);", [
        name,
        confidence_level,
        date_identified
      ])
    } catch (err) {
      console.error(err);
    }    
  }

  const handleFileSelected = async (fileContent: string) => {
  try {
    var formData = new FormData();
    if (Platform.OS == 'web') {
      const csvBlob = new Blob([fileContent], { type: 'text/csv' });
      formData.append('csv', csvBlob, 'upload.csv');
    } else {
      // Write the file to a temporary location for native platforms. Necessary for Android and iOS.
      const tempUri = FileSystem.cacheDirectory + 'upload.csv';
      await FileSystem.writeAsStringAsync(tempUri, fileContent, { encoding: FileSystem.EncodingType.UTF8 });
      const file = {
        uri: tempUri,
        name: 'upload.csv',
        type: 'text/csv',
      };
      formData.append('csv', file as any);
    }
    
    const response = await fetch('http://127.0.0.1:2000/analyzeCSV', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server error: ${response.status} - ${text}`);
    }

    const result = await response.json();
    setResultData(result);

    // Save to DB
    await handleSubmitResult(
      result.label,
      result.confidence,
      new Date().getUTCDate()
    );

    // Navigate to result screen
    router.push({
      pathname: './result',
      params: { fileData: JSON.stringify(result) },
    });

  } catch (err) {
    console.error('Error sending CSV:', err);
  }
};

  
  return (
    <View style={styles.container}>
      <StyledCard cardTitle="Classifier" cardContent="Upload CSV to identify species.">
        <CsvUpload onFileSelected={handleFileSelected}/>
      </StyledCard>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    fontSize: 25,
  },
  separator: {
    marginTop: 10,
    marginBottom: 20,
    height: 1,
    width: '80%',
  },
  body: {
    fontSize: 15,
    marginBottom: 20,
  },
});