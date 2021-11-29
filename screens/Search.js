import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { searchMovieTv } from '../services/services'
import Card from '../components/Card'
import Error from '../components/Error'

export const Search = ({ navigation }) => {
  const [text, onChangeText] = useState()
  const [searchResults, setSearchResults] = useState()
  const [error, setError] = useState(false)

  const onSubmit = (query) => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv]
        setSearchResults(data)
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movie or TV Show'}
              onChangeText={onChangeText}
              value={text}
              onSubmitEditing={() => onSubmit(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text)
            }}
          >
            <Icon name={'search-outline'} size={30} color='#999' />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={2}
              data={searchResults}
              renderItem={({ item }) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.noResults}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    height: 50,
    padding: 10,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 5,
  },
  searchItems: {
    padding: 10,
    justifyContent: 'center',
  },
  noResults: {
    paddingTop: 20,
  },
})
