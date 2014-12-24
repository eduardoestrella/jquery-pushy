jquery-pushy
============

jQuery Navigation Menu plugin using Responsive CSS transforms &amp; transitions with multiple instances and differents positions (left / right / top)

Features
========

- Multiple instances in the same page
- Menu positions Left, Right and Top
- Optinal use of overlay
- Define default status (open / close)
- Uses CSS transforms & transitions.
- Smooth performance on mobile devices.
- jQuery animation fallback for IE 7 - 9.
- Menu closes when a link is selected.
- Menu closes when the site overlay is selected.
- It's responsive!

Requierments
========

- [jQuery 1.9+](http://jquery.com/)

Install
========

1. Add the stylesheet (pushy.css) in your head and the JS (pushy.min.js) file in your footer.

How to use - Simple use
========

If you only want use a single navigation menu, follow the next steps.

1. Create the navigation menu with any id attribute value:

```html
 <!-- Pushy Menu -->
<nav id="menuSample">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
        <li><a href="#">Item 3</a></li>
        <li><a href="#">Item 4</a></li>
        <li><a href="#">Item 5</a></li>
        <li><a href="#">Item 6</a></li>
    </ul>
</nav>
```

2. Create the menu button with the "menuPushyButton" id attribute value:

```html
<!-- Menu Button -->
<div id="menuPushyButton">menu</div>
```

3. Instance jquery-pushy plugin over HTML elements that we create in the step 1

```html
<script>
	$("#menuSample").Pushy();
</script>
```

How to use - Advance use
=

You can use multiple navigations and define their individual options like button element, container element, position menu, open menu and overlay status.

### Create Multiple navigation Menu

1.  Create the navigations menu with differents ids attributes value

```html
 <!-- Pushy LEFT -->
<nav id="menuLeftSample">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
        <li><a href="#">Item 3</a></li>
        <li><a href="#">Item 4</a></li>
        <li><a href="#">Item 5</a></li>
        <li><a href="#">Item 6</a></li>
    </ul>
</nav>

 <!-- Pushy RIGHT -->
<nav id="menuRightSample">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
        <li><a href="#">Item 3</a></li>
        <li><a href="#">Item 4</a></li>
        <li><a href="#">Item 5</a></li>
        <li><a href="#">Item 6</a></li>
    </ul>
</nav>
```

2. Create the menu buttons with differents ids attributes value:

```html
<!-- Menu Left Button -->
<div id="menuLeftButton">menu Left</div>

<!-- Menu Right Button -->
<div id="menuRightButton">menu Right</div>
```

3. Instance both navigations menu over the HTML elements

```html
<script>
	$("#menuLeftSample").Pushy({
		button: "menuLeftButton",        
        menuPosition: "left"
	});

	$("#menuRightSample").Pushy({
		button: "menuRightButton",        
        menuPosition: "right"        
	});

</script>
```

### Complete Sample options

You can customize some actions and default container, here it is default option values.

```
var options = {
    button: "menuPushyButton",  // HTML id element 
    container: "container",		// HTML id element 
    menuPosition: "left",		
    menuOpen: false,
    overlayShow: true          
}
```

Tips
====

Use the CSS class <b>pushy</b> and <b>pushy-left</b> to hide navigation menu in the first load.

```html
<!-- Menu Button -->
<div id="menuPushyButton" class="pushy pushy-left">menu</div>
```


Browser Compatibility
=====================

| Desktop       | Mobile                                     |
| ------------- | -------------------------------------------|
| IE 9-11       | Chrome (Android 4.x+)                      |
| Chrome        | Android Browser (Android 4.x+)             |
| Firefox       | Safari (iOS 7)                             |
| Safari (Mac)  | Internet Explorer Mobile (Windows Phone 8) |

Thanks
======

The jQuery Plugin is based on pushy v0.9.2 proyect of Christopher Yee. [Visit him!](https://github.com/christophery/pushy)

