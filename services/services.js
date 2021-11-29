import axios from 'axios'

const apiUrl = 'https://api.themoviedb.org/3'

// Get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  )
  return response.data.results
}

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  )
  return response.data.results
}

// Get popular TV
export const getPopularTv = async () => {
  const response = await axios.get(
    `${apiUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  )
  return response.data.results
}

// Get Family Movies
export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`
  )
  return response.data.results
}

// Get Documentaries
export const getDocumentaries = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=99`
  )
  return response.data.results
}

// Get Movie Detail
export const getMovieDetail = async (id) => {
  const response = await axios.get(
    `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
  )
  return response.data
}

// Search for Movie or TV by Keyword
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?api_key=${apiKey}&query=${query}`
  )
  return resp.data.results
}
