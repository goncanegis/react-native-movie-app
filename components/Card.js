import React, { PureComponent } from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const placeholderImage = require('../assets/images/placeholder.png')

const propTypes = {
  item: PropTypes.object,
}

class Card extends PureComponent {
  render() {
    const { navigation, item } = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Detail', { movieId: item.id })}
      >
        <Image
          style={styles.image}
          source={
            item.poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
              : placeholderImage
          }
          resizeMode='cover'
        />
        {!item.poster_path && (
          <Text style={styles.movieTitle}>{item.title}</Text>
        )}
      </TouchableOpacity>
    )
  }
}

Card.propTypes = propTypes

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    margin: 5,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieTitle: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 10,
  },
})

export default Card
