/**
 * Mahfoud EL BOUBKARY 
 * 
 */

 /**Variabe Globals */
let activePlayer=0; // 0 => etat de demarage (Nouvelle partie); 1 => Player1; 2 => Player2
const rollDiceBtn = document.getElementById('rollDice');
let currentValue = 0;  // valeur stocké dans current 


/***
 * displayPlayerActive () 
 * va gérer le visuel du joeur qui va jouer :
 * le fontWeight et la led rouge 
 * 
 */
const displayPlayerActive = (active) => {
  const roundPlayer = document.getElementById('roundPlayer' + active);
  const titlePlayer = document.getElementById('titlePlayer' + active);  
  titlePlayer.style.fontWeight = '400'
  roundPlayer.style.display ='block';
}

/***
 * iniPlayer() => va retourner 1 ou 2 
 * permet de selectionner le joueur qui va commencer, 
 * si activePlayer = 2 => Player2 qui commence 
 * si activPlayer = 1 => Player1 qui commence 
 */
const initPlayer = () => {
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
 * Fonction permet de changer de joeur  
 */
const changePlayer = () => {
  if(activePlayer == 1) activePlayer = 2;
  else activePlayer = 1;
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
 



