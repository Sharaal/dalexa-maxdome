'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Session {
  constructor({ sessionId, application, attributes, user }) {
    this.sessionId = sessionId;
    this.application = application;
    this.attributes = attributes;
    this.newAttributes = null;
    this.user = user;
  }

  set(key, value) {
    this.newAttributes = this.newAttributes || {};
    this.newAttributes[key] = value;
    return this;
  }

  get(key) {
    return this.attributes[key];
  }
}

class Context {}

class Intent {
  constructor({ name, slots }) {
    this.name = name;
    this.slots = {};
    Object.keys(slots).forEach(key => {
      this.slots[key] = slots[key].value;
    });
  }

  get(key) {
    return this.slots[key];
  }
}

class Request {
  constructor({ error, intent, locale, reason, requestId, timestamp, type }) {
    this.error = error;
    this.locale = locale;
    this.reason = reason;
    this.requestId = requestId;
    this.timestamp = timestamp;
    this.type = type;
    if (intent) {
      this.intent = new Intent(intent);
    }
  }

  get(key) {
    if (this.intent) {
      return this.intent.get(key);
    }
    return null;
  }
}

class Response {
  construct() {
    this.shouldEndSession = true;
  }

  say(plainText) {
    this.outputSpeech = { type: 'PlainText', text: plainText };
    return this;
  }

  display({ title, text, image }) {
    this.card = { type: 'Standard', title, text, image };
    return this;
  }
}

class Skill {
  constructor() {
    this.intentHandlers = {};
    this.launchHandler = null;
    this.sessionEndedHandler = null;
  }

  onIntent(name, handler) {
    this.intentHandlers[name] = handler;
    return this;
  }

  onIntents(intents) {
    intents.forEach(([name, handler]) => {
      this.onIntent(name, handler);
    });
    return this;
  }

  onLaunch(handler) {
    this.launchHandler = handler;
    return this;
  }

  onSessionEnded(handler) {
    this.sessionEndedHandler = handler;
    return this;
  }

  getExpressHandler() {
    var _this = this;

    return (() => {
      var _ref = _asyncToGenerator(function* (req, res) {
        const json = req.body;
        console.log(json);
        const context = new Context(json.context);
        const request = new Request(json.request);
        const session = new Session(json.session);
        const typeHandlers = {
          LaunchRequest: function () {
            return _this.launchHandler;
          },
          IntentRequest: function () {
            const name = request.intent.name;
            if (!_this.intentHandlers[name]) {
              throw new Error(`unknown request intent name "${name}"`);
            }
            return _this.intentHandlers[name];
          },
          SessionEndedRequest: function () {
            return _this.sessionEndedHandler;
          }
        };
        if (!typeHandlers[request.type]) {
          throw new Error(`unknown request type "${request.type}"`);
        }
        const response = new Response();
        try {
          const handler = typeHandlers[request.type]();
          if (handler) {
            yield handler({ context, request, response, session });
          }
        } catch (e) {
          console.log(e);
        }
        let sessionAttributes;
        if (session.newAttributes) {
          response.shouldEndSession = false;
          sessionAttributes = session.newAttributes;
        }
        res.send({ response, sessionAttributes, version: '1.0' });
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })();
  }
}

module.exports.Skill = Skill;