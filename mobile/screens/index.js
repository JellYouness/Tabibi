import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View className="flex-1 items-center bg-black justify-center bgrk">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="dark" />
    </View>
  );
}
