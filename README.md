# Projuect setup

First, the packages that I used to set up the project are Express js, Mongoose, TypeScript, Cors, Zod, dotenv and bcrypt.

## Package work

1. Express.js : Express.js is a minimal and flexible Node.js web application framework. This package is used to interact with web applications and APIs.
2. Mongoose : Used with MongoDB databases, to facilitate interaction with MongoDB and to work with MongoDB documents.
Those used for work are:
- Object Data Modeling (ODM)
- Schema Definition
- Zod Validation
- Middleware Support
- Query Building

3. TypeScript : TapeScript is a superset of JavaScript that provides static typing in the language. In short, typeScript is used to determine the type of javascript
It is primarily used for:
- Static Typing
- Code Maintainability
- Object-Oriented Programming (OOP)
- Compatibility with ECMAScript
4. Cors : Cross-Origin Resource Sharing (CORS) Used for this.
5. Zod : Zod is a TypeScript-first schema declaration and validation library. It is commonly used for data validation in TypeScript projects
6. dotenv : I used this package only to protect the environment variables.
7. bcrypt : I am using this package to hash passwords in this project

# User Maintainability
1. Create a new user
 - Enpoint: POST : /api/users
 - Request Body

```javascript
{
"user":{
    "userId": 1111,
    "username": "sagorali51",
    "password": "!@#qweS123",
    "fullName": {
        "firstName": "Md Sagor",
        "lastName": "ali"
    },
    "age": 24,
    "email": "sagor@gmail.com",
    "isActive": true,
    "hobbies": ["football"],
    "address": {
        "street": "Singra",
        "city": "Rajshahi",
        "country": "Bangladesh"
    }
}
}
```
## Success Response Data
```javascript
{
    "success": true,
    "message": "User created successfully!",
    "data": {
        "userId": 1111,
        "username": "sagorali51",
        "fullName": {
            "firstName": "Md Sagor",
            "lastName": "ali",
            "_id": "6569ebee24f49a2dbce402fc"
        },
        "age": 24,
        "email": "sagor@gmail.com",
        "isActive": true,
        "hobbies": [
            "football"
        ],
        "address": {
            "street": "Singra",
            "city": "Rajshahi",
            "country": "Bangladesh",
            "_id": "6569ebee24f49a2dbce402fd"
        }
    }
}
```
# Get all data
Endpoint : /api/users
- Response: List of user objects. show the filtering object username, fullName, age, email, address
```javascript
{
    "success": true,
    "massage": "User fetched successfully!",
    "data": [
        {
            "_id": "6569ebee24f49a2dbce402fb",
            "username": "sagorali51",
            "fullName": {
                "firstName": "Md Sagor",
                "lastName": "ali",
                "_id": "6569ebee24f49a2dbce402fc"
            },
            "age": 24,
            "email": "sagor@gmail.com",
            "address": {
                "street": "Singra",
                "city": "Rajshahi",
                "country": "Bangladesh",
                "_id": "6569ebee24f49a2dbce402fd"
            }
        }
        //more object...
    ]
}
```
# Specific user by ID
- Endpoint: Get : /api/users/:userId
### The response will show like this if the response is correct and the password is omitted during filtering so the password will not show
```javascript
{
    "success": true,
    "massage": "User fetched successfully!",
    "data": {
        "_id": "6569ebee24f49a2dbce402fb",
        "userId": 1111,
        "username": "sagorali51",
        "fullName": {
            "firstName": "Md Sagor",
            "lastName": "ali",
            "_id": "6569ebee24f49a2dbce402fc"
        },
        "age": 24,
        "email": "sagor@gmail.com",
        "isActive": true,
        "hobbies": [
            "football"
        ],
        "address": {
            "street": "Singra",
            "city": "Rajshahi",
            "country": "Bangladesh",
            "_id": "6569ebee24f49a2dbce402fd"
        }
    }
}
```
### 
If an error occurs, a meaningful error will be displayed
```javascript
{
    "success": false,
    "massage": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```

# Update user
- Endpoint: PUT : /api/users/:userId
- Request Body
### Response: If the User object is updated and the Confirmed Password field is not included in the response data. If the update is done correctly.
```javascript
{
    "userId": 2222,
    "username": "sagorali1234",
    "password": "017432",
    "fullName": {
        "firstName": "Sagor",
        "lastName": "mahmud"
    },
    "age": 10,
    "email": "sagor@gmail.com",
    "isActive": true,
    "hobbies": ["football"],
    "address": {
        "street": "singra",
        "city": "rajshahi",
        "country": "bangladesh"
    }
}
```
### it will show like this and if not, it will give a meaningful massage
```javascript
{
    "success": false,
    "massage": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```

# Delete a user
- Endpoint: DELETE /api/users/:userId
- Response: Success message
```javascript
{
	"success": true,
	"message": "User deleted successfully!",
	"data" : null
}
```
### If the user exists or not then this message will be given
```javascript
{
    "success": false,
    "message": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```

# Bonus Section
## Order Management:
1. Add new product in order
### If the 'order' attribute already exists for a user, a new product is added to it. Otherwise, an 'order' array is created within the user object
- Endpoint: PUT /api/users/:userId/orders
- Request Body
```javascript
    {
        "productName":"Honda",
        "price":30000,
        "quantity":1
     }
```
- Response : Successfully massage
```javascript
{
    "success": true,
    "massage": "Order created successfully!",
    "data": null
}
```
# Retrieve all orders for a specific user
- Endpoint: GET /api/users/:userId/orders
- Response : Successfully data
```javascript
{
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
        "orders": [
             {
                "productName":"Honda",
                "price":30000,
                "quantity":1
             },
             {
                "productName":"Honda",
                "price":30000,
                "quantity":1
             }
        ]
    }
}
```
## Calculate Total Price of Orders for a Specific User
- Endpoint: GET /api/users/:userId/orders/total-price
- Response : Successfully data
```javascript
{
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 454.32
    }
}
```
### 
If an error occurs, a meaningful error will be displayed
```javascript
{
    "success": false,
    "message": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```
