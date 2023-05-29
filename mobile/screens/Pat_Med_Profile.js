import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function Pat_Med_Profile({ navigation }) {
  const route = useRoute();

  const data = route.params.item;
  return (
    <View className="flex-1 flex-col items-center mp-4 ">
      <View className=" flex  bg-[#1C6BA4] w-full px-4 pb-8 rounded-b-3xl drop-shadow-xl flex-row pt-16 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-xl text-white font-extrabold">About Doctor</Text>
        <Text className="text-xl text-[#4DCFC0]  font-extrabold"> </Text>
      </View>
      <View className=" items-center mt-5 mx-5 drop-shadow-2xl">
        <View className="flex-row max-h-24 w-full  items-center mt-3 bg-white border-white rounded-xl border-2 drop-shadow-2xl">
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/doctor-with-glasses-holding-clipboard_23-2147791170.jpg?w=996&t=st=1681957637~exp=1681958237~hmac=5debf22db2a6a5c9a4ea3ec44983b4079f8172169478a52917ef5958003205fe",
            }}
            className="h-16 self-start w-16 m-2 drop-shadow-xl rounded-lg "
          />
          <View className="ml-3 flex flex-col ">
            <Text className="font-bold text-xl mt-2 ">
              Dr. {data.nom} {data.prenom}
            </Text>
            <Text className="text-gray-600 text-xs w-44">
              Specialite :{" "}
              <Text className="text-gray-400 text-xs w-44">
                {data.specialite.libelle}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-16 w-full pl-5">
        <View className="mx-6 bg-white p-2 rounded-xl">
          <View className="mx-3">
            <Text className="mb-2 font-bold">About</Text>
            <View className="">
              <Text className="font-light text-gray-500 text-base">
                <Text className="font-light text-gray-800 text-base">
                  Adresse :{" "}
                </Text>
                {"MBBS, Ph.D., Fellow, International College of Surgeons."}
              </Text>
              <Text className="font-light text-gray-500 text-base">
                <Text className="font-light text-gray-800 text-base">
                  Telephone :{" "}
                </Text>
                {data.telephone}
              </Text>
              <Text className="font-light text-gray-500 text-base">
                <Text className="font-light text-gray-800 text-base">
                  Email :{" "}
                </Text>
                {data.email}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="font-light text-gray-500 text-sm">{""}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
