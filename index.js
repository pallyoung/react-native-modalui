/**
 * @description react-native-modalui
 * @author Spencer Ye
 */
'use strict'

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    Dimensions,
    InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';
let {width,height} = Dimensions.get('window');
export default class ModalUI extends Component {
    static propTypes = {
        animationType:PropTypes.oneOf(['fade','slideUp','slideDown','slideLeft','slideRight','none']),
        backgroundColor:PropTypes.string,
        easing:PropTypes.any
    }
    static defaultProps = {
        animationType: 'slideUp',
        backgroundColor: 'transparent',
        easing:Easing.ease
    }
    constructor(...props) {
        super(...props);
        this.state = {
            show:false
        }
        this.animatedValue = new Animated.Value(0);
    }
    componentDidMount() {
        if(this.props.visiable){
            this._show()
        }
    }
    componentDidUpdate(prevProps, prevState) {
        
    }
    
    _show(){

    }
    _onShow(){

    }
    _onHide(){
        this.props.onRequestClose && this.props.onRequestClose();
    }
    _hide(){
        var easing = this.props.easing;
        InteractionManager.runAfterInteractions(() => {
            if (this.props.animationType == 'none') {
                this.animated.setValue(0);
                this._onHide();
            } else {
                Animated.timing(this.animated, {
                    easing,
                    toValue: 0,
                    duration: 200
                }).start(() => this._onHide());
            }
        })
    }
    componentWillReceiveProps(){

    }
    componentWillUnmount(){

    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.onDidMount && this.props.onDidMount(this);
            if (this.props.animationType == 'none') {
                this.animated.setValue(1);
                this.props.onShow && this.props.onShow();
            } else {
                Animated.timing(this.animated, {
                    easing: Easing.ease,
                    toValue: 1,
                    duration: 200
                }).start(() => this.props.onShow && this.props.onShow());
            }
        })
    }

    render() {
        let opacity, translateY,translateX;
        switch (this.props.animationType) {
            case 'fade':
                opacity = this.animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                });
                translateY = 0;
                translateX = 0;
                break;
            case 'slideLeft':
                
                break;
            case 'slideRight':
                break;
            case 'slideDown':
                break;
            case 'slideUp':
                break;
            default:
                opacity = 1;
                translateY = this.animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [window.height, 0]
                });
        }
        return (
            <Animated.View
                children={this.props.children}
                style={[styles.base, { opacity, transform: [{ translateY,translateX}] }]} />
        );
    }
}

const styles = StyleSheet.create({
    base: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column'
    }
});
Modal.propTypes = {
    animationType: PropTypes.oneOf(['none', 'slide', 'fade'])
}