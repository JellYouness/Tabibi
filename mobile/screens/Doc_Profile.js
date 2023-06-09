import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_IMAGE_URL } from "../IP.js";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import moment from "moment";

export default function Doc_Profile({ navigation }) {
  const [Profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedId = await SecureStore.getItemAsync("med_id");
        const role = await SecureStore.getItemAsync("role");
        if (!storedId || role === "patient") {
          navigation.navigate("Doc_Login");
        }
        const token = await SecureStore.getItemAsync("token");
        const response = await axios.get(
          `${API_BASE_URL}/medecins/${storedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        setProfile(data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handelLogOut = async () => {
    await SecureStore.deleteItemAsync("med_id");
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");

    navigation.navigate("Doc_Login");
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
          {Profile.image ? (
            <Image
              source={{
                uri: `${API_IMAGE_URL}/storage/${Profile.image}`,
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
            {Profile.nom} {Profile.prenom}
          </Text>
        </View>
        <Text className="font-bold text-xl mt-4 self-center text-[#333333]">
          Information
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]">telephone :</Text>
          {Profile.telephone}
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]">CIN :</Text>
          {Profile.cin}
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]"> Email : </Text>
          {Profile.email}
        </Text>
        <Text className="font-bold text-lg mt-4 self-center">
          <Text className="text-[#333333]"> Join at :</Text>
          {moment(Profile.created_at).format("HH:mm:ss")}
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
