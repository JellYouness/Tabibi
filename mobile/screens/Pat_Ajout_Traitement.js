import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";
import { API_BASE_URL } from "../IP";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Pat_Ajout_Traitement({ navigation }) {
  const route = useRoute();
  const id = route.params.urgence.id;
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const [description, setDescription] = useState("");

  const handleCreateTraitement = async () => {
    const id_patient = await SecureStore.getItemAsync("pat_id");
    const token = await SecureStore.getItemAsync("token");
    if (!id) {
      navigation.navigate("Pat_Login");
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/traitements`,
        {
          date: now,
          etat: false,
          description: description,
          reponse: "",
          categorie_id: id,
          patient_id: id_patient,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("Pat_List_Traitement");
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <View className="flex-1 flex-col bg-white items-center mp-4 ">
      <View className=" flex  bg-[#0077B6] w-full px-4 pb-8 rounded-b-3xl drop-shadow-xl flex-row pt-16 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-xl text-white font-extrabold">
          Add Consultation
        </Text>
        <Text className="text-xl text-[#1C6BA4]  font-extrabold">{"jj "}</Text>
      </View>

      <View className="mt-16 w-full pl-5">
        <View className="mx-6 bg-[#f5f5f5] p-2 rounded-xl">
          <View className="mx-3">
            <Text className="mb-2 font-bold">About</Text>
            <View className="flex-row">
              <Text className="font-normal text-gray-900 text-base">
                Categorie :
              </Text>
              <Text className="font-light text-gray-500 text-base">
                {route.params.urgence.libelle}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="font-medium text-gray-950 text-base">
                Treatment Effectiveness: Assess the effectiveness of your
                medical treatments and track your progress over time.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-col  w-full mt-20">
        <View className="w-full flex-col   ">
          <Text className="w-fit col-start-1 mx-7 mt-4">Description </Text>
          <TextInput
            className="w-80 h-10 bg-[#f5f5f5] mx-7 rounded-md  shadow-sm border-1 p-2 border-gray-400 "
            value={description}
            onChangeText={setDescription}
            placeholder="-----"
          />
        </View>
      </View>
      <View className=" mt-14 w-full  items-center">
        <TouchableOpacity
          className="w-2/3 h-16 bg-[#0072C6] rounded-xl justify-center items-center"
          onPress={handleCreateTraitement}
        >
          <Text className="text-sm text-white font-semibold">
            Add your Consultation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
