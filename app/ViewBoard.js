var React = require('react-native');
var API = require('./Api');
var BoardHeader = require('./components/BoardHeader');
var BoardList = require('./components/BoardList');
var BoardNavigator = require('./components/BoardNavigator');
var {
    View,
    Text,
    ListView
} = React;

function parseItem(item) {
    var _parsedItem = {
        title: item.title[0]._text,
        description: item.description[0]._text,
        link: item.link[0]._text
    };

    if (item.pubDate) {
        _parsedItem.pubDate = item.pubDate[0]._text;
    }
    if (item.item) {
        _parsedItem.item = item.item;
    }

    return _parsedItem;
}

var ViewBoard = React.createClass({
    getDefaultProps: function() {
        return {
            id: null
        }
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            currentPage: 1,
            board: {},
            items: [],
            dataSource: ds.cloneWithRows([]),
        }
    },
    componentWillMount: function() {
        this.loadPosts(this.state.currentPage);
    },
    loadPosts: function(page) {
        var query = page ? '?page=' + page : '';

        API.posts.getPosts(this.props.id,query, function(result) {
            var channel = parseItem(result.rss[0].channel[0]);
            this.setupBoard({
                title: channel.title,
                description: channel.description,
                link: channel.link
            });

            this.setupItems(channel.item.map(parseItem));
        }.bind(this))
    },
    setupBoard: function(board) {
        this.setState({
            board: board
        });
    },
    setupItems: function(items) {
        this.setState({
            items: items,
            dataSource: this.state.dataSource.cloneWithRows(items)
        });
    },
    handleItemSelection: function() {

    },
    handleNextPage: function() {
        this.state.currentPage += 1;
        this.loadPosts(this.state.currentPage);
        this.setState(this.state);
    },
    handlePrevPage: function() {
        this.state.currentPage -= 1;
        this.loadPosts(this.state.currentPage);
        this.setState(this.state);
    },
    render: function() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flex: 1}}>
                    <BoardHeader
                        {...this.state.board}
                    />
                </View>
                <View style={{flex: 10}}>
                    <BoardList
                        dataSource={this.state.dataSource}
                        onSelection={this.handleItemSelection}
                    />
                </View>
                <View style={{flex: 1}}>
                    <BoardNavigator
                        currentPage={this.state.currentPage}
                        onNextPage={this.handleNextPage}
                        onPrevPage={this.handlePrevPage}
                    />
                </View>
            </View>
        );
    }

});

module.exports = ViewBoard;