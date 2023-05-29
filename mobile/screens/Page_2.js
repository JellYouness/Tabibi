import { Image, Text, View, TouchableOpacity } from "react-native";

export default function Page_3({ navigation }) {
  return (
    <View
      className="flex-1 flex-col items-center  justify-center mt-4 "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <View
        className=" mx-5 basis-2/3 items-center  justify-center w-full rounded-br-full shadow-md "
        style={{
          backgroundColor: "#ECF2F3",
          borderBottomLeftRadius: 150,
          borderBottomRightRadius: 150,
        }}
      >
        <Text className="  font-extrabold text-3xl mt-24 ">Tabibi</Text>
        <Image
          source={require("../assets/Logo-Doc.png")}
          className="h-2/3  w-80 from-neutral-50 drop-shadow-xl rounded-b-full"
        />
      </View>
      <View className="basis-1/3 flex-col items-center  w-full ">
        <Text className="  font-bold mt-6">Choisir</Text>
        <TouchableOpacity className="  w-60 h-12 justify-center self-center mt-4 shadow-sm bg-cyan-600 rounded-lg"
          onPress={() => navigation.navigate("Doc_Login")}
        >
          <Text
            className=" self-center text-white text-xl font-bold"
          >
            Doctor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className=" w-60 h-12 justify-center self-center mt-3 shadow-lg bg-pink-500 rounded-lg"
        
          onPress={() => navigation.navigate("Pat_Login")}
        >
          <Text
            className=" self-center text-white text-xl font-bold"
          >
            Patien
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
