import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../IP.js";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function Pat_Profile({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    featchDataUser();
  }, []);
  const featchDataUser = async () => {
    try {
      const id = await SecureStore.getItemAsync("pat_id");
      if (!id) {
        navigation.navigate("Pat_Login");
      }
      const response = await axios.get(`${API_BASE_URL}/patients/${id}`);
      setUserInfo(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelLogOut = async () => {
    await SecureStore.deleteItemAsync("pat_id");
    navigation.navigate("Pat_Login");
  };

  return (
    <View
      className="pt-16 flex-1  "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <Text className="font-bold text-2xl mt-5 self-center">Profile</Text>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
        }}
        className="rounded-full w-28 h-28 self-center mt-2 drop-shadow-2xl shadow-2xl"
      />
      <Text className=" text-xl text-gray-400 mt-2 self-center">membre</Text>
      <Text className="font-bold text-2xl mt-4 text-cyan-700 self-center">
        {userInfo.nom} {userInfo.prenom}
      </Text>
      <Text className="font-bold text-xl mt-4 self-center text-blue-900">
        Information
      </Text>
      <Text className="font-bold text-lg mt-4 self-center">
        telephone : {userInfo.telephone}
      </Text>
      <Text className="font-bold text-lg mt-4 self-center">
        cin : {userInfo.cin}
      </Text>
      <Text className="font-bold text-lg mt-4 self-center">
        Email : {userInfo.email}
      </Text>
      <Text className="font-bold text-lg mt-4 self-center">
        Join at : {userInfo.created_at}
      </Text>
      <Text className="font-bold text-lg mt-4 self-center">
        Gander : {userInfo.civilité}
      </Text>
      <View className=" mx-10 ">
        <TouchableOpacity
          className="mt-3 h-12 w-60 justify-center self-center rounded-lg bg-green-400 shadow-lg"
          onPress={handelLogOut}
        >
          <Text className=" self-center text-xl text-white">LogOut</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute -bottom-0 self-center bg-white rounded-2xl h-14 p-3 w-full ">
        <View className="flex-row space-x-10  align-middle justify-center  items-center justify-items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Pat_Home_Screen")}
          >
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Pat_List_Doc")}>
            <Entypo name="list" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Urgence_page1")}
          >
            <View className=" bg-[#FF0000] rounded-full h-10 w-10 flex justify-center items-center">
              <AntDesign name="pluscircleo" size={28} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Pat_List_Traitement")}
          >
            <Ionicons name="chatbox-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Pat_Profile")}>
            <AntDesign name="user" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
