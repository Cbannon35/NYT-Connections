import { create } from 'zustand';
import { getItem, addItem } from '../utils/indexedDB';
import { ClientGame } from './game'; // Make sure to import ClientGame

export const useGameStore = create((set) => ({
    game: new ClientGame("-1", []),
    loaded: false,
    error: false,
    hintError: false,

    setGame: async (game) => {
        await addItem(game.id, game);
        set({ game: game });
    },

    setNewGame: async (game) => {
        const shuffledWords = [...game.words].sort(() => Math.random() - 0.5);
        const newGame = {
            ...game,
            words: shuffledWords,
        };
        await addItem(newGame.id, newGame);
        set({ game: newGame, loaded: true, error: false });
    },


    updateHints: async (newHint) => {
        set((state) => {
            const updatedGame = { ...state.game, hints: [...state.game.hints, newHint] };
            addItem(updatedGame.id, updatedGame);
            return { game: updatedGame };
        });
    },

    loadGame: async (date) => {
        const savedGame = await getItem(date);
        if (savedGame !== undefined) {
            set({ game: savedGame.game, loaded: true, error: false });
            return true;
        } else {
            set({ error: 'Game not found' });
            return false;
        }
    },

    setLoaded: (loaded) => set({ loaded }),

    setError: (error) => set({ error }),

    setHintError: (hintError) => set({ hintError }),

    shuffleGame: async () => {
        set((state) => {
            const shuffledWords = [...state.game.words].sort(() => Math.random() - 0.5);
            const newGame = {
                ...state.game,
                words: shuffledWords,
            };
            addItem(newGame.id, newGame);
            return { game: newGame };
        });
    },

    deselctAll: async () => {
        set((state) => {
            const newGame = { ...state.game, currentGuess: [] };
            addItem(newGame.id, newGame);
            return { game: newGame };
        });
    },

    setResults: async (results) => {
        set((state) => {
            const updatedGame = { ...state.game, results };
            addItem(updatedGame.id, updatedGame);
            return { game: updatedGame };
        });
    },

    incorrectGuess: async (guess) => {
        set((state) => {
            state.game.guesses.push(guess);
            const newGame = { ...state.game, mistakes: state.game.mistakes + 1, lost: state.game.mistakes + 1 >= 3 };
            addItem(newGame.id, newGame);
            return { game: newGame };
        });
    },

    correctGuess: async (guess, data) => {
        set((state) => {
            // console.log("got data", data);
            state.game.guesses.push(guess);
            const newGame = { ...state.game, categories: [...state.game.categories, { level: data.level, group: data.group, words: guess }], currentGuess: [], words: [...state.game.words.filter(word => !state.game.currentGuess.includes(word))], solved: state.game.categories.length >= 3 };
            addItem(newGame.id, newGame);
            return { game: newGame };
        });
    },

    guessWord: async (word) => {
        set((state) => {
            if (state.game.currentGuess.includes(word)) {
                const newGame = { ...state.game, currentGuess: state.game.currentGuess.filter(w => w !== word) };
                addItem(newGame.id, newGame);
                return { game: newGame };
            }

            if (state.game.currentGuess.length >= 4) {
                return { game: state.game };
            }

            const newGame = { ...state.game, currentGuess: [...state.game.currentGuess, word] };
            addItem(newGame.id, newGame);
            return { game: newGame };
        });
    }
}));