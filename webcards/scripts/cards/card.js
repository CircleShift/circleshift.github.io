const CardPos = ["top", "topl", "topr", "mid", "midt", "midb", "bot", "botl", "botr", "all"];

// Card class represents one card.
// Every card should have a deck.
// Use deck.appendCard or deck.prependCard to make a card visible
function Card (data) {
    this.e = document.createElement("card");
    this.generateElements(data);
    this.e.style.left = "0px";
    this.e.style.top = "0px";
}

// Internal
Card.prototype = {
    // Main generation func, only for use in contructor
    generateElements: function (data) {
        while(this.e.firstElementChild != null)
            this.e.firstElementChild.remove();

        switch (typeof data) {
            case "object":
                this.generateObjectCard(data, this.e);
                break;
            case "string":
                this.generateBasicCard(data, this.e);
                break;
            default:
                this.generateErrorCard(this.e);
        }
    },

    // Generate a card with basic text only
    generateBasicCard: function (data, el) {
        let t = document.createElement("carea");
        t.className = "mid";
        t.innerText = data;
        el.appendChild(t);
    },

    // Generate a card with rich visuals
    generateObjectCard: function (data, el) {

        // Check for an asset URL
        if (typeof data.assetURL != "string") {
            data.assetURL = "";
        }

        // Set card styles
        for (let i in data.style) {
            el.style[i] = data.style[i];
        }

        // Generate card areas.
        for (let i in CardPos) {
            if (typeof data[CardPos[i]] == "object")
                el.appendChild(this.generateCArea(data[CardPos[i]], CardPos[i], data.assetURL));
        }
    },

    generateCArea: function (data, carea, assetURL) {
        // Create and set area
        let area = document.createElement("carea");
        area.className = carea;

        // Create inner area text and images
        for (let i in data) {
            if (i == "style")
                for (j in data.style) 
                    area.style[j] = data.style[j];
            
            if (data[i].type == "text") {
                let e = document.createElement("ctext");

                e.innerText = data[i].text;

                for (let j in data[i].style) {
                    e.style[j] = data[i].style[j];
                }

                area.appendChild(e);

            } else if (data[i].type == "image") {
                let e = document.createElement("cimage");

                e.style.backgroundImage = "url(\"" + assetURL + data[i].image + "\")";
                
                area.appendChild(e);
            }
        }

        return area;
    },

    generateErrorCard: function(el)
    {
        this.generateBasicCard("Card Error: data", el);
    }
};