/**
 * A module for Memory game rooms
 *
 * @module
 */
"use strict";

class Gameroom {
    /**
     * @constructor
     */
    constructor() {
        this.gamerooms = new Map();
    }

    /**
    * Lägger till websocket till spelrum. Skapar nytt
    * spelrum om det inte existerar eller lägger till
    * i befintligt om existerar.
    *
    * @param {string} gameroom - namnet på spelrummet
    * @param {object} ws - websocket objektet
    */
    addToGameroom(gameroom, ws) {
        if (this.gamerooms.has(gameroom)) {
            var wsarray;

            wsarray = this.gamerooms.get(gameroom);
            wsarray.push(ws);
            this.gamerooms.set(wsarray);
        } else {
            var wsarray = [];

            wsarray.push(ws);
            this.gamerooms.set(gameroom, wsarray);
        }
    }

    getGameroom() {
        return [...this.gamerooms.keys()];
    }

    getWebsockets(gameroom) {
        return this.gamerooms.get(gameroom);
    }
}

// Export module
module.exports = Gameroom;
