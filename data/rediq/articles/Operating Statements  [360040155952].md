---
attachments: []
category: QuickSync
created_at: '2020-03-05T19:11:04Z'
id: 360040155952
original_url: https://rediq.zendesk.com/hc/en-us/articles/360040155952-Operating-Statements
section: 'Operating Statements '
title: 'Operating Statements '
updated_at: '2022-05-05T13:41:57Z'
---

## Operating Statements

Configuring the Operating Statement reports will be similar to configuring the rent roll reports. Some of the popular report exports frequently directly copied and pasted into user models are the Cash Flow and the source Line Items.  Before beginning here, confirm that the Chart of Accounts in your model template is compatible with your Chart of Accounts in redIQ.

### Current Client Export Users

* Once you have identified which reports are being used, you need only to choose the correct destination cell for that report and add the named range associated with that report to that cell.  As a rule, reports generated via the Add-in will have the same shape as the original excel exports, but they include only column headers, values, and totals.  Once you have identified the top left cell of the column headers, add the named range to that cell.  You can continue this practice with all other reports they are directly copying and pasting into your models.

### Other Clients

* If you are not a current client or don’t use our report exports, ask “which actual (historical) rent roll data is needed to drive the valuation?”  For some models, the answer may be “none.”  For others, you will likely need information on each unit or information on each floor plan.  Based off which data is needed, you can determine which redIQ report or reports will provide the required data.
* Once you have determined which report will provide the needed data, you need to determine where that report belongs.  The two options are to add the reports to their own new location and then to link the current inputs to the report which is recommended or to replace the existing inputs with the redIQ report.

* Recommended: If you choose to reference the redIQ report from the current inputs, you will need to just add formulas to the current inputs to reference the corresponding values in the redIQ reports. After adding these formulas, be sure to update the cell formatting to reflect that the inputs are now derived values and the inputs are elsewhere. NOTE: This option is recommended because it will be easier to spot any mistakes you may make and correct them. It is also easier to configure because it doesn’t require moving pieces of their model around, only redirects inputs to pull from redIQ reports.
* If you choose to replace the existing inputs, you will likely need to update any formulas referencing the current inputs so that the correct input data is being pulled.

* You may wish to create derivative data based on the operating statement data, such as T-12, T-3, T-1, or YTD data. To get these figures, we recommend adding the Cashflow Overview report then adding a column that sums the data from the last 12 months to create the desired derivative data.

## Final Steps

* You will likely want to test that data is being populated correctly.  After all destinations have been set, click “Populate” at the bottom of the Select Data Elements page.
* Confirm that data is flowing in as expected and that your valuation is working as expected.
* For more rigorous testing, populate the previous version of your Excel template without using the Excel Add-in.  Compare your valuation outputs.  These outputs should match across the two templates.
* Once you are confident you have correctly configured the model template, save the updated template to the location where you house model templates.

* If others use the same template, be sure to communicate any changes and make sure they are using the redIQ Excel Add-in.
* If there are any remaining questions, reach out to [support@rediq.com](mailto:support@rediq.com) for support.