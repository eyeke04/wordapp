var firebase = require("firebase");
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_5ztecbu_pVMx3sfklWFpKBbWb4Wypw0",
    authDomain: "gospoteric-wordbox-23.firebaseapp.com",
    serviceAccount: "./model/sa.json",
    databaseURL: "https://gospoteric-wordbox-23.firebaseio.com",
    storageBucket: "gospoteric-wordbox-23.appspot.com",
  };

firebase.initializeApp(config);
var rootRef = firebase.database();
//adds .ref() to the rootref when called from the routes
/*
//storage
var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child('images');

//the child of each of the refs below is the id of the entity in the database
var churchImages = imagesRef.child('church');
var speakerImages = imagesRef.child('speakers');
var catImages = imagesRef.child('cat');
var seriesImages = imagesRef.child('series');
var plansImages = imagesRef.child('plans');
var messageImages = imagesRef.child('messages');

var audioRef = storageRef.child('messages');	//the child ref is the id of the message in the database
*/

module.exports = rootRef;