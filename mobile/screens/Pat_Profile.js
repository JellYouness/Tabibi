import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_IMAGE_URL } from "../IP.js";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import moment from "moment";

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
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");
    navigation.navigate("Pat_Login");
  };

  return (
    <View
      className="pt-16 flex-1  "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <View className="items-center align-middle ">
        <Image
          source={require("../assets/Logo-Doc.png")}
          className="  w-32 h-32 from-neutral-50 drop-shadow-xl rounded-b-full"
        />
      </View>
      <Text className="font-bold text-2xl mt-5 self-center">Profile</Text>

      <View className="mx-auto bg-white px-6 rounded-lg pb-1">
        <View className="flex-row">
          {userInfo.image ? (
            <Image
              source={{
                uri: `${API_IMAGE_URL}/storage/${userInfo.image}`,
              }}
              className="rounded-full w-16 h-16 self-center mt-2 drop-shadow-2xl shadow-2xl"
            />
          ) : (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
              }}
              className="rounded-full w-16 h-16 self-center mt-2 drop-shadow-2xl shadow-2xl"
            />
          )}
          <Text className="font-bold text-2xl mt-4 text-[#00B4D8] self-center">
            {userInfo.nom} {userInfo.prenom}
          </Text>
        </View>
        <Text className="font-bold text-xl mt-4 self-center text-[#333333]">
          Information
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]">telephone :</Text>
          {userInfo.telephone}
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]">CIN :</Text>
          {userInfo.cin}
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]"> Email : </Text>
          {userInfo.email}
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]"> Join at :</Text>
          {moment(userInfo.created_at).format("HH:mm:ss")}
        </Text>
      </View>
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
            <View className=" bg-[#00B4D8] rounded-full h-10 w-10 flex justify-center items-center">
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
{
  /* <Image
  source={require("../assets/Logo-Doc.png")}
  className="h-2/3  w-80 from-neutral-50 drop-shadow-xl rounded-b-full"
/>; */
}
