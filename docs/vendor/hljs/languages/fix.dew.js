var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      contains: [{
        begin: /[^\u2401\u0001]+/,
        end: /[\u2401\u0001]/,
        excludeEnd: true,
        returnBegin: true,
        returnEnd: false,
        contains: [{
          begin: /([^\u2401\u0001=]+)/,
          end: /=([^\u2401\u0001=]+)/,
          returnEnd: true,
          returnBegin: false,
          className: 'attr'
        }, {
          begin: /=/,
          end: /([\u2401\u0001])/,
          excludeEnd: true,
          excludeBegin: true,
          className: 'string'
        }]
      }],
      case_insensitive: true
    };
  };

  return exports;
}