import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useNavigation } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <AntDesign name="camerao" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Images",
          tabBarIcon: ({ color }) => (
            <Entypo name="images" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
