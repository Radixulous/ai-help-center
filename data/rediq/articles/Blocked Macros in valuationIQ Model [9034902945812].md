---
attachments:
- 9034871750804.jpg
category: valuationIQ
created_at: '2022-09-02T16:29:05Z'
id: 9034902945812
original_url: https://rediq.zendesk.com/hc/en-us/articles/9034902945812-Blocked-Macros-in-valuationIQ-Model
section: Troubleshooting
title: Blocked Macros in valuationIQ Model
updated_at: '2024-11-21T00:29:45Z'
---

Much of the powerful functionality in valuationIQ is enabled by VBA, a programming language that uses macros. These are custom functions that streamline and extend the model’s features.

Depending on your organization’s settings, macros may be blocked from running when opening the model.

This setting can be changed as part of the Trust Center settings within Excel. If the directory in which the model is being opened is a trusted location, this will remove the need to unblock macros on an ad-hoc basis in file properties. While enabling macro permission to a root directory can skirt this issue, enabling access for only a single, immediate parent folder would be necessary for macros to run.

The following steps outline the process for adding a trust location:

1. In Excel, click **File**> **Options**.
2. Click **Trust Center**> **Trust Center Settings** > **Trusted Locations![Blocked_Macros.jpg](https://rediq.zendesk.com/hc/article_attachments/9034871750804/Blocked_Macros.jpg)**
3. Click **Add new location**.
4. Click **Browse** to find the folder, select a folder, and then click **OK**.