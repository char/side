var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      subLanguage: 'xml',
      contains: [{
        begin: '<%',
        end: '%>',
        subLanguage: 'vbscript'
      }]
    };
  };

  return exports;
}