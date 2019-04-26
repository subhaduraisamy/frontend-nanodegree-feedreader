/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    "use strict";

    // Test suite for RSS feed variable
    describe('RSS Feeds', function() {
        
        // Check if allFeeds variable is defined and not empty
        it('valid', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Check if feed's url property is defined and not empty
        it('has url', function() {
            for(let feed of allFeeds) {
           
                expect(feed.url).not.toBe(undefined);
                expect(feed.url).not.toBe('');
            }
        });

        // Check if feed's name property is defined and not empty
        it('has name', function() {
            for(let feed of allFeeds) {
                expect(feed.name).not.toBe(undefined);
                expect(feed.name).not.toBe('');
            }
        });

    });

    // Test suite for the apps menu functionality
    describe('The Menu', function() {

        // Check that default state of menu is hidden on page load
        it('hidden by default', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        // Check that menu toggles on/off from multiple clicks
        it('toggles on/off', function() {
            const menu = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');
            
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
            
        });
    });

    // Test suite for initial load of feed 
    describe('Initial Entries', function() {

       // Load feed and wait until work is done
        beforeEach(function(done) {
            loadFeed(1, done);
        });

        // Check that completed work contains content
        it('has entires in feed container', function() {
            let feedcontainer = document.querySelector('div.feed');
            let entries = document.querySelectorAll('article.entry');
            expect(entries.length > 0).toBeGreaterThan(0);
        });
    });

   /* Test suite to check loading of new feeds */
   describe('New Feed Selection', function () {

    // Variables that will hold old and new feed entries
    let oldFeed;
    let newFeed;

    beforeEach(function (done) {
        
        loadFeed(3, function () {
            oldFeed=document.querySelector('div.feed').innerHTML;
            loadFeed(2, function () {
            oldFeed = document.querySelector('div.feed').innerHTML;
            done();
            });
        });
    });

    it('Loads new feeds',function(){
        expect(oldFeed).not.toBe(newFeed);
    });
});
    
}());