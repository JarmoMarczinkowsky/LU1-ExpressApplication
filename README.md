<h1>Hoe werkt mijn server</h1>
<p>Mijn server bestaat uit een NodeJS runtime environment die Express als framework gebruikt om Javascript server side te renderen.
</br>Voor het genereren van dynamische HTML pagina's heb ik voor de EJS view engine gekozen. Ik heb deze gekozen, doordat het er op het eerste oogopslag vrij eenvoudig uitzag, vooral vergeleken met PUG. 
<br><br>Voor de database maak ik gebruik van een lichtelijk aangepaste versie van de Sakila database. Het enige verschil is dat er bij mij de staff.password kolom uit een LONGTEXT bestaat i.p.v. een VARCHAR(40).
Dit heb ik gedaan, doordat het salten en hashen van wachtwoorden anders niet zou passen in de kolom.
<br>
<br>Deze github repository is aangesloten op mijn Azure omgeving (https://sakila-app.azurewebsites.net/).
</p>
