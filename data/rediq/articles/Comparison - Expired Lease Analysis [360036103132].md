---
attachments:
- 360043500131.png
category: dataIQ
created_at: '2019-11-20T19:27:48Z'
id: 360036103132
original_url: https://rediq.zendesk.com/hc/en-us/articles/360036103132-Comparison-Expired-Lease-Analysis
section: Rent Rolls
title: Comparison - Expired Lease Analysis
updated_at: '2024-10-07T16:41:57Z'
---

When multiple rent rolls have been uploaded in the same deal, two more options will appear when hovering over the Rent Roll tab: a Comparison Chart and Comparison Table. These reports do not show a straight comparison of one rent roll to another, but rather an Expired Lease Analysis.

![Xyhs1lXQ3bdHw88GwyioKZ7ljOiIcVKjYg.png](https://rediq.zendesk.com/hc/article_attachments/360043500131/Xyhs1lXQ3bdHw88GwyioKZ7ljOiIcVKjYg.png)

The Expired Lease Analysis reviews two rent rolls from the same property and summarizes the outcomes of any leases due to expire between the as of dates of each rent roll. The analysis will first search through the older rent roll to determine which leases have an expiration date between the two as of dates. Then it searches for those same units in the newer rent roll and sorts each unit into one of four possible outcomes based on the following logic:

* **Renewal** - If the expiration date updated and the move in date stayed the same, the lease is classified as a renewal.
* **New Tenant** - If the expiration date and the move in date both updated, the lease is classified as a new tenant.
* **Month To Month** - If the expiration date and the move in date both stayed the same, the lease is classified as MTM.
* **Vacant** - If the unit is vacant in the more recent rent roll, the lease is classified as vacant.

The Comparison Table includes a "Premium" column, which represents the premium new tenants are collecting over renewals. It is calculated as New Rent of New Tenants minus New Rent of Renewals over the New Rent of Renewals (i.e. the % of how much greater New Rent of New Tenants is over the New Rent of Renewals).

One issue that can prevent the Expired Lease Analysis from running correctly is unit numbers changing from one rent roll to the next. Once the analysis determines which units should be included from the older rent roll, it searches for the exact same unit numbers in the newer rent roll. If a unit number changed then it will not be included.