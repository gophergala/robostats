# Robotstats

## Data types

This is a diagram of the data entities we think we'll use:

![erd](https://cloud.githubusercontent.com/assets/385670/5886012/1402d5b0-a348-11e4-8482-eea04c5a1875.png)

## Basic API rules

See [#2](https://github.com/gophergala/robostats/issues/2).

## API endpoints

### POST /user/login (application/x-www-form-urlencoded)

Successful login example:

```sh
curl api.dev.robostats.io/user/login -d "email=user@example.com&password=pass" --verbose
...
> POST /user/login HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-Length: 36
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 36 out of 36 bytes
< HTTP/1.1 200 OK
< Content-Length: 140
< Content-Type: application/json; charset=utf-8
< Date: Sat, 24 Jan 2015 20:06:21 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "access_token": "JKB54JAKcNubIwrcOlukdSQhpZE2Am1ps1tqtlfF",
  "token_type": "bearer",
  "user_id": "54c3fb0960d71e4c5c000007"
}
```

Failed login example:

```sh
curl api.dev.robostats.io/user/login -d "email=user@example.com&password=fail" --verbose
...
< HTTP/1.1 401 Unauthorized
< Content-Length: 13
< Content-Type: text/plain
< Date: Sat, 24 Jan 2015 20:07:57 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
Unauthorized
```

## POST /user (application/json)

Creates an user.

Successful request:

```sh
curl api.dev.robostats.io/user -H "Content-type: application/json" -X POST -d '{"user": {"email": "foo", "password": "pass"}}' --verbose
...
> POST /user HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Content-Length: 46
>
* upload completely sent off: 46 out of 46 bytes
< HTTP/1.1 201 Created
< Content-Length: 3
< Content-Type: text/plain
< Date: Sat, 24 Jan 2015 20:37:07 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "user": {
    "id": "54c4106160d71e5b67000003",
    "email": "fooex",
    "password": "",
    "created_at": "2015-01-24T15:36:32.996882458-06:00",
    "session": {
      "user_id": "54c4106160d71e5b67000003",
      "token": "2yFQe8doL2W3FptLNo5DVMxEDNOuj6NVxFM3HOB2",
      "created_at": "2015-01-24T15:36:33.120703271-06:00"
    }
  }
}
```

Failed request:

```sh
 curl api.dev.robostats.io/user -H "Content-type: application/json" -X POST -d '{"user": {"email": "foo", "password": "pass"}}' --verbose
> POST /user HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Content-Length: 46
>
* upload completely sent off: 46 out of 46 bytes
< HTTP/1.1 422 status code 422
< Content-Length: 48
< Content-Type: application/json
< Date: Sat, 24 Jan 2015 20:40:39 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "errors": [
    "User already exists."
  ]
}
```

## GET /user/:id (application/json)

```
curl api.dev.robostats.io/user/me -H "Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG" -X GET --verbose
> GET /user/me HTTP/1.1
> User-Agent: curl/7.37.0
> Host: localhost:9000
> Accept: */*
> Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 287
< Content-Type: application/json
< Date: Sat, 24 Jan 2015 23:01:14 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "user": {
    "id": "54c4239260d71e66d5000001",
    "email": "user",
    "password": "",
    "created_at": "2015-01-24T16:58:26.63-06:00",
    "session": {
      "user_id": "54c4239260d71e66d5000001",
      "token": "",
      "created_at": "2015-01-24T16:58:45.372-06:00"
    }
  }
}
```

## Old proposal.

## /classes/create

Creates a class and returns the newly created public class data.

Input:

* **class_name**
* **token**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/list

Returns a paginated list of classes that the active user has crated.

Input:

* **token**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/remove

Deletes a class that the user created.

Input:

* **token**
* **class_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/get

Returns a class given its ID. Also returns the list of associated instances.

Input:

* **token**
* **class_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/instances

Returns a paginated list of instances that are associated with a class.

Input:

* **token**
* **class_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/plot/line

Returns a list of points that can be used to represent a line graph.

Input:

* **token**
* **class_id**
* **vertical**
* **horizontal**

Output:

```json
// Success response
```

```json
// Error response
```

## /instance/sessions

Returns a paginated list of sessions that are associated with an instance.

Input:

* **token**
* **instance_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /instance/plot/line

Returns a list of points that can be used to represent a line graph.

Input:

* **token**
* **instance_id**
* **vertical**
* **horizontal**

Output:

```json
// Success response
```

```json
// Error response
```


## /session/events

Returns a paginated list of events that are associated with a session.

Input:

* **token**
* **session_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /session/plot/line

Returns a list of points that can be used to represent a line graph.

Input:

* **token**
* **session_id**
* **vertical**
* **horizontal**

Output:

```json
// Success response
```

```json
// Error response
```

