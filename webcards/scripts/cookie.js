function CookieManager() {
}

CookieManager.prototype = {
    getCookie: function(name){
        let cookies = document.cookie.split(";");
        for(let i in cookies) {
            let cname = cookies[i].trim().split("=")[0];
            if(cname == name){
                return cookies[i].trim().slice(name.length + 1);
            }
        }
        return "";
    },

    setCookie: function(name, value, data={}) {
        let extra = "";

        for(let key in data)
        {
            extra += "; " + key + "=" + data[key];
        }

        document.cookie = name + "=" + value + extra;
    },

    setYearCookie: function(name, value) {
        var date = new Date(Date.now());
        date.setFullYear(date.getFullYear() + 1);
        this.setCookie(name, value, {expires: date.toUTCString()});
    },

    removeCookie: function(name) {
        var date = new Date(0);
        this.setCookie(name, "", {expires: date.toUTCString()});
    }
};

var Cookies = new CookieManager();