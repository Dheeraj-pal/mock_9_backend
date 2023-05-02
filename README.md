# Social Media App Backend

## *User End Point*;

1. `POST`: `/register`
   This endpoint should allow users to register. Hash the password on store.
   
2. `GET`: `/users`
   This endpoint should return a list of all registered users.
   
3. `GET`: "/users/:id/friends"
   This endpoint should return a list of all friends of a specific user identified by its ID.

4. `POST`: `/users/:id/friends`
   This endpoint should allow the user to send a friend request to another user identified by its ID.
   
5. `PATCH`: `/users/:id/friends/:friendId`
   This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID.

- User Model
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}
```

## *Post End Point*;

1. `GET`: `/posts`
   This endpoint should return a list of all posts.
   
2. `POST`: `/posts`
   This endpoint should allow the user to create a new post.
   
3. `PATCH`: `/posts/:id`
    his endpoint should allow users to update the text or image of a specific post identified by its ID.

4. `DELETE`: `/posts/:id`
   This endpoint should allow users to delete a specific post identified by its ID.   

5. `POST`: `/posts/:id/like`
   This endpoint should allow users to like a specific post identified by its ID.
   
6. `POST`: `/posts/:id/comment` 
   This endpoint should allow users to comment on a specific post identified by its ID.
   
7. `GET`: `/posts/:id`
   This endpoint should return the details of a specific post identified by its ID.
   
  - Restaurant Model
```
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}
```


## *BackEnd Deployed link*
```
 https://mock9backend-production.up.railway.app/
```
