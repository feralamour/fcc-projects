const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

let translator = new Translator();

suite('Unit Tests', () => {
  suite('American to British English', () => {
    //#1
    test('Translate: Mangoes are my favorite fruit.', done => {
      let input = 'Mangoes are my favorite fruit.';
      let output = 'Mangoes are my favourite fruit.';
      let translation = translator.translateOnly(input, 'american-to-british');

      assert.equal(translation, output);
      done();
    })
    //#2
    test('Translate: I ate yogurt for breakfast.', done => {
      let input = 'I ate yogurt for breakfast.';
      let output = 'I ate yoghurt for breakfast.';
      let translation = translator.translateOnly(input, 'american-to-british');

      assert.equal(translation, output);
      done();
    })
    //#3
    test("Translate: We had a party at my friend's condo.", done => {
      let input = "We had a party at my friend's condo.";
      let output = "We had a party at my friend's flat.";
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#4
    test('Translate: Can you toss this in the trashcan for me?', done => {
      let input = 'Can you toss this in the trashcan for me?';
      let output = 'Can you toss this in the bin for me?';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#5
    test('Translate: The parking lot was full.', done => {
      let input = 'The parking lot was full.';
      let output = 'The car park was full.';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#6
    test('Translate: Like a high tech Rube Goldberg machine.', done => {
      let input = 'Like a high tech Rube Goldberg machine.';
      let output = 'Like a high tech Heath Robinson device.';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#7
    test('Translate: To play hooky means to skip class or work.', done => {
      let input = 'To play hooky means to skip class or work.';
      let output = 'To bunk off means to skip class or work.';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#8
    test('Translate: No Mr. Bond, I expect you to die.', done => {
      let input = 'No Mr. Bond, I expect you to die.';
      let output = 'No Mr Bond, I expect you to die.';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#9
    test('Translate: Dr. Grosh will see you now.', done => {
      let input = 'Dr. Grosh will see you now.';
      let output = 'Dr Grosh will see you now.';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
    //#10
    test('Translate: Lunch is at 12:15 today.', done => {
      let input = 'Lunch is at 12:15 today.';
      let output = 'Lunch is at 12.15 today.';
      let translation = translator.translateOnly(input, 'american-to-british');
      
      assert.equal(translation, output);
      done();
    })
  })
  suite('British to American English', () => {
    //#11
    test('Translate: We watched the footie match for a while.', done => {
      let input = 'We watched the footie match for a while.';
      let output = 'We watched the soccer match for a while.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#12
    test('Translate: Paracetamol takes up to an hour to work.', done => {
      let input = 'Paracetamol takes up to an hour to work.';
      let output = 'Tylenol takes up to an hour to work.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#13
    test('Translate: First, caramelise the onions.', done => {
      let input = 'First, caramelise the onions.';
      let output = 'First, caramelize the onions.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#14
    test('Translate: I spent the bank holiday at the funfair.', done => {
      let input = 'I spent the bank holiday at the funfair.';
      let output = 'I spent the public holiday at the carnival.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#15
    test('Translate: I had a bicky then went to the chippy.', done => {
      let input = 'I had a bicky then went to the chippy.';
      let output = 'I had a cookie then went to the fish-and-chip shop.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#16
    test("Translate: I've just got bits and bobs in my bum bag.", done => {
      let input = "I've just got bits and bobs in my bum bag.";
      let output = "I've just got odds and ends in my fanny pack.";
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#17
    test('Translate: The car boot sale at Boxted Airfield was called off.', done => {
      let input = 'The car boot sale at Boxted Airfield was called off.';
      let output = 'The swap meet at Boxted Airfield was called off.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#18
    test('Translate: Have you met Mrs Kalyani?', done => {
      let input = 'Have you met Mrs Kalyani?';
      let output = 'Have you met Mrs. Kalyani?';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#19
    test("Translate: Prof Joyner of King's College, London.", done => {
      let input = "Prof Joyner of King's College, London.";
      let output = "Prof. Joyner of King's College, London.";
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //#20
    test('Translate: Tea time is usually around 4 or 4.30.', done => {
      let input = 'Tea time is usually around 4 or 4.30.';
      let output = 'Tea time is usually around 4 or 4:30.';
      let translation = translator.translateOnly(input, 'british-to-american');
      
      assert.equal(translation, output);
      done();
    })
    //*/
  })
  suite('Highlight translation', () => {
    //#21
    test('Highlight: Mangoes are my favorite fruit.', done => {
      let input = 'Mangoes are my favorite fruit.';
      let output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      let translation = translator.translateText(input, 'american-to-british');

      assert.equal(translation, output);
      done();
    })
    //#22
    test('Highlight: I ate yogurt for breakfast.', done => {
      let input = 'I ate yogurt for breakfast.';
      let output = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
      let translation = translator.translateText(input, 'american-to-british');

      assert.equal(translation, output);
      done();
    })
    //#23
    test('Highlight: We watched the footie match for a while.', done => {
      let input = 'We watched the footie match for a while.';
      let output = 'We watched the <span class="highlight">soccer</span> match for a while.';
      let translation = translator.translateText(input, 'british-to-american');

      assert.equal(translation, output);
      done();
    })
    //#24
    test('Highlight: Paracetamol takes up to an hour to work.', done => {
      let input = 'Paracetamol takes up to an hour to work.';
      let output = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
      let translation = translator.translateText(input, 'british-to-american');

      assert.equal(translation, output);
      done();
    })
  })
});
