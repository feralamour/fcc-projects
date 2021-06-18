# [Secure Real Time Multiplayer Game](https://www.freecodecamp.org/learn/information-security/information-security-projects/secure-real-time-multiplayer-game)

## Tasks
Required modules: Socket.io, Helmet v3.21.3, HTML Canvas API

Develop a 2D real time multiplayer game using the HTML Canvas API and Socket.io. Secure the server using Helmet.

**Note:** helmet@^3.21.3 is needed for the user stories. This means you will need to use the previous version of Helmet's docs, for information on how to achieve the user stories.

**SECURITY:**
- Prevent the client from trying to guess / sniff the MIME type.
- Prevent cross-site scripting (XSS) attacks.
- Nothing from the website is cached in the client.
- The headers say that the site is powered by "PHP 7.4.3" (even though it isn't)

Roadmap:
- ~~Build base game board~~

- Set up socket connections
  - ~~Multiple players can connect to a server and play~~
  - ~~Players can disconnect from the game at any time~~
  - All players are kept in sync

- ~~Create function for random spawn positions~~

- ~~Create player object~~
  - ~~Each player has an avatar~~
  - ~~Each player is represented by an object created by the Player class in Player.mjs~~
  - ~~At a minimum, each player object should contain a unique id, a score, and x and y coordinates representing the player's current position~~

- ~~Create collectible object~~
  - ~~The game has at least one type of collectible item. Complete the Collectible class in Collectible.mjs to implement this~~
  - ~~At a minimum, each collectible item object created by the Collectible class should contain a unique id, a value, and x and y coordinates representing the item's current position~~

- ~~Create movement method for players~~
  - ~~Players can use the WASD and/or arrow keys to move their avatar. Complete the movePlayer method in Player.mjs to implement this~~
  - ~~The movePlayer method should accept two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. movePlayer should adjust the x and y coordinates of the player object it's called from~~

- ~~Create collision method for object collection~~
  - ~~Players can collide with a collectible item. Complete the collision method in Player.mjs to implement this~~
  - ~~The collision method should accept a collectible item's object as an argument. If the player's avatar intersects with the item, the collision method should return true~~

- Create scoring/dynamic ranking system
  - The player's score should be used to calculate their rank among the other players. Complete the calculateRank method in the Player class to implement this
  - The calculateRank method should accept an array of objects representing all connected players and return the string Rank: currentRanking/totalPlayers. For example, in a game with two players, if Player A has a score of 3 and Player B has a score of 5, calculateRank for Player A should return Rank: 2/2

- ~~Add Security~~
  - ~~Prevent the client from trying to guess / sniff the MIME type~~
  - ~~Prevent cross-site scripting (XSS) attacks~~
  - ~~Nothing from the website is cached in the client~~
  - ~~site is powered by "PHP 7.4.3" even though it isn't (as a security measure)~~

- Find friends to test game with (or use multiple browsers)

## User Stories
Multiple players can connect to a server and play.

Each player has an avatar.

Each player is represented by an object created by the Player class in Player.mjs.

At a minimum, each player object should contain a unique id, a score, and x and y coordinates representing the player's current position.

The game has at least one type of collectible item. Complete the Collectible class in Collectible.mjs to implement this.

At a minimum, each collectible item object created by the Collectible class should contain a unique id, a value, and x and y coordinates representing the item's current position.

Players can use the WASD and/or arrow keys to move their avatar. Complete the movePlayer method in Player.mjs to implement this.

The movePlayer method should accept two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. movePlayer should adjust the x and y coordinates of the player object it's called from.

The player's score should be used to calculate their rank among the other players. Complete the calculateRank method in the Player class to implement this.

The calculateRank method should accept an array of objects representing all connected players and return the string Rank: currentRanking/totalPlayers. For example, in a game with two players, if Player A has a score of 3 and Player B has a score of 5, calculateRank for Player A should return Rank: 2/2.

Players can collide with a collectible item. Complete the collision method in Player.mjs to implement this.

The collision method should accept a collectible item's object as an argument. If the player's avatar intersects with the item, the collision method should return true.

All players are kept in sync.

Players can disconnect from the game at any time.

Prevent the client from trying to guess / sniff the MIME type.

Prevent cross-site scripting (XSS) attacks.

Nothing from the website is cached in the client.

The headers say that the site is powered by "PHP 7.4.3" even though it isn't (as a security measure).