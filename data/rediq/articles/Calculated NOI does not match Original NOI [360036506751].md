---
id: 360036506751
title: Calculated NOI does not match Original NOI
product: redIQ
category: dataIQ
section: Operating Statements
attachments:
- 25816543370388.png
created_at: '2019-11-21T16:28:54Z'
updated_at: '2024-10-07T16:40:48Z'
suggested_queries:
- - "Why does my calculated NOI differ from the original NOI in redIQ?"
- - "What should I check if calculated NOI does not match original NOI?"
- - "How do I fix discrepancies between calculated and original NOI in redIQ?"
---
When mapping the Operating Statement data on the Source Data page, the Calculated NOI and Original NOI appear at the bottom of the screen. After the entire statement has been mapped, these two numbers should match for every month. If they don't match, the first thing that should be checked is if all data was mapped correctly. The most common mistake is that a line item was accidentally left blank or a subtotal row was mapped so the data is being double counted. If the data has been mapped correctly and the NOI numbers still don't match, there are a few potential issues.

One possible issue is that the incorrect row was selected as the first expense row. When Operating Statements are added, the first expense row must be identified. The platform will recognize all lines above that row as revenues and all lines below it as expenses. It will automatically determine if the sign (+/-) of the expenses needs to be "flipped" from positive to negative, but it will treat all revenues as they are entered. All revenue rows are highlighted white in the Source Data and all expenses are beige. If the first expense row needs to be changed, right click on the row in the Source Data and choose to Mark Selected Row as First Expense.

![The interface displayed is part of a SaaS application, likely the redIQ platform, used for financial data management. Here's a detailed description:
### Main Interface Elements:
- \*\*Tabs at the Top:\*\*
- "Overview," "Rent Roll," "Operating Statement," "FirstPass," "Sharing." These tabs allow navigation between different sections of the application.
- \*\*Dropdown Menus:\*\*
- \*\*View:\*\* Currently set to "Actuals."
- \*\*Adjusted Values:\*\* Another dropdown for selecting data view options.
- \*\*Group by:\*\* Set to "Original Order," allowing users to organize data.
- \*\*Data Table:\*\*
- Columns include "Code," "Account," "Line Item," and a dropdown for time period](attachments/25816543370388.png)

Positive rental loss factors in the Revenue section of the operating statement could be another issue. As mentioned above, all positive revenue numbers will be added and negative revenue numbers will be subtracted. The rental loss factors such as vacancy and loss to lease are almost always entered as negative numbers. However if they are entered as positive numbers that should be subtracted, redIQ will add these as positive numbers instead of subtract them. To fix this, change the numbers in the Excel file from positive to negative before loading the data to redIQ. If a statement has already been loaded and mapped in redIQ, there is no need to delete it. Once changes have been made in Excel, the new data can be copied and pasted in again, then a notification will appear asking if you’d like to overwrite the existing data. Say yes and then an option to apply mappings from the deleted statement will appear. This will ensure you don’t need to redo the work of mapping the line items to your chart of accounts.

Another potential issue is that the NOI provided in the original statement is incorrect. Check the math in the original statement to ensure the listed NOI is correct.