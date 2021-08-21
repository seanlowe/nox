import json
import newspaper
from newspaper import Article
from time import mktime
from datetime import datetime

# Set the limit for number of articles to download
LIMIT = 2

data = {}
data['newspapers'] = {}

# Loads the JSON files with news sites
with open('NewsPapers.json') as data_file:
    companies = json.load(data_file)

# Iterate through each news company
for company, value in companies.items():
    count = 1
    if 'rss' in value:
        # d = fp.parse(value['rss']) # for old feedparser command
        d = newspaper.parsers.Parser.textToPara(value['rss'])
        print("Downloading articles from", company)
        newsPaper = {
            "rss": value['rss'],
            "link": value['link'],
            "articles": []
        }
        for entry in d.entries:
            if hasattr(entry, 'published'):
                if count > LIMIT:
                    break
                article = {}
                article['link'] = entry.link
                date = entry.published_parsed
                article['published'] = datetime.fromtimestamp(mktime(date)).isoformat()
                try:
                    content = Article(entry.link)
                    content.download()
                    content.parse()
                except Exception as e:
                    print(e)
                    print("continuing...")
                    continue
                article['title'] = content.title
                article['text'] = content.text
                newsPaper['articles'].append(article)
                print(count, "articles downloaded from", company, ", url: ", entry.link)
                count = count + 1
    else:
        # This is the fallback method if a RSS-feed link is not provided.
        # It uses the python newspaper library to extract articles
        print("Building site for", company)
        paper = newspaper.build(value['link'], memoize_articles=False)
        newsPaper = {
            "link": value['link'],
            "articles": []
        }
        missingDateCount = 0
        for content in paper.articles:
            if count > LIMIT:
                break
            try:
                content.download()
                content.parse()
            except Exception as e:
                print(e)
                print("continuing...")
                continue
            if "weather" in content.url: # skip weather related news
               continue 
            # Again, for consistency, if there is no found publish date the article will be skipped.
            # After 10 downloaded articles from the same newspaper without a publish date, the company will be skipped.
            if content.publish_date is None:
                missingDateCount = missingDateCount + 1
                art_ver = "articles are" if missingDateCount>1 else "article is"
                print(missingDateCount, art_ver + " missing a Publish Date...", end="\r")
                if missingDateCount >= 5:
                    print("Too many articles don't have Publish Dates, skipping " + company)
                    missingDateCount = 0
                    break
                # count = count + 1
                continue
            article = {}
            article['title'] = content.title
            article['text'] = content.text
            article['link'] = content.url
            article['published'] = content.publish_date.isoformat()
            newsPaper['articles'].append(article)
            print(count, "articles downloaded from", company, "using newspaper, url:", content.url)
            count = count + 1
            missingDateCount = 0