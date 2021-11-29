import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Home } from '../screens/Home'
import { Detail } from '../screens/Detail'
import Navbar from './Navbar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Search } from '../screens/Search'

const Stack = createNativeStackNavigator()

const propTypes = {}

class MainNavigation extends PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode='screen'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent' },
            header: ({ navigation }) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />

        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{
            // headerTransparent: true,
            headerStyle: { backgroundColor: 'black' },
            header: ({ navigation }) => (
              <Navbar navigation={navigation} main={false} />
            ),
          }}
        />

        <Stack.Screen
          name='Search'
          component={Search}
          options={{
            // headerTransparent: true,
            headerStyle: { backgroundColor: 'black' },
            header: ({ navigation }) => (
              <Navbar navigation={navigation} main={false} />
            ),
          }}
        />
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})

MainNavigation.propTypes = propTypes

export default MainNavigation
