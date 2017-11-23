/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modalui';

export default class App extends Component<{}> {
  constructor(...props){
    super(...props);
    this.state = {
      isVisible:false,
      animationType:'none'
    }
  }
  _showModal=(animationType)=>{
    this.setState({isVisible:true,animationType})
  }
  _hideModal=()=>{
    this.setState({isVisible:false})
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {()=>this._showModal('slideLeft')}>
          <Text>FROM LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {()=>this._showModal('slideRight')}>
          <Text>FROM RIGHE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {()=>this._showModal('slideUp')}>
          <Text>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {()=>this._showModal('slideDown')}>
          <Text>DOWN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {()=>this._showModal('fade')}>
          <Text>FADE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {()=>this._showModal('none')}>
          <Text>NONE</Text>
        </TouchableOpacity>
        <Modal 
          onModalShow={()=>console.log('show')}
          onModalHide={()=>console.log('hide')}
          style={styles.container}
          animationType = {this.state.animationType}
          onBackdropPress = {this._hideModal}
          isVisible = {this.state.isVisible}>
        <TouchableOpacity 
          style = {styles.button}

          onPress = {this._hideModal}>
          <Text>HIDE</Text>
        </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    height:60,
    width:120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#667823'
  },
  text:{
    color:'#333333'
  }
});
