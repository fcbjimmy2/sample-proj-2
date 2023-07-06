// Base URL
// ----------------------------------------------------------------------

export const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.PROD.BASE_URL : process.env.DEV.BASE_URL;

// MySQL Database
// ----------------------------------------------------------------------

export const CONNECTION_LIMIT = process.env.NODE_ENV === 'production' ? process.env.PROD.CONNECTION_LIMIT : process.env.DEV.CONNECTION_LIMIT;
export const DB_LIB = process.env.NODE_ENV === 'production' ? process.env.PROD.DB_LIB : process.env.DEV.DB_LIB;
export const DB_PORT = process.env.NODE_ENV === 'production' ? process.env.PROD.DB_PORT : process.env.DEV.DB_PORT;
export const DB_HOST = process.env.NODE_ENV === 'production' ? process.env.PROD.DB_HOST : process.env.DEV.DB_HOST;
export const DB_USER = process.env.NODE_ENV === 'production' ? process.env.PROD.DB_USER : process.env.DEV.DB_USER;
export const DB_PASS = process.env.NODE_ENV === 'production' ? process.env.PROD.DB_PASS : process.env.DEV.DB_PASS;
export const DB_NAME = process.env.NODE_ENV === 'production' ? process.env.PROD.DB_NAME : process.env.DEV.DB_NAME;

// OnlyOffice 

export const ONLYOFFICE_API_URL = process.env.NODE_ENV === 'production' ? process.env.PROD.ONLYOFFICE_API_URL : process.env.DEV.ONLYOFFICE_API_URL;

// SETTINGS
// ----------------------------------------------------------------------

export const defaultSettings = {
  // light | dark
  themeMode: 'light',
  locale: 'en'
};

// Froala Editor Config
// ----------------------------------------------------------------------

export const froalaEditorConfig = {
  imageEditButtons: ['wirisEditor','wirisChemistry'],
  htmlAllowedTags: 	['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'br', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'queue', 'rp', 'rt', 'ruby', 's', 'samp', 'style', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'],
  htmlAllowedAttrs: ['align', 'allowfullscreen', 'allowtransparency', 'alt', 'aria-.*', 'async', 'background', 'bgcolor', 'border', 'charset', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'data', 'data-.*', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 'formaction', 'frameborder', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'mozallowfullscreen', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'spellcheck', 'style', 'tabindex', 'target', 'title', 'type', 'translate', 'usemap', 'value', 'valign', 'webkitallowfullscreen', 'width', 'wrap'],
  htmlAllowedEmptyTags: ['mprescripts', 'none'],
  pluginsEnabled: ['align', 'codeBeautifier', 'colors', 'draggable', 'embedly', 'emoticons',
    'entities', 'fontAwesome', 'fontFamily', 'fontSize', 'image',
    'inlineStyle', 'inlineClass', 'lineBreaker', 'lineHeight', 'link', 'lists', 'paragraphFormat', 'paragraphStyle',
    'quickInsert', 'quote', 'table', 'url', 'wordPaste', 'wiris',
  ],
  imageUploadURL: '',
  fileUploadURL: '',
  fileAllowedTypes: [
    'text/plain',
    'application/x-pdf',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  toolbarButtons: {
    moreText: {
      buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
      align: 'left',
      buttonsVisible: 3
    },
    moreParagraph: {
      buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
      align: 'left',
      buttonsVisible: 3
    },
    moreRich: {
      buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR', 'wirisEditor', 'wirisChemistry'],
      align: 'left',
      buttonsVisible: 3
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2
    },
  },
  events: {},
  spellcheck: false,
  quickInsertEnabled: false,
  attribution: false,
  fontFamilyDefaultSelection: 'Roboto',
  key: 'sZH1rB1A6B5E5B4F4F4jC1QUd1Xd1OZJ1ABVJRDRNGGUE1ITrE1D4A3B11B1C6C5B1E4I3==',
};

export const froalaEditorConfigWithoutMath = {
  htmlAllowedTags: 	['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'br', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'queue', 'rp', 'rt', 'ruby', 's', 'samp', 'style', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'],
  htmlAllowedAttrs: ['align', 'allowfullscreen', 'allowtransparency', 'alt', 'aria-.*', 'async', 'background', 'bgcolor', 'border', 'charset', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'data', 'data-.*', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 'formaction', 'frameborder', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'mozallowfullscreen', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'spellcheck', 'style', 'tabindex', 'target', 'title', 'type', 'translate', 'usemap', 'value', 'valign', 'webkitallowfullscreen', 'width', 'wrap'],
  htmlAllowedEmptyTags: ['mprescripts', 'none'],
  pluginsEnabled: ['align', 'codeBeautifier', 'colors', 'draggable', 'embedly', 'emoticons',
    'entities', 'fontAwesome', 'fontFamily', 'fontSize', 'image',
    'inlineStyle', 'inlineClass', 'lineBreaker', 'lineHeight', 'link', 'lists', 'paragraphFormat', 'paragraphStyle',
    'quickInsert', 'quote', 'table', 'url', 'wordPaste'
  ],
  imageUploadURL: '',
  fileUploadURL: '',
  fileAllowedTypes: [
    'text/plain',
    'application/x-pdf',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  toolbarButtons: {
    moreText: {
      buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
      align: 'left',
      buttonsVisible: 3
    },
    moreParagraph: {
      buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
      align: 'left',
      buttonsVisible: 3
    },
    moreRich: {
      buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR', 'wirisEditor', 'wirisChemistry'],
      align: 'left',
      buttonsVisible: 3
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2
    },
  },
  events: {},
  spellcheck: false,
  quickInsertEnabled: false,
  attribution: false,
  fontFamilyDefaultSelection: 'Roboto',
  key: 'sZH1rB1A6B5E5B4F4F4jC1QUd1Xd1OZJ1ABVJRDRNGGUE1ITrE1D4A3B11B1C6C5B1E4I3==',
};


// LAYOUT
// ----------------------------------------------------------------------

export const HEADER_MOBILE_HEIGHT = 64;
export const HEADER_DESKTOP_HEIGHT = 96;
export const HEADER_DESKTOP_Y_OFFSET = 96 - 32;
export const DRAWER_WIDTH = 280;
export const DRAWER_MINI_WIDTH = 105;

// LAYOUT - Minimal related

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

// MAIN TITLE
// ----------------------------------------------------------------------

export const SITE_TITLE = process.env.SITE_TITLE;

// FAVICON
// ----------------------------------------------------------------------

export const FAVICON = process.env.FAVICON;

// LOGO
// ----------------------------------------------------------------------

export const LOGO = process.env.LOGO;
export const LOGO_DARK = process.env.LOGO_DARK;

// LANGUAGE
// ----------------------------------------------------------------------

export const LANGUAGES = [
  {
    label: '中文繁體',
    value: 'zh-Hant'
  },
  {
    label: '中文简体',
    value: 'zh-Hans'
  },
  {
    label: 'English',
    value: 'en'
  },
];