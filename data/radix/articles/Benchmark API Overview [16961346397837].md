---
id: 16961346397837
title: Benchmark API Overview
product: Radix
category: API & Integrations
section: API
attachments: []
created_at: '2023-06-21T22:12:43Z'
updated_at: '2024-03-05T23:01:25Z'
suggested_queries:
- - "What is the Benchmark API and how do I use it?"
- - "How can I retrieve property data using the Benchmark API?"
- - "What headers are required for the Benchmark API request?"
---
The Benchmark API returns data for your subject properties and the competitor properties you've selected for them within Benchmark. In order to leverage this API, you will need to create a unique token. You can follow the instructions on how to do so by reviewing our [Getting Your API Key](https://help.radix.com/hc/en-us/articles/17014663521037) resource.

## HTTP Request

Benchmark API data can be retrieved from the following endpoint:

**Endpoint:**

* **GET** api.radix.com/export

## Headers

+ x-radix-version: 1.0.0
+ Authorization: Bearer <Access Token>

```
curl --request GET \
  --url https://api.radix.com/export \
  --header 'Authorization: Bearer <access token from the auth> ' \
  --header 'x-radix-version: 1.0.0'
```

**Sample Response:**

For a complete list of definitions for all data responses, [click here.](https://help.radix.com/hc/en-us/articles/17703147105421)

```
{
  "propertyId": "5610c16585d27cce003b472d",
  "organizationId": "524ac0b354d28c0e003b3f2f",
  "subjectAverage": {
    "address": "221B Baker Street",
    "atr": 27,
    "atrPercentage": 10,
    "city": "Your Street",
    "construction": "High-rise",
    "contactEmail": "",
    "contactName": "",
    "googleRating": 4.5,
    "googleReviewCount": 70,
    "leasedPercentage": 94.07,
    "leases": 1,
    "management": "Your Company Name",
    "marketRent": "2719",
    "msa": "Portland, OR",
    "nerSqft": 2.71,
    "ner": 2529,
    "occupancyPercentage": 93,
    "owner": "You",
    "property": "Your Property Name",
    "sqft": 934,
    "state": "OR",
    "submarket": "Northwest",
    "totalConcessions": 2276,
    "traffic": 8,
    "units": 270,
    "website": "https://www.yourwebsite.com/",
    "yearBuilt": 2009,
    "yelpRating": 4.5,
    "yelpRatingViewCount": 31,
    "zipCode": "97205",
    "floorplanLevel": [
      {
        "bedrooms": 0,
        "bathrooms": "1",
        "description": "your description",
        "code": "your description from PMS",
        "units": 13,
        "sqft": 536,
        "rent": 1606,
        "rentSqft": 3,
        "ner": 1338,
        "nerSqft": 2
      },
      {
        "bedrooms": 1,
        "bathrooms": "1",
        "description": "your description",
        "code": "your description from PMS",
        "units": 1,
        "sqft": 541,
        "rent": 1952,
        "rentSqft": 4,
        "ner": 1952,
        "nerSqft": 4
      },
      {
        "bedrooms": 2,
        "bathrooms": "1",
        "description": "your description",
        "code": "your description from PMS",
        "units": 13,
        "sqft": 546,
        "rent": 1523,
        "rentSqft": 3,
        "ner": 1269,
        "nerSqft": 2
      }
    ]
  },
  "compsAverage": {
    "leases": 3.33,
    "traffic": 8,
    "nerSqft": 2.72,
    "ner": 2302,
    "totalConcessions": 1659,
    "sqft": 845
  },
  "subjectAverageByUnitType": [
    {
      "bedrooms": 0,
      "ner": 1459,
      "nerSqft": 2.4546671741859654,
      "sqft": 594,
      "atrPercentage": 11.9,
      "rent": 1693
    },
    {
      "bedrooms": 1,
      "ner": 2074,
      "nerSqft": 2.7265226416044106,
      "sqft": 761,
      "atrPercentage": 6.08,
      "rent": 2143
    },
    {
      "bedrooms": 2,
      "ner": 3697,
      "nerSqft": 2.79086370693216,
      "sqft": 1325,
      "atrPercentage": 15.09,
      "rent": 4009
    },
    {
      "bedrooms": 3,
      "ner": 4396,
      "nerSqft": 2.6693840987121247,
      "sqft": 1647,
      "atrPercentage": 18.52,
      "rent": 4934
    }
  ],
  "compsAverageByUnitType": [
    {
      "bedrooms": 0,
      "ner": 1641,
      "nerSqft": 2.879196508229124,
      "sqft": 570,
      "atrPercentage": 5.11,
      "rent": 1732
    },
    {
      "bedrooms": 1,
      "ner": 2021,
      "nerSqft": 2.6572596956884857,
      "sqft": 761,
      "atrPercentage": 5.66,
      "rent": 2153
    },
    {
      "bedrooms": 2,
      "ner": 3188,
      "nerSqft": 2.7150769839699187,
      "sqft": 1174,
      "atrPercentage": 11.88,
      "rent": 3352
    },
    {
      "bedrooms": 3,
      "ner": 8865,
      "nerSqft": 3.6422336656805814,
      "sqft": 2434,
      "atrPercentage": 50,
      "rent": 9673
    }
  ],
  "createdAt": {
    "$date": "2023-07-13T07:41:28.696Z"
  }
}
```

## Response Codes

| Code | Definition |
| --- | --- |
|  |  |
| --- | --- |
| **200** | **OK**  Successfully returned response. The response message varies, depending on the request method/endpoint and the requested data. |