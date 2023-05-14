class MouseTracker {

    /* region properties */
    logActive = false;
    useBounds = true;
    /* stores the boundaries ob the body element */
    bounds = {
        top: 100,
        left: 100,
        bottom: 100,
        right: 100
    }
    /* stores the coordinates of the mouse position */
    mousePosition = {
        x: 0,
        y: 0
    }
    /* stores the coordinates of the tracker position */
    trackerPosition = {
        x: 0,
        y: 0,
    }
    /* the "container" */
    body = null;
    /* the actual tracker element */
    tracker = null;

    /* endregion properties */

    /* region constructors and initialization */
    /**
     * @param applicationSelector String
     * @param trackerSelector String
     * @param logActive boolean
     */
    constructor(applicationSelector, trackerSelector, logActive = false) {
        this.logActive = logActive;
        if (this.initBody(applicationSelector)) {
            this.initTracker(trackerSelector);
            this.registerEvents();
        } else {
            this.logDebug('Something went wrong during initialization!');
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

        this.body.style.setProperty('--mouse-tracker-top', this.getBounds().top + 'px');
        this.body.style.setProperty('--mouse-tracker-left', this.getBounds().left + 'px');

        return this.body != null;
    }

    initTracker(trackerSelector) {
        this.logDebug('trying to bind tracker...');
        this.tracker = this.body.querySelector(trackerSelector);
        if (this.tracker != null) {
            this.logDebug('bound tracker:', this.tracker);
        }
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

    /* endregion constructors and initialization */

    /* region getter/setter */
    getBody() {
        return this.body;
    }

    setBody(element) {
        this.body = element;
    }

    getTracker() {
        return this.tracker;
    }

    setTracker(element) {
        this.tracker = element;
    }

    getBounds() {
        this.logDebug('fetchings bounds');
        if (!this.getUseBounds()) {
            this.logDebug('bounds inactive');
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
        this.logDebug('returning bounds:', this.bounds);
        return this.bounds;
    }

    setBounds(object) {
        this.logDebug('set bounds from:', object);
        this.bounds = object;
        this.logDebug('setting boundaries complete');

        this.logDebug('updating position and visibility');
        this.updatePosition();
        this.updateVisibility();
    }

    getTrackerPosition() {
        return this.trackerPosition;
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


    setLogActive(bool) {
        this.logActive = bool;
    }

    getUseBounds() {
        return this.useBounds;
    }

    setUseBounds(bool) {
        this.useBounds = bool;
    }

    /* endregion getter/setter */

    /* region methods*/
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

        if (this.mousePosition.y >= bodyRect.top + document.documentElement.scrollTop + this.getBounds().top
            && this.mousePosition.y <= bodyRect.bottom + document.documentElement.scrollTop - this.getBounds().bottom
            && this.mousePosition.x >= bodyRect.left + document.documentElement.scrollLeft + this.getBounds().left
            && this.mousePosition.x <= bodyRect.right + document.documentElement.scrollLeft - this.getBounds().right
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
        let bounds = this.getBounds();


        if (y < bodyRect.top + document.documentElement.scrollTop + this.getBounds().top) {
            y = bodyRect.top + document.documentElement.scrollTop + this.getBounds().top;
        }
        if (y > bodyRect.bottom + document.documentElement.scrollTop - this.getBounds().bottom) {
            y = bodyRect.bottom + document.documentElement.scrollTop - this.getBounds().bottom;
        }
        return y
    }

    checkHorizontalBounds(number) {
        let bodyRect = this.body.getBoundingClientRect();
        let x = number;

        if (x < bodyRect.left + document.documentElement.scrollLeft + this.getBounds().left) {
            x = bodyRect.left + document.documentElement.scrollLeft + this.getBounds().left;
        }

        if (x > bodyRect.right + document.documentElement.scrollLeft - this.getBounds().right) {
            x = bodyRect.right + document.documentElement.scrollLeft - this.getBounds().right;
        }

        return x;
    }

    logDebug(...args) {
        if (this.logActive === true) {
            console.log(...args);
        }
    }

    /* endregion methods */
}

export {MouseTracker}