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
import { API_BASE_URL, API_IMAGE_URL } from "../../IP.js";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function Urgence_page_fin({ navigation }) {
  const route = useRoute();
  const id_Route = route.params.item.id;
  const [urgence, setUrgence] = useState({});

  useEffect(() => {
    const fetchName = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        const response = await axios.get(
          `${API_BASE_URL}/categories/${id_Route}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
        {urgence.image ? (
          <Image
            className="h-64 w-4/5 justify-center rounded-xl"
            source={{
              uri: `${API_IMAGE_URL}/storage/${urgence.image}`,
            }}
          />
        ) : (
          <Image
            className="h-64 w-4/5 justify-center rounded-xl"
            source={{
              uri: "https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?w=740&t=st=1685247369~exp=1685247969~hmac=df8e69f2275b6b12b7dbf4368101ed750ff32910ceafdafbbca4ea91b3710a66",
            }}
          />
        )}

        <ScrollView className="">
          <Text className="text-base items-center  text-gray-700 p-6 ">
            {urgence.description}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Pat_Ajout_Traitement", { urgence })
            }
            className="self-center flex-row items-center justify-center p-3 shadow-sm bg-[#00B4D8] w-60  mb-3 rounded-xl"
          >
            <Text className="font-bold text-lg ">Consult Now</Text>
            <AntDesign name="doubleright" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
