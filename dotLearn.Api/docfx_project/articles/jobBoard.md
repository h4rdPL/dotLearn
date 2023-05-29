
<hr />

<center><h4>Job board</h4></center>

<hr />

``` js
	POST /api/Job/create
```

<b><h5>Request<h5></b>


``` json
    {
      "id": 0,
      "title": "string",
      "salary": 0,
      "currency": 0,
      "description": "string",
      "email": "string",
      "expectations": [
        {
          "value": "string"
        }, 
        {
          "value": "string"
        },
        {
          "value": "string"
        }
      ],
      "offer": [
        {
          "value": "string"
        }
      ],
      "benefits": [
        {
          "developmentOpportunities": "string",
          "projectWork": "string",
          "sportsPackage": "string",
          "medicalInsurance": "string"
        },
        {
          "developmentOpportunities": "string",
          "projectWork": "string",
          "sportsPackage": "string",
          "medicalInsurance": "string"
        },
        {
          "developmentOpportunities": "string",
          "projectWork": "string",
          "sportsPackage": "string",
          "medicalInsurance": "string"
        }
      ]
    }	
```

<b><h5>Response<h5></b>

``` js
    200 Ok
```

``` json
    {
      "job": {
        "id": 0,
        "title": "string",
        "salary": 0,
        "currency": 0,
        "description": "string",
        "email": "string",
        "expectations": [
          {
            "value": "string"
          }
        ],
        "offer": [
          {
            "value": "string"
          }
        ],
        "benefits": [
          {
            "developmentOpportunities": "string",
            "projectWork": "string",
            "sportsPackage": "string",
            "medicalInsurance": "string"
          }
        ]
      }
    }
```

<b><h5>Response<h5></b>

``` js
	500 Error 
```

``` js
	System.Exception: // no error validation now
```

