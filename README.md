# sumex

## Inspiration
All of us have had many experiences with dealing with webpages, articles, and terms of service agreements that are really difficult to parse and understand. Because of this, we've decided to create Sumex to make so we never have to read one of those monstrously long documents ever again and to take the time that we would have spent trying to understand them back for ourselves!

## What it does
-We've created a Chrome extension that allows you to add a page summary to the top of any webpage. You can click on the icon of the extension and hit the button that appears, or summarize just a part of the text by highlighting it and right clicking it and choosing the summarize button. 

-This is done using Natural Language Processing (NLP) libraries sumy and nltk to summarize text down from its original size to a maximum of log(number of sentences in original document) sentence long summary. 

-The whole backend is controlled by an Azure Cloud Function that takes in the webpage's contents whenever the extension is used and processes and returns the summary.

## How we built it
-Built as a Chrome/Edge add-on for Chromium

-Build with pure JS for front-end, Azure Cloud Function that runs Python code as a backend

## Challenges we ran into
-Having to use vanilla Javascript was really difficult for those of us used to frameworks like Node and React

-We dealt with a lot of issues with text still having HTML tags and not being UTF-8 encoded, leading to buggy summaries

-Choosing the best NLP models for text summarization from the ones that sumy and nltk offer

-Both of Alan’s computers are broken :((((((

## Accomplishments that we're proud of
-The NLP text summarization is working really well. It has a decent success rate and seems to work on the sites we tested it on

-App is fully functional and could be polished and deployed in a matter of days

-UI is clean, simple, and effective

## What we learned
-Just how much filler there is in a lot of articles! And how hideously long bills and terms of service can be

-How to make a Chromium web-browser add-on 

-How to use vanilla Javascript more effectively

-The power and utiltiy of Azure Cloud Functions

## What's next for Sumex
-Tweak and tune NLP even further for better results

-Port to Firefox

-Further user customization

-Better custom handling for popular sites

-Better filtering of erroneous body text
