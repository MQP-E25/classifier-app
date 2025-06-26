import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import { View } from '@/components/Themed';
import StyledCard from '@/components/StyledCard';
import CsvUpload from '@/components/CsvUpload';

export default function TabOneScreen() {
  const [resultData, setResultData] = useState<any>(null);
  const router = useRouter();

  const handleFileSelected = async (fileContent: string) => {
    try {
      const csvBlob = new Blob([fileContent], { type: 'text/csv' });
      const formData = new FormData();
      formData.append('csv', csvBlob, 'upload.csv');

      console.log("RAW fileContent", fileContent);
      console.log("RAW csvBlob", csvBlob);
      console.log("RAW formData", formData);

      //fetch response
      const response = await fetch( 'http://127.0.0.1:3000/analyzeCSV', {
        method: 'POST',
        body: formData,
      });

      console.log('Raw response: ', response);

      if(!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      const result = await response.json();
      setResultData(result);

      router.push({
        pathname: "./result",
        params: { fileData: JSON.stringify(result) },
      });
    } catch (err) {
      console.error('Error sending CSV: ', err);
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
