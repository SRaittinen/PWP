#!/bin/bash

export MYSQL_PWD=password

DBNAME=$1

mysql -u root -e "CREATE DATABASE IF NOT EXISTS $DBNAME;"
echo "Database created"

cat createTables.sql | mysql -u root $DBNAME
echo "Tables created"
