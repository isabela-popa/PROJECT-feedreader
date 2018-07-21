/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements.
 * This ensures they don't run until the DOM is ready.
 */
$(function () {
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function () {
        /* This is the first test - it tests to make sure that in app.js the
         * allFeeds variable has been defined and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        let feedURL; // Define a variable where to store the feed url
        it('have a URL defined and the URL is not empty', function () {
            allFeeds.forEach(feed => feedURL = feed.url);
            expect(feedURL).toBeDefined();
            expect(feedURL.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
        let feedName; // Define a variable where to store the feed name
        it('have a name defined and the name is not empty', function () {
            allFeeds.forEach(feed => feedName = feed.name);
            expect(feedName).toBeDefined();
            expect(feedName.length).not.toBe(0);
        });
    });


    /* "The menu" test suite */
    describe('The menu', function () {

        /* Test that ensures the menu element is hidden by default.
         * The hiding/showing of the menu element is performed by the
         * menu-hidden class of the body element. When the class is added,
         * the menu is hidden and whet it's removed, the menu is shown.
         */
        let HTMLbody; // Define a variable where to store the body element

        // Get the body element before executing each test within this test suite
        beforeEach(function () {
            HTMLbody = document.querySelector('body');
        });

        // Check if the body element has the class menu-hidden
        it('is hidden by default', function () {
            expect(HTMLbody.classList.contains('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes visibility when the menu icon
         * is clicked. This test has two expectations: does the menu display
         * when clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            // Get the element which holds the menu icon
            let menuIconLink = document.querySelector('.menu-icon-link');
            // Simulate a click on the menu icon
            menuIconLink.click();
            // Check if the menu is displayed
            expect(HTMLbody.classList.contains('menu-hidden')).toBeFalsy();
            // Simulate another click on the menu icon
            menuIconLink.click();
            // Check if the menu is hidden
            expect(HTMLbody.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    /* "Initial Entries" test suite */
    describe('Initial Entries', function () {

        /* Test that ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         * Because loadFeed() function is asynchronous, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // The special done() function is passed to the callback,
        // that signals to the framework when the asynchronous
        // function has completed, and the testing can continue.
        // Before each test execution, the second feed is loaded
        beforeEach((done) => {
            loadFeed(1, () => done());
        });

        // It is used done() again to signal to the framework that the test
        // below rely upon the asynchronous execution.
        // Done() is passed to the function within the test, then it is
        // called after the tests.
        it('ensure that there is at least a single .entry element within .feed container', function (done) {
            // Get the .feed container
            let feedContainer = document.querySelector('.feed');
            // Get the .entry elements from the .feed container
            let entryElem = feedContainer.getElementsByClassName('entry');
            // Check if there is at least one element in the container
            expect(entryElem.length).toBeGreaterThan(0);
            done();
        });

        // Reload default feed
        afterEach(() => loadFeed(0));
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function () {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * In this case also loadFeed() is asynchronous.
         */
        // Define a variable where the html of initial feeds will be stored
        let initialFeedContent;

        // Before each test execution, the second feed is loaded.
        // Stored the content of the initial feed in a variable.
        // Then, the third feed is loaded.
        // Likewise, done() function is passed to the callback, which waits
        // for the loadFeed() to complete.
        beforeEach((done) => {
            loadFeed(1, () => {
                let initialFeed = document.querySelector('.feed');
                initialFeedContent = initialFeed.innerHTML;
                loadFeed(2, () => {
                    done();
                });
            });
        });

        // As in the previous test suite, done() is used again in the function,
        // to signal to the framework when the tests are ready to be run.
        it('ensures that the content actually changes when a new feed is loaded', function (done) {
            // Stored the content of the current feed in a variable.
            let currentFeed = document.querySelector('.feed');
            let currentFeedContent = currentFeed.innerHTML;
            // Check if the initial feed is different from the current feed
            expect(initialFeedContent).not.toMatch(currentFeedContent);
            done();
        });

        // Reload default feed
        afterEach(() => loadFeed(0));
    });
}());
