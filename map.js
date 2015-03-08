var map = function (level) {
    // returns the map, which is a phaser's tilemap.
    var tilemap = game.add.tilemap('map', 16, 16, 800, 640);

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
        doors.forEach( function (door) {
            // jhtan! inside this function, you can play with each door of the
            // doors group.
            game.physics.arcade.enable(door);
            door.body.immovable = true;
            door.z = zindex++;

            // setting anchor to center, without changing position
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
                    this.shaking.direction -= 2*this.shaking.direction;
                    console.log(this.shaking.direction);

                    this.shaking.cooldown = 0;
                    this.body.angularVelocity = this.shaking.direction * 30;
                }
            };

            door.update = function () {
                this.isShaking = false;
                game.physics.arcade.overlap(this, level.cracker, shake, null, this);
                if (!this.isShaking) {
                    this.angularVelocity = this.rotation = 0;
                }
            };
        });

        return doors;
    };

    return tilemap
};
