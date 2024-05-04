import React from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "@/components/Themed";
import { LinearGradient } from "expo-linear-gradient";

interface ModalScreenProps {
  toggleModal: () => void;
}

export default function SecondModalScreen({ toggleModal }: ModalScreenProps) {
  const colorScheme = useColorScheme();
  const gradientColors =
    colorScheme === "light" ? ["#ffffff", "#c9f5da"] : ["#1A202C", "#374152"];
  return (
    <LinearGradient
      colors={gradientColors}
      className=" absolute h-[100%] z-10 w-full flex justify-center items-center"
    >
      <Text className="font-bold text-4xl">Welcome to</Text>
      <Text className="font-bold mt-2 text-4xl">Flavour-Finder's</Text>
      <Text className="font-bold mt-2 text-4xl">Recipe search</Text>
      <Text className="text-center mx-5 mt-24">
        "Explore endless culinary possibilities with our recipe finder app!
        Enter dish names and our advanced search engine will sift through a
        treasure trove of recipes. Whether you crave comfort food or exotic
        flavors, find your perfect dish effortlessly. Get ready to tantalize
        your taste buds!"
      </Text>
      <Pressable
        onPress={toggleModal}
        className=" bg-green-400 dark:bg-green-700 px-6 py-3 rounded-xl mt-24"
      >
        <Text className="text-xl font-bold">Search Recipe</Text>
      </Pressable>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </LinearGradient>
  );
}
