# Hotel Reservation Backend APIs
it's the complete backend for creating, booking and searching rooms/hotels.



### [Endpoints](#endpoints)
* [POST /register  .](#register)  To register the user.
* [POST /login  .](#user) To login as user.
* [POST /admin/login](#admin) Login as Admin with full access
* [POST /room/create](#create) Create new rooms. [Admin Only]
* [GET /room/all ](#all) get all rooms
* [GET /room/filter ](#filter) Search room with parmater
* [GET /room/available](#available) Get room avilablity dates.
* [POST /room/book ](#book) Book a room.

### Other

 * [Installatioin](#install)
 * [Directory Structure](#directory)
 * [Status code](#status)







<a id="endpoints"></a>

<h1> ENDPOINTS</h1>

<a id="register"></a>

### User register
```https
  POST /register
```


##### Request body
```json
    {
        "username": "String " [unique],
        "password": "String"
    }
```

##### Response

```javascript
{
    "message": "User registered successfully",
    "userId": INTEGER
}
```

The `message` attribute contains a message commonly used to indicate status of the request.
The `userId` attribute contains id auto generated integer id for that user.


<a id="user"></a>

## User Login


```http
    POST /login
```
it's user login with limited access.

#### Request Body

```javaScript
    {
        "username": STRING,
        "password": STRING
    }
```

#### Response 

```javaScript
{
    token: STRING
}
```

The `Token` is generated by jwt, for further access.


<a id="admin"></a>

## Admin login


```http
    POST /admin/login
```
it's `admin` login with full access to all features.

##### Request Body

```javaScript
    {
        "username": STRING,
        "password": STRING
    }
```

##### Response 

```javaScript
{
    token: STRING
}
```

The `Token` is generated by jwt, for further access.

<a id="create"></a>

## Create rooms


```http
    POST /room/create
```
Only `ADMIN` can create room.

##### Request Body

```javaScript
    {
    "roomNumber": STRING [unique],
    "capacity": INTEGER,
    "rent":INTEGER
}
```

The `roomNumber ` is the any unique string or string of number assign to the room.
`capacity` and `rent` you have to define for each room you're creating.

##### Response 

```javaScript
{
    "message": "room been created",
    "details": {
        "id": STRING,
        "available": CURRENT_DATE,
        "roomNumber": STRING,
        "capacity": INTEGER,
        "rent": INTEGER,
        "updatedAt": DATETIME_STRING,
        "createdAt": DATETIME_STRING
    }
}
```

`id` is a autogenerated unique string by `uuid` library, `avilable` denote the current datetime when the room is being created.

<a id="all"></a>

## All rooms


```https
    GET /room/all
```
* Return all the room are present in database

#### Response

```c
   [ Array of Object]
```
This `array` contain one or more room object similar to below example

```javaScript
        {
        "id": UNIQUE_STRING,
        "roomNumber": UNIQUE_STRING,
        "capacity": INTEGER,
        "rent": INTEGER,
        "available": DATE_TIME_STRING,
        "createdAt": DATE_TIME_STRING,
        "updatedAt": DATE_TIME_STRING,
    },

```

<a id="filter"></a>

## Search rooms

```https
    GET /room/filter
```
* Filter the result according to paramter being sent.

* Request params

| Parameter | Type     | Description                                      |
|:----------|:---------|:-------------------------------------------------|
| `id` | `string` | Unique UUID generated for each room         |
| `rent` | `INTEGER` |  Maximum rent you want to pay for a room         |
| `capacity` | `INTEGER` | Minimum Capacity the room must have         |

* If you use `id` for filter param it'll only return one unique result, insted it's better to use `capacity` and/or `rent` for search.


#### Response

```c
   [ Array of Object]
```
This `array` contain one or more room object similar to below example

```javaScript
        {
        "id": UNIQUE_STRING,
        "roomNumber": UNIQUE_STRING,
        "capacity": INTEGER,
        "rent": INTEGER,
        "available": DATE_TIME_STRING,
        "createdAt": DATE_TIME_STRING,
        "updatedAt": DATE_TIME_STRING,
    },

```
<a id="available"></a>

## Room Available dates



```https
    GET /room/available
```
* Check how many dates the room is available for booking within a duration.

* Request params

| Parameter | Type     | Description                                      |
|:----------|:---------|:-------------------------------------------------|
| `id` | `string` | Unique UUID generated for each room       |
| `startDate` | `DATE STRING` |  Maximum rent you want to pay for a room         |
| `endDate` | `DATE STRING` | Minimum Capacity the room must have         |

the `id` is the unique id of the room which should look like `a3cd60d0-22e1-4065-8319-bd5cefe74cac`.  `startDate` and `endDate` within these date which are the date there are no booking, it'll show.


#### Response body
```javascript
    [array]
```

This `[array]` contain the dates of the month when the room is available,
example `[4, 5, 6]`

<a id="book"></a>

## Book rooms

```https
    POST /room/book
```
* endpoint for booking the room.

#### Request body

```javaScript
{
    "id": UNIQUE_ID (e.g."a3cd60d0-22e1-4065-8319-bd5cefe74cac"),
    "startDate": DATE_STRING (e.g. "2023-07-10"),
    "endDate": DATE_STRING (e.g. "2023-07-20"),
}
```


#### Response body
```javaScript
    {
    "bookingId": UNIQUE_ID (e.g."a3cd60d0-22e1-4065-8319-bd5cefe74cac"),,
    "id": UNIQUE_ID (e.g."a3cd60d0-22e1-4065-8319-bd5cefe74cac"),,
    "username": STRING,
    "startDate": DATE_STRING (e.g. "2023-07-10"),
    "endDate": DATE_STRING,
    "updatedAt": DATE_STRING,
    "createdAt": DATE_STRING,
}
```

<a id="status"></a>

## Status Codes

Server returns the following status codes in its API:

| Status Code | Description             |
|:------------|:------------------------|
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 403         | `ACCESS RESTRICTED`     |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |



<a id="install"></a>

## Install and Run on local Machine
1. Clone the repository.
```sh
  git clone https://github.com/Ashism766/hotel-reservation.git
```
2. Install dependencies by running `npm install`.
```sh
  cd hotel-reservation
  npm i 
```
3. Set up the required environment variables  in a `.env` file.
    
    Your `.env` file should look like this below.
  
   
```sh
    POSTGRES_PASSWORD= yourpassword
    USER_NAME= add postgres username
    HOST= hostname or ip 
    PORT= 5432
```

4. Start the server by running `npm `.
```sh
  npm start
```

<a id="directory"></a>
### Directory structure

```bash
    .
├── README.md
├── app
│   ├── api
│   │   ├── admin
│   │   │   ├── controller.js
│   │   │   ├── model
│   │   │   │   └── model.js
│   │   │   └── routes.js
│   │   └── users
│   │       ├── controller.js
│   │       ├── model
│   │       │   └── model.js
│   │       └── routes.js
│   ├── security
│   │   ├── controller.js
│   │   ├── model
│   │   │   ├── model.js
│   │   │   └── query.js
│   │   └── routes.js
│   └── utils
│       └── logger.js
├── app.js
├── config
│   └── config.json
├── config.js
├── logs
│   ├── app.log
│   └── error.log
├── migrations
│   ├── 20230715153307-create_relation_table.js
│   └── package.json
├── package-lock.json
└── package.json

```
