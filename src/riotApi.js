class riotApi {

  constructor(riot_token) {
    this.riot_token = riot_token;
  }

  async RegionNameRouting (region) {
    region = region.toLowerCase();
    switch (region) {
    case "lan":
      region = "la1";
      break;
    case "las":
      region = "la2";
      break;
    case "na":
      region = "na1";
      break;
    case "euw":
      region = "euw1";
      break;
    case "eune":
      region = "eun1";
      break;
    case "br":
      region = "br1";
      break;
    case "kr":
      region = "kr";
      break;
    case "jp":
      region = "jp1";
      break;
    case "oce":
      region = "oc1";
      break;
    case "tr":
      region = "tr1";
      break;
    case "ru":
      region = "ru";
      break;
    case "ph":
      region = "ph2";
      break;
    case "th":
      region = "th2";
      break;
    case "tw":
      region = "tw2";
      break;
    case "vn":
      region = "vn2";
      break;
    default:
      region = false;
      break;
    }
    return region;
  }

  RegionalRouting(region) {
    if (region == "na" || region == "br" || region == "lan" || region == "las") {
      return "americas";
    } else if (region == "euw" || region == "eune" || region == "tr" || region == "ru") {
      return "europe";
    } else if (region == "kr" || region == "jp") {
      return "asia";
    } else if (region == "oce" || region == "ph" || region == "vn" || region == "sg" || region == "th" || region == "tw") {
      return "sea";
    }
    return false;
  }

  async SummonerDataByName(summoner_name, region) {
    const data = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${this.riot_token}`);
    const response = await data.json();
    return response;

  }

  async LiveGameData(summoner_id, region) {
    const data = await fetch(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner_id}?api_key=${this.riot_token}`);
    const response = await data.json();
    return response;
  }

  async RankedData(summoner_id, region) {
    const data = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=${this.riot_token}`);
    const response = await data.json();
    return response;
  }

  async getMatches(puuid, regional_routing, count, queueId) {
    const data = await fetch(`https://${regional_routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${this.riot_token}&queue=${queueId ? queueId : ""}`);
    const response = await data.json();
    return response;
  }

  async getMatchFromId(matchId, regional_routing) {
    const data = await fetch(`https://${regional_routing}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.riot_token}`);
    const response = await data.json();
    return response;
  }

  async getChellengesData(puuid, regional_routing) {
    const data = await fetch(`https://${regional_routing}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${this.riot_token}`);
    const response = await data.json();
    return response;
  }

  tierCase (option) {
    let tier = {};
    switch (option) {
    case "IRON":
      tier.short = "I";
      tier.full = "Hierro";
      break;
    case "BRONZE":
      tier.short = "B";
      tier.full = "Bronce";
      break;
    case "SILVER":
      tier.short = "S";
      tier.full = "Plata";
      break;
    case "GOLD":
      tier.short = "G";
      tier.full = "Oro";
      break;
    case "PLATINUM":
      tier.short = "P";
      tier.full = "Platino";
      break;
    case "EMERALD":
      tier.short = "E";
      tier.full = "Esmeralda";
      break;
    case "DIAMOND":
      tier.short = "D";
      tier.full = "Diamante";
      break;
    case "MASTER":
      tier.short = "M";
      tier.full = "Maestro";
      break;
    case "GRANDMASTER":
      tier.short = "GM";
      tier.full = "Gran Maestro";
      break;
    case "CHALLENGER":
      tier.short = "CH";
      tier.full = "Retador";
      break;
    default:
      tier.short = "Unranked";
      tier.full = "Unranked";
      break;
    }
    return tier;
  }

  rankCase (option) {
    let rank;
    switch (option) {
    case "I":
      rank = "1";
      break;
    case "II":
      rank = "2";
      break;
    case "III":
      rank = "3";
      break;
    case "IV":
      rank = "4";
      break;
    default:
      rank = "";
      break;
    }
    return rank;
  }

  divisionCase (tier, rank) {
    let division;
    if (tier == "M" || tier == "GM" || tier == "CH" || tier == "UN") {
      division = tier;
    } else {
      division = tier + rank;
    }
    return division;
  }

  queueCase (option) {
    let queue = {};
    switch (option) {
    case 0:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "CUSTOM";
      queue.full_name = "Custom";
      break;
    case 420:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "SOLO/DUO-R";
      queue.full_name = "SoloQ";
      break;
    case 440:
      queue.profile_rank_type = "RANKED_FLEX_SR";
      queue.queue_name = "FLEX-R";
      queue.full_name = "Flex";
      break;
    case 450:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "ARAM";
      queue.full_name = "ARAM";
      break;
    case 400:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "NORMAL";
      queue.full_name = "Normal";
      break;
    case 430:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "NORMAL";
      queue.full_name = "Normal";
      break;
    case 700:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "CLASH";
      queue.full_name = "Clash";
      break;
    case 720:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue_name = "ARAM CLASH";
      queue.full_name = "ARAM Clash";
      break;
    case 900:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue = "ARURF";
      queue.full_name = "ARURF";
      break;
    case 1700:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue = "ARENA";
      queue.full_name = "Arena";
      break;
    default:
      queue.profile_rank_type = "RANKED_SOLO_5x5";
      queue.queue = "";
      queue.full_name = "";
      break;

    }
    return queue;
  }

  championRole (id, merakiRates) {
    const rates = merakiRates.data[id];
    const propertyName = Object.keys(rates).reduce((maxProperty, currentProperty) => {
      return rates[currentProperty].playRate > rates[maxProperty].playRate ? currentProperty : maxProperty;
    }, Object.keys(rates)[0]);
    return propertyName;
  }
}
export default riotApi;

export const eloValues = {
  "IRON IV": 1,
  "IRON III": 2,
  "IRON II": 3,
  "IRON I": 4,
  "BRONZE IV": 5,
  "BRONZE III": 6,
  "BRONZE II": 7,
  "BRONZE I": 8,
  "SILVER IV": 9,
  "SILVER III": 10,
  "SILVER II": 11,
  "SILVER I": 12,
  "GOLD IV": 13,
  "GOLD III": 14,
  "GOLD II": 15,
  "GOLD I": 16,
  "PLATINUM IV": 17,
  "PLATINUM III": 18,
  "PLATINUM II": 19,
  "PLATINUM I": 20,
  "EMERALD IV": 21,
  "EMERALD III": 22,
  "EMERALD II": 23,
  "EMERALD I": 24,
  "DIAMOND IV": 25,
  "DIAMOND III": 26,
  "DIAMOND II": 27,
  "DIAMOND I": 28,
  "MASTER I": 29,
  "GRANDMASTER I": 30,
  "CHALLENGER I": 31
};