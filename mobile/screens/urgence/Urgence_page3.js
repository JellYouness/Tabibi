import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "../../IP.js";
import axios from "axios";
import moment from "moment";

export default function Urgence_page3({ navigation }) {
  const route = useRoute();
  const id_Route = route.params.item.id;
  const SousTypes_Route = route.params.item;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/categories/fk/${id_Route}`
        );
        const data = response.data;
        setCategories(data);
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

      <View className=" w-full  flex-1 bg-white items-center">
        <Text className="text-xl items-center text-black font-extrabold ">
          {SousTypes_Route.libelle}
        </Text>
        <Text className="text-base items-center text-gray-700 p-6 ">
          {SousTypes_Route.description}
        </Text>
        {categories.length ? (
          <></>
        ) : (
          <Text className="text-3xl font-semibold mt-16 items-center text-red-700 p-6 ">
            Sous Type Empty
          </Text>
        )}
        <FlatList
          //list des traitement render
          className="bg-white"
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Urgence_page_fin", { item })}
              className="w-80 mx-4 h-28 m-2  drop-shadow-xl rounded-2xl bg-blue-200"
            >
              <View className="flex-row flex-1">
                <Image
                  source={{
                    // TODO:Need to change the pic
                    uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
                  }}
                  className="h-24 w-24 m-2 justify-center rounded-xl"
                />
                <View className="justify-center flex-1">
                  <Text className="text-lg text-black font-semibold">
                    {item.libelle}
                  </Text>
                  <Text
                    lineBreakMode="clip"
                    numberOfLines={3}
                    className=" text-gray-600 text-xs font-light "
                  >
                    <Text className=" text-gray-900 text-sm font-normal ">
                      Last Update :
                    </Text>
                    {moment(item.updated_at).format("HH:mm:ss")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
