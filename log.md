#Week 1
* Finished the basic game objects: player (with controller), enemy (with constant movement) and terrain block
* Implemented simple physic (ex. velocity and acceleration) on dynamic objects (player / enemy) such as gravity and bouncing
* Implemented collision between objects, what will affect to the status of the objects if they collide, except collision detection.

#Week 2
* Used Matter.js as physic library instead of using home made one
* Implemented collision detection
* Implemented game event and event trigger based on collision detection
* Added camera tracking such that the map can be expended beyond the screen

#Week 3
* Added start menu and game-end prompt as part of the game loop
* Refined the in-game display

#Week 4
* Changed the collision detection to the one in Matter.js (return pairs that start/continue/end collision at each frame)
* Refactored the camera tracking such that it will only be active when player is in the camera tracking area
* Added "rotation" feature that player can rotate his/her device to vertical display or horizontal display to change the field of view (not sure how to utilize this feature)
* Refactored the terrain generation such that consecutive terrain block (at the same height) will be created as a single terrain block
