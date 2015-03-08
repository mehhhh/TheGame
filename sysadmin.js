var parseSysadmins = function (level, tilemap, sysadminLayer, phones) {
    var sysadmins = game.add.group();
    sysadmins.speed = 100;
    tilemap.createFromTiles(1, -1, 'sysadmin', sysadminLayer, sysadmins);

    var update = function () {
        if (this.phone && this.phone.isRinging()) {
            this.scale.set(generic.getXDirection(this, this.phone), 1);
            this.body.velocity.x = this.scale.x * sysadmins.speed;
            this.animations.play('walk');
        } else {
            this.body.velocity.x = 0;
            this.animations.play('stand');
        }
    };

    sysadmins.forEach( function (sysadmin) {
        sysadmin.animations.add('walk', [0,1,2,3,4,3,2,1], 8, true);
        sysadmin.animations.add('stand', [2]);
        game.physics.arcade.enable(sysadmin);
        sysadmin.update = update;
        generic.silentlySetAnchor(sysadmin);

        // giving to each sysadmin it's phone
        phones.forEach( function (phone) {
            if (phone.x > level.xPartition &&
                Math.abs(sysadmin.y - phone.y) <= 80) {
                sysadmin.phone = phone;
            }
        });

    });

    return sysadmins;
};
