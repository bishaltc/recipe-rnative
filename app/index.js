
import {
  StyleSheet,
  Text,
  View,
   TouchableOpacity,
} from "react-native";
import React from "react";
import {  useNavigation } from "expo-router";


const Index = () => {
  const navigation = useNavigation();

 
  return (
    <View style={styles.container}>
      <Text style={styles.knifeEmoji}>🔪</Text>
      <Text style={styles.title}>MEAL MASTER</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("(tabs)")}>
        <Text style={styles.buttonText}>CLICK ME!!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  knifeEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});