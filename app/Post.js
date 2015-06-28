var React = require('react-native');
var API = require('./Api');
var {
    View,
    Text,
    ListView,
    Image,
    WebView
} = React;


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
                    <WebView 
                        html={comment.comment} 
                        scalesPageToFit={true}
                        automaticallyAdjustContentInsets={true}
                        style={{flex: 1, height: 100}}
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
                {this.getComments()}
            </View>
        );
    }

});

module.exports = Post;