var React = require('react-native');
var BoardSelector = require('./components/BoardSelector');
var BoardEnter = require('./components/BoardEnter');
var Storage = require('./Storage');
var {
    View,
    Text,
    StyleSheet,
    ListView
} = React;

var GlobalBoardSet = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        return {
            text: '',
            list: [],
            dataSource: ds.cloneWithRows([]),
        }
    },
    componentWillMount: function() {
        Storage.getSavedBoards().then(function(boards) {
            this.setState({
                list: boards,
                dataSource: this.state.dataSource.cloneWithRows(boards || [])
            });
        }.bind(this));
    },
    handleAdd: function() {
        this.state.list.push({
            id: this.state.text
        });

        Storage.setSavedBoards(this.state.list);
        
        this.setState({
            text: '',
            dataSource: this.state.dataSource.cloneWithRows(this.state.list)
        });

    },
    handleSelection: function(data) {
        this.props.navigator.push({
            props: data,
            route: 'VIEW_BOARD'
        })
    },
    handleDelete: function() {

    },
    handleStar: function() {

    },
    handleTextChange: function(value) {
        this.setState({
            text: value
        })
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <BoardEnter 
                        text={this.state.text}
                        onAdd={this.handleAdd}
                        onTextChange={this.handleTextChange}
                    />
                </View>
                <View style={styles.bottom}>
                    <BoardSelector
                        onSelection={this.handleSelection}
                        onDelete={this.handleDelete}
                        onStar={this.handleStar}
                        dataSource={this.state.dataSource}
                    />
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    top: {
        flex: 1
    },
    bottom: {
        flex: 1.5
    }
})

module.exports = GlobalBoardSet;