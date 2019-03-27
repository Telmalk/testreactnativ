import React from 'react'
import { StyleSheet ,View, Button, TextInput, FlatList, Text } from 'react-native'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearcherText } from '../API/TMDBapi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
        }
        this.searchText = ""
    }

    _loadFilms = () => {
        if (this.searchText.length > 0)
            getFilmsFromApiWithSearcherText(this.searchText).then(data => this.setState({films: data.results}))
    }

    _searchTextInputChanged(text) {
        this.searchText = text
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film" />
                <Button style={styles.button} title='Rechercher' onPress={() => this._loadFilms()} />
                <FlatList 
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItem film={item} />} 
                />
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
    }
})

export default Search;