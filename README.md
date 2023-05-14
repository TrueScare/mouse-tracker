# Mouse Tracker

## Info
This Project was for my personal edjucation only. But since its created and if you should ever be in need of a Mouse
Tracker, feel free to use it.

## Functions
Tracks the mouse in a given container. The Tracker can be any element INSIDE the container.

## Exampels

Simple HTML Page with the tracker.

### HTML
```html
<!Doctype html>
<html lang="de-DE">
<head>
    <base href=".">
    <link type="text/css" rel="stylesheet" href="base.css">
    <script type="module" src="main.js"></script>
    <title>Mouse Tracker</title>
</head>
<body>
<section id="tracker-body-1">
    <div id="mouse-tracker-1" class="mouse-tracker"></div>
</section>
</body>
</html>
```

### JS (main.js)

You can either use the MouseTracker directly...

```javascript
import {MouseTracker} from "./js/mouse-tracker.js";

let tracker = new MouseTracker('#tracker-body-1', '#mouse-tracker-1');
```

... or use the Factory which is bound to the window!
```javascript
import {MouseTrackerFactory} from "./js/mouse-tracker-factory.js";

let tracker = window.mouseTrackerFactory.getMouseTracker('#tracker-body-1', '#mouse-tracker-1');
```