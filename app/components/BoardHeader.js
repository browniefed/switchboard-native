var React = require('react-native');
var colors = require('../BrandColors');
var {
    View,
    StyleSheet,
    Text
} = React;

var BoardList = React.createClass({
   
    render: function() {
        return (
            <View style={styles.container}>
                <Text>{this.props.title}</Text>
                <Text>{this.props.description}</Text>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        height: 50
    },
    separator: {
        backgroundColor: '#000',
        height: 1,
        flex: 1
    }
})

module.exports = BoardList;