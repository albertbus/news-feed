const { parse } = require('rss-to-json');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// async await
(async () => {
    for (const feed of config.rssFeeds) {

        var rss = await parse(feed.url);

        const rssJson = JSON.stringify(rss, null, 3);

        const outputPath = path.join(__dirname, `${feed.name.replace(/\s+/g, '_')}_rss_feed.json`);
    
        fs.writeFileSync(outputPath, rssJson, 'utf8');
        console.log(`RSS feed data saved to ${outputPath}`);
    
    // console.log(JSON.stringify(rss, null, 3));
    }
})();