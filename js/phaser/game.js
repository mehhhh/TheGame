var lvl1 = (function () {

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
    };

    var create = function () {
        // Background color.
        game.stage.backgroundColor = '#eee';

        // Physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Sprites creation
        this.tilemap = map(this);
        this.cracker = cracker(this);
        this.cursor = cursor();

        // creating doors
        this.doors = this.tilemap.parseDoors();

        // bringing to top things (below this line)
    };

    var update = function () {
    };

    var crackerOverlapDoor = function (cracker, door) {
        console.log(door.z);
        if(door.z === 7) {
            this.cracker.x = 250;
            this.cracker.y = 50;
        }
    };

    return {
        create : create,
        preload : preload,
        update : update
    };
})();

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
game.state.add('lvl1', lvl1);
game.state.start('lvl1');
