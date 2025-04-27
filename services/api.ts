export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

// console.log('key',process.env.EXPO_PUBLIC_MOVIE_API_KEY)
export const fetchMovies = async ({
  query,
  genreId,
  page = 1,
}: {
  query?: string;
  genreId?: number;
  page?: number;
}): Promise<{ results: Movie[]; total_pages: number }> => {
  let endpoint = "";

  if (query) {
    endpoint = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
  } else if (genreId) {
    endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`;
  } else {
    endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
  }

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return { results: data.results, total_pages: data.total_pages };
};




export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};


// 🆕 Function to fetch genres
export const fetchGenres = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/genre/movie/list?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch genres: ${response.statusText}`);
    }

    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};





export const markAsFavorite = async ({
  mediaId,
  favorite,
}: {
  mediaId: number;
  favorite: boolean;
}) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/favorite`,
    {
      method: "POST",
      headers: {
        ...TMDB_CONFIG.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: mediaId,
        favorite: favorite,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || "Failed to mark as favorite");
  }

  return await response.json();
};


// favourite movies 
// Fetch the list of favorite movies for the user
export const fetchFavoriteMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/{account_id}/favorite/movies`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    throw new Error("Failed to fetch favorite movies");
  }
};



// user deatil 

// Import the TMDB_CONFIG if needed
// import { TMDB_CONFIG } from "@/constants"; // Assuming the configuration file is in constants

export const fetchUserDetails = async () => {
  const accountId = process.env.EXPO_PUBLIC_ACCOUNT_ID; // Fetch the account ID from environment variables

  const url = `${TMDB_CONFIG.BASE_URL}/account/${accountId}?api_key=${TMDB_CONFIG.API_KEY}`;

  try {
    const response = await fetch(url, {
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data; // This will return the full user details including the username
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};


export const searchMovies = async (query: string) => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
