try {
    var Spooky = require('spooky');
}
catch (e) {
    var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
    child: {
        // transport: 'http',
        'ignore-ssl-errors': 'yes'
    },
    casper: {
        logLevel: 'debug',
        verbose: true,
        pageSettings: {
            loadImages: true, // The WebPage instance used by Casper will
            loadPlugins: false, // use these settings
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
        },
        viewportSize: {
            width: 1600,
            height: 950
        }
    }
}, function(err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }


    var url = 'https://university.mongodb.com/';

    spooky.start(url, function() {
        // search for 'casperjs' from google form
        console.log("page loaded");
        this.click('a#login-button');
        // this.test.assertExists('form#login_form', 'form is found');
        this.fill('form#login_form', {
            'email': '',
            'password': ''
        }, false);
        // this.click('form#login_form input[type="submit"]');
        this.capture('mongouniverity1.png', undefined, {
            format: 'jpg',
            quality: 75
        });
    });
    spooky.thenClick('form#login_form input[type="submit"]', function() {
        this.waitForSelector('.nav-username', function() {
            this.emit('hello', "I've waited for a second.");
        });
    });
    spooky.then(function() {
        this.capture('mongouniverity2.png', undefined, {
            format: 'jpg',
            quality: 75
        });
    });

    spooky.thenOpen('https://university.mongodb.com/dashboard');

    spooky.then(
        function() {
            this.capture('mongouniverity3.png', undefined, {
                format: 'jpg',
                quality: 75
            })
        }
    )
    spooky.thenOpen('https://university.mongodb.com/logout');
    spooky.then(
        function() {
            this.capture('mongouniverity4.png', undefined, {
                format: 'jpg',
                quality: 75
            })
        }
    );


    spooky.run();

});

spooky.on('error', function(e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
    console.log(line);
});
*/

spooky.on('hello', function(greeting) {
    console.log(greeting);
});

spooky.on('log', function(log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});