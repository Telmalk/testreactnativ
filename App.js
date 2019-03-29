// App.js
import React from 'react'
import Navigation from "./Navigation/Navigation"
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import { Text } from 'react-native'
import Search from "./comonents/Test"
export default class App extends React.Component {
  render() {
    return (
      <Search />
     // <Text>Coucou</Text>
    //  <Provider store={Store}>
      //  <Navigation />
      //</Provider>
    )
  }
}