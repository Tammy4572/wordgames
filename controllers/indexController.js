const express = require('express');
const router = express.Router();
const dictionary = require('../models/dictionary');

router.get('/', (request, response) => {
    if (request.session.isCurrent != true) {
        response.render('index');
    } else {
        var model = request.session;
        response.render('game', model);
    }
});


router.post('/', (request, response) => {
    console.log(request.body.difficulty);
    if (request.body.difficulty === '0') {
        console.log('easy');
        request.session.word = dictionary.easy[Math.floor(Math.random() * (dictionary.easy.length))];
    } else if(request.body.difficulty === '1') {
        console.log('normal');
        request.session.word = dictionary.normal[Math.floor(Math.random() * (dictionary.normal.length))];
    } else if (request.body.difficulty === '2') {
        console.log('difficult');
        request.session.word = dictionary.normal[Math.floor(Math.random() * (dictionary.hard.length))];
    }
    request.session.display = [];
    for (var i = 0; i < request.session.word.length; i++) {
        request.session.display.push('_');
    }
    request.session.wrongGuess = 8;
    request.session.allGuesses = [];
    request.session.numCorrectLetters = 0;
    console.log(request.session.word);
    var model = request.session;
    response.render('game', model);
});

module.exports = router;