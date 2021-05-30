'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log("Req.body:", req.body)
      // Req.body: { text: '', locale: 'american-to-british' }
      let text = req.body.text;
      let locale = req.body.locale;

      // Missing required fields
      if (typeof text !== 'string' || !locale) {
        return res.json({
          error: 'Required field(s) missing'
        })
      }

      // Empty text
      if (text === '') {
        return res.json({
          error: 'No text to translate'
        })
      }
      
      // Translate american-to-british
      let translation = translator.translateText(text, locale);

      if (locale === 'american-to-british') {
        if (translation) {
          console.log("Submitted Text:", text)
          console.log("Translated Text:", translation)
          if (translation === text) {
            translation = 'Everything looks good to me!'
          }
          return res.json({
            text, translation
          })
        }
      }
      
      if (locale === 'british-to-american') {
        if (translation) {
          console.log("Submitted Text:", text)
          console.log("Translated Text:", translation)
          if (translation === text) {
            translation = 'Everything looks good to me!'
          }
          return res.json({
            text, translation
          })
        }
      }
        // Other locale
      return res.json({
        error: 'Invalid value for locale field'
      })
    })
};
