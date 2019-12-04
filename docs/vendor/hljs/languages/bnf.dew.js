var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      contains: [// Attribute
      {
        className: 'attribute',
        begin: /</,
        end: />/
      }, // Specific
      {
        begin: /::=/,
        starts: {
          end: /$/,
          contains: [{
            begin: /</,
            end: />/
          }, // Common
          hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
        }
      }]
    };
  };

  return exports;
}