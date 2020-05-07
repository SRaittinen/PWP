* Student 1. Väinö Juntura, vaino.juntura@student.oulu.fi
* Student 2. Topi Kurtelius, topi.kurtelius@student.oulu.fi
* Student 3. Santeri Raittinen, santeri.raittinen@student.oulu.fi


# PWP SPRING 2020
# RaceTime™ Tracker

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
linux (for example Ubuntu)
mysql
nodeJS
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install nodeJS following this quide.

```
https://hostadvice.com/how-to/how-to-install-node-js-on-ubuntu-18-04/
```

Then install and setup mysql server. Create user "root" and set password "password".


```
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04
```

Then it's time to set up this project. First, clone the repository

```
git clone https://github.com/SRaittinen/PWP
cd PWP
```

Then run the following script to set up the project

```
chmod +x setup_project.sh
./setup_project.sh
```

Server should now be ready. Try to run it.

```
cd src
npm run dev
```


## Running the tests

The integration tests of the system can be ran with the script found in src/tests folder.

```
cd src/tests
run_tests.sh
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
