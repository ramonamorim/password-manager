# Password Manager

### Frontend
I chose to use React to develop the front-end of the application, leveraging its ability to create interactive and responsive user interfaces. Material-UI complemented React by providing a wide range of ready-to-use components that followed the design guidelines of Material Design, making the application's interface attractive and intuitive for users.
By implementing operations for listing, creating, updating, and deleting records, I built a data management system. This allowed users to efficiently and user-friendlyly view, add, edit, and remove information. By combining the power of React with the styling and components provided by Material-UI, we created a robust and effective user experience for the application

- Run `npm install` to install all the dependencies necessary for the project.
- To start the project, simply navigate to the root folder 'my-app' and then run the `npm start` command, which will launch the server and make the application accessible in your 

### Backend

I created the backend using Golang and decided to separate the responsibilities of the project into packages as follows:

- **controller**: In this package, you can find the methods that directly handle the endpoints of the API.

- **model**: The model is declared here using a struct that represents the database, with each field. Additionally, there's a method to sanitize the data by removing any spaces from fields to ensure no white spaces in URL usernames or names.

- **repository**: This package handles all the data persistence for the model. I implemented sorting in the `GetAllCards` method since we don't have a database to return data by ID. Implementing sorting ensures consistent card display order on the frontend.

- **responses**: Here, I've created a standardized format for API responses to maintain consistency across requests.

- **router**: I've implemented the Gorilla Mux router to define API routes, ensuring that each route has a URI, an associated HTTP method, and maps to the appropriate function. Additionally, I've incorporated Gorilla Handlers to configure CORS (Cross-Origin Resource Sharing), managing cross-origin requests to ensure secure communication between the frontend and the backend. This is crucial for allowing web applications from different domains to access server resources in a controlled and secure manner.

- **validations**: This package is responsible for validating required fields defined in the model.

- To start the backend project, simply navigate to the root folder 'api' and then run the command `go run main.go`.

- I am also sharing a Postman project to facilitate testing the API requests. This Postman collection includes pre-configured requests and examples, making it easier to interact with the API and verify its functionality.


#### Versions 

- **github.com/go-playground/validator/v10 v10.15.3**: This package is used for data validation in Go applications and helps ensure that data adheres to specific rules and constraints, which is crucial for maintaining data integrity and security in applications.

- **github.com/gorilla/handlers v1.5.1**: The "handlers" package provides utility functions and middleware for HTTP request and response handling in Go applications. It includes features like CORS (Cross-Origin Resource Sharing) configuration, authentication, and more, making it useful for managing various aspects of HTTP communication within a Go web application.

- **github.com/gorilla/mux v1.8.0**: The "mux" package is a popular Go router and URL matcher that simplifies routing HTTP requests in a web application. It allows you to define routes with specific URI patterns and associated handlers, making it easier to manage the flow of incoming requests in a web server built with Go.

- **Golang 1.20**: Golang Version

- **Node version v18.16.0**



