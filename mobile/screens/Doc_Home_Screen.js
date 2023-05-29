import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function Doc_Home_Screeen({ navigation }) {
  useEffect(() => {
    const fetchMedId = async () => {
      const storedId = await SecureStore.getItemAsync("med_id");
      if (!storedId) {
        navigation.navigate("Doc_Login");
      }
    };
    fetchMedId();
  }, []);

  return (
    <View
      className="pt-16 flex-1 "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <View className="flex-row mx-9">
        <Text className="text-4xl  color-cyan-600 font-extrabold flex-1 drop-shadow-xl">
          Tabibi
        </Text>
        <Image
          source={require("../assets/Logo-Doc.png")}
          className="h-16  w-20 from-neutral-50 drop-shadow-xl rounded-lg "
        />
      </View>
      <View className="mt-3 mx-14 shadow-lg">
        <Text className=" text-2xl color-cyan-600">
          Hello
          <Text className="font-light text-base color-gray-600">{}</Text>
        </Text>
      </View>
      <View className="mx-8 mt-6">
        <Text className="mx-8 mb-4">Services</Text>
        <View className="flex-row space-x-4 mb-3">
          <Image
            source={require("../assets/1.png")}
            className="h-16  w-16 bg-cyan-100 drop-shadow-xl rounded-lg p-3"
          />
          <Image
            source={require("../assets/2.png")}
            className="h-16  w-16 bg-orange-100 drop-shadow-xl rounded-lg p-3"
          />
          <Image
            source={require("../assets/3.png")}
            className="h-16  w-16 bg-cyan-100 drop-shadow-xl rounded-lg p-3"
          />
          <Image
            source={require("../assets/4.png")}
            className="h-16  w-16 bg-pink-100 drop-shadow-xl rounded-lg p-3"
          />
        </View>
      </View>

      <View className="absolute -bottom-0 self-center bg-white rounded-2xl h-14 p-3 w-full ">
        <View className="flex-row space-x-14  align-middle justify-center  items-center justify-items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Doc_Home_Screen")}
          >
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Doc_List_Patient")}
          >
            <View className=" bg-[#E64646] rounded-full h-10 w-10 flex justify-center items-center">
              <AntDesign name="pluscircleo" size={28} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Doc_Profile")}>
            <AntDesign name="user" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
