import { StyleSheet, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

import { Text, View } from '@/components/Themed';
import HistoryCard from '@/components/HistoryCard'


type ResultType = { id: number; scientific_name: string; confidence_level: string; date_identified: string };
export default function TabTwoScreen() {
  const [data, setData] = useState<ResultType[]>([]);

  const database = useSQLiteContext();

  const loadData = async () => {
    const result = await database.getAllAsync<ResultType>("SELECT * FROM history;");
    setData(result);
  };

  useFocusEffect(
    useCallback (() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={data}
          renderItem={ ({ item }) => {
            return (
              <HistoryCard>
                <Text>{ item.scientific_name }</Text>
                <Text>{ item.confidence_level }</Text>
                <Text>{ item.date_identified }</Text>
              </HistoryCard>
            );
          }}
        />
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  body: {
    fontSize: 15,
    fontWeight: 'light',
    marginTop: 10,
  }
});
