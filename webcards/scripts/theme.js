function Theme(){
    this.t = document.getElementById("theme");
}

Theme.prototype = {
    init: function() {
        if(Cookies.getCookie("theme") == ""){
            Cookies.setYearCookie("theme", "styles/themes/colors-base.css");
        }
    },

    restore: function() {
        this.init();
        this.t.setAttribute("href", Cookies.getCookie("theme") + "?v=" + Date.now());
    },

    set: function(sheet) {
        Cookies.setYearCookie("theme", sheet);
        this.restore();
    }
};

var GlobalTheme = new Theme();
GlobalTheme.restore();
