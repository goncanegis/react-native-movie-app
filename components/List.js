import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Card from './Card'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
}

class List extends PureComponent {
  render() {
    const { navigation, title, content } = this.props
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 35,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'left',
  },
})

List.propTypes = propTypes

export default List
