var React = require('react-native');
var Storage = require('./Storage');
var {
  StyleSheet,
  View,
  Navigator
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

var Routes = {
    'GLOBAL_BOARD_SET': {
        name: 'GLOBAL_BOARD_SET',
        index: 1,
        component: GlobalBoardSet
    },
    'VIEW_BOARD': {
        name: 'VIEW_BOARD',
        index: 2,
        component: ViewBoard
    },
    'VIEW_POST': {
        name: 'VIEW_POST',
        index: 3,
        component: PostView
    }
}

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
    });
  },
  renderScene: function(route, navigator) {

    var Component = route.route ? Routes[route.route].component : route.component;

    return (
        <Component 
            navigator={navigator}
            {...route.props}
        />
    )
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Navigator
            initialRoute={Routes.GLOBAL_BOARD_SET}
            renderScene={this.renderScene}
        />
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