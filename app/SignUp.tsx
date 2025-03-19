import { View, Text, TextInput, Keyboard,TouchableHighlight,KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    
      <KeyboardAvoidingView style = {styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        <Text style={styles.label}>Email:</Text>
        <TextInput
         placeholder='Enter email'
         keyboardType='email-address'
         value={email}
         onChangeText={(prevEmail) => setEmail(prevEmail) }
         style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Password:</Text>
        <TextInput
         placeholder='Enter Passord'
         secureTextEntry={true}
         value={password}
         onChangeText={(prevPassword) => setPassword(prevPassword) }
         style={styles.input}
         
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert('You successfully signed up')}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>Sign Up</Text>
      </TouchableOpacity>

      </KeyboardAvoidingView>
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 2
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 5

  },
  label: {
    marginBottom: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: "#fe103c",
    marginTop: 15,
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 4,
  }
})

export default SignUp