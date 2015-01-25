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

## GET /users/:id (application/json)

```
curl api.dev.robostats.io/users/123 -H "Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG" -X GET --verbose
> GET /user/me HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
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

## POST /device_classes

```
curl api.dev.robostats.io/device_classes -H "Content-type: application/json" -H "Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG" -X POST -d '{"device_classes": {"name": "Class name"}}' --verbose
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> POST /device_classes HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG
> Content-Length: 40
>
* upload completely sent off: 40 out of 40 bytes
< HTTP/1.1 201 Created
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 249
< Content-Type: application/json
< Date: Sat, 24 Jan 2015 23:24:05 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "device_class": {
    "id": "54c4299560d71e6aed000002",
    "user_id": "54c4239260d71e66d5000001",
    "name": "Class name",
    "api_key": "4ZGvOWMSPN2k5M0QDneXLIGRVh2N1m4H9aXPKhKe",
    "created_at": "2015-01-24T17:24:05.128402145-06:00"
  }
}
```

## GET /device_classes

```
curl api.dev.robostats.io/device_classes -H "Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG" -X GET --verbose
> GET /device_classes HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 506
< Content-Type: application/json
< Date: Sat, 24 Jan 2015 23:38:14 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "device_classes": [
    {
      "id": "54c4298960d71e6aed000001",
      "user_id": "54c4239260d71e66d5000001",
      "name": "Class name",
      "api_key": "KfYw0ro4sqPtACpOlj5Xyd7ohTdhU0WmCtinYEC1",
      "created_at": "2015-01-24T17:23:53.398-06:00"
    },
    {
      "id": "54c4299560d71e6aed000002",
      "user_id": "54c4239260d71e66d5000001",
      "name": "Class name",
      "api_key": "4ZGvOWMSPN2k5M0QDneXLIGRVh2N1m4H9aXPKhKe",
      "created_at": "2015-01-24T17:24:05.128-06:00"
    }
  ]
}
```

## GET /device_classes/:id (application/json)

```
curl api.dev.robostats.io/device_classes/54c4299560d71e6aed000002 -H "Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG" -X GET --verbose
> GET /device_classes/54c4299560d71e6aed000002 HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 243
< Content-Type: application/json
< Date: Sat, 24 Jan 2015 23:47:50 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "device_class": {
    "id": "54c4299560d71e6aed000002",
    "user_id": "54c4239260d71e66d5000001",
    "name": "Class name",
    "api_key": "4ZGvOWMSPN2k5M0QDneXLIGRVh2N1m4H9aXPKhKe",
    "created_at": "2015-01-24T17:24:05.128-06:00"
  }
}
```

## DELETE /device_classes/:id

```
curl api.dev.robostats.io/device_classes/54c4299560d71e6aed000002 -H "Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG" -X DELETE --verbose
> DELETE /device_classes/54c4299560d71e6aed000002 HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Authorization: Bearer itdXOKTP9U16B2wtgW1hgpMp0xHKfAkjkCSBKwSG
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 3
< Content-Type: text/plain
< Date: Sat, 24 Jan 2015 23:53:39 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
OK
```

## GET /device_instances

Returns all instances that belong to the user.

```
curl api.dev.robostats.io/device_instances -H "Content-type: application/json" -X GET -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071"
> GET /device_instances HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 1314
< Content-Type: application/json
< Date: Sun, 25 Jan 2015 13:35:47 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block

{
  "deviceInstances": [
    {
      "id": "54c4ebfe60d71e7c8400000a",
      "user_id": "54c4ebfe60d71e7c84000001",
      "class_id": "54c4ebfe60d71e7c84000008",
      "data": {
        "serial_number": "VQYM1RI5"
      },
      "created_at": "2015-01-25T07:13:34.881-06:00"
    },
    {
      "id": "54c4ebfe60d71e7c8400000b",
      "user_id": "54c4ebfe60d71e7c84000001",
      "class_id": "54c4ebfe60d71e7c84000004",
      "data": {
        "serial_number": "BSF4IM9W"
      },
      "created_at": "2015-01-25T07:13:34.882-06:00"
    }
  ]
}
```

## GET /device_instances/:id

Returns the instance that matches the given ID.

```
curl api.dev.robostats.io/device_instances/54c4ebfe60d71e7c8400000e -H "Content-type: application/json" -X GET -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071" --verbose 2>log.txt
> GET /device_instances/54c4ebfe60d71e7c8400000e HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 259
< Content-Type: application/json
< Date: Sun, 25 Jan 2015 13:37:47 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<

{
  "deviceInstance": {
    "id": "54c4ebfe60d71e7c8400000e",
    "user_id": "54c4ebfe60d71e7c84000001",
    "class_id": "54c4ebfe60d71e7c84000003",
    "data": {
      "serial_number": "HZXTL9LS"
    },
    "created_at": "2015-01-25T07:13:34.883-06:00"
  }
}
```

## DELETE /device_instances/:id

Removes the instance that matches the given ID.

```
curl api.dev.robostats.io/device_instances/54c4ebfe60d71e7c8400000e -H "Content-type: application/json" -X DELETE -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071" --verbose
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> DELETE /device_instances/54c4ebfe60d71e7c8400000e HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 3
< Content-Type: text/plain
< Date: Sun, 25 Jan 2015 13:38:24 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
OK
```

## GET /device_sessions

Returns all sessions that belong to the user.

```
curl api.dev.robostats.io/device_sessions -H "Content-type: application/json" -X GET -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071" --verbose
> GET /device_sessions HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Type: application/json
< Date: Sun, 25 Jan 2015 13:42:28 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
< Transfer-Encoding: chunked
<

{
  "deviceSessions": [
    {
      "id": "54c4ebfe60d71e7c8400000f",
      "user_id": "54c4ebfe60d71e7c84000001",
      "class_id": "54c4ebfe60d71e7c84000008",
      "instance_id": "54c4ebfe60d71e7c8400000a",
      "session_key": "1thfSqatoPhU2sFQcYMt",
      "data": null,
      "start_time": "2015-01-26T06:09:48.76-06:00",
      "end_time": "2015-02-04T01:36:44.07-06:00",
      "created_at": "2015-01-25T07:13:34.883-06:00"
    },
    {
      "id": "54c4ebfe60d71e7c84000010",
      "user_id": "54c4ebfe60d71e7c84000001",
      "class_id": "54c4ebfe60d71e7c84000005",
      "instance_id": "54c4ebfe60d71e7c8400000d",
      "session_key": "h3d7MhuY1SkELdSJwiWo",
      "data": null,
      "start_time": "2015-01-05T23:21:00.806-06:00",
      "end_time": "2015-01-17T21:46:05.884-06:00",
      "created_at": "2015-01-25T07:13:34.884-06:00"
    }
	]
}
```

## GET /device_sessions/:id

Returns the session that matches the given ID.

```
curl api.dev.robostats.io/device_sessions/54c4ebfe60d71e7c8400000f -H "Content-type: application/json" -X GET -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071" --verbose
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /device_sessions/54c4ebfe60d71e7c8400000f HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 409
< Content-Type: application/json
< Date: Sun, 25 Jan 2015 13:45:08 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
{
  "deviceSession": {
    "id": "54c4ebfe60d71e7c8400000f",
    "user_id": "54c4ebfe60d71e7c84000001",
    "class_id": "54c4ebfe60d71e7c84000008",
    "instance_id": "54c4ebfe60d71e7c8400000a",
    "session_key": "1thfSqatoPhU2sFQcYMt",
    "data": null,
    "start_time": "2015-01-26T06:09:48.76-06:00",
    "end_time": "2015-02-04T01:36:44.07-06:00",
    "created_at": "2015-01-25T07:13:34.883-06:00"
  }
}
```

## DELETE /device_instances/:id

```
curl api.dev.robostats.io/device_sessions/54c4ebfe60d71e7c8400000f -H "Content-type: application/json" -X DELETE -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071" --verbose
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> DELETE /device_sessions/54c4ebfe60d71e7c8400000f HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Length: 3
< Content-Type: text/plain
< Date: Sun, 25 Jan 2015 13:46:21 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
<
OK
```

## GET /device_logs

Returns all logs that belong to the user.

```
curl api.dev.robostats.io/device_logs -H "Content-type: application/json" -X GET -H "Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071" --verbose

> GET /device_logs HTTP/1.1
> User-Agent: curl/7.37.0
> Host: api.dev.robostats.io
> Accept: */*
> Content-type: application/json
> Authorization: Bearer lapfkPYXWJkhSasV26jD8VN3unMkVF2LvRht2071
>
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0< HTTP/1.1 200 OK
< Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
< Access-Control-Allow-Origin: *
< Content-Type: application/json
< Date: Sun, 25 Jan 2015 13:50:48 GMT
< Set-Cookie: REVEL_FLASH=; Path=/
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-Xss-Protection: 1; mode=block
< Transfer-Encoding: chunked
<

{
  "deviceLogs": [
    {
      "id": "54c4ebfe60d71e7c84000019",
      "user_id": "54c4ebfe60d71e7c84000001",
      "class_id": "54c4ebfe60d71e7c84000003",
      "instance_id": "54c4ebfe60d71e7c8400000c",
      "session_id": "54c4ebfe60d71e7c84000012",
      "data": null,
      "local_time": 0,
      "latlng": [
        18.75536,
        -98.67731
      ],
      "created_at": "2015-01-25T07:13:34.887-06:00"
    },
    {
      "id": "54c4ebfe60d71e7c8400001a",
      "user_id": "54c4ebfe60d71e7c84000001",
      "class_id": "54c4ebfe60d71e7c84000005",
      "instance_id": "54c4ebfe60d71e7c8400000d",
      "session_id": "54c4ebfe60d71e7c84000011",
      "data": null,
      "local_time": 1,
      "latlng": [
        19.97565,
        -99.20467000000001
      ],
      "created_at": "2015-01-25T07:13:34.887-06:00"
    }
	]
}
```

