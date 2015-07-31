var React = require('react-native');
var API = require('./Api');
var {
    View,
    Text,
    ListView,
    Image,
    ScrollView,
    LinkingIOS,
    WebView
} = React;

var HTMLWebView = require('react-native-html-webview');


var Post = React.createClass({
    getInitialState: function() {
        return {
            comments: []
        }
    },
    componentWillMount: function() {
        API.posts.getPost(this.props.board, this.props.item.id, function(post) {
            this.setState(post);
        }.bind(this));

        API.posts.getComments(this.props.board, this.props.item.id, function(comments) {
            this.setState({
                comments: comments || []
            });
        }.bind(this))
    },
    handleLinkClick: function(link) {
        LinkingIOS.openURL(link);
    },
    getComments: function() {
        return this.state.comments.map(function(comment) {
            return (
                <View stlye={{height: 50, overflow: 'hidden'}}>

                    <Image style={{width: 72, height: 72}} source={{uri: comment.avatar }} />
                    <Text>{comment.name}</Text>
                    <HTMLWebView
                        html={comment.comment}
                        autoHeight={true}
                        onLink={this.handleLinkClick}
                    />
                </View>
            )
        }, this)
    },
    render: function() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View stlye={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Image style={{width: 72, height: 72}} source={{uri: 'http:' + this.state.avatar}} />
                        <Text>{this.state.poster}</Text>
                        <Text>Hearts: {this.state.heartCount}</Text>
                        <Text>Comments: {this.state.commentCount}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <WebView
                            style={{flex: 1, height: 100}}
                            html={this.props.item.description}
                            onLink={this.handleLinkClick}
                        />
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView style={{flex: 1}}>
                        {this.getComments()}
                    </ScrollView>
                </View>
            </View>
        );
    }

});

module.exports = Post;