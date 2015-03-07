var lvl1 = (function () {
    var preload = function () {
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('floor', 'assets/floor.png');
        game.load.image('tileset', 'assets/tileset.png');
    };

    var create = function () {
        game.stage.backgroundColor = '#eee';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.tilemap = game.add.tilemap('map', 16, 16, 800, 640);
        this.tilemap.addTilesetImage('tileset');
        this.tilemap.addTilesetImage('floor');

        // background layer
        this.tilemap.background = this.tilemap.createLayer('background');

        // collision layer
        this.tilemap.floor = this.tilemap.createLayer('collide');
        game.physics.arcade.enable(this.tilemap.floor);
        this.tilemap.setCollisionByExclusion([], true, this.tilemap.floor);
    };

    var update = function () {
        // game.physics.arcade.collide(yoursprite, this.tilemap.floor);
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
