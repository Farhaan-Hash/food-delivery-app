import {View, Text, TouchableOpacity, Image} from "react-native";
import React, {useEffect, useState} from "react";
// import {featured} from "../constants/index";
import {themeColors} from "../theme/index";
import * as Icon from "react-native-feather";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurant} from "../slices/restaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/cartSlice";
import {urlFor} from "../sanity";

const CartScreeen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState({});
  const deliveryCharges = 2;
  const dispatch = useDispatch();

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  return (
    <View className="bg-white flex-1">
      {/* Back Button------------------------------------- */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="absolute z-10 rounded-full shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>

      {/* Delivery Time --------------------------*/}
      <View
        className="flex-row px-4 items-center"
        style={{backgroundColor: themeColors.bgColor(0.2)}}
      >
        <Image
          className="w-20 h-20 rounded-full"
          source={require("../assets/bikeGuy.png")}
        />
        <Text className="flex-1 pl-4">Delivery in 20-30 minutes!</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{color: themeColors.text}}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      {/* Dishes -----------------------------*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="bg-white pt-5"
      >
        {Object.entries(groupedItems).map(([key, items]) => {
          let dish = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-gray-100 rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-bold" style={{color: themeColors.text}}>
                {items.length} x
              </Text>
              <Image
                className="h-14 w-14 rounded-full"
                source={{uri: urlFor(dish.image).url()}}
              />
              <Text className="flex-1 font-bold text-gray-700">
                {dish.name}
              </Text>
              <Text className="font-semibold text-base">$ {dish.price}</Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                onPress={() => dispatch(removeFromCart({id: dish._id}))}
                style={{backgroundColor: themeColors.bgColor(1)}}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* Total -------------------------------- */}

      <View
        style={{backgroundColor: themeColors.bgColor(0.2)}}
        className="p-6 px-8 rounded-t-3xl space-y-4"
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal:</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Charges:</Text>
          {cartItems.length > 0 ? (
            <Text className="text-gray-700">${deliveryCharges}</Text>
          ) : null}
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order Total:</Text>
          <Text className="text-gray-700 font-extrabold">
            ${cartItems.length > 0 ? deliveryCharges + cartTotal : 0}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderPreparing")}
            style={{backgroundColor: themeColors.bgColor(1)}}
            className="p-3 rounded-full"
            disabled={!cartItems.length}
          >
            <Text className="text-white text-center font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreeen;