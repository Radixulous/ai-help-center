---
id: 360036141132
title: Edit Rent Roll Screen / Anomalies
product: redIQ
category: dataIQ
section: Rent Rolls
attachments:
- 25805949248532.png
- 9154732733716.png
- 25805963544852.png
- 25805963558548.png
created_at: '2019-11-21T17:07:45Z'
updated_at: '2024-10-07T16:41:44Z'
suggested_queries:
- - "What actions can I take on the Edit Rent Roll screen for anomalies in redIQ?"
- - "How do I edit lease dates and charges in the Rent Roll section?"
- - "What are the steps to resolve anomalies in the rent roll data?"
---
The original mapping selections or mappings of individual units can be changed on the Edit Rent Roll screen. Hover over the Rent Roll tab, navigate to the Manage Rent Rolls screen and click Edit.

![The screenshot displays a user interface from a SaaS application, likely the redIQ platform, focused on managing rent rolls. Here's a detailed description:
### Main Interface Elements:
- \*\*Top Navigation Bar:\*\* Contains tabs labeled "Deals," "Shared Deals," "Comps," and "Deal Accelerator."
- \*\*Main Tabs:\*\* Below the navigation bar, there are tabs labeled "Overview," "Rent Roll," "Operating Statement," "FirstPass," and "Sharing." The "Rent Roll" tab is currently active.
- \*\*Action Buttons:\*\*
- "Generate Model" and "Upload" buttons are located at the top right.
- "Edit Rent Roll" and "Export to Excel" buttons are prominently displayed on the right side of the screen](attachments/25805949248532.png)

There are a few actions that can be taken on this screen. If any anomalies appear in the rent roll data, they will be listed on the left side of the screen. An anomaly will appear if an occupied unit has one of the following issues:

* Contractual Rent has duplicate charges
* Value of Contractual Rent is more than 30% above or below its Market Rent
* Contractual Rent is missing
* Recurring Concessions has duplicate charges
* Lease Start Date is missing but other occupied units have a Lease Start Date
* Move In Date is missing but other occupied units have a Move In Date

Edits to the data can be made on this screen. To edit the Net SF, Market Rent, Charges, or Lease Dates, click directly on the cell of the data to be changed. If one of the charges are clicked a screen will appear to edit any of the charges. In this screen there is also an option to delete a charge. Any of the other data can be edited directly in the cell. To revert back to the original data, right click on the cell and select the corresponding option. To revert a charge back to the original, click the corresponding button on the edit charge screen.

If a unit with an anomaly is edited so the issue no longer exists, it will no longer appear in the list of Anomalies.

To edit data from the mappings such as Floor Plans or Occupancy, there are three approaches that can be taken. Any of the original mappings can be changed by clicking the Mappings drop-down in the top right corner of the screen.

![The screenshot displays a section of a SaaS application interface, likely from the redIQ platform. Here's a detailed description:
### Main Interface Elements:
- \*\*Buttons:\*\*
- \*\*Upload\*\*: A prominent button at the top, likely used for uploading data or files.
- \*\*Generate Model\*\*: Positioned next to the Upload button, possibly for creating or generating a model based on the data.
- \*\*Mappings\*\*: A dropdown button located towards the top right, used for accessing different mapping options.
- \*\*Edit Units\*\*: Another dropdown button, possibly for editing unit details.
- \*\*Export to Excel\*\*: A button for exporting data into an Excel file.
### Dropdown Menu:
- \*\*Mappings Dropdown\*\*: When clicked](attachments/9154732733716.png)

The mapping of a specific unit can be edited clicking on the row of the unit then clicking the Edit Units drop-down. Multiple units can be selected by holding Ctrl while clicking the units.

![Here's a detailed description of the SaaS application interface screenshot:
### Main Interface Elements
- \*\*Navigation Bar\*\*: At the top, there is a navigation bar with options like "Deals," "Shared Deals," "Comps," and "Deal Accelerator."
- \*\*Tabs\*\*: Below the navigation bar, there are several tabs including "Overview," "Rent Roll," "Operating Statement," "FirstPass," and "Sharing." The "Rent Roll" tab is currently active.
- \*\*Buttons\*\*:
- "Generate Model" and "Upload" buttons are located on the right side of the screen.
- "Edit Rent Roll" and "Export to Excel" buttons are also present, providing options for editing and exporting data.
### Highlight](attachments/25805963544852.png)

If a large batch of units needs to be selected, go directly to the Edit Units drop-down then copy and paste (using ctrl+v) the list of unit numbers into the corresponding box and click Select Units. When pasting in the list of units, the unit numbers can be separated by a comma, tab, or line break.

![The screenshot displays a "Batch Edit - Floorplan" dialog box within a SaaS application interface, likely part of the redIQ platform. Here's a detailed description:
1. \*\*Main Interface Elements:\*\*
- \*\*Dialog Box Title:\*\* "Batch Edit - Floorplan" prominently displayed at the top.
- \*\*Text Area:\*\* A large text box labeled "Enter Unit Numbers" where users can input unit numbers. The numbers are separated by commas.
- \*\*Buttons:\*\*
- "Select Units" button located below the text area.
- "Apply" button at the bottom right corner, likely to confirm changes.
- "Exit" button next to the "Apply" button, likely to close the dialog without saving changes.](attachments/25805963558548.png)

If the Market Rent or Net SF needs to be edited by floor please refer to the article detailing that process [here](https://rediq.zendesk.com/hc/en-us/articles/360036141212).

##### Note

*If there are further edits need to be made to the original data that cannot be made directly on this screen, the following steps can be taken. First export the rent roll to Excel from the Floor Plan Summary or Manage Rent Rolls screen. Once the rent roll has been exported to Excel, go to the Source Data tab of the spreadsheet and make changes in the appropriate cells. Save the file and go back to the deal in redIQ. Hover over the Rent Roll tab, navigate to the Manage Rent Rolls screen and delete the old rent roll. Upload the file that was just saved and click through the mappings (prior entries should be pre-filled). Note that there's no need to worry about any of the other tabs in the Excel spreadsheet as redIQ will only pull data from the Source Data tab and ignore all other tabs.*