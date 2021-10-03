let board;
let players = 4;
let turn = 0;
let ruin = 0;
let selectedBuilding = 'na';
let playerArray = new Array(4);
let bombsDropped = 0;
let totalPolution = 0;
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
            bombsDropped +=1;
            playerArray[turn-1].resources -= 25;
            event.target.className = "tile fallout";
            temp = board[coords[0]][coords[1]]
            board[coords[0]][coords[1]] = '0' + "" + 4 + "" + '0';
            if (temp.charAt(0) != '0')
            {
                let effectedPlayer = temp.charAt(0);
                if (temp.charAt(2) == 'r') playerArray[effectedPlayer-1].population -=1;
                if (temp.charAt(2) == 'f') playerArray[effectedPlayer-1].factory -=1;
                
            }
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
    checkWin();
    turn = 1;
}
function checkWin()
{
    for (let i = 0; i < 4;i++)
    {
        if (playerArray[i].resources >= 150)
        {
            window.alert("Player " + (i+1) + " wins! \nThis world has been raveged by your actions, but you have won.");
            window.location.href = "index.html";
        }
    }
}
function increaseRuin()
{
    ruin += bombsDropped + (totalPolution/2400.0);
    updateBar('ruin',0);
    if (ruin >= 100)
    {
        window.alert("Game over, you all loose. \n Ruin has claimed this world.");
        window.location.href = "index.html";
    }
}
function modifyJoy()
{
    for (let i = 0; i < 4;i++)
    {
        if (playerArray[i].factory > playerArray[i].population)
        {
            playerArray[i].joy -= (playerArray[i].factory - playerArray[i].population)/2.0
        }
        else playerArray[i].joy += playerArray[i].population - playerArray[i].factory;
        playerArray[i].joy -= totalPolution/2400.0;

        if ( playerArray[i].joy > 100)  playerArray[i].joy = 100;
        if ( playerArray[i].joy < 0)  playerArray[i].joy = 0;
        updateBar('joy',i);
        

    }
}
function generateResourses()
{
    for (let i = 0 ;i <4 ;i++)
    {
        totalPolution += 4*playerArray[i].factory;
        if (playerArray[i].factory > playerArray[i].population)
        playerArray[i].resources += playerArray[i].population;
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
            break;
        case 'ruin' :
            let runBar = document.getElementById("ruinBar");
            runBar.style.width = ruin + "%";
            runBar = document.getElementById("ruinPer");
            runBar.innerText = ruin + "%";
            break;
        case 'joy' :
            let joyBar =  document.getElementById(`joyBar${player+1}`);
            joyBar.style.height = playerArray[player].joy;
            joyBar = document.getElementById(`joy${player+1}`);
            joyBar.innerText = playerArray[player].joy.toFixed(2);
    }
}

function showOnDisplay(words)
{
    let box = document.getElementById(`help${turn}`);
    box.innerText = words;
}

function hover(event)
{
    if (event.target.classList.contains("selectFactory"))
    {
        showOnDisplay("Place Factory");
    }
    else if (event.target.classList.contains("selectResidence"))
    {
        showOnDisplay("Place Residence");
    }
    else if (event.target.classList.contains("unavailable"))
    {
        showOnDisplay("This action is locked. Buy upgrades to unlock it!");
    }
    else if (event.target.classList.contains("uf1"))
    {
        showOnDisplay("Factories cost 1 less to build.");
    }
    else if (event.target.classList.contains("uf2"))
    {
        showOnDisplay("Factories produce 20% more resources.");
    }
    else if (event.target.classList.contains("uf3"))
    {
        showOnDisplay("2x2 clusters of factories provide a bonus");
    }
    else if (event.target.classList.contains("ur1"))
    {
        showOnDisplay("Add better air filtration to residences.");
    }
    else if (event.target.classList.contains("ur2"))
    {
        showOnDisplay("Building on wastelands costs 1 unit less");
    }
    else if (event.target.classList.contains("ur3"))
    {
        showOnDisplay("Residences reduce the increase of ruin");
    }
    else if (event.target.classList.contains("un1"))
    {
        showOnDisplay("This uranium stuff looks neat...");
    }
    else if (event.target.classList.contains("un2"))
    {
        showOnDisplay("Unlock nuke action");
    }
    else if (event.target.classList.contains("un3"))
    {
        showOnDisplay("Reduce cost of nuke");
    }

}



window.addEventListener("load", setup); 