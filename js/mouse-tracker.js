class MouseTracker {

    boundTop = 100;
    boundLeft = 100;
    boundBottom = 100;
    boundRight = 100;

    body = null;
    tracker = null;

    constructor(applicationSelector, trackerSelector) {
        if(this.initBody(applicationSelector)){
            this.initTracker(trackerSelector);
            this.registerEvents();
            /* expose to window */
            window.mousetracker = this;
        } else {
            console.log('Something went wrong during initialization!');
        }
    }

    getBody() {
        return this.body;
    }

    getTracker() {
        return this.tracker;
    }

    getBounds() {
        return {
            top: this.boundTop,
            bottom: this.boundBottom,
            left: this.boundLeft,
            right: this.boundRight
        }
    }

    setBounds(object) {
        this.boundTop = object.top;
        this.boundBottom = object.bottom;
        this.boundLeft = object.left;
        this.boundRight = object.right;
    }

    updatePosition(object){
        let top = object.top;
        let left = object.left;

        let bodyRect = this.body.getBoundingClientRect();

        if (top < bodyRect.top + this.boundTop) {
            top = bodyRect.top + this.boundTop;
        }
        if (left < bodyRect.left + this.boundLeft) {
            left = bodyRect.left + this.boundLeft;
        }
        if (top > bodyRect.bottom - this.boundBottom) {
            top = bodyRect.bottom - this.boundBottom;
        }
        if (left > bodyRect.right - this.boundRight) {
            left = bodyRect.right - this.boundRight;
        }

        this.body.style.setProperty('--mouse-tracker-top', (top - (this.tracker.clientHeight / 2)) + "px");
        this.body.style.setProperty('--mouse-tracker-left', (left - (this.tracker.clientWidth / 2)) + "px");
    }

    registerEvents() {
        addEventListener("DOMContentLoaded", () => {

            addEventListener("mousemove", (event) => {
                this.updatePosition({top: event.clientY, left: event.clientX});
            });
        });
    }

    initTracker(trackerSelector) {
        console.log('trying to bind tracker...');
        this.tracker = this.body.querySelector(trackerSelector);
        if (this.tracker != null) {
            console.log('bound tracker:', this.tracker);
        }
    }
    initBody(applicationSelector){
        console.log('trying to bind to ' + applicationSelector);
        this.body = document.querySelector(applicationSelector);
        if (this.body != null) {
            console.log('bound to:', this.body);
            this.registerEvents();
        } else {
            console.log('bind unsuccessful');
        }

        this.body.style.setProperty('--mouse-tracker-top', this.boundTop + 'px');
        this.body.style.setProperty('--mouse-tracker-left', this.boundLeft + 'px');

        return this.body != null;
    }
}

export {MouseTracker}