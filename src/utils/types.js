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


module.exports = {
    ClientGame,
    Category,
    Game,
}