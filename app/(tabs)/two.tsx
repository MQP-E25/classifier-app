import { StyleSheet, FlatList, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

import { Text, View } from '@/components/Themed';
import HistoryCard from '@/components/HistoryCard'

type ResultType = { id: number; scientific_name: string; confidence_level: string; date_identified: string };
export default function TabTwoScreen() {
  const [data, setData] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = Platform.OS === 'web' ? null : useSQLiteContext();
  const database = db;

  const loadData = async () => {
      if (!database ){return;}
      const result = await database.getAllAsync<ResultType>("SELECT * FROM history;");
      console.log("Loaded history:", result); 
      setData(result);
      setIsLoading(false);
  };

  useFocusEffect(
    useCallback (() => {
      if(Platform.OS != 'web'){
        loadData();
      }
    }, [])
  );

  if (Platform.OS == 'web') {
    return (
      <View style= { styles.container} >
        <Text>
          History is not currently available through the web.
        </Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>
          Loading History Entries...
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={ ({ item }) => {
            return (
              <HistoryCard>
                <Text>{ item.scientific_name }</Text>
                <Text>{ item.confidence_level }</Text>
                <Text>{ item.date_identified }</Text>
              </HistoryCard>
            );
          }}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
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
