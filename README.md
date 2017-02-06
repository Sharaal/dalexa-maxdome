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
  * "Weiter" Ruft den letzten Intent nochmal für ein Asset weiter auf
  * "Zurück" Ruft den letzten Intent nochmal für ein Asset zurück auf
* UserID benutzen um Benutzerspezifische Daten über Sessions hinweg zu speichern:
  * "Alexa, sag maxdome mich interessiert nur der {area} Bereich"
  * "Alexa, sag maxdome mich interessieren alle Bereiche"

## Roadmap

* LinkAccount
* Smart Home Skill API

## Known Questions
