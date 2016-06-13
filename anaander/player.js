var Player = (function () {
    function Player(color, baseMeeple) {
        this.color = color;
        this.state = State.Front;
        this.meeples.push(baseMeeple);
    }
    Player.prototype.move = function (direction) {
    };
    return Player;
}());
//# sourceMappingURL=player.js.map