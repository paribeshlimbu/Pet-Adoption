'use strict';
// Import own modules
const i18n = require('i18n');
const path = require('path');

module.exports = () => {
  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '../../', 'locales'),
    defaultLocale: 'en',
    autoReload: true, 
    syncFiles: true, 
    cookie: 'nodepop-locale' 
  });
  return i18n;
};