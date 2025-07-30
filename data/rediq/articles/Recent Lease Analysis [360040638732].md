---
attachments: 
suggested_queries:
- - "What is included in the Recent Lease Analysis report on the Floor Plan Summary?"
- - "How does redIQ handle anomalies in Lease Start Dates for lease analysis?"
- - "Where can I find the filters for Recent Lease Analysis in redIQ?"
---
The Recent Lease Analysis appears on the Floor Plan Summary. This report shows the last 30/60/90 days of leasing as well as the most recent *x* number of leases. Filters for the Recent Lease Analysis appear in the Report Settings on the left side of the screen.

![Here's a detailed description of the SaaS application interface:
### Main Interface Elements:
- \*\*Top Navigation Bar:\*\*
- Contains tabs labeled "Overview," "Rent Roll," "Operating Statement," "FirstPass," and "Sharing."
- Buttons for "Generate Model" and "Upload" are located on the right side.
- \*\*Left Sidebar:\*\*
- \*\*Report Settings Panel:\*\*
- Dropdown for selecting "Rent Roll" date.
- "Manage" and "View" buttons for managing settings.
- \*\*Report View Settings:\*\*
- Dropdowns for "Report Type" (e.g., Floor Plan) and "Monthly Rent" ($/unit).
- Options for "In-Place Rent" and "](attachments/25808342071316.png)

If a Rent Roll has both Lease Start Dates and Move-in Dates, redIQ will default to using the Lease Start Date for pulling data into the Recent Lease Analysis. If your Rent Roll includes any “anomalies” in the Lease Start Dates, then the system will elect to use Move In Dates for the Recent Lease Analysis, even when Lease Start Dates are present. Resolve these anomalies and the system will then revert to using Lease Start Dates. If an occupied unit is missing move in or lease start date, then the Recent Lease Analysis will not appear. To get the analysis to appear, either fill in the missing date for this unit or mark the unit as vacant on the [Edit Rent Roll screen](https://rediq.freshdesk.com/support/solutions/articles/5000742265-edit-rent-roll-screen).

The totals in the Recent Lease Analysis represent market rent based on recently achieved in-place rents. These averages are weighted by the total number of units with each floor plan to account for the property's unit mix. When a floor plan does not have a recent lease, its reported market rent is used in the calculation. The thought process behind this calculation is that the number represents what the property will look like if every unit were rented at the rate of the recent leases. A simple average would not account for the property's unit mix and would be skewed if there were a large or small number of a certain floor plan.

The number of leases included in any calculation is provided next to the rent. If more leases are included than what is selected on the slider bar, then there are multiple leases that started on the same day. Since there is no way to determine which one is more recent, it includes all of them in the average. If less leases are included, then the number of leases selected for the analysis is greater than the number of occupied units for that floor plan.

![The screenshot displays a section of a SaaS application interface, likely from the redIQ platform, focused on report settings for analyzing lease data. Here’s a detailed description:
### Main Interface Elements:
1. \*\*Report Settings Panel:\*\*
- Located on the left side, this panel contains various settings and options for generating reports.
2. \*\*Buttons and Controls:\*\*
- \*\*Manage\*\*: A button likely used for managing report settings or configurations.
- \*\*View\*\*: A button possibly for viewing the report or changing the view settings.
- \*\*Anomalies Detected\*\*: A clickable link or button, possibly indicating issues or irregularities in the data.
3. \*\*Dropdown Menus:\*\*
- \*\*Report Type\*\*](attachments/25808342090644.png)