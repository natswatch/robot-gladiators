window.alert("Welcome to Robot Gladiators!");


// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot 's health is zero or less

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random()* (max - min + 1) + min);
    return value;
};

var fightOrSkip = function() {
    //ask user if theyd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "" || promptFight === null){
        window.alert("You need to provide a valild answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you want to quit?");

        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }

    return false;

};


var fight = function(enemy) {

    console.log(enemy);

    while(enemy.health > 0 && playerInfo.health > 0) {
        
        if (fightOrSkip()){
            break;
        }

        //generate random damage value based on a player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // to keep enemyHealth from going into negatives
        enemy.health = Math.max(0, enemy.health - damage);

        console.log( 
            playerInfo.name + " attacked " + enemy.name + " by " + damage + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

            // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died");
            console.log( enemy.name + " has died!");
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that resule to update the value in the 'playerHealth' variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + " by " + damage + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
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
    playerInfo.reset();

    for (var i=0; i < enemyInfo.length; i++) {

        
        if (playerInfo.health > 0) {
            //let user know what round they are in
            window.alert("Round " + (i+1) + "!" );

            // pick new enemy to fight 
            var newEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting a new fight
            newEnemyObj.health = randomNumber(40, 60);
            console.log(newEnemyObj.name + "'s health is " + newEnemyObj.health);

            // pass the newEnemyName variable into fight function
            fight(newEnemyObj);

            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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

    var shopPrompt = window.prompt("Would you like to 1. REFILL your health, 2. UPGRADE your attack or 3. LEAVE the store? Please enter one, 1, 2 or 3 to make a choice.");
    
    shopPrompt = parseInt(shopPrompt);

    switch(shopPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
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

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null){
        name = prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    },
];


startGame();

