import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { API_IMAGE_URL } from "../IP";

export default function Pat_Med_Profile({ navigation }) {
  const route = useRoute();

  const data = route.params.item;
  return (
    <View className="flex-1 flex-col bg-white items-center mp-4 ">
      <View className=" flex  bg-[#0072C6] w-full px-4 pb-8 rounded-b-3xl drop-shadow-xl flex-row pt-16 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-xl text-white font-extrabold">About Doctor</Text>
        <Text className="text-xl text-[#4DCFC0]  font-extrabold"> </Text>
      </View>
      <View className="w-full items-center justify-center">
        {data.image ? (
          <Image
            className="h-32 self-center w-32 rounded-full shadow-black mt-14 drop-shadow-xl  "
            source={{ uri: `${API_IMAGE_URL}/storage/${data.image}` }}
          />
        ) : (
          <Image
            className="h-32 self-center w-32 rounded-full mt-14 drop-shadow-xl  "
            source={{
              uri: "https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?w=740&t=st=1685247369~exp=1685247969~hmac=df8e69f2275b6b12b7dbf4368101ed750ff32910ceafdafbbca4ea91b3710a66",
            }}
          />
        )}
      </View>

      <View className=" w-full pl-5">
        <View className="mx-6 bg-[#86cdff] p-2 rounded-xl">
          <View className="mx-1">
            <Text className="font-bold text-[#333333] text-xl mt-2 ">
              Dr. {data.nom} {data.prenom}
            </Text>
            <Text className="text-gray-600 text-xs w-44">
              Specialite :{" "}
              <Text className="text-gray-400 text-xs w-44">
                {data.specialite.libelle}
              </Text>
            </Text>
            <Text className="mb-2 text-lg font-bold">About</Text>
            <View className="">
              <Text className="font-light text-[#333333] text-base">
                <Text className="font-normal text-black text-base">
                  Adresse :{" "}
                </Text>
                {"MBBS, Ph.D., Fellow, International College of Surgeons."}
              </Text>
              <Text className="font-light text-[#333333] text-base">
                <Text className="font-normal text-black text-base">
                  Telephone :{" "}
                </Text>
                {data.telephone}
              </Text>
              <Text className="font-light text-[#333333] text-base">
                <Text className="font-normal text-black text-base">
                  Email :{" "}
                </Text>
                {data.email}
              </Text>
              <Text className="font-light text-[#333333] text-base">
                <Text className="font-normal text-black text-base">
                  Specialite :{" "}
                </Text>
                {data.specialite}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="font-light text-[#333333] text-sm">{""}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
