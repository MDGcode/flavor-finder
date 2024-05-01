import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import axios from "axios";
import React from "react";
interface RecipeData {
  id: number;
  title: string;
  image: string;
}

export default function TabOneScreen() {
  const [text, setText] = useState("");
  const ingredientUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${text}&number=10&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`;
  const [recipes, setRecipes] = useState<RecipeData[] | null>([]);
  const getApi = () => {
    axios
      .get(ingredientUrl)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View className="flex justify-between items-center bg-green-500 ">
        <SafeAreaView>
          <TextInput
            placeholder="Search recipe"
            onChangeText={(newText) =>
              setText(newText.replace(/\s+/g, ",+").toLowerCase())
            }
            defaultValue={text}
            className=" text-center border-2 rounded-xl py-1 px-10 w-96 "
          />
          <Pressable onPress={getApi} className=" text-center my-4">
            <Text className=" text-center font-bold text-2xl bg-green-600 border border-green-800 rounded-lg">
              Search
            </Text>
          </Pressable>
        </SafeAreaView>
        <ScrollView className="grid place-items-center grid-cols-2 bg-green-400  rounded-lg">
          {recipes &&
            recipes.map((recipe) => (
              <View
                key={recipe.id}
                className=" border-2 rounded-xl mx-4 my-2 p-4"
              >
                <Text>ID: {recipe.id}</Text>
                <Text>Title: {recipe.title}</Text>

                <Text>Image: {recipe.image}</Text>
                <Image
                  source={{ uri: recipe.image }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </>
  );
}
