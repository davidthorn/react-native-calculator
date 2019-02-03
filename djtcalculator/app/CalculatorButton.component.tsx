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
        return (
            <View style={[style.view]}>
                    <Text style={[style.buttonText]}>{this.props.text}</Text>
                </View>

        )
    }

}

const style = StyleSheet.create({
    buttonText: {
        fontSize: 50,
        color: 'deepskyblue'
    },
    view: {
        flex: 0.20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export { CalculatorButton }