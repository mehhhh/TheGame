var map = function (level, xPartition) {
    // returns the map, which is a phaser's tilemap.
    var tilemap = game.add.tilemap('map', 16, 16, 800, 640),
        i, j, distance;

    tilemap.addTilesetImage('tileset');
    tilemap.addTilesetImage('floor');
    tilemap.addTilesetImage('wall');

    // "promise of a door" layer
    tilemap.door = tilemap.createLayer('door');

    // background layer
    tilemap.background = tilemap.createLayer('background');

    // collision layer
    tilemap.floor = tilemap.createLayer('collide');
    game.physics.arcade.enable(tilemap.floor);
    tilemap.setCollisionByExclusion([], true, tilemap.floor);

    tilemap.parseDoors = function () {
        var doors = game.add.group();
        this.createFromTiles(1, -1, 'door', this.door, doors);

        var zindex = 0;
        var doorVec = [];
        doors.forEach( function (door) {
            // jhtan! inside this function, you can play with each door of the
            // doors group.
            doorVec.push(door);
            game.physics.arcade.enable(door);
            door.body.immovable = true;
            door.z = zindex++;

            // setting anchor to center, without changing position
            // I need the anchor at the center, because it looks awesome
            // on the rotation effect
            door.x += door.width * .5;
            door.y += door.height * .5;
            door.anchor.set(.5, .5);

            door.shaking = {
                delay: 20,
                cooldown: 10,
                direction: -1
            };

            // i know this sucks DX let's fix it later
            var shake = function () {
                this.isShaking = true;
                if (this.shaking.cooldown++ >= door.shaking.delay) {
                    // math magic to alternate between -1 and 1
                    // i have tested it... it DO work.
                    this.shaking.direction -= 2*this.shaking.direction;

                    this.shaking.cooldown = 0;
                    this.body.angularVelocity = this.shaking.direction * 30;
                }
            };

            door.isOnTheSameRoomThan = function (anotherDoor) {
                return (this.x < xPartition && anotherDoor.x < xPartition) ||
                    (this.x > xPartition && anotherDoor.x > xPartition);
            };

            door.update = function () {
                this.isShaking = false;
                game.physics.arcade.overlap(this, level.cracker, shake, null, this);
                if (!this.isShaking) {
                    this.angularVelocity = this.rotation = 0;
                }
            };
        });

        // setting links with bruteforce, because the hell with it!
        for (i of doorVec) {
            for (j of doorVec) {
                if (i !== j && i.isOnTheSameRoomThan(j)) {
                    yDistance = i.y - j.y;
                    if (Math.abs(yDistance) <= 176) { // this stinks
                        if (yDistance < 0) {
                            i.down = j;
                            j.up = i;
                        } else {
                            i.up = j;
                            j.down = i;
                        }
                    }
                }
            }
        }

        return doors;
    };

    return tilemap
};
