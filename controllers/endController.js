const express = require('express');
const router = express.Router();
const jsonFile = require('jsonfile');
const fs = require('file-system');
const winnerList = require('../models/winners.json');
const filepath = '../models/winners.json';

router.get('/game-won', (request, response) => {
    if (request.session.isCurrent != true) {
        var model = request.session;
        response.render('game-won', model);
    } else {
        response.redirect('/');
    }
});

router.post('/winners', (request, response) => {
    response.render('winners', {winnerList: winnerList});
});

router.post('/winners', (request, response) => {
    if (request.session.isCurrent != true) {
        var newWinner = { name: request.body.winner, guesses: request.session.wrongGuesses, word: request.session.chosenWord};
        if(winnerList.length === 0) {
            winnerList.push(newWinner);
        } else {
            for (var i = 0; i < winnerList.length; i++) {
                if (newWinner.guesses > winnerList[i].guesses || (newWinner.guesses === winnerList[i].guesses && newWinner[i].word < winnerList[i].word)) {
                    index = i;
                    break;
                } else {
                    index = i + 1;
                }
            }
            winnerList.splice(index, 0, newWinner);
        }
        var winJSON = JSON.stringify(winnerList);
        fs.writeFile(filepath, winJSON, function (err) { });
        response.render('winners', { winnerList: winnerList });
    } else {
        response.redirect('/');
    }
})

router.get('/game-lost', (request, response) => {
    if (request.session.isCurrent != true) {
        var model = request.session;
        response.render('game-lost', model);
    } else {
        response.redirect('/');
    }
})

module.exports = router;