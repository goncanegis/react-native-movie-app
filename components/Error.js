import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
}

const defaultProps = {
  errorText1: 'Oops, something went wrong!',
  errorText2: 'Please make sure you are online, and restart the app.',
}

class Error extends PureComponent {
  render() {
    const { errorText1, errorText2 } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
  },
})

Error.propTypes = propTypes
Error.defaultProps = defaultProps

export default Error
