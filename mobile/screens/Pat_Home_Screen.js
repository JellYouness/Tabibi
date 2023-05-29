import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../IP.js";
import * as SecureStore from "expo-secure-store";

export default function Pat_Home_Screen({ navigation }) {
  const [name, setName] = useState("");
  const [Doc, setDoc] = useState({});
  useEffect(() => {
    const fetchName = async () => {
      try {
        const id = await SecureStore.getItemAsync("pat_id");
        if (!id) {
          navigation.navigate("Pat_Login");
        }
        const response = await axios.get(`${API_BASE_URL}/patients/${id}`);
        const data = response.data.data;
        setName(data.nom);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataDoctor = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medecins/3`);
        const data = response.data.data;
        setDoc(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
    fetchDataDoctor();
  }, []);

  return (
    <View
      className="pt-16 flex-1  "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <View className="w-full mx-4 ">
        <Text className="text-[#002B20] font-semibold text-4xl mx-2">
          Tabibi
        </Text>
        <Text className="text-[#00916E] mt-6 text-3xl  mx-4">
          Hello{" "}
          <Text className="text-[#ababab] mt-6 text-3xl  mx-4">{name}</Text>
        </Text>
        <Text className="text-[#002B20] font-bold text-4xl  mx-4">Explore</Text>
      </View>
      <View className="bg-[#4DCFC0] mx-4 mt-5 w-fit drop-shadow-xl rounded-lg">
        <View className="flex-row mx-2 -mt-3">
          <View className="w-56 justify-center">
            <Text className="text-[#002B20] text-2xl mt-4 font-bold">
              Get the best Medical Service
            </Text>
            <Text className="text-[#828282] text-lg mb-3 ">
              Providing the best medical service emergency{" "}
            </Text>
          </View>
          <Image
            source={require("../assets/Png-Doc.png")}
            className="w-28 h-36 
             from-neutral-50 "
          />
        </View>
      </View>
      <View className="mt-4 w-full p-4">
        <Text className=" text-lg font-bold ">
          We ensure best insurence for our clients
        </Text>
        <Text className="mt-5 text-lg text-[#726E6E] ">Recommended Doctor</Text>
      </View>
      <View className=" items-center mx-5 drop-shadow-2xl">
        <View className="flex-row max-h-24 w-full  items-center mt-3 bg-white border-white rounded-xl border-2 drop-shadow-2xl">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
            }}
            className="h-16 self-start w-16 m-2 drop-shadow-xl rounded-lg "
          />
          <View className="ml-3 flex flex-col ">
            <Text className="font-bold text-xl mt-2 ">
              Dr. {Doc.nom + " " + Doc.prenom}
            </Text>
            <Text className="text-gray-400 text-xs w-44">{Doc.specialite}</Text>
            <Text className="text-gray-400 text-xs w-44">{Doc.telephone}</Text>
          </View>
        </View>
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
