# ECOMMERCE BACKEND

##Description

Small scale backend server for e-commerce using express and sequelize to provide the backend interaction for API requests. The database contains tables for categories, products, tags, and a product_tag. The product_tag table is used to associate products and tags with each other since both models can contain multiples of each other. Sequelize made interacting with the database significantly trivial compared to implementing several strict queries using the mysql2 package.

##User Story

AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
Acceptance Criteria

GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database


## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To install git clone my repository to your local environment. Once cloned start new terminal in project folder and run 'npm install'. This will install all node dependecies that the project depends on to function properly. Once finished head over to insomnia to use the restful api to get, create, update, delete data from the database.

## Usage

use this project as started code for your ecommerse website!

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## License

MIT license
---
