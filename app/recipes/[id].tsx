import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
interface RecipeData {
  id: number;
  title: string;
  image: string;
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <View className="flex justify-between items-center bg-green-500">
      {recipe && (
        <View>
          <Text className="mt-12 mb-4 text-4xl font-semibold text-center">
            {recipe.title}
          </Text>
          <View className="flex mb-12 justify-between items-center">
            <Image
              source={{ uri: recipe.image }}
              style={{ width: 350, height: 350 }}
              className=" rounded-xl"
            />
          </View>
        </View>
      )}
    </View>
  );
}
