class twitterApi {
  constructor(twitter_bearer_token) {
    this.twitter_bearer_token = twitter_bearer_token;
  }

  async getTweet(id) {
    const url = `https://api.twitter.com/1.1/statuses/lookup.json?id=1,${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.twitter_bearer_token}`
      }
    });
    const data = await response.json();
    return data;
  }
}
export default twitterApi;