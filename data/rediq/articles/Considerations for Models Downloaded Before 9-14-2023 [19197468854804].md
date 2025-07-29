---
attachments: []
category: valuationIQ
created_at: '2023-09-14T16:02:34Z'
id: 19197468854804
original_url: https://rediq.zendesk.com/hc/en-us/articles/19197468854804-Considerations-for-Models-Downloaded-Before-9-14-2023
section: Troubleshooting
title: Considerations for Models Downloaded Before 9/14/2023
updated_at: '2023-10-31T12:47:21Z'
---

### valuationIQ and Excel's Architecture

valuationIQ is a highly specialized Excel-based valuation model that relies on advanced Microsoft features and scripting. When Microsoft makes changes to Excel's architecture that require updates to the base valuationIQ template, any new models you generate from redIQ will inherit the new version, but any old copies you have stored locally remain unchanged. Fortunately, the need to for these updates to valuationIQ for this reason are extremely rare, as Excel is typically quite stable and mature, and most updates are related to adding features.

Beginning in late Spring of 2023, Microsoft began testing changes in Office 365 tenants in cohorts that caused complier issues for a small percentage of valuationIQ users. The result was that affected users would not see the [Sensitivity Table](https://rediq.zendesk.com/hc/en-us/articles/360041473972) function of the model update when triggered and outputs would remain static.  Since redIQ is not able to see the proprietary codebase of Microsoft's compiler, we needed to engage with our partners at Microsoft to troubleshoot the issue.  In early September of 2023, Microsoft confirmed that there was a bug in their code which could lead to this error.

While we are not able to fix the issue for Microsoft, working with our partners, we were able to develop a refactored version of the portion of the model that handles the Sensitivity Tables which works around this bug.  It was decided that the best course of action was to update our platform to only generate models with this patch in place starting on 9/14/2023 at 12:00 PM Eastern.

### What Should I Do With Models I Generated Before 9/14/2023

If you have models that you generated and saved on or before 9/14/2023 12:00 PM Eastern that you still need to make changes or updates to, please take the following steps.

### Generate a New Model (Recommended)

1. Load your model in Excel
2. Click "Sync with Cloud" to make sure your most recent assumptions are preserved.
3. Log into dataIQ and navigate to the deal
4. Click Generate Model and download a new copy to save locally

### Working with an Older File

In some cases, you may find it inconvenient to generate a new model.  For example, if you added custom sheets or made heavy customization to the local file that don't carry over when you generate a new copy you can first check if your instance of Excel is affected by the potential issue using the steps below

#### How to see if your machine is affected

1. Open the model in Excel
2. Note the values in the Sensitivity Tables output tab
3. Change assumption inputs that will affect sensitivity, and click Update Sensitives.
4. Verify that the output values change

**If the output values change**, your machine is not affected and you can continue to work with the current file.

#### Note

If you plan to distribute the model externally to others who will make adjustments and refer to the sensitivity analysis, be aware that there is no guarantee that the file will behave the same way on the other organization's environment.

**If the output values are frozen**, this means that your instance of Excel if currently affected. Follow the steps above to generate a new model.

### Microsoft Root Cause Resolution

As of the date we updated our system to generate known working model files (9/14/2023), Microsoft had acknowledged, but not yet resolved the root cause of the complier bug.  It is almost certain that this will be resolved in a future update to Excel at which time, valuationIQ models generated on any date will behave as expected.  redIQ will continue to monitor new Excel build releases and when the issue is resolved, provide a subsequent update.