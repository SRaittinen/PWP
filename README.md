* Student 1. Väinö Juntura, vaino.juntura@student.oulu.fi
* Student 2. Topi Kurtelius, topi.kurtelius@student.oulu.fi
* Student 3. Santeri Raittinen, santeri.raittinen@student.oulu.fi


# PWP SPRING 2020
# RaceTime™ Tracker

RaceTime tracker REST API. Course work for Programmable Web Project, spring 2020, Oulu, Finland.
Further description can be found in the project wiki.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
linux (for example Ubuntu)
mysql
nodeJS
```


### Installing

A step by step instructions for installing required dependencies, tools and software. Instructions written and tested to work on Ubuntu 18.04.

Install nodeJS and npm with following these steps
```
sudo apt update
sudo apt install nodejs
sudp apt install npm
```

Then install and setup mysql server. Create user "root" and set password "password".
```
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
(Yes to all prompts)
```

Perform following steps to setup mysql
```
sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

Now you can login with the password
```
mysql -u root -p
mysql> exit
```

Then it's time to set up this project. First, clone the repository
```
git clone https://github.com/SRaittinen/PWP
cd PWP
```

Then run the following script to set up the project. This will create the database.
```
./setup_project.sh
```

Server should now be ready. Try to run it.
```
cd src
npm run dev
```


## Running the tests

The integration tests of the system can be ran with the script mentioned below
The script performs testing for database and the API itself

```
./run_tests.sh
```

## Deployment

To start the API run the following startup script
```
cd src
npm run dev
```
The server is now running and can be reached with HTTP request.

The API can be used with the provided client application.
The client can be used with the following command
```
cd client
./client -help
```
The client will provide help on how to run available commands.
The commands can then be used to communicate with the API.
