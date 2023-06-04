import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../IP.js";
import * as SecureStore from "expo-secure-store";
import moment from "moment";

export default function Pat_Home_Screen({ navigation }) {
  const [name, setName] = useState("");
  const [traitement, setTraitement] = useState([]);
  useEffect(() => {
    const fetchName = async () => {
      try {
        const id = await SecureStore.getItemAsync("pat_id");
        if (!id) {
          navigation.navigate("Pat_Login");
        }
        const token = await SecureStore.getItemAsync("token");
        const response = await axios.get(`${API_BASE_URL}/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setName(data.nom);
      } catch (error) {
        // console.error(error);
      }
    };

    const fetchDataDoctor = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const id = await SecureStore.getItemAsync("pat_id");
        const response = await axios.get(
          // `${API_BASE_URL}/traitements/patients/7`
          `${API_BASE_URL}/traitements/patients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setTraitement(data[0]);
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
        <Text className="  font-extrabold text-3xl  ">
          <Text className="  font-extrabold text-4xl  text-[#0077B6] ">T</Text>
          abibi
        </Text>
        <Text className="text-[#FF4C4C] mt-6 text-3xl  mx-4">
          Hello{" "}
          <Text className="text-[#ababab] mt-6 text-3xl  mx-4">{name}</Text>
        </Text>
        <Text className="text-[#002B20] font-bold text-4xl  mx-4">Explore</Text>
      </View>
      <View className="bg-[#0072C6] mx-4 mt-5 w-fit drop-shadow-xl rounded-lg">
        <View className="flex-row mx-2 -mt-3">
          <View className="w-56 justify-center">
            <Text className="text-[#f5f5f5] text-2xl mt-4 font-bold">
              Get the best Medical Service
            </Text>
            <Text className="text-[#cccccc] text-lg mb-3 ">
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
        <Text className="mt-5 text-lg text-[#726E6E] ">Last Consultation</Text>
      </View>

      {traitement ? (
        <View className=" items-center mx-5 drop-shadow-2xl">
          <View className="flex-row max-h-24 w-full  items-center mt-3 bg-white border-white rounded-xl border-2 drop-shadow-2xl">
            <View className="ml-3 flex flex-row py-2 px-0 justify-between ">
              <View className=" text-center items-center align-middle justify-center">
                <Text
                  className="text-[#333333] text-xs "
                  lineBreakMode="clip"
                  numberOfLines={2}
                >
                  {traitement.description}
                </Text>

                {traitement.response ? (
                  <Text className="text-gray-400 text-xs w-44">
                    {traitement.response}
                  </Text>
                ) : (
                  <Text className="text-red-400 text-xs ">No response yet</Text>
                )}
                <Text className="text-gray-400 text-xs">
                  {moment(traitement.created_at).format("HH:mm:ss")}
                </Text>
              </View>
              <View className="justify-center ">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Pat_Traitement_Detail", {
                      item: traitement,
                    })
                  }
                  className=" h-full text-center items-center align-middle justify-center"
                >
                  <Text className="text-[#f5f5f5] rounded-2xl p-1 bg-[#FF4C4C] text-base  text-center items-center align-middle justify-center">
                    More {">>"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Urgence_page1", {
              item: traitement,
            })
          }
          className=" h-20 p-2 text-center w-full  items-center align-middle justify-center"
        >
          <Text className="text-[#f5f5f5] place-self-end rounded-2xl p-1 bg-[#FF4C4C] text-base  text-center items-center align-middle justify-center">
            Make a Consultation Now {">>"}
          </Text>
        </TouchableOpacity>
      )}

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
