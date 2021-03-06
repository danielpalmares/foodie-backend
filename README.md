# Foodie API
Hey guys! I created this API with a single purpose... to make my foodie web app better with custom features 👉 [foodie client](https://github.com/danielpalmares/foodie)

## What will I find in this api?
- SOLID principles
- User authentication with JWT
- Package by feature archtecture
- Image uploads with multer
- Knex setup in typescript

## API documentation
- [Status](#status)
- [Pre-requirements](#pre-requirements)
- [Instructions](#instructions)
- [Tools](#tools)
- [Data modeling](#data-modeling)
- [Uploading images](#uploading-images)
- [Routes](#routes)
  - [User routes](#user-related-routes)
  - [Friendship routes](#friendship-related-routes)
  - [Recipes routes](#recipe-related-routes)
    

## Status
It is already usable, but may find bugs

---
- [ ] Use more entities to create a more consistent query response
- [ ] Make more tests
- [ ] Improve entities archtecture
---


## Pre-requirements
Before getting started, you will need to have installed in your machine these tools: 

- [Git](https://git-scm.com) 
- [Node JS](https://nodejs.org/en/)

Besides that, it is a good idea to have a nice text editor like [VSCode](https://code.visualstudio.com/)

## Instructions
```bash
# Open the cmd/terminal and clone this repository
$ git clone <https://github.com/danielpalmares/foodie-backend>

# Open the project folder 
$ cd foodie-backend

# Install the dependencies
$ yarn

# Run the application in development mode
$ yarn dev

# The server will start
```

## Tools
These tools were used in the project:

- Express
- Typescript
- Knexjs

## Data modeling
![Foodie data modeling](https://github.com/danielpalmares/foodie-back/blob/main/foodie-data-model.png)
---

## Uploading images
```
Maximum size: 2mb
Mimetypes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif',]
```

## Routes
All routes need an **authorization header**, except 👇
```
POST /user
GET /authenticate
```
| **Header** | **Value** |
|---------------|--------------|
| Authorization | Bearen token |

Server response status will be 401 if you dont provide the bearen token
  
## User related routes
### Create a user
```
POST /user
Form enctype: multipart/form-data
```

```json
// request body
{
  "name": "John",
  "username": "userjohn",
  "email": "userjohn@gmail.com",
  "password": "johnspass",
  "gender": 1,
  "profile-photo": "file"
}
// gender: 0 for woman, 1 for man and 2 for others
```

```json
// response body, status: 201
```

```json
// response body, status: 422
{
  "message": "error message"
}
```

### Edit a user
```
PUT /user/:id
Form enctype: multipart/form-data
```

```json
// request body
{
  "name": "John",
  "biography": "Your biography",
  "profile-photo": "file"
}
```

```json
// response body, status: 201
```

```json
// response body, status: 422
{
  "message": "error message"
}
```

### Delete a user
```
DELETE /user/:id
```

```json
// response body, status: 200
```

```json
// response body, status: 422
{
  "message": "error message"
}
```

### Get a user
```
GET /user/:username
```

```json
// response body, status: 200
{
  "user_id": "b1b6d3bf-c987-47dd-87bf-24b63f600fbf",
  "name": "John",
  "username": "userjohn",
  "gender": "male",
  "biography": "John's biography",
}
```

```json
// response body, status: 422
{
  "message": "error message"
}
```

### Authenticate a user
```
GET /authenticate
```

```json
// request body
{
  "username": "userjohn",
  "password": "johnspass",
}
```

```json
// response body, status: 200
{
  "token": "bearen token"
}
```

```json
// response body, status: 401
{
  "message": "error message"
}
```

## Friendship related routes
### Add a friend
```
POST /friendRequest
```

```json 
// request body
{ 
  "senderId": "b1b6d3bf-c987-47dd-87bf-24b63f600fbf",
  "receiverId": "46dfa41f-8382-4301-896d-259715ed7c29",
} 
```

```json
// response body, status: 201
```

```json
// response body, status: 422
{
  "message": "error message",
}
```

### Get my friend requests
```
GET /friendRequests/:userId
```

```json
// response body, status: 200
{
  "request_id": "e9878a57-bb77-48ed-b57b-bc868f21f2a2",
  "sender_id": "46dfa41f-8382-4301-896d-259715ed7c29",
  "sender_username": "sender",
  "receiver_id": "b1b6d3bf-c987-47dd-87bf-24b63f600fbf",
  "receiver_username": "receiver"
}
```

```json
// response body, status: 404
{
  "message": "error message",
}
```

### Accept a friend request
```
POST /friendship/:requestId
```

```json
// response body, status: 201
```

```json
// response body, status: 422
{
  "message": "error message",
}
```

### Reject a friend request
```
DELETE /friendRequest/:requestId
```

```json
// response body, status: 200
```

```json
// response body, status: 422
{
  "message": "error message",
}
```

### Get my friends list
```
GET /friendsList/:userId
```

```json
// response body, status: 200
{
  "data": [
    {
      "user_id": "b1b6d3bf-c987-47dd-87bf-24b63f600fbf",
      "name": "Friend name",
      "username": "Friend username",
      "gender": "male",
      "biography": null,
      "profile-image": "Image url"
    }
  ]
}
```

```json
// response body, status: 404
{
  "message": "error message",
}
```

### Remove a friend
```
DELETE /friend/:id
```

```json
// response body, status: 200
```

```json
// response body, status: 422
{
  "message": "error message",
}
```

## Recipe related routes
### Create a recipe
```
POST /recipe
Form enctype: multipart/form-data
```

```json
// request body
{
  "title": "John's Pizza",
  "servings": 8,
  "ready_in_minutes": 60,
  "ingredients": [
    {
      "name": "Tomato",
      "unit": "",
      "amount": 2,
    }
  ],
  "instructions": [
    {
      "step_number": 1,
      "step": "Take the tomato and..."
    }
  ],
  "recipe-photo": "file",
  "author_id": "b1b6d3bf-c987-47dd-87bf-24b63f600fbf",
}
```

```
NOTE: use JSON.stringify() on ingredients and instructions array
```

```json
// response body, status: 201
```

```json
// response body, status: 422
{
  "message": "error message"
}
```

### Delete a recipe
```
DELETE /recipe/:id
```

```json
// response body, status: 200
```

```json
// response body, status: 422
{
  "message": "error message"
}
```

### Get all recipes
```
GET /recipes
```

```json
// response body, status: 200
{
  "recipes": [
    {
      "recipe_id": "fsb6d3bf-c987-47dd-87bf-24b63f600fbf",
      "title": "John's Pizza",
      "servings": 8,
      "ready_in_minutes": 60,
      "author_id": "b1b6d3bf-c987-47dd-87bf-24b63f6ssfbf",
      "ingredients": [
        {
          "name": "Tomato",
          "unit": "",
          "amount": 2,
        }
      ],
      "instructions": [
        {
          "step_number": 1,
          "step": "Take the tomato and..."
        }
      ],
      "recipe-photo": {
        "url": "Image url"
      }
    }
  ]
}
```

### Get all my recipes
```
GET /recipes/:userId
```

```json
// response body, status: 200
{
  "recipes": [
    {
      "recipe_id": "fsb6d3bf-c987-47dd-87bf-24b63f600fbf",
      "title": "John's Pizza",
      "servings": 8,
      "ready_in_minutes": 60,
      "author_id": "b1b6d3bf-c987-47dd-87bf-24b63f6ssfbf",
      "ingredients": [
        {
          "name": "Tomato",
          "unit": "",
          "amount": 2,
        }
      ],
      "instructions": [
        {
          "step_number": 1,
          "step": "Take the tomato and..."
        }
      ],
      "recipe-photo": {
        "url": "Image url"
      }
    }
  ]
}
```

### Get one recipe
```
GET /recipe/:id
```

```json
// response body, status: 200
{
  "recipe_id": "fsb6d3bf-c987-47dd-87bf-24b63f600fbf",
  "title": "John's Pizza",
  "servings": 8,
  "ready_in_minutes": 60,
  "author_id": "b1b6d3bf-c987-47dd-87bf-24b63f6ssfbf",
  "ingredients": [
    {
      "name": "Tomato",
      "unit": "",
      "amount": 2,
    }
  ],
  "instructions": [
    {
      "step_number": 1,
      "step": "Take the tomato and..."
    }
  ],
  "recipe-photo": {
    "url": "Image url"
  }
}
```

```json
// response body, status: 404
{
  "message": "error message"
}
```

## License
This project is under the MIT license. See the archive [LICENSE](https://github.com/danielpalmares/foodie-backend/blob/main/LICENSE) for more details
