import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    header: {
        height: 30,
        backgroundColor: 'transparent'
    },
    body: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    inputField: {
        flex: 0.12,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#a1a1a120',
        overflow: 'hidden'
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: '#a1a1a120'
    },
    inputFieldText: {
        fontSize: 40,
        textAlign: 'right',
        marginRight: 20
  
    },
    buttonBody: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    buttonBodyCol: {
        flex: 0.25,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly'
    }
});
