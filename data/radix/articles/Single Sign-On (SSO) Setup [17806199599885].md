---
id: 17806199599885
title: Single Sign-On (SSO) Setup
product: Radix
category: Benchmark
section: Managing Users
attachments:
- 17826866743693.png
- 17826862209677.png
- 17826934417421.png
- 17932280778253.png
- 17827576620557.png
- 17827576628749.png
- 17827576632845.png
- 17827589098381.png
- 17829685401229.png
- 17829681525005.png
- 17829699786509.png
created_at: '2023-07-20T23:14:16Z'
updated_at: '2024-08-22T19:34:28Z'
suggested_queries:
- - "How do I set up Single Sign-On for Radix?"
- - "What are the benefits of using SSO with Radix?"
- - "Can I configure SSO for users with generic email addresses in Radix?"
---
Single Sign-On is a convenient authentication method that allows your team members to access their Radix product(s) without entering a password. Your organization can enable SSO by integrating Radix with the internal user management systems outlined below.

Please Note:

Single Sign-On can only be configured for users with a personal work email address. Generic or group email addresses are not supported.

#### Benefits of Single Sign-On (SSO)

* **Enhanced Security:** SSO may reduce the risk of security breaches caused by weak or reused passwords. Additionally, IT administrators can easily add or revoke access as needed, in case of employee turnover.
* **Compliance Adherence:** SSO may facilitate better compliance with your security and privacy regulations by strengthening authentication measures and control over user access.
* **Improved Experience:**Save your teams the hassle of remembering yet another password so they can focus on unlocking data insights vs. unlocking their account.

#### How it Works

Interested in setting up SSO? Contact [support@radix.com](mailto:support@radix.com) to get started! Once your organization has confirmed they want to enable SSO, our dedicated support team will assist you in completing the steps below to enable it for your organization.

1. **Confirm Your User Management System:** Our support team will coordinate with you to confirm the type of internal user management system your organization is using (i.e., Azure, Okta, G-Suite).
2. **Configure Your SSO:** Use the step-by-step instructions outlined below to configure SSO for using your organization's user management system.
3. **Test SSO for Functionality:** For testing purposes, once the SSO tile has been set up, our support team will enable SSO for your IT team. This is used as an opportunity to confirm you will be able to login successfully prior to rolling out the SSO functionality to your entire organization.
4. **Provide a Date for SSO Rollout:** Our support team will work with you to confirm the date you'd like SSO to be enabled for your entire organization.
5. **Email Your Teams:** Use the email template provided below to help prepare your teams for the upcoming change.
6. **SSO is Enabled:** Only after receiving confirmation of the desired "go-live" date from you, our support team will enable SSO for your entire organization.

#### Configuring Your SSO

The steps you'll take to configure your SSO will vary based on the system in use by your organization.

**Google Workspace (aka "G-Suite")**

In order to provide Radix SSO capabilities to your users, Google's authentication API must be accessed. This will allow your system to verify users before redirecting them to your company's unique Radix subdomain.

To access Google's authentication endpoint you will need to create an app for Radix, then generate a Client ID and Client Secret. You can follow the steps below to do so.

**Step 1:** Log in to your administrator account at [https://console.developers.google.com](https://console.developers.google.com/apis/credentials/ "https://console.developers.google.com/apis/credentials/")

**Step 2:** Click *Create Project*

*![Google Cloud console showing the "Create Project" button highlighted.](attachments/17826866743693.png)*

**Step 3:** Enter a *Project Name*. Then, use the *Location* field to locate the appropriate *Organization* option (this will likely be "radix.com" or "biradix.com").

![Google Cloud new project screen with fields for project name and location.](attachments/17826862209677.png)

**Step 4:** Click C*reate* and await the project's creation.

**Step 5:** Once your project has been created, navigate to the *OAuth Consent Screen* and ensure the User Type is set to *External*. If your organization has multiple apps, make sure the newly created app for Radix is in use for this step.

![Google API OAuth consent screen with "Make External" button highlighted.](attachments/17826934417421.png)

**Step 6:** Navigate to the *Credentials* page and ensure the authorized redirect URLs are set to <https://api.biradix.com/api/1.0/users/sso/gsuite>

![Google Cloud Console menu highlighting "Credentials" under "APIs & Services."](attachments/17932280778253.png)

#### Please Note

The Client ID and Client Secret should be sent to Radix in order to complete the SSO setup and move on to testing it's functionality.

**Okta**

Configure SSO for Radix within your Okta Admin Portal using the steps outlined below. Integration is done through OAuth/Open ID Connect standard.

**Step 1:** Log in to your Okta Admin portal, and click *Add Application* from the Applications tab.

!["Okta Admin portal showing 'Add Application' button and list of active applications."](attachments/17827576620557.png)

**Step 2:** Select *Web Application* from the options provided.

!["Okta app creation screen, 'Web' platform selected, 'Next' button highlighted."](attachments/17827576628749.png)

**Step 3:** Fill out the Application Settings using the following guidelines:

* *Name* the application (Ex: “Radix”)
* *Base URIs* = blank
* *Login redirect URIs* = API URL (Ex: “https://api.biradix.com/api/1.0/users/sso/okta”)
* *Logout redirect URIs* = blank
* *Group assignments* = the group of users that will need Radix access (Ex: “Everyone”)
* *Grant type allowed* = Authorization Code & Implicit (Hybrid)

!["Application settings screen showing URIs, group assignments, and grant types for 'My Web App'."](attachments/17827576632845.png)

**Step 4:**Once the application has been created, you will be taken to the *General* tab of that app. Please send the following information to the Radix support team member you've been working with:

* Client ID (Ex: “0oafga3uiAzGeExp5021”)
* Client secret (Ex: '3HQgmS4iJa1WClqy-KRruJWgmgpiKE89HnJXagqF”)
* Okta domain (Ex: “https://companyname.okta.com”)

**Step 5:** From the General tab of the app, click *Edit* to update the default setting values using the following guidelines:

* *Login initiated by* = “Either Okta or App”

  + Our application uses "Authorization Code" OAuth grant type but checking *Implicit (Hybrid)* is required to enable *Login initiated by* option “Either Okta or App”. Okta won’t show the “Display application icon to users” option otherwise and users won’t see the application on their Okta portal.
* *Implicit (Hybrid)* = Checked
* *Initiate login URI* = Radix login url (Ex: “https://testcompany.radix.com”)

![Okta settings page showing application and login configurations for "My Web App."](attachments/17827589098381.png)

**Microsoft Azure**

To configure Radix SSO using Azure, create a tile with Active Directory (AD) and point it to the URL your organization uses to log in to Radix (Ex: [https://company.radix.com](https://company.biradix.com)).

* The application created in Azure is a Linked SSO application and OAuth is used for authentication. ![Azure portal showing a list of enterprise applications with BI:Radix selected.](attachments/17829685401229.png)
* You can click Change Single Sign-On to update the sign-on mode![Interface showing single sign-on options: SAML, Password-based, and Linked.](attachments/17829681525005.png)

* If possible, we recommend adding consent to the app to avoid your teams from getting a second confirmation prompt. ![Permissions settings screen showing no user consented permissions for the application.](attachments/17829699786509.png)

#### Please Note

When creating your tile, our registered app tile may appear as a secondary tile due to the SSO triggering our registered app to appear in your AD. You can go into AD and change the tile's visibility settings.

#### Email Template for SSO Communication

**Subject Line:** Single Sign-On (SSO) Enabled for Radix Starting [ENTER DATE]

**Email Body:** We are excited to announce the implementation of *Single Sign-On (SSO) for Radix. Starting on [ENTER DATE], you will no longer need to enter your password to access the Radix platform. We're making this change to improve security and add convenience to your day by reducing the number of passwords you need to manage.*

*As of [ENTER DATE] to log in to Radix:*

* *Visit [ENTER YOUR COMPANY'S UNIQUE RADIX DOMAIN]*
* *Enter your User Name*

*\*Note: If you are using the domain*[*https://platform.biradix.com*](https://platform.biradix.com/ "https://platform.biradix.com/") *to log in, it will no longer work. You must access Radix via our company's unique domain above.*

*We understand that this may take some getting used to so if you have any questions or encounter any issues logging into our platform, please don't hesitate to reach out to your IT department or Radix Support at*[*support@radix.com*](mailto:support@radix.com "mailto:support@radix.com")*.*

*Thank you.*