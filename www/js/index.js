/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    /* Public variables */
    watchID: null,
    context: null,
    dx: 4,
    dy:4,
    y:100,
    x:10,
    canvas_width: null,
    canvas_height: null,
    /* Start listening accelerometer sensor */
    startWatch: function() {
        // Update acceleration every 10ms
        var options = { frequency: 10 };
        app.watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    },
    /* If you want to implement stop button for acceleration sensor */
    stopWatch: function() {
        if (app.watchID) {
            navigator.accelerometer.clearWatch(app.watchID);
            app.watchID = null;
        }
    },
    /* Acceleration success callback */
    onSuccess: function(acceleration) {
        /* Call drawing method when new data is available and put results to public variables */
        app.dx = acceleration.x;
        app.dy = acceleration.y;
        app.draw();
        /* If you want to see accelerometer data put html element to index.html and id of this element should be accelerometer */
        /*var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';*/
    },
    /* Acceleration error callback */
    onError: function() {
        alert('onError!');
    },
    /* Initialize called after all is loaded (call is in the last line of this file) */
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    /* Device is ready - can start running your own code */
    onDeviceReady: function() {
        var options = {
            language: "fi-FI",
            matches: 1,
            prompt: "Sano \"aloita\"",      // Android only
            showPopup: true,  // Android only
            showPartial: false
        }
        window.plugins.speechRecognition.startListening(app.successCallback, app.errorCallback, options);
    },
    /* Speech success */
    successCallback: function(words) {
        for (var i = 0; i < words.length; i++) {
            console.log(words[i]);
            if (words[i].toLowerCase() == "aloita") {
                /* Calculate canvas to fill whole screen */
                /* -2 as border is 1px + 1px */
                app.canvas_width = window.innerWidth - 2;
                app.canvas_height = window.innerHeight - document.getElementById("speak_button").offsetHeight - 2;
                var canvas = document.getElementById("canvas");
                canvas.width = app.canvas_width;
                canvas.height = app.canvas_height;
                app.startWatch();
            }
        }
    },
    /* Speech error */
    errorCallback: function(e) {
        alert(e);
    },
    /* Speech recognition method called from html */
    tunnista_puhetta: function() {
        app.stopWatch();
        var options = {
            language: "fi-FI",
            matches: 1,
            prompt: "Sano \"aloita\"",      // Android only
            showPopup: true,  // Android only
            showPartial: false
        }
        window.plugins.speechRecognition.startListening(app.successCallback, app.errorCallback, options);
    },
    draw: function() {
        app.context = document.getElementById("canvas").getContext("2d");
        // Clear screen
        app.context.clearRect(0,0,app.canvas_width,app.canvas_height);
        // Draw ball and fill with color
        app.context.beginPath();
        app.context.fillStyle="#ff0000";
        app.context.arc(app.x,app.y,20,0, Math.PI*2, true);
        app.context.closePath();
        app.context.fill();
        // Make sure ball stays inside canvas
        if (app.x < 0)
            app.x = 0;
        if (app.x > app.canvas_width)
            app.x = app.canvas_width;
        if (app.y < 0)
            app.y = 0;
        if (app.y > app.canvas_height)
            app.y = app.canvas_height;
        // Move ball
        app.x += app.dx*(-1);
        app.y += app.dy;
    }
};

app.initialize();