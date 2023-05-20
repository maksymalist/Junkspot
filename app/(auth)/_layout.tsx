import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useNavigation } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="login-variant"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Signup",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="address-card" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
