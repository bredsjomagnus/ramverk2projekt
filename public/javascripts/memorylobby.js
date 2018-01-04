(function () {
    let websocket;
    let roomname     = document.getElementById("roomname");
    let newroom     = document.getElementById("newroom");
    let nickname    = document.getElementById('nickname');
    let clientlist  = document.getElementById("clientarea");
    let output      = document.getElementById("msgarea");
    let sendmessage = document.getElementById("messagebtn");
    let startgame   = document.getElementById("startgame");
    let nextturnbtn = document.getElementById("nextturnbtn");
    let clientmessage = document.getElementById("message");
    let close       = document.getElementById("disconnectbtn");
    var player;

    player = {
        nickname: 'anon',
        colorclass: 'blackplayer'
    };

    /**
    * Check nickname inputfield. If empty disable connectionbtn.
    */
    function doCheck() {
        var newroomvalue = document.getElementById('roomname').value;

        if (newroomvalue === '') {
            document.getElementById("newroom").disabled = true;
        } else {
            document.getElementById("newroom").disabled = false;
        }
    }

    // Checking nickname inputfield when keyup or when focusout
    $('#roomname').keyup(doCheck).focusout(doCheck);

    /**
    * What to do when user clicks Connect
    */
    newroom.addEventListener("click", function() {
        // console.log("Connecting to ws://localhost:8002/.");
        // websocket = new WebSocket('ws://localhost:8002/');
        console.log("Connecting to ws://82.102.5.98:8002/.");
        websocket = new WebSocket('ws://82.102.5.98:8002/');
        websocket.onopen = function() {
            console.log("The websocket is now open.");
            var msg, gameroomname;

            gameroomname = document.getElementById('roomname').value;

            msg = {
                type: 'newroom',
                content: gameroomname,
                nickname: nickname.value
            };
            websocket.send(JSON.stringify(msg));
            window.location.replace("/memory/startmemory?nickname="+nickname.value+"&gameroom="+gameroomname);
        };

        websocket.onmessage = function(event) {
            console.log("Receiving message: " + event.data);
            var jsonmsg;

            jsonmsg = JSON.parse(event.data);
            if (jsonmsg.type === "gamerooms") {
                var gamerooms = [];

                gamerooms = jsonmsg.content;
            } else if (jsonmsg.type === "gotogameroom") {
                // window.location.replace("/memory/startmemory");
            }
        };

        websocket.onclose = function() {
            console.log("The websocket is now closed.");
        };
    }, false);

    /**
     * What to do when user clicks to send a message.
     */
    // refresh.addEventListener("click", function(/*event*/) {
    //     let messagetext = clientmessage.value;
    //     var msg;
    //
    //     if (!websocket || websocket.readyState === 3) {
    //         console.log("The websocket is not connected to a server.");
    //     } else {
    //         msg = {
    //             type: "clientmsg",
    //             nick: player.nickname,
    //             content: messagetext
    //         };
    //         websocket.send(JSON.stringify(msg));
    //         console.log("Sending message: " + messagetext);
    //         clientmessage.value = "";
    //     }
    // });

    /**
     * What to do when starting a game and setting the table
     */
    // startgame.addEventListener("click", function(/*event*/) {
    //     var msg;
    //
    //     if (!websocket || websocket.readyState === 3) {
    //         console.log("The websocket is not connected to a server.");
    //     } else {
    //         msg = {
    //             type: "startgame"
    //         };
    //         websocket.send(JSON.stringify(msg));
    //         console.log("Starting up a new game");
    //         $("#startgame").hide();
    //     }
    // });
    //
    // nextturnbtn.addEventListener("click", function(/*event*/) {
    //     var msg;
    //
    //     if (!websocket || websocket.readyState === 3) {
    //         console.log("The websocket is not connected to a server.");
    //     } else {
    //         msg = {
    //             type: "flip"
    //         };
    //         websocket.send(JSON.stringify(msg));
    //         console.log("reset gameboard");
    //         $("#nextturnbtn").hide();
    //     }
    // });
    //
    //
    //
    // /**
    //  * What to do when user clicks Close connection.
    //  */
    // close.addEventListener("click", function(/*event*/) {
    //     console.log("Closing websocket for %s.", player.nickname);
    //     var msg;
    //
    //     msg = {
    //         type: 'deleteuser',
    //         content: player.nickname
    //     };
    //     websocket.send(JSON.stringify(msg));
    //     clientlist.innerHTML = "";
    //     output.innerHTML = "";
    //     websocket.close();
    // });
})();
