import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  ListFooterComponent
} from "react-native";
import { connect } from "react-redux";
import Status from "../components/Status";
import { getCategories, getProducts } from '../store/home/actions';
import Sidebar from '../components/Sidebar';
import SidebarFooter from '../components/SidebarFooter';
import ButtonCategory from '../components/ButtonCategory';
import MenuButton from '../components/MenuButton';
import CoskaSearch from '../components/CoskaSearch';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isFetchingMore: false,
    category: 'main',
    items: []
  };

  componentWillMount() {
    this.setState({ isFetchingMore: true });
    this.props.getCategories()
      .then(() => {
        return this.props.getProducts();
      })
      .then(() => {
        this.setState({ isFetchingMore: false });
      });
  }

  render() {
    let total = 0;
    const discount = 0;
    this.state.items.forEach(element => {
      total += element.price * element.qty;
    });

    return (
      <View style={styles.container}>
        <Sidebar>
          <View style={styles.status}>
            <Status />
          </View>
          <ScrollView>
            <FlatList
              style={{ flex: 8 }}
              initialNumToRender={3}
              ListHeaderComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderColor: "#000",
                      backgroundColor: "#212121",
                      marginTop: 5
                    }}
                  >
                    <View
                      style={{ flex: 5, margin: 1, justifyContent: "center" }}
                    >
                      <Text style={[styles.tableLabel, { paddingLeft: 20 }]}>
                        Item
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        margin: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={styles.tableLabel}>Qty</Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        margin: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={styles.tableLabel}>Unit</Text>
                      <Text style={styles.tableLabel}>Price</Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        margin: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={styles.tableLabel}>Amount</Text>
                    </View>
                  </View>
                );
              }}
              data={this.state.items}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <View style={[styles.tableRow, { backgroundColor: "#000" }]}>
                    <View style={{ flex: 3.5, marginHorizontal: 1 }}>
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        {item.item}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1.5,
                        marginHorizontal: 1,
                        flexDirection: "row"
                      }}
                    >
                      <View style={{ flex: 1, marginHorizontal: 1 }}>
                        <TouchableOpacity onPress={() => {}}>
                          <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, marginHorizontal: 1 }}>
                        <TouchableOpacity onPress={() => {}}>
                          <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 1 }}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: 18
                        }}
                      >
                        {item.qty}
                      </Text>
                    </View>
                    <View style={{ flex: 2, marginHorizontal: 1 }}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "right",
                          fontSize: 18
                        }}
                      >
                        {item.price.toFixed(2)}
                      </Text>
                    </View>
                    <View style={{ flex: 2, marginHorizontal: 1 }}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "right",
                          fontSize: 18
                        }}
                      >
                        {(item.qty * item.price).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => {
                return (
                  <View style={{ backgroundColor: "#212121" }}>
                    <View style={styles.tableRow}>
                      <View style={{ flex: 2, marginHorizontal: 1 }}>
                        <Text style={styles.tableLabel}>Subtotal:</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: 1,
                          alignItems: "flex-end"
                        }}
                      >
                        <Text style={styles.tableLabel}>
                          {total.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={{ flex: 2, marginHorizontal: 1 }}>
                        <Text style={styles.tableLabel}>Discount:</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: 1,
                          alignItems: "flex-end"
                        }}
                      >
                        <Text style={styles.tableLabel}>
                          {discount.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={{ flex: 2, marginHorizontal: 1 }}>
                        <Text style={styles.tableLabel}>Tax:</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: 1,
                          alignItems: "flex-end"
                        }}
                      >
                        <Text style={styles.tableLabel}>
                          {(total * 0.13).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <View
              style={{
                alignItems: "flex-end",
                borderBottomColor: "#3d4040",
                paddingVertical: 10,
                paddingHorizontal: 20
              }}
            >
              <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>
                {(total * 1.13 - discount).toFixed(2)}
              </Text>
            </View>
          </ScrollView>
          <SidebarFooter
            buttonInfo={[
              { name: "Cancel", onPress: () => {} },
              { name: "Order", onPress: () => {} },
              { name: "Print Bill", onPress: () => {} }
            ]}
          />
        </Sidebar>
        <View style={styles.main}>
          <View>
            <FlatList
              initialNumToRender={6}
              data={this.props.categories}
              numColumns={3}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <ButtonCategory
                      label={item.name}
                      color={["#993333", "#134385", "#b68A31"][index]}
                      onPress={() => {
                        this.setState({ category: item.name });
                        this.props.navigation.navigate("Home");
                      }}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => {
                return this.state.isFetchingMore ? <ActivityIndicator /> : null;
              }}
            />
          </View>
          <CoskaSearch />
          <ScrollView>
            <FlatList
              data={this.props.products.filter(product => product.category.name === this.state.category)}
              numColumns={4}
              renderItem={({ item, index }) => {
                return (
                  <View style={{flex: 1, flexDirection: 'row' }}>
                    <MenuButton
                      label={item.name}
                      price={item.price}
                      color={['#993333', '#134385', '#b68A31'][index]}
                      imageSource={item.imageFile}
                      onPress={() => {
                        this.props.navigation.navigate('Home');
                      }}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => {
                return this.state.isFetchingMore ? <ActivityIndicator /> : null;
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    flexDirection: "row"
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#3d4040",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  tableLabel: {
    color: "#787878",
    fontSize: 18,
    fontWeight: "100"
  },
  main: {
    flex: 3
  },
  status: {
    flexDirection: "row"
  }
});

const mapStateToProps = state => {
  return {
    categories: state.home.categories,
    products: state.home.products
  };
};

export default connect(
  mapStateToProps,
  { getCategories, getProducts }
)(HomeScreen);
