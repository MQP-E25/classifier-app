import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text} from 'react-native-paper'

import { View } from '@/components/Themed';

const StyledCard = ({ children, cardTitle, cardContent }: any) => (
  <Card style={styles.container}>
    <Card.Content>
      <Text style= {styles.text} variant="titleLarge">{cardTitle}</Text>
      <Text style={styles.text} variant="bodyMedium">{cardContent}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      {children}
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    width: 255,
    backgroundColor: '#EEF7EE',
  },
  separator: {
    marginTop: 10,
    marginBottom: 20,
    height: 1,
    width: '80%',
  },
  text: {
    color: '#448D44',
  },
});

export default StyledCard;