'use strict';

var cheerio = require('cheerio');
var users = {};
var alternate = false;

module.exports = {
  book: {
    assets: './book',
    css: [
      'plugin.css'
    ]
  },
  blocks: {
    chathead: {
      process: function(blk) {

        // calculate styles for each and write them inline
        var istyle = '';
        for (var username in users) {
          istyle += '.chatlog__entry.'
            + username
            + ' .chatlog__message::before { '
            + 'border: 6px solid transparent; border-right-color: ' + users[username]['balloon'] + '}' + "\n";
          istyle += '.chatlog__entry.'
            + username
            + ' .chatlog__message { '
            + 'background-color: ' + users[username]['balloon'] + ';'
            + 'color: ' + users[username]['text'] + '; }' + "\n";
          istyle += '.chatlog__entry.chatlog__entry_flip'
            + '.' + username
            + ' .chatlog__message::before { '
            + 'border: 6px solid transparent; border-left-color: ' + users[username]['balloon'] + '}' + "\n";
        }

        return '<style>' + istyle + '</style><ul class="chatlog">';
      }
    },
    msg: {
      process: function(blk) {
        var username = blk.kwargs['from'];
        var liclass = 'chatlog__entry';
        if (alternate === true && users[username]['even'] === false) {
          liclass += ' chatlog__entry_flip';
        }
        liclass += ' ' + username;
        var out = '<li class="' + liclass + '">';
        out += '<img class="chatlog__avatar" src="/chatlog/' + username + '.jpg" />';
        out += '<p class="chatlog__message">' + blk.body + '</p></li>';
        return out;
      }
    },
    chatfoot: {
      process: function(blk) {
        return '</ul>';
      }
    }
  },

  hooks: {
    // for all the hooks, this represents the current generator.
    // This is called before the book is generated.
    init: function() {
      if (this.options.pluginsConfig && this.options.pluginsConfig.chatlog) {
        var chatlog = this.options.pluginsConfig.chatlog;
        users = chatlog['users'];
        var i = 0;
        for (var username in users) {
          i++;
          if (i % 2 === 0) {
            users[username]['even'] = true;
          } else {
            users[username]['even'] = false;
          }
        }
        if (i === 2) {
          alternate = true;
        }
      }
    }
  }
}
