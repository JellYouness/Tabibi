import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "../../IP.js";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function Urgence_page1({ navigation }) {
  const [urgences, setUrgences] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const id = await SecureStore.getItemAsync("pat_id");
        if (!id) {
          navigation.navigate("Pat_Login");
        }
        const response = await axios.get(`${API_BASE_URL}/urgences`);
        const data = response.data;
        setUrgences(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
  }, []);

  return (
    <View className="flex-1  items-center ">
      <View className=" flex  w-full px-4 pb-3 rounded-b-3xl drop-shadow-xl bg-white flex-row pt-10 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />

        <Text className="text-xl text-black font-extrabold">Les Urgences</Text>

        <Image
          source={require("../../assets/Logo-Doc.png")}
          className="h-14  w-14 from-neutral-50 drop-shadow-xl rounded-lg "
        />
      </View>

      <View className=" flex  justify-between ">
        <FlatList
          //list des traitement render
          data={urgences}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Urgence_page2", { item })}
              className="w-80 mx-4 h-28 m-2  drop-shadow-xl rounded-2xl bg-white"
            >
              <View className="flex-row flex-1">
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
                  }}
                  className="h-24 w-24 m-2 justify-center rounded-xl"
                />
                <View className="justify-center flex-1">
                  <Text className="text-lg text-black font-semibold">
                    Libelle : {item.libelle}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="clip"
                    className=" text-gray-600 text-xs font-light "
                  >
                    <Text className=" text-gray-800 text-xs font-normal ">
                      Description
                    </Text>
                    :{item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="absolute mt-44 -bottom-0 self-center bg-white rounded-2xl h-14 p-3 w-full ">
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
