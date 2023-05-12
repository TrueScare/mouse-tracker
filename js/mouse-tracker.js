class MouseTracker {

    boundTop = 100;
    boundLeft = 100;
    boundBottom = 100;
    boundRight = 100;

    position = {
        x: 0,
        y: 0,
    }

    body = null;
    tracker = null;

    constructor(applicationSelector, trackerSelector) {
        if (this.initBody(applicationSelector)) {
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

        this.updatePosition();
    }

    getPosition(){
        return this.position;
    }

    updatePosition() {
        let y = this.checkVerticalBounds(this.position.y);
        let x = this.checkHorizontalBounds(this.position.x);

        this.body.style.setProperty('--mouse-tracker-top', (y - (this.tracker.clientHeight / 2)) + "px");
        this.body.style.setProperty('--mouse-tracker-left', (x - (this.tracker.clientWidth / 2)) + "px");
    }

    checkVerticalBounds(number) {
        let bodyRect = this.body.getBoundingClientRect();
        let y = number;

        if (y < bodyRect.top + this.boundTop) {
            y = bodyRect.top + this.boundTop;
        }
        if (y > bodyRect.bottom - this.boundBottom) {
            y = bodyRect.bottom - this.boundBottom;
        }
        return y
    }

    checkHorizontalBounds(number) {
        let bodyRect = this.body.getBoundingClientRect();
        let x = number;

        if (x < bodyRect.left + this.boundLeft) {
            x = bodyRect.left + this.boundLeft;
        }

        if (x > bodyRect.right - this.boundRight) {
            x = bodyRect.right - this.boundRight;
        }

        return x;
    }

    registerEvents() {
        addEventListener("DOMContentLoaded", () => {

            addEventListener("mousemove", (event) => {
                this.setPosition({y: event.clientY, x: event.clientX});
            });
        });
    }

    setPosition(object){
        this.position.x = this.checkHorizontalBounds(object.x);
        this.position.y = this.checkVerticalBounds(object.y);

        this.updatePosition();
    }

    initTracker(trackerSelector) {
        console.log('trying to bind tracker...');
        this.tracker = this.body.querySelector(trackerSelector);
        if (this.tracker != null) {
            console.log('bound tracker:', this.tracker);
        }
    }

    initBody(applicationSelector) {
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