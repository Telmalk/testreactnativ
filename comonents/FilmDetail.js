import React from 'react'
import { StyleSheet, View, Share,  Text, ActivityIndicator, Image, TouchableOpacity, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBapi'
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'


class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          film: undefined,
          isLoading: true
        }
      }

      static navigationOptions  = ({navigation}) => {
        const {params} = navigation.state
        if (params.film != undefined && Platform.OS === 'ios') {
          return {
            header: <TouchableOpacity
                      style={style.share.touchable_ios}
                      onPress={() => params.shareFilm()}>
                      <Image
                        style={styles.share_image}
                        source={require('../image/ic_share.png')} 
                      />         
                    </TouchableOpacity>
          }
        }
      }

      _updateNvigationParams() {
        this.props.navigation.setParams({
          shareFilm: this._shareFilm,
          film: this.state.film
        })
      }
    
      componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) { 
          this.setState({
            isLoading: false,
            film: this.props.favoritesFilm[favoriteFilmIndex]
          }, () => {this._updateNvigationParams()})
          return
        }
        this.setState({ isLoading: true })
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
          this.setState({
            film: data,
            isLoading: false
          }, () => {this._updateNvigationParams()})
        })
      }
    
      _shareFilm() {
        const { film } = this.state
        Share.share({
          film: film.title,
          message: film.overview
        })
      }

      _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }
    
    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavoriteImgage() {
        var sourceImage = require('../image/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            var sourceImage = require('../image/ic_favorite.png')        
        }
        return (
            <Image
                source={sourceImage}
                style={styles.favorite_image} 
            />
        )
    }

    _displayFloatingActionButton() {
      const { film  } = this.state;
      if (film != undefined && Platform.OS === 'android') {
        return (
          <TouchableOpacity
            style={styles.share_button_container}
            onPress={() => this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require("../image/ic_share.png")}
            />
          </TouchableOpacity>
        )
      } 
    }

    componentDidUpdate() {
    }

      _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.backdrop_path)}}
              />
              <Text style={styles.title_text}>{film.title}</Text>
              <TouchableOpacity  
                style={styles.favorite_container} 
                onPress={() => this._toggleFavorite()}>
                    {this._displayFavoriteImgage()}
                </TouchableOpacity>
              <Text style={styles.description_text}>{film.overview}</Text>
              <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
              <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
              <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
              <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
              <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                  return genre.name;
                }).join(" / ")}
              </Text>
              <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                  return company.name;
                }).join(" / ")}
              </Text>
            </ScrollView>
          )
        }
      }
    
      render() {
        return (
          <View style={styles.main_container}>
            {this._displayLoading()}
            {this._displayFilm()}
            {this._displayFloatingActionButton()}
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        flex: 1
      },
      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      scrollview_container: {
        flex: 1
      },
      image: {
        height: 169,
        margin: 5
      },
      title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
      },
      default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
      },
      favorite_container: {
          alignItems: 'center'
      },
      favorite_image: {
         width: 40,
         height: 40 
      },
      share_button_container: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'

      },
      share_image: {
        width: 30,
        height: 30
      }
})



const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(FilmDetail)