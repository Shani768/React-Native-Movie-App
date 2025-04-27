import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons"; // You can also use Ionicons, FontAwesome, etc.
import { markAsFavorite, fetchFavoriteMovies } from "@/services/api";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const fetchAndSetMovieDetails = async () => {
    setLoading(true);
    try {
      const movieDetails = await fetchMovieDetails(id as string);
      setMovie(movieDetails);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAndSetMovieDetails();
    }
  }, [id]);


  const handleFavoriteToggle = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);

      await markAsFavorite({
        mediaId: movie?.id ?? 0,
        favorite: newFavoriteStatus,
      });
    } catch (error) {
      console.log('error', error)
    }
  };

  useEffect(() => {
    // Fetch user's favorite movies when the movie details are loaded
    const checkIfFavorite = async () => {
      try {
        const favorites = await fetchFavoriteMovies();
        const isFav: boolean = favorites.some((favMovie: { id: number }) => favMovie.id === movie?.id);
        setIsFavorite(isFav);
      } catch (error) {
        console.log("Error fetching favorite movies:", error);
      }
    };

    if (movie?.id) {
      checkIfFavorite();
    }
  }, [movie?.id]);



  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex flex-row ">
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />

              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>

              <Text className="text-light-200 text-sm">
                ({movie?.vote_count} votes)
              </Text>

            </View>

            <TouchableOpacity onPress={handleFavoriteToggle} className="ml-20 mt-2">
              <Feather
                name="heart"
                size={20}
                color={isFavorite ? "red" : "white"}
              />
            </TouchableOpacity>

          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="mb-12 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
