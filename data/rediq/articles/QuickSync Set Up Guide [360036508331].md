---
attachments: []
category: QuickSync
created_at: '2019-11-21T17:03:28Z'
id: 360036508331
original_url: https://rediq.zendesk.com/hc/en-us/articles/360036508331-QuickSync-Set-Up-Guide
section: Getting Started
title: QuickSync Set Up Guide
updated_at: '2025-05-28T21:44:28Z'
---

### **Purpose**

This guide will explain how to use the redIQ QuickSync Excel Add-in to populate an Excel model template. The goal is to configure your template so data can be populated automatically using QuickSync. This documentation will address make suggestions on how to use the QuickSync add-in for Microsoft Excel. For additional documentation on installing QuickSync’s add-in into your instance of Excel, please click here.

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

#### Refresh/Update Data

* After having populated data once, you can refresh your workbook with the most up to date data by simply selecting the deal and clicking "Populate"
* If you do not want to update certain
* If you have previously populated a report from redIQ into your Excel workbook via the add-in, it will clear the previous report before populating the new data.  The area that is cleared based on the dimensions of the previously populated data
  + **NOTE:** If you are using a version of Excel earlier than Build 7870.2024 (15.36 on Mac), the data will not clear when refreshed.  We recommend manually clearing your report data before updating.
* There is an Internet Explorer bug that impacts Excel add-ins in which sometimes icons do not render or do not render correctly.  To correct, you need to add redIQ (https://\*.rediq.io) to your list of trusted sites in IE.

### **Date Type-Specific Recommendations**

#### Property Details

* These are the simplest to configure.  For these, we will likely be able to populate cells directly with the data from redIQ.  For instance, if you identify Deal Name or Property Name in the model template, you would cross check with the redIQ Excel Add-in and notice that Deal Name from redIQ probably belongs here. NOTE:  you may see some property details in multiple locations across multiple worksheets in the excel model, the only one which should be populated for a single value like Deal Name with redIQ data is the original input cell which the other values pull from. The one which should pull from redIQ data will likely be called out as an input cell in blue or another color and on an input tab and will NOT contain a formula in it.

* Once you have identified the cell where Deal Name belongs, use the Add-in to create the associated named range on that cell.  To test you have configured this correctly, add a value to that cell (ie, ABC Apartments), then, in a blank cell, input “=rediq\_dealname” (without the parentheses) then ENTER.  If “ABC Apartments” now appears in the second cell, you have successfully configured Deal Name and on each subsequent deal, Deal Name will be automatically populated in that location.

### **Rent Roll**

The rent roll may be more complex to configure depending on the model practices. If you are an existing client and use the redIQ exports to populate your models, you should be able to select the report in the add-in and populate that data without needing to modify your model.  Some of the popular report exports frequently directly copied and pasted into user models are the Floor Plan Summary, the Rent Roll, and the Rent Roll Source Data.  If you are not current client or do not use the redIQ report exports, you may need to make other changes.

### **Current Client Export Users**

* Once you have identified which reports are being used, you need only to choose the correct destination cell for that report and add the named range associated with that report to that cell.  As a rule, reports generated via the Add-in will have the same shape as the original excel exports, but they include only column headers, values, and totals.  Once you have identified the top left cell of the column headers, add the named range to that cell.  You can continue this practice with all other reports they are directly copying and pasting into your models.

### **Other Clients**

* If you are not a current client or don’t use our report exports, ask “which actual (historical) rent roll data is needed to drive the valuation?”  For some models, the answer may be “none.”  For others, you will likely need information on each unit or information on each floor plan.  Based off which data is needed, you can determine which redIQ report or reports will provide the required data.

* Once you have determined which report will provide the needed data, you need to determine where that report belongs.  The two options are to add the reports to their own new location and then to link the current inputs to the report which is recommended or to replace the existing inputs with the redIQ report.

* Recommended: If you choose to reference the redIQ report from the current inputs, you will need to just add formulas to the current inputs to reference the corresponding values in the redIQ reports. After adding these formulas, be sure to update the cell formatting to reflect that the inputs are now derived values and the inputs are elsewhere. NOTE: This option is recommended because it will be easier to spot any mistakes you may make and correct them. It is also easier to configure because it doesn’t require moving pieces of their model around, only redirects inputs to pull from redIQ reports.
* If you choose to replace the existing inputs, you will likely need to update any formulas referencing the current inputs so that the correct input data is being pulled.

### **Operating Statements**

Configuring the Operating Statement reports will be similar to configuring the rent roll reports. Some of the popular report exports frequently directly copied and pasted into user models are the Cash Flow and the source Line Items.  Before beginning here, confirm that the Chart of Accounts in your model template is compatible with your Chart of Accounts in redIQ.

### **Current Client Export Users**

* Once you have identified which reports are being used, you need only to choose the correct destination cell for that report and add the named range associated with that report to that cell.  As a rule, reports generated via the Add-in will have the same shape as the original excel exports, but they include only column headers, values, and totals.  Once you have identified the top left cell of the column headers, add the named range to that cell.  You can continue this practice with all other reports they are directly copying and pasting into your models.

### **Other Clients**

* If you are not a current client or don’t use our report exports, ask “which actual (historical) rent roll data is needed to drive the valuation?”  For some models, the answer may be “none.”  For others, you will likely need information on each unit or information on each floor plan.  Based off which data is needed, you can determine which redIQ report or reports will provide the required data.
* Once you have determined which report will provide the needed data, you need to determine where that report belongs.  The two options are to add the reports to their own new location and then to link the current inputs to the report which is recommended or to replace the existing inputs with the redIQ report.

* Recommended: If you choose to reference the redIQ report from the current inputs, you will need to just add formulas to the current inputs to reference the corresponding values in the redIQ reports. After adding these formulas, be sure to update the cell formatting to reflect that the inputs are now derived values and the inputs are elsewhere. NOTE: This option is recommended because it will be easier to spot any mistakes you may make and correct them. It is also easier to configure because it doesn’t require moving pieces of their model around, only redirects inputs to pull from redIQ reports.
* If you choose to replace the existing inputs, you will likely need to update any formulas referencing the current inputs so that the correct input data is being pulled.

* You may wish to create derivative data based on the operating statement data, such as T-12, T-3, T-1, or YTD data. To get these figures, we recommend adding the Cashflow Overview report then adding a column that sums the data from the last 12 months to create the desired derivative data.

### **Final Steps**

* You will likely want to test that data is being populated correctly.  After all destinations have been set, click “Populate” at the bottom of the Select Data Elements page.
* Confirm that data is flowing in as expected and that your valuation is working as expected.
* For more rigorous testing, populate the previous version of your Excel template without using the Excel Add-in.  Compare your valuation outputs.  These outputs should match across the two templates.
* Once you are confident you have correctly configured the model template, save the updated template to the location where you house model templates.

* If others use the same template, be sure to communicate any changes and make sure they are using the redIQ Excel Add-in.
* If there are any remaining questions, reach out to [support@rediq.com](mailto:support@rediq.com) for support.

### **Best Practices and Tips**

* Do not put data tables with indeterminate numbers of rows, like a floor plan summary or rent roll, above other data elements, as the data below may get overwritten if the property has many floor plans or units.  Properties can have up to 100 floor plans.

* Leave enough room in references for variable amounts of data.  If you are referencing a data table elsewhere, such as in a formula that is referencing all values in a table or another table that is transforming values, be sure to leave enough room for the maximum possible number of values.
* If you are referencing redIQ reports as source data for your proforma, you should make the values being populated from redIQ blue so that it is clear where data needs to be populated.  Any values derivative of this data should be black so that it is clear this data is not an input and is referencing other cells.
* Data should only have one input location.  Having multiple inputs for the same data points increases the difficulty and complexity in updating a workbook and increases the likelihood of inconsistencies developing across the workbook.  If you need data in multiple places, simply use a formula to reference the single input.
* If you modify your Chart of Accounts in redIQ, you will need to be sure to update your model as well, as the data will populate differently.
* If you have previously added rent roll or operating statement data, we recommend clearing out the previously populated data before updating your workbook with fresh data so that any old data that is not overwritten doesn't skew your underwriting.

* Most formatting will be inherited from the workbook, so you should format reports to be consistent with the theming and number formats of your workbook.

### **How to Add, Edit, and Delete Named Ranges**

### Add Named Range:

* Copy (CTRL+C) the desired name of the named range
* Paste (CTRL+V) into the Name Box at the top left of the viewport

* Click ENTER

### Edit Named Range:

* Open “Formulas” tab on top ribbon
* Open “Name Manager”
* Select desired named range

* Click EDI to update name or location

### Delete Named Range:

* Open “Formulas” tab on top ribbon
* Open “Name Manager”
* Select desired named range

* ### Click “Delete” to delete

### **Compatability**

* Excel on Windows Version 1509 (Build 4927.1000) or later connected to Office 365 **(RECOMMENDED)**
  + Note: for best performance, use the latest version of Excel 365 on Windows
* Excel on the web January 2016 or later connected to Office 365
  + Note: if your browser is configured to block third party cookies, you must add [\*.]rediq.io to your list of exceptions
  + Note: you must configure your template in a desktop version of Excel, as Named Ranges cannot be added or modified in Excel on the web
* Excel on Mac 15.20 or later connected to Office 365

### **Data Elements Available via the Add-in**

| Group | Name | Named Range | Description |
| --- | --- | --- | --- |
| Property Details | Deal Name | rediq\_dealname |  |
| Property Details | Units | rediq\_units |  |
| Property Details | Square Feet | rediq\_squarefeet |  |
| Property Details | Acres | rediq\_acres |  |
| Property Details | Stories | rediq\_stories |  |
| Property Details | Year Built | rediq\_yearbuilt |  |
| Property Details | Address | rediq\_address1 |  |
| Property Details | ZIP Code | rediq\_zip |  |
| Property Details | City | rediq\_city |  |
| Property Details | State | rediq\_state |  |
| Property Details | Market | rediq\_market |  |
| Property Details | Year Renovated | rediq\_yearrenovated |  |
| Property Details | Number of Buildings | rediq\_numberofbuildings |  |
| Property Details | Parking Spaces | rediq\_parkingspaces |  |
| Property Details | Current Owner | rediq\_currentowner |  |
| Property Details | Location Quality | rediq\_locationquality |  |
| Property Details | Asset Quality | rediq\_assetquality |  |
| Property Details | Parcel | rediq\_parcelnumber |  |
| Property Details | Property Manager | rediq\_propertymanager |  |
| Property Details | Account Name | rediq\_accountname |  |
| Rent Roll Data | Rent Roll | rediq\_rentroll | Rent Roll in standard redIQ format with data summarize based on mapping to redIQ standards |
| Rent Roll Data | Floor Plan Summary | rediq\_floorplansummary | Summary of floor plans, including recent and in place rents, unit mix, and occupancy |
| Rent Roll Data | Source Rent Roll | rediq\_sourcerentroll | Rent Roll in redIQ format with source data information |
| Rent Roll Data | Rent Roll with Commercial | rediq\_rentrollwithcommercial |  |
| Rent Roll Data | Rent Roll As Of Date | rediq\_rentrollasofdate |  |
| Operating Statement Data | Cash Flow Overview | rediq\_cashflow\_overview | Summarizes operating statement last 3 full years and last 12 months in standard chart of accounts |
| Operating Statement Data | Cash Flow All Months | rediq\_cashflow\_allmonths | Summarizes operating statement monthly data in standard chart of accounts |
| Operating Statement Data | Line Items Overview | rediq\_lineitems\_overview | Summarizes unique line item by last 3 full years and 12 months |
| Operating Statement Data | Historicals Comps | rediq\_historicalscomps | Summarizes subject and comp properties saved to deal and associated operating statement data |