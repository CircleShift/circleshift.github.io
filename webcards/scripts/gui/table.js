// Table represents and manages the actual game.  It accepts inputs from the server and tries to queries the server when the player makes a move.
function Table(el, soc) {
    this.root = el;
    this.soc = soc;
}

Table.prototype = {
    
    openTable: function(){
        let state = this.root.getAttribute("state")
        if((state == "close" || state == "closed") && state != "") {
            this.root.setAttribute("state", "closed");
            setTimeout(this.root.setAttribute.bind(this.root), 50, "state", "open");
        }
    },

    closeTable: function(){
        let state = this.root.getAttribute("state")
        if(state != "close" && state != "closed") {
            this.root.setAttribute("state", "");
            setTimeout(this.root.setAttribute.bind(this.root), 50, "state", "close");
        }
    },

    

    handleClose: function() {
        this.reset();
    },

    reset: function() {
        this.closeTable();
    }
}