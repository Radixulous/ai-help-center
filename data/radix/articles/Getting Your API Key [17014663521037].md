---
attachments:
- 17014699806989.png
- 17014670753037.png
category: API & Integrations
created_at: '2023-06-23T16:47:04Z'
id: 17014663521037
original_url: https://help.radix.com/hc/en-us/articles/17014663521037-Getting-Your-API-Key
section: API
title: Getting Your API Key
updated_at: '2024-08-22T20:27:20Z'
---

An API key will be necessary to unlock the API your organization has purchased. This API key will be utilized by your organization to generate the token used to make authenticated calls.

#### Accessing Your API Key

Our **Data API feature** will allow users within your organization to generate an API key, replace an existing key with a new one, and view a list of all users within your organization with access to the API key.

To access the Data API feature:

* Select *Data API* from the main dropdown menu![Admin dashboard showing "Organizations" and "Data API" menu options highlighted.](attachments/17014699806989.png)

* A new window will appear - from this window, you can view and/or generate an API key. !["API key generation window with client ID and 'Generate New Key' button."](attachments/17014670753037.png)

**Note:** Access to the API key is granted to specific users within your organization. If a user with access to the API key is deactivated from the system, they will no longer have access to the API key. However, it is recommended that the remaining users with API access regenerate and reimplement an API Key. This can help safeguard your data and prevent any unauthorized access by the deactivated user.

You will use the Client ID and API key during the authentication process outlined below.

#### Authentication

The API uses JWT tokens for the authorization of requests. You can generate your token by calling the endpoint below.

**Endpoint:**

* **POST** api.radix.com/auth

**Payload Schema:**

```
{
  "client_id": String,
  "client_secret": String
}
```

* **client\_id:** Input the value found under Client ID
* **client\_secret:** Input the value found under API key

```
curl --request POST \
  --url https://api.radix.com/auth \
  --header 'Content-Type: application/json' \
  --header 'x-radix-version: 1.0.0' \
  --data '{
  "client_id": "<client id>",
  "client_secret": "<client secret>"
}'
```