var React = require('react-native');
var Storage = require('./Storage');
var {
  StyleSheet,
  View,
} = React;


var DEFAULT_BOARD_LIST = [
                        {
                            id: 'pdxstartups'
                        },
                        {
                            id: 'epicodus'
                        }, 
                        {
                            id: 'reed'
                        }
                    ];

var GlobalBoardSet = require('./GlobalBoardSet');
var ViewBoard = require('./ViewBoard');
var PostView = require('./Post');

var App = React.createClass({
  getInitialState: function() {
    return {
      init: false
    }
  },
  componentWillMount: function() {
    Storage.getHasRun().then(function(hasRun) {
      if (!hasRun) {
        Storage.setSavedBoards(DEFAULT_BOARD_LIST).then(this.initApp.bind(this));
        Storage.setHasRun();
      } else {
        this.initApp();
      }
    }.bind(this));
  },
  initApp: function() {
    this.setState({
        init: true
    })
  },
  getApp: function() {
    if (!this.state.init) {
      return <View />
    }

    return (
        <PostView />
    );
  },
  render: function() {
    return (
      <View style={styles.container}>
        {this.getApp()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = App;