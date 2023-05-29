import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Doc_Patient_Traitment({ navigation, name }) {
  return (
    <View className="flex-1 flex-col items-center mp-4 ">
      <View className=" flex  bg-[#1C6BA4] w-full px-4 pb-8 rounded-b-3xl drop-shadow-xl flex-row pt-16 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-xl text-white font-extrabold">Détails</Text>
        <Text className="text-xl text-[#1C6BA4]  font-extrabold">{"jj "}</Text>
      </View>
      <View className=" items-center mt-3">
        <View className="flex-row max-h-24 p-3 w-72 items-center mt-3 bg-white border-white rounded-md border-2 drop-shadow-md">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71",
            }}
            className="h-16 self-start w-16 drop-shadow-xl rounded-lg "
          />
          <View className="ml-3 flex flex-col ">
            <Text className="font-bold mt-2 ">{name} name</Text>
            <Text className="text-gray-400 text-xs w-44">{name} </Text>
          </View>
        </View>
      </View>
      <View className="mt-7 w-full pl-5">
        <View className="mx-6 bg-white p-2 rounded-xl">
          <View className="mx-3">
            <Text className="mb-2 font-bold">About</Text>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-base">
                Adresse :{" "}
              </Text>
              <Text className="font-light text-gray-500 text-sm">LORRR</Text>
            </View>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-base">
                Fav Urgence :
              </Text>
              <Text className="font-light text-gray-500 text-sm">
                {" "}
                Texttttt
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className=" mt-32 w-full  items-center">
        <TouchableOpacity className="w-2/3 h-16 bg-[#4B92D4] rounded-lg justify-center items-center">
          <Text className="text-sm text-white font-semibold">Text Now</Text>
        </TouchableOpacity>
      </View>
      <View className=" mt-4 w-full  items-center">
        <TouchableOpacity
          className="w-2/3 h-16 bg-[#EEA63A] rounded-xl justify-center items-center"
          onPress={() => navigation.navigate("Doc_Ajout_Traitement")}
        >
          <Text className="text-sm text-white font-semibold">
            Ajouter Traitement
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
