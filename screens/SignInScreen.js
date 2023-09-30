import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  getAuth,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {auth} from '../firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();
  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const onLoginWithFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onLoginWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        // Handle successful Google sign-in
      })
      .catch(error => {
        // Handle Google sign-in error
        console.error(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assests/Rectangle4777.png')}
        style={styles.image}
      />

      <Text style={styles.heading}>Get Started.</Text>
      <Text style={styles.subHeading}>
        Don't have an account?{' '}
        <Text
          style={styles.linksubHeading}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.googleSignInButton}
        onPress={onLoginWithGoogle}>
        <Image source={require('../assests/google.png')} style={styles.icon} />
        <Text>Sign In With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.facebookSignInButton}
        onPress={onLoginWithFacebook}>
        <Text style={styles.faceBookIcon}>f</Text>
        <Text style={styles.faceBookText}>Sign In With Facebook</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          placeholder="Email address"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text style={styles.label}>Password</Text>

        {/*<View style={styles.passwordInput}>
          <TextInput
            placeholder="Password..."
            secureTextEntry={!showPassword}
            style={styles.password}
            onChangeText={text => setPassword(text)}
            value={password}
          />
  </View>*/}
        <View style={styles.passwordInput}>
          <TextInput
            placeholder="Password..."
            secureTextEntry={!showPassword}
            style={styles.password}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image source={require('../assests/eye.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Company ID</Text>
        <TextInput placeholder="Company ID" style={styles.input} />
      </View>
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={toggleCheckbox}
        isChecked={isChecked}
        rightText={'Remember Me'}
        containerStyle={styles.checkboxContainer}
      />
      <TouchableOpacity style={styles.signInBtn} onPress={onLogin}>
        <Text style={styles.signInText}>Sign IN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(237, 242, 248)',
    margin: '2%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 8,
    textAlign: 'center',
    color: 'black',
  },
  subHeading: {
    textAlign: 'center',
    marginTop: 8,
  },
  linksubHeading: {
    color: '#4D4EBB',
  },
  googleSignInButton: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'white',
    height: 55,
    borderRadius: 8,
  },
  facebookSignInButton: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#3664A2',
    height: 55,
    borderRadius: 8,
  },
  signInBtn: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#4D4EBB',
    height: 55,
    borderRadius: 8,
  },
  icon: {
    marginLeft: wp(23.5),
    width: 20,
    height: 20,
    marginRight: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    backgroundColor: 'lightgrey',
    height: 1,
    flex: 1,
  },
  dividerText: {
    color: '#9197b3',
    paddingHorizontal: 10,
  },
  inputContainer: {
    margin: '2%',
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    borderColor: 'lightgrey',
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: 'lightgrey',
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
  },
  password: {
    flex: 1,
  },
  passwordToggle: {
    padding: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  languageButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: '70%',
    borderWidth: 1,
    height: 40,
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceBookIcon: {
    height: 30,
    width: 30,
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    color: '#3664A2',
    alignItems: 'center',
    fontWeight: 'bold',
    borderColor: '#3664A2',
    paddingLeft: 10,
    marginLeft: wp(20),
    marginRight: 10,
  },
  faceBookText: {
    color: 'white',
  },
  label: {
    marginTop: 2,
    marginBottom: 2,
    color: 'black',
  },
  signInText: {
    color: 'white',
    marginLeft: wp(38),
    fontWeight: 'bold',
  },
});

export default SignInScreen;
