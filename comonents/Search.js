import React from 'react'
import { StyleSheet ,View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearcherText } from '../API/TMDBapi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false,
        }
        this.page = 0;
        this.totalPage = 0;
        this.searchText = "";
    }

    _loadFilms = () => {
        this.setState({
            isLoading: true,
        })
        if (this.searchText.length > 0) {
            getFilmsFromApiWithSearcherText(this.searchText, this.page + 1).then(data => {
                this.page = data.page,
                this.totalPage = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
        }
    }

    _searchFilms() {
        this.page = 0;
        this.totalPage = 0;
        this.setState({
            films: []
        })
        this._loadFilms()
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchText = text
    }

    render() {
        console.log(this.state.isLoading)
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film" />
                <Button style={styles.button} title='Rechercher' onPress={() => this._searchFilms()} />
                <FlatList 
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.page < this.totalPage) {
                        this._loadFilms()
                    }
                }}
                renderItem={({item}) => <FilmItem film={item} />} 
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    textinput: {
        margin: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    button: {
        height: 50
    },
    main_container: {
        marginTop: 20,
        flex: 1
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search;