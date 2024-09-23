import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { schedulePost } from '../utils/scheduler';

export default function SchedulePostScreen() {
  const [topic, setTopic] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postTime, setPostTime] = useState(new Date());

  const handleSchedule = () => {
    schedulePost(topic, imageUrl, postTime);
    alert('Post scheduled successfully!');
  };

  return (
    <View style={styles.container}>
      <Text>Enter Topic</Text>
      <TextInput
        style={styles.input}
        value={topic}
        onChangeText={setTopic}
      />
      <Text>Enter Image URL</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Text>Select Date & Time</Text>
      <DatePicker
        style={styles.datePicker}
        date={postTime}
        mode="datetime"
        placeholder="Select Date and Time"
        format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setPostTime(date)}
      />
      <Button title="Schedule Post" onPress={handleSchedule} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 12,
  },
});
