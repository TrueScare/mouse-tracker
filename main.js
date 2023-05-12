import {MouseTracker} from "./js/mouse-tracker.js";

let tracker = new MouseTracker('#tracker-body', '#mouse-tracker');

let boundTop = document.getElementById('bound-top');
let boundBottom = document.getElementById('bound-bottom');
let boundLeft = document.getElementById('bound-left');
let boundRight = document.getElementById('bound-right');

boundTop.onchange = (event) => {
    let bounds = tracker.getBounds();
    bounds.top = parseInt(boundTop.value);
    tracker.setBounds(bounds);
};
boundBottom.onchange = (event) => {
    let bounds = tracker.getBounds();
    bounds.bottom = parseInt(boundBottom.value);
    tracker.setBounds(bounds);
};
boundLeft.onchange = (event) => {
    let bounds = tracker.getBounds();
    bounds.left = parseInt(boundLeft.value);
    tracker.setBounds(bounds);
};
boundRight.onchange = (event) => {
    let bounds = tracker.getBounds();
    bounds.right = parseInt(boundRight.value);
    tracker.setBounds(bounds);
};