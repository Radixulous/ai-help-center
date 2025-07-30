---
id: 360036508791
title: Recent Lease Analysis
product: redIQ
category: dataIQ
section: Rent Rolls
attachments: []
created_at: '2019-11-21T17:10:29Z'
updated_at: '2020-04-21T16:35:17Z'
suggested_queries:
- - "What is included in the Recent Lease Analysis report in rediq?"
- - "Why is my Recent Lease Analysis not showing for an occupied unit?"
- - "How does the Recent Lease Analysis calculate market rent based on leases?"
---
The Recent Lease Analysis appears on the Floor Plan Summary. This report shows the last 30/60/90 days of leasing as well as the most recent *x* number of leases. Filters for the Recent Lease Analysis appear in the Report Settings on the left side of the screen.

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/5093054991/original/OXoWDEkIJ5JCzpJ7GoFecELpHESgQCubrw?1516635525)

If an occupied unit is missing move in or lease start date, then the Recent Lease Analysis will not appear. To get the analysis to appear, either fill in the missing date for this unit or mark the unit as vacant on the [Edit Rent Roll screen](https://rediq.zendesk.com/hc/en-us/articles/360036141132).

The totals in the Recent Lease Analysis represent market rent based on recently achieved in-place rents. These averages are weighted by the total number of units with each floor plan to account for the property's unit mix. When a floor plan does not have a recent lease, its reported market rent is used in the calculation. The thought process behind this calculation is that the number represents what the property will look like if every unit were rented at the rate of the recent leases. A simple average would not account for the property's unit mix and would be skewed if there were a large or small number of a certain floor plan.

The number of leases included in any calculation is provided next to the rent. If more leases are included than what is selected on the slider bar, then there are multiple leases that started on the same day. Since there is no way to determine which one is more recent, it includes all of them in the average. If less leases are included, then the number of leases selected for the analysis is greater than the number of occupied units for that floor plan.

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/5088347533/original/_3kAdT2yPH_FCP6jrHZKRFCZGJLFRHwORg?1506025270)