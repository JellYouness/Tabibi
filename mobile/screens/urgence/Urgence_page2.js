import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "../../IP.js";
import axios from "axios";

export default function Urgence_page2({ navigation }) {
  const route = useRoute();
  const id_Route = route.params.item.id;
  const Urgence_Route = route.params.item;

  const [sousTypes, setSousTypes] = useState([]);

  useEffect(() => {
    const fetchSoustype = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/soustypes/fk/${id_Route}`
        );
        const data = response.data;
        setSousTypes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSoustype();
  }, []);

  return (
    <View className="flex-1  items-center ">
      <View className="  w-full px-4 pb-3 rounded-b-3xl drop-shadow-xl bg-white flex-row pt-10 ">
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View className=" w-full  flex-1 bg-white items-center">
        <Text className="text-xl items-center text-black font-extrabold mt-20">
          {Urgence_Route.libelle}
        </Text>
        <Text className="text-base items-center text-gray-700 p-6">
          {Urgence_Route.description}
        </Text>
        {sousTypes.length ? (
          <></>
        ) : (
          <Text className="text-3xl font-semibold mt-16 items-center text-red-700 p-6 ">
            Sous Type Empty
          </Text>
        )}
        <View className=" flex-1">
          {sousTypes.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate("Urgence_page3", { item })}
                className="flex-row items-center justify-center shadow-sm bg-blue-300 w-60 h-10 mb-3 rounded-xl"
              >
                <Text className="text-xl items-center text-black font-semibold ">
                  {item.libelle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
