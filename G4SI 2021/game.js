let board;
let players = 4;
let turn = 0;
let ruin = 0;
let selectedBuilding = 'na';
let playerArray = new Array(4);
playerArray[0] = {joy:0,resources:50,population:0,upgradesF:0,upgradesR:0,upgradesN:0};
playerArray[1] = {joy:0,resources:15,population:0,upgradesF:0,upgradesR:0,upgradesN:0};
playerArray[2] = {joy:0,resources:15,population:0,upgradesF:0,upgradesR:0,upgradesN:0};
playerArray[3] = {joy:0,resources:15,population:0,upgradesF:0,upgradesR:0,upgradesN:0};
//string information format <owner><polution><building>
//owner: 0, none. 1, p1... etc
//polution - 0 defualt, 1 - 2 blackened level, 3 wasteland, 4 unusable
//building r - residence, f factory, 0 none

function setup(event)
{
    turn = 1;
    createBoard();
}

function createBoard()
{
    board = new Array(40);

    for (var i = 0; i < board.length; i++) 
    {
        board[i] = new Array(60);
    }
    let gameBoard = document.getElementById("board");
    for ( i = 0; i < 40 ; i += 1)
    {
        for ( j = 0;j <60;j++)
        {
            board[i][j] = '000';
            let square = document.createElement("button");
            square.className = "tile";
            square.id = i + " " + j;
            square.addEventListener("click", clicked);
            gameBoard.appendChild(square);
        }
    }
}

function clicked(event)
{
    let coords = event.target.getAttribute('id');
    coords = coords.split(" ");
    if (selectedBuilding == 'na')
    {
        showOnDisplay("You must select a structure to place");
    }
    else if (selectedBuilding == 'f')
    {
        if (playerArray[turn-1].resources >= 5)
        {
            playerArray[turn-1].resources -= 5;
            event.target.className = "tile factory";
            temp = board[coords[0]][coords[1]]
            board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'f';
            nextPlayer();
        }
        else
        {
            showOnDisplay("You have insufficent resources.");
        }
    }
    else if (selectedBuilding == 'n')
    {
        if (playerArray[turn-1].resources >= 25)
        {
            playerArray[turn-1].resources -= 25;
            event.target.className = "tile fallout";
            temp = board[coords[0]][coords[1]]
            board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'f';
            nextPlayer();
        }
        else
        {
            showOnDisplay("You have insufficent resources.");
        }
    }
    else{
        if (playerArray[turn-1].resources >= 2) 
        {
            playerArray[turn-1].resources -= 2;
            event.target.className = "tile residence";
            temp = board[coords[0]][coords[1]]
            board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'r';
            nextPlayer();
        }
        else
        {
            showOnDisplay("You have insufficent resources.");
        }
    }
}

function selectBuilding(event, type)
{
    selectedBuilding = type;
    console.log(type);
}
function nextPlayer()
{
    let theid = "p" + "" + turn;
    theid = `p${turn}`
    let card = document.getElementById(theid);
    card.classList.remove("activePlayer");
    turn = turn + 1;
    if (turn > players)
        endOfRound();
    selectedBuilding = 'na';
    theid = "p" + "" + turn;
    card = document.getElementById(theid);
    card.className = "playerCard activePlayer";

}

function endOfRound()
{

    increaseRuin();
    turn = 1;
}

function increaseRuin()
{

}

function showOnDisplay(words)
{

}




window.addEventListener("load", setup); 