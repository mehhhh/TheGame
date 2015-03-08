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

        return doors;
    };

    return tilemap
};
