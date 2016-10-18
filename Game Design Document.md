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
You as the main character is exploring a “cave” with a voice giving guidance such as “don’t do this” and “don’t do that” to proceed. However, when you get to the end of the “cave”, the voice disappear / does not help (either way to lead to different interpretation of the thought behind the story). In an occassion, you realise that there is one guidance that the voice has not told you, which is “don’t comply the voice”. And this final guidance will take you out of the “cave”. <br><br>

**Idea Behind the Story:**<br>
The game is about the process of growth. At the beginning, there was a voice telling YOU not to do something because it is dangerous for YOU. YOU follow the voice and went through YOU childhood in peace. Until one day, following the voice does not help YOU overcome the obstacles. And YOU seek for change: not to follow the voice, which eventually take you to the place that YOU couldn’t reach before.

## Characters:
### YOU
  main character
### The Voice
  not really a character but rather a tutorial often seen in the first level of many games
### Monsters 
  enemy that is invincible

## Gameplay:
* Typical 2D scrolling
* Player control the character to interact with the environment
* control: buttons that indicate “up” / “down” / “left” / “right” / “touch” / “jump”

## Level Design
General: Each level should be consisted with a guidance for the level (how to perform a certain move), mechanism that needs the player to follow the guidance and other mechanisms from previous level (the level becomes complex gradually)

Level 0: EMPTY

Level 1: Don’t press “jump” to jump

Level 2: Don’t press “up” to climb

Level 3: Don’t press “down” to get down

Level 4: Don’t press  “touch” to interact with anything

Level 4.5 (??): an inter-level which requires player to utilize all the actions without accompanying of the voice (or just make it a part of level 5 / or merge it into level 4)

Level 5: Pandora’s box => press “left”

Level 6: Reverse of level 1-4

Level 7: Reverse of level 0 but with “Don’t press ‘left’ to get out” or just EMPTY as level 0

Ending level: White screen with credits and gradually lead back to the menu

## Graphic:
Pixelized scene and characters (FEZ / cave story style) - easier to draw
Scene - 
