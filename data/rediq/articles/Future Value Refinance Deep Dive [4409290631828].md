---
id: 4409290631828
title: Future Value Refinance Deep Dive
product: redIQ
category: valuationIQ
section: How to Use the Model
attachments: []
created_at: '2021-10-28T19:00:25Z'
updated_at: '2024-12-03T14:51:08Z'
suggested_queries:
- - "How do I size a refinance loan based on future value in redIQ?"
- - "What are the steps to use the refinance feature in valuationIQ?"
- - "How do I link refinance loan sizing results to loan inputs in redIQ?"
---
**valuationIQ now features an option to automatically size a refinance loan based on a future value.**

To use the refinance feature, click the button on the redIQ ribbon with the calculator icon labeled “Advanced Loan Calcs”, which can be found in the model settings section.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290630292/43d3cff7795dda970a5abdca4cf93d7373086a286bdb9fe7961d1e3f1dfc1033.png)

To then see this in the model, ensure that the “Show Detail Assumptions” button has been clicked.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290630548/859b939c9fa0c0debda361802b602d596ca2a2be2231e2b17601103872ec148c.png)

Next, you can navigate to the Debt Assumptions section on the “Input” page. The new refinance loan sizing module will appear in this section right next to the loan inputs.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290630932/d13f624f3690f56c688cae1f1d0113bb7107d8a8c5f0a6c7a6d0429a1645066f.png)

To calculate the refinance loan amount, you can enter assumptions here. The first assumption is the refinance month. This might be the same month as when a previous loan matures. Next, you can select the trailing revenue date range to use. The default is trailing three (T3) annualized but can be changed by entering the number of trailing months you want to consider. For expenses, the model will default to the trailing 12 expenses plus replacement reserves for the 12 months preceding the refinance. Right below, you can see the NOI as of the month of refinance.

The next assumption is the cap rate, which will determine the value for the Loan to Value calculation at the time of the refinance. The cap rate will automatically be estimated, though this can be adjusted as well.

There are three criteria that can be used in sizing the loan: Loan to Value, Debt Service Coverage Ratio, and Debt Yield. Only one of these is needed for calculating the loan amount, but they can be used together as well.

First is the LTV constraint. The next three assumptions relate to the DSCR constraint. The final sizing criteria that can be used is a debt yield, which takes the NOI calculated above and divides it by a required debt yield to determine a potential loan amount. Below this, the sizer will show the resulting loan amounts for the three sizing constraints based on the assumptions previously entered. For the final loan amount, the sizer will take the minimum of the three loan amounts.

Another feature included is the ability to automatically link your loan sizing results to the loan inputs. If you click the “Advanced Loan Calcs” button again on the redIQ ribbon, this will automatically link the refinance sizer to the next available loan input. After clicking the button, there will be a pop-up message that confirms that you want to continue with the linking.

redIQ highly recommends using the automated linking functionality to ensure that all necessary inputs get linked to the primary loan inputs. If manually changing the primary loan inputs, that may not be reflected in the sizing.

Once it is linked, below the final loan amount, you can now see the proceeds from the refinance. The next available loan label for the loan inputs will now display as “Refinance.”

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290631316/e187b331b1b98cbfa65fbcf090f22f1bee99279f0a529d3ffc896197b784f64a.png)

Additionally, the loan label will dynamically update on the output pages. On the Summary Output page, in the Debt Summary section, the label now shows as “Refinance.” When looking at the refinance, you will notice new labeling in the LTV row. First, you will see the Loan to Value in the Future denoted by the “FV” for Future Value. In parenthesis, you will see the sizing constraint that ultimately restricted your future value refinance. The loan label will be updated on the Sources & Uses page as well.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290631572/52d47149de68b994e3ff99a347edeaf7ce7177af00bccb816bba90907447d599.png)