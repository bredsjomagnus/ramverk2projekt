/**
 * A module for player.
 *
 * @module
 */
"use strict";

class Player {
    /**
     * @constructor
     *
     * @param {string} nickname - players unique nickname.
     */
    constructor(nickname) {
        this.uniquenickname = nickname;
    }

    /**
     * Get a card to display based on the id of the card.
     *
     * @returns {string} players unique nickname
     */
    getNickname() {
        return this.uniquenickname;
    }

    /**
     * Get a card to display based on the id of the card.
     *
     * @returns {string} players unique nickname
     */
    setNickname(nickname) {
        return this.uniquenickname = nickname;
    }
}

// Export module
module.exports = Player;
