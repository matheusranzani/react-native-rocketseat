import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {
  state = {
    productInfo: {},
    docs: [],
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => { // se não for arrow function não dá pra usar o this
    const response = await api.get(`/products?page=${page}`); // base URL já configurada

    const { docs, ...productInfo } = response.data;

    this.setState({ 
      docs: [...this.state.docs, ...docs], // spread une dois arrays
      productInfo,
      page
    }); 

    // console.log(docs); // Aparece no Debugger/DevTools
  };

  loadMore = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) {
      return;
    }

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

      <TouchableOpacity 
        style={styles.productButton} 
        onPress={() => {
          this.props.navigation.navigate('Product', { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1} // quando 0.9 da lista for scrollada loadMore é chamada
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1, // ocupa a tela toda
    backgroundColor: '#fafafa'
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    height: 42,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#DA552F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF'
  }
});