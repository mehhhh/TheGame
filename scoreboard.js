var scoreboard = function () {
    var style = { font: '15px Monospace', fill: '#000', align: 'left' };
    var text = game.add.text(18, 18, '', style);
    text.money = 0;
    text.data = 0;

    text.update = function () {
        this.text = 'MONEY: ' + this.money +
            '\nDATA:  ' + this.data;
    };

    text.winMoney = function (qty) {
        this.money += qty;
    };

    text.winData = function (qty) {
        this.data += qty;
    };

    return text;
};
