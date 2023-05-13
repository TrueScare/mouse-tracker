import {MouseTracker} from "./js/mouse-tracker.js";

let tracker1 = new MouseTracker('#tracker-body-1', '#mouse-tracker-1');
let tracker2 = new MouseTracker('#tracker-body-2', '#mouse-tracker-2');
let tracker3 = new MouseTracker('#tracker-body-3', '#mouse-tracker-3');

let boundTop = document.getElementById('bound-top');
let boundBottom = document.getElementById('bound-bottom');
let boundLeft = document.getElementById('bound-left');
let boundRight = document.getElementById('bound-right');

boundTop.onchange = (event) => {
    let bounds = tracker1.getBounds();
    bounds.top = parseInt(boundTop.value);
    tracker1.setBounds(bounds);
};
boundBottom.onchange = (event) => {
    let bounds = tracker1.getBounds();
    bounds.bottom = parseInt(boundBottom.value);
    tracker1.setBounds(bounds);
};
boundLeft.onchange = (event) => {
    let bounds = tracker1.getBounds();
    bounds.left = parseInt(boundLeft.value);
    tracker1.setBounds(bounds);
};
boundRight.onchange = (event) => {
    let bounds = tracker1.getBounds();
    bounds.right = parseInt(boundRight.value);
    tracker1.setBounds(bounds);
};