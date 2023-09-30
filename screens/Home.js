import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig'; // Replace with your firebase config path
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('SignIn'); // Replace 'Login' with the route name for your login screen
        console.log('Signed out successfully');
      })
      .catch(error => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Home</Text>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default Home;
