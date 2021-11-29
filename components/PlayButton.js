import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../theme/Colors'

const propTypes = {}

class PlayButton extends PureComponent {
  render() {
    const { handlePress, icon } = this.props
    return (
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Icon name={icon} size={20} color={Colors.primary} />
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    zIndex: 999,
    position: 'absolute',
    top: 10,
    right: 10,
  },
})

PlayButton.propTypes = propTypes

export default PlayButton
