# Middlewares

Middleware functions are functions that have access to the request object (req) and response object (res) and the next middleware function in the applications's request response cycle. The next middleware function is commonly denoted by variable named next. 

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and response objects.
- End the request response cycle.
- Call the next middleware function in the stack.

Normal Middleware

        function helper(req,res,next){ 
            console.log(req.method,req.url);
            next();
        }

Error handling Middleware

        function helper(err,req,res,next){
            console.error(err);
            res.status(500).json({error: 'Something broke'});
        }

## Types of middleware

### Application-level 
- Attached to app and run for all matching requests.

        app.use(helper); // runs for every request


### Router-level 
- Attached to an express.Router() and run for routes on that router.

        const router=express.Router();
        router.use(helper); // runs only for router routes


### Route-level 
- Passed directly to a route and runs only for that route.

        app.get('/private', auth, (req,res)=>res.send('ok'));


### Built-in 
### Third-party 
### Error-handling 

## Common real-world middleware uses

- Logging (morgan)
- Body parsing 

        express.json()
        express.urlencoded()

- Cookie parsing (cookie-parser)

- CORS (cors)

- Security headers (helmet)

- Rate limiting (express-rate-limit)

- Compression (compression)

- File upload parsing (multer,busboy)

- Authentication (JWT,session guards)

- Validation (Joi,express-validator)
