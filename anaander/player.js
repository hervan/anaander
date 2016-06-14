var Player = (function () {
    function Player(color, baseMeeple) {
        this.color = color;
        this.state = true;
        this.meeples = new Array();
        this.meeples.push(baseMeeple);
    }
    Player.prototype.move = function (direction) {
        var _this = this;
        this.state = !this.state;
        this.meeples.forEach(function (meeple) {
            meeple.move(_this, direction);
        });
    };
    return Player;
}());
//# sourceMappingURL=player.js.map