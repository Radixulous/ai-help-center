---
suggested_queries:
- - "What are the best practices for organizing data tables in redIQ?"
- - "How should I format reports to match my workbook in redIQ?"
- - "What should I do before updating my rent roll data in redIQ?"
---
* Do not put data tables with indeterminate numbers of rows, like a floor plan summary or rent roll, above other data elements, as the data below may get overwritten if the property has many floor plans or units.  Properties can have up to 100 floor plans.

* Leave enough room in references for variable amounts of data.  If you are referencing a data table elsewhere, such as in a formula that is referencing all values in a table or another table that is transforming values, be sure to leave enough room for the maximum possible number of values.
* If you are referencing redIQ reports as source data for your proforma, you should make the values being populated from redIQ blue so that it is clear where data needs to be populated.  Any values derivative of this data should be black so that it is clear this data is not an input and is referencing other cells.
* Data should only have one input location.  Having multiple inputs for the same data points increases the difficulty and complexity in updating a workbook and increases the likelihood of inconsistencies developing across the workbook.  If you need data in multiple places, simply use a formula to reference the single input.
* If you modify your Chart of Accounts in redIQ, you will need to be sure to update your model as well, as the data will populate differently.
* If you have previously added rent roll or operating statement data, we recommend clearing out the previously populated data before updating your workbook with fresh data so that any old data that is not overwritten doesn't skew your underwriting.

* Most formatting will be inherited from the workbook, so you should format reports to be consistent with the theming and number formats of your workbook.