# Movie App (React Native + Expo)

Welcome to the **Movie App**, built with React Native and Expo! This app allows users to browse and search for movies, view movie details, add movies to their favourites, and view a beautiful profile page.

## Features

- 🎥 **Movies Listing**: Browse a wide selection of movies with beautiful card layouts.
- 🔄 **Pagination**: View movies across multiple pages with next and previous buttons.
- ⭐ **Favourites**: Add movies to your favourites and view them in a separate list.
- 🔍 **Search with Debounce**: Search for movies with real-time filtering using a debounce method.
- 👤 **Profile Page**: View and manage your profile, displaying the movies you've marked as favourites.

## Tech Stack

- **React Native**: The framework for building the mobile application.
- **Expo**: A tool to build and develop React Native apps quickly.
- **TMDB API**: Used to fetch movie data (titles, images, etc.).
- **React Navigation**: For navigating between different screens.
- **React Query / Axios**: For fetching data asynchronously.
- **React Context / State Management**: For managing global state (e.g., favourite movies, search query).
- **Tailwind CSS** (using `nativewind`): For styling the components with utility-first CSS classes.
  
## Screens

### 1. **Home Page**
   - **Movies Listing**: Displays a grid of movies with pagination functionality.
   - **Search Bar**: Filter movies by name with a debounce feature to prevent unnecessary API calls.

### 2. **Movie Detail Page**
   - **Movie Details**: View more information about a selected movie, including overview, ratings, and backdrop.
   - **Add to Favourites**: Mark a movie as a favourite.

### 3. **Favourites Page**
   - **List Favourites**: View all movies marked as favourites, with the option to remove them.

### 4. **Profile Page**
   - **User Information**: Displays user details (e.g., username).
   - **Favourite Movies**: View and manage your list of favourite movies.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/shani768/React-Native-Movie-App.git
cd React-Native-Movie-App

npm install

## setup environment variable
EXPO_PUBLIC_MOVIE_API_KEY=
ACCOUNT_ID=

npx expo start

```

## Demo Video
[Watch Demo](https://shani-project-videos.s3.eu-north-1.amazonaws.com/movies/movies/MV.mp4)

## 📸 Screenshots


<div style="display: flex; justify-content: space-between;">
  <img src="https://shani-project-videos.s3.eu-north-1.amazonaws.com/movies/movies/SS1.png" width="300" />
  <img src="https://shani-project-videos.s3.eu-north-1.amazonaws.com/movies/movies/SS2.jpg" width="300" />
  <img src="https://shani-project-videos.s3.eu-north-1.amazonaws.com/movies/movies/SS3.jpg" width="300" />
</div>
