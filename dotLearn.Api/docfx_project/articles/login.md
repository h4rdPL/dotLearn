<hr />

<center><h4> Login </h4></center>

<hr />

``` js
	POST /api/Authentication/login
```

<b><h5>Request<h5></b>

``` json
{
  "email": "string@gmail.com",
  "password": "string"
}
```

<b><h5>Response<h5></b>

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