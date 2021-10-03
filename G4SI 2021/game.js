let board;
let players = 4;
let turn = 0;
let joy = [];
let resources = [];
let ruin = 0;
let selectedBuilding = 0;

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
    if (selectedBuilding == 0)
    {
        console.log(1);
    }
    else if (selectedBuilding == 'f')
    {
        console.log(2);
        event.target.className = "tile factory";
        temp = board[coords[0]][coords[1]]
        board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'f';
    }
    else{
        console.log(3);
        event.target.className = "tile residence";
        temp = board[coords[0]][coords[1]]
        board[coords[0]][coords[1]] = turn + "" + temp.charAt(1) + "" + 'r';
    }
    nextPlayer();
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
    selectedBuilding = 0;
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




window.addEventListener("load", setup); 