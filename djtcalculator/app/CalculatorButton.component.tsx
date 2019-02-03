import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface CalculatorButtonProps {
    text: string
}

interface CalculatorButtonState { }

class CalculatorButton extends Component<CalculatorButtonProps, CalculatorButtonState> {

    constructor(props: CalculatorButtonProps, state: CalculatorButtonState) {
        super(props, state)
        this.state = {}
    }

    render() {
        const value = this.props.text
        const styleColor = parseInt(value) || [',' , '0', '%'].includes(value) ? style.numberButtonText : style.symbolButtonText

        return (
            <View style={style.view}>
                    <Text style={[style.buttonText, styleColor]}>{this.props.text}</Text>
            </View>

        )
    }

}

const style = StyleSheet.create({
    buttonText: {
        fontSize: 50
    },
    numberButtonText: {
        color: '#777'
    },
    symbolButtonText: {
        color: 'deepskyblue'
    },
    view: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export { CalculatorButton }