var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 500, "y": groundY - 30},
                { "type": "sawblade", "x": 1000, "y": groundY - 105 },
                { "type": "sawblade", "x": 1500, "y": groundY - 30 },   //ALL THSI CREATES SAW BLADES
                { "type": "sawblade", "x": 2000, "y": groundY - 30},
                { "type": "sawblade", "x": 2500, "y": groundY - 105 },
                { "type": "sawblade", "x": 3000, "y": groundY - 30 },
                { "type": "sawblade", "x": 3500, "y": groundY - 30 },
                { "type": "sawblade", "x": 4000, "y": groundY - 30 },
                { "type": "sawblade", "x": 4500, "y": groundY - 30 },

                 { "type": "enemy", "x": 800, "y": groundY - 70},
                { "type": "enemy", "x": 1600, "y": groundY - 70},
                { "type": "enemy", "x": 2400, "y": groundY - 70}, //ALL THIS CREATES ENEMY's
                { "type": "enemy", "x": 2400, "y": groundY - 70},
                { "type": "enemy", "x": 3000, "y": groundY - 70},
                { "type": "enemy", "x": 3600, "y": groundY - 70},

                { "type": "reward", "x": 500, "y": groundY},
                { "type": "reward", "x": 1000, "y": groundY},
                { "type": "reward", "x": 1500, "y": groundY},
                { "type": "reward", "x": 20000, "y": groundY}, //ALL THIS CREATES REWARDS
                { "type": "reward", "x": 25000, "y": groundY},
                { "type": "reward", "x": 30000, "y": groundY},
            

                { "type": "boss", "x": 3200, "y": groundY - 70},
                { "type": "boss2", "x": 4500, "y": groundY - 70}, //THIS MAKES MY BOSSES
                { "type": "boss2", "x": 6000, "y": groundY - 70},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){ 
        var hitZoneSize = 25; //gives sawblade a hitzone that size is 25
        var damageFromObstacle = 10;  //when you get hit by this u lose 10 health
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;  // xposition of sawblade is set to x
        sawBladeHitZone.y = y; // yposition of sawblade is set to y
        game.addGameItem(sawBladeHitZone);    
        
        
         var obstacleImage = draw.bitmap('img/sawblade.png'); //makes the image a actual saw
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25; //tweaks the image 25 pixeld to left
        obstacleImage.y = -25; // tweaks the image 25 pixels up
        sawBladeHitZone.rotationalVelocity = 5;
        }
       
function createBoss(x,y){
    var boss =  game.createGameItem('boss',30); //puts the boss as a in game item
    var purpleSquare = draw.bitmap('img/hugeboss.png');  //changes the the imagie to a big meat monster
    purpleSquare.x = 100;  //used as the boss but is in squares and chnages the squares x position equal to 100
    purpleSquare.y = -100; // sets the square y to equal -100
    purpleSquare.scaleX = -.3; //makes the squares x scale equal to -.3
    purpleSquare.scaleY = .3;// makes the squares y scale equal to .3
    boss.addChild(purpleSquare); //adds the square in the game

    boss.x = x; //sets boss's x position equal to x
    boss.y = y;//sets boss's y position equal to y
        
    game.addGameItem(boss); //makes the boss a ingame item
    boss.velocityX = -1;  //makes boss move to the left
  
    boss.onPlayerCollision = function() { 
        console.log('The Boss has hit Halle');  //when the boss hits you its comments 
        game.changeIntegrity(-50) //lose 50 health after u get hit
    };
 boss.onProjectileCollision = function() {
    console.log('The projectile has hit BOSS');  //when oiu shoot the boss this comments
    game.changeIntegrity(10);  //gain 10 health after killing the boss
    game.increaseScore(500);  //gain 500 points after killing the boss
    boss.fadeOut(); //the boss fades away after you kill him
};
}



function createEnemy(x,y){
        var enemy = game.createGameItem('enemy',30); //makes the first enemy
        var redSquare = draw.bitmap('img/skelee.png'); //puts a special image as the enemy
        redSquare.x = -200; //changes the hitbox of the enemy's x and makes it set to -200
        redSquare.y = -180; //changes the hitbox of the enemy;s y and makes it set to -180
        enemy.scaleX = -.3; //scales the enemy's x to -.3
        enemy.scaleY = .3;// scales the enemies Y to .3
        enemy.addChild(redSquare); //adds a redquare as the enemy

        enemy.x = x; //sets enemy x to equal x
        enemy.y = y; // sets enemy y to equal y
            
        game.addGameItem(enemy); //adds enemy as a game item
        enemy.velocityX = -1; //makes the enemy go to the left
      
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle'); //comments this when the enemy touches you
            game.changeIntegrity(-10) //chages health after killing this 
        };
     enemy.onProjectileCollision = function() {
        console.log('The projectile has hit enemy');
        game.changeIntegrity(10); //gain 10 healtha fter killlling
        game.increaseScore(100); // score goes up by 100
        enemy.fadeOut() //fades the enemy out after being killed
    };
}
function createBoss2(x,y){
    var boss2 =  game.createGameItem('boss2',30); //puts the boss in the game
   var bossImage = draw.bitmap('img/boss2.png'); //makes my image as the boss
    bossImage.x = 200; //buts the x of the hitbox at 200
    bossImage.y = -230;// puts the y of the hitbox at -230
    bossImage.scaleX = -.9; //sets boss x scale to -.9
    bossImage.scaleY = .9; // sets the boss y scale to .9
    boss2.addChild(bossImage);

    boss2.x = x;// sets the boss's xposition equal to x
    boss2.y = y;// sets the boss's yposition equal to y
        
    game.addGameItem(boss2);
    boss2.velocityX = -1;
  
    boss2.onPlayerCollision = function() {
        console.log('The second Boss has hit Halle'); //comments after the boss hits halle
        game.changeIntegrity(-50) //loe health afte rbeing hit
    };
 boss2.onProjectileCollision = function() {
    console.log('The projectile has hit BOSS'); //comments after projecticle hit boss2
    game.changeIntegrity(-10); //lose health for killing the bos because he is poisnis
    game.increaseScore(500);// increases score to 500 for killing the main boss
    boss2.fadeOut()// after he dies he fades out

    };
}
function createReward( x, y){
    var reward = game.createGameItem('reward', 25); //adds reward
    var rewardImage = draw.bitmap('img/points bag.png'); //puts coin bag as reward
    rewardImage.x = -50;//hitbox of reward set to -50
    rewardImage.y = -95;// hitbox of reward os set to -95
    rewardImage.scaleX = 0.15; //scales rewards x to 0.15
    rewardImage.scaleY = 0.15;// scales rewards y to 0.15
    reward.addChild(rewardImage);

    reward.x = x; //sets rewards x posiion to equal x
    reward.y = y;// seys rewards y position to equal y
        
    game.addGameItem(reward); 
    reward.velocityX = -1; // rewards moves left
  
    reward.onPlayerCollision = function() {
        console.log('Halle got the reward'); //comments when you get the reward
        game.changeIntegrity(50); // gain 50 health for gettin the reawrd
        game.increaseScore(100); //gain 100 points for collecting bag
        reward.shrink(); //after you get it it shrinks and dissapears
    };
 

}

    for(var i = 0;i < levelData.gameItems.length; i++){
     var gameItem = levelData.gameItems[i];

        if (gameItem.type === "sawblade"){            //adds sawblade in game
            createSawBlade(gameItem.x , gameItem.y);
            
        }  
        if (gameItem.type === "enemy"){                //adds enemy in game
            createEnemy(gameItem.x , gameItem.y);
        }
        if (gameItem.type === "boss"){                 //adds boss in game
            createBoss(gameItem.x , gameItem.y);
        }
        if (gameItem.type === "reward"){        //adds reward in game
            createReward(gameItem.x , gameItem.y);
    }
    if (gameItem.type === "boss2"){            //adds boss in game
        createBoss2(gameItem.x , gameItem.y);
    }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
}