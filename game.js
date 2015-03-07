var lvl1 = (function () {

    var preload = function () {
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('floor', 'assets/floor.png');
        game.load.image('tileset', 'assets/tileset.png');
        game.load.image('cracker', 'assets/cracker.png');
        game.load.image('pear', 'assets/pear.png');
    };

    var create = function () {
        // Background color.
        game.stage.backgroundColor = '#eee';

        // Physics.
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

        // Cracker Sprite
        this.cracker = game.add.sprite(60, 560, 'cracker');
        this.cracker.anchor.set(0.5);
        this.cracker.scale.set(0.4);
        game.physics.arcade.enable(this.cracker);

        // Pear Sprite
//        for(var i=0; i<10; i++) {
            this.pear = game.add.sprite((Math.random()*1000)%800, (Math.random()*1000)%640, 'pear');
            this.pear.anchor.set(0.5);
            this.pear.scale.set(0.08);
//        }
        game.physics.arcade.enable(this.pear);

        this.cursor = game.input.keyboard.createCursorKeys();
        this.cursor.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursor.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.cursor.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.cursor.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.cursor.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
    };

    var update = function () {
        // Initial values.
        this.cracker.body.velocity.x = 0;
        this.cracker.body.velocity.y = 0;

        // Game keys.
        if(this.cursor.right.isDown || this.cursor.d.isDown) {
            this.cracker.body.velocity.x = 250;
        }
        if(this.cursor.left.isDown || this.cursor.a.isDown) {
            this.cracker.body.velocity.x = -250;
        }
        if(this.cursor.up.isDown || this.cursor.w.isDown) {
            this.cracker.body.velocity.y = -250;
        }
        if(this.cursor.down.isDown || this.cursor.s.isDown) {
            this.cracker.body.velocity.y = 250;
        }
        if(this.cursor.spacebar.isDown) {
            console.log('toc toc');
        }

        // Collision
        game.physics.arcade.overlap(this.cracker, this.pear, function () {
            console.log('epa!');
        }, null, this);

        game.physics.arcade.collide(this.cracker, this.tilemap.floor);
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
