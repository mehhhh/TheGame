var parseSecres = function (level, tilemap, secreLayer) {
    var secres = game.add.group();
    tilemap.createFromTiles(1, -1, 'secre1',
                            secreLayer, secres);

    var update = function () {
        // the update function of a secre
    };

    secres.forEach( function (secre) {
        // jhtan! everything you do to the "secre" here, will happen to all the secres
        // in the secres phaser group. The update function is above....
        // defining too many update functions will make the game laggy
        game.physics.arcade.enable(secre);
        secre.update = update;

        secre.animations.add('walk', [0,1,2,1], 4, true);
        secre.animations.add('stand', [1]);
        secre.animations.play('stand');
    });

    return secres;
};
