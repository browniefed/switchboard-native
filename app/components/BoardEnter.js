var React = require('react-native');
var colors = require('./../BrandColors');
var {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} = React;

var BoardEnter = React.createClass({

    render: function() {
        return (
            <View
                style={styles.container}
            >
                <View style={styles.inner}>
                    <Text style={styles.text}>Add a board:</Text>
                    <TextInput 
                        value={this.props.text}
                        style={styles.textInput}
                        onChangeText={this.props.onTextChange}
                        onSubmitEditing={this.props.onAdd}
                    />
                    <TouchableOpacity onPress={this.props.onAdd}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       flex: 1,
       alignItems: 'center'
    },
    inner: {
        flex: 1,
        padding: 50
    },
    text: {
        color: colors.textGrey,
        alignSelf: 'flex-start',
    },
    textInput: {
        height: 30,
        marginTop: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#000'
    },
    button: {
        backgroundColor: colors.buttonGrey,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginTop: 10
    },
    buttonText: {
        color: '#FFF'
    }
})

module.exports = BoardEnter;