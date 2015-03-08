var parseSysadmins = function (level, tilemap, sysadminLayer, phones) {
    var sysadmins = game.add.group();
    tilemap.createFromTiles(1, -1, 'sysadmin', sysadminLayer, sysadmins);

    sysadmins.forEach( function (sysadmin) {
        sysadmin.animations.add('walk', [0,1,2,3,4,3,2,1], 8, true);
        sysadmin.animations.play('walk');
        //phaser

        // giving to each sysadmin it's phone
        phones.forEach( function (phone) {
            if (phone.x > level.xPartition &&
                Math.abs(sysadmin.y - phone.y) <= 80) {
                sysadmin.phone = phone;
            }
        });

        var update = function () {
            if (this.phone.isRinging()) {
                // this.scale
            }
        };

    });

    return sysadmins;
};
