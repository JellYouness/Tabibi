import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_IMAGE_URL } from "../IP";
import moment from "moment";
import * as SecureStore from "expo-secure-store";

const image =
  "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71";

export default function Pat_List_Doc({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchDataDoctor();

    const interval = setInterval(fetchDataDoctor, 6000); // Refresh data every 1 minute (adjust as needed)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const fetchDataDoctor = async () => {
    try {
      const id = await SecureStore.getItemAsync("pat_id");
      const token = await SecureStore.getItemAsync("token");
      if (!id) {
        navigation.navigate("Pat_Login");
      }
      const response = await axios.get(
        `${API_BASE_URL}/traitements/patients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="flex-1  items-center ">
      <View className=" flex  w-full px-4 pb-3 rounded-b-3xl drop-shadow-xl bg-[#0072C6] flex-row pt-10 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />

        <Text className="text-xl text-white font-extrabold">
          List Of Consultations
        </Text>

        <Image
          source={require("../assets/Logo-Doc.png")}
          className="h-14  w-14 from-neutral-50 drop-shadow-xl rounded-lg "
        />
      </View>
      <View className=" flex   justify-between">
        <FlatList
          //list des traitement render
          className="mb-40"
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Pat_Traitement_Detail", { item })
              }
              className="w-80 mx-4 h-28  m-2 drop-shadow-xl rounded-2xl bg-white"
            >
              <View className="flex-row">
                {item.medecin ? (
                  item.medecin.image ? (
                    <Image
                      className="h-24 w-24 m-2 justify-center rounded-xl"
                      source={{
                        uri: `${API_IMAGE_URL}/storage/${item.medecin.image}`,
                      }}
                    />
                  ) : (
                    <Image
                      className="h-24 w-24 m-2 justify-center rounded-xl"
                      source={{
                        uri: "https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?w=740&t=st=1685247369~exp=1685247969~hmac=df8e69f2275b6b12b7dbf4368101ed750ff32910ceafdafbbca4ea91b3710a66",
                      }}
                    />
                  )
                ) : (
                  <Image
                    className="h-24 w-24 m-2 justify-center rounded-xl"
                    source={{
                      uri: "https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?w=740&t=st=1685247369~exp=1685247969~hmac=df8e69f2275b6b12b7dbf4368101ed750ff32910ceafdafbbca4ea91b3710a66",
                    }}
                  />
                )}

                <View className="justify-center pl-2">
                  <Text className="font-bold text-xl">
                    {item.medecin ? (
                      <Text className="text-[#333333] ">
                        DR. {item.medecin.nom} {item.medecin.prenom}
                      </Text>
                    ) : (
                      <Text className="font-semibold  text-sm text-red-500 ">
                        {" "}
                        Not Yet tchoosen
                      </Text>
                    )}
                  </Text>
                  <Text className="font-semibold text-sm text-gray-500 w-48 h-10">
                    {item.description}
                  </Text>
                  <View className="flex-row justify-items-center">
                    <View className="bg-green-400 rounded-full m-1">
                      <FontAwesome5 name="clock" size={20} color="white" />
                    </View>
                    <Text className="font-semibold text-sm text-gray-500 justify-center mt-1">
                      {moment(item.created_at).format("HH:mm:ss")}
                    </Text>

                    {item.reponse ? (
                      <View className="pl-2 justify-center">
                        <Feather name="check-circle" size={20} color="black" />
                      </View>
                    ) : (
                      <View className="pl-2 justify-center">
                        <AntDesign name="warning" size={20} color="red" />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
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
