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

#### Tekniker
*Express* har använts för servern och *pug* för vyn. Det var vad som kom från start (express generatorn) och jag har inte sett någon anledning att byta. Det fungerar smidigt och bra och är utan vidare tekniker som klarar bygga denna applikation. Det har inte varit motivation nog att lägga tid på ny teknik när så inte behövts. Framför allt när tiden är en faktor. Man bör självfallet vara medveten om sin alternativ. Speciellt då den dagen kommer när applikationen springer ifrån tekniken och ett byte måste till. Men så har, som sagt, inte varit fallet för detta projekt.

## Uppstart
Man kan starta upp sidan med `npm start` och om man sitter i windowsmiljö är det bättre att använda `./restart.bat` för att forcera avslutande av pågående processer, för att det inte skall krocka.

Med `npm run start-docker` körs `docker-compose up -d express` som bygger på imagen `node-alpine`.

På samma sätt kan man avsluta med `npm run stop docker` som då kör `docker-compose down` och stänger ner alla docker containers.

#### Miljövariabler
DBWEBB_PORT används för att ange vilken port som kopplas upp mot. Är variablen inte satt används port 8002 som default.

DBWEBB_DSN sätts till mongo som körs i docker kontainer. Annars används dsn mot [mlab](https://mlab.com/) som default.

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

Med byggstatus som är grön, kodtäckning på ca 80%, kodkvalité på 9,64 eller mellan A-C bör jag vara rätt så nöjd. Visst kan det bli bättre. Men det är viktigt att väga för och emot i jakten på 100% kodtäckning. Det är inte alltid värt det.


## Realtid
Det som går under *realtid* i applikationen är dels chatfunktionen, men framför allt spelfunktionen med flera spelare där varje spelare tilldelas en färg och får en av slumpen tilldelad startspelare.

Man kan skicka meddelnaden till varandra före och under ett pågående spel. Under själva spelet skickas information fram och tillbaka vilka drag som görs och hur spelbrädet ändras som en konsekvens av det. På så vis kan upp till 9 spelare köra ett parti Memory över nätet.

#### Teknik
Det som används är *Websocket* och för att kunna skilja de olika meddelandena åt används JSON för att få med en header (type) och body (content). Det är väldigt grundläggande tekniker men fungerar förvånansvärt väl för uppgiften.

Funderade först på att använda *SocketIO* men då det inte fanns behov för ny teknik till denna applikation var det helt omotiverat att lägga tiden på det. Men jag kan tänka mig att man skulle få mer nytta av att gå över till *SocketIO* om man vill lägga till spellobby och får flera spel parallellt. *SocketIO* verkar ha bra funktioner för bland annat detta. Så för vidare utbyggnad står man nog även inför ett teknikbyte.

## Databas
För att kunna spela ett parti Memory måste man logga in. Det är här databasen kommer in. Man kan skapa ett konto med unikt användarnamn och allting sparas som ett dokument i en MongoDB.

För ändamålet fungerar MongoDB utmärkt. Sen skulle det egentligen ha fungerat precis lika bra med en SQL-databas. Men det är trevligt att använda annat ibland, bara för sakens skull.

Tror mig kunna se like olika användningsområden för när man skall använda non-SQL och SQL. Med tanke på den säkerhet, stabilitet och en kodstandard som kommer med SQL är den klart intressantast i större projekt och projekt som kräver hög säkerhet/stabilitet. Likaså då man inte har behov av annat än databas i tabellformat. Då finns ingen anledning att välja något annat. Jag har kommit att gilla non-SQL och möjligheten att spara hela JSON-filer, med allt vad det innebär.

## NPM-modul
Som en del av applikationen används min egen npm-modul [memorytest](https://www.npmjs.com/package/memorytest).

*Memorytest* är memoryspelets hjärta och innehåller spelkorten (memorycards), spelbrädet (gameboard) och spelets hjärna (gamebrain). Det är gamebrain som har koll på reglerna och dirigerar spelet framåt efter varje nytt drag - exemplevis vilka som spelar, vems tur det är och vad som kommer hända härnäst. Gameboard uppdateras efter varje nytt drag och skickas ut till spelarna. Memorycards har ordning på korten och kan blanda annat placera korten på brädet, se ifall två kort är ett par, svara på vilket värde ett viss kort har.

Npm är en väldigt smidig packethanterare och framför allt snabb i jämförelse mot phps packagist. Dessutom gör npms popularitet att man lätt kan få spritt sina moduler där samt att man med stor säkerhet kan finna vad man söker där.
