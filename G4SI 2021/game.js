let board;
let players = 4;
let turn = 0;
let ruin = 0;
let selectedBuilding = 'na';
let playerArray = new Array(4);
playerArray[0] = {joy:100,resources:10,population:0,factory:0,upgradesF:0,upgradesR:0,upgradesN:0};
playerArray[1] = {joy:100,resources:10,population:0,factory:0,upgradesF:0,upgradesR:0,upgradesN:0};
playerArray[2] = {joy:100,resources:10,population:0,factory:0,upgradesF:0,upgradesR:0,upgradesN:0};
playerArray[3] = {joy:100,resources:10,population:0,factory:0,upgradesF:0,upgradesR:0,upgradesN:0};
//string information format <owner><polution><building>
//owner: 0, none. 1, p1... etc
//polution - 0 defualt, 1 - 2 blackened level, 3 wasteland, 4 unusable
//building r - residence, f factory, 0 none

function setup(event)
{
    turn = 1;
    for (let i = 1; i < 5 ; i++)
    {
        updateBar('res',i)
    }
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
            playerArray[turn-1].factory += 1;
            event.target.className = "tile factory";
            temp = board[coords[0]][coords[1]]
            board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'f';
            updateBar('res',turn);
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
            updateBar('res',turn);
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
            playerArray[turn-1].population += 1;
            event.target.className = "tile residence";
            temp = board[coords[0]][coords[1]]
            board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'r';
            updateBar('res',turn);
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
    let theid = `p${turn}`;
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
    modifyJoy();
    generateResourses();
    increaseRuin();
    turn = 1;
}

function increaseRuin()
{

}
function modifyJoy()
{

}
function generateResourses()
{
    for (let i = 0 ;i <4 ;i++)
    {
        if (playerArray[i].factory > playerArray[i].population)
        playerArray[i].resources += playerArray[i].factory - playerArray[i].population;
        else playerArray[i].resources += playerArray[i].factory;

        if (playerArray[i].joy < 40) playerArray[i].resources -= 1;
        if (playerArray[i].joy < 30) playerArray[i].resources -= 1;
        if (playerArray[i].joy < 20) playerArray[i].resources -= 1;
        updateBar('res', i+1);
    }
}
function updateBar(type, player)
{
    switch(type)
    {
        case 'res' :
            let newPercent =  playerArray[player-1].resources/150.0;
            let theBar = document.getElementById(`materialBar${player}`);
            theBar.style.height = (1- newPercent)*100 + "%";
            let theNumber = document.getElementById(`mat${player}`);
            theNumber.innerText = playerArray[player-1].resources;
        case 'ruin' :

        case 'joy' :
    }
}

function showOnDisplay(words)
{

}




window.addEventListener("load", setup); 