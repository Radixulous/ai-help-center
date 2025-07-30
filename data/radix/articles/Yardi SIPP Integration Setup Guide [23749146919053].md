---
attachments: 
suggested_queries:
- - "What are the steps to set up Yardi SIPP integration with Radix?"
- - "What requirements does my Voyager instance need for Yardi SIPP integration?"
- - "How do I create a username and password for Yardi SIPP integration?"
---
Streamline the market survey process for your teams further with our Yardi SIPP integration. When you leverage our Yardi SIPP integration, the majority of the data your teams need to update their property surveys will be imported directly from your Voyager property management system.

#### What is Yardi SIPP?

Yardi SIPP (Standard Interface Partner Program) is Yardi's version of an API that allows a third party to access data from your Voyager database.

**Note:** While Voyager is the name of Yardi's property management system, Yardi is often used interchangeably with Voyager to refer to their property management system. Within our help documentation, we'll use Yardi to refer to Yardi as a company, and Voyager to refer to their property management system.

#### What You'll Need

As you prepare for your Yardi SIPP integration, you'll want to confirm your Voyager instance meets the minimum plug-in requirements outlined below:

* Interfaces Plv24.1
* Common Data Plv19
* ILS Guest Card Plv26
* Revenue Management Plv18

We can work with clients on earlier versions of ILS Guest Card and Revenue Management if the web methods needed are available. Available web methods are based on plugin versions that are installed.

#### Setting Up Your Integration

Our dedicated team will work closely with you to set up and test your integration. You will need to enable the integration for your organization and properties, then our team will complete the necessary integration requirements on Radix's end.

**Step 1: Open a Yardi Ticket via Client Central and Install Radix Vendor Packages**

A member of your team will need to open a ticket with Yardi via Client Central to have Radix's vendor packages installed within your Voyager environment.

* You can confirm Radix is a fully qualified standard interface vendor by viewing the *Available Interface Vendor List-Client.xlsx* on Client Central.
* You can download and review the *ILS Guest Card* and *Revenue Management Interface Setup Guides* posted on Client Central for detailed information on how to configure the interfaces.
* If you need additional assistance with configuration, your Yardi Account Manager or Yardi's core support team can assist you.

**Step 2: Create a Username and Password**

Our team will need a username and password to configure your organization's property management system to sync relevant data into Benchmark. If you have questions on how to create the username and password needed, please open a ticket with Yardi as our team is unable to access your Voyager frontend to assist directly.

**Step 3: Provide Radix with Information Needed for Organizational Integration**

Before our team can integrate your individual properties via Yardi SIPP, your Voyager instance must first be configured to retrieve data during our daily syncs. Our team will handle the organizational configuration within Radix, but need the following information to do so:

* **Voyager URL:** This is the URL for your organization's Voyager instance.
* **Username:**This is the username created by you and referenced in Step 2.
* **Password:** This is the password created by you and referenced in Step 2.
* **Database Name:**This is typically the name of your Voyager database server.

Once you have this information, please send it to [integrations@radix.com](mailto:onboarding@radix.com) to provide it to our team.

**Step 4: Configure Voyager for Property Data Exportation**

For properties that have an integration, rents are calculated using a specific methodology. Your Voyager instance will need to be configured to permit the exportation of lease charges to support this methodology.

a) From the Voyager home page, select **Interfaces > Review Interface Vendors**

![Yardi Voyager interface showing "Review Interface Vendors" and configuration options.](attachments/23751375008653.png)

b) Next, select the **Common Data** interface to be configured for the **Radix - ILS Entity**

!["Interface configuration screen showing 'Common Data' and 'Radix - ILS' selection."](attachments/23751375028493.png)

c) Lastly, on the next page, set the **Lease Charges Permission** to **Read**. Then, select the **Save** option at the bottom of the page to update the configuration. 

**Important:** When taking this step, please note no other Access settings other than the **Lease Charges** line item need to be changed to *Read*.

![Configuration screen showing "Lease Charges" set to "Read" access. Save button highlighted.](attachments/23938426444941.png)

**Step 5: Configure Voyager ILS & Guest Card Settings**

In order for us to be able to receive all the required Traffic/Week and Leases/Week data, the following steps are required.

* Go to Interfaces->Interface Configuration-> ILS/Guest Card -> find Radix - ILS > Include only Residents/Guests with activity in the last <> days' Field must be set to "90" days

![Settings page for ILS & Guest Card with 90-day activity filter highlighted.](attachments/27002693649037.png)

**Important**: The API endpoint we use to calculate Traffic/Week and Leases/Week on the Radix Market Survey (GetYardiGuestActivity\_EventType\_DateRangeResponse) will return no data if the date Range is set to 0 Days.

Once these steps have been completed, please notify our team so we can ensure the integration has been completely configured on our end. If you encounter any issues or have questions during the setup process, don't hesitate to reach out to our dedicated support team at [integrations@radix.com](mailto:support@radix.com) for assistance.