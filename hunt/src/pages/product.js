import React from 'react';

import { WebView } from 'react-native-webview';

// statless componet / desestruturação de props
const Product = ({ route }) => (
  <WebView source={{ uri: route.params.product.url }} />
);

export default Product;