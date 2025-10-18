let table; //cario qui il mio CSV

function preload() {
  // put preload code here

  //dove carico le informazioni (dataset ad esempio, oppure immagini)
  table = loadTable("dataset.csv","csv","header");
  //primo rosso: nome file
  //secondo rosso: tipo di file 
  //terzo rosso: dico che la prima riga non è già un dato, ma un header 


  //le variabili valgono solo dentro, se deve essere generale, la dichiaro fuori da tutto 
}

function setup() {

  angleMode(DEGREES); //dico che voglio usare i gradi e non i radianti 

 // copio qui i paramteri per poterli usare anche in setup per calcolare la dimensione del canvas
  let lato = 60;
  let paddingEsterno = 20;

  // quante colonne entrano in larghezza
  let nRighe = table.getRowCount(); //quante righe ho nel mio CSV
  let nColonne = max(1, floor((windowWidth - paddingEsterno * 2) / lato));
  //quante colonne, quindi anche quante caselle per riga 

  // quante righe servono e altezza totale 
  let righeNecessarie = ceil(nRighe / nColonne);
  let totalHeight = paddingEsterno * 2 + righeNecessarie * lato;

  // canvas alto quanto serve 
  createCanvas(windowWidth, max(windowHeight, totalHeight));

  noLoop();
  disegnaGriglia();

}

function draw() {
}

function disegnaGriglia(){

  //variabili colonna 1
  let valori1 = table.getColumn(1).map(Number); //ARRAY 1
  let min1 = min(valori1); //trovo minimo dell'array
  let max1 = max(valori1); //trovo massimo nel mio array 

  //variabili colonna 3
  let valori3 = table.getColumn(3).map(Number); //ARRAY 3
  let min3 = min(valori3);
  let max3 = max(valori3);

  background(255); //metto uno sfondo 

  //definisco le mie variabili 
  let lato = 60;
  let paddingEsterno = 20; 
  let nRighe = table.getRowCount(); //N sono il numero di righe del mio CSV

  //ora devo capire quante colonne posso creare in base alla larghezza del mio schermo
  //devo considerare le mie variabili 
  //CALCOLO NUMERO COLONNE
  let nColonne = floor((width-paddingEsterno*2)/lato);
  //floor arrotonda per difetto 
  nColonne = max(1, nColonne); // almeno una colonna, anche su schermi stretti
//ugaule a sopra 

  //COLORARE IN BASE AI VALORI DELLA COLONNA 0 
  //inserisco le mie prime variabili per cercare massimo e minimo 
  //ARRAY "VALORI"
  let valori = table.getColumn(0).map(Number);
  //table.getColum prende tutti i valori della prima colonna (0)
  //indipendentemente da come si chiama nell'header 
  //map converte le stringhe in numeri 
  let vMin = min(valori);
  let vMax = max(valori);

  //ora che so i valori estremi della mia colonna di numeri,
  //devo scegliere i valori estremi dei miei colori 

  let coloreMin = color(144,238,144);
  let coloreMax = color(0,168,119);

  //ora devo fare la GRIGLIA 
  // i è il numero dei miei quadrati in fila, se voglio metterli in griglia 
  //devo dividerli per le mie colonne (calcolate sopra), così gli dico di andare a capo.
  for (let i = 0; i < nRighe; i++) { //CHIAVE DI TUTTO, mi dice di fare quello che sto facendo per ogni i 
    
    let c = i % nColonne;             // quale coloonna sono 
    //serve per andare a capo 
    //riparte da 0 ogni volta che vado a capo
    //"quanto avanza"
    let r = floor(i / nColonne);      // quale riga 
    //cresce di uno ogni volta che vado a capo

    // Coordinate del quadrato:
    // partiamo da paddingEsterno e poi aggiungiamo multipli del LATO (nessun padding interno)
    let x = paddingEsterno + c * lato;
    let y = paddingEsterno + r * lato;

    let riga = table.getRow(i); //prendo la riga, i è l'indice del quadrato
    let v = riga.getNum(0); //legge il numero della prima colonna associato a quella riga 

    let t; //creo una nuova variabile 
  if (isNaN(v) || vMin === vMax) { //isNaN v mi dice di controllare che v sia un numero valido 
  t = 0.5; // caso particolare, se tutti i valori sono uguali, t = 0.5
  } else {
  t = map(v, vMin, vMax, 0, 1);
  //uso map per associare il vMin a 0 e il vMax a 1, map lavora solo con numeri e non con i colori 
  }

  let colore = lerpColor(coloreMin, coloreMax, t);
//mischia i colori 

    // Disegno il quadrato
    stroke(255);
    strokeWeight(2);
    fill(colore);        // metto qui la mia nuova variabile che determina il colore dei quadrati 
    rect(x, y, lato, lato, 7);
   
    //metto prima i petali così stanno sotto
    disegnaPetali(riga, x, y, lato, min3, max3);
    //riga: dove prendo di dati 
    //x è cordinata dell'angolo in alto a sinistra del quadrato, y uguale a sopra 
    //lato è il lato del quadrato 
    //min3 valore minimo e max3 valore massimo (sempre della colonna3)
    disegnaCentro(riga, x, y, lato, min1, max1);

  }

}

function disegnaCentro (riga, x, y, lato, min1, max1){
  let v1 = riga.getNum(1); //legge il valore della colonna 1 associato alla riga

  //specifico variabili colonna 2
  let valori2 = table.getColumn(2).map(Number); //ARRAY 2
  let min2 = min(valori2);
  let max2 = max(valori2)

  let coloreMin2 = color(255,250,205);
  let coloreMax2 = color(255,196,12);

  //stesso ragionamento per il colore 
  let diam; //creo una nuova variabile 
  if (isNaN(v1) || min1 === max1) { //isNaN v mi dice di controllare che v sia un numero valido 
  diam = 0.5; // caso particolare, se tutti i valori sono uguali, diam = 0.5
  } else {
  diam= map(v1, min1, max1, 8, 20); 
  //uso map per associare le due scale
  
  let s = diam / lato; 

   let v2 = riga.getNum(2); //legge il numero della prima colonna associato a quella riga 

    let p; //creo una nuova variabile 
  if (isNaN(v2) || min2 === max2) { //isNaN v mi dice di controllare che v sia un numero valido 
  p = 0.5; // caso particolare, se tutti i valori sono uguali, t = 0.5
  } else {
  p = map(v2, min2, max2, 0, 1);
  //uso map per associare il vMin a 0 e il vMax a 1, map lavora solo con numeri e non con i colori 
  }

  let coloreInterno = lerpColor(coloreMin2, coloreMax2, p);
//mischia i colori 

  push (); //creo la mia bolla 
  translate(x + lato / 2, y + lato / 2);
  //sposto il centro nel centro dei quadrati
  //ora il mio centro è il CENTRO DEL QUADRATO i-ESIMO
  stroke(204,85,0);
  strokeWeight(1);
  fill(coloreInterno); 

  scale (s);
  circle(0, 0, lato);
  pop ();
}

}

function disegnaPetali(riga, x, y, lato, min3, max3) {

  let v3 = riga.getNum(3); //leggo i valori associati alle righe della colonna 3 

let angolo; //creo una nuova variabile 
  if (isNaN(v3) || min3 === max3) { //isNaN v mi dice di controllare che v sia un numero valido 
  angolo = 0; // caso particolare, se tutti i valori sono uguali, angolo = 0
  } else {
  angolo= map(v3, min3, max3, 0, 360); 
  //uso map per associare le due scale

  //specifico variabili colonna 4
  let valori4 = table.getColumn(4).map(Number); //ARRAY 4
  let min4 = min(valori4);
  let max4 = max(valori4)

  let coloreMin4 = color(255,228,225);
  let coloreMax4 = color(218,50,135);


  //DISEGNO I PETALI 
  //definisco qualche variabile 
  let nPetali = 8;
  let step = 360/nPetali; 
  let distPetali = lato*0.28; //raggio a cui metto il centro del petalo
  let wPetali = lato*0.32;
  let hPetali = lato*0.16;

  let v4 = riga.getNum(4); //legge il numero della prima colonna associato a quella riga 

    let f; //creo una nuova variabile 
  if (isNaN(v4) || min4 === max4) { //isNaN v mi dice di controllare che v sia un numero valido 
  f = 0.5; // caso particolare, se tutti i valori sono uguali, t = 0.5
  } else {
  f = map(v4, min4, max4, 0, 1);
  //uso map per associare il vMin a 0 e il vMax a 1, map lavora solo con numeri e non con i colori 
  }

  let colorePetali = lerpColor(coloreMin4, coloreMax4, f);
//mischia i colori 

  push(); //creo la mia bolla 
  //traslo il punto di applicazione nel centro del quadrato 
  translate(x + lato / 2, y + lato / 2);
 
  //colore del petalo 
  stroke(255,193,204);
  strokeWeight(0.5);
  

   // Disegno 8 petali come ellissi ruotate
  for (let k = 0; k < nPetali; k++) { //k è il mio petalo
    push(); //serve per applicare la trasformazione solo qui 
    rotate(angolo + k * step); //angolo dipende dal dato della colonna 3
      if (k === 0 || k === 4) {
    fill(212,112,162);         
  } else {
    fill(colorePetali); // colore calcolato
  }
    ellipse(distPetali, 0, wPetali, hPetali); 
    //distPetali è il centro del fiore 
    pop();
  }

  pop();
  }


}




