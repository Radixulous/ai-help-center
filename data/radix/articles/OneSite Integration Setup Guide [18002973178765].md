---
attachments:
- 18200042435725.png
- 18138173726605.png
category: API & Integrations
created_at: '2023-07-27T23:45:13Z'
id: 18002973178765
original_url: https://help.radix.com/hc/en-us/articles/18002973178765-OneSite-Integration-Setup-Guide
section: Integrations
title: OneSite Integration Setup Guide
updated_at: '2024-08-22T11:30:05Z'
---

Streamline the market survey process for your teams even more with our OneSite integration. When you leverage our OneSite integration, the majority of the data your team needs to update their property surveys will be imported directly from your property management system.

### What You'll Need

To set up the integration for the properties within your organization you'll need to make sure you, or a member of your team, has access to Realpage's Integration Marketplace.

### Setting Up Your Integration

The integration will be licensed for your organization, then enabled at the property level. Follow the steps below to set up the integration.

**Step 1: Check ODE Licensing**

Before proceeding with the integration setup, you'll need to license the following ODEs or confirm they have been licensed.

* Prospect Management
* Pricing and Availability
* Resident Services

**Step 2: Enable Radix Integrations with RealPage**

As a registered vendor, you'll find Radix among the list of available integrations offered within RealPage's Integration Marketplace. To enable your integration:

* Visit the RealPage Integration Marketplace and use the search bar to locate Radix.
* Once Radix has been located, click the pencil icon to enable the integration.

![Integration Marketplace interface with search for "Radix" and pencil icon highlighted.](attachments/18200042435725.png)

**Step 3: Activate ODEs for Each Property**

Once the integration with Radix is enabled, you will need to activate all three ODEs for each property you want to integrate. If an ODE has not been licensed at the organization level, the enable option will not be available. 

!["Integration settings for Radix with toggle switches for various ODEs in a management interface."](attachments/18138173726605.png)

**Step 4: Create an SDE User for Radix**

An SDE user is needed by Radix to access the OneSite API. Once created, share the sign-on name with Radix so we can facilitate the additional components of the integration that are needed for your properties. The SDE user should have the following: 

* **SDE Manager Role in Onesite:** The user must be assigned the SDE Manager role in Onesite to authorize the data exchange.
* **Property Access:** The user must be explicitly granted access to *each property* that you want to integrate.

Once these steps have been completed, please notify our team so we can ensure the integration has been completely configured on our end. If you encounter any issues or have questions during the setup process, don't hesitate to reach out to our dedicated support team at [integrations@radix.com](mailto:support@radix.com) for assistance.