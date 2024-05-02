import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface RecipeData {
  id: number;
  title: string;
  image: string;
  sourceName: string;
  summary: string;
  instructions: string;
  extendedIngredients: {
    original: string;
  }[];
}

export default function RecipePage() {
  const { id } = useLocalSearchParams();
  const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`;
  const [recipe, setRecipe] = useState<RecipeData | null>(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [id]);

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <ScrollView className="absolute h-[100%] bg-green-500 -z-10 w-full">
      <View className="flex justify-between items-center bg-green-500">
        {recipe && (
          <View className="flex justify-between items-center">
            <Text className="mt-12 mb-4 text-2xl font-semibold text-center">
              {recipe.title}
            </Text>
            <View className="flex justify-between items-center">
              <Image
                source={{ uri: recipe.image }}
                style={{ width: 300, height: 300 }}
                className="rounded-xl"
              />
            </View>
            <Text className="mb-12 text-sm">Source: {recipe.sourceName}</Text>
            <Text className="font-semibold text-xl">Summary</Text>
            <ScrollView>
              <Text className=" text-xs p-4">
                {stripHtmlTags(recipe.summary)}
              </Text>
            </ScrollView>
            <Text className="font-semibold text-xl">Ingredients</Text>
            <View className="py-4">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <Text key={index} className="text-sm ml-[10px]">
                  <AntDesign name="arrowright" size={10} color="black" />{" "}
                  {ingredient.original}
                </Text>
              ))}
            </View>
            <Text className="font-semibold text-xl">Instructions</Text>
            <Text className=" text-sm p-4">
              {stripHtmlTags(recipe.instructions)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
