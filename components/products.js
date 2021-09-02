import React from 'react'
import { SafeAreaView,View,TouchableOpacity,} from 'react-native';
import {Input} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Comments from './Comments';



function product({}) {
    return (
        <SafeAreaView>
        <View>
        <Comments/>
       </View>
       </SafeAreaView>
    )
}

export default product;
