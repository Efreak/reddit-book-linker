# reddit-book-linker
Userscript for linking [book title](/b "some book name or isbn number") to amazon etc

How to use

6. Install tampermonkey, greasemonkey, or etc.
5. Install the script
4. Go to reddit and add an api key (can be fake if you don't care)
3. When you want to link to a book, do something like this: `[Book](/b "The Golden Compass") [Book](/b "0441940005")`

- If you have an API key, you get this:

  [![With API key](http://i.imgur.com/G5u5I46.png)]()

- If you don't have an API key (or it's wrong/fake), you get this:

  [![Without API key](http://i.imgur.com/7DEKRbv.png)]()

- If you don't like the capitalization problems, whine at ISBNdb, not at me. 
- ISBNdb API keys only get you 500 uses daily. I doubt you need that many, but that's how it is.
- If your browser has trouble contacting ISBNdb, it'll show up like a bad API key; hovering over the book title will tell you which happened.

TODO

2. Add amazon /a links for items that have ASIN but not ISBN. Amazon doesn't have a free API so far as I can tell, so this won't have titles.
1. Convince reddit to stop using X-Frame-Options so I can redirect all visits through [nyanit](http://www.nyanit.com).
0. Boom! (???)
69. Add a button to linkify when you make a selection.
69. Add /f links to bypass ISBNdb entirely and search for things that aren't books (like genres, authors, etc).
69. Learn how to count properly?

License: This script is licensed under the WTFPL.
