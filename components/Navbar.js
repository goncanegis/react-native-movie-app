import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../theme/Colors'

const propTypes = {
  main: PropTypes.bool,
}
const defaultProps = {
  main: false,
}

class Navbar extends PureComponent {
  render() {
    const { navigation, main } = this.props

    return (
      <View>
        {main ? (
          <View style={styles.navbar}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Icon
                name='search-outline'
                size={30}
                color={Colors.primary}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name='chevron-back'
                size={30}
                color={Colors.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    paddingTop: 25,
  },
  icon: { zIndex: 999 },
  logo: {
    width: 40,
    height: 40,
  },
})

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

export default Navbar
