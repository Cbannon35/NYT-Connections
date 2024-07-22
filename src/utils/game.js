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
 * @property {int} level - The color of the category: 0-3
 * @property {string} group - The name of the category
 * @property {string[]} words - The words in the category
 */

/**
 * The game object that the client manipulates
 * @class 
 * @property {string} id - The id of the game, typically the date in YYYY-MM-DD format
 * @property {boolean} solved - Whether the game has been solved
 * @property {boolean} lost - Whether the game has been lost
 * @property {string[]} words - The words in the game
 * @property {Category[]} categories - The categories of the words the user finds
 * @property {string[][]} guesses - The guesses made by the user
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
        this.currentGuess = [];
        this.mistakes = 0;
    }
}