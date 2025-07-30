---
id: 19399320459412
title: Using SM+ with Legacy Mappings
product: redIQ
category: dataIQ
section: SmartMap+
attachments:
- 19432753692820.png
- 19432737741332.png
- 19432737750036.png
- 19432737758868.png
- 19432737775636.png
- 19432753751700.png
created_at: '2023-09-21T16:35:27Z'
updated_at: '2024-04-23T14:51:18Z'
suggested_queries:
- - "How do I apply Legacy Mappings for future OS uploads in rediq?"
- - "What steps are needed to use SM+ with Legacy Mappings in rediq?"
- - "Can I apply Legacy Mappings from a different deal in rediq?"
---
**How to map subsequent uploads using Legacy Mapping**

If you made any changes to the SM+ mapping and you want to ensure that subsequent uploads are mapped identically, you can utilize the Legacy Mappings option for future OS uploads. This will ensure that all future Operating Statements uploaded into the deal are mapped consistently. The “Override Existing Mappings” option is also compatible with Legacy Mappings; you can first apply Legacy Mappings, and then apply SM+ with the “override” option *turned off* to leverage both the Legacy Mappings and SM+ tool.

When presented with the SmartMap+ dialog box, press ‘Cancel’. Then, in the main ribbon near the top of the page, press the ‘Mappings’ button

![The screenshot displays a section of a SaaS application interface, likely from the redIQ platform, featuring a horizontal menu ribbon with several actionable elements:
1. \*\*Main Interface Elements:\*\*
- \*\*Buttons:\*\* There are four main buttons visible in the ribbon:
- \*\*Mappings:\*\* This button is highlighted with a red outline, indicating its importance or that it is the current focus. It likely provides options related to data mapping.
- \*\*This Batch:\*\* This button might allow users to select or manage the current batch of data they are working with.
- \*\*Highlight Outliers:\*\* This button probably helps users identify data points that deviate significantly from others, useful for data analysis.
- \*\*Export to Excel:\*\* This button suggests functionality for](attachments/19432753692820.png)

Then select "Apply Legacy Mappings"

![The screenshot shows a dropdown menu from a SaaS application interface, likely from the redIQ platform. Here’s a detailed description:
### Main Interface Elements:
- \*\*Dropdown Menu\*\*: The menu is labeled "Mappings" and is located near the top right corner of the interface.
### Menu Options:
1. \*\*Fill Down Mapping\*\*: This option likely allows users to apply a mapping configuration across multiple entries or fields.
2. \*\*Clear Selected Mappings\*\*: This option is used to remove mappings from selected items.
3. \*\*Clear All Shared Mappings For This Batch\*\*: This option clears all mappings that are shared within the current batch.
4. \*\*Apply Legacy Mappings\*\*: This option allows users to apply previously saved or older mapping](attachments/19432737741332.png)

Next, select the deal and OS upload that you want to use for mapping the current OS upload and press "Apply"

![This screenshot shows a section of a SaaS application interface, likely related to the redIQ platform. Here’s a detailed description:
### Main Interface Elements:
- \*\*Title Bar:\*\*
- The top of the interface features a title bar with the label "Apply Mappings From Another Batch," indicating the task or feature being accessed.
- \*\*Dropdown Menus:\*\*
- There are two dropdown menus labeled "Select the batch to copy mappings from:"
- The first dropdown is labeled with a placeholder "~ Please Select ~."
- The second dropdown is expanded, showing two options: "Jan 2022 - Dec 2022" and "Jan 2021 - Dec 2021."
- \*\*Buttons:\*\*
- Below the](attachments/19432737750036.png)

**Option 2: Apply Legacy Mapping from a batch previously uploaded into a different deal**

**1**. To apply Legacy Mapping from a batch that has been uploaded into a different deal than what you’re working in, after pressing the ‘Mappings’ button, select “Apply Legacy Mappings” from the drop-down menu.

![The screenshot shows a section of a SaaS application interface, likely from the redIQ platform, focused on mapping functionalities. Here’s a detailed description:
1. \*\*Main Interface Elements\*\*:
- \*\*Dropdown Menu\*\*: A dropdown menu labeled "Mappings" is prominently displayed. This menu provides various mapping options.
- \*\*Buttons and Options\*\*: Within the dropdown, several options are available for selection.
2. \*\*Highlighted Areas\*\*:
- The option "Apply Legacy Mappings" is highlighted in blue, indicating it is either selected or being hovered over.
3. \*\*Text Labels\*\*:
- \*\*Fill Down Mapping\*\*: An option to apply a mapping selection across multiple entries.
- \*\*Clear Selected Mappings\*\*: Allows](attachments/19432737758868.png)

**2**. Next, select the deal and OS upload that you want to use for mapping the current operating statement upload and press "Apply"

![The screenshot displays a section of the "Legacy Mappings" interface from a SaaS application, likely the redIQ platform. Here's a detailed description:
### Main Interface Elements:
- \*\*Title Bar\*\*: At the top, the interface is labeled "Legacy Mappings."
- \*\*List of Deals\*\*: Below the title, there is a list of deals with their respective mapping details.
### Highlighted Areas:
- \*\*Highlighted Deal\*\*: The deal "01260 - Happy Hollows" is prominently highlighted with a red border. This indicates it is the current focus or selection.
- \*\*Mapping Options\*\*: Within the highlighted area, there are several radio buttons for different date ranges, each labeled with a period (e.g., "Jan 202](attachments/19432737775636.png)

**How to use SmartMap+ when Legacy Mapping is set as the Default Mapping** **Method**

The default mapping method can be set to either SmartMap+ or Legacy Mapping in the Account settings. The default mapping method will apply to all users associated with the account. The instructions above assume that SmartMap+ has been set as the default mapping method.

If most of the operating statement formats you work with on a regular basis have already been uploaded into a deal and mapped using any mapping method, then you may want to set Legacy Mapping as the default setting for your account. To use SmartMap+ when Legacy Mapping is set as the default, after uploading and submitting the Operating Statement, the Legacy Mappings dialog box will be displayed. At this point, press the "Cancel" button to close that dialog box, then navigate to Mappings > SmartMap+.

![The screenshot displays two main sections of a SaaS application interface related to mapping tasks, likely from the redIQ platform. Here's a detailed description:
### Left Panel: Legacy Mappings
- \*\*Title:\*\* "Legacy Mappings" is prominently displayed at the top.
- \*\*List of Mappings:\*\* A vertical list shows various mapping tasks, each with a unique identifier and name, such as "01248 - Presbyterian Village Athens" and "01280 - RD\_TEST."
- \*\*Assigned To:\*\* Each mapping task is assigned to a specific individual, e.g., "Assigned to: Jonathan Boyd."
- \*\*Mapping Details:\*\* Each task shows the number of items to be mapped, e.g., "(21 items will be mapped)."
- \*\*Date Options](attachments/19432753751700.png)

From this point, you can now use SmartMap+ to map the uploaded OS as described in the How to upload operating statements utilizing SmartMap+ section.