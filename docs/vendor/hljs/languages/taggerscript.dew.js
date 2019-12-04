var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    var COMMENT = {
      className: 'comment',
      begin: /\$noop\(/,
      end: /\)/,
      contains: [{
        begin: /\(/,
        end: /\)/,
        contains: ['self', {
          begin: /\\./
        }]
      }],
      relevance: 10
    };
    var FUNCTION = {
      className: 'keyword',
      begin: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
      end: /\(/,
      excludeEnd: true
    };
    var VARIABLE = {
      className: 'variable',
      begin: /%[_a-zA-Z0-9:]*/,
      end: '%'
    };
    var ESCAPE_SEQUENCE = {
      className: 'symbol',
      begin: /\\./
    };
    return {
      contains: [COMMENT, FUNCTION, VARIABLE, ESCAPE_SEQUENCE]
    };
  };

  return exports;
}