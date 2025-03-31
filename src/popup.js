// Utility function to handle file downloads via a Blob.
function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Required in Firefox for triggering click.
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helpers for escaping special characters.
function escapeCSV(value) {
  if (value == null) return "";
  value = value.toString().replace(/"/g, '""');
  if (/[",\n]/.test(value)) {
    value = `"${value}"`;
  }
  return value;
}

function escapeXML(value) {
  if (!value) return "";
  return value.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&apos;");
}

// Send a message to the content script in the current active tab to grab the form data.
function getFormData(callback) {
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    // Send message to content script.
    browser.tabs.sendMessage(tabs[0].id, { action: "getFormData" })
      .then(response => {
        if (response) {
          callback(response);
        } else {
          updateStatus("No form data found on this page.");
        }
      })
      .catch(err => {
        console.error("Error retrieving form data:", err);
        updateStatus("Error retrieving form data.");
      });
  });
}


// Update the status message in the popup.
function updateStatus(msg) {
  document.getElementById("status").textContent = msg;
}

document.getElementById("exportText").addEventListener("click", function() {
  getFormData(data => {
    // Convert clipKeywords to a comma-separated string.
    let keywords = "";
    if (Array.isArray(data.clipKeywords)) {
      keywords = data.clipKeywords.join(", ");
    } else if (typeof data.clipKeywords === "object" && data.clipKeywords !== null) {
      keywords = Object.values(data.clipKeywords).join(", ");
    } else {
      keywords = data.clipKeywords;
    }
    
    // Convert clipKeytypes to a comma-separated string.
    let keytypes = "";
    if (Array.isArray(data.clipKeytypes)) {
      keytypes = data.clipKeytypes.join(", ");
    } else if (typeof data.clipKeytypes === "object" && data.clipKeytypes !== null) {
      keytypes = Object.values(data.clipKeytypes).join(", ");
    } else {
      keytypes = data.clipKeytypes;
    }
    
    // Build the text content for the export.
    const textContent = 
`Store ID: ${data.clipStore} \r\n
Clip Title: ${data.clipTitle} \r\n
Clip Category: ${data.clipCategory} \r\n
Clip Name: ${data.clipName} \r\n
Clip Time: ${data.clipTime} \r\n
Clip Price: ${data.clipPrice} \r\n
Clip ID: ${data.clipID} \r\n
Clip Date: ${data.clipAddedDate} \r\n
Related Categories: ${keywords} \r\n
Clip Keywords: ${keytypes} \r\n
Clip Description: ${data.clipDescription}`;
    
    const fileName = `${data.clipID}-${data.clipTitle.trim() || "export"}.txt`;
    downloadFile(fileName, textContent, "text/plain");
    updateStatus("Exported as Text.");
  });
});

// Event listener for CSV export.
document.getElementById("exportCSV").addEventListener("click", function() {
  getFormData(data => {

    // Convert clipKeywords to a comma-separated string.
    let keywords = "";
    if (Array.isArray(data.clipKeywords)) {
      keywords = data.clipKeywords.join(", ");
    } else if (typeof data.clipKeywords === "object" && data.clipKeywords !== null) {
      keywords = Object.values(data.clipKeywords).join(", ");
    } else {
      keywords = data.clipKeywords;
    }
    
    // Convert clipKeytypes to a comma-separated string.
    let keytypes = "";
    if (Array.isArray(data.clipKeytypes)) {
      keytypes = data.clipKeytypes.join(", ");
    } else if (typeof data.clipKeytypes === "object" && data.clipKeytypes !== null) {
      keytypes = Object.values(data.clipKeytypes).join(", ");
    } else {
      keytypes = data.clipKeytypes;
    }
	
	
    const header = ["Store ID", "Clip Title", "Clip Category", "Clip Name", "Clip Time", "Clip Price", "Clip ID", "Clip Date", "Related Categories", "Clip Keywords", "Clip Description"];
    const row = [
	  escapeCSV(data.clipStore),
      escapeCSV(data.clipTitle),
      escapeCSV(data.clipCategory),
      escapeCSV(data.clipName),
      escapeCSV(data.clipTime),
      escapeCSV(data.clipPrice),
      escapeCSV(data.clipID),
	  escapeCSV(data.clipAddedDate),
	  escapeCSV(keywords),
	  escapeCSV(keytypes),
      escapeCSV(data.clipDescription)
    ];
    const csvContent = header.join(",") + "\n" + row.join(",") + "\n";
    const fileName = `${data.clipID}-${data.clipTitle.trim() || "export"}.csv`;
    downloadFile(fileName, csvContent, "text/csv;charset=utf-8;");
    updateStatus("Exported as CSV.");
  });
});

// Event listener for XML export.
document.getElementById("exportXML").addEventListener("click", function() {
  getFormData(data => {
    // Convert clipKeywords to a comma-separated string.
    let keywords = "";
    if (Array.isArray(data.clipKeywords)) {
      keywords = data.clipKeywords.join(", ");
    } else if (typeof data.clipKeywords === "object" && data.clipKeywords !== null) {
      keywords = Object.values(data.clipKeywords).join(", ");
    } else {
      keywords = data.clipKeywords;
    }
    
    // Convert clipKeytypes to a comma-separated string.
    let keytypes = "";
    if (Array.isArray(data.clipKeytypes)) {
      keytypes = data.clipKeytypes.join(", ");
    } else if (typeof data.clipKeytypes === "object" && data.clipKeytypes !== null) {
      keytypes = Object.values(data.clipKeytypes).join(", ");
    } else {
      keytypes = data.clipKeytypes;
    }
	
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<ClipData>
<StoreID>${escapeXML(data.clipStore)}</StoreID>
  <ClipTitle>${escapeXML(data.clipTitle)}</ClipTitle>
  <ClipCategory>${escapeXML(data.clipCategory)}</ClipCategory>
  <ClipName>${escapeXML(data.clipName)}</ClipName>
  <ClipTime>${escapeXML(data.clipTime)}</ClipTime>
  <ClipPrice>${escapeXML(data.clipPrice)}</ClipPrice>
  <ClipID>${escapeXML(data.clipID)}</ClipID>
   <ClipDate>  <![CDATA[   ${data.clipAddedDate}   ]]></ClipDate>
    <RelatedCategories> <![CDATA[ ${keywords} ]]></RelatedCategories>
	<ClipKeywords> <![CDATA[ ${keytypes} ]]></ClipKeywords>
  <ClipDescription>
  <![CDATA[
  ${data.clipDescription}
  ]]>
  </ClipDescription>
</ClipData>`;
    const fileName = `${data.clipID}-${data.clipTitle.trim() || "export"}.xml`;
    downloadFile(fileName, xmlContent, "application/xml");
    updateStatus("Exported as XML.");
  });
});

// Event listener for HTML export
// Format data as a complete HTML file
// Event listener for HTML export. This should be easy, right?
document.getElementById("exportHTML").addEventListener("click", function() {
  getFormData(data => {
	   
    // Convert clipKeywords to a comma-separated string.
    let keywords = "";
    if (Array.isArray(data.clipKeywords)) {
      keywords = data.clipKeywords.join(", ");
    } else if (typeof data.clipKeywords === "object" && data.clipKeywords !== null) {
      keywords = Object.values(data.clipKeywords).join(", ");
    } else {
      keywords = data.clipKeywords;
    }
    
    // Convert clipKeytypes to a comma-separated string.
    let keytypes = "";
    if (Array.isArray(data.clipKeytypes)) {
      keytypes = data.clipKeytypes.join(", ");
    } else if (typeof data.clipKeytypes === "object" && data.clipKeytypes !== null) {
      keytypes = Object.values(data.clipKeytypes).join(", ");
    } else {
      keytypes = data.clipKeytypes;
    }
		
    const htmlContent =
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Exported Form Data</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 8px 12px; }
    th { background-color: #f5f5f5; text-align: left; }
  </style>
</head>
<body>
  <h1>Exported Form Data - ${data.clipTitle}</h1>
  <table>
    <tr>
      <th>Field</th>
      <th>Value</th>
    </tr>
	<tr><td>Store ID</td><td>${data.clipStore}</td></tr>
    <tr><td>Clip Title</td><td>${data.clipTitle}</td></tr>
    <tr><td>Clip Category</td><td>${data.clipCategory}</td></tr>
    <tr><td>Clip Name</td><td>${data.clipName}</td></tr>
    <tr><td>Clip Time</td><td>${data.clipTime}</td></tr>
    <tr><td>Clip Price</td><td>${data.clipPrice}</td></tr>
    <tr><td>Clip ID</td><td>${data.clipID}</td></tr>
	<tr><td>Clip Date</td><td>${data.clipAddedDate}</td></tr>
	<tr><td>Related Categories</td><td>${keywords}</td></tr>
	<tr><td>Clip Keywords</td><td>${keytypes}</td></tr>
    <tr><td>Clip Description</td><td>${data.clipDescription}</td></tr>
  </table>
</body>
</html>`;
    const fileName = `${data.clipID}-${data.clipTitle.trim() || "export"}.html`;
    downloadFile(fileName, htmlContent, "text/plain");
    updateStatus("Exported as HTML.");
  });
});

