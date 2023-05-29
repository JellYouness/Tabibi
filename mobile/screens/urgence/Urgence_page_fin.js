import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "../../IP.js";
import axios from "axios";
import { Button } from "react-native-web";

export default function Urgence_page_fin({ navigation }) {
  const route = useRoute();
  const id_Route = route.params.item.id;
  const [urgence, setUrgence] = useState({});

  
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/categories/${id_Route}`
        );
        const data = response.data.data;
        setUrgence(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
  }, []);

  return (
    <View className="flex-1  items-center bg-white">
      <View className=" flex  w-full px-4 pb-3 rounded-b-3xl drop-shadow-xl bg-white flex-row pt-10 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View className=" w-full mb-3  flex-1 bg-white items-center">
        <Text className="text-xl items-center mb-3 text-gray-900 font-extrabold ">
          {urgence.libelle}
        </Text>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
          }}
          className="h-64 w-4/5 justify-center rounded-xl"
        />
        <ScrollView className="">
          <Text className="text-base items-center  text-gray-700 p-6 ">
            {urgence.description}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Pat_Ajout_Traitement", { urgence })
            }
            className="self-center flex-row items-center justify-center p-3 shadow-sm bg-emerald-400 w-60  mb-3 rounded-xl"
          >
            <Text className="font-bold text-lg ">Consult Now</Text>
            <AntDesign name="doubleright" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
