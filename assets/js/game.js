window.alert("Welcome to Robot Gladiators!");

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10
};

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = Math.floor(Math.random() * 60)+ 1;
var enemyAttack = 12;

// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot 's health is zero or less

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random()* (max - min + 1) + min);
    return value;
};

var fight = function(enemyName) {


    while(enemyHealth > 0 && playerInfo.health > 0) {
        
        //ask user if theyd like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {

            var confirmSkip = window.confirm("Are you sure you want to quit?");
            if (confirmSkip){
                //subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
                console.log("player's Money ", playerInfo.money);
                break;
            }
        }

        //generate random damage value based on a player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // to keep enemyHealth from going into negatives
        enemyHealth = Math.max(0, enemyHealth - damage);

        console.log( 
            playerInfo.name + " attacked " + enemyName + " by " + damage + ". " + enemyName + " now has " + enemyHealth + " health remaining."
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
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerInfo.name + " by " + damage + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            console.log( playerInfo.name + " has died!");
            break;
        }


        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
        }
    }



};


// function to start a new game
var startGame = function() {

    // reset player stats
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 14;

    for (var i=0; i < enemyNames.length; i++) {

        
        if (playerInfo.health > 0) {
            //let user know what round they are in
            window.alert("Round " + (i+1) + "!" );

            // pick new enemy to fight 
            var newEnemyName = enemyNames[i];

            // reset enemyHealth before starting a new fight
            enemyHealth = randomNumber(40, 60);
            console.log(newEnemyName + "'s health is " + enemyHealth);

            // pass the newEnemyName variable into fight function
            fight(newEnemyName);

            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyNames.length - 1) {
                // ask  if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take player to store() function
                if (storeConfirm){
                    shop();
                }

                
            }
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

    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
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

var shop = function() {
    // console.log("enterd the  shop");

    var shopPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack or LEAVE the store? Please enter one, 'REFILL', 'UPGRADE', 'LEAVE' to make a choice.");
    
    switch(shopPrompt){
        case "REFILL":
            if (playerInfo.money >= 7){
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerInfo.health += 20;
                playerInfo.money -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "UPGRADE":
            if (playerInfo.money >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase attack and decrease money
                playerInfo.attack += 6;
                playerInfo.money -= 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "LEAVE":
            window.alert("Leaving the store");

            // do nothing so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick valid option
            shop();
            break;
    }
};

startGame();

