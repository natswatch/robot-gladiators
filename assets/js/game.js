window.alert("Welcome to Robot Gladiators!");

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot 's health is zero or less

var fight = function(enemyName) {


    while(enemyHealth > 0 && playerHealth > 0) {
        
        //ask user if theyd like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {

            var confirmSkip = window.confirm("Are you sure you want to quit?");
            if (confirmSkip){
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                console.log("player's Money ", playerMoney);
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log( 
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

            // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died");
            console.log( enemyName + " has died!");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that resule to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            console.log( playerName + " has died!");
            break;
        }


        else {
            window.alert(playerName + " still has " + playerHealth + " health left.")
        }
    }



};


// function to start a new game
var startGame = function() {

    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i=0; i < enemyNames.length; i++) {

        
        if (playerHealth > 0) {
            //let user know what round they are in
            window.alert("Round " + (i+1) + "!" );

            // pick new enemy to fight 
            var newEnemyName = enemyNames[i];

            // reset enemyHealth before starting a new fight
            enemyHealth = 50;

            // pass the newEnemyName variable into fight function
            fight(newEnemyName);
        }

        // if i > 0  ask if they want to refill healh. upgrade , leave,

        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
   //startGame();
    endGame();
    

};

var endGame = function() {

    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    
    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
    
};

startGame();



var shop = function() {

    var gamePrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack or LEAVE the store? Please enter one, 'REFILL', 'UPGRADE', 'LEAVE' to make a choice.").toUpperCase;
    
    if (gamePrompt === "REFILL") {
        //playerHealth += ;
        //playerMoney -= ;
    } else if (gamePrompt === "UPGRADE") {
        //playerAttack += ;
        // playerMoney -= ;
    } else if (gamePrompt === "LEAVE") {
        window.alert("goodbye");
    } 
};


