// ==UserScript==
// @name Reddit Book Linker
// @author Efreak
// @namespace http://efreakbnc.net/booklinker
// @description Adds links to amazon, etc when putting book names in a link
// @version 1.0
// @updateURL http://raw.githubusercontent.com/Efreak/reddit-book-linker/master/booklinker.user.js
// @updateURL https://raw.githubusercontent.com/Efreak/reddit-book-linker/master/booklinker.user.js
// @downloadURL http://raw.githubusercontent.com/Efreak/reddit-book-linker/master/booklinker.user.js
// @include *://*.reddit.com/r/*
// @compatible Chrome, Greasemonkey
// ==/UserScript==


var apikey = ""; //YOU NEED TO CHANGE THIS! Get an API key from ISBNdb.com


/*
 *        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
 *                    Version 2, December 2004 
 *
 * Copyright (C) 2004 Sam Hocevar <sam@hocevar.net> 
 *
 * Everyone is permitted to copy and distribute verbatim or modified 
 * copies of this license document, and changing it is allowed as long 
 * as the name is changed. 
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */  
 
 var bookInfo = function(title,element){
	var info=[];
	var url='https://isbndb.com/api/v2/json/'+apikey+'/book/'+title.split(' ').join('_');
	var ymlquery="select * from json where url='"+url+"'";
	var ymlurl='https://query.yahooapis.com/v1/public/yql?q='+ymlquery+'&format=json&diagnostics=true&callback=?';
	$.getJSON(ymlurl).done(function(results){
		try{
			var data = results.query.results.json.data;
			info.push('<span class="bookinfo"><span class="title">'+data.title_latin+'</span> by <span class="author">'+data.author_data.name+'</span></span> '); //add title
			info.push('<a class="lthing" href="//librarything.com/isbn/'+(data.isbn10 ? data.isbn10 : data.isbn13)+'" title="LibraryThing"></a>'); //reviews, library, etc
			info.push('<a class="greads" href="//goodreads.com/search?q='+(data.isbn10 ? data.isbn10 : data.isbn13)+'" title="GoodReads"></a>'); //reviews
			info.push('<a class="amzn" href="//smile.amazon.com/'+data.book_id+'/dp/'+(data.isbn10 ? data.isbn10 : data.isbn13)+'" title="Amazon"></a>'); //add amazon link. No referrals, just smile :)
			info.push('<a class="gbks" href="//books.google.com/books?vid=ISBN'+(data.isbn10 ? data.isbn10 : data.isbn13)+'" title="Google Books"></a>'); //add google books link
			info.push('<a class="bfinder" href="//bookfinder.com/search/?keywords='+(data.isbn10 ? data.isbn10 : data.isbn13)+'&st=sh&ac=qr" title="BookFinder"></a>'); //add BookFinder url. Finds your book elsewhere (ebay, etc). Glorious referrals (on their links, not mine)
		} catch(err) {
			console.log(err);
			info.push('<span class="noresults" title=""ISBNdb has no results for '+title+'. Linking to generic searches instead">'+title+" search:</span> ")
			info.push('<a class="lthing" href="//librarything.com/search.php?search='+title+'" title="LibraryThing"></a>');
			info.push('<a class="greads" href="//goodreads.com/search?q='+title+'" title="GoodReads"></a>');
			info.push('<a class="amzn" href="//smile.amazon.com/s/?url=search-alias%3Dstripbooks&field-keywords='+data.book_id+'/dp/'+(data.isbn10 ? data.isbn10 : data.isbn13)+'" title="Amazon"></a>');
			info.push('<a class="gbks" href="//bookfinder.com/search/?keywords='+title+'&st=sh&ac=qr" title="BookFinder"></a>');
			info.push('<a class="bfinder" href="//google.com/search?tbm=bks&q='+title+'" title="Google Books"></a>');
		}
	}).fail(function(data){
		info.push('<span class="failure" title="Failed to contact ISBNdb. Linking to generic searches instead">'+title+" search:</span> ")
		info.push('<a class="lthing" href="//librarything.com/search.php?search='+title+'" title="LibraryThing"></a>');
		info.push('<a class="greads" href="//goodreads.com/search?q='+title+'" title="GoodReads"></a>');
		info.push('<a class="amzn" href="//smile.amazon.com/s/?url=search-alias%3Dstripbooks&field-keywords='+data.book_id+'/dp/'+(data.isbn10 ? data.isbn10 : data.isbn13)+'" title="Amazon"></a>');
		info.push('<a class="gbks" href="//bookfinder.com/search/?keywords='+title+'&st=sh&ac=qr" title="BookFinder"></a>');
		info.push('<a class="bfinder" href="//google.com/search?tbm=bks&q='+title+'" title="Google Books"></a>');
	}).always(function(data){
		var newEle = $("<span/>", {
			"class": "booklinks",
			html: info.join("")
		});
		element.replaceWith(newEle);
	});
};

var addbookcss = function() {
	$('<style type="text/css">')
	.html([".lthing {background:url(//cdn.appappeal.com/pictures/15355/logo.png)}",
	".greads {background:url(//s.gr-assets.com/assets/icons/goodreads_icon_50x50-6ca77ca9642d425797d8a93bffa59e1a.png)}",
	".gbks {background:url(//books.google.com/favicon.ico)}",
	".amzn {background:url(//amazon.com/favicon.ico)}",
	".bfinder {background:url(//bookfinder.com/favicon.ico)}",
	".lthing, .greads, .amzn, .gbks, .bfinder { margin-left:2px; margin-right:2px; width:1.5em;display:inline-block;height:1.5em;background-size:contain;background-repeat:none;padding-top:2px;padding-bottom:2px;}"].join('\n')).appendTo(document.head);
}
$(document).ready(function() {
	addbookcss();
	$('a[href="/b"]').each(function() {
		bookInfo($(this).attr('title'), $(this));
	});
});
