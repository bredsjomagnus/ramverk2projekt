**BUILD STATUS**

*Travis*: [![Build Status](https://travis-ci.org/bredsjomagnus/ramverk2projekt.svg?branch=master)](https://travis-ci.org/bredsjomagnus/ramverk2projekt), *Scrutinizer*: [![Build Status](https://scrutinizer-ci.com/g/bredsjomagnus/ramverk2projekt/badges/build.png?b=master)](https://scrutinizer-ci.com/g/bredsjomagnus/ramverk2projekt/build-status/master)


**CODE COVERAGE**

*Scrutinizer*: [![Code Coverage](https://scrutinizer-ci.com/g/bredsjomagnus/ramverk2projekt/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/bredsjomagnus/ramverk2projekt/?branch=master), *Coveralls*: [![Coverage Status](https://coveralls.io/repos/github/bredsjomagnus/ramverk2projekt/badge.svg?branch=master)](https://coveralls.io/github/bredsjomagnus/ramverk2projekt?branch=master), *Codecov*: [![codecov](https://codecov.io/gh/bredsjomagnus/ramverk2projekt/branch/master/graph/badge.svg)](https://codecov.io/gh/bredsjomagnus/ramverk2projekt)

<!-- *Codeclimate*: [![Test Coverage](https://api.codeclimate.com/v1/badges/fe43330227738fcde371/test_coverage)](https://codeclimate.com/github/bredsjomagnus/ramverk2projekt/test_coverage) -->

**CODE QUALITY**

*Scrutinizer*: [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/bredsjomagnus/ramverk2projekt/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/bredsjomagnus/ramverk2projekt/?branch=master), *Codeclimate*: [![Maintainability](https://api.codeclimate.com/v1/badges/fe43330227738fcde371/maintainability)](https://codeclimate.com/github/bredsjomagnus/ramverk2projekt/maintainability), *Codeacy*: [![Codacy Badge](https://api.codacy.com/project/badge/Grade/59e45be9ec944a0b8b08992f61086b85)](https://www.codacy.com/app/bredsjomagnus/ramverk2projekt?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bredsjomagnus/ramverk2projekt&amp;utm_campaign=Badge_Grade)

# Projekt - ramverk2
För utbildning, PA1442 H17 Lp2 Webbaserade ramverk 2 (distans) BTH.
Ett demo för repot finns [här](http://82.102.5.98:8002/). Demot kör via docker.

## Kravbild
Applikationen är ett memoryspel som kan köras över nätet med totalt 9 spelare. Det krävs att man har ett konto och att man loggat in för att kunna koppla upp sig mot spelet. Det finns även en chat som kan användas före och under ett uppstartats spel.

* Memoryspel över nätet
* 9 spelare
* Konto och inloggning

Vad som inte finns med är möjligheten att starta upp flera olika spel parallellt via en spellobby. Man kan heller inte välja olika typer av memorykort/teman, eller vilken färg man skall ha som spelare.

## Uppstart
Man kan starta upp sidan med `npm start` och om man sitter i windowsmiljö är det bättre att använda `./restart.bat` för att forcera avslutande av pågående processer, för att det inte skall krocka.

Med `npm run start-docker` körs `docker-compose up -d express` som bygger på imagen `node-alpine`.

På samma sätt kan man avsluta med `npm run stop docker` som då kör `docker-compose down` och stänger ner alla docker containers.

## Tester
För tester används *Mocha* tillsammans med *Istanbul*.

De delar som täcks av testerna är modulerna för Memoryspelet. Övriga delar är otestade.

Det är verkligen olika svårt att få till testerna och testerna mot applikationens moduler var det absolut viktigaste och också relativt görabart. Sen kan även tester mot databas gjorts men det är mycket mer krävande för liten nytta. Så det faller bort när man skall väga för och emot.

Man kan utföra tester mot tre olika docker images; node 6_alpine, node 7_alpine och node latest.

##### npm
* `npm run test` - för enhetstest
* `npm run docker-test` - för linter och test mot node 6_alpine
* `npm run docker-test1` - för linter och test mot node 7_alpine
* `npm run docker-test2` - för linter och test mot node latest

##### make

* `make test` - linter plus enhetstest
* `make test1` - för linter och test mot node 6_alpine
* `make test2` - för linter och test mot node 7_alpine
* `make test3` - för linter och test mot node latest

För kodtäckningen i webbläsare se `coverage/index.html`.

## CI-kedja
De tjänster som används är *Travis*, *Scrutinizer*, *Coveralls*, *Codeclimate*, *Codeacy* och *Codecov*. Där *Codecov* och *Coveralls* körs via *Travis* om testerna går igenom.

Det ger två olika tjänster för byggstatus, tre för kodtäckning och tre för kodkvalité. Vilket fångar in koden på att bra och heltäckande sätt.

Skulle bara en av ovanstående väljas hade det varit *Scrutinizer* som bara i sig självt täcker in alla tre delarna.

Det som är lite begränande med nuvarande val är att *Travis* inte klarar av nya ES6 koden. Därmed måste eslint begränsas för att få igenom testet och vilket annars ger vidare konsekvenser för *Codecov* och *Coveralls*. Finns säkert lösning på detta. Men ingen jag har hittat så här långt.

Med CI och dess badges får man själv och andra snabbt en överblick över hur koden och applikationen mår. Det blir lite av ett kvitto.



## Tekniker
Följande tekniker har använts för redovisningssidan.

* Server - Express
* Vy - Pug
* Tester - Mocha
* Databas - MongoDB



### Miljövariabler
DBWEBB_PORT används för att ange vilken port som kopplas upp mot. Är variablen inte satt används port 1337 som default.

DBWEBB_DSN sätts till mongo som körs i docker kontainer. Annars används dsn mot [mlab](https://mlab.com/) som default.
