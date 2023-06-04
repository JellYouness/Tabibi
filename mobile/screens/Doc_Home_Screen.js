import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function Doc_Home_Screeen({ navigation }) {
  useEffect(() => {
    const fetch = async () => {
      const storedId = await SecureStore.getItemAsync("med_id");
      const role = await SecureStore.getItemAsync("role");
      if (!storedId || role === "patient") {
        navigation.navigate("Doc_Login");
      }
    };
    // fetch();
  }, []);

  return (
    <View
      className="pt-16 flex-1 "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <View className="flex-row mt-3  w-full items-center justify-center">
        <Image
          source={require("../assets/Logo-Doc.png")}
          className="h-52  w-52 from-neutral-50 drop-shadow-xl rounded-b-full"
        />
      </View>
      <View className="mt-3 w-full items-center justify-center shadow-lg">
        <Text className="  font-extrabold text-3xl mt-2 ">
          <Text className="  font-extrabold text-4xl mt-2 text-[#0077B6] ">
            T
          </Text>
          abibi
        </Text>
      </View>
      <View className="mx-8 mt-6">
        <Text className="mx-8 mb-4">Services</Text>
        <View className="flex-row space-x-4 mb-3">
          <Image
            source={require("../assets/1.png")}
            className="h-16  w-16 bg-[#00FFFF] drop-shadow-xl rounded-lg p-3"
          />
          <Image
            source={require("../assets/2.png")}
            className="h-16  w-16 bg-[#FF6347] drop-shadow-xl rounded-lg p-3"
          />
          <Image
            source={require("../assets/3.png")}
            className="h-16  w-16 bg-[#baffff]  drop-shadow-xl rounded-lg p-3"
          />
          <Image
            source={require("../assets/4.png")}
            className="h-16  w-16 bg-[#ffe1ff] drop-shadow-xl rounded-lg p-3"
          />
        </View>
      </View>

      <View className="mx-8 mt-6 ">
        <Text className="font-bold text-lg text-center text-[#333333] p-1 rounded-xl bg-white">
          TABIBI's home screen provides doctors with a centralized platform to
          efficiently navigate through their daily tasks.
        </Text>
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
            <View className=" bg-[#00B894] rounded-full h-10 w-10 flex justify-center items-center">
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
