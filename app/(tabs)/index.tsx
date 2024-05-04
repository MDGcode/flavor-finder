import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
interface RecipeData {
  id: number;
  title: string;
  image: string;
}

export default function TabOneScreen() {
  const [text, setText] = useState("");
  const ingredientUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${text}&number=10&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`;
  const [recipes, setRecipes] = useState<RecipeData[] | null>([]);
  const colorScheme = useColorScheme(); // Get the current color scheme
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
  const gradientColors =
    colorScheme === "light" ? ["#ffffff", "#c9f5da"] : ["#1A202C", "#374152"];
  const buttonColors =
    colorScheme === "light" ? ["#07f261", "#63eb97"] : ["#2f3540", "#4a5261"];
  return (
    <>
      <LinearGradient // Use LinearGradient for the background
        colors={gradientColors} // Define your gradient colors
        className=" absolute h-[100%] -z-10 w-full" // Make it full screen
      >
        <View>
          <View className="flex justify-between items-center  ">
            <SafeAreaView>
              <TextInput
                placeholder="Type your ingredients"
                onChangeText={(newText) =>
                  setText(newText.replace(/\s+/g, ",+"))
                }
                defaultValue={text}
                className=" text-center border-2 rounded-xl py-1 px-10 w-96 h-20 text-2xl dark:text-slate-200 dark:border-slate-200  "
              />
              <Pressable onPress={getApi} className=" text-center my-4">
                <LinearGradient
                  className="border-2"
                  colors={buttonColors}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={{
                    borderRadius: 20,
                    marginBottom: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                  }}
                >
                  <Text className=" text-center font-bold text-2xl opacity-85 dark:text-slate-200 rounded-lg p-2 ">
                    Search by ingredients
                  </Text>
                </LinearGradient>
              </Pressable>
            </SafeAreaView>
            <ScrollView className="grid place-items-center grid-cols-2 rounded-lg">
              {recipes &&
                recipes.map((recipe) => (
                  <LinearGradient
                    colors={gradientColors}
                    key={recipe.id}
                    className=" border-2 rounded-xl mx-4 my-2 p-4 flex justify-between h-96 max-w-full items-center"
                    style={{
                      borderRadius: 20,
                      marginBottom: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.27,
                      shadowRadius: 4.65,
                      elevation: 6,
                    }}
                  >
                    <Text className=" font-bold text-xl mb-2 text-center dark:text-slate-200">
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
                      <LinearGradient
                        className="border-2"
                        colors={buttonColors}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={{
                          borderRadius: 20,
                          paddingVertical: 5,
                          marginVertical: 10,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.27,
                          shadowRadius: 4.65,
                          elevation: 6,
                        }}
                      >
                        <Text className="text-xl font-bold  rounded-xl w-80 text-center dark:text-slate-200">
                          See recipe
                        </Text>
                      </LinearGradient>
                    </Pressable>
                  </LinearGradient>
                ))}
            </ScrollView>
            <StatusBar style="auto" />
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
