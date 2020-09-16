'use strict';

// Possible positions of content in a card
const CardPos = ["top", "topl", "topr", "mid", "midt", "midb", "bot", "botl", "botr", "all"];

// Card class represents one card.
// Every card should have a deck.
// Use deck.appendCard or deck.prependCard to make a card visible
class Card {
    constructor (data)
    {
        this.e = document.createElement("card");
        this.generateElements(data);
        this.e.style.left = "0px";
        this.e.style.top = "0px";
    }

    // Generate a card with basic text only
    static generateBasicCard (data, el)
    {
        let t = document.createElement("carea");
        t.className = "mid";
        t.innerText = data;
        el.appendChild(t);
    }

    // Generate a card with a simple error message.
    static generateErrorCard (el)
    {
        Card.generateBasicCard("Card Error: data", el);
    }

    // Generate an area of a card
    static generateCArea (data, carea, assetURL)
    {
        // Create and set area
        let area = document.createElement("carea");
        area.className = carea;

        // Create inner area text and images
        for (let i in data)
        {
            if (i == "style")
            {
                for (j in data.style) 
                    area.style[j] = data.style[j];
            }
            
            if (data[i].type == "text")
            {
                let e = document.createElement("ctext");

                e.innerText = data[i].text;

                for (let j in data[i].style)
                    e.style[j] = data[i].style[j];

                area.appendChild(e);

            }
            else if (data[i].type == "image")
            {
                let e = document.createElement("cimage");

                e.style.backgroundImage = "url(\"" + assetURL + data[i].image + "\")";
                
                for (let j in data[i].style)
                    e.style[j] = data[i].style[j];

                area.appendChild(e);
            }
        }

        return area;
    }

    // Generate a card with rich visuals
    static generateObjectCard (data, el)
    {
        // Generate card areas.
        for (let i in CardPos)
        {
            if (typeof data[CardPos[i]] == "object")
                el.appendChild(this.generateCArea(data[CardPos[i]], CardPos[i], data.assetURL));
        }
    }

    generateElements (data)
    {
        while(this.e.firstElementChild != null)
            this.e.firstElementChild.remove();

        switch (typeof data)
        {
            case "object":
                Card.generateObjectCard(data, this.e);
                break;
            case "string":
                Card.generateBasicCard(data, this.e);
                break;
            default:
                Card.generateErrorCard(this.e);
        }
    }

    setPos (p)
    {
        this.e.style.setProperty("--cpos", p);
    }
}
