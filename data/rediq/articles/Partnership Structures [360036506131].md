---
id: 360036506131
title:  Partnership Structures
product: redIQ
category: valuationIQ
section: How to Use the Model
attachments:
- 25968988333460.png
- 25968988350740.png
created_at: '2019-11-21T16:19:25Z'
updated_at: '2024-10-07T16:40:47Z'
suggested_queries:
- - "How do I include a partnership structure when generating a model in redIQ?"
- - "What are the tiers for promote structures in partnership calculations?"
- - "Can I add a partnership structure after creating a model in redIQ?"
---
To add a partnership structure into the underwriting, select "Yes" before generating a model. This will add a section to the Input tab where assumptions for equity split, promote structure, and partnership costs and fees can be entered.

![I'm unable to identify or describe individuals in images, but I can help explain the interface elements in the screenshot.
### Interface Description:
- \*\*Title\*\*: The window is titled "Generate Model," indicating the purpose of this interface is to create or configure a model.
- \*\*Main Elements\*\*:
- \*\*Partnership Structure\*\*: This section has two radio buttons labeled "No" and "Yes." The "Yes" option is currently selected, suggesting the user has chosen to include a partnership structure in the model.
- \*\*Fiscal Year Ending\*\*: A dropdown menu is available with the option "Dec" selected, allowing users to choose the fiscal year-end month.
- \*\*Preset Assumptions\*\*: There is a link labeled "](attachments/25968988333460.png)

There can be up to four tiers entered in the Promote section of the Input tab. Regardless of how many tiers there are in the promote structure, Tier IV must be the final tier used because it's from the point of the last hurdle to "Thereafter." Therefore if there are only three tiers to a promote, Tier I can be ignored. Let's say a promote has three tiers: a pref of 8% IRR, the second tier is 8%-15% IRR with a 10% promote, then the third tier is any distributions above 15% IRR with a 20% promote. The assumptions should be entered as seen in the screenshot below:

![Here's a detailed description of the SaaS application interface screenshot:
### Main Interface Elements:
- \*\*Ribbon Menu\*\*: At the top, there is a ribbon menu with tabs such as File, Home, Insert, Page Layout, Formulas, Data, Review, View, Automate, and Help. This is typical of spreadsheet applications.
- \*\*Toolbar Buttons\*\*: Below the ribbon, there are buttons for actions like "Sync with Cloud," "Show Model," "Add Renovation," "Advanced Loan Calcs," "Show Detail Assumptions," and "Update Sensitivities."
- \*\*Dropdown Menus\*\*: Options for "IRR Type" and "Cap Rate based on" with selections like "Monthly" and "Pro Forma NOI."](attachments/25968988350740.png)

Because Tier III is from 15%-15% it is essentially ignored, and Tier IV is used as the final tier because it goes from 15% IRR to Thereafter. The calculations of this example are as follows: all distributions up to an 8% IRR are split pari-passu between the two partners. From an 8%-15% IRR, the Sponsor gets a 10% promote and the remaining 90% is split pari-passu between the two partners. From 15% IRR and thereafter the Sponsor gets a 20% IRR and the remaining 80% is split pari-passu between the two partners.

##### Note

*If you have already created a model and filled in assumptions with no partnership structure but need to add it in after the fact, it can be done. First sync the model with the cloud with the "Save and Upload" box checked to ensure all your inputs are saved to redIQ. Now go back to the online platform, generate a new model, and make sure you select Yes for Partnership Structure. This will generate a new model with the partnership structure and will have all your inputs already filled in.*