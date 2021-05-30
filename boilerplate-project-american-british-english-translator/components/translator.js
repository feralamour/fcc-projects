const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  checkLocale(locale) {
    if (locale === 'american-to-british') {
      return true;
    }
    if (locale === 'british-to-american') {
      return true;
    }
    return false;
  }
  
  translateText(text, locale) {
    // Break down the string and search the word lists for each word
    // Ex: Prof. Joyner of King's College, London?
    // Ex: Mangoes are my favorite fruit.
    let translation = text;

    if (locale === 'american-to-british') {
      // American phrase
      Object.entries(americanOnly).forEach(([american, british]) => translation = translation.replace(new RegExp(`(?:[^-]|^)\\b${american}\\b(?=[^-])`, 'gi'), ` <span class="highlight">${british}</span>`))
      // Spelling differences
      Object.entries(americanToBritishSpelling).forEach(([american, british]) => translation = translation.replace(new RegExp(`(?:[^-]|^)\\b${american}\\b(?=[^-])`, 'gi'), ` <span class="highlight">${british}</span>`))
      // Titles
      Object.entries(americanToBritishTitles).forEach(([american, british]) => translation = translation.replace(new RegExp(`${american}`, 'gi'), '<span class="highlight">' + `${british}`.replace(/^\w/, c => c.toUpperCase()) + '</span>'))
      // Time format
      if (translation.match(/(\d{1,2}):(\d{1,2})/g)) {
        translation = translation.replace(/(\d{1,2}):(\d{1,2})/g, '<span class="highlight">\$1.\$2</span>')
      }
      return translation;
    }

    if (locale === 'british-to-american') {
      // Ex: I had a bicky then went to the chippy.
      // British phrase
      Object.entries(britishOnly).forEach(([british, american]) => translation = translation.replace(new RegExp(`(?:[^-]|^)\\b${british}\\b(?=[^-])`, 'gi'), ` <span class="highlight">${american}</span>`))
      // Spelling differences
      Object.entries(americanToBritishSpelling).forEach(([american, british]) => translation = translation.replace(new RegExp(`(?:[^-]|^)\\b${british}\\b(?=[^-])`, 'gi'), ` <span class="highlight">${american}</span>`))
      // Titles
      Object.entries(americanToBritishTitles).forEach(([american, british]) => translation = translation.replace(new RegExp(`\\b${british}\\b`, 'gi'), '<span class="highlight">' + `${american}`.replace(/^\w/, c => c.toUpperCase()) + '</span>'))
      // Time format
      if (translation.match(/(\d{1,2}).(\d{1,2})/g)) {
        translation = translation.replace(/(\d{1,2}).(\d{1,2})/g, '<span class="highlight">\$1:\$2</span>')
      }
      if (translation.match(/^\s/)) {
        translation = translation.replace(/^\s/, '');
      }
      
      return translation;
    }
  }

  translateOnly(text, locale) {
    let translation = this.translateText(text, locale);
    console.log("Submitted Translation:", translation)

    if (translation.match(/(<span class="highlight">)/)) {
      translation = translation.replace(/(<span class="highlight">)/gi, '');
    }
    if (translation.match(/(<\/span>)/)) {
      translation = translation.replace(/(<\/span>)/gi, '');
    }

    console.log(translation)
    return translation;
  }
}

module.exports = Translator;