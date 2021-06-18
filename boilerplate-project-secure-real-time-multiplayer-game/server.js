require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const helmet = require('helmet');
//const noCache = require('nocache');
const nanoid = require('nanoid').nanoid;
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

// Security Settings
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({
  setTo: 'PHP 7.4.3'
}));
/*app.use(helmet({
  noSniff: true,
  xssFilter: true,
  noCache: true,
  hidePoweredBy: {
    setTo: 'PHP 7.4.3',
  }
}));
//app.use(noCache());
//*/

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Socket.io Setup
const io = socket(server);
const Collectible = require('./public/Collectible.mjs');

// Field constraints
const fieldMinX = 5;
const fieldMaxX = 635;
const fieldMinY = 45;
const fieldMaxY = 475;

const randomPos = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let playerList = [];
let collectedItems = [];

// Create new collectible item
const createTarget = () => {
  let target = new Collectible({
    id: nanoid(),
    value: 1, //Math.floor((Math.random() * 3) + 1), // value
    x: randomPos(fieldMinX + 25, fieldMaxX - 25), // 640 canvas, 25 item
    y: randomPos(fieldMinY + 25, fieldMaxY - 25)  // 480 canvas, 25 item
  })
  return target;
}

let target = createTarget();
// -------
io.on('connection', (socket) => {
  console.log('New client connection:', socket.id);
  socket.emit('join-game', { id: socket.id, players: playerList, target });

  socket.on('new-player', (player) => {
    // Update server-side player list
    playerList.push(player);

    // Broadcast updated player list to other clients
    socket.broadcast.emit('new-player', player);
    //console.log('Broadcasting new ID:', player.id);
  });

  socket.on('move-player', (dir, currPos) => {
      //console.log('Move Pos for:', socket.id, dir, currPos.x, currPos.y)
      const movePlayer = playerList.find(player => player.id === socket.id);
      if (movePlayer) {
        movePlayer.x = currPos.x;
        movePlayer.y = currPos.y;

      io.emit('move-player', {id: socket.id, dir, newPos: {x: movePlayer.x, y: movePlayer.y}});
    };
  });

  socket.on('stop-player', (dir, currPos) => {
    //console.log('Stop Pos for:', socket.id, dir, currPos.x, currPos.y)
    const stopPlayer = playerList.find(player => player.id === socket.id);
    if (stopPlayer) {
      stopPlayer.x = currPos.x;
      stopPlayer.y = currPos.y;

      io.emit('stop-player', {id: socket.id, dir, stopPos: {x: stopPlayer.x, y: stopPlayer.y}});
    };
  });

  socket.on('remove-item', ({ collector, id, value }) => {
    //console.log(`Item ${id} collected by ${collector}`);
    // Stop duplicate scoring
    if (!collectedItems.includes(id)) {
      // update player score
      const scoringPlayer = playerList.find(player => player.id === collector);
      //console.log('Original Score:', scoringPlayer)
      
      scoringPlayer.score += value;
      //console.log('New Score:', scoringPlayer)
      // Add item to collection
      collectedItems.push(id);
      // Broadcast score update to everyone
      //console.log('Player List:', playerList)
      io.emit('update-score', scoringPlayer);

      // Create and send new target
      target = createTarget();
      io.emit('new-target', target);
    }
  })

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
    // Broadcast that player left
    socket.broadcast.emit('remove-player', socket.id);
    // Update server-side player list
    playerList = playerList.filter(player => player.id !== socket.id);
    //console.log('Client left, updated list:', playerList);
  });
});

module.exports = app; // For testing
