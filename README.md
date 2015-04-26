# Reddit Book Linker
Userscript for linking book titles & ISBNs to amazon etc on reddit

How to use

6. Install tampermonkey, greasemonkey, or etc.
5. Install the script
4. Go to a book-related sub and add an ISBNdb api key
  - set it to *none* if you don't plan on getting one, and you'll get search links instead of direct links)
  - You can get an API key by signing up at ISBNdb.com. You get 500 uses per day for free. That's 500 uses, not 500 successful or 500 unique.
49. When you click someone's flair, it tries to linkify it.
3. When you want to link to a book, do something like this: `[Book](/b "The Golden Compass") [Book](/b "0441940005")`

- If you have an API key, you get this:

  [![With API key](http://i.imgur.com/G5u5I46.png)]()

- If you don't have an API key (or it's wrong/fake), you get this:

  [![Without API key](http://i.imgur.com/7DEKRbv.png)]()

- If you don't like the capitalization problems, whine at ISBNdb, not at me. 
- ISBNdb API keys only get you 500 uses daily. I doubt you need that many, but that's how it is.
- If your browser has trouble contacting ISBNdb, it'll show up like a bad API key; hovering over the book title will tell you which happened.
- If the script runs on subs it shouldn't be running on or you'd like to add a sub: and you have a github account, update the validsubs array and submit a pull request; if not, [send me a message](//www.reddit.com/message/compose?to=efreak2004).

TODO

2. ~~Add amazon /a links for items that have ASIN but not ISBN~~ If you have the ASIN just prefix with `//amazon.com/dp/` or do a search for the title.
1. Convince reddit to stop using X-Frame-Options so I can redirect all visits through [nyanit](http://www.nyanit.com).
0. Boom! (???)
69. ~~Add a button to linkify when you make a selection.~~ Confusing. Lazy. If you wanna do it, feel free.
42. ~~Learn how to count properly?~~ 42 totally comes after 49.

License: This script is licensed under the MIT license.
