---
id: 38807668463764
title: Radix Research Field Definitions & Calculation Methodology
product: redIQ
category: dataIQ
section: Radix Research
attachments: []
created_at: '2025-06-27T15:04:45Z'
updated_at: '2025-07-02T18:19:48Z'
suggested_queries:
- - "What are the definitions and calculations for Radix Research metrics?"
- - "How is Net Effective Rent calculated in Radix Analytics?"
- - "What metrics are used to assess housing affordability in Radix Research?"
---
This article defines and explains the methodology behind each metric used in Radix Research.

## Snapshots and Trends

Get a pulse on market performance by comparing your selected MSA or submarket to its state and national benchmarks. All data is from Radix Analytics aggregated property data for the chosen market level and is updated weekly.

|  |  |  |
| --- | --- | --- |
| Field | Definition | Calculation |
| NER | Net Effective Rent | Rent - (Recurring Concessions and (One-Time Concessions/12)) / Total Units |
| NER/SQFT | Net Effective Rent per Square Foot | NER / Square Footage  Average square footage of every property is calculated then weighted by number of units in each property floorplan to create MSA or submarket square footage. |
| Concessions | One time and recurring discounts given to renters. Does not include waived fees. | ((One-Time Concessions / 12) + Recurring Concessions) / Units |
| Occupancy % | Percentage of total available units that are currently occupied | Occupied Units / Total Units  This calculation takes the occupancy of every surveyed property in the market and creates a weighted average based on the # of units per property. |
| Leased % | Percentage of total available units that are leased, including occupied units and future move-ins | This is the total number of occupied units (including model/admin units) + vacant and on notice leased units / by the total units in the Radix surveyed properties |
| Traffic/Week | Average number of tours given to prospective tenants in the last 7 days. This includes virtual tours/visits. | Tours per week, including virtual tours.  Traffic is calculated at the property level. Aggregated up to the market using weighted averages for each property based on the number of units at the property. |
| Leases/Week | Average number of approved leases i the last seven days after cancellations and denials. | Approved Leases - (Cancellations and Denials) per week  Calcuated at the property level. Aggregated up to the market using weighted averages for each property based on the number of units at the property. |
| RevPAU | Revenue per apartment unit | NER \* Occupancy % |
| Closing Ratio | Ratio of secured leases compared to total traffic | Leases Per Week / Traffic Per Week |
| Rent | The base or minimum floor plan rent for a 12-month lease before any discounts or concessions. If the floor plan does not have any units available, the expected market rent is used. | The weighted average monthly market rent is made up of base (minimum) floorplan market rents for a 12-month lease before any concessions or discounts.  in Radix, we use weighted average based on unit to calculate all numbers.   * Property with 100 1x1 units renting for $1000 and 50 2x2 units renting for $2000 * Rent for the property is: (100x $1000 + 50x $2000) / 150 = $1333. |
| Rent/SQFT | Rent before concessions divided by square footage | Rent / SQFT  Average square footage of every property is calculated then weighted by number of units in each property floorplan to create MSA or submarket square footage. |

## Employment

|  |  |  |
| --- | --- | --- |
| Field | Definition | Calculation |
| Employment Change | The numbers of jobs created or eliminated in the indicated timeframe | Total number of jobs created - total number of jobs eliminated |
| Unemployment Rate | The ratio of unemployed individuals relative to the total population | Total number of officially unemployed individuals / total number of individuals in the labor force. More detail here: [How the Government Measures Unemployment : U.S. Bureau of Labor Statistics](https://www.bls.gov/cps/cps_htgm.htm#unemployed) |

## 

## **Housing Affordability**

Explore how rent levels compare to local incomes. Data is provided by Freddie Mac and Radian and refreshed on a monthly basis.

|  |  |  |
| --- | --- | --- |
| Field | Definition | Calculation |
| Median Monthly Income | The middle value of all reported monthly incomes in a given area. | The middle value of all reported rents |
| Average Monthly Rent | The mean rent amount paid per month across all Radix surveyed rental units in the market. | Total Rent / Total Number of Units |

## **Construction Pipeline**

Visualize active and upcoming development with an interactive map-based experience. Data is provided by [Construction Wire (formerly BuildCentral)](https://www.buildcentral.com/)

* Project type (e.g. multifamily, mixed-use)
* Unit count
* Development phase
* Estimated completion date