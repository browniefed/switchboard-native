var React = require('react-native');
var {
    AsyncStorage
} = React;

var Storage = {
    getSavedBoards: function() {
        return AsyncStorage.getItem('boards').then(function(value) {
            return JSON.parse(value);
        })
    },
    setSavedBoards: function(value) {
        return AsyncStorage.setItem('boards', JSON.stringify(value));
    },
    getHasRun: function() {
        return AsyncStorage.getItem('hasRun');
    },
    setHasRun: function() {
        return AsyncStorage.setItem('hasRun', '1');
    }
};

module.exports = Storage;