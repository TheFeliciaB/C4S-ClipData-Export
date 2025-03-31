# C4S-ClipData-Export
A quick and dirty Firefox extension to export individual clip data in the old studio admin. 
Cobbled together from numerous prompts in Microsoft CoPilot and frantic Googling. 
Export a single Clip's data in to a TXT, CSV, XML or HTML file.  

Source code is open. Modify as you like! 

Notes:
1. The Store ID is there, but the store name is not. That information doesn't appear to be on the clip data page.
~~2. Related categories and keywords haven't been added.~~ Added!
2. Descriptions preserve the HTML. If your Clip Description used HTML tables, it might cause issues with HTML export.
3. Use at your own risk, I don't know what I'm doing.
4. This is not a bulk tool, and can only be done one page at a time.
5. If a clip is awaiting activation, DATE ADDED will be the date it was added in to the system, not the date the clip is set to be published.
6. If a Keyword field is empty, it still adds the comma. 

Install in Firefox (XPI file):
1. You can go to about:addons , click the gear, then Install Add on from File. You may also be able to drag and drop the XPI file in to the address bar and it should ask to install.
2. You can turn it off after using it through Manage or Remove extension, then turn it back on when you need it. Not sure how to get that as part of a feature.
3. You can also go to about:debugging and add it as a temporary addon, that way it's removed when you close Firefox, and only add it back when you need it.

To Use:
1. Log in to your C4S account and go to the Old Admin.
2. Go to List Clips.
3. Go to the clip you want to export data from.
4. Wait for the page to load completely, then click the Extensions button, then the C4S Old Admin Exporter button.
5. Choose your preferred format, or get a copy in every format since you never know when it may come in handy.
