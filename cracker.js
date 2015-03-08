// returns a cracker (who is a sprite).
var cracker = function (level) {
    var sprite = game.add.sprite(60, 416, 'cracker');

    sprite.anchor.set(0.5);
    sprite.speed = 100;
    sprite.animations.add('walk', [1,0,2,0], 3, true);
    sprite.animations.play('walk');
    game.physics.arcade.enable(sprite);

    // updates the motion of the cracker.
    sprite.motion = function () {
        // Initial values.
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // Game keys.
        switch (true) {
        case level.cursor.isDown('right'):
            this.body.velocity.x += this.speed;
            this.scale.set(1,1);
            break;
        case level.cursor.isDown('left'):
            this.body.velocity.x -= this.speed;
            this.scale.set(-1,1);
            break;
        case level.cursor.isDown('down'):
            this.body.velocity.y += this.speed;
            break;
        case level.cursor.isDown('up'):
            this.body.velocity.y -= this.speed;
            break;
        default: break;
        }
    };

    sprite.collisions = function () {
        game.physics.arcade.collide(this, level.tilemap.floor);
    };

    // update is now a member of an sprite object. Phaser will automagically
    // call it on every update cycle.
    sprite.update = function () {
        this.bringToTop();
        this.motion();
        this.collisions();
    };

    return sprite;
};
