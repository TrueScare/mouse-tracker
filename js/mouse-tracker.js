class MouseTracker {

    logActive = false;

    boundTop = 100;
    boundLeft = 100;
    boundBottom = 100;
    boundRight = 100;

    mousePosition = {
        x: 0,
        y: 0
    }
    trackerPosition = {
        x: 0,
        y: 0,
    }

    body = null;
    tracker = null;

    constructor(applicationSelector = '', trackerSelector = '', logActive = false) {
        this.logActive = logActive;
        if (this.initBody(applicationSelector)) {
            this.initTracker(trackerSelector);
            this.registerEvents();
            /* expose to window */
            window.mousetracker = this;
        } else {
            this.logDebug('Something went wrong during initialization!');
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
        this.logDebug('set bounds from:', object);
        this.boundTop = object.top;
        this.boundBottom = object.bottom;
        this.boundLeft = object.left;
        this.boundRight = object.right;
        this.logDebug('setting boundaries complete');

        this.logDebug('updating position and visibility');
        this.updatePosition();
        this.updateVisibility();
    }

    getPosition() {
        return this.trackerPosition;
    }

    updatePosition() {
        this.logDebug('updating visibility from tracker position:', this.trackerPosition);
        let y = this.checkVerticalBounds(this.trackerPosition.y);
        let x = this.checkHorizontalBounds(this.trackerPosition.x);

        this.logDebug('setting body properties with y:', y, 'and x: ', x);
        this.body.style.setProperty('--mouse-tracker-top', (y - (this.tracker.clientHeight / 2)) + "px");
        this.body.style.setProperty('--mouse-tracker-left', (x - (this.tracker.clientWidth / 2)) + "px");

        this.logDebug('setting position complete');
    }

    updateVisibility() {
        this.logDebug('updating visibility...');
        let bodyRect = this.body.getBoundingClientRect();
        this.logDebug('body parameter:', bodyRect, 'mouse position:', this.getMousePosition(), 'tracker opacity:', this.tracker.style.opacity);

        if (this.mousePosition.y >= bodyRect.top + this.boundTop
            && this.mousePosition.y <= bodyRect.bottom - this.boundBottom
            && this.mousePosition.x >= bodyRect.left + this.boundLeft
            && this.mousePosition.x <= bodyRect.right - this.boundRight
        ) {
            this.tracker.style.opacity = 1;
            this.logDebug('tracker visible');
        } else {
            this.tracker.style.opacity = 0;
            this.logDebug('tracker invisible');
        }
        this.logDebug('visibility updated');
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
                this.setMousePosition({x: event.clientX, y: event.clientY});
                this.setTrackerPosition(this.getMousePosition());
                this.updateVisibility();
            });
        });
    }

    setTrackerPosition(object) {
        this.logDebug('setting tracker position:', object);
        this.trackerPosition.x = this.checkHorizontalBounds(object.x);
        this.trackerPosition.y = this.checkVerticalBounds(object.y);
        this.logDebug('setting setting tracker position complete');

        this.updatePosition();
    }

    getMousePosition() {
        return this.mousePosition;
    }

    setMousePosition(object) {
        this.logDebug('setting mouse position:', object);
        this.mousePosition.x = object.x + document.documentElement.scrollLeft;
        this.mousePosition.y = object.y + document.documentElement.scrollTop;
        this.logDebug('setting mouse position complete');
    }

    initTracker(trackerSelector) {
        this.logDebug('trying to bind tracker...');
        this.tracker = this.body.querySelector(trackerSelector);
        if (this.tracker != null) {
            this.logDebug('bound tracker:', this.tracker);
        }
    }

    initBody(applicationSelector) {
        this.logDebug('trying to bind to ' + applicationSelector);
        this.body = document.querySelector(applicationSelector);
        if (this.body != null) {
            this.logDebug('bound to:', this.body)
            this.registerEvents();
        } else {
            this.logDebug('bind unsuccessful');
        }

        this.body.style.setProperty('--mouse-tracker-top', this.boundTop + 'px');
        this.body.style.setProperty('--mouse-tracker-left', this.boundLeft + 'px');

        return this.body != null;
    }

    setLogActive(bool) {
        this.logActive = bool;
    }

    logDebug(...args) {
        if (this.logActive === true) {
            console.log(...args);
        }
    }
}

export {MouseTracker}