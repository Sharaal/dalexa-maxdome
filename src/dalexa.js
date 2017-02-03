class Session {
  constructor({ application, attributes, sessionId, user }) {
    this.application = application;
    this.attributes = attributes || {};
    this.shouldEndSession = true;
    this.sessionId = sessionId;
    this.user = user;
  }

  keep() {
    this.shouldEndSession = false;
    return this;
  }

  set(key, value) {
    this.attributes[key] = value;
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
    if (slots) {
      Object.keys(slots).forEach((key) => {
        this.slots[key] = slots[key].value;
      });
    }
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
    this.actionHandlers = {};
    this.intentHandlers = {};
    this.launchHandler = null;
    this.sessionEndedHandler = null;
  }

  onAction(name, handler) {
    this.actionHandlers[name] = handler;
    return this;
  }

  onActions(actions) {
    actions.forEach(([name, handler]) => {
      this.onAction(name, handler);
    });
    return this;
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
    return async (req, res) => {
      const json = req.body;
      const context = new Context(json.context);
      const request = new Request(json.request);
      const session = new Session(json.session);
      const typeHandlers = {
        LaunchRequest: () => this.launchHandler,
        IntentRequest: () => {
          const name = request.intent.name;
          let lastIntent = session.get('lastIntent');
          if (lastIntent && this.actionHandlers[name]) {
            return this.actionHandlers[name](this.intentHandlers[lastIntent]);
          }
          if (!this.intentHandlers[name]) {
            throw new Error(`unknown request intent name "${name}"`);
          }
          session.set('lastIntent', name);
          return this.intentHandlers[name];
        },
        SessionEndedRequest: () => this.sessionEndedHandler,
      };
      if (!typeHandlers[request.type]) {
        throw new Error(`unknown request type "${request.type}"`);
      }
      const response = new Response();
      try {
        let handler = typeHandlers[request.type]();
        while (handler) {
          handler = await handler({ context, request, response, session });
        }
      } catch (e) {
        console.log(e);
      }
      response.shouldEndSession = session.shouldEndSession;
      let sessionAttributes;
      if (!session.shouldEndSession) {
        sessionAttributes = session.attributes;
      }
      res.send({ response, sessionAttributes, version: '1.0' });
    };
  }
}

module.exports.Skill = Skill;
