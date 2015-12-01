/* Preloading Path js */

;(function (window) {
    
    'use strict';
    
    function PathLoader (el) {
        this.el = el;
        //清除描边
        this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
    };

    PathLoader.prototype._draw = function (val) {
        this.el.style.strokeDashoffset = this.el.getTotalLength()*(1-val);
    };

    PathLoader.prototype.setProgress = function (val, callback) {
        this._draw(val);
        if(callback && typeof callback === 'function') {
            //给它一个时间（最理想地是与transition 时间相同）,
            //便于最后的进度增加动画仍然可见。
            setInterval(callback, 200);
        }
    };

    PathLoader.prototype.setProgressFn = function (fn) {
        if( typeof fn === 'function') {
            fn(this);
        }
    };
    //添加到全局命名空间
    window.PathLoader = PathLoader;
})(window);

