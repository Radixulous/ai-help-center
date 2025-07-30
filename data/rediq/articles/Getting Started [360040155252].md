---
id: 360040155252
title: Getting Started
product: redIQ
category: QuickSync
section: Getting Started
attachments: []
created_at: '2020-03-05T18:59:29Z'
updated_at: '2024-10-07T16:41:56Z'
suggested_queries:
- - "How do I set up the redIQ QuickSync Excel Add-in for my model?"
- - "What data can redIQ populate in my Excel template?"
- - "How do I specify and save data element destinations in Excel using redIQ?"
---
### **Purpose**

This guide will explain how to use the redIQ QuickSync Excel Add-in to populate an Excel model template.  The goal is to configure your template so data can be populated automatically using QuickSync.  This documentation will address make suggestions on how to use the QuickSync add-in for Microsoft Excel.  For additional documentation on installing QuickSync’s add-in into your instance of Excel, please click here.

### **Detailed Configuration Guide**

#### Get Started

* Open the model you would like to have set up  for redIQ data flow into.
* Save a new version of the template.  If you have an established versioning methodology, this methodology should be followed.
* Open the Add-In. You will find this in the top ribbon section of Excel with a logo in red.
* Login with your standard redIQ credentials. If you don’t yet have access to the Excel Add-In, contact your account manager or [support@rediq.com](mailto:support@rediq.com) for access.

* Select a deal.  For a first-time set up, it is suggested to use a fully populated deal so that you can test populating the template with your data.

#### Identify What Data to Populate

* Perform an inventory of the data you must input into your model to produce a valuation. Note: cells typically referred to as “inputs” or “input cells” are often styled in blue text. Coloring your inputs in a standardized color helps keep your model looking clean and easy to understand.
* You may find that your inputs are concentrated in 1 or 2 tabs (look for Inputs, Assumptions, Actuals, etc.). Moving your inputs into concise locations is another way to clean up your model.
* If a cell has a formula in it, it is UNLIKELY it is an input cell. Cells with formulas are destinations you most likely will not autofill with redIQ data. It is possible may still be an input but think twice before hardcoding a value in this cell. NOTE ON FORMULAS: if you click into the cell and see an equals “=” sign followed by values such as “=[formula]”, that means it has a formula and is making a calculation. Cells with calculations are typically styled in a **dark green**or**black**.

* After you’ve determined where all your inputs are located in your model, you will be able to clearly see where the redIQ Excel Add-in can support automating the population of your data.
* You may encounter cells in your model that need additional review. For example, there may be blue input cells for more subjective values—like percentage by which market rent should grow each year—the analyst or team will need to determine themselves and will not be automatically populated by redIQ.

#### What data can redIQ populate via the Add-in?

* You can populate property details, rent rolls, operating statements, and comps reports from your deals in redIQ.
* These will appear in the "Destination Not Configured" section of the add-in after you have selected a deal.
* For the complete list of available data elements and descriptions of each, please see the table at the bottom of this document.
* If there’s additional data that would be helpful to populate in your models, please reach out to [support@rediq.com](mailto:support@rediq.com) with requests.

#### Can I preview the data that will populate in my form?

* Yes, you can. On sections marked with “Destination Not Configured," individual report items will have a Preview link next to it. Clicking on this will create a preview of the report on a new tab in your workbook.

#### How to Specify and Save Data Element Destinations

* Configuration of where data elements belong utilizes named ranges in Excel.  Named ranges are alternative names for cells or arrays of cells.  By naming a cell, we allow users to customize and save where data from redIQ belongs and we allow that data to be populated even if that cell is moved or overwritten.
* Once you have determined which data you would like to add to your template and where it belongs, simply copy the specified named range and create that named range in the desired location.  For reports, the destination you specify will be the top left corner of the report.

* The named range associated with each data element accompanies each element in the add-in and is also available in the table with each data element in this document.
* For additional information on how to add, edit, and delete named ranges in Excel, please see the detailed documentation below.

Refresh/Update Data

* After having populated data once, you can refresh your workbook with the most up to date data by simply selecting the deal and clicking "Populate"
* If you do not want to update certain
* If you have previously populated a report from redIQ into your Excel workbook via the add-in, it will clear the previous report before populating the new data.  The area that is cleared based on the dimensions of the previously populated data
  + **NOTE:** If you are using a version of Excel earlier than Build 7870.2024 (15.36 on Mac), the data will not clear when refreshed.  We recommend manually clearing your report data before updating.
* There is an Internet Explorer bug that impacts Excel add-ins in which sometimes icons do not render or do not render correctly.  to correct, you need to add redIQ (https://\*.rediq.io) to your list of trusted sites in IE.

### **Data Type-Specific Recommendations**

#### Property Details

* These are the simplest to configure.  For these, we will likely be able to populate cells directly with the data from redIQ.  For instance, if you identify Deal Name or Property Name in the model template, you would cross check with the redIQ Excel Add-in and notice that Deal Name from redIQ probably belongs here. NOTE:  you may see some property details in multiple locations across multiple worksheets in the excel model, the only one which should be populated for a single value like Deal Name with redIQ data is the original input cell which the other values pull from. The one which should pull from redIQ data will likely be called out as an input cell in blue or another color and on an input tab and will NOT contain a formula in it.

* Once you have identified the cell where Deal Name belongs, use the Add-in to create the associated named range on that cell.  To test you have configured this correctly, add a value to that cell (ie, ABC Apartments), then, in a blank cell, input “=rediq\_dealname” (without the parentheses) then ENTER.  If “ABC Apartments” now appears in the second cell, you have successfully configured Deal Name and on each subsequent deal, Deal Name will be automatically populated in that location.