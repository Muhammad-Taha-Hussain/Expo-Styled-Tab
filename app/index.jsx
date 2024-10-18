import { View, Text } from "react-native";
import React from "react";
import ColorList from "../components/ColorList";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
      <ColorList color="#0891b2" />

    </View>
  );
};

export default Home;
