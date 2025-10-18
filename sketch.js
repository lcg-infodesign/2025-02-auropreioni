let table;

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

 // copio qui i paramteri per poterli usare anche in setup per calcolare la dimensione del canvas
  let lato = 60;
  let paddingEsterno = 20;

  // quante colonne entrano in larghezza
  const nRighe = table.getRowCount();
  const nColonne = max(1, floor((windowWidth - paddingEsterno * 2) / lato));

  // quante righe servono e altezza totale richiesta
  const righeNecessarie = ceil(nRighe / nColonne);
  const totalHeight = paddingEsterno * 2 + righeNecessarie * lato;

  // canvas alto quanto serve 
  createCanvas(windowWidth, max(windowHeight, totalHeight));

  noLoop();
  disegnaGriglia();

}

function draw() {
  // put drawing code here
}

function disegnaGriglia(){

  let valori1 = table.getColumn(1).map(Number);
  let min1 = min(valori1);
  let max1 = max(valori1)

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

  let coloreMin = color(152,251,152);
  let coloreMax = color(60,179,113);

  //ora devo fare la GRIGLIA 
  // i è il numero dei miei quadrati in fila, se voglio metterli in griglia 
  //devo dividerli per le mie colonne (calcolate sopra), così gli dico di andare a capo.
  for (let i = 0; i < nRighe; i++) {
    
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
   
    disegnaCentro(riga, x, y, lato, min1, max1);
  }

}

function disegnaCentro (riga, x, y, lato, min1, max1){
  let v1 = riga.getNum(1); //legge il valore della colonna 1 associato alla riga

  //stesso ragionamento per il colore 
  let diam; //creo una nuova variabile 
  if (isNaN(v1) || min1 === max1) { //isNaN v mi dice di controllare che v sia un numero valido 
  diam = 0.5; // caso particolare, se tutti i valori sono uguali, t = 0.5
  } else {
  diam= map(v1, min1, max1, 8, 20);
  //uso map per associare il vMin a 0 e il vMax a 1, map lavora solo con numeri e non con i colori 
 
  noStroke();
  fill("yellow"); // nero (cambialo se vuoi)
  circle(x + lato/2, y + lato/2, diam);

}

}




