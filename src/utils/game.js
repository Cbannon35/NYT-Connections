/**
 * The game object that the client manipulates
 * @class 
 * @property {String} id - The id of the game, typically the date in YYYY-MM-DD format
 * @property {Boolean} solved - Whether the game has been solved
 * @property {Boolean} lost - Whether the game has been lost
 * @property {String[]} words - The words in the game
 * @property {String[]} categories - The categories of the words the user finds
 * @property {String[][]} guesses - The guesses made by the user
 * @property {String[]} currentGuess - The current guess the user is making
 * @property {Number} mistakes - The number of mistakes the user has made
 */

export class ClientGame {

    /**
     * Creates an new instance of a client-side game.
     * @param {string} id - The id of the game, typically the date in YYYY-MM-DD format
     * @param {String[]} words - The words in the game
     * @constructor
     */
    constructor(id, words) {
        this.id = id;
        this.solved = false;
        this.lost = false;
        this.words = words;
        this.categories = [];
        this.guesses = [];
        this.currentGuess = [];
        this.mistakes = 0;
    }

    /**
     * Shuffles the words in the game
     * @method
     */
    shuffle() {
        this.words = this.words.sort(() => Math.random() - 0.5);
    }
}

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

class Game {
    /**
     * Creates an new instance of a game.
     * @param {string} id - The id of the game, typically the date in YYYY-MM-DD format
     * @param {Category[]} categories - The words in the game
     * @constructor
     */
    constructor(id, categories) {
        this.id = id;
        this.categories = categories;
    }
}

/** @type {Category[]} */
const testCategories = [
    {
        "key": 0,
        "category": "Chris's housemates",
        "words": ['Candy', 'Josh', 'Pandy', 'Vaishak']
    },
    {
        "key": 1,
        "category": "Mexican food",
        "words": ['Burrito', 'Chilaquiles', 'Fajitas', 'Taco']
    },
    {
        "key": 2,
        "category": "Chris's plants",
        "words": ['Aloe', 'Basil', 'Jade', 'Snake']
    },
    {
        "key": 3,
        "category": "Chris's Shoes",
        "words": ['530', '993', 'Air Force', 'All Stars']
    }
]
export const testGame = new Game("test", testCategories);

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
    console.log("Sorted guess: ", sortedGuess);
    for (let cat of testGame.categories) {
        console.log("Checking category: ", cat.category);
        let words = cat.words;
        console.log("Words: ", words);
        if (sortedGuess.join('') === words.join('')) {
            return cat.category;
        }
    }
    return null;
}