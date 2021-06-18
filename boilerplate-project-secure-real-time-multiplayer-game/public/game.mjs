import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

// Draw images
const loadImage = src => {
  const img = new Image();
  img.src = src;
  return img;
};

const playerAvatar = loadImage('../assets/white-mouse.png');
const opponentAvatar = loadImage('../assets/dark-mouse.png');
//const carrot = loadImage('../assets/carrot.png');
const cheese = loadImage('../assets/cheese.png');
//const fruit = loadImage('../assets/fruit.png');

// Field constraints
const fieldMinX = 5;
const fieldMaxX = canvas.width - 5;
const fieldMinY = 45;
const fieldMaxY = canvas.height - 5;

let playerList = [];
let item;

socket.on('join-game', ({ id, players, target }) => {
  console.log('Connected:', id)
  //console.log('Current Players:\n', players);

  let player = new Player({
    id: socket.id,
    x: randomPos(fieldMinX + 40, fieldMaxX - 40),
    y: randomPos(fieldMinY + 40, fieldMaxY - 40)
    //score: 0 //Math.floor((Math.random() * 4)) // for testing
  });

  // Send new player to server
  socket.emit('new-player', player);

  socket.on('new-player', (newPlayer) => {
    //console.log('Received new ID:', newPlayer.id);
    // Make sure new player is listed
    let currentPlayers = playerList.map(player => player.id);
    if (!currentPlayers.includes(newPlayer.id)) {
      playerList.push(new Player(newPlayer));
    }
    //console.log('Verified player list:', playerList);
  });

  socket.on('move-player', ({id, dir, newPos}) => {
    //console.log('Move Player:', id, dir, newPos)
    const movePlayer = playerList.find(player => player.id === id);
    movePlayer.startMove(dir);

    // Force sync
    movePlayer.x = newPos.x;
    movePlayer.y = newPos.y;
  })

  socket.on('stop-player', ({id, dir, stopPos}) => {
    //console.log('Stop Player:', id, dir, stopPos)
    const stopPlayer = playerList.find(player => player.id === id);
    stopPlayer.stopMove(dir);

    // Force sync
    stopPlayer.x = stopPos.x;
    stopPlayer.y = stopPos.y;
  })

  socket.on('update-score', (scorer) => {
    const scoringPlayer = playerList.find(player => player.id === scorer.id);
    //console.log('Player original score:', scoringPlayer.id, scoringPlayer.score)
    // Sync scores
    scoringPlayer.score = scorer.score;
    //console.log('Player scored:', scoringPlayer);
    //console.log('Player List:', playerList)
  })

  socket.on('new-target', (newTarget) => {
    // Create new target
    item = new Collectible(newTarget);
  })

  socket.on('remove-player', (id) => {
    // Remove player from player list
    playerList = playerList.filter(player => player.id !== id);
    //console.log('Player left, updated list:\n', playerList);
  });

  // Sync player list and item with client
  playerList = players.map(currPlayer => new Player(currPlayer)).concat(player)
  //console.log('Updated player list:\n', playerList);
  item = new Collectible(target);

  draw();
});

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw playing field
  context.fillStyle = '#2B2B2B';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'white';
  context.strokeRect(5, 45, canvas.width - 10, canvas.height - 50);
  
  // Title Bar
  context.fillStyle = '#D4D4D4';
  context.font = "20px 'Press Start 2P'";
  context.textAlign = 'center';
  context.fillText("Nom Nom Nom", canvas.width / 2, 32);
  // Instructions
  context.font = "12px 'Press Start 2P'";
  context.textAlign = 'left';
  context.fillText('Controls: WASD', 10, 30);
  // ----

  // Draw Players
  //console.log('Draw Players:', playerList)
  playerList.forEach(player => {
    player.draw(context, {playerAvatar, opponentAvatar}, playerList, item, socket.id);
  })

  // Draw Collectible
  item.draw(context, cheese);
  
  // Remove Collectible
  if (item.collectedBy) {
    //console.log(`Item ${item.id} collected by ${item.collectedBy}`);
    socket.emit('remove-item', { collector: item.collectedBy, id: item.id, value: item.value })
  }

  // Draw animations
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
  let player = playerList.find(player => player.id === socket.id);
  let dir = e.key;

  if (e.key === 'w' || e.key === 'ArrowUp') { // w or up arrow
    dir = 'up';
  };
  if (e.key === 'a' || e.key === 'ArrowLeft') { // a or left arrow
    dir = 'left';
  };
  if (e.key === 's' || e.key === 'ArrowDown') { // s or down arrow
    dir = 'down';
  };
  if (e.key === 'd' || e.key === 'ArrowRight') { // d or right arrow
    dir = 'right';
  };


  if (dir) {
    //console.log(dir, 'key was pressed by', player.id)
    socket.emit('move-player', dir, {x: player.x, y: player.y});
    //console.log('Dir:', player.dir)
  }

})

document.addEventListener('keyup', (e) => {
  let player = playerList.find(player => player.id === socket.id);
  let dir = e.key;

  if (e.key === 'w' || e.key === 'ArrowUp') { // w or up arrow
    dir = 'up';
  };
  if (e.key === 'a' || e.key === 'ArrowLeft') { // a or left arrow
    dir = 'left';
  };
  if (e.key === 's' || e.key === 'ArrowDown') { // s or down arrow
    dir = 'down';
  };
  if (e.key === 'd' || e.key === 'ArrowRight') { // d or right arrow
    dir = 'right';
  };

  if (dir) {
    //console.log(dir, 'key was released by', player.id);
    socket.emit('stop-player', dir, {x: player.x, y: player.y});
  }
})

const randomPos = (min, max) => {
  // Random number generator
    return Math.floor(Math.random() * (max - min) + min);
}