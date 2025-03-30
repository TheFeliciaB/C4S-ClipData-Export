# C4S-ClipData-Export
A quick and dirty Firefox extension to export individual clip data in the old studio admin. 
Cobbled together from numerous prompts in Microsoft CoPilot and frantic Googling. 
Export a single Clip's data in to a TXT, CSV, XML or HTML file.  

Notes:
1. The Store ID is there, but the store name is not. That information doesn't appear to be on the clip data page.
2. Related categories and keywords haven't been added.
3. Descriptions preserve the HTML. If your Clip Description used HTML tables, it might cause issues with HTML export.
4. Complex Titles or unusual characters in the Title could cause an issue with the filename.
5. Use at your own risk, I don't know what I'm doing.
6. This is not a bulk tool, and can only be done one page at a time.

Install in Firefox (I don't know how to make an XPI yet):
1. Go to about:debugging and click This Firefox.
2. Click Load Temporary Add-on and load "manifest.json" from the src directory.
3. Now it should be an option when you hit the "Extensions" button.
4. If you restart Firefox, you have to re-add this.

To Use:
1. Log in to your C4S account and go to the Old Admin.
2. Go to List Clips.
3. Go to the clip you want to export data from.
4. Wait for the page to load completely, then click the Extensions button, then the C4S Old Admin Exporter button.
5. Choose your preferred format, or get a copy in every format since you never know when it may come in handy.
