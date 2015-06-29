var React = require('react-native');
var colors = require('../BrandColors');
var {
    View,
    StyleSheet,
    ListView,
    Text,
    TouchableOpacity
} = React;

var BoardList = React.createClass({
    _renderRow: function(rowData, sectionId, rowId) {
        return (
            <TouchableOpacity
                onPress={this.props.onSelection.bind(null, rowData)}
            >
                <View                 
                    style={styles.row}
                > 
                    <Text>{rowData.title}</Text>
                    <Text>{rowData.description}</Text>
                </View>
            </TouchableOpacity>
        )
    },
    _renderSeparator: function() {
        return (
            <View style={styles.separator} />
        )
    },
    render: function() {
        return (
            <View style={styles.container}>
                <ListView
                  dataSource={this.props.dataSource}
                  renderRow={this._renderRow}
                  renderSeparator={this._renderSeparator}
                />
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