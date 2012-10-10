Wiky.js - a javascript library to convert Wiki Markup language to HTML.
=======================

(It is buggy, please use with care)

Wiky.js is a javascript library that converts Wiki Markup language to HTML.


How to use it
-------------------
Include wiki.js into your HTML file. Wiky.js has only one function, which is wiky.process(wikitext).

Please see index.html for an example.

*wiky.js does not depend on jQuery, which is included for testing purpose.



Supported Syntax
-------------------
* == Heading ==
* === Subheading ===
* [http://www.url.com Name of URLs]
* [[File:http://www.url.com/image.png Alternative Text]]
* -------------------- (Horizontal line)
* : (Indentation)
* # Ordered bullet point
* * Unordered bullet point



Contributors
-------------------

Tanin Na Nakorn

Tanun Niyomjit (Designer)

Dav Glass [davglass]

NPM
---

```
$ npm install wiky.js

$ npm install https://github.com/tanin47/wiky.js/tarball/master
```

```
var wiky = require('wiky.js');

var html = wiky.process('<string of wiki code>', {});

var html = wiky.process('<string of wiki code>', { 'link-image': false });
```


Options
-------

It only supports one option at the moment: `link-image`

Setting this to `false` will tell `wiky.js` to not imbed CSS into the markup for link icons.

License
---------

Do What The Fuck You Want To Public License (http://sam.zoy.org/wtfpl/)

0. You just DO WHAT THE FUCK YOU WANT TO.

