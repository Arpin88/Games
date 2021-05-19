// 通用扩展
var ExternalFun = (function (_super) {
    function ExternalFun() {
        return _super.call(this, "ExternalFun") || this;
    }
    // 图片置灰
    ExternalFun.prototype.setImgGray = function (img) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var flilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [flilter];
    };
    // 补 0
    ExternalFun.prototype.add0 = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    };
    // 把level等级转化为1-5的星级
    ExternalFun.prototype.levelnumTo5lvl = function (levelnum) {
        return ((levelnum - 1) % 5 + 1);
    };
    // 清理
    ExternalFun.prototype.cleanArray = function (arr) {
        if (arr == null || arr.length <= 0)
            return;
        for (var i = arr.length - 1; i >= 0; i--) {
            var item = arr[i];
            if (item != null) {
                var parent = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i, 1);
        }
    };
    return ExternalFun;
}(IBaseView));
//# sourceMappingURL=ExternalFun.js.map