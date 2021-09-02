import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  Left,
  Card,
  CardItem,
  Picker,
  Header,
  Item,
  Icon,
  Input,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import {addtocart, deletefromcart} from '../Redux/actions/cart';

function HouseHold({addTo, deleteFrom, cart}) {
  const [post, setPost] = React.useState([]);
  const [cpost, setCpost] = React.useState([]);


  React.useEffect(async () => {
    await firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(newPost);
      });
  }, []);
  const data = post.filter(x => x.catagory === 'HouseHold');
  const [comment, setComment] = React.useState([]);

   React.useEffect(async () => {
    await firestore()
      .collection('comment')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCpost(newPost);
      });
  }, []);
  const comdata = cpost.filter(x => x.id.id === data.id);

  function addComment(id, username) {
    firestore()
      .collection('comment')
      .doc(id)
      // .update({
      //   com: [{comment: comment, name: username}],
      // });
    .set({

      comment: comment,
      name: username,
      date: new Date,
      id: id,
    }
    ).then()
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header
            searchBar
            round
            style={{backgroundColor: 'white', height: 60, borderRadius: 30}}>
            <Item>
              <Icon name="ios-search" color="#D49A9A" />
              <Input
                placeholder="Search Here.."
                placeholderTextColor="#D49A9A"
                // onChangeText={name => this.setState({search: name})}
              />
            </Item>
          </Header>
          <View>
            {data.map(data => (
              <Card key={data.username.id}>
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
                      {data.username}{' '}
                    </Text>
                  </Left>
                </CardItem>
                <CardItem style={{justifyContent: 'center'}}>
                  <Image
                    style={{height: 200, width: 150}}
                    source={{
                      uri: data.image,
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
                    {data.name}{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'black',
                      justifyContent: 'flex-end',
                    }}>
                    {'Pkr' + ' '}
                    {data.price}
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
                    {data.catagory}{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'black',
                    }}>
                    {' '}
                    {data.area}{' '}
                  </Text>
                </CardItem>
                <Text
                  style={{
                    fontSize: 17,
                    color: 'black',
                    marginLeft: '5%',
                  }}>
                  {' '}
                  {data.description}{' '}
                </Text>
                <View style={{alignItems: 'center', marginBottom: '2%'}}>
                  <TouchableOpacity
                    style={styles.loginBtn1}
                    onPress={()=> 
                      !cart.includes(data)
                      ? addTo(data)
                      : deleteFrom(data.id) 
                    }
                    >
                    <Text
                      style={
                        ({fontfamily: 'poppins'},
                        {fontWeight: 'bold'},
                        {color: 'black', fontSize: 18})
                      }>
                     {cart.includes(data)
                     ? 'Remove from cart'
                     : 'Add to cart'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: '#f2f2f2',
                    height: 60,
                    borderRadius: 30,
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: '3%',
                    marginBottom: '5%',
                  }}>
                  <Input
                    placeholder="Comment Here.."
                    placeholderTextColor="#D49A9A"
                    onChangeText={text => setComment(text)}
                    labelValue={comment}
                  />
                  <TouchableOpacity
                    style={{marginRight: '2%'}}
                    onPress={() => addComment(data.id, data.username)}>
                    <Ionicons name="send" size={30} color="#D49A9A" />
                  </TouchableOpacity>
                </View>
                <View>
                  {comdata.map(comdata => (
                    <View>
                      <Text>
                      {comdata.comment}
                      </Text>
                      {console.log(comdata)}
                    </View>
                  ))}
                  </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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


const mapStatetoProps = state => {
  return {
    cart: state.cartReducer.cart,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    addTo: product => dispatch(addtocart(product)),
    deleteFrom: id => dispatch(deletefromcart(id)),
  };
};


export default connect(mapStatetoProps, mapDispatchtoProps)(HouseHold);
