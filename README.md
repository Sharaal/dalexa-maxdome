[![Dependency Status](https://david-dm.org/dragonprojects/dalexa-maxdome.svg)](https://david-dm.org/dragonprojects/dalexa-maxdome)
[![devDependency Status](https://david-dm.org/dragonprojects/dalexa-maxdome/dev-status.svg)](https://david-dm.org/dragonprojects/dalexa-maxdome?type=dev)

# Features

## Implemented

* Flash Briefing Skill API
  * Aktueller Tipp des Tages im JSON Format
* Request/Response: 
  * "Alexa, frag maxdome was es Neues gibt"
  * "Alexa, frag maxdome nach dem Tipp des Tages"
* Slots: 
  * "Alexa, frag maxdome was es Neues an {genre} gibt"
* Session, nach einem anderen Skill wartet Alexa auf:
  * "Beschreibung" Gibt die Beschreibung des letzten Assets aus
  * "Danke" Beendet die Session
* Pagination, nach einem anderen Skill wartet Alexa auf:
  * "Weiter" Ruft den letzten Intent nochmal für ein weiteres Asset auf

## Roadmap

* Sessions vereinfachen:
  * Absplittung von Intents die nur auf Reaktion eines anderen aufgerufen werden können => Actions
  * dalexa setzt den Namen des zuletzt genutzten Intents in die Session wenn sie nicht beendet ist
* LinkAccount
* Smart Home Skill API

## Known Questions

* Links in Cards? Wenn ja, dann den Asset link immer dazu
