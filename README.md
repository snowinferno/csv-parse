# CSV Parsing

## Use of this project

1. Have node.js >= 12.0 installed
2. Clone this project to your system
3. run `npm install` in the project directory
4. run `node .` in the root of the project directory
5. make a POST request to 127.0.0.1:3000/upload with two fields
  - **file**: the file to be uploaded
  - **provider_name**: the name of the provider for which to load column layout data for. Currently supported provider_name is "Toyota"
  
## When port 3000 is already in use by something else

The port is configurable by environment variable. If port 3000 is already used by something, simply set the **`PORT`** environment variable (this process will vary depending on if you use Mac, Linux or Windows). Then run `node .`.

## Design Decisions

- **express**: Express is widely used, well supported, and has a diverse community of plugins.
- **multer**: Multer is a widely used middleware for *Express* which handles processing multipart form data and exposes it on the request object in a convenient and easy to use way.
- **ava**: Ava is an easy to use and understand testing framework that is highly configurable.
- **nyc**: Nyc is the successor to the *istanbul* node module for coverage made by the same development team. Istanbul has been a widely used coverage tool in the industry for many years.
- **parse-csv**: As part of this challenge I must receive a CSV file and parse it. I take finding the right existing tools as a part of this challenge as it would take significant time just to create a properly functioning csv parsing engine unless you have extensive experience with csv parsing.
- **stream-transform**: This is a part of the *parse-csv* project family and made sense to leverage transform streams without creating it from scratch.
- **nodemon**: Nodemon is a daemon process that watches for changes to files within a project. When a change is detected, the web server is automatically restarted to make those changes easily available.

## Assumptions
1. Column layout configuration provides column names in the prescribed case
2. Each provider will have only a single column layout configuration.
3. Individuals at the provider will give the provider name with inconsistent case. We ignore case when looking up the column layout so that "Toyota", "TOYOTA", and "toyota" resolve to the same provider configuration.
