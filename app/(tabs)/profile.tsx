import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { SvgUri } from "react-native-svg";
import { Asset } from "expo-asset";
import { fetchUserDetails } from "@/services/api";

const personSvgUri = Asset.fromModule(require("@/assets/vector_icon.svg")).uri;

const Profile = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await fetchUserDetails();
        if (userDetails) {
          setUserName(userDetails.username);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false); // <-- Stop loading after fetch
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex items-center flex-1 mt-20 bg-primary flex-col gap-5">
        <SvgUri uri={personSvgUri} width="100" height="100" />

        {/* If loading, show spinner. Else, show username */}
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" /> // <-- Nice white spinner
        ) : (
          <Text className="text-white text-base">{userName || "No Username"}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
