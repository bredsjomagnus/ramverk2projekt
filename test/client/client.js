/**
* Test for client script
 */
// "use strict";
//
// var assert = require("assert");
// let websocket;
// // var expect = require('expect');
//
// /* global describe it */
//
// /**
//  * Testsuite
//  */
// describe("Check client", function() {
//     require('mocha').beforeEach(function(done) {
//         // Setup
//         websocket = new WebSocket('ws://localhost:8001/');
//         websocket.onopen = function() {
//             console.log("Opened...");
//             done();
//         };
//         websocket.onclose = function() {
//             console.log("Disconnected...");
//         };
//     });
//
//     require('mocha').afterEach(function(done) {
//         // Cleanup
//         if (websocket.readyState === WebSocket.OPEN) {
//             console.log('disconnecting...');
//             websocket.close();
//         } else {
//             // No connection unless you have done() in beforeEach, .on('connect'...)
//             console.log('no connection to break...');
//         }
//         done();
//     });
//
//     describe('First (hopefully useful) test', function() {
//         it('Doing something', function(done) {
//             assert.equal([1, 2, 3].indexOf(0), -1);
//             done();
//         });
//     });
// });
