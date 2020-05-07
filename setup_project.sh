#!/bin/bash

#Create db and tables
( cd db && ./create_DB.sh RaceTime )

#Init client
( cd client && npm install )

#Init server
( cd src && npm install )
