var React = require('react-native');
var API = require('./Api');
var {
    View,
    Text,
    ListView,
    Image,
    ScrollView
} = React;

var HTMLWebView = require('react-native-html-webview');


var Post = React.createClass({
    getInitialState: function() {
        return {
            comments: []
        }
    },
    componentWillMount: function() {
        API.posts.getPost('', 12200, function(post) {
            this.setState(post);
        }.bind(this));

        API.posts.getComments('', 12200, function(comments) {

            this.setState({
                comments: comments || []
            });
        }.bind(this))
    },
    getComments: function() {
        return this.state.comments.map(function(comment) {
            return (
                <View>
                    <Image style={{width: 72, height: 72}} source={{uri: comment.avatar }} />
                    <Text>{comment.name}</Text>
                    <HTMLWebView
                        style={{flex: 1}}
                        html={comment.comment}
                        autoHeight={true}
                    />
                </View>
            )
        })
    },
    render: function() {
        return (
            <View>
                <Image style={{width: 72, height: 72}} source={{uri: 'http:' + this.state.avatar}} />
                <Text>{this.state.poster}</Text>
                <Text>{this.state.heartCount}</Text>
                <Text>{this.state.commentCount}</Text>
                <ScrollView>
                    {this.getComments()}
                </ScrollView>
            </View>
        );
    }

});

module.exports = Post;