# Project Feed Reader Testing

Project Feed Reader Testing consists of writing a number of tests using [Jasmine](http://jasmine.github.io/) against a pre-existing web-based application that reads RSS feeds, given by Udacity. It is one of the eight projects required to be completed in the Front-end Web Developer Nanodegree.

# Steps to run the application.

* In order to run the application, you can click on the following link: https://isabela-popa.github.io/PROJECT-feedreader/ or save it to you computer, using the Clone or download button found in the upper right side of the project's page, and load the index.html file into your browser.
* As soon as you open the page, the feeds will be automatically loaded. There are four different feeds from which you can choose one at a time, by clicking on the menu icon situated in the upper left corner of the screen: Udacity Blog, CSS Tricks, HTML5 Rocks and Linear Digressions.
* Also, the tests will start automatically to run and after they are completed, you can see the results of the 7 specs listed on the bottom of the page. Green means that the tests passed and red indicates broken tests.

# Tests written

There are 7 tests grouped in 4 test suites in the Jasmine spec file feedreader.js, which are testing the following functionalities:

1. RSS Feeds:
    * are defined (provided test by Udacity)
    * have a URL defined and the URL is not empty
    * have a name defined and the name is not empty
2. The menu:
    * is hidden by default
    * changes visibility when the menu icon is clicked
3. Initial Entries:
    * ensure that there is at least a single .entry element within .feed container
4. New Feed Selection:
    * ensures that the content actually changes when a new feed is loaded
