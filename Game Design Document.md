# Don’t - Game Design Document
##1. Target System
iOS / Andriod that are used by smart phones and are able to load HTML pages (H5) <br><br>
*Why web?* 
* Because web is rather powerful right now. It is possible to develop a APP-ish web with canvas and other features (ex. [Sinuous](https://github.com/fwon/Sinuous) and other web games using WeChat as platform)
* Because user can easily start the gameplay with simply clicking on a link or scanning a QR code

*Why not mobile APP?*
* Because the gameplay itself is short and it is unrepeatable. It is different from other iOS game which have either long story (ex. Dungeon Hunter) or repeatable elements (ex. Dice Mage / Flappy Bird). Therefore, the ratio of time spent on actual playing the game and time spent on getting the game is undesirable in my view. Although it is possible to develop an APP either cloning the web version or adding new elements into the game (less likely)

##2. Technical Specifications
* **Platform:** Web
* **Programming Language:** HTML, JavaScript, CSS
* **Stylistic Conventions:** Function commenting, naming consistency, camelCase, modulization
* **SDK:** (*NOT SURE*)
* **Tools/Interfaces:** Chrome / Safari
* **Target Audience:** Smart phone users, social media users

##3. The Story:
You as the main character is exploring a “cave” with a voice giving guidance such as “don’t do this” and “don’t do that” to proceed safely. However, when you get to the end of the “cave”, the voice disappear / does not help (either way to lead to different interpretation of the thought behind the story). In an occassion, you realise that there is one guidance that the voice has not told you, which is “don’t comply to the voice”. And this final guidance will take you out of the “cave”. <br><br>

**Idea Behind the Story:**<br>
The game is about the process of growth. At the beginning, there was a voice telling YOU not to do something because it was dangerous. YOU follow the voice and went through YOU childhood in peace. Until one day, following the voice does not help YOU overcome the obstacles. And YOU seek for change: not to follow the voice, which eventually take you to the place that YOU couldn’t reach before.

##3. Characters (TODO):
### YOU
  main character
### The Voice
  not really a character but rather a tutorial often seen in the first level of many games
### Monsters 
  enemy that is invincible

##4. Gameplay:
1. Scenes
  * The scene will be a 2D scene with three layers: front layer, main layer, back layer
    * Front layer & back layer - A kind of background to add dimension to the scene: when player moves, the front layer will move faster than the back layer to introduce a 3D effect (ex. early disney films)
    * Main layer - Where most of the objects related to the gameplay are
  * Each scene represents one level of the game and all the entries and exits of levels should be interlocking with each other to construct a complete scene of the "cave"
  * At the first half (or any given level) of the game, player shouldn't be able to re-enter previous level due to obsticle or lack of functionality (this will be addressed later)
  * Player may be able to refer to a map of the cave with unexplored area marked as dark
    * possible expansion: hidden area that will not affect the actual gameplay (which will not be included in the game unless there is sufficient reasons to do so)
2. Objects
  * YOU (player) - the object that player have control of
    * **Moves:** “up” - climb up / “down” - climb down / “left” - move left / “right” - move right
    * **Actions:** “touch” - interact with other objects if possible (a sign will show up when player is nearby) / “jump” - jump
  * Terrain - the object that other objects are stand on (also restrict their motion)
    * Terrain will be altered due to activation of switches
  * Monster - the object that will move in a certain route and it will produce damage to the player if it hits the player
    * possible expansion: it will perform certain moves in certain conditions (maybe it will be attracted by sound) such that some degrees of strategy is needed to proceed the game
  * Switch - the object that the player can interact with (including but not limited to "switch") and it will introduce certain changes
  * Background - the object that act as the background of the scene / level
3. Goal
  * Stay alive and get out of the cave

##5. Level Design (TODO)
General: Each level should be consisted with a guidance for the level (how to perform a certain move), mechanism that needs the player to follow the guidance and other mechanisms from previous level (the level becomes complex gradually)

Level 0: EMPTY
  * level_0.jpg
  
Level 1: Don’t press “jump” to jump
  * level_1.jpg
  
Level 2: Don’t press “up” to climb
  * level_2.jpg
  
Level 3: Don’t press “down” to get down
  * level_3.jpg
  
Level 4: Don’t press  “touch” to interact with anything
  * level_4.jpg
  
<del>Level 4.5 (??): an inter-level which requires player to utilize all the actions without accompanying of the voice (or just make it a part of level 5 / or merge it into level 4)</del> (becomes part of level 4)

Level 5: Pandora’s box => press “left”
  * level_5.jpg

Level 6: Reverse of level 1-4
  * level_6.jpg

Level 7: Reverse of level 0 but with “Don’t press ‘left’ to get out” or just EMPTY as level 0
  * level_7.jpg

Ending level: White screen with credits and gradually lead back to the menu
  * level_end.jpg

##6. Display
### Graphic (TODO)
Pixelized scene and characters (FEZ / cave story style) - easier to draw
  * Menu
  * Scene
  * Ending

### Sound
Sound is not primary factor here due to my lack of experience
