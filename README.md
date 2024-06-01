# W3Enhanced
W3E.css is an extension of the popular W3.css framework, offering additional functionalities and supplementary JavaScript (W3E.js) for a more complete features.

While the "E" in W3E signifies "enhanced", the `e` used in `w3e-` class prefix denotes experimental features. These classes, like `w3e-content`, are for short-term use until officially adopted.

To ensure compatibility and prevent potential website or application breakage during W3E.css updates, it's recommended to include both the `w3e-` prefix and the `w3-` class prefix for each experimental element. For example, use `class="w3e-content w3-content"`.

## CDN Hosted Files
You can attach the following to your web application:
* https://cdn.jsdelivr.net/gh/emnawer/W3E/w3e.min.css
* https://cdn.jsdelivr.net/gh/emnawer/W3E/w3e.min.js

## Using W3E.css Replaces Traditional W3.CSS

Including w3e.css provides both the traditional W3.CSS framework and my enhancements. There's no need to include separate files for both.

If you require the original W3.CSS framework or its documentation, please refer to the following resource: https://www.w3schools.com/w3css/


## CSS Enhancements:

**Current CSS Enhancements:**

1. Body/HTML font size increased from 15px to 16px for better support on modern screens.
2. Modify content class `w3e-content` to limit maximum width to 1100px and right/left padding of 10px.
3. Adding *new* CSS class for handheld themed borders. (`w3e-handheld`)
4. Adding *new* CSS class for the clickable tab JavaScript function. (`w3e-tab`)
5. Remove `.w3-sidebar.w3-collapse{display:block!important}` from large screen media.

## JavaScript Enhancements:

The implemented JavaScript code adapts modern event handling practices as possible by utilizing a document-level event listener for click events, as opposed to the traditional method of binding functions to individual HTML elements via the `onclick=""` attribute. This approach promotes a more maintainable and scalable codebase.

**Current JavaScript Enhancements:**

1. Accordion.
2. Clickable tabs.
3. Images slider.
4. Sidebar.
5. Progress bar.


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

If a button has an ID of `Manama` the corresponding tab's ID would be `Manama-tab`. Clicking the `Manama` button would display the `Manama-tab` content and visually distinguish the `Manama` button as active.

```
<div class="w3e-tabs">

  <div>
    <button id="Manama">London</button>
    <button id="DC">Paris</button>
    <button id="Tokyo">Tokyo</button>
  </div>
  
  <div id="Manama-tab">
    <p>Manama is the capital city of Bahrain.</p>
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

The code employs a DOM traversal technique to efficiently locate the corresponding `w3-slider` container element and subsequently enumerate all IMG elements nested within the container; and binding a click event on button elements with the class `w3-button`. This streamlined process offers a degree of optimization for scenarios involving any number of images.

- Required CSS: `w3e-slider, <img>, w3-button`
- JavaScript methods: automatically assigned.

**Example:**

```
<div class="w3-slider">

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
Imagine you have a progress bar with the HTML ID `loading` that currently displays 25% completion. You can trigger the update using an onclick event handler like this:

```
<div class="w3-container">

<div class="w3-light-grey">
  <div id="loading" style="width:11%">0</div>
</div><br>

<button onclick='updateBar("loading", 25)'>Update Bar</button> 
</div>
```
This code would call the `updateBar()` function, passing `loading` as the barID and 25 as the update value, increasing the progress bar's width to 36% (current 11% + update 25%).