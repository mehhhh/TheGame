var randomBetween = function (max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// 528 y
var spawner = function (direction, x, y) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.max = 600;
    this.min = 300;

    this.setCooldown();
};

spawner.prototype.setCooldown = function () {
    this.cooldown = randomBetween(this.max, this.min);
};

spawner.prototype.update = function () {
    if (this.cooldown === 0) {

    }
};

spawner.prototype.spawn = function () {

};
