class twitchApi {

  constructor(client_id, client_secret) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.grant_type = "client_credentials";
  }

  async getAccessToken() {
    const oauth_url = "https://id.twitch.tv/oauth2/token";
    const response = await fetch(oauth_url, {
      body: JSON.stringify(this),
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const { access_token } = await response.json();
    return access_token;
  }

  async getUsername (user_id) {
    try {
      const accessToken = await this.getAccessToken();
      const api = `https://api.twitch.tv/helix/users?id=${user_id}`;
      const headers = {
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + accessToken
      };

      if(!accessToken) {
        console.log("No Token");
        return null;
      } else {
        const response = await fetch(api, {method: "GET", headers: headers});
        const body = await response.json();
        return body.data[0].display_name;
      };
    } catch (e) {
      return false;
    }
  }

  async getId (user_name) {
    try {
      const accessToken = await this.getAccessToken();
      const api = `https://api.twitch.tv/helix/users?login=${user_name.toLowerCase()}`;
      const headers = {
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + accessToken
      };

      if(!accessToken) {
        console.log("No Token");
        return null;
      } else {
        const response = await fetch(api, {method: "GET", headers: headers});
        const body = await response.json();
        return body.data[0].id;
      };
    } catch (error) {
      return false;
    }
  }

  async getFollowers (channel_id) {
    const accessToken = await this.getAccessToken();
    const api = `https://api.twitch.tv/helix/users/follows?to_id=${channel.toLowerCase()}`;
    const headers = {
      "Client-ID": this.client_id,
      "Authorization": "Bearer " + accessToken
    };

    if(!accessToken) {
      console.log("No Token");
      return null;
    } else {
      const response = await fetch(api, {method: "GET", headers: headers});
      const body = await response.json();
      console.log(body.data[0].from_name);
      return body.data;
    };
  }

  async getBroadcasterInfo(channel_id) {
    const accessToken = await this.getAccessToken();
    const api = `https://api.twitch.tv/helix/channels?broadcaster_id=${channel_id}`;
    const headers = {
      "Client-ID": this.client_id,
      "Authorization": "Bearer " + accessToken
    };

    if(!accessToken) {
      console.log("No Token");
      return null;
    } else {
      const response = await fetch(api, {method: "GET", headers: headers});
      const body = await response.json();
      console.log(body.data[0]);
      return body.data[0];
    };
  }
  // user oauth call back for getting user access token, require oauth query code, require redirect uri
  async OauthCallback(query_code, redirect_uri) {
    const oauth_url = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.client_secret}&code=${query_code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`;
    const response = await fetch(oauth_url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    return response;
  }

  // token validation
  async Validate(user_access_token) {
    const validate = "https://id.twitch.tv/oauth2/validate";
    const validation = await fetch(validate, {
      method: "GET",
      headers: {
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token
      }
    });
    return validation;
  }

  // refresh user access token
  async RefreshToken (refresh_token) {
    const oauth_url = "https://id.twitch.tv/oauth2/token";
    const response = await fetch(oauth_url, {
      body: `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${this.client_id}&client_secret=${this.client_secret}`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const { access_token } = await response.json();
    console.log(access_token);
    return access_token;
  }

  // Get Bits Leaderboard, require user access token
  async getBitsLeaderBoard (user_access_token) {
    const api = "https://api.twitch.tv/helix/bits/leaderboard?count=20&period=all";
    const top_users = await fetch(api, {
      method: "GET",
      headers: {
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token
      }});
    const { data } = await top_users.json();
    return data;

  }

  // Set Stream Tags, require user access token, tags must be an array
  async SetTags (user_access_token, channelID, tags) {
    console.log(tags);
    const api = `https://api.twitch.tv/helix/channels?broadcaster_id=${channelID}`;
    const set_tags = await fetch(api, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tags: tags })
    });
    return set_tags;
  }

  // Set Stream Moderator, require user access token
  async AddMod (user_access_token, channel_id, user_id) {
    const api = `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${channel_id}&user_id=${user_id}`;
    const add_mod = await fetch(api, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token,
        "Content-Type": "application/json"
      }
    });
    return add_mod;
  }

  // Remove Stream Moderator, require user access token
  async UnMod (user_access_token, channel_id, user_id) {
    const api = `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${channel_id}&user_id=${user_id}`;
    const unmod = await fetch(api, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token,
        "Content-Type": "application/json"
      }
    });
    return unmod;
  }

  // Get chatters as mod or broadcaster, require user access token
  async getChatters (user_access_token, channel_id, mod_id) {
    const api = `https://api.twitch.tv/helix/chat/chatters?broadcaster_id=${channel_id}&moderator_id=${mod_id}`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token
      }});
    const { data } = await response.json();
    return data;

  }

  // Post shoutout, require user access token
  async ShoutOut (user_access_token, channel_id, to_channel_id) {
    const api = `https://api.twitch.tv/helix/chat/shoutouts?from_broadcaster_id=${channel_id}&to_broadcaster_id=${to_channel_id}&moderator_id=${channel_id}`;
    const shoutout = await fetch(api, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token,
        "Content-Type": "application/json"
      }
    });
    if (shoutout.status === 204) {
      return null;
    }
    return await shoutout.json();
  }

  // Get if someone follow a broadcaster (requires boradcaster oauth)
  async getFollower (user_access_token, channel_id, user_id) {
    const api = `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${channel_id}&user_id=${user_id}`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Client-ID": this.client_id,
        "Authorization": "Bearer " + user_access_token
      }});
    const { data } = await response.json();
    return data;

  }
}

export default twitchApi;