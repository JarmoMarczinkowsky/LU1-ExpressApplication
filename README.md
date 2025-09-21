<h1>Hoe werkt mijn server</h1>
<p>Mijn server bestaat uit een NodeJS runtime environment die Express als framework gebruikt om Javascript server side te renderen.
</br>Voor het genereren van dynamische HTML pagina's heb ik voor de EJS view engine gekozen. Ik heb deze gekozen, doordat het er op het eerste oogopslag vrij eenvoudig uitzag, vooral vergeleken met PUG. 
<br><br>Voor de database maak ik gebruik van een lichtelijk aangepaste versie van de Sakila database. Het enige verschil is dat er bij mij de staff.password kolom uit een LONGTEXT bestaat i.p.v. een VARCHAR(40).
Dit heb ik gedaan, doordat het salten en hashen van wachtwoorden anders niet zou passen in de kolom.
<br>Voor het hashen, salten en uitlezen van gehashte wachtwoorden, heb ik de Bcrypt library gebruikt. Ik heb voor deze library gekozen, doordat ik mij kon herinneren dat ik hem al een paar jaar geleden in C# gebruikt had en het toen zijn werk goed uitvoerde.<br></br>
<img width="977" height="43" alt="image" src="https://github.com/user-attachments/assets/473bcdb7-a0df-46ee-a7dc-62630f609a0d" />
<br></br><b>Afbeelding:</b> Bewijs van het hashen en salten van wachtwoorden.</p>

<p>Deze github repository is aangesloten op mijn Azure omgeving (https://sakila-app.azurewebsites.net/). Hierbij wordt ervoor gezorgd dat elke laatste commit op de 'main'-branch naar Azure gestuurd wordt. <br></br>Om ervoor te zorgen dat mijn database gegevens niet publiekelijk toegankelijk zijn, maak ik gebruik van environment variables.
</p>
<p>In de applicatie maak ik gebruik van het MVC-mdoel, zodat ik geordend te werk kan gaan. Dit kan je terug vinden in de src folder. Hierin zijn de bestanden verdeeld over meerdere lagen: Services (models), Controllers en Views.</p>

<p>Om ervoor te zorgen dat de applicatie na elke wijziging nog steeds werkt, heb ik een aantal unit tests toegevoegd met Cypress die de functionaliteit van de applicatie in een rap tempo testen. Zo kan ik snel zien of alle functionaliteiten nog naar behoren werken nadat ik een wijziging heb uitgebracht. <br>Ik heb in totaal 7 tests gemaakt die mijn applicatie testen. Die tests bestaan uit:</p>
<ul>
  <li>Checken of de homepagina de correcte knop weergeeft gebaseerd op de 'nog niet ingelogde' status van de gebruiker.</li>
  <li>Kijken of de gebruiker kan uitloggen (met een 'beforeEach' die daarvoor al inlogt)</li>
  <li>Kijken of een film in een lijst staat (met beforeEach die inlogt en naar movies pagina gaat)</li> 
  <li>De films een detail pagina hebben</li>
  <li>de pagination werkt en een film aangemaakt kan worden (met beforeEach die inlogt en naar movies pagina gaat).</li>
  <li>Kijken of een film bewerkt kan worden. (met beforeEach die inlogt en naar movies pagina gaat)</li>
  <li>Kijken of een film verwijdert kan worden (met beforeEach die inlogt en naar movies pagina gaat)</li>
</ul>

<img width="3833" height="2076" alt="image" src="https://github.com/user-attachments/assets/5bcc464c-4234-4f44-b02a-f72a76dbfdff" />
<p></p>b>Afbeelding:</b> een voorbeeld van mijn unit tests.</p>
