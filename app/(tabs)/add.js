import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    intro: "",
    description: "",
    ingredients: [{ text: "", quantity: "" }],
    steps: [""],
  });

  const [submittedRecipe, setSubmittedRecipe] = useState(null);

  const updateRecipe = (key, value) => {
    setRecipe((prev) => ({ ...prev, [key]: value }));
  };

  const updateIngredient = (index, key, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][key] = value;
    updateRecipe("ingredients", updatedIngredients);
  };

  const updateStep = (index, value) => {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;
    updateRecipe("steps", updatedSteps);
  };

  const addItem = (key, item) => {
    updateRecipe(key, [...recipe[key], item]);
  };

  const removeItem = (key, index) => {
    updateRecipe(
      key,
      recipe[key].filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    setSubmittedRecipe(recipe); 
    setRecipe({
      name: "",
      intro: "",
      description: "",
      ingredients: [{ text: "", quantity: "" }],
      steps: [""],
    }); // Reset the form
  };

  return (
    <ScrollView style={styles.container}>
      {submittedRecipe ? (
        <View>
          <Text style={styles.header}>Submitted Recipe</Text>
          <Text style={styles.subheader}>Name: {submittedRecipe.name}</Text>
          <Text style={styles.subheader}>Intro: {submittedRecipe.intro}</Text>
          <Text style={styles.subheader}>Description: {submittedRecipe.description}</Text>

          <Text style={styles.subheader}>Ingredients:</Text>
          {submittedRecipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
              - {ingredient.text} ({ingredient.quantity})
            </Text>
          ))}

          <Text style={styles.subheader}>Steps:</Text>
          {submittedRecipe.steps.map((step, index) => (
            <Text key={index} style={styles.text}>
              {index + 1}. {step}
            </Text>
          ))}

          <Button
            title="Add New Recipe"
            onPress={() => setSubmittedRecipe(null)}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.header}>Add Recipe</Text>

          <TextInput
            style={styles.input}
            placeholder="Recipe Name"
            value={recipe.name}
            onChangeText={(text) => updateRecipe("name", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Intro"
            value={recipe.intro}
            onChangeText={(text) => updateRecipe("intro", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={recipe.description}
            onChangeText={(text) => updateRecipe("description", text)}
          />

          <Text style={styles.subheader}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Ingredient"
                value={ingredient.text}
                onChangeText={(text) =>
                  updateIngredient(index, "text", text)
                }
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Quantity"
                value={ingredient.quantity}
                onChangeText={(text) =>
                  updateIngredient(index, "quantity", text)
                }
              />
              <TouchableOpacity onPress={() => removeItem("ingredients", index)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Add Ingredient" onPress={() => addItem("ingredients", { text: "", quantity: "" })} />

          <Text style={styles.subheader}>Steps</Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                style={[styles.input, styles.stepInput]}
                placeholder={`Step ${index + 1}`}
                value={step}
                onChangeText={(text) => updateStep(index, text)}
              />
              <TouchableOpacity onPress={() => removeItem("steps", index)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Add Step" onPress={() => addItem("steps", "")} />

          <View style={styles.submitButtonContainer}>
            <Button title="Submit Recipe" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF6F00",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  stepInput: {
    flex: 1,
  },
  removeButton: {
    color: "red",
    marginLeft: 8,
  },
  submitButtonContainer: {
    marginTop: 20, 
  },
});

export default AddRecipe;
