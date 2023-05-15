## **dotLearn.Api**

<hr />

### Authentication


``` js
	POST /api/Authentication/register
```

**Request**

``` json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "role": 0
}
```

**Response**

``` js
	200 OK
```

```json
	{
    "id": "f1bf01f6-653d-4fdc-9351-22eff5a5340a",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWJmMDFmNi02NTNkLTRmZGMtOTM1MS0yMmVmZjVhNTM0MGEiLCJnaXZlbl9uYW1lIjoic3RyaW5nIiwiZmFtaWx5X25hbWUiOiJzdHJpbmciLCJ1bmlxdWVfbmFtZSI6IjExNTc1N2EwLTRiMmQtNGNjMy04OWUwLWMzOWQ2MWJmMmMyMCIsInJvbGUiOiJTdHVkZW50IiwiZXhwIjoxNjg0MTgxMzc3fQ.75bezLMR3qAy1bL1LoDI9OKiw2rNCVKsVPIyDbO0NrA"
}
```

``` js
	POST /api/Authentication/login
```

**Request**

``` json
	{
	  "email": "string",
	  "password": "string"
	}
```

**Response**

``` js
	200 OK
```

``` json
  {
    "id": "f1bf01f6-653d-4fdc-9351-22eff5a5340a",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWJmMDFmNi02NTNkLTRmZGMtOTM1MS0yMmVmZjVhNTM0MGEiLCJnaXZlbl9uYW1lIjoic3RyaW5nIiwiZmFtaWx5X25hbWUiOiJzdHJpbmciLCJ1bmlxdWVfbmFtZSI6IjljMmQwZTYzLTczMmEtNDFjMi05OWE4LTNmZTVmNmE4MTM3MSIsInJvbGUiOiJTdHVkZW50IiwiZXhwIjoxNjg0MTgxNDk1fQ.YRXkgRBhZVVD-991yYvmsIV6wsI2xk6Nfgze2EmTY9s"
}
```