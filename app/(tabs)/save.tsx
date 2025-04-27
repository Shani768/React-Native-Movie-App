import { useState, useEffect } from "react";
import { Text, SafeAreaView, FlatList, View, ActivityIndicator } from "react-native";
import { fetchFavoriteMovies } from "@/services/api"; // Assuming this is the API call to fetch favorite movies
import MovieCard from "@/components/MovieCard"; // Import your MovieCard component

const Save = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavoriteMovies = async () => {
      try {
        const movies = await fetchFavoriteMovies(); // Assuming fetchFavoriteMovies fetches the data
        setFavoriteMovies(movies);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching favorite movies:", error);
        setLoading(false);
      }
    };

    getFavoriteMovies();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-10 ">
      <Text className="text-lg text-white font-bold mt-20 mb-3">
        Favourite Movies
      </Text>
      <FlatList
        data={favoriteMovies}
        renderItem={({ item }) => <MovieCard {...item} />} // TypeScript will now know the properties
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
          marginTop: 20,
        }}
        className="mt-2 pb-32"
      />
    </SafeAreaView>
  );
};

export default Save