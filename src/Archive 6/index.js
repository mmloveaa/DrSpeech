/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Speech = require('./lib/speech');
var syl = require('./lib/syllables');
var Vocabulary = require('./lib/vocabulary');

var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var vocabulary = new Vocabulary();

/**
 * DrSpeech is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var DrSpeech = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
DrSpeech.prototype = Object.create(AlexaSkill.prototype);
DrSpeech.prototype.constructor = DrSpeech;

DrSpeech.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("DrSpeech onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

DrSpeech.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    // session.attributes.word = vocabulary.getRandomWord();
    var speech = new Speech();
    speech.say("Welcome to Doctor Speech. Let's Begin Your Lesson.");
    // speech.say("When you give an answer, start with saying its.");
    speech.pause("1s");
    // speech.say("How do you say?");
    speech.say("Are you ready?");
    var reprompt = "Are you ready for the lesson?";

    // speech.say(session.attributes.word);
    // response.ask(speech.toObject(), "How do you say " + session.attributes.word);
    response.ask(speech.toObject(), reprompt);
};

DrSpeech.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("DrSpeech onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

DrSpeech.prototype.intentHandlers = {
    // register custom intent handlers
    "CategoryIntent": function (intent, session, response) {
        // response.tell("Category WOW WOW WOW");

        var speech = new Speech();
        var givenCategory = intent.slots.Category.value;
        var theRandomWord = vocabulary.getRandomWord(givenCategory);
        session.attributes.saveWord = theRandomWord;
        // need to save session attribute saveWord here because this is where theRandomWord was generated

        if (givenCategory === "verb" || givenCategory ==="noun" || givenCategory ==="adjective") {
            speech.say("Great");
            speech.pause("1s");
            speech.say("You want to practice on " + givenCategory);
            speech.pause("1s");
            speech.say("How do you say " + theRandomWord + "?");
        } else {
            speech.say("Please choose the category again. You can choose noun, verb or adjective");
        }

        var reprompt = "How do you say " + theRandomWord + "?";

        response.ask(speech.toObject(), reprompt);
    },

    "AnswerIntent": function (intent, session, response) {
        var speech = new Speech();
        var word = intent.slots.Word.value;

        if (word === session.attributes.saveWord) {
            speech.say("You said it correctly.");
            speech.pause("1s");
            speech.say("It is");
            speech.say(word);
        } else {
            speech.say("That was not correct. I heard ");
            speech.pause("1s");
            speech.say(word);
            speech.pause('1s');
            speech.say("which is spelled as");
            speech.pause("1s");
            speech.spellSlowly(word, "500ms");
            speech.pause("1s");
            speech.say("The correct way to pronounce it is");
            speech.pause("800ms");
            var syllables = syl(session.attributes.saveWord);
            syllables.syllables.forEach(function (part, index) {
                speech.pause("50ms");
                speech.say(part);
            });
        }
        response.tell(speech.toObject());
        // response.tell("Answer");
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("Try again and listen carefully", "You can do this!");
    },

    "AMAZON.YesIntent": function (intent, session, response) {
        // response.tell("Yes");
        var reprompt = "Please tell me what category of words you want to practice on? You can choose noun, verb or adjective.";
        response.ask("Please tell me what category of words you want to practice on? You can choose noun, verb or adjective.", reprompt);
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the DrSpeech skill.
    var helloWorld = new DrSpeech();
    helloWorld.execute(event, context);
};