(function ($) {
    $.fn.showLinkLocation = function () {
        this.filter("a").append(function () {
            return " (" + this.href + ")";
        });

        return this;
    };

}(jQuery));