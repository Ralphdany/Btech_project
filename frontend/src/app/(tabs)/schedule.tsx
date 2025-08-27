import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const schedule = () => {
  const [selected, setSelected] = useState('');
  return (
    <View className='flex-1 bg-white p-3'>
      <Text className='font-bold text-3xl my-3'>Schedule a study lesson</Text>
      <Calendar
        style={{borderWidth: 1, borderColor: "#06b6d4", borderRadius:10, marginBlock: 16}}
        onDayPress={day => {
          setSelected(day.dateString);
          console.log('selected day', selected);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedColor: '#06b6d4'}
        }}
      />
      <TouchableOpacity className='my-3 py-10 px-4'>
        <Text className='bg-cyan-500 text-white p-3 rounded-lg text-center text-lg font-bold'>
          Schedule Lesson
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default schedule