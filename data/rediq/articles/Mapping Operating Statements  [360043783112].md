---
attachments: 
suggested_queries:
- - "How do I map operating statements to the Chart of Accounts in rediq?"
- - "What are the steps to apply legacy mappings for operating statements?"
- - "How can I edit line items in the source data for cash flow mapping?"
---
To produce a rolled-up cash flow, use the Map Operating Statements feature by assigning the line items of an operating statement to the Chart of Accounts. Refer to the [**Chart of Accounts**](https://rediq.zendesk.com/hc/en-us/articles/360036506651-Chart-of-Accounts)page on how to customize line items. 

### **Navigate to the Source Data**

To begin mapping, click on the **Operating Statement** tab in the selected deal, then click **Source Data** to access mapping page. 

![Mapping1.png](https://rediq.zendesk.com/hc/article_attachments/360058243032/Mapping1.png)

### **Map Line Items to The Account Column**

Identify the account tab, then double click on cell to mark the proper Chart of Accounts. 

![1234986.png](https://rediq.zendesk.com/hc/article_attachments/360058483912/1234986.png)

![89754.png](https://rediq.zendesk.com/hc/article_attachments/360058484052/89754.png)

After the initial mapping, click on the lock symbol to make changes to line item according to Chart of Accounts to edit. 

### **Map Line Items to The Account Column**

Either map individual line items skipping subtotals, OR map subtotals and skip line items to ensure you do not double count.

![5646.png](https://rediq.zendesk.com/hc/article_attachments/360058648971/5646.png)

### **Mapping Multiple Lines**

To map multiple Charts of Accounts and line items with the same values, drag the selected items. Then click the drop down on Mappings at the top of the page and select fill down mappings or clear selected mappings. 

![7796.png](https://rediq.zendesk.com/hc/article_attachments/360058649211/7796.png)

#### **redIQ's Legacy Mappings**

feature automatically maps line items in the current batch based on the batch selected from previous Operating Statements.

Legacy Mappings only applies selected batches that are good matches with the current file. The pre-selected batch contains the highest number of items that will be mapped. Items that have not been mapped will be highlighted in yellow. 

### **Applying Legacy Mappings**

Click on **Mappings** on the top of the page and select **Apply Legacy Mappings** 

![mceclip0.png](https://rediq.zendesk.com/hc/article_attachments/5904584228756/mceclip0.png)

### **Using Batches**

The term "Batches" refers to the set of mappings given to a Deal that has already been mapped in your account. In the screenshot below, we can see the list of "Batches" available to choose from when choosing to apply Legacy Mappings. From the window, you can select the Best Match or the other options listed.

![blobid0.png](https://rediq.zendesk.com/hc/article_attachments/5904536639508/blobid0.png)

After you have selected the desired batch, you can edit the values on each line by selecting the cell, then clicking on the This Batch tab and use the drop down menu.

### **This Batch Drop Down Menu**

The This Batch Drop Down menu allows you to make edits and alterations to your Source Data in a few easy steps. Seen below is the Menu.

![I'm unable to identify or describe individuals in images, but I can help describe the interface elements visible in the screenshot.
The screenshot appears to show a dropdown menu from a SaaS application interface, likely related to data management or financial adjustments. Here's a detailed description:
### Main Interface Elements:
- \*\*Dropdown Menu\*\*: The menu is titled "This Batch" and includes various options for data manipulation.
- \*\*Buttons\*\*: There are buttons labeled "Mappings" and "This Batch," indicating different functionalities or settings.
### Menu Options:
1. \*\*Change How Expenses Were Provided (+/-)\*\*: This option likely allows users to adjust how expenses are displayed or calculated.
2. \*\*Mark Selected Row as First Expense\*\*: This could be used to designate a](attachments/16083397628820.jpg)

### **Changing how Expenses Were Provided**

This option within the This Batch drop down menu will allow you to flip the values from Negative to Positive and vice versa. This option can be easily utilized by highlighting the rows or desired data, then selecting the option to flip the value.

### **Mark Selected Row as First Expense**

The This Batch dropdown menu provides users with the Mark Selected Row as First Expense to easily select or correctly re-label the first Expense line of the Operating Statement Source Data.

### **Mark/Unmark Selected Row As Net Income**

The "This Batch" dropdown menu also provides easy options to Mark and Unmark the Selected Row As NOI. To do this, scroll down to the correct row, select the row, then select the "This Batch" drop down and choose between the two options available.

![9e8.png](https://rediq.zendesk.com/hc/article_attachments/360058687971/9e8.png)

### **Include/Exclude Selected Row from Net Income**

If you would like to include or exclude certain line items or data from an uploaded Operating Statement, you can do so by highlighting the row or value, and selecting the option to Exclude the value from the Net Income.

### **Mark/Unmark Header Rows**

This option is made available should users wish to make any empty rows a Header Row or to remove the Header Row status to create the option to add values in that portion of the data.

### **Highlight Outliers**

The**Highlight Outliers** tab on the top of the page is used to identify possible value discrepancies highlighted in red 

  ![6577.png](https://rediq.zendesk.com/hc/article_attachments/360058528032/6577.png)

### **Avoid special characters**

Any characters such as **"=,<,>"** could trigger an excel formula that will not be processed correctly and you will receive a 500 error message below.

![93453.jpg](https://rediq.zendesk.com/hc/article_attachments/360061455952/93453.jpg)