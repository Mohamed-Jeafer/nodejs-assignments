# nodejs-assignments

## To get started, npm install and npm start each assignment

## Assignment 1

>> Localhost server should return json object of server name and priority.
>> The server lists is available in data folder
>> To start the server run NPM start
>> To run test type NPM test


## Assignment 2

>> There is no need to set up the database because online cluster is being used instead
>> To start the server run NPM start
>> To run test type NPM test


## Assignments 3
>> App works on localhost. For that you need npm start to view the server

## Assignment 4
>>  Use postman to access the endpoints.
>> To start the server run NPM start
>>  The following are the available endpoints

>> localhost:3000/view

>> localhost:3000/view/:id
>> id is the id number of the user

>> localhost:3000/add
>> JSON body key value of the new users. 
Example: {
"id": "5",
"name": "MyName MyLastName",
"age": "34",
"gender": "Male",
"email": "usero4ne@gmail.com"
}

>> localhost:3000/edit/:id
>> JSON body key value of the property to be change. e.g {"name":"myName"}
