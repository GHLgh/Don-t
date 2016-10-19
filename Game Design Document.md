# Don’t - Game Design Document
##1. Target System
iOS / Andriod that are used by smart phones and are able to load HTML pages (H5) <br><br>
*Why web?* 
* Because web is rather powerful right now. It is possible to develop a APP-ish web with canvas and other features (ex. [Sinuous](https://github.com/fwon/Sinuous) and other web games using WeChat as platform)
* Because user can easily start the gameplay with simply clicking on a link or scanning a QR code

*Why not mobile APP?*
* Because the gameplay itself is short and it is unrepeatable (expected gaming time: 10 ~ 15 minutes). It is different from other iOS game which have either long story (ex. Dungeon Hunter) or repeatable elements (ex. Dice Mage / Flappy Bird). Therefore, the ratio of time spent on actual playing the game and time spent on getting the game is undesirable in my view. Although it is possible to develop an APP either cloning the web version or adding new elements into the game (less likely)

##2. Technical Specifications
* **Platform:** Web
* **Programming Language:** HTML, JavaScript, CSS
* **Stylistic Conventions:** Function commenting, naming consistency, camelCase, modulization
* **SDK:** (*NOT SURE*)
* **Tools/Interfaces:** Chrome / Safari
* **Target Audience:** Smart phone users, social media users

##3. The Story
You as the main character is exploring a “cave” with a voice giving guidance such as “don’t do this” and “don’t do that” to proceed safely. However, when you get to the end of the “cave”, the voice disappear / does not help (either way to lead to different interpretation of the thought behind the story). In an occassion, you realise that there is one guidance that the voice has not told you, which is “don’t comply to the voice”. And this final guidance will take you out of the “cave”. <br><br>

**Idea Behind the Story:**<br>
The game is about the process of growth. At the beginning, there was a voice telling YOU not to do something because it was dangerous. YOU follow the voice and went through YOU childhood in peace. Until one day, following the voice does not help YOU overcome the obstacles. And YOU seek for change: not to follow the voice, which eventually take you to the place that YOU couldn’t reach before.

##4. Characters (TODO)
### YOU
  main character
### The Voice
  not really a character but rather a tutorial often seen in the first level of many games
### Monsters 
  enemy that is invincible

##5. Gameplay
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
    * **NOTE:** all "action" refers to corresponding button instead of the text
  * Terrain - the object that other objects are stand on (also to restrict their motion)
    * Some kind of terrain will produce damage to the player such as thorns (but this kind of terrain should be implemented as monster object that will not move)
    * Terrain will be altered due to activation of switches
  * Monster - the object that will move in a certain route and it will produce damage to the player if it hits the player
    * possible expansion: it will perform certain moves in certain conditions (maybe it will be attracted by sound) such that some degrees of strategy is needed to proceed the game
  * Switch - the object that the player can interact with (including but not limited to "switch") and it will introduce certain changes
  * Background - the object that act as the background of the scene / level
3. Goal
  * Stay alive and get out of the cave

##6. Level Design (TODO)
General: Each level should be consisted with a guidance for the level (how to perform a certain move), mechanism that needs the player to follow the guidance and other mechanisms from previous level (the level becomes complex gradually)

Level 0: *The First Cave*
  * Description: 
    * There is nothing in this scene (scene refers to main layer, same applies below) besides the main character
  * Available actions:
    * "right" - move towards the deep of the cave
  * level_0.jpg (TODO)
  
Level 1: *The Tunnel*
  * Description: 
    * An overhead sign saying that 'Don’t press “jump” to jump'
    * There is a tunnel with thorns attached on the top in this scene such that if the player jumps, he/she dies
  * Available actions: 
    * "right" - move towards the deep of the cave
    * "jump" - jump
  * level_1.jpg (TODO)
  
Level 2: *The Turnoff*
  * Description: 
    * An overhead sign saying that 'Don’t press “up” to climb'
    * There is a rope that will let the player reach the upper section of the scene where seems like 
  * Available actions:
    * "right" - move towards the deep of the cave
    * "jump" - jump
    * "up" - climb up if possible, otherwise will move the camera up a bit when pressing it
  * level_2.jpg (TODO)
  
Level 3: Don’t press “down” to get down
  * Description: 
    * 
  * Available actions:
  * level_3.jpg (TODO)
  
Level 4: Don’t press  “touch” to interact with anything
  * Description: 
    * 
  * Available actions:
  * level_4.jpg (TODO)
  
<del>Level 4.5 (??): an inter-level which requires player to utilize all the actions without accompanying of the voice (or just make it a part of level 5 / or merge it into level 4)</del> (becomes part of level 4)

Level 5: Pandora’s box => press “left”
  * Description: 
    * 
  * Available actions:
  * level_5.jpg (TODO)

Level 6: Reverse of level 1-4
  * Description: 
    * 
  * Available actions:
  * level_6.jpg (TODO)

Level 7: Reverse of level 0 but with “Don’t press ‘left’ to get out” or just EMPTY as level 0
  * Description: 
    * 
  * Available actions:
  * level_7.jpg (TODO)

Ending level: White screen with credits and gradually lead back to the menu
  * Description: 
    * 
  * Available actions:
  * level_end.jpg (TODO)

##7. Display
### Graphic (TODO)
Decision 1 | Decision 2
-----------|-----------------------
Pixelized scene and characters (FEZ / cave story style) - easier to draw but not sure how to do it | Create graphic with canvas on HTML - maybe tedious but webGL experience might help
  * Menu - The first page after loading the game
    * Title "don't" - will be changed to "do" if the player complete the game
    * Start - start the game at the first scene - the game has no storage of player's process
    * Credits
    * menuDraft.jpg (TODO)
  * Scene - Each level of the game
    * Tutorial - prompts that will appear at the top of the screen, also known as the Voice
    * Scene - the area in the middle of the screen that display the placement of objects in the level
    * Contol panel - a box in the bottom of the screen that contains buttons of actions. Player can interact with the game by pressing those buttons (which is active in current level)
    * generalSceneDraft.jpg (TODO)
  * Ending - The special kind of level (ending level) at the end of the game with animation in background
    * Credits - a list of contributors that can be consider as tutorial portion of Scene, the difference is this will keep scrolling until it reach the end and then the game should return to the menu
    * Scene - the area in the middle of the screen that display the placement of objects in the level
      * possible extension: Some easter eggs can be included
    * Contol panel - a box in the bottom of the screen that contains buttons of actions. Player can interact with the game by pressing those buttons. At this stage, all actions will be activated.
    * endingSceneDraft.jpg (TODO)

### Sound
Sound is not primary factor here due to my lack of experience
