# [W3E](https://w3e.uk)
W3E is an extension of the W3.CSS framework, offering additional functionalities and supplementary JavaScript `w3e.js` for more complete features.

While the "E" in W3E signifies "enhanced", the `e` used in `w3e-` class prefix denotes experimental features. These classes, like `w3e-content`, are for short-term use until officially adopted.

To ensure compatibility and prevent potential website or application breakage during `w3e.css` updates, it's recommended to include both the `w3e-` prefix and the `w3-` class prefix for each experimental element. For example, use `class="w3e-content w3-content"`.

## CDN Hosted Files
You can attach the following to your web application:
* https://cdn.jsdelivr.net/gh/emnawer/w3e/w3e.min.css
* https://cdn.jsdelivr.net/gh/emnawer/w3e/w3e.min.js

## Using W3E Replaces Traditional W3.CSS

Including `w3e.css` provides both the traditional W3.CSS framework and W3E enhancements. There's no need to include separate files for both.

If you require the original W3.CSS framework or its documentation, please refer to the following resource: https://www.w3schools.com/w3css/

## W3.CSS Version:
Note that current W3E is based on W3.CSS v4.10.

## CSS Enhancements:

**Current CSS Enhancements:**

1. Body/HTML font size increased from 15px to 16px for better support on modern screens. *Added to W3.CSS v4.10.1.* (https://github.com/emnawer/w3css)
2. Modify content class `w3-content` to limit maximum width to 1100px and right/left padding of 10px. *Added to W3.CSS v4.10.1.* (https://github.com/emnawer/w3css)
3. Adding *new* CSS class for handheld themed borders, `w3e-handheld`. Experimental maybe replaced with other 
4. Adding *new* CSS class for the clickable tab JavaScript function. `w3e-tab`
5. Remove (bug) `.w3-sidebar.w3-collapse{display:block!important}` from large screen media. *Removed with W3.CSS v4.10.1.* (https://github.com/emnawer/w3css)

**For alpha CSS enhancements, [click here](https://github.com/emnawer/w3e/wiki).**


## JavaScript Enhancements:

The implemented JavaScript code adapts modern event handling practices as possible by utilizing a document-level event listener for click events, as opposed to the traditional method of binding functions to individual HTML elements via the `onclick=""` attribute. This approach promotes a more maintainable and scalable codebase.

**Current JavaScript Enhancements:**

1. Accordion.
2. Clickable tabs.
3. Images slider.
4. Sidebar.
5. Progress bar.
6. Modals.
7. Dropdowns.
8. Panels.
9. Show and hide elements.

**For alpha JavaScript enhancements, [click here](https://github.com/emnawer/w3e/wiki).**


### Live Examples

**For HTML/JavaScript and ReactJS demos, visit: https://codepen.io/emnawer**



### 1. Accordion

An accordion is a versatile web page element that allows users to expand and collapse content sections, revealing or hiding information on demand.

- Required CSS: `w3e-accordion` (beside title and section IDs).
- JavaScript methods: automatically assigned.

**Structure:**

- The main container of an accordion is any element with the class name `w3e-accordion`.
- Each accordion contains pairs of clickable titles and their corresponding content sections.

**JavaScript Behavior:**

- A JavaScript function automatically scans the entire HTML document for elements with the `w3e-accordion` class.
- For each accordion found, the script iterates through its child elements.
- If a child element has both a title ID and a corresponding section ID (ending with `-acc`), it's considered part of the accordion. Otherwise, it's ignored.
- A click event listener is then attached to the title element. When clicked, the corresponding section with the matching ID (ending with `-acc`) is toggled (shown or hidden).

**Example:**

If a title has an ID of `Demo`, the corresponding section's ID would be `Demo-acc`. Clicking the `Demo` title would show or hide the `Demo-acc` section.

```
<div class="w3e-accordion">
  <button id="Demo1">Open Section 1</button>
  <div id="Demo1-acc">
    <div class="w3-container">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </div>
  <button id="Demo2">Open Section 2</button>
  <div id="Demo2-acc">
   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  <button id="Demo3">Open Section 3</button>
  <div id="Demo3-acc">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</div>
```

### 2. Clickable tabs

A tabbed interface allows users to efficiently navigate between different sections or content pages by clicking on designated tab buttons. This section demonstrates how to implement a tabbed interface using CSS classes provided by W3E.css.

- Required CSS: `w3e-tabs`  (beside button and tab IDs).
- JavaScript methods: automatically assigned.

**Structure:**

- The main container of a tabbed interface is any element with the class name `w3e-tabs`.
- Each tabbed interface consists of a single bar containing clickable buttons (tabs) and their corresponding content sections.

**JavaScript Behavior:**

- A JavaScript function automatically scans the entire HTML document for elements with the `w3e-tabs` class.
- For each tabbed interface found, the script iterates through its child elements.
 If a child element has both a button ID and a corresponding tab ID (ending with `-tab`), it's considered part of the tabbed interface. Otherwise, it's ignored.
- A click event listener is attached to each button element. When clicked, the corresponding tab with the matching ID (ending with `-tab`) is displayed, and the button itself is visually highlighted using the `w3-theme-dark` class. The previously active button's highlight is removed.

**Example:**

If a button has an ID of `London` the corresponding tab's ID would be `London-tab`. Clicking the `London` button would display the `London-tab` content and visually distinguish the `London` button as active.

```
<div class="w3e-tabs">

  <div>
    <button id="London">London</button>
    <button id="DC">Paris</button>
    <button id="Tokyo">Tokyo</button>
  </div>

  <div id="London-tab">
    <p>London is the capital city of the UK.</p>
  </div>
  <div id="DC-tab">
    <p>DC is the capital of USA.</p> 
  </div>
  <div id="Tokyo-tab">
    <p>Tokyo is the capital of Japan.</p>
  </div>

</div>
```

### 3. Slide Show

The code employs a DOM traversal technique to efficiently locate the corresponding `w3e-slider` container element and subsequently enumerate all IMG elements nested within the container; and binding a click event on button elements with the class `w3-button`. This streamlined process offers a degree of optimization for scenarios involving any number of images.

- Required CSS: `w3e-slider, <img>, w3-button`
- JavaScript methods: automatically assigned.

**Structure:**

- The main container of a slider is almost any element including `<div>` with the class name `w3e-slider`.
- The `<img>` tags represent the images that will be displayed in the slider. 
- Each slider interface consists of navigation buttons to iterate through images.

**JavaScript Behavior:**

- A JavaScript function automatically scans the entire HTML document for elements with the `w3e-slider` class.
- The function will add click events to `w3-slider` child `w3-button` for navigation.

**Example:**
This snippet creates a basic image slider where you can cycle through images using the left and right navigation buttons.


```
<div class="w3e-slider">

  <img src="image1.jpg" style="width: 100%;">
  <img src="image2.jpg" style="width: 100%;">
  <img src="image3.jpg" style="width: 100%;">
  <img src="image4.jpg" style="width: 100%;">

  <a class="w3-button" style="position:absolute;top:45%;left:0;" >❮</a>
  <a class="w3-button" style="position:absolute;top:45%;right:0;" >❯</a>

</div>
```

### 4. Sidebar

This JavaScript enhancement facilitates opening and closing sidebars on your webpage using designated buttons.

- Added CSS: `w3-sidebar, w3e-open, w3e-close`.
- Added JavaScript methods: automatically assigned.

**Structure:**

- The main container of a sidebar is any element with the class name `w3-sidebar`.
- Each sidebar features two clickable buttons: a close button located within the sidebar itself (`w3e-close`), and an open button positioned outside the sidebar (`w3e-open`).

**JavaScript Behavior:**

- A JavaScript function automatically scans the entire HTML document for elements with the `w3-sidebar` class.
- For each discovered sidebar, the script performs the following:
  - Locates the first child element within the sidebar that has the `w3e-close` class.
  - Attaches a click event listener to this close button. When clicked, the sidebar is hidden.
  - Identifies the next sibling element of the sidebar that has the `w3e-open` class, or if that element doesn't exist, searches for a child element within the next sibling with the `w3e-open` class.
  - Attaches a click event listener to this open button. When clicked, the sidebar is displayed.
- Important: The open button must be placed after the sidebar element in the HTML structure to ensure proper detection by the script.

**Example:**

If a sidebar element has the class `w3-sidebar`, the next element in the HTML code should have the class `w3e-open`. Additionally, the sidebar itself should have a direct child element with the class `w3e-close`.

```
<nav class="w3-sidebar" >
  <button class="w3e-close"><i class="fa fa-remove"></i></button>
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
  <a href="#">Link 4</a>
</nav>
<button class="w3e-open"><i class="fa fa-bars"></i></button>
```

### 5. Progress bar
This JavaScript function, named `updateBar`, dynamically updates the width of a progress bar, creating a smooth animation that reflects task or operation progress. It requires two mandatory parameters.

- Added CSS: no specific CSS class for progress bar. However, an ID is required.
- Added JavaScript method: `updateBar(barID, update)`.

**Function Parameters:**

- `barID` (string): The unique element ID of the progress bar you want to update. This element is assumed to be an HTML element with a style attribute containing a width property.
- `update` (number): The amount by which you want to adjust the progress bar's width. This value is typically a positive integer to represent progress increase, but it can be negative to decrease the width.

**Function Logic:**

- Retrieves Current Width: The function retrieves the current width of the progress bar element.
- Calculates New Width: It adds the desired update value to the current width, determining the new width for the progress bar.
- Updates Element Width: Finally, the function updates the width property of the progress bar element using the calculated new width.

**Example:**
Imagine you have a progress bar with the HTML ID `loading` that currently displays 25% completion. You can trigger the update using an `onclick` event handler.


```
<div class="w3-container">

<div class="w3-light-grey">
  <div id="loading" style="width:11%">0</div>
</div><br>

<button onclick='w3e.updateBar("loading", 25)'>Update Bar</button> 
</div>
```
This code would call the `updateBar()` function, passing `loading` as the barID and 25 as the update value, increasing the progress bar's width to 36% (current 11% + update 25%).

### 6. Modal

- Added CSS: `w3e-open, w3e-close`.
- Added JavaScript methods: automatically assigned.

**Structure:**

- The main container of a Modal is an element with the class name `w3-modal`.
- Each Modal features two clickable buttons: a close button located within the Modal itself `w3e-close`, and an open button positioned outside the Modal `w3e-open`.

**Function Logic:**

- The attribute `id` assigns a unique identifier to the modal, allowing it to be referenced later in the function `modals()` code for showing and closing the modal. The `w3-modal` attribute provides styling and layout utilities.
- `w3-modal-content` applies styling for w3-modal content area.
- This `w3e-close` class defined to provide specific styling and behavior for the close button. `w3-button` and `w3-display-topright` are optional styling classes.
- The `w3e-open` class used for `onclick` JavaScript event handlers to open the modal dialog when the button is clicked. However, the modal can be opened by using a JavaScript programmable method for other event handlers. The ID attribute assigns a unique identifier to the button to know open, modal with `id-modal` ID.

**Example:**
This code snippet defines a basic modal dialog structure with a close button and an "Open Modal" button. The modal's styling and functionality are handled by JavaScript code that interacts with these elements.


```
  <div id="id-modal" class="w3-modal">
      <div class="w3-modal-content">
        <span class="w3-button w3-display-topright w3e-close">×</span>
        <div>
          Content goes here.
        </div>
        
      </div>
  </div>

<button id="id" class="w3e-open" >Open Modal</button>
```

### 7. Dropdown

Now the `w3-dropdown-click` has both behaviors of `w3-dropdown-click` and `w3-dropdown-hover`, `w3-dropdown-hover` may be deprecated in the future.

- Added CSS: no new classes.
- Added JavaScript methods: automatically assigned.

**Structure:**

- The `w3-dropdown-click` is the main container for the dropdown.
- The `w3-button` is the button that, when clicked, will reveal the dropdown menu. The w3-button class styling the button to look like a typical button element. The hover and click events are assigned to this element.
- The `w3-dropdown-content` class is the hidden content of the dropdown menu. The w3-dropdown-content class controls the appearance and positioning of the dropdown content. The optional `w3-bar-block` class makes the content displayed in a vertical list.
- `w3-bar-item w3-button` are the individual links within the dropdown menu. The `w3-bar-item` and `w3-button` classes ensure they are visually styled as list items within the dropdown menu.

**Function Logic:**

Clicking the Button: When the button is clicked, the JavaScript code in the HTML file `dropdowns()` function will toggle the display of the `w3-dropdown-content` element. This is achieved by adding or removing the `w3-show` class from the `w3-dropdown-content` element, which is defined in the CSS framework.
Hovering Over the Button: The code also to use `mouseover` and `mouseout` events to toggle the display of the dropdown content. The JavaScript function adds and removes the `w3-show` class to the `w3-dropdown-content` element when the mouse enters and exits the button area.

**Example:**

This code snippet is using a W3.CSS framework to provide the styling and W3E for JavaScript functionality.

```
<div class="w3-dropdown-click">
      <button class="w3-button">Dropdown</button>
      <div class="w3-dropdown-content w3-bar-block">
        <a href="#" class="w3-bar-item w3-button">Link</a>
        <a href="#" class="w3-bar-item w3-button">Link</a>
        <a href="#" class="w3-bar-item w3-button">Link</a>
      </div>
</div>
```

### 8. Panel

Panels are used to display information like for example notification message.

- Added CSS: `w3e-close`.
- Added JavaScript methods: automatically assigned.

**Structure:**

- The main container of a panel is any element with the class name `w3-panel`.
- Each panel features two clickable buttons: a close button located within the panel itself `w3e-close`, and show the panel programmable using `w3e.show()` function.

**Function Logic:**

This component is a simple HTML structure for a panel that can be shown or hidden using JavaScript. Let's break it down:
- `w3e.show('panel')` can be used in any programmable way to show the panel is an event handler that triggers a JavaScript function w3e.show('panel') when the button is clicked. This function is responsible for making the panel visible. Example: `<button class="w3-btn" onclick="w3e.show('panel')">Show panel</button>`
- The parent element must have ID and the class "w3-panel". The "w3-display-container" is optional to help in positioning and layout of the child element. Example: `<div id="panel" class="w3-panel w3-display-container">`
- A child element with the class "w3-button" and optional "w3-display-topright" can be added to preform the **close panel** function.
 "w3-display-topright" positions the element in the top-right corner of its parent panel element. Example: `<span class="w3-button w3-display-topright">X</span>`


**Example:**

This code snippet represents a panel that can be shown or hidden through the button's interaction. The JavaScript function w3e.show('panel') is responsible for this functionality.


```
<button class="w3-btn" onclick="w3e.show('panel')">Show panel</button>
  <div id="panel" class="w3-panel w3-display-container">
      <span class="w3-button w3-display-topright">X</span>
      <h3>Hello world!</h3>
  </div>
```

### 9. Show and Hide HTML Elements

Functions to show and hide any HTML element, like notification message.

- Added CSS: no specific CSS class for progress bar. However, either an element ID, or pass the element's object itself, is required.
- Added JavaScript method: `show(ID || object)` and `hide(ID || object)`.

**Function Logic:**
- The `show()` and `hide()` functions can be added to `onclick` attribute is what makes this interactive. When clicked, it executes the JavaScript code `w3e.show(ID)`.
Using the `onclick` event to call `w3e.hide()` and `w3e.show()` functions passes the ID of the panel as an argument, making the panel visible or invisible. Example: `<button onclick="w3e.show(ID)>Show Panel</button>`
- Similar to the "Show Panel" button, this button has the text "Hide Panel" and calls the JavaScript code `w3e.hide(ID)` when clicked. This code would likely call another function `w3e.hide()` to hide the panel. Example: `<button onclick="w3e.hide(ID)">Hide Panel</button>`

**Example:**
This code snippet creates a simple HTML panel with the ability to be shown or hidden using JavaScript buttons.

```
<div id="infoMessage" class="w3-panel">
  <h3>Hello world!</h3>
</div>
<button onclick="w3e.show('infoMessage')">Show Panel</button>
<button onclick="w3e.hide('infoMessage')">Hide Panel</button>
```

## Support, Feedback & Issues

- For [support & Feedback](https://github.com/emnawer/w3e/discussions).
- To report [issues](https://github.com/emnawer/w3e/issues).
- Visit W3E website:(https://w3e.uk).
