
<hr />

<center><h4>Validation</h4></center>

<hr />

<b><h5>Request<h5></b>


``` text
        // Valid input
        john.doe@domain.com
```


``` text
        // Invalid input
        john.doe
```

<b><h5>Response<h5></b>

``` js
	500 Error 
```

``` js
	System.Exception: Podany adres email jest niepoprawnie skonstruowany
```

