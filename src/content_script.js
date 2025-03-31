// Helper function to get a field value (assumes it's already defined)
function getFieldValue(id, name) {
  let element = document.getElementById(id);
  if (element && element.value !== undefined) {
    return element.value;
  }
  const elements = document.getElementsByName(name);
  if (elements && elements.length > 0 && elements[0].value !== undefined) {
    return elements[0].value;
  }
  return "";
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

// Existing function to extract dropdown text of an element by ID.
function extractDropdownText() {
  var dropdown = document.getElementById("keycat");
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  return selectedOption.text;
}

// Function to extract selected text from multiple dropdowns with names keywords[1] through keywords[5].
function extractMultipleDropdownText(dropdownNames) {
  const results = {};

  dropdownNames.forEach(name => {
    const dropdown = document.querySelector(`select[name="${name}"]`);
    if (dropdown) {
      const selectedOption = dropdown.options[dropdown.selectedIndex];
      results[name] = selectedOption.text;
    } else {
      results[name] = null;
    }
  });

  return results;
}



// Listen for a request message from the popup.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFormData") {
    // Create an array for keyword dropdown names.
    const keywordNames = Array.from({ length: 5 }, (_, i) => `keywords[${i + 1}]`);

    // Extract the multiple dropdown texts for keywords.
    const keywordSelections = extractMultipleDropdownText(keywordNames);

    // Create an array for keytype input names from keytype[0] to keytype[15].
    const keytypeNames = Array.from({ length: 16 }, (_, i) => `keytype[${i}]`);

    // Extract the value of each keytype input.
    const keytypeSelections = keytypeNames.map(name => {
      const input = document.querySelector(`input[name="${name}"]`);
      return input ? input.value : "";
    });

    // Extract each field from the page.
    const formData = {
      clipStore: getFieldValue("producer_id", "producer_id"),
      clipTitle: getFieldValue("ClipTitle", "ClipTitle"),
      clipCategory: extractDropdownText(),  // Example: single dropdown extraction
      clipName: getFieldValue("ClipName", "ClipName"),
      clipTime: getFieldValue("ClipTime", "ClipTime"),
      clipPrice: getFieldValue("clip_price", "clipPrice"),
      clipID: getFieldValue("id", "id"),
      clipAddedDate: getClipAddedDate(),        // Capturing the date from the td element.
      clipDescription: getFieldValue("clipDescription", "clipDescription"),
      clipKeywords: keywordSelections,          // Multiple dropdown selections.
      clipKeytypes: keytypeSelections           // Array of keytype values.
    };

    sendResponse(formData);
  }
});
