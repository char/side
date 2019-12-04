var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      subLanguage: 'xml',
      contains: [{
        className: 'meta',
        begin: '^__(END|DATA)__$'
      }, // mojolicious line
      {
        begin: "^\\s*%{1,2}={0,2}",
        end: '$',
        subLanguage: 'perl'
      }, // mojolicious block
      {
        begin: "<%{1,2}={0,2}",
        end: "={0,1}%>",
        subLanguage: 'perl',
        excludeBegin: true,
        excludeEnd: true
      }]
    };
  };

  return exports;
}