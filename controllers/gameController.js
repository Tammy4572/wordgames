const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');

let chosenWord = '';
let allGuessess = [];
let wrongGuesses = 8;

router.get('/game', (request, response) => {
    if (request.session.isCurrent) {
        var model = request.session;
        response.render('game', model);
    } else {
        response.redirect('/');
    }
});

router.use(expressValidator({
    customValidators: {
        alreadyGuesses: function (guess, allGuessess) {
            return (allGuessess.indexOf(guess.toLowerCase()) === -1);
        }
    }
}));

router.post('/game', (request, response) => {
    request.session.isCurrent = false;
    var model = request.session;
    var guess = request.body.guess.toLowerCase();
    chosenWord = model.chosenWord;
    request.checkBody('guess', 'Only guess one letter at a time').len(1, 1);
    model.error = request.validationErrors();
    if(!model.error) {
        if(chosenWord.indexOf(guess) != -1){
            model.allGuessess.push(guess);
            for (var i = 0; i < chosenWord.length; i++) {
                if (model.chosenWord[i] === guess) {
                    model.displayWord.splic(i, 1, guess);
                    model.numCorrectLetters++;
                }
            }
            if ((model.numCorrectLetters) === chosenWord.length) {
                request.session.isCurrent = false;
                response.redirect('game-won');
                return;
            }
        } else {
            model.allGuessess.push(guess);
            model.wrongGuesses--;
            if(model.wrongGuesses <= 0) {
                request.session.isCurrent = false;
                response.redirect('game-lost');
                return;
            }
        }
    }
    response.render('game', model);
});

module.exports = router;