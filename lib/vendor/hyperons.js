// much faster but much less safe Object.assign()
function extend(...items) {
  const target = {};

  for (let i = 0, len = items.length; i < len; i++) {
    const item = items[i];

    if (item) {
      for (const prop in item) {
        target[prop] = item[prop];
      }
    }
  }

  return target
}

/**
 * Base Component class
 * @param {object} props The initial component props
 */
function Component(props) {
  this.props = props;
  this.state = this.state || {};
}

class SafeString {
  constructor(str) {
    this.str = str;
  }
  toString() {
    return this.str
  }
}

// https://www.w3.org/International/questions/qa-escapes#use
const ESCAPE_TEST_REGEXP = /["'&<>]/;

const ESCAPE_REGEXP = /["'&<>]/g;

const ESCAPE_MAP = new Map([
  ['"', '&quot;'],
  ["'", '&#x27;'],
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;']
]);

function escapeChar(char) {
  return ESCAPE_MAP.get(char)
}

function escapeString(value) {
  if (!ESCAPE_TEST_REGEXP.test(value)) {
    return value
  }

  return String(value).replace(ESCAPE_REGEXP, escapeChar)
}

function childElements(children) {
  let out = '';

  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];

    if (child == null || typeof child === 'boolean') {
      continue
    }

    if (Array.isArray(child)) {
      out += childElements(child);
    } else {
      // don't double escape any markup output by this element
      out += child instanceof SafeString ? child : escapeString(child);
    }
  }

  return out
}

const UPPERCASE = /([A-Z])/g;

const MS = /^ms-/;

const UNITLESS = new Set([
  'animationIterationCount',
  'columns',
  'columnCount',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom'
]);

const cache = {};

function hyphenateChar(char) {
  return '-' + char.toLowerCase()
}

function hyphenateString(prop) {
  return cache[prop] || (cache[prop] = prop.replace(UPPERCASE, hyphenateChar).replace(MS, '-ms-'))
}

function stringifyStyles(styles) {
  let out = '';

  for (const prop in styles) {
    const value = styles[prop];

    if (value == null) {
      continue
    }

    out += `${hyphenateString(prop)}:${value}`;

    if (typeof value === 'number' && value !== 0 && !UNITLESS.has(prop)) {
      out += 'px';
    }

    out += ';';
  }

  return out
}

// <https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes>
const BOOLEAN = new Set([
  'async',
  'allowfullscreen',
  'allowpaymentrequest',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'ismap',
  'multiple',
  'muted',
  'novalidate',
  'nowrap',
  'open',
  'readonly',
  'required',
  'reversed',
  'selected'
]);

const ALIASES = new Map([
  ['htmlFor', 'for'],
  ['className', 'class'],
  ['defaultValue', 'value'],
  ['defaultChecked', 'checked']
]);

const IGNORE = new Set(['key', 'ref', 'children', '__innerHTML']);

function boolean(name, value) {
  return value ? ` ${name}` : ''
}

function enumerable(name, value) {
  return ` ${name}="${escapeString(value)}"`
}

function styles(name, value) {
  return ` ${name}="${stringifyStyles(value)}"`
}

function stringifyAttributes(attributes) {
  let out = '';

  for (const item in attributes) {
    // ignore arbitrary framework properties
    if (IGNORE.has(item)) {
      continue
    }

    const name = ALIASES.get(item) || item.toLowerCase();
    const value = attributes[item];

    // don't attempt to stringify empty values or event listeners
    if (value == null || typeof value === 'function') {
      continue
    }

    if (name === 'style' && typeof value === 'object') {
      out += styles(name, value);
    } else if (BOOLEAN.has(name)) {
      out += boolean(name, value);
    } else {
      out += enumerable(name, value);
    }
  }

  return out
}

// https://www.w3.org/TR/html/syntax.html#void-elements
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

const INNER_HTML = '__innerHTML';

/**
 * Hyperons
 * @param {String|Function|null} element
 * @param {Object|null} props
 * @param {...String} children
 * @returns {String}
 */
function hyperons(element, props, ...children) {
  let out = '';

  // support for higher-order components
  if (typeof element === 'function') {
    if (props && Array.isArray(props.children)) {
      children.push(props.children);
    }

    props = extend(props, { children });

    if (element.prototype && typeof element.prototype.render === 'function') {
      const instance = new element(props);
      return instance.render()
    }

    return element(props)
  }

  const voidElement = VOID_ELEMENTS.has(element);

  if (element) {
    out += `<${element}${props ? stringifyAttributes(props) : ''}${voidElement ? '/' : ''}>`;
  }

  if (!voidElement) {
    if (props && props[INNER_HTML]) {
      out += props[INNER_HTML];
    } else {
      out += childElements(children);
    }

    if (element) {
      out += `</${element}>`;
    }
  }

  return new SafeString(out)
}

/**
 * To primitive string
 * @param {String} str
 * @returns {String}
 */
function toPrimitiveString(str) {
  if (str === null) {
    return ''
  }

  if (str instanceof SafeString) {
    // <https://jsperf.com/string-literal-casting/1>
    return str.toString()
  }

  if (typeof str === 'string') {
    return str
  }

  throw TypeError('String must be of type string')
}

const Fragment = null;

export { Fragment, Component, hyperons as h, hyperons as createElement, toPrimitiveString as render, toPrimitiveString as renderToString };
