import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper'

import { View } from '@/components/Themed';

const HistoryCard = ({ children }: any) => (  
  <Card>
    <Card.Content>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </Card.Content>
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

export default HistoryCard;