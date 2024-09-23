import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getInsights } from '../api/analyticsService';

export default function InsightsScreen() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getInsights();
      setInsights(data);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Engagement Insights</Text>
      {insights ? (
        <View>
          <Text>Impressions: {insights.impressions}</Text>
          <Text>Reach: {insights.reach}</Text>
          <Text>Engagement: {insights.engagement}</Text>
        </View>
      ) : (
        <Text>Loading insights...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
