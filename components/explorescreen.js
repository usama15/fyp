import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Button,
  Item,
  Input,
  Icon,
  Picker,
  Label,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {addtocart, deletefromcart} from '../Redux/actions/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Comments from './Comments';
import firestore from '@react-native-firebase/firestore';


let Product = database().ref('/products');
// let product = firebase().collection("product").onSnapshot(snapshot => {
//   const newPost = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   const Product = newPost
// }

const mapStatetoProps = state => {
  return {
    cart: state.cartReducer.cart,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    add: product => dispatch(addtocart(product)),
    delete: id => dispatch(deletefromcart(id)),
  };
};

class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: '',
      type: '',
      price: '',
      area: '',
      data: [],
      cart: this.props.cart,
      // review: '',
    };
  }
  
  // changeReview = (e) =>{
  //   this.setState({review: e.target.value});
  // }

  // postReview = () => {
  //   post: async (this.state.review) => {
  //     await firestore().collection('post').add({
  //     //  review: this.state.r
  //     });
  // }

  componentDidMount() {
    Product.on('value', snapshot => {
      let data = snapshot.val();
      if (data != null) {
        let products = Object.values(data);
        this.setState({products}, this.filter);
      }
    });
  }
  componentDidUpdate(prevProps, prevStates) {
    if (prevProps !== this.props) {
      this.setState({cart: this.props.cart});
    }
  }
  Search = name => {
    this.state.products.filter(product => {
      if (product.name == name);
    });
  };

  productRender = (product, index) => {
    return (
      <TouchableOpacity onPress={
        this.props.navigation.navigate('products')}>
      <Card key={product.username.id}>
        <CardItem style={styles.card}>
          <Left>
            <AntDesign name="user" size={30} color="#D49A9A" />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {' '}
              {product.username}{' '}
            </Text>
          </Left>
        </CardItem>
        <CardItem style={{justifyContent:'center',}}>
          {console.log(this.state.cart)}
          <Image
            style={{height: 200, width: 150,}}
            source={{
              uri: product.image,
            }}
          />
        </CardItem>
        <CardItem
          cardBody
          style={{
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {' '}
            {product.name}{' '}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              justifyContent: 'flex-end',
            }}>
            {'Pkr' + ' '}
            {product.price}
            {' ' + '/='}
          </Text>
        </CardItem>

        <CardItem
          cardBody
          style={{
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
            }}>
            {' '}
            {product.catagory}{' '}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
            }}>
            {' '}
            {product.area}{' '}
          </Text>
        </CardItem>
        <Text
          style={{
            fontSize: 17,
            color: 'black',
            marginLeft: '5%',
          }}>
          {' '}
          {product.description}{' '}
        </Text>
        <View style={{alignItems:'center', marginBottom:'2%',}}>
        <TouchableOpacity
          style={styles.loginBtn1}
          onPress={() =>
            !this.state.cart.includes(product)
            ? this.props.add(product)
            : this.props.delete(product.id)
          }>
          <Text
            style={
              ({fontfamily: 'poppins'},
              {fontWeight: 'bold'},
              {color: 'black', fontSize: 18})
            }>
            {this.state.cart.includes(product)
              ? 'Remove from cart'
              : 'Add to cart'}
          </Text>
        </TouchableOpacity>
        </View>
      </Card>
      </TouchableOpacity>
    );
  };

  filter = () => {
    var varproduct = this.state.products;

    if (
      this.state.area !== '' ||
      this.state.type !== '' ||
      this.state.price !== ''
    ) {
      if (this.state.area !== '') {
        varproduct = varproduct.filter(
          product => product.area == this.state.area,
        );
      }

      if (this.state.type !== '') {
        varproduct = varproduct.filter(
          product => product.catagory == this.state.type,
        );
      }

      if (this.state.price !== '') {
        this.state.price == 'Low To High Price'
          ? (varproduct = varproduct.sort((a, b) => a.price - b.price))
          : (varproduct = varproduct.sort((a, b) => b.price - a.price));
      }
    } else {
      varproduct = this.state.products;
    }
    // console.log(varproduct);

    this.setState({
      data: varproduct,
    });
  };

  render() {
    // var image = '';

    return (
      <Container>
        <Header style={{backgroundColor: '#112339', height: 60}}>
          <Body style={{flex: 3, justifyContent: 'center'}}>
            <Title style={{fontSize: 25, color: 'white', paddingLeft: 40}}>
              Explore
            </Title>
          </Body>

          <Right>
            <Ionicons
              name="ios-help-circle-outline"
              size={33}
              color="#D49A9A"
              onPress={() => this.props.navigation.navigate('userhelp')}
            />
          </Right>
        </Header>
        <Header
          searchBar
          round
          style={{backgroundColor: 'white', height: 60, borderRadius: 30}}>
          <Item>
            <Icon name="ios-search" color="#D49A9A" />
            <Input
              placeholder="Search Here.."
              placeholderTextColor="#D49A9A"
              onChangeText={name => this.setState({search: name})}
            />
          </Item>
        </Header>
        <View style={{flexDirection: 'row'}}>
          <Picker
            style={{width: '37%'}}
            mode="dropdown"
            selectedValue={this.state.type}
            onValueChange={value => {
              this.setState({type: value}, this.filter);
            }}>
            <Picker.Item label="Category" value="" color="#D49A9A" />
            <Picker.Item
              label="Electronic"
              value="Electronic"
              color="#D49A9A"
            />
            <Picker.Item label="Furniture" value="Furniture" color="#D49A9A" />
          </Picker>
          <Picker
            style={{width: '33%'}}
            mode="dropdown"
            selectedValue={this.state.price}
            onValueChange={value => this.setState({price: value}, this.filter)}>
            <Picker.Item label="Price" value="" color="#D49A9A" />
            <Picker.Item
              label="Low To High Price"
              value="Low To High Price"
              color="#D49A9A"
            />
            <Picker.Item
              label="High To Low Price"
              value="High To Low Price"
              color="#D49A9A"
            />
          </Picker>
          <Picker
            style={{width: '33%'}}
            mode="dropdown"
            selectedValue={this.state.area}
            onValueChange={value => this.setState({area: value}, this.filter)}
            >
            <Picker.Item label="Area" value="" color="#D49A9A" />
            <Picker.Item label="Karachi" value="Karachi" color="#D49A9A" />
            <Picker.Item label="Lahore" value="Lahore" color="#D49A9A" />
          </Picker>
        </View>
        <Content>
          {/* {console.log(this.state.products)} */}
          {this.state.products && this.state.data.map((product, index) => this.state.search == ''
                ? this.productRender(product, index)
                : this.state.search.toLowerCase() == product.name.toLowerCase() && this.productRender(product, index),
            )}
        </Content>
        <Footer style={{height: 50}}>
          <FooterTab style={{backgroundColor: '#112339'}}>
            <Button onPress={() => this.props.navigation.navigate('Cart')}>
              <Ionicons name="cart-outline" size={35} color="#D49A9A" />
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate('addproduct')}>
              <Ionicons
                name="md-add-circle-outline"
                size={35}
                color="#D49A9A"
              />
            </Button>
            <Button
              onPress={async () => {
                await AsyncStorage.setItem('@login', 'false').then(() =>
                  this.props.navigation.navigate('Login'),
                );
              }}>
              <MaterialIcons name="logout" size={35} color="#D49A9A" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  picker: {
    width: 300,
    height: 45,
    borderColor: 'blue',
    borderWidth: 1,
  },
  card: {
    flex: 1,
    height: 75,
    width: 400,
  },
  button: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#87C7D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
  },
  loginBtn1: {
    width: '60%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowRadius: 10,
    backgroundColor: '#D49A9A',
    shadowColor: '#87C7D8',
    shadowOpacity: 1,
    elevation: 3,
    shadowOffset: {width: 1, height: 5},
  },
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ExploreScreen);
