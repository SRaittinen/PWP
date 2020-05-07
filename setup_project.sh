#!/bin/bash

#TODO Voi joutua chmodettaan, samalla vois myös chmodettaa kaikki skriptit, testi yms
#Create db and tables
( cd db && ./create_DB.sh RaceTime )

#Init client
( cd client && npm install )

#Init server
( cd src && npm install )

#Make test file executable
chmod +x src/tests/run_tests.sh
