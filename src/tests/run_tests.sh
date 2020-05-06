#!/bin/bash

#Create testDB and tables
( cd ../db && ./create_DB.sh testDB )

#Replace dbconfig file for testDB
mv ../config/dbConfig.js .
cp testDbConfig.js ../config/dbConfig.js

#Run tests
npm run test

#Replace dbconfig file back to original
mv dbConfig.js ../config

#Remove test database
mysql -u root -ppassword -e "DROP DATABASE testDB;"
