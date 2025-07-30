---
suggested_queries:
- - "What are MAD units in PMS integrations for Radix?"
- - "How is rent calculated for properties with MAD units?"
- - "When are MAD units included in rent calculations for Radix?"
---
When a PMS is configured for your organization we import data for your property that includes residents, the status of units, lease agreements, and the data for all your units on our Data Source, correlated with our main six data points.

### Rent Calculation

For properties that have established a PMS integration, rents are calculated using the following methodology:

1. **Asking Rent:** When units are available, Radix reflects the average asking rent (including amenities) of all units within the unit type that are becoming available in the next 60 days.
2. **Achieved Rent**: If no units are available, Radix reflects the average achieved rent (including amenities) for all units within the unit type that have been leased in the last 30 days, and move-ins scheduled for the next 60 days.
3. **Market Rent:** If achieved rents are unavailable, Radix reflects the average market rent (including amenities) for all units within the unit type.

### MAD Units

Even though we receive data for your MAD (Model, Admin, Down) Units, to present a more accurate rate, they will not be included in the rent calculation unless as listed below:

* When there are no standard (rentable units) that fall under the first and second strategies listed above
* When rentable units do not qualify for the first two strategies the MAD Units will be included in the calculation using Fallback Three (Market Rent).

If  all of your properties' units are MAD the rent will be calculated as below:

* Average Market Rent of all MAD units within that floorplan
* If there is no Market Rent available for any of the floor plan's units, then the Rent is calculated as an average of Rent from standard units with similar bedroom types within other floor plans.
* If there are no standard units within that bedroom type, then the Rent is calculated as an average from other types with one bedroom less or one bedroom more.