var inputFuncs = {
    createInput: function(type = "text", wrapped = false, id) {
        var el = document.createElement("input");
        el.setAttribute("type", type);
        
        if(typeof id == "string")
            el.setAttribute("id", id);

        if(wrapped) {
            var wrapper = document.createElement("div");
            wrapper.className = "input-container";
            wrapper.setAttribute("type", type);
            wrapper.setAttribute("onclick", "this.firstElementChild.click()");
            wrapper.appendChild(el);
            wrapper.input = el;
            return wrapper;
        }

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
        var el = this.createInput("color", true, id);
        el.value = value;
        return el;
    },

    textInput: function(value, placeholder, id) {
        var el = this.createInput("text", false, id);
        el.setAttribute("placeholder", placeholder);
        el.value = value;
        return el;
    },

    numberInput: function(value, id) {
        var el = this.createInput("number", false, id);
        el.value = value;
        return el;
    },

    fileInput: function(value, id) {
        var el = this.createInput("file", true, id);
        
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

    radioInputs: function(group, names, values, checked = 0) {
        var wrapper = document.createElement("div");
        wrapper.className = "input-container";
        wrapper.setAttribute("type", "radio");
        
        wrapper.getValue = function() {
            for(let i = 0; i < this.children.length; i++){
                if(this.children[i].checked)
                    return this.children[i].value;
            }
        };

        for(let i = 0; i < values.length; i++) {
            wrapper.appendChild(this.inputLabel(names[i], group+"-"+i));
            if(i == checked)
                wrapper.appendChild(this.radioInput(group, values[i], true, group+"-"+i));
            else
                wrapper.appendChild(this.radioInput(group, values[i], false, group+"-"+i));
            wrapper.appendChild(document.createElement("br"));
        }

        return wrapper;
    },

    wrapInput: function(el) {
        
    }
};

function Settings () {
    this.settings = {
        username: {
            type: "text",
            args: [Math.floor(Math.random() * 100000), "Username", "userName"]
        }
    };

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