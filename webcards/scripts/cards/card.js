var CardPos = ["top", "topl", "topr", "mid", "midt", "midb", "bot", "botl", "botr", "all"];

// Card class represents one card.
// Every card should have a deck.
// Use deck.appendCard or deck.prependCard to make a card visible
function Card (data) {
    this.e = this.generateElements(data);
    this.e.style.left = "0px";
    this.e.style.top = "0px";
}

// Internal
Card.prototype = {
    // Main generation func
    generateElements: function (data) {
        switch (typeof data) {
            case "object":
                return this.generateObjectCard(data);
            case "string":
                return this.generateBasicCard(data);
        }
        let e = document.createElement("card");
        let t = document.createElement("carea");
        t.className = "mid";
        t.innerText = "Card Error: data";
        e.append(t);
        return e;
    },

    // Generate a card with basic text only
    generateBasicCard: function (data) {
        let e = document.createElement("card");
        let t = document.createElement("carea");
        t.className = "mid";
        t.innerText = data;
        e.appendChild(t);
        return e;
    },

    // Generate a card with rich visuals
    generateObjectCard: function (data) {
        let e = document.createElement("card");

        // Check for an asset URL
        if (typeof data.assetURL != "string") {
            data.assetURL = "";
        }

        // Set card styles
        for (let i in data.style) {
            e.style[i] = data.style[i];
        }

        // Generate card areas.
        for (let i in CardPos) {
            if (typeof data[CardPos[i]] == "object")
                e.appendChild(this.generateCArea(data[CardPos[i]], CardPos[i], data.assetURL));
        }
        
        return e;
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
    }

};