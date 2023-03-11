const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentplayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to initialize the game

function initGame() {
  currentplayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  //UI per change karna ke liye
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //to remove color
    box.classList = `box box${index +1}`;
  });

  newGameBtn.classList.remove("active");
  
  gameInfo.innerText = `Current Player - ${currentplayer}`;
}

initGame();

function swapTurn() {
  if (currentplayer == "X") {
    currentplayer = "O";
  } else currentplayer = "X";

  //UI update
  gameInfo.innerText = `Current Player - ${currentplayer}`;
  

}

function handleClick(index) {
  if (gameGrid[index] == "") {
    //to make change on ui
    boxes[index].innerText = currentplayer;
    // cursor pointer off karne ke liye
    boxes[index].style.pointerEvents = "none";
    // to store the value in gamegrid
    gameGrid[index] = currentplayer;
    //swap trun form X to O or O to X
    swapTurn();
    // to check if the game is over
    checkGameover();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", () => {
  initGame();
});

function checkGameover() {
  let answer = "";

  winningPosition.forEach((position ) => {
    if ( (gameGrid[position[0]] != "" ||  gameGrid[position[1]] != "" || gameGrid[position[2]] != "" )
      &&  (gameGrid[position[0]] == gameGrid[position[1]] ) && ( gameGrid[position[1]] ==gameGrid[position[2]]  )) {

        // check if winner is X
        if( gameGrid[position[0]] == "X") 
        {
          answer =  "X" ;
        }
        else{
          answer ="O";
        }

        //disable pointer event
        boxes.forEach((box) => {
          box.style.pointerEvents = "none";
        })
        // now we know the winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win"); 
        
        
      }
      


  });
  if (answer != ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  //when there is no winner
  let fillcout = 0;
  gameGrid.forEach((box) => {
    if(box != "")
    {fillcout++ ;}
  });

  // now if the board is completely filled 

  if (fillcout == 9 )
  {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");

  }
  


}
