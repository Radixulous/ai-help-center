---
attachments: []
category: valuationIQ
created_at: '2021-10-28T19:06:36Z'
id: 4409290714772
original_url: https://rediq.zendesk.com/hc/en-us/articles/4409290714772-Bridge-Loan-Deep-Dive
section: How to Use the Model
title: Bridge Loan Deep Dive
updated_at: '2024-12-03T14:55:48Z'
---

valuationIQ now features an option to automatically size a bridge loan. Included within the bridge functionality is the ability to draw loan proceeds as needed to fund unit renovations and property wide capital expenses.

It also offers the ability to size a bridge loan using two constraints, Loan to Cost and Debt Yield.

To use the bridge loan feature, click the button on the redIQ ribbon with the calculator icon labeled “Advanced Loan Calcs”, which can be found in the model settings section.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290712980/43d3cff7795dda970a5abdca4cf93d7373086a286bdb9fe7961d1e3f1dfc1033.png)

To then see this in the model, ensure that the “Show Detail Assumptions” button has been clicked.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290713236/859b939c9fa0c0debda361802b602d596ca2a2be2231e2b17601103872ec148c.png)

Next, you can navigate to the Debt Assumptions section on the “Input” page. The new bridge loan sizing module will appear in this section right next to the loan inputs.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290713492/ee00302c0f6727902329d5bc0e5659efc7fa9afbac404a2513b94d50fa12c477.png)

When sizing the bridge loan, there are two constraints that can be used, Loan to Cost and Debt Yield. Only one of these is needed for calculating the loan amount, but they can be used together as well.

If you want to use a loan to cost constraint when sizing the bridge loan, input the maximum cost percent. Upon inputting your cost constraint, you will see a red warning appear.

This is an error check that indicates that the loan amount in the helper does not equal what is in Loan 1, though this can be ignored at this point.

You also have the option of selecting which costs will be included as part of the loan to cost calculation, with their inclusion dynamically updating the cost.

Next, the debt yield constraint can be entered. To determine a potential loan amount, for sizing purposes, you can take the NOI and divide it by a required debt yield. In some cases, lenders will size with a debt yield based on a forward stabilized NOI. To complete this section, input the month of stabilization and the required yield.

Lastly, with the “Draw w/ Capex?” option, you can set whether the bridge will be funded at closing, or if it will draw in line with renovations and capital expenses. When this is set to “No,” it will draw 100% of loan proceeds for capex at closing and deposit them to the capex reserve. If set to “Yes”, it will draw loan proceeds as needed to fund renovations and capital expenses.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290713748/7e1c28c8d416af3dfef189b82ae69f630b7f6921d47af3f02ec0be411680b45a.png)

Right below the dropdown is a breakout of how the loan proceeds are being drawn. If “Draw w/ Capex?” is set to “No,” you will notice the future funded amount is equal to zero since all proceeds are being drawn at close. Also, the closing draw is equal to the loan amount, and the escrowed portion is equal to the anticipated capex spend, indicating that you have escrowed loan proceeds to fund the future capex. If “Draw w/ Capex?”  is set to “Yes”, the future funded amount is equal to the projected capex, and the closing draw is no longer equal to the full loan amount.

Another feature included is the ability to automatically link your loan sizing results to the loan inputs. If you click the “Advanced Loan Calcs” button again on the redIQ ribbon, this will automatically link your loan assumptions to Loan 1. After clicking the button, you will see a pop-up message that the loans have been successfully linked and the red warning label will no longer show.

redIQ highly recommends using the automated linking functionality to ensure that all necessary inputs get linked to the primary loan inputs. If manually changing the primary loan inputs, that may not be reflected in the sizing.

Once it is linked, the Loan 1 label will now show as Bridge.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290714004/2d850f3317725508ef57aeaef40a10023bcca1574ec656afdfd3d1aad397b7d6.png)

Additionally, the loan label will dynamically update on the output pages. On the Summary Output page, in the Debt Summary section, the label now shows as Bridge.

![](https://rediq.zendesk.com/hc/en-us/article_attachments/4409290714516/f105ee19b74fb40af18f81506e9c5a7db615ecdd48078f5800b18631316422aa.png)

When the bridge loan is active, you will see additional sizing information in the LTV Row. First, you will see the LTV reflected as Bridge Loan Amount / Purchase Price. In parenthesis you will see the “Loan to Cost,” as determined by what costs you have included as part of that calculation in the sizer. At the bottom of the Debt Summary, you can see a list of these costs. The loan label will be updated on the Sources & Uses page as well.