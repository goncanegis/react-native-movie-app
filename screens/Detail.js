import React, { useState, useEffect, useReducer } from 'react'
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native'
import { getMovieDetail } from '../services/services'
import StarRating from 'react-native-star-rating'
import PlayButton from '../components/PlayButton'
import { VideoPlayer } from '../components/Video'
import { Colors } from '../theme/Colors'

import dateFormat from 'dateformat'

// Helpers
const placeholderImage = require('../assets/images/placeholder.png')

const height = Dimensions.get('screen').height

// Main component
export const Detail = ({ route, navigation }) => {
  const { movieId } = route.params

  const [movieDetail, setMovieDetail] = useState()
  const [loaded, setLoaded] = useState(false)
  // const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useReducer((v) => !v, false)

  useEffect(() => {
    getMovieDetail(movieId).then((movieData) => {
      setMovieDetail(movieData)
      setLoaded(true)
    })
  }, [movieId])

  return (
    <>
      {loaded ? (
        <View style={styles.mainContainer}>
          <ScrollView>
            <View style={styles.playButton}>
              <PlayButton
                icon='caret-forward-outline'
                handlePress={setModalVisible}
              />
            </View>
            <Image
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                    }
                  : placeholderImage
              }
              resizeMode='cover'
            />

            <View style={styles.container}>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>

              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map((genre) => (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                fullStarColor={Colors.primary}
                starSize={30}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>

              <Text style={styles.release}>
                Release date:{' '}
                {dateFormat(movieDetail.release_date, 'mmmm dd, yyyy')}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.videoModal}>
            <Modal
              supportedOrientations={['portrait', 'landscape']}
              animationType='slide'
              visible={modalVisible}
            >
              <PlayButton icon='close-outline' handlePress={setModalVisible} />
              <VideoPlayer
                onClose={setModalVisible}
                source={{
                  uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
              />
            </Modal>
          </View>
        </View>
      ) : (
        <ActivityIndicator size='large' />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
  image: {
    height: height / 1.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genresContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  genre: {
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
    padding: 15,
  },
  playButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
