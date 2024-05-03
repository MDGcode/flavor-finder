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
import { Link, router } from "expo-router";
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
      <View className=" absolute h-[100%] bg-gray-200 dark:bg-slate-800 -z-10 w-full">
        <View className="flex justify-between items-center bg-gray-200 dark:bg-slate-800 ">
          <SafeAreaView>
            <TextInput
              placeholder="Type your ingredients"
              onChangeText={(newText) => setText(newText.replace(/\s+/g, ",+"))}
              defaultValue={text}
              className=" text-center border-2 rounded-xl py-1 px-10 w-96 h-20 text-2xl dark:border-slate-300 dark:text-slate-300 "
            />
            <Pressable onPress={getApi} className=" text-center my-4">
              <Text className=" text-center font-bold text-2xl bg-gray-400 opacity-85 border-2 border-slate-800 dark:bg-slate-500 dark:border-black rounded-lg p-2 ">
                Search by ingredients
              </Text>
            </Pressable>
          </SafeAreaView>
          <ScrollView className="grid place-items-center grid-cols-2 bg-gray-300 dark:bg-slate-600  rounded-lg">
            {recipes &&
              recipes.map((recipe) => (
                <View
                  key={recipe.id}
                  className=" border-2 rounded-xl mx-4 my-2 p-4 flex justify-between h-96 max-w-full items-center"
                >
                  <Text className=" font-bold text-xl mb-2 text-center">
                    {recipe.title}
                  </Text>

                  <Image
                    source={{ uri: recipe.image }}
                    style={{ width: 200, height: 200 }}
                    alt="Recipe image"
                    className=" rounded-xl border-2 border-black"
                  />
                  <Pressable
                    onPress={() => router.push(`/recipes/${recipe.id}`)}
                  >
                    <Text className="text-xl font-bold mt-2 p-2  bg-gray-400 dark:bg-slate-500  rounded-xl w-80 text-center border-2">
                      See recipe
                    </Text>
                  </Pressable>
                </View>
              ))}
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      </View>
    </>
  );
}
