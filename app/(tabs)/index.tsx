import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { fetchMovies, fetchGenres } from "@/services/api";

import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";

const Index = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [genresError, setGenresError] = useState<Error | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesError, setMoviesError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); // assume API gives you total pages

  const fetchAndSetMovies = async (genreId?: number, page: number = 1) => {
    setMoviesLoading(true);
    try {
      const { results, total_pages } = await fetchMovies({ genreId, page });
      setMovies(results);
      setTotalPages(total_pages || 1); // set total pages if available
      setMoviesError(null);
    } catch (error: any) {
      setMoviesError(error);
    } finally {
      setMoviesLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetMovies(selectedGenre ?? undefined, currentPage);
  }, [selectedGenre, currentPage]);

  //  fetch genres 
  const fetchAndSetGenres = async () => {
    setGenresLoading(true);
    try {
      const genreList = await fetchGenres();
      setGenres(genreList);
      setGenresError(null);
    } catch (error: any) {
      setGenresError(error);
    } finally {
      setGenresLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetGenres();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      >
        <Text className="text-white text-center text-2xl font-bold mt-28 px-5">
          Discover Your Next Favorite Movie 🎬
        </Text>
        

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">

            <View className="rounded-xl overflow-hidden shadow-lg mb-4 mt-20 relative">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w780${movies?.[0]?.backdrop_path || movies?.[0]?.poster_path}`,
                }}
                className="w-full h-80 rounded-xl"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b-xl">
                <Text className="text-white text-xl font-bold">
                  {movies?.[0]?.title}
                </Text>
                <Text className="text-white text-xs mt-1" numberOfLines={3}>
                  {movies?.[0]?.overview}
                </Text>
              </View>
            </View>

            {genresLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : genresError ? (
              <Text className="text-red-400">Failed to load genres</Text>
            ) : (
              <FlatList
                data={genres}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-5"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGenre(selectedGenre === item.id ? null : item.id);
                      setCurrentPage(1); // Reset to page 1 when genre changes
                    }}
                    className={`mr-3 px-4 py-2 rounded-full border ${selectedGenre === item.id
                      ? "bg-white border-white"
                      : "bg-white/10 border-white/20"
                      }`}
                  >
                    <Text
                      className={`text-sm ${selectedGenre === item.id
                        ? "text-black font-bold"
                        : "text-white"
                        }`}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <Text className="text-lg text-white font-bold mt-2 mb-3">
              Latest Movies
            </Text>

            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2"
              scrollEnabled={false}
            />

            {/* Pagination Buttons */}
            <View className="flex-row justify-center items-center mt-6 gap-6 space-x-5">
              <TouchableOpacity
                onPress={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full ${currentPage === 1 ? "bg-gray-400" : "bg-white"}`}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={currentPage === 1 ? "gray" : "black"}
                />
              </TouchableOpacity>

              <Text className="text-white text-lg font-bold">{currentPage}</Text>

              <TouchableOpacity
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full ${currentPage === totalPages ? "bg-gray-400" : "bg-white"}`}
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={currentPage === totalPages ? "gray" : "black"}
                />
              </TouchableOpacity>
            </View>

          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
