import ReactNavigation from 'react-navigation'
import Search from '../comonents/Search'
import FilmDetail from '../comonents/FilmDetail'


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

export default ReactNavigation.createAppContainer(SearchStackNavigator)