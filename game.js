var lvl1 = (function () {
    var xPartition = 320;

    var preload = function () {
        // tilemap
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('floor', 'assets/floor.png');
        game.load.image('tileset', 'assets/tileset.png');
        game.load.image('wall', 'assets/wall.png');

        // furniture
        game.load.spritesheet('door', 'assets/door.png', 48, 80);

        // ppj
        game.load.spritesheet('cracker', 'assets/cracker.png', 48, 96);
        game.load.image('pear', 'assets/pear.png');

        // removing blury images
        game.stage.smoothed = false;
    };

    var create = function () {
        // Background color.
        game.stage.backgroundColor = '#eee';

        // Physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Sprites creation
        this.tilemap = map(this, xPartition);
        this.cracker = cracker(this);
        this.cursor = cursor();

        // this is a horrible patch: do not remove it, unless
        // you wanna fix cracker's overlapDoor conflict
        this.cracker.cursor = this.cursor;

        // creating doors
        this.doors = this.tilemap.parseDoors();

        // bringing to top things (below this line)
    };

    var update = function () {
    };

    // check the cracker.js file! the overlapDoor function ;)

    return {
        create : create,
        preload : preload,
        update : update
    };
})();

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
game.state.add('lvl1', lvl1);
game.state.start('lvl1');
