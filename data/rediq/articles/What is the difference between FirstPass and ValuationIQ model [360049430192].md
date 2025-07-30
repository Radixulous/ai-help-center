---
id: 360049430192
title: What is the difference between FirstPass and ValuationIQ model?
product: redIQ
category: dataIQ
section: FirstPass
attachments: []
created_at: '2020-09-18T16:38:26Z'
updated_at: '2024-10-07T16:42:48Z'
suggested_queries:
- What are the key differences between FirstPass and valuationIQ?
- How is IRR calculated differently in FirstPass compared to valuationIQ?
- Does FirstPass support modeling reserves like valuationIQ does?
---
FirstPass was designed to be as similar to the [valuationIQ](https://rediq.zendesk.com/hc/en-us/articles/360036505251-What-is-the-Valuation-Model-) model as possible, while still providing the ability to quickly underwrite a deal. However, due to FirstPass intended use as a high-level supplement to a full underwriting, some formulas and components were changed or omitted. Below is a list of these key differences:

**IRR Calculations**: In FirstPass, the IRR is calculated based on Annual Cash Flows. In valuationIQ, users have the option to calculate IRRs based off either the Monthly or Annual Cash Flows with the default option being to calculate based on Monthly Cash Flows.

Calculating based off monthly cash flows results in a higher IRR than calculating off Annual Cash Flows. In most cases, the variance between a monthly and an annual IRR Calculation will be less than 0.5%.

**Other Residential Income:** In FirstPass, Other Income, Garage/Parking, Storage, Expense Reimbursements, and Commercial Net Income are all rolled up to Other Residential Income rather than broken out separately.

**Explanations of Rental Loss Factor Value at Close Calculations:**

*Vacancy* – Reflected as a % of Market Rent; Calculated from the Unit Mix Summary; Sum of Market Rents of Vacant Units / Sum of Market Rents for All Units

*Non-Revenue* – Reflected as a % of Market Rent; Calculated from the Unit Mix Summary; Sum of Market Rents of Non-Revenue (Model, Employee, Administrative, etc.) Units / Sum of Market Rents for All Units

*Loss to Lease* – Reflected as a % of Market Rent; Calculated from the Unit Mix Summary; Sum of the difference between Market Rents and In-Place Rents of Currently Occupied Units / Sum of Market Rents for All Units

*Concessions* – Reflected as a % of In-Place Rent where In-Place Rent is defined as Market Rent less Loss-to-Lease, Vacancy and Non-Revenue losses; Calculated from the Historical Operating Statement; Concessions / In-Place Rent

**Affordable Units:** FirstPass does not have the same functionality for trending rent growth on Affordable Units that the valuationIQ model has; As a result, this FirstPass may not be as useful when analyzing a mixed income asset with both Affordable and Market Rate units.

[**Partnership Structure:**](https://rediq.zendesk.com/hc/en-us/articles/360041475092-Partnership-Structures-) FirstPass does not have a waterfall aka Partnership Structure. If a user needs to see a waterfall, then it is recommended that they jump directly to valuationIQ or their own proprietary model using QuickSync.

**Modeling Reserves (Not Including Replacement Reserves)**: FirstPass does not currently support the modeling of reserves (typically associated with financing and lender requirements). If a user wants to account for a Debt Service Reserve, Tax & Insurance Reserve, Operating Deficit Reserve, Lender required COVID 19 Reserve or any other sort of reserve, the best way to proceed would be to budget for those reserves in the Closing Costs.

**Note:** If done this way, FirstPass will accurately reflect the Sources and Uses at closing. However, FirstPass does not have the ability to show a release (return to investors) of unused reserves the way valuationIQ does. As a result, unless all reserves are fully drawn down, the returns in valuationIQ will be higher due to the release of those unused reserves.

**Financing Costs in FirstPass**: Closing cost assumptions (“Closing Costs”, “Acquisition Fee”, and “Disposition Costs”) are all based on a % of the *purchase price*. Users may be used to certain at closing costs, such as lending fees, being based on a % of the *loan value*. Currently, FirstPass does not have assumption inputs to allow users to calculate any closing costs on a % of loan value basis. Instead, users can “gross up” their closing costs by their LTV %.

For example: a user wants to include a 1% lending fee (that is 1% of their *loan value*) in their analysis. Assume that their LTV is 75% and their property is worth $1M, therefore their loan is worth $750,000. If the user typed in “1%” in the “Closing Costs” input, the fee calculated would be 1%\*$1M = $10,000, which is greater than 1% of the loan value, since it is based on the property value.

To fix this, the user should adjust their “Closing Costs” assumption down. To do this correctly, take the original fee (1%) and multiply it by the LTV (75%) [1%\*75%\*100] and use that as the assumption. In the previous example, instead typing “.75%” into the “Closing Cost” input would make the fee equal to .75%\*$1M = $7,500, which is *1% of the loan value.*