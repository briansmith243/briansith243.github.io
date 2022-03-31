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
                { "type": "sawblade", "x": 1500, "y": groundY - 30 },
                { "type": "sawblade", "x": 2000, "y": groundY - 30},
                { "type": "sawblade", "x": 2500, "y": groundY - 105 },
                { "type": "sawblade", "x": 3000, "y": groundY - 30 },
                { "type": "sawblade", "x": 3500, "y": groundY - 30 },
                { "type": "sawblade", "x": 4000, "y": groundY - 30 },
                { "type": "sawblade", "x": 4500, "y": groundY - 30 },

                 { "type": "enemy", "x": 800, "y": groundY - 70},
                { "type": "enemy", "x": 1600, "y": groundY - 70},
                { "type": "enemy", "x": 2400, "y": groundY - 70},
                { "type": "enemy", "x": 2400, "y": groundY - 70},
                { "type": "enemy", "x": 3000, "y": groundY - 70},
                { "type": "enemy", "x": 3600, "y": groundY - 70},

                { "type": "reward", "x": 500, "y": groundY},
                { "type": "reward", "x": 1000, "y": groundY},
                { "type": "reward", "x": 1500, "y": groundY},
                { "type": "reward", "x": 20000, "y": groundY},
                { "type": "reward", "x": 25000, "y": groundY},
                { "type": "reward", "x": 30000, "y": groundY},
            

                { "type": "boss", "x": 3200, "y": groundY - 70},
                { "type": "boss2", "x": 4500, "y": groundY - 70},
                { "type": "boss2", "x": 6000, "y": groundY - 70},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);    
        
        
         var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25; //tweaks the image 25 pixeld to left
        obstacleImage.y = -25; // tweaks the image 25 pixels up
        sawBladeHitZone.rotationalVelocity = 5;
        }
       
function createBoss(x,y){
    var boss =  game.createGameItem('boss',30); 
    var purpleSquare = draw.bitmap('img/hugeboss.png');
    purpleSquare.x = 100;
    purpleSquare.y = -100;
    purpleSquare.scaleX = -.3;
    purpleSquare.scaleY = .3;
    boss.addChild(purpleSquare);

    boss.x = x;
    boss.y = y;
        
    game.addGameItem(boss);
    boss.velocityX = -1;
  
    boss.onPlayerCollision = function() {
        console.log('The Boss has hit Halle');
        game.changeIntegrity(-50)
    };
 boss.onProjectileCollision = function() {
    console.log('The projectile has hit BOSS');
    game.changeIntegrity(-10);
    game.increaseScore(500);
    boss.fadeOut()
};
}



function createEnemy(x,y){
        var enemy = game.createGameItem('enemy',30);
        var redSquare = draw.bitmap('img/skelee.png');
        redSquare.x = -200;
        redSquare.y = -180;
        enemy.scaleX = -.3;
        enemy.scaleY = .3;
        enemy.addChild(redSquare);

        enemy.x = x;
        enemy.y = y;
            
        game.addGameItem(enemy);
        enemy.velocityX = -1;
      
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10)
        };
     enemy.onProjectileCollision = function() {
        console.log('The projectile has hit enemy');
        game.changeIntegrity(10);
        game.increaseScore(100);
        enemy.fadeOut()
    };
}
function createBoss2(x,y){
    var boss2 =  game.createGameItem('boss2',30); 
    var bossImage = draw.bitmap('img/boss2.png');
    bossImage.x = 200;
    bossImage.y = -230;
    bossImage.scaleX = -.9;
    bossImage.scaleY = .9;
    boss2.addChild(bossImage);

    boss2.x = x;
    boss2.y = y;
        
    game.addGameItem(boss2);
    boss2.velocityX = -1;
  
    boss2.onPlayerCollision = function() {
        console.log('The second Boss has hit Halle');
        game.changeIntegrity(-50)
    };
 boss2.onProjectileCollision = function() {
    console.log('The projectile has hit BOSS');
    game.changeIntegrity(-10);
    game.increaseScore(500);
    boss2.fadeOut()
    };
}
function createReward( x, y){
    var reward = game.createGameItem('reward', 25);
    var rewardImage = draw.bitmap('img/points bag.png');
    rewardImage.x = -50;
    rewardImage.y = -95;
    rewardImage.scaleX = 0.15;
    rewardImage.scaleY = 0.15;
    reward.addChild(rewardImage);

    reward.x = x;
    reward.y = y;
        
    game.addGameItem(reward);
    reward.velocityX = -1;
  
    reward.onPlayerCollision = function() {
        console.log('The second Boss has hit Halle');
        game.changeIntegrity(50);
        game.increaseScore(100);
        reward.shrink();
    };
 

}

    for(var i = 0;i < levelData.gameItems.length; i++){
     var gameItem = levelData.gameItems[i];

        if (gameItem.type === "sawblade"){
            createSawBlade(gameItem.x , gameItem.y);
            
        }  
        if (gameItem.type === "enemy"){
            createEnemy(gameItem.x , gameItem.y);
        }
        if (gameItem.type === "boss"){
            createBoss(gameItem.x , gameItem.y);
        }
        if (gameItem.type === "reward"){
            createReward(gameItem.x , gameItem.y);
    }
    if (gameItem.type === "boss2"){
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