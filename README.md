#Switchboard Native

Just playing around with react-native constructing a Switchboard application.


#Make it work
You will need xcode installed.

run an `npm install`

YOU MAY RUN INTO ISSUES WITH CHEERIO!

What is cheerio? It parses HTML and allows you to use jQuery like selectors to grab data.
This allows us to parse switchboard for data.

Go into `node_modules/cheerio/index.js` and remove `exports.version = require('./package').version;`

As of react-native .60 it was supposed to support JSON files however tha doesn't appear to be the case.

#Now it works?
If it doesn't work and you really want to contribute let me know and I can help you troubleshoot.
Drop me a line on twitter @browniefed


#TODO

* Prettiness
* Get if post is offer/ask , may need to ditch RSS and parse page
* Convert to Redux for post storage and such
* Search/filtering
* Login
* Commenting
* Post ask/offer
* Anything else