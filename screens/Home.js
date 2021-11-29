import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
  getFamilyMovies,
  getDocumentaries,
} from '../services/services'
import { SliderBox } from 'react-native-image-slider-box'
import List from '../components/List'
import Error from '../components/Error'

const dimensions = Dimensions.get('screen')

export const Home = ({ navigation }) => {
  const [moviesImages, setMoviesImages] = useState(null)
  const [popularMovies, setPopularMovies] = useState(null)
  const [familyMovies, setFamilyMovies] = useState(null)
  const [documentaries, setDocumentaries] = useState(null)
  const [popularTv, setPopularTv] = useState(null)

  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ])
  }

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const moviesImagesArray = []
          upcomingMoviesData.forEach((movie) => {
            moviesImagesArray.push(
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            )
          })
          setMoviesImages(moviesImagesArray)
          setPopularMovies(popularMoviesData)
          setPopularTv(popularTvData)
          setFamilyMovies(familyMoviesData)
          setDocumentaries(documentariesData)
        }
      )
      .catch(() => setError(true))
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <>
      {loaded && !error ? (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensions.height / 2}
                autoplay={true}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
                resizeMode='contain'
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title='Popular Movies'
                content={popularMovies}
              />
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title='Popular TV Shows'
                content={popularTv}
              />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title='Family Movies'
                content={familyMovies}
              />
            </View>
          )}

          {documentaries && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title='Documentaries'
                content={documentaries}
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size='large' />
      )}
      {error && <Error />}
    </>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 20,
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
