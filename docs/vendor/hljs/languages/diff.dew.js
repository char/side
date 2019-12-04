var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      aliases: ['patch'],
      contains: [{
        className: 'meta',
        relevance: 10,
        variants: [{
          begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
        }, {
          begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
        }, {
          begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
        }]
      }, {
        className: 'comment',
        variants: [{
          begin: /Index: /,
          end: /$/
        }, {
          begin: /={3,}/,
          end: /$/
        }, {
          begin: /^\-{3}/,
          end: /$/
        }, {
          begin: /^\*{3} /,
          end: /$/
        }, {
          begin: /^\+{3}/,
          end: /$/
        }, {
          begin: /^\*{15}$/
        }]
      }, {
        className: 'addition',
        begin: '^\\+',
        end: '$'
      }, {
        className: 'deletion',
        begin: '^\\-',
        end: '$'
      }, {
        className: 'addition',
        begin: '^\\!',
        end: '$'
      }]
    };
  };

  return exports;
}