

# PostyApp Social Posting App

Hi! PostyApp is an essential social media application. I aim to develop it as containing ordinary features for now but I can add new features in time. Below things used;

**Back End**
For going to the  back end repository, [click here](https://github.com/mustafakacarr/PostyApp-Social-Posting-App-Back-End).
 - **Spring**
 - Swagger (for documentation schema)
 - Spring Security for auth
 - JWT for auth
 
**Front End**
 - **ReactJS**
 - Redux
 It will store user datas with token in localStorage. 
 
**DevOps**
 - Heroku (For BE deployment)
 - Vercel (For FE deployment)
 - Docker
 - Kubernetes

 And thats all for now. 
 
# Features
- Login and Registration,
- Add, Edit and Delete Post,
- Add, Edit and Delete Comment,
- Add, Edit and Delete Like
- Change avatar and See last activities about you.
Maybe more in time... :)
  

# **API Schema**

## Users
| **HTTP Method** | **Endpoint** | **Description** |
|-----------------|--------------|-----------------|
| GET             | `/users`     | Lists all users. |
| POST            | `/users`     | Creates a new user. |
| GET             | `/users/{userId}` | Retrieves information about a specific user. |
| PUT             | `/users/{userId}` | Updates information about a specific user. |
| DELETE          | `/users/{userId}` | Deletes a specific user. |


## Posts
| **HTTP Method** | **Endpoint** | **Description** |
|-----------------|--------------|-----------------|
| GET             | `/posts`     | Lists all posts. |
| POST            | `/posts`     | Creates a new post. |
| GET             | `/posts?userId={userId}` | Lists posts by a specific user. |
| GET             | `/posts/{postId}` | Retrieves details of a specific post. |
| PUT             | `/posts/{postId}` | Updates a specific post. |
| DELETE          | `/posts/{postId}` | Deletes a specific post. |





## Comments
| **HTTP Method** | **Endpoint** | **Description** |
|-----------------|--------------|-----------------|
| POST            | `/comments`  | Creates a new comment. |
| GET             | `/comments`  | Lists all comments. |
| GET             | `/comments?postId={postId}` | Lists comments for a specific post. |
| GET             | `/comments?userId={userId}` | Lists comments made by a specific user. |
| GET             | `/comments?postId={postId}&userId={userId}` | Lists comments for a specific post and user. |
| GET             | `/comments/{commentId}` | Retrieves details of a specific comment. |
| PUT             | `/comments/{commentId}` | Updates a specific comment. |
| DELETE          | `/comments/{commentId}` | Deletes a specific comment. |

## Likes

| **HTTP Method** | **Endpoint** | **Description** |
|-----------------|--------------|-----------------|
| GET             | `/likes`     | Lists all likes. |
| POST            | `/likes`     | Likes a post. |
| GET             | `/likes?postId={postId}` | Lists likes for a specific post. |
| GET             | `/likes?user={userId}` | Lists likes made by a specific user. |
| GET             | `/likes/{likeId}` | Retrieves details of a specific like. |
| DELETE          | `/likes/{likeId}` | Removes a specific like. |


**Author**

> [`Mustafa Kaçar`](https://mustafakacar.com.tr)








# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
