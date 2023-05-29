import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../IP";
import * as SecureStore from "expo-secure-store";

export default function Doc_Profile({ navigation }) {
  const [Profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedId = await SecureStore.getItemAsync("med_id");
        if (!storedId) {
          navigation.navigate("Doc_Login");
        }
        const response = await axios.get(
          `${API_BASE_URL}/medecins/${storedId}`
        );
        const data = response.data.data;
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handelLogOut = async () => {
    await SecureStore.deleteItemAsync("med_id");
    navigation.navigate("Pat_Login");
  };
  return (
    <View className="flex-1 flex-col items-center mp-4 ">
      <View className=" flex  bg-[#1C6BA4] w-full px-4 pb-8 rounded-b-3xl drop-shadow-xl flex-row pt-16 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-xl text-white font-extrabold">Détails</Text>
        <Text className="text-xl text-[#1C6BA4]  font-extrabold">{"jj "}</Text>
      </View>
      <View className=" items-center mt-3">
        <View className="flex-row max-h-24 p-3 w-72 items-center mt-3 bg-white border-white rounded-md border-2 drop-shadow-md">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
            }}
            className="h-16 self-start w-16 drop-shadow-xl rounded-lg "
          />
          <View className="ml-3 flex flex-col ">
            <Text className="font-bold mt-2 ">
              {Profile.nom} {Profile.prenom}
            </Text>
            <Text className="text-gray-400 text-xs w-44">
              {Profile.specialite}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-7 w-full pl-5">
        <View className="mx-6 bg-white p-2 rounded-xl">
          <View className="mx-3">
            <Text className="mb-2 font-bold">About</Text>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-base">
                Telephone :{" "}
              </Text>
              <Text className="font-light text-gray-500 text-sm">
                {Profile.telephone}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-base">
                Join At :
              </Text>
              <Text className="font-light text-gray-500 text-sm">
                {Profile.created_at}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-base">
                Naissance :
              </Text>
              <Text className="font-light text-gray-500 text-sm">
                {Profile.naissance}
              </Text>
            </View>
          </View>
        </View>
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
