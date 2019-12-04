var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      aliases: ['docker'],
      case_insensitive: true,
      keywords: 'from maintainer expose env arg user onbuild stopsignal',
      contains: [hljs.HASH_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE, {
        beginKeywords: 'run cmd entrypoint volume add copy workdir label healthcheck shell',
        starts: {
          end: /[^\\]$/,
          subLanguage: 'bash'
        }
      }],
      illegal: '</'
    };
  };

  return exports;
}