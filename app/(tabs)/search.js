import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function Search() {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    setMeal(data.meals[0]);
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mealContainer}>
        <Image 
          source={{ uri: meal.strMealThumb }} 
          style={styles.mealImage}
        />
        <Text style={styles.mealName}>{meal.strMeal}</Text>
        <View style={styles.mealDescriptionContainer}>
          <Text style={styles.mealDescription}>{meal.strInstructions}</Text>
        </View>
        <Button 
          title="What's Next" 
          onPress={fetchRandomMeal} 
          color="#FFA500"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealContainer: {
    alignItems: 'center',
  },
  mealImage: {
    width: '40%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  mealDescriptionContainer: {
    width: '40%',
    marginTop: 10,
  },
  mealDescription: {
    fontSize: 14,
    color: '#333',
  },
});
