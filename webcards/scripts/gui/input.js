function customSelectValue (el) {
    var sel = el.getAttribute("selected");
        
    if(typeof sel != "undefined") {
        return el.children[parseInt(sel)].getAttribute("value");
    }

    return "";
}

function customSelectOption (el) {
    var sn = Array.prototype.indexOf.call(el.parentElement.children, el);
    var psn = el.parentElement.getAttribute("selected");

    if(typeof psn == "string")
        el.parentElement.children[parseInt(psn)].setAttribute("selected", false);

    if(typeof sn == "string")
        el.parentElement.setAttribute("selected", parseInt(sn));

    el.setAttribute("selected", true);
    el.parentElement.setAttribute("selected", parseInt(sn));
}

var InputFuncs = {
    createInput: function(type = "text", id) {
        var el = document.createElement("input");
        el.setAttribute("type", type);
        
        if(typeof id == "string")
            el.setAttribute("id", id);

        el.getValue = function () {
            return this.value;
        }

        return el;
    },

    inputLabel(text, id) {
        var el = document.createElement("label");
        el.innerText = text;
        if(typeof id == "string")
            el.setAttribute("for", id);
        return el;
    },

    colorInput: function(value, id) {
        var el = this.createInput("color", id);
        el.value = value;
        return el;
    },

    textInput: function(value, placeholder, id) {
        var el = this.createInput("text", id);
        el.setAttribute("placeholder", placeholder);
        el.value = value;
        return el;
    },

    numberInput: function(value, id) {
        var el = this.createInput("number", id);
        el.value = value;
        return el;
    },

    //To fix
    fileInput: function(value, id) {
        var el = this.createInput("file", id);
        
        el.value = value;
        
        el.setAttribute("data-files", "Choose a file");

        el.firstElementChild.onchange = function () {
            let text = "";
            switch (this.files.length) {
                case 0:
                    text = "Choose a file";
                    break;
                case 1:
                    text = "File: " + this.files[0].name;
                    break;
                default:
                    text = "Files: " + this.files[0].name + "...";
                    break;
            }
            el.setAttribute("data-files", text);
        }

        return el;
    },

    checkboxInput: function(checked = false, id) {
        var el = this.createInput("checkbox", false, id);
        if(checked)
            el.setAttribute("checked");
        return el;
    },

    radioInput: function(group, value, checked = false, id) {
        var el = this.createInput("radio", false, id);
        el.setAttribute("name", group);
        el.setAttribute("value", value);
        if(checked)
            el.checked = true;
        return el;
    },

    radioInputs: function(group, names, values, checked = 0, id) {

        let toWrap = [];

        for(let i = 0; i < values.length; i++) {
            toWrap.push(this.inputLabel(names[i], group+"-"+i));
            if(i == checked)
                toWrap.push(this.radioInput(group, values[i], true, group+"-"+i));
            else
                toWrap.push(this.radioInput(group, values[i], false, group+"-"+i));
            toWrap.push(document.createElement("br"));
        }

        var wrapper = this.wrapInputs("radio", ...toWrap);

        wrapper.getValue = function() {
            for(let i = 0; i < this.children.length; i++){
                if(this.children[i].checked)
                    return this.children[i].value;
            }
        };

        if(typeof id == "string")
            wrapper.setAttribute("id", id);

        return wrapper;
    },

    selectOption: function(text, value, selected) {
        var so = document.createElement("div");
        so.innerText = text;
        so.setAttribute("value", value);
        so.addEventListener("mousedown", customSelectOption.bind(null, so));

        if(selected === true)
            so.setAttribute("selected", true);

        return so
    },

    selectInput: function(names, values, id, select = 0) {
        var se = document.createElement("div");
        se.className = "input-select";
        se.setAttribute("tabindex", 0);
        se.setAttribute("selected", select);

        for(let i in names)
        {
            se.appendChild(this.selectOption(names[i], values[i], i == select));
        }

        if(typeof id == "string")
            se.setAttribute("id", id);
        
        var wrapper = this.wrapInputs("select", se);
        wrapper.getValue = customSelectValue.bind(null, se);
        wrapper.setAttribute("tabindex", 0);

        return wrapper;
    },

    wrapInputs: function(type, ...el) {

        var wrapper = document.createElement("div");
        wrapper.className = "input-container";
        wrapper.setAttribute("type", type);

        for(let i = 0; i < el.length; i++)
        {
            wrapper.appendChild(el[i]);
        }

        return wrapper;
    }
};

function Settings (settings = {}) {
    this.settings = settings;

    this.genSettings();
}

Settings.prototype = {
    getSettings: function() {
        var out = {};
        for(let key in this.settings) {

        }
    },

    putSettings: function (el) {
        for(let key in this.settings) {
            el.appendChild(this.settings[key]);
        }
    },

    genSettings: function() {
        for(let key in this.settings) {
            switch(this.settings[key].type) {
                case "radio":
                    this.settings[key] = inputFuncs.radioInputs(...this.settings[key].args);
                default:
                    if(typeof inputFuncs[this.settings[key].type+"Input"] != null)
                        this.settings[key] = inputFuncs[this.settings[key].type+"Input"](...this.settings[key].args);
            }
        }
    }
};