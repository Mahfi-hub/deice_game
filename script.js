/**
 * Mahfoud EL BOUBKARY 
 * 
 */

 /**Variabes Globales */
let activePlayer=0; // 0 => etat de demarage (Nouvelle partie); 1 => Player1; 2 => Player2
const rollDiceBtn = document.getElementById('rollDice');
let currentValue = 0;  // valeur stocké dans current
const holdBtn = document.getElementById('hold'); // btn for Hold
let global = [0,0];  // tableau qui va stocké les deux valeurs globales des deux joeurs global[0]:joeur1 global[1]:joeur2
const newGameBtn = document.getElementById('new');
const panelImage = document.querySelector('.image')
/***
 * displayPlayerActive () 
 * va gérer le visuel du joeur qui va jouer :
 * le fontWeight et la led rouge 
 * 
 */
const displayPlayerActive = (active) => {
  const roundPlayer = document.getElementById('roundPlayer' + active);
  const titlePlayer = document.getElementById('titlePlayer' + active);  
  titlePlayer.style.fontWeight = '400';
  roundPlayer.style.display ='block';
}

/***
 * iniPlayer() => va retourner 1 ou 2 dans la variable globale
 * permet de selectionner le joueur qui va commencer, 
 * si activePlayer = 2 => Player2 qui commence 
 * si activPlayer = 1 => Player1 qui commence 
 * rend la led du selection du joeur display none
 */
const initPlayer = () => {
  let roundPlayer1 = document.getElementById('roundPlayer1');
  let titlePlayer1 = document.getElementById('titlePlayer1'); 
  titlePlayer1.style.fontWeight = '100';
  roundPlayer1.style.display ='none';
  let roundPlayer2 = document.getElementById('roundPlayer2');
  let titlePlayer2 = document.getElementById('titlePlayer2'); 
  titlePlayer2.style.fontWeight = '100';
  roundPlayer2.style.display ='none';
  activePlayer = Math.floor((Math.random() * 2) + 1);  // stocker dans une variable globale le joeur qui va commencer
  displayPlayerActive(activePlayer) 
}

initPlayer();  // Executer la fonction initPlayer.

/***
 * startDice() => va retourner la valeur du dé trouvée  
 * une valeur aleatoire entre 1 et 6
 */
const startDice= () =>{
  const diceValue = Math.floor((Math.random() * 6) + 1);
  return diceValue
} 
/**
 * changePlayer() => 
 * Fonction permet de changer de joeur lorsque :
 *    - le joeur obtient 1 
 *    - le joeur click sur HOLD 
 */
const changePlayer = () => {
  let roundPlayer = document.getElementById('roundPlayer' + activePlayer);
  let titlePlayer = document.getElementById('titlePlayer' + activePlayer); 
  titlePlayer.style.fontWeight = '100';
  roundPlayer.style.display ='none';
  activePlayer == 1 ? activePlayer = 2 : activePlayer = 1 ;
  displayPlayerActive(activePlayer);
}

/**
 * evenement sur boutton de roll Dice pour lancer le dé
 * lancer() => fonction callback du event click sur rollDice
 * on change l'image du dé par la valeur trouvé
 * on met a jour la valeur current 
 * 
 */
const lancer = () => {
  const currentPlayer = document.getElementById('currentPlayer' + activePlayer);
  const image = document.getElementById('image');
  const value = startDice();
  image.src = "./images/" + value + "c.gif";
  currentValue += value; // on met a jour la valeur du current
  if(value == 1){
    currentValue = 0;
    changePlayer();
  }
  currentPlayer.textContent = currentValue;
}

rollDiceBtn.addEventListener('click',lancer)  // event click
 
/**
 * evenement sur boutton HOLD pour stocker la valeur current dans Global
 * hold() => fonction callback du event click sur HOLD
 * on stock la valeur de current dans global
 * on change de joeur
 * on verifie si le joeur a obtenu 100 pour le déclarer gagnant
 * on affiche le gagnant
 * on désactive les events des bouttons ROLL DICE et HOLD
 */
const hold = (event) => {
  const globalPlayer = document.getElementById('globalPlayer' + activePlayer);
  const currentPlayer = document.getElementById('currentPlayer' + activePlayer);
  global[activePlayer-1] += currentValue ;
  globalPlayer.textContent = global[activePlayer-1];
  if(global[activePlayer-1] >= 100) {
    const winnerPlayer = activePlayer;
    //changePlayer();
   
    let winnerZone = document.createElement('h1')
    winnerZone.id = 'winner'
    winnerZone.textContent = `Le Player ${winnerPlayer} a gagné la partie`
    panelImage.append(winnerZone)
    
    event.target.removeEventListener('click',hold); //désactiver event hold
    document.getElementById('rollDice').removeEventListener('click',lancer) // désactiver event roll Dice
  }
  else {
    currentValue = 0;
    currentPlayer.textContent = currentValue;
    changePlayer();
  }
}

holdBtn.addEventListener('click',hold)

/**
 * evenement sur boutton NEW GAME pour initialiser le display  
 * newgame() => fonction callback du event click sur NEW GAME
 * on initialise le display et les valeurs pour une nouvelle partie sans reload
 * on reactive les events sur les Bouttons HOLD, ROLL DICE 
 */
const newGame = () => {
  const globalPoint = document.getElementsByClassName('globalPoint');
  const currentPoint = document.querySelectorAll('.currentPoint') // selecteur différent du dessus pour differcifier
  /**On verifie si la zoone winner existe (fin de la partie) si oui on l'a supprime */
  if(document.getElementById('winner')!= null){
    //console.log(panelImage.childNodes)
    document.getElementById('winner').remove();
  }

  for(elem of globalPoint){
    elem.textContent ='00';
  }
  for(elem of currentPoint){
    elem.textContent ='0';
  }

  activePlayer = 0;
  currentValue = 0;
  global = [0,0];
  initPlayer();

  holdBtn.addEventListener('click',hold)
  rollDiceBtn.addEventListener('click',lancer)  // event click
}

newGameBtn.addEventListener('click', newGame)


