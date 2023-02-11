// Task 38 - Creating a list that can be styled, deleted and added to. 

// An array is creating containing six items.
let groceryList = ["Apples", "Ham", "Crisps", "Milk", "Lemonade", "Tea"];

// This function will check to see if the clicked on element has the LI attribute.
let styleList = event => {

    // Originally got the element name using the Path section of the event information
    // but the browser indicated that using this was depreciated so the target.tagname
    // was used instead.
    if (event.target.tagName == "LI") {

        // Directed to the event initilizers class attribute and has the class 'checked'  
        // either entered or removed depending on its presence altering the style of the element.
        event.target.classList.toggle("checked");
    }
}

// A variable that contains the element that will hold the list items.
// An event listener was then added to the unordered list to register any clicks on it
// or any child elements within and calls the styleList function.
let htmlList = document.querySelector('#itemList');
htmlList.addEventListener('click', styleList);

// A variable containing the input field.
let inputEnter = document.querySelector('#input');

// An event listener was attached that waits for the enter key 
// to be used and presses the add item span/button.
// The user must have activated the field (indicated by the blinking cursor)
// before the enter key will work. 
inputEnter.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
       document.querySelector("#addBtn").click();
    }
});

// Requires the intial index in which to start the loop from. 
let addListItem = startIndex => {

    // A loop that will go through each item in the array and create a list element.
    // It uses the startIndex to determine how many to list items to add.
    for (i = startIndex; i < groceryList.length; i++) {
        
        // A new list element is created and assigned to a variable. 
        let listItem = document.createElement('li');
        
        // This will provide the text content of the list element.
        listItem.innerHTML = groceryList[i];

        // It is then added to the the ul element.
        htmlList.appendChild(listItem);

        // This creates the span element.
        let listSpan = document.createElement('span');

        // This assigns it the class 'close'.
        listSpan.classList.add('close');

        // This is where the text should go for the span but added
        // it to the button element below.
        // listSpan.innerHTML = "\u00d7";
        
        // The span element is then added to the listitem created above.
        listItem.appendChild(listSpan);

        
        // This button is unnecessary for the task as the span performs the
        // required functions for the project but resolves a cosmetic issue
        // where the line through decoration effects the span element as well
        // as the list. 
        let btn = document.createElement("button");

        // The text element is added to the button.
        btn.innerHTML = "\u00d7";

        // The button is then added to the span.
        listSpan.appendChild(btn);

        // I was a bit unclear as to whether this element was meant to be placed here
        // during creation or attached later as part of the task. In either case the function
        // would have been placed below with the delete function and the mentioned in the task will
        // be added by the next function.
        // listSpan.onclick = deleteItem;
    }
}

// Like above takes the number in which to start from.
let addClickToSpan = startIndex => {

    // Retrieves all elements with the 'close' class. 
    let closeClass = document.getElementsByClassName("close");

    // Goes through the elements and adds the click event listener
    // This varies from the whole array to just 1.
    for (i = startIndex; i < groceryList.length; i++) {
        closeClass[i].addEventListener('click', deleteItem);
    }
}

// Once the span element has been clicked on the item will be deleted from the array
// and the list hidden.
let deleteItem = (event) => {

    // The event targets the parents parent as it start from button -> span -> li.
    // Without the button in the span the last parentNode can be removed.
    let parentLi = event.target.parentNode.parentNode;

    // This variable retrieves the text of the selected list item.
    let item = parentLi.childNodes[0].textContent;

    // The text of the list item is used to retrieve the index of the item 
    // from the array.
    let itemIndex = groceryList.findIndex((food) => food === item);

    // The index is then used to remove the item from the array.
    groceryList.splice(itemIndex, 1);

    // The list item has its display style set to none removing it from the
    // screen but still visible in the browser console as required by the task.
    parentLi.style.display = 'none';

    // This deletes the span element from the hidden list as it interfered with the 
    // addClickToSpan function as it counts the number of spans available to determine
    // how many to add event listeners to. As the spans are hidden they still count
    // preventing the number from decreasing and preventing any events being added after
    // any of the present items have been deleted.
    event.target.parentNode.remove();
}

// This retrieves the text from the text field and adds it to the list.
let updateList = () => {

    // This locates the text field.
    let inputtedText = document.querySelector('#input');

    // Checks to see if the field is empty and sneds an alert to the page.
    if (inputtedText.value == "") {
        alert("Please input an item.");
    }

    // Adds the non-empty field to the end of the array then sends it to be added to the ul list and
    // finally calls the function to add the event listener to the item. They use the array length
    // to retrieve the newly added entry and as the starting point so only the needed entry is used.  
    else {
        groceryList.push(inputtedText.value);
        addListItem(groceryList.length - 1);
        addClickToSpan(groceryList.length - 1);
    }

    // The field is then reset back to empty.
    inputtedText.value = "";
}

// The function goes through the array and creates the list items. As all items need to be created the parameter is
// set to the beginning of the array.
addListItem(0);

// The function retrieves the created list elements and adds the listening events. As all the elements in the array
// need an event the parameter is set to 0.
addClickToSpan(0);

// Used w3schools website to get more information on selecting dom elements, adding event listeners, style buttons.
// https://www.w3schools.com/jsref/prop_node_parentelement.asp
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// https://www.w3schools.com/howto/howto_css_text_buttons.asp

// Used developer.mozilla website to learn more about events and button triggers.
// https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
// https://www.tutorialspoint.com/javascript-trigger-a-button-on-enter-key