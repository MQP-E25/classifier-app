import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, Text} from 'react-native-paper'

import { View } from '@/components/Themed';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="icons" />


const ResultCard = ({ children, cardTitle, cardContent, imagePath }: any) => (  
  <Card>
    <Card.Content>
      <Text variant="titleLarge">{cardTitle}</Text>
      <Text variant="bodyMedium">{cardContent}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </Card.Content>
    <Card.Cover source={{uri: imagePath}} />
    <Card.Content>
        {children}
    </Card.Content>
  </Card>
);

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

export default ResultCard;