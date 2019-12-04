var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (hljs) {
    return {
      aliases: ['clean', 'icl', 'dcl'],
      keywords: {
        keyword: 'if let in with where case of class instance otherwise ' + 'implementation definition system module from import qualified as ' + 'special code inline foreign export ccall stdcall generic derive ' + 'infix infixl infixr',
        built_in: 'Int Real Char Bool',
        literal: 'True False'
      },
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
        begin: '->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>'
      } // relevance booster
      ]
    };
  };

  return exports;
}