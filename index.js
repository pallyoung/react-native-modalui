/**
 * @description react-native-modalui
 * @author Spencer Ye
 */
'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    Dimensions,
    InteractionManager,
    BackHandler,
    ViewStylePropTypes
} from 'react-native';
import PropTypes from 'prop-types';
let { width, height } = Dimensions.get('window');
const TouchView = Animated.createAnimatedComponent(View);
class ModalUI extends Component {
    static propTypes = {
        isVisible: PropTypes.bool,
        animationType: PropTypes.oneOf(['fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'none']),
        easing: PropTypes.any,
        duration: PropTypes.number,
        onModalShow: PropTypes.func,
        onModalHide: PropTypes.func,
        onBackPress: PropTypes.func,
        onBackdropPress: PropTypes.func,
        style: ViewStylePropTypes,
    }
    static defaultProps = {
        isVisible: false,
        animationType: 'slideUp',
        easing: Easing.ease,
        duration: 200
    }
    constructor(...props) {
        super(...props);
        this.state = {
            visiable: false,
            height: 0,
            width: 0
        }
        this._animatedValue = new Animated.Value(0);
    }
    componentDidMount() {
        if (this.props.isVisible) {
            this._show();
        }
        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isVisible !== this.props.isVisible) {
            if (this.props.isVisible) {
                this._show();
            } else {
                this._hide();
            }
        }
    }
    _show() {
        this.setState({ visible: true });
        var easing = this.props.easing;
        if (this.props.animationType == 'none') {
            this._animatedValue.setValue(1);
            this._onShow();
        } else {
            Animated.timing(this._animatedValue, {
                easing,
                toValue: 1,
                duration: this.props.duration
            }).start(this._onShow);
        }
    }
    _onShow = () => {
        this.props.onModalShow && this.props.onModalShow();
    }
    _onHide = () => {
        this.setState({ visible: false });
        this.props.onModalHide && this.props.onModalHide();
    }
    _hide() {
        var easing = this.props.easing;
        if (this.props.animationType == 'none') {
            this._animatedValue.setValue(0);
            this._onHide();
        } else {
            Animated.timing(this._animatedValue, {
                easing,
                toValue: 0,
                duration: this.props.duration
            }).start(this._onHide);
        }
    }
    _onBackPress = () => {
        if(this.props.onBackPress){
            return this.props.onBackPress();
        }else{
            return false;
        }
    }
    _onBackdropPress = () => {
        return this.props.onBackdropPress && this.props.onBackdropPress();
    }
    _onLayout(e) {
        var { height, width } = e.nativeEvent.layout;
        if (height !== this.state.height || width !== this.state.width) {
            this.setState({ height, width });
        }
        this.props.onLayout && this.props.onLayout(e);
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        let opacity, translateY, translateX;
        let { height, width } = this.state;
        switch (this.props.animationType) {
            case 'fade':
                opacity = this._animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                });
                translateY = 0;
                translateX = 0;
                break;
            case 'slideLeft':
                opacity = 1;
                translateX = this._animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, 0]
                });
                translateY = 0;
                break;
            case 'slideRight':
                opacity = 1;
                translateX = this._animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [width, 0]
                });
                translateY = 0;
                break;
            case 'slideDown':
                opacity = 1;
                translateY = this._animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-height, 0]
                });
                translateX = 0;
                break;
            case 'slideUp':
                opacity = 1;
                translateY = this._animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0]
                });
                translateX = 0;
                break;
            default:
                opacity = 1;
                translateY = 0;
                translateX = 0;
        }
        return (
            <TouchView
                onTouchEnd={this._onBackdropPress}
                activeOpacity={1}
                onLayout={(e) => this._onLayout(e)}
                children={this.state.height && this.state.width && this.props.children || null}
                style={[styles.base,
                this.props.style,
                {
                    opacity,
                    transform: [{ translateY }, { translateX }]
                }]} />
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
        flexDirection: 'column',
        backgroundColor: 'rgba(120,120,120,0.5)'
    }
});

export default ModalUI;