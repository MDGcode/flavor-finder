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
export default function TabTwoScreen() {
  const [text, setText] = useState("");
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text}&number=10&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`;
  const [recipes, setRecipes] = useState<RecipeData[] | null>([]);

  const getApi = () => {
    axios
      .get(url)
      .then((response) => {
        setRecipes(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  return (
    <>
      <View className=" absolute h-[100%] bg-green-500 -z-10 w-full">
        <View className="flex justify-between items-center bg-green-500 ">
          <SafeAreaView>
            <TextInput
              placeholder="Search recipe"
              onChangeText={(newText) => setText(newText)}
              defaultValue={text}
              className=" text-center border-2 rounded-xl py-1 px-10 w-96 h-20 text-2xl"
            />
            <Pressable onPress={getApi} className=" text-center my-4">
              <Text className=" text-center font-bold text-2xl bg-green-600 border-2 border-green-800 rounded-lg p-2">
                Search
              </Text>
            </Pressable>
          </SafeAreaView>
          <ScrollView className="grid place-items-center grid-cols-2 bg-green-400  rounded-lg">
            {Array.isArray(recipes) &&
              recipes.map((recipe) => (
                <View
                  key={recipe.id}
                  className="border-2 rounded-xl mx-4 my-2 p-4 flex justify-between h-96 max-w-full items-center"
                >
                  <Text className=" font-bold text-xl mb-2 text-center">
                    {recipe.title}
                  </Text>
                  <Image
                    source={{ uri: recipe.image }}
                    style={{ width: 200, height: 200 }}
                    alt="Recipe image"
                    className=" rounded-xl"
                  />
                  <Pressable
                    onPress={() => router.push(`/recipes/${recipe.id}`)}
                  >
                    <Text className="text-xl font-bold mt-2 p-2 bg-green-600 rounded-xl w-80 text-center border">
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
