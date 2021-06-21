def result = new URL("https://publish.twitter.com/oembed?url=https://twitter.com/Interior/status/" + params.tweetId).text;

return result