import React, { Component } from "react"
import { View, Text, TouchableOpacity, Alert, } from "react-native"
import { CalculatorButton } from './CalculatorButton.component'
import { style } from "./style";
import { CalculatorProps, CalculatorState } from "./CalculatorProps";
import  * as math from 'mathjs'

class CalculatorFeature extends Component<CalculatorProps, CalculatorState> {

    private readonly minusSymbol: string = '|-|'

    private readonly allowedMultiplicationSymbols = ['*', 'x', 'X'];
    
    private readonly allowedSymbols = ['C', '%', '/', 'X', '*', 'x', '-' , '|-|', '+', ',', '=', '<'];

    constructor(props: CalculatorProps, state: CalculatorState) {
        super(props, state)
        this.state = {
            equation: [ '0' ]
        }
    }

    buttonTapped(value: string) {
       
        let items = this.state.equation
            
        items = this.resetIfZeroAndFirstItem(items);
       
        const multiply: string[] = this.getAllowedMultiplicationSymbols()

        switch(this.allowedSymbols.includes(value)) {
            case true:
            items = items.length === 0 ? ['0'] : items
            items = this.handleSymbolPressed(value, items, multiply);
            break;
            case false: /// is a number
            this.handleNumberPressed(this.getLastItem(items), items, value, this.allowedSymbols);
            break

        }

        this.setState({
            equation: items
        })

    }

    private resetIfZeroAndFirstItem(items: string[]) {
        if (items.length === 1 && items[0] === '0') {
            items = [];
        }
        return items;
    }

    private getAllowedMultiplicationSymbols(): string[] {
        return this.allowedMultiplicationSymbols;
    }

    private getLastItem(items: string[]): string | undefined {
        return items.length > 0 ? items[items.length - 1] : undefined;
    }

    private handleSymbolPressed(value: string, items: string[], multiply: string[]) {
        switch (value) {
            case 'C':
                items = ['0'];
                break;
            case '-':
                items = this.handleMinusSign(items)
                break
            case '<':
                items = this.handleDeleteButton(items)
                break
            case ',':
                items = this.handleComma(items , this.getLastItem(items) || '0')
                break
            case '=':
                const last = this.getLastItem(items) || '0'
                items = this.allowedSymbols.includes(last) ? items : [this.evaluteEquation(items, multiply)];
                break;
            default:
                const lastSymbol = this.getLastItem(items) || '0'
                if(!this.allowedSymbols.includes(lastSymbol)) {
                    items.push(value);
                }
                
        }
        return items;
    }

    handleMinusSign(items: string[]): string[] {

        const last = this.getLastItem(items)

        let lastIndex = items.length > 0 ? items.length - 1 : 0

        /// start a negative number
        if(last === undefined) {
            items[lastIndex] = '-'
            return items
        }

        /// a negative number has been started already wich means that it requires
        /// a number to follow
        if(last === '-') {
            return items
        }
        
        /// |-| means that it is a substract symbol
        if(last === this.minusSymbol) {
            /// add a negative number
            items.push('-')
            return items
        }

        if(this.allowedSymbols.includes(last)) {
            items.push('-')
            return items
        }

        items.push(this.minusSymbol)

        return items

    }

    handleDeleteButton(items: string[]): string[] {

        if(items.length === 0) {
            return items
        }

        let lastIndex = items.length - 1
        const last = items[lastIndex]

        if(this.allowedSymbols.includes(last)) {
            return items.length === 1 ? ['0'] : items.splice(0, items.length - 1)
        }

        const chars = last.split('')
        if(chars.length > 1) {
            items[lastIndex] = chars.splice(0,chars.length - 1).join('')
        } else {
            return items.length === 1 ? ['0'] : items.splice(0, items.length - 1)
        }
        
        return items
    }

    handleComma(items: string[], lastItem: string) : string[] {
            
            if(this.allowedSymbols.includes(lastItem)) {
                /// if it is a symbol then we can  assume that the person wanted for the 
                /// number to start with 0
                const newItems = items.concat(['0'])
                return this.handleComma(newItems , this.getLastItem(newItems) || '0')
            }

            const index = items.length === 0 ? 0 : items.length - 1
            const value = `${lastItem},`
            items[index] = value
            return items
    }

    private evaluteEquation(items: string[], multiply: string[]): string {
        const sum = items.map(i => { return multiply.includes(i) ? '*' : i; }).join(' ')
        const num = math.eval(this.sanitise(sum));
        return math.format(num , {
            precision: 4
        })
    }

    protected handleNumberPressed(last: string | undefined, items: string[], value: string, symbols: string[]) {
        switch (last) {
            case undefined:
                items.push(value);
                break;
            default:
                if (symbols.includes(last)) {
                    if(last === '-') {
                        items[items.length - 1] = `${last}${value}`;
                    } else {
                        items.push(value);
                    }
                    
                }
                else {
                    items[items.length - 1] = `${last}${value}`;
                }
        }
    }

    colButtons(buttons: string[]): Element[] {
        return buttons.map((i, index) => {
            const style = {
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: index === buttons.length - 1 ? '#ffffff00' : '#a1a1a120'
            }
           return (
                <TouchableOpacity style={ style } 
                                    key={i.toString()} 
                                    onPress={() => this.buttonTapped(i)} >
                    <CalculatorButton text={i}> </CalculatorButton>
                </TouchableOpacity>
            )

        })
    }

    sanitise(value: string): string {
        value = value.split(this.minusSymbol).join('-')
        value = value.split(',').join('.')
        return value
    }

    render() {
        return (
            <View style={style.view}>
                <View style={style.header}></View>
                <View style={style.body}>
                    <View style={style.inputField}>
                        <Text style={style.inputFieldText}>{ this.sanitise(this.state.equation.join(' ')) }</Text>
                    </View>
                    <View style={style.buttonBody}>
                        <View style={[style.buttonBodyCol, style.borderRight]}>
                            {this.colButtons(['C', '7', '4', '1', '%'])}   
                        </View>
                        <View style={[style.buttonBodyCol, style.borderRight]}>
                            {this.colButtons(['/', '8', '5', '2', '0'])}
                        </View>
                        <View style={[style.buttonBodyCol, style.borderRight]}>
                            {this.colButtons(['X', '9', '6', '3', ','])}
                        </View>
                        <View style={[style.buttonBodyCol]}>
                            {this.colButtons(['<', '-', '+', '=', ''])}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

export { CalculatorFeature }