import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { API_IMAGE_URL } from "../IP";

export default function Pat_Traitement_Detail({ navigation }) {
  const route = useRoute();
  const data = route.params.item;

  return (
    <View className="flex-1  items-center ">
      <View className=" flex  w-full px-4 pb-3 rounded-b-3xl items-center drop-shadow-xl bg-[#0072C6] flex-row pt-10 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />

        <Text className="text-xl text-white font-extrabold">
          Consultation Detail
        </Text>

        <Image
          source={require("../assets/Logo-Doc.png")}
          className="h-14  w-14 from-neutral-50 drop-shadow-xl rounded-lg "
        />
      </View>

      {data.reponse ? (
        <View className=" items-center mt-5 mx-5 drop-shadow-2xl">
          <View className="flex-row max-h-24 w-full  items-center mt-3 bg-white border-white rounded-xl border-2 drop-shadow-2xl">
            {data.medecin.image ? (
              <Image
                className="h-16 self-start w-16 m-2 drop-shadow-xl rounded-lg "
                source={{
                  uri: `${API_IMAGE_URL}/storage/${data.medecin.image}`,
                }}
              />
            ) : (
              <Image
                className="h-16 self-start w-16 m-2 drop-shadow-xl rounded-lg "
                source={{
                  uri: "https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?w=740&t=st=1685247369~exp=1685247969~hmac=df8e69f2275b6b12b7dbf4368101ed750ff32910ceafdafbbca4ea91b3710a66",
                }}
              />
            )}
            <View className="ml-3 flex flex-col ">
              <Text className="font-bold text-xl mt-2 ">
                Dr.{data.medecin.nom}
              </Text>
              <Text className="text-[#333333]  text-xs w-44">
                Specialite :{" "}
                <Text className="text-gray-400 text-xs w-44">
                  {data.medecin.specialite.nom}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="font-semibold text-red-800 text-base"></Text>
      )}
      <View className="mt-6 w-full pl-5 mb-28">
        <View className="mx-2 bg-white p-2 rounded-xl">
          <ScrollView className={data.reponse ? "mb-40" : ""}>
            <Text className="mb-2 mt-2 text-2xl text-[#333333]  font-bold justify-center  self-center">
              Detail
            </Text>
            <View className=" ">
              <Text className="font-light text-gray-500 text-base">
                <Text className="font-bold text-[#333333]  text-base">
                  Description :
                </Text>{" "}
                {data.description}
              </Text>

              <Text className="font-light text-gray-500 text-base">
                <Text className="font-bold text-[#333333]  text-base">
                  Categorie :
                </Text>{" "}
                {data.categorie.libelle}
              </Text>

              <Text className="font-light text-gray-500 text-base">
                <Text className="font-bold text-[#333333]  text-base">
                  Categorie description :
                </Text>{" "}
                {data.categorie.description}
              </Text>

              <Text className=" text-[#333333]  font-bold text-base">
                Response :
                {data.reponse ? (
                  <Text className="font-light text-gray-500 text-base">
                    {" "}
                    {data.reponse}
                  </Text>
                ) : (
                  <Text className="font-semibold text-red-800 text-base">
                    {"  "}
                    <AntDesign name="warning" size={22} color="red" />
                    {"  "}Waiting for a Doctor
                  </Text>
                )}
              </Text>
            </View>
          </ScrollView>
        </View>
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
