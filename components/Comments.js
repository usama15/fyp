import React from 'react'
import { SafeAreaView,View,TouchableOpacity,} from 'react-native';
import {Input} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';


function Comments() {
    return (
        <SafeAreaView>
        <View>
        <View  
        style={{backgroundColor: '#f2f2f2', height: 60, borderRadius: 30,width:'95%',flexDirection:'row', alignItems:'center', marginHorizontal:'3%',}}
        >
        <Input
            placeholder="Comment Here.."
            placeholderTextColor="#D49A9A"
            // onChange={this.changeReview}
        />
            <TouchableOpacity><Ionicons  name="send" size={30} color="#D49A9A" /></TouchableOpacity>
        </View>
       </View>
       </SafeAreaView>
    )
}

export default Comments;
