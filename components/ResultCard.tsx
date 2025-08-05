import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper'

import { View } from '@/components/Themed';

function fetchImage(scientific_name : string) {
   let imagePath = ""

  switch (scientific_name) {
    case "Sphyrna_mokarran":
      imagePath = "https://upload.wikimedia.org/wikipedia/commons/b/bd/Great_hammerhead2.jpg"
      break;
    case "Raja_clavata": 
      imagePath = "https://i.imgur.com/XjMxHS6.jpeg";
      break;
    case "Rhizoprionodon_acutus":
      imagePath = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Rhizoprionodon_acutus_mangalore2.jpg/250px-Rhizoprionodon_acutus_mangalore2.jpg"
      break;
    default: 
      imagePath = "https://picsum.photos/700" 
  }

  return imagePath;
}

const ResultCard = ({ cardTitle, index, confidence, scientific_name }: any) => (  
  <Card style={styles.container}>
    <Card.Content>
      <Text variant="titleLarge">{cardTitle}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </Card.Content>
    <Card.Cover source={{uri: fetchImage(scientific_name)}} />
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <Card.Content>
        <Text variant="bodySmall">Index: {index}</Text>
        <Text variant='bodyMedium'>Species Name: {scientific_name.replace("_", " ")}</Text>
        <Text variant="bodyMedium">Confidence Level: {confidence}%</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 255,
    overflow: 'hidden',
    margin: 4,
  },
  title: {
    fontSize: 25,
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    height: 1,
    width: '80%',
  },
  body: {
    fontSize: 15,
    marginBottom: 20,
  },
});

export default ResultCard;