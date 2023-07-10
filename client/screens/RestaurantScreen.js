import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import * as Icon from "react-native-feather";
import {themeColors} from "../theme";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import {StatusBar} from "expo-status-bar";
import {useDispatch} from "react-redux";
import {setRestaurant} from "../slices/restaurantSlice";
import {urlFor} from "../sanity";

const RestaurantScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();

  let item = params;
  const dispatch = useDispatch();
  // console.log("restaurant", item);

  useEffect(() => {
    //load data to redux store
    if (item && item._id) {
      dispatch(setRestaurant({...item}));
    }
  }, [item]);
  return (
    <View>
      <CartIcon />
      {/* Mobile tower signals battery  color */}
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={{uri: urlFor(item.image).url()}}
          />
          <TouchableOpacity
            className="absolute top-14 left-4 bg-gray-50 rounded-full shadow"
            onPress={() => navigation.goBack()}
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className=" bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="px-3 pb-4 space-y-2">
                <View className="flex-row items-center space-x-1">
                  <Image
                    source={require("../assets/fullStar.png")}
                    className="h-4 w-4"
                  />
                  <Text className="text-xs">
                    <Text className="text-green-700">{item.stars} </Text>
                    <Text className="text-gray-700">
                      ({item.reviews} reviews)•
                      <Text className="font-semibold">{item?.type?.name}</Text>
                    </Text>
                  </Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <Icon.MapPin color="gray" width="15" height="15" />
                  <Text className="text-gray-700">Nearby • {item.address}</Text>
                </View>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{item.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 text-2xl font-bold mb-2">Menu</Text>
          {/* Dishes */}
          {item.dishes.map((dish, index) => {
            return <DishRow item={{...dish}} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;
