
# API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:3000/app/
```

#### Response body

```
{"message":"200 OK"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /update/:table (GET)

#### Request cURL

```
curl http://localhost:3000/update/{table name}
```

#### Response body

```
{"message": "200"}
```

#### Response headers

```
HTTP/1.1 200 OK      
X-Powered-By: Express     
Date: Sun, 01 May 2022 17:44:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

### /get_data/ (POST)

#### Request cURL

```
curl -d "name='{table name}'&cols=[]&paras=[]$order=''" http://localhost:3000/get_data/
```

#### Response body

```

```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1451
Date: Sun, 01 May 2022 17:52:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /login/ (GET)

#### Request cURL

```
curl http://localhost:3000/login/
```

#### Response body

```

```

#### Response headers

```
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 28 Apr 2022 15:44:37 GMT
ETag: W/"37c-18070d87be0"
Date: Sun, 01 May 2022 17:59:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /loggedin/ (GET)

#### Request cURL

```
curl http://localhost:3000/loggedin/
```

#### Response body

```

```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 28 Apr 2022 15:44:37 GMT
ETag: W/"27c-18070d87bd6"
Content-Type: text/html; charset=UTF-8
Content-Length: 636
Date: Sun, 01 May 2022 18:01:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /auth/ (POST)

#### Request cURL

```
curl -d "username=JohnDoe%pass=password" http://localhost:3000/auth
```

#### Response body

```
"Found. Redirecting to /login"
```

#### Response headers

```
HTTP/1.1 302 Found
X-Powered-By: Express
Location: /login
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 28
Date: Sun, 01 May 2022 18:03:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /signup/ (GET)

#### Request cURL

```
curl http://localhost:3000/signup/
```

#### Response body

```
<!DOCTYPE html>
<html>
    <div class="bigboi">
        <head>
            <link rel="stylesheet" href="./styles.css">
            <title>Sign Up</title>
            A99 - Furud Sign-up Page
            <hr>
        </head>
    </div>
    <body>
        <nav>
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <p><p></p></p>
        </nav>
        <form action="/signup_conf" method="post">
            <div class="container">
                Username:<br>
                <input type="text" name="username" id="username" placeholder="Username" required><br><br>
                Password:<br>
                <input type="password" name="pass" id="pass" placeholder="Password" required><br><br>

                <input type="submit" value="Register">
            </div>
        </form>
        </form> <p><p></p></p>

    </body>
</html>
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 28 Apr 2022 15:44:37 GMT
ETag: W/"384-18070d87bf6"
Content-Type: text/html; charset=UTF-8
Content-Length: 900
Date: Sun, 01 May 2022 18:04:02 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /signup_conf/ (POST)

#### Request cURL

```
curl -d "username=JohnDe%pass=password" http://localhost:3000/signup_conf/
```

#### Response body

```
*
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1448
Date: Sun, 01 May 2022 18:08:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /delete_acc/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /delete_conf/ (POST)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```
