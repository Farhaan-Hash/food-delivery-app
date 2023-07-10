import {View, Text, TextInput, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import * as Icon from "react-native-feather";
import {themeColors} from "../theme";
import Categories from "../components/categories";
// import {featured} from "../constants";
import FeaturedRow from "../components/featuredRow";
import {getFeaturedRestaurants} from "../api";
import Footer from "../components/footer";

const HomeScreen = () => {
  let [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  // Get Featured Restaurants from Sanity
  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      setFeaturedRestaurants(data);
    });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-4">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search stroke="gray" width="25" height="25" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin width="20" height="20" stroke="gray" />
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>

        <View
          style={{backgroundColor: themeColors.bgColor(3)}}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            width="20"
            height="20"
            strokeWidth={2.5}
            stroke="white"
          />
        </View>
      </View>

      {/* MAIN SECTION */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      >
        {/* categories */}

        <Categories />

        {/* featured */}
        <View className="mt-5">
          {featuredRestaurants?.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                description={item.description}
                restaurants={item.restaurants}
              />
            );
          })}
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
