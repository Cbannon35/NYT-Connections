/**
 * @typedef {Object} ClientGame - The game object that the client manipulates
 * @property {String} id - The id of the game, typically the date in YYYY-MM-DD format
 * @property {Boolean} solved - Whether the game has been solved
 * @property {String[]} words - The words in the game
 * @property {String[]} categories - The categories of the words the user finds
 * @property {String[][]} guesses - The guesses made by the user
 * @property {String[]} currentGuess - The current guess the user is making
 * @property {Number} mistakes - The number of mistakes the user has made
 */

/**
 * @typedef {Object} Category - A category of words
 * @property {Number} key - The key of the category
 * @property {String} category - The name of the category
 * @property {String[]} words - The words in the category
 */

/**
 * @typedef {Object} Game - The game object that is the source of truth. Lives on the server
 * @property {String} id - The id of the game, typically the date in YYYY-MM-DD format
 * @property {Category[]} categories - The words in the game
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

module.exports = {
    ClientGame,
    Category,
    Game,
}