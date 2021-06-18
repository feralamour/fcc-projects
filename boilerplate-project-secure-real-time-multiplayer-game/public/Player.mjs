class Player {
  constructor({x, y, score = 0, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.speed = 5;
    this.move = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.w = 40;
    this.h = 40;
  }

  draw(context, img, players, target, playerId) {
    //console.log('Draw Player List:', players)
    // Draw Rank
    if (playerId === this.id) {
      //console.log('Score List:', playerList)
      context.font = "12px 'Press Start 2P'";
      context.textAlign = 'right';
      context.fillText(this.calculateRank(players), 630, 30);

      // Draw player avatars
      context.drawImage(img.playerAvatar, this.x, this.y, this.w, this.h);
    } else {
      // Draw player avatars
      context.drawImage(img.opponentAvatar, this.x, this.y, this.w, this.h);
    }
    // Player Movements
    let movements = Object.keys(this.move).filter(dir => this.move[dir])
    movements.forEach(dir => this.movePlayer(dir, this.speed));

    // Collision
    if (this.collision(target)) {
      //console.log(`Item ${target.id} collected by ${this.id}`);
      target.collectedBy = this.id;
    }
  }

  startMove(dir) {
    if(dir) {
      this.move[dir] = true;
      //console.log('New Movements:', this.move);
    }
  }

  stopMove(dir) {
    if (dir) {
      this.move[dir] = false;
      //console.log('Stop Movements:', this.move)
    }
  }

  movePlayer(dir, speed) {
    // Field constraints
    let fieldMinX = 5;
    let fieldMaxX = 640 - 5;
    let fieldMinY = 45;
    let fieldMaxY = 480 - 5;

    if (dir === 'up') this.y - speed >= fieldMinY ? this.y -= speed : this.y -= 0;
    if (dir === 'left') this.x - speed >= fieldMinX ? this.x -= speed : this.x -= 0;
    if (dir === 'down') this.y + speed <= fieldMaxY - this.h ? this.y += speed : this.y += 0;
    if (dir === 'right') this.x + speed <= fieldMaxX - this.w ? this.x += speed : this.x += 0;
  }

  collision(item) {
    //console.log('Item:', item)
    if ((this.y + this.h > item.y) &&
        (this.y < item.y + item.h) &&
        (this.x + this.w > item.x) &&
        (this.x < item.x + item.w)) {
          //console.log('Collision detected!')
          return true;
    }
    //*/
  }

  calculateRank(arr) {
    const sorted = arr.sort((a, b) => {
      return b.score - a.score;
    });
    //console.log('Sorted Array:', sorted)
    const playerRank = arr.length === 1 || this.score === 0 ? arr.length : sorted.findIndex((player) => player.id === this.id) + 1;

    return `Rank: ${playerRank} / ${arr.length}`
  }
}

export default Player;