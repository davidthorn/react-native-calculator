import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, } from "react-native"
import { CalculatorButton } from './CalculatorButton.component'

interface CalculatorProps {

}


interface CalculatorState {

}

class CalculatorFeature extends Component<CalculatorProps, CalculatorState> {

    constructor(props: CalculatorProps, state: CalculatorState) {
        super(props, state)
        this.state = {
        }
    }

    buttonTapped(value: string) {
        Alert.alert('Pressed')
        console.log('button was pressed', value)
    }

    colButtons(buttons: string[]): Element[] {
        return buttons.map(i => {
            console.log('here')
            return (
                <TouchableOpacity key={i.toString()} onPress={() => console.log('here it is')} >
                    <CalculatorButton text={i}> </CalculatorButton>
                </TouchableOpacity>
            )

        })
    }

    render() {
        return (
            <View style={style.view}>
                <View style={style.header}></View>


                <View style={style.body}>
                    <View style={style.inputField}></View>
                    <View style={style.buttonBody}>
                        <View style={[style.buttonBodyCol, style.col1]}>
                            {this.colButtons(['C', '7', '4', '1', '%'])}
                        </View>
                        <View style={[style.buttonBodyCol, style.col2]}>
                            {this.colButtons(['/', '8', '5', '2', '0'])}
                        </View>
                        <View style={[style.buttonBodyCol, style.col3]}>
                            {this.colButtons(['X', '9', '6', '3', ','])}
                        </View>
                        <View style={[style.buttonBodyCol, style.col4]}>
                            {this.colButtons(['<', '-', '+', '=', ''])}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

const style = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    header: {
        height: 80,
        backgroundColor: 'blue'
    },
    body: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'

    },
    buttonText: {
        fontSize: 50,
        color: 'deepskyblue'
    },
    inputField: {
        flex: 0.18,
        backgroundColor: 'yellow'
    },
    buttonBody: {
        backgroundColor: 'green',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    buttonBodyCol: {
        backgroundColor: 'orange',
        flex: 0.25,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly'
    },
    buttonBodyRow: {
        backgroundColor: 'darkcyan',
        flex: 0.20,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    row: {
        flex: 0.20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row1: {
        backgroundColor: 'greenyellow',
    },
    row2: {
        backgroundColor: 'khaki',
    },

    row3: {
        backgroundColor: 'lavenderblush',
    },

    row4: {
        backgroundColor: 'lightseagreen',
    },

    row5: {
        backgroundColor: 'mediumblue',
    },

    col1: {
        backgroundColor: 'orange',
    },
    col2: {
        backgroundColor: 'purple',
    },
    col3: {
        backgroundColor: 'bisque'
    },
    col4: {
        backgroundColor: 'burlywood',
    }
})

export { CalculatorFeature }