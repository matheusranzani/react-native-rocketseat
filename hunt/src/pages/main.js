import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export default class Main extends Component {
  state = {
    docs: [],
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => { // se não for arrow function não dá pra usar o this
    const response = await api.get('/products'); // base URL já configurada

    const { docs } = response.data;

    this.setState({ docs });

    // console.log(docs); // Aparece no Debugger/DevTools
  };

  renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>

      <TouchableOpacity onPress={() => {}}>
        <Text>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return(
      <View>
        <FlatList
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}