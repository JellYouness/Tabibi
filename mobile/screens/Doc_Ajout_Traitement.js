import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../IP";
import * as SecureStore from "expo-secure-store";

export default function Doc_Ajout_Traitement({ navigation }) {
  const [response, setResponse] = useState("");
  const route = useRoute();
  const data = route.params;

  const handleResponse = async () => {
    try {
      const storedId = await SecureStore.getItemAsync("med_id");
      if (!storedId) {
        navigation.navigate("Doc_Login");
      }
      const respon = await axios.put(
        `${API_BASE_URL}/traitements/${data.id}`,
        {
          reponse: response,
          etat: true,
        },
        {
          withCredentials: true,
        }
      );
      navigation.navigate("Doc_List_Patient");
    } catch (error) {
      console.error(error);
    }
  };
  const handleRfuseResponse = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/traitements/${data.id}`,
        {
          medecin_id: 0,
          etat: false,
        },
        {
          withCredentials: true,
        }
      );
      navigation.navigate("Doc_List_Patient");
    } catch (error) {
      console.error(error);
    }
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
        <Text className="text-xl text-white font-extrabold">
          Ajouter Traitement
        </Text>
        <Text className="text-xl text-[#1C6BA4]  font-extrabold">{"jj "}</Text>
      </View>
      <ScrollView className="mt-4  w-full ">
        <View className=" bg-white p-2 mx-5 rounded-xl">
          <View className="mx-3">
            <Text className="mb-2 font-bold">About</Text>
            <View className="flex-row">
              <Text
                className="font-normal text-gray-900 text-base"
                numberOfLines={2}
                lineBreakMode="clip"
              >
                Categorie :
              </Text>
              <Text
                numberOfLines={3}
                lineBreakMode="clip"
                className="font-light text-gray-500 text-sm w-60"
              >
                {data.categorie.libelle}
              </Text>
            </View>
            <Text className="font-normal text-gray-900 text-base">
              Description:
            </Text>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-sm">
                {data.description}
              </Text>
            </View>
            <View>
              <Text>Reponse</Text>
              {data.reponse ? (
                <Text className="font-light text-gray-500 text-sm">
                  {data.reponse}
                </Text>
              ) : (
                <Text className="font-light text-gray-500 text-sm">
                  Waiting
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {!data.reponse ? (
        <>
          <View className="flex-col  w-full mt-4">
            <View className="w-full flex-col   ">
              <Text className="w-fit col-start-1 mx-7 mt-3">
                Reponse de Traitement
              </Text>
              <TextInput
                className="w-80 h-20 bg-white mx-7 rounded-md  shadow-sm border-1 p-2 border-gray-400 "
                placeholder={"---Reponse---"}
                value={response}
                onChangeText={setResponse}
              />
            </View>
          </View>
          <View className=" mt-4 w-full mb-10 items-center">
            <TouchableOpacity
              onPress={handleResponse}
              className="w-2/3 h-16 bg-[#EEA63A] rounded-xl justify-center items-center"
            >
              <Text className="text-sm text-white font-semibold">
                Ajouter Traitement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRfuseResponse}
              className="w-2/3 h-16 mt-3 bg-red-500 rounded-xl justify-center items-center"
            >
              <Text className="text-sm text-white font-semibold">
                Refuser Traitement
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text className="font-light text-gray-500 text-sm"></Text>
      )}
    </View>
  );
}
