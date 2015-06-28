var React = require('react-native');
var API = require('./Api');
var {
    View,
    Text,
    ListView
} = React;


var Post = React.createClass({
    getInitialState: function() {
        return {
        }
    },
    componentWillMount: function() {
        API.posts.getPost('', 12200, function(post) {
            console.log(post);
        })
    },
    render: function() {
        return (
            <View>
                <Text>Post</Text>
            </View>
        );
    }

});

module.exports = Post;