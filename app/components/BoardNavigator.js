var React = require('react-native');
var colors = require('../BrandColors');
var {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} = React;

var BoardList = React.createClass({
    getPrevPage() {
        if (this.props.currentPage === 1) {
            return null;
        }

        return (
            <TouchableOpacity onPress={this.props.onPrevPage}>
                <View style={styles.buttonPrev}>
                    <Text>Prev Page</Text>
                </View>
            </TouchableOpacity>
        );
    },
    getNextPage() {
        return (
            <TouchableOpacity onPress={this.props.onNextPage}>
                <View style={styles.buttonNext}>
                    <Text>Next Page</Text>
                </View>
            </TouchableOpacity>
        );
    },
    render: function() {
        return (
            <View style={styles.container}>
                {this.getPrevPage()}
                {this.getNextPage()}
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonPrev: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    buttonNext: {
        position: 'absolute',
        top: 0,
        right: 0
    }
})

module.exports = BoardList;