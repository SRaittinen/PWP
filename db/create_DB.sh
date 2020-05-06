#!/bin/bash

DBNAME=$1

mysql -u root -ppassword -e "CREATE DATABASE IF NOT EXISTS $DBNAME;"
echo "Database created"

cat createTables.sql | mysql -u root -ppassword $DBNAME
echo "Tables created"
