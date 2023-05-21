<hr />

<center><h4> Register </h4></center>

<hr />


``` js
	POST /api/Authentication/register
```

<b><h5>Request<h5></b>

``` json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string@gmail.com",
    "password": "string",
    "role": 0
}
```

<b><h5>Response<h5></b>

``` js
	200 OK
```

```json
{
    "id": "f1bf01f6-653d-4fdc-9351-22eff5a5340a",
    "firstName": "string",
    "lastName": "string",
    "email": "string@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWJmMDFmNi02NTNkLTRmZGMtOTM1MS0yMmVmZjVhNTM0MGEiLCJnaXZlbl9uYW1lIjoic3RyaW5nIiwiZmFtaWx5X25hbWUiOiJzdHJpbmciLCJ1bmlxdWVfbmFtZSI6IjExNTc1N2EwLTRiMmQtNGNjMy04OWUwLWMzOWQ2MWJmMmMyMCIsInJvbGUiOiJTdHVkZW50IiwiZXhwIjoxNjg0MTgxMzc3fQ.75bezLMR3qAy1bL1LoDI9OKiw2rNCVKsVPIyDbO0NrA"
}
```
