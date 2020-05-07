#!/bin/bash

export MYSQL_PWD=password

DBNAME=$1

#Remove test database
mysql -u root -e "DROP DATABASE $DBNAME;"
echo "Database removed"
