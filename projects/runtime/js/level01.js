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
                { "type": "sawblade", "x": 400, "y": groundY - 50},
                { "type": "sawblade", "x": 600, "y": groundY - 50 },
                { "type": "sawblade", "x": 800, "y": groundY - 50 },

                 { "type": "enemy", "x": 500, "y": groundY - 50},
                { "type": "enemy", "x": 700, "y": groundY - 50},
                { "type": "enemy", "x": 900, "y": groundY - 50},

                { "type": "reward", "x": 500, "y": groundY - 50},
                { "type": "reward", "x": 700, "y": groundY - 50},
                { "type": "reward", "x": 900, "y": groundY - 50},
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
       


function createEnemy(x,y){
        var enemy = game.createGameItem('enemy',30);
        var redSquare = draw.bitmap('img/skelee.png');
        redSquare.x = -30;
        redSquare.y = -230;
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
        game.changeIntegrity(-10);
        game.increaseScore(100);
        enemy.fadeOut()
    };
}
    for(var i = 0;i < levelData.gameItems.length; i++){
     var gameItem = levelData.gameItems[i];

    if (gameItem.type === "sawblade"){
        createSawBlade(gameItem.x , gameItem.y);
        
    }  if (gameItem.type === "enemy"){
        createEnemy(gameItem.x , gameItem.y); }
    
}function createReward( x, y){
    var reward = game.createGameItem('reward', 25);
    var blueSquare = draw.rect(50,50,'blue');
    blueSquare.x -25;
    blueSquare.y -25;
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
