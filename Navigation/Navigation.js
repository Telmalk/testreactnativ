import React from 'react'
import ReactNavigation, { createBottomTabNavigator } from 'react-navigation'
import Search from '../comonents/Search'
import FilmDetail from '../comonents/FilmDetail'
import Favorite from "../comonents/Favorite"
import { Image, StyleSheet } from 'react-native'
import Test from '../comonents/Test'

const SearchStackNavigator = ReactNavigation.createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Detail'
    }
  },
})

const FavoritesStackNavigator = ReactNavigation.createStackNavigator({
  Favorites : {
    screen: Favorite,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../image/ic_search.png')}
            style={styles.icon}
          />
        }
      }
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../image/ic_favorite.png')}
            style={styles.icon}
          />
        }
      }
    },
  }, {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30
  }
})

export default ReactNavigation.createAppContainer(MoviesTabNavigator)