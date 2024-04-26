const { Game } = require('./types');

/**
 * @type {Game}
 */
const testGame = {
    "id": "test",
    "categories": [
        {
            "key": 0,
            "category": "Chris's housemates",
            "words": ["Josh", "Pandy", "Candy", "Vaishak"]
        },
        {
            "key": 1,
            "category": "Mexican food",
            "words": ["Chilaquiles", "Burrito", "Taco", "Fajitas"]
        },
        {
            "key": 2,
            "category": "Chris's plants",
            "words": ["Aloe", "Snake", "Jade", "Basil"]
        },
        {
            "key": 3,
            "category": "Chris's Shoes",
            "words": ["All Stars", "530", "993", "Air Force"]
        }
    ]
}

export function getTestGame() {
    return testGame;
}

function getTestWords() {
    return testGame.categories.map(category => category.words).flat();
}

/**
 * Returns the test words shuffled
 * @returns {String[16]} words
 */
export function getShuffledTestWords() {
    const words = getTestWords();
    return words.sort(() => Math.random() - 0.5);
}

export function getTestCategories() {
    return testGame.categories.map(category => category.category).flat();
}

/**
 * Returns the words of a specified category
 * @param {String} category 
 * @returns {String[4]} words
 */
export function getTestCategoriesWords(category) {
    return testGame.categories.find(cat => cat.category === category).words;
}

/**
 * Validates a user's guess
 * @param {String[4]} guess 
 * @returns {String} the category of the guess if it is correct, otherwise null
 */
export function checkTestGuess(guess) {
    if (guess.length !== 4) {
        console.log("Invalid guess length");
        return false;
    }
    const sortedGuess = guess.slice().sort();
    for (let cat of testGame.categories) {
        let words = cat.words;
        if (sortedGuess.join('') === words.join('')) {
            return cat.category;
        }
    }
    return null;
}