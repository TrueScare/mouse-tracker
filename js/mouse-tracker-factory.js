import {MouseTracker} from "./mouse-tracker";

class MouseTrackerFactory {
    constructor() {
        if (window.mouseTrackerFactory === undefined || window.mouseTrackerFactory === null) {
            window.mouseTrackerFactory = this;
        }
    }

    getMouseTracker(containerSelector, trackerSelector) {
        return new MouseTracker(containerSelector, trackerSelector);
    }
}

export {MouseTrackerFactory};