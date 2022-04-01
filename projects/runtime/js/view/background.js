var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background; //used to make background objects such as code
        
        // ANIMATION VARIABLES HERE:
        var tree;  //used for later code but this will help us make functions
        var flag;//^^^^^
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'dark purple'); background.addChild(backgroundFill);
            background.addChild(backgroundFill);  //changes background color and sizes the color of the background
         
            // TODO: 3 - Add a moon and starfield
         for (var i = 0; i<= 100; i++){  //adds 100 stars
            var circle = draw.circle(10,'white','LightGray',2);  //actually makes the circle
            circle.x = canvasWidth*Math.random(); // scales the circls x
            circle.y = groundY*Math.random();  //scales the circles y
            background.addChild(circle); //addds the circle for the moon
           
        }
            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth - 300;  //variables to add size to the moon image
            moon.y = groundY - 450; //this changes the y axis like chnage this to make your code move up or down
            moon.scaleX = .5;    //Sizes the moon and makes it bigger or smaller
            moon.scaleY = .5;//  ^^^
            background.addChild(moon); //adds the moon to the background
                        
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<5;++i) {
                var buildingHeight = 300;
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 -
            tree = draw.bitmap('img/evil tree.png'); //makes the evil tree imagoge i Implemented  in the game
            tree.x = 300; //changes the tree's x  
            tree.y = groundY - 340;  //changes the trees y 
            background.addChild(tree);  //adds the tree and puts it equal to the ground
            tree.scaleX = .5; //depending on how wide I want the tree I change this
            tree.scaleY = .5; //depending on how higfh I want the tree I change this
            background.addChild(tree); //actually adds the tree so like it completes the code
            
            flag = draw.bitmap('img/flag.png'); //makes the flag from google as the image
            flag.x = 3000 ; //changes the tree's x so it puts it later in the game like a checkpoint
            flag.y = groundY - 285;  //puts the flag on the floor so it doesnt look like its floating
            background.addChild(flag); //adds the flag
            flag.scaleX = .3; //makes the flag wider
            flag.scaleY = .3; //makes the flag taller
            background.addChild(flag);
            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {  //makes funciton
            // useful variables
            var canvasWidth = app.canvas.width;  //changes how I want the game to fit on the screeens width
            var canvasHeight = app.canvas.height;//changes how the game is on the screen but its height
            var groundY = ground.y; 
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; //tacking the value of value.x and decreasing by 1 pixel every time the update function runs.Makes it more left

            if(tree.x < -200) {// if the x posiyion of the tree exceeds -200 then the x position of the tree wuiil be reset to the canvas width
                tree.x = canvasWidth; // the x position of the tree is assigned ro the canvas width
            }
            flag.x = flag.x - 1; // basically does the same thing as the tree code but instead uses a flag

            if(flag.x < -200) {// does the same thing as the tree code but instead I put a flag
                flag.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){   //move the buildings x position by .5 pixels
                buildings[i].x = buildings[i].x - 0.5;
                if(buildings[i].x < 0) {    //checks to see if the buildings x pos is off the left side and if it is it resets to the right side
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;  //used to help resize
        background.update = update; //gonna be good when needing to update the game and adding new things
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background); //rezises the background
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
