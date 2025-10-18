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

  //calcolo quante righe sono necessarie per andare poi a modulare l'altezza 
  let righeNecessarie = ceil(nRighe / nColonne);
  //ceil approssima 
  let totalHeight = paddingEsterno * 2 + righeNecessarie * lato;
  //calcolo altezza totale 

  //ora devo fare la GRIGLIA 
  // i è il numero dei miei quadrati in fila, se voglio metterli in griglia 
  //devo dividerli per le mie colonne (calcolate sopra), così gli dico di andare a capo.
  for (let i = 0; i < nRighe; i++) {
    
    let c = i % nColonne;             // quale coloonna sono 
    let r = floor(i / nColonne);      // quale riga 

    // Coordinate del quadrato:
    // partiamo da paddingEsterno e poi aggiungiamo multipli del LATO (nessun padding interno)
    let x = paddingEsterno + c * lato;
    let y = paddingEsterno + r * lato;

    // Disegno il quadrato
    stroke(0);
    strokeWeight(2);
    fill(255);        // bianco (scegli tu)
    rect(x, y, lato, lato, 5);
  }


}




