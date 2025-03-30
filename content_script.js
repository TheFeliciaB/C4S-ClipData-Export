// Helper function to get a value either by ID or (if not found) from getElementsByName.
function getFieldValue(id, name) {
  let element = document.getElementById(id);
  if (element && element.value !== undefined) {
    return element.value;
  }
  // Try getting it by name (returns a NodeList)
  const elements = document.getElementsByName(name);
  if (elements && elements.length > 0 && elements[0].value !== undefined) {
    return elements[0].value;
  }
  return "";
}

function extractDropdownText() {
  // Get the dropdown (select element)
  var dropdown = document.getElementById("keycat");
  
  // Access the selected option using selectedIndex
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  
  // Get the displayed text
  var displayedText = selectedOption.text;
  
  return displayedText; // Return the text value
}

function getClipAddedDate() {
  // Select the first <td> element that has a "data-clip-added-date" attribute.
  const tdElement = document.querySelector('td[data-clip-added-date]');
  // If the element exists, return the attribute's value; otherwise return an empty string.
  if (tdElement) {
    // Using the dataset property:
    return tdElement.dataset.clipAddedDate;
    
    // Alternatively, if you prefer using getAttribute:
    // return tdElement.getAttribute('data-clip-added-date');
  }
  return "";
}

// Listen for a request message from the popup. 
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFormData") {
    // Extract each field. Adjust both the id and name as required by the page.
    const formData = {
	  clipStore: getFieldValue("producer_id", "producer_id"),
      clipTitle: getFieldValue("ClipTitle", "ClipTitle"),
      clipCategory: extractDropdownText(),  // This now returns the dropdown's displayed text
      clipName: getFieldValue("ClipName", "ClipName"),
      clipTime: getFieldValue("ClipTime", "ClipTime"),
      clipPrice: getFieldValue("clip_price", "ClipPrice"),
      clipID: getFieldValue("id", "id"),
	  // Capturing the date from the td element
      clipAddedDate: getClipAddedDate(),
      clipDescription: getFieldValue("clipDescription", "clipDescription")
    };

    sendResponse(formData);
  }
});
