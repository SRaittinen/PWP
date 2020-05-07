#!/bin/bash
export MYSQL_PWD=password

#Create testDB and tables
( cd ../../db && ./create_DB.sh testDB )

#Run tests
npm run test

#Remove test database
mysql -u root -e "DROP DATABASE testDB;"
echo "Database removed"
