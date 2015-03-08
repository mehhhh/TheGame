var someone = function (level, x, y) {
    var sprite = game.add.sprite(x, y, 'secre' + randomBetween(0,1));
    sprite.animations.add('walk', [0,1,2,1], 3, true);
    sprite.animations.add('stand', [1]);

    sprite.isMoving = function () {
        return this.body.velocity.x !== 0;
    };

    sprite.update = function () {

    };
};
