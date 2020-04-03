function MultiDrag() {
    this.del = false;
    this.drag = [];
    window.addEventListener("mousemove", this.update.bind(this));
    document.body.addEventListener("mouseleave", this.stopDraggingAll.bind(this));
}

MultiDrag.prototype = {
    addDragEl: function(el, ox, oy, px, py, pt) {
        if(this.del)
            return;

        el.style.transitionDuration = "0.04s";

        this.drag.push({
            e: el,
            osx: ox,
            osy: oy,
            prx: px,
            pry: py,
            ptd: pt
        });

        return this.drag.length - 1;
    },

    startDragging: function(mevent) {
        if(this.del)
            return;

        console.log(mevent);

        if(mevent.button != 0)
            return;

        let pos = mevent.target.getBoundingClientRect();

        return this.addDragEl(
            mevent.currentTarget,
            mevent.clientX - pos.left,
            mevent.clientY - pos.top,
            mevent.currentTarget.style.left,
            mevent.currentTarget.style.top,
            mevent.currentTarget.style.transitionDuration
        );
    },

    stopDragging: function(i) {
        this.del = true;

        if (i < 0 || i >= this.drag.length)
            return;
        
        this.drag[i].e.style.transitionDuration = this.drag[i].ptd;
        this.drag[i].e.style.left = this.drag[i].prx;
        this.drag[i].e.style.top = this.drag[i].pry;

        this.drag.splice(i, 1);

        this.del = false;
    },

    stopDraggingAll: function() {
        this.del = true;

        while (this.drag.length > 0) {
            this.drag[0].e.style.transitionDuration = this.drag[0].ptd;
            this.drag[0].e.style.left = this.drag[0].prx;
            this.drag[0].e.style.top = this.drag[0].pry;

            this.drag.shift();
        }

        this.del = false;
    },

    update: function(e) {
        for (let i = 0; i < this.drag.length && !this.del; i++) {
            this.drag[i].e.style.left = e.clientX - this.drag[i].osx + "px";
            this.drag[i].e.style.top = e.clientY - this.drag[i].osy + "px";
        }
    }
};