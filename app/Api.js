var parse = require('xmltojson');
var cheerio = require('cheerio');

var API = {
    posts: {
        getPosts: function(board, query, cb) {
            fetch(getBoardUrl(board) + 'posts.rss' + query).then((response) => response.text()).then(function(response) {
                cb(parse.parseString(response));
            });
        },
        getComments: function(board, id, cb) {
            fetch(getBoardUrl(board) + 'posts/' + id + '/comments').the((response) => response.text()).then(function(response) {
                cb(response); // PARSE HTML COMMENTS HERE
            })
        },
        getPost: function(board, id, cb) {
            fetch(getBoardUrl(board) + 'posts/' + id).then((response) => response.text()).then(function(response) {
                var $ = cheerio.load(response);
                var $post = $('#main_post'),
                    avatar = $post.find('.avatar img').attr('src').trim(),
                    poster = $post.find('.post-meta a').text().trim(),
                    $postCounts = $post.find('.post-meta-social'),
                    heartCount = $postCounts.find('.js-hearts-count').text().trim(),
                    commentCount = $postCounts.find('.js-comments-count').text().trim();

                cb({
                    avatar,
                    poster,
                    heartCount,
                    commentCount
                });
            })
        }
    },
    notifications: {
        getCount: function(board, cb) {
            fetch(getBoardUrl(board) +'notifications.json').then((response) => response.text()).then(function(response) {
                cb(response);
            });
        }
    }
}

function getBoardUrl(board) {
    return 'https://pdxstartups.switchboardhq.com/';
}

module.exports = API;