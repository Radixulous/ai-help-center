---
attachments:
- 360043595351.png
category: dataIQ
created_at: '2019-11-21T16:53:53Z'
id: 360036140392
original_url: https://rediq.zendesk.com/hc/en-us/articles/360036140392-Operating-Statements-and-Property-Data-Bulk-Upload
section: Operating Statements
title: Operating Statements and Property Data Bulk Upload
updated_at: '2024-03-15T18:01:22Z'
---

redIQ offers the ability to upload property and operating statements data from your property management system directly into redIQ system by means of bulk upload. 

Bulk upload is designed to enter large amounts of data for multiple properties to avoid having to enter the information manually via the redIQ web interface. 

You can upload property data as well as operating statements and information on how to map those operating statements to your redIQ chart of accounts. 

There are 3 pieces of information that are needed to upload the data. Property information, Line Items, and Operating Statement Data. Each of these items need to be provided in separate tab delimited format files and zipped into a single file which will be used for uploading into the system using the redIQ web interface.  If users wish to simply create and/or update Deals and their Deal Summaries, the user needs to only upload the Property File.  If a user is not creating new properties, they need simply upload the Line Items and Operating Statement Data files.  

### **File Naming Convention**

Property Data: property\_yyyymmdd.txt  

Line Items: lineItems\_yyyymmdd.txt 

Historical Data: historical\_yyyymmdd.txt 

Main File: yourAccountName\_yyyymmdd.zip 

You will need to zip the property, line items, and historical data into the main file. 

### **Property Data**

The most important pieces of information are *EntityID*, *DealName,* and *CounterId*.  

***EntityID*** is the unique key that identifies the property on your property management system. This key is the one that will be used to map the data in your operating statements to the property.  

***DealName*** is the name of the property and it is the name that will appear on your deal log. 

***CounterId*** is the existing equivalent of a property in redIQ. If you have existing deals in redIQ that you want to associate with the *EntityId*, populate this fields with the integer representation of the field Deal ID (in redIQ from your deal log). If you do not provide this information, the upload will create a new property (if the corresponding *EntityID* does not already exists). If you provide the *CounterID*, we will update the existing redIQ deal and associate it with the *EntityId* you have provided. 

The rest of the information is optional. It is recommended that you provide as much information as possible for the property so that you can take full advantage of the features and analytics that redIQ offers. 

The data has to be provided sequentially on a tab delimited format starting with the headers (column names). 

Please refer to the property data fields to see what information is available. 

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Property** | | | | |
| Field Name | Type | Required | Length | Notes |
| EntityId | string | Yes | 8000 | Unique |
| DealName | string | Yes | 200 |  |
| CounterId | int | No |  | redIQ Deal ID. Use this to associate existing deals in redIQ |
| Comments | string | No | 8000 |  |
| Broker | string | No | 100 |  |
| Fund | string | No | 50 |  |
| Address1 | string | No | 1000 |  |
| Address2 | string | No | 1000 |  |
| City | string | No | 50 |  |
| State | string | No | 2 |  |
| Zip | string | No | 20 |  |
| Notes | string | No | 8000 |  |
| PropertyManager | string | No | 8000 |  |
| AcquiredDate | date | No |  |  |
| ClosingDate | datetime | No |  |  |
| BidDueDate | datetime | No |  |  |
| DateOfLastSale | datetime | No |  |  |
| ExpectedPurchasePrice | decimal | No | (18,2) |  |
| EquityMultiple | decimal | No | (10,2) |  |
| IRR | decimal | No | (7,4) |  |
| RequiredEquity | decimal | No | (18,2) |  |
| GoingInCapRate | decimal | No | (7,4) |  |
| LastSalePrice | decimal | No | (38,6) |  |
| TotalSf | decimal | No | (18,5) |  |
| YearOfExit | int | No |  |  |
| NoOfUnits | int | No |  |  |
| YearBuilt | int | No |  |  |
| YearRenovated | int | No |  |  |
| NoOfBuildings | int | No |  |  |
| NoOfStories | int | No |  |  |
| AssignedTo | int | No |  | User ID |
| Elevator | bit | No |  |  |
| Doorman | bit | No |  |  |
| Waterfront | bit | No |  |  |
| FitnessCenter | bit | No |  |  |
| Pool | bit | No |  |  |
| RoofDeck | bit | No |  |  |
| DealStatusId | int | No |  | See Deal Status for values |
| AssetClassId | int | No |  | Value 1 |
| BuildingTypeId | int | No |  | See Building Type for values |
| AssetQualityId | int | No |  | See Asset Quality for  values |
| LocationQualityId | int | No |  | See Location Quality for  values |

Reference values for populating property information 

Below is a list of possible values (ids) that can be provided for the property if you want to populate the following fields: 

***Deal Status**, **Asset Class, Building Type, Asset Quality**,* and ***Location Quality***. 

 

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Deal Status** | |  | **Building Type** | |
| DealStatusId | Description |  | BuildingTypeId | Description |
| 1 | New |  | 1 | High Rise |
| 2 | Active |  | 2 | Mid Rise |
| 3 | Bid Placed |  | 3 | Garden / Low Rise |
| 4 | Closed |  | 4 | Townhouse |
| 5 | Dormant |  | 5 | SFR Subdivision |
| 6 | Passed |  |  |  |
| 7 | Lost |  | Asset Quality | |
| 8 | Withdrawn |  | AssetQualityId | Description |
| 9 | Exited |  | 1 | A+ |
| 10 | Owned Property |  | 2 | A |
| 11 | Property Comp |  | 3 | B |
|  |  |  | 4 | C |
| **Location Quality** | |  | 5 | D |
| LocationQualityId | Description |  |  |  |
| 1 | A |  | **Asset Class** | |
| 2 | B |  | AssetClassId | Description |
| 3 | C |  | 1 | Multifamily |

### **L****ine Items Data**

The line items information is used to map your line items with your chart of accounts in redIQ 

***LineItemId*** is the unique identifier on your property management system. This id will be used to link the line item to the corresponding historical data. 

***LineItemDescription*** is the field that will show on your historical data on the redIQ system.

***redIQChartOfAccount*** is the name of your chart of account name from your redIQ chart of accounts.

***Rank*** is used to display the order on which the line item will appear on the redIQ system. 

***IsExpenseAccount*** indicates whether or not the line item is an expense. All expense items should appear after the non-expense line items. Historical Data corresponding to Line Items with *IsExpenseAccount* = 1 should be given as positive (i.e. entries with *IsExpenseAccount* = 1 that are given as positive correspond to outflows, and those given as negative correspond to inflows). 

|  |  |  |  |
| --- | --- | --- | --- |
| Line Items | | | |
| Field Name | Type | Required | Notes |
| LineItemId | string | Yes | Unique |
| LineItemDescription | string | Yes |  |
| redIQChartOfAccount | string | Yes |  |
| Rank | int | No |  |
| IsExpenseAccount | bit | Yes |  |

### 

### **Historical Data**

Historical information is used to map your actual operating statement data and associate it to your property via *EntityID* and *LineItemID*. The *Value* field is assumed to be provided as positive for items with *LineItemIds* referencing Line Items with *IsExpenseAccount*.  

|  |  |  |  |
| --- | --- | --- | --- |
| Historical Data | | | |
| Field Name | Type | Required | Notes |
| EntityId | string | Yes | EntityId that corresponds to the property |
| LineItemId | string | Yes | LineItemId that corresponds to the LineItem |
| Date | datetime | Yes |  |
| IsAnnual | bit | Yes |  |
| Value | Decimal | Yes |  |

![blobid1.png](https://rediq.zendesk.com/hc/article_attachments/360043595351/blobid1.png)

### **Sample Data**

(Note: The actual data for property, line items and historical data, will have to be provided on its own tab-delimited file starting with the headers and zipped into a main file.) 

### Property

In this example we are uploading 2 properties. Note the EntityId values. They will be referenced on the Historical data. 

|  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EntityId | DealName | Address1 | Address2 | | City | State | Zip | TotalSf | NoOfUnits |
| 111aaa | Deal1 | 123 my place street | |  | Brooklyn | NY | 11231 | 691776 | 576 |
| 222bbb | Deal2 | 456 your lace street |  | | Brooklyn | NY | 11231 | 691776 | 576 |

### 

### **Line Items**

In this example we are associating the line items from your property management system to your redIQ chart of account

Note: the *LineItemId*. They will be referenced on the Historical data  

|  |  |  |  |
| --- | --- | --- | --- |
| LineItemId | LineItemDescription | redIQChartOfAccount | IsExpenseAccount |
| 1 | Gross Potential Rent | Potential Market Rent | No |
| 2 | Vacancy Loss | Vacancy | No |
| 3 | Bad Debt | Collection | No |
| 4 | Maintenance | Personnel | Yes |
| 5 | Electricity | Utilities | Yes |
| 6 | Real Estate Taxes | Real Estate Taxes | Yes |

### 

### **Historical Data**

In this example we are uploading historical monthly data for the 10/10/2017 and 11/10/2017 for the two properties and providing the values associated to each of the line items referenced by the *LineItemId*.

Note: The combined keys, *EntityId**, LineItemId, Date,**IsAnnual* make a unique key.  

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| EntityId | LineItemId | Date | IsAnnual | Values |
| 111aaa | 1 | 10/10/2017 | 0 | 768715.20 |
| 111aaa | 2 | 10/10/2017 | 0 | 4037.92 |
| 111aaa | 3 | 10/10/2017 | 0 | 43393.55 |
| 111aaa | 4 | 10/10/2017 | 0 | 5672.45 |
| 111aaa | 5 | 10/10/2017 | 0 | 3600.00 |
| 111aaa | 6 | 10/10/2017 | 0 | 1600.00 |
| 111aaa | 1 | 10/10/2017 | 0 | 1188014.40 |
| 111aaa | 2 | 10/10/2017 | 0 | 6056.87 |
| 111aaa | 3 | 10/10/2017 | 0 | 63421.34 |
| 111aaa | 4 | 10/10/2017 | 0 | 8103.50 |
| 111aaa | 5 | 10/10/2017 | 2664.00 | 0 |
| 111aaa | 6 | 10/10/2017 | 1120.00 | 0 |
| 111aaa | 1 | 11/10/2017 | 789680.16 | 0 |
| 111aaa | 2 | 11/10/2017 | 3836.02 | 0 |
| 111aaa | 3 | 11/10/2017 | 38386.60 | 0 |
| 111aaa | 4 | 11/10/2017 | 4700.03 | 0 |
| 111aaa | 5 | 11/10/2017 | 2808.00 | 0 |
| 111aaa | 6 | 11/10/2017 | 1180.00 | 0 |
| 111aaa | 1 | 11/10/2017 | 831610.08 | 0 |
| 111aaa | 2 | 11/10/2017 | 4037.92 | 0 |
| 111aaa | 3 | 11/10/2017 | 40389.38 | 0 |
| 111aaa | 4 | 11/10/2017 | 4943.14 | 0 |
| 111aaa | 5 | 11/10/2017 | 2952.00 | 0 |
| 111aaa | 6 | 11/10/2017 | 1240.00 | 0 |
| 222bbb | 1 | 10/10/2017 | 768715.20 | 0 |
| 222bbb | 2 | 10/10/2017 | 4037.92 | 0 |
| 222bbb | 3 | 10/10/2017 | 43393.55 | 0 |
| 222bbb | 4 | 10/10/2017 | 5672.45 | 0 |
| 222bbb | 5 | 10/10/2017 | 3600.00 | 0 |
| 222bbb | 6 | 10/10/2017 | 1600.00 | 0 |
| 222bbb | 1 | 10/10/2017 | 1188014.40 | 0 |
| 222bbb | 2 | 10/10/2017 | 6056.87 | 0 |
| 222bbb | 3 | 10/10/2017 | 63421.34 | 0 |
| 222bbb | 4 | 10/10/2017 | 8103.50 | 0 |
| 222bbb | 5 | 10/10/2017 | 2664.00 | 0 |
| 222bbb | 6 | 10/10/2017 | 1120.00 | 0 |
| 222bbb | 1 | 11/10/2017 | 789680.16 | 0 |
| 222bbb | 2 | 11/10/2017 | 3836.02 | 0 |
| 222bbb | 3 | 11/10/2017 | 38386.60 | 0 |
| 222bbb | 4 | 11/10/2017 | 4700.03 | 0 |
| 222bbb | 5 | 11/10/2017 | 2808.00 | 0 |
| 222bbb | 6 | 11/10/2017 | 1180.00 | 0 |
| 222bbb | 1 | 11/10/2017 | 831610.08 | 0 |
| 222bbb | 2 | 11/10/2017 | 4037.92 | 0 |
| 222bbb | 3 | 11/10/2017 | 40389.38 | 0 |
| 222bbb | 4 | 11/10/2017 | 4943.14 | 0 |
| 222bbb | 5 | 11/10/2017 | 2952.00 | 0 |
| 222bbb | 6 | 11/10/2017 | 1240.00 | 0 |