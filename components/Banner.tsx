import { View, Text, ImageBackground } from "react-native";

interface Movie {
  backdrop_path?: string;
  poster_path?: string;
  title: string;
  overview: string;
}

const Banner = ({ movie }: { movie: Movie | null }) => {
  if (!movie) return null;

  return (
    <View className="mt-6 rounded-xl overflow-hidden shadow-lg">
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`,
        }}
        style={{ width: "100%", height: 250, justifyContent: "flex-end" }}
        imageStyle={{ borderRadius: 12 }}
      >
        <View className="bg-black/50 p-5">
          <Text className="text-white font-bold text-xl mb-2">
            {movie.title}
          </Text>
          <Text className="text-white text-sm" numberOfLines={4}>
            {movie.overview}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Banner;
