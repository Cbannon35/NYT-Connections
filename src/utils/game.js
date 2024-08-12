export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const BACKGROUND_COLORS = {
    1: "#B3A8FE"
}

export const COLORS = {
    0: "#f9df6d",
    1: "#a0c35a",
    2: "#b0c4ef",
    3: "#ba81c5"
}

export const getColor = (level) => {
    return COLORS[level];
}

/**
 * @typedef {Object} Category
 * @property {number} level - The color of the category: 0-3
 * @property {string} group - The name of the category
 * @property {string[]} words - The words in the category
 */

/**
 * @typedef Hint
 * @type {object}
 * @property {string} hint - The hint content
 * @property {number} level - The level of the hint
 * @property {date} date - The time of hint creation
 */

/**
 * @typedef Result
 * @type {object}
 * @property {string} word - The word guessed
 * @property {number} level - The level of the word
 */

/**
 * The game object that the client manipulates
 * @class 
 * @property {string} id - The id of the game, typically the date in YYYY-MM-DD format
 * @property {boolean} solved - Whether the game has been solved
 * @property {boolean} lost - Whether the game has been lost
 * @property {string[]} words - The words in the game
 * @property {Category[]} categories - The categories of the words the user finds / revealed at the end of the game
 * @property {string[][]} guesses - The guesses made by the user
 * @property {Result[][]} results - The results of the guesses made by the user
 * @property {Hint[]} hints - The hints the user has received
 * @property {string[]} currentGuess - The current guess the user is making
 * @property {int} mistakes - The number of mistakes the user has made
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
        this.results = [];
        this.hints = [];
        this.currentGuess = [];
        this.mistakes = 0;
    }
}