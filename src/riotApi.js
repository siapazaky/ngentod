class riotApi {

  constructor(riot_token) {
    this.riot_token =  riot_token;
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
      case "na":
        region = "na1";
        break;
      case "br":
        region = "br1";
        break;
      case "kr":
        region = "kr";
        break;
      case "jp":
        region = "jp";
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
    let regional_routing;
    if (region == "na" ||  region == "br" || region == "lan" || region == "las") {
      regional_routing = "americas";
    } else if (region == "euw" || region == "eune" || region == "tr" || region == "ru") {
      regional_routing = "europe";
    } else if (region == "kr" || region == "jp") {
        region = "asia";
    } else if (region == "oce" || region == "ph" || region == "vn" || region == "sg" || region == "th" || region == "tw") {
        regional_routing = "sea";
    } else {
      regional_routing = false;
    }
    return regional_routing;
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

  async GetMatches(puuid, regional_routing, count) {
    const data = await fetch(`https://${regional_routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${this.riot_token}`);
    const response = await data.json();
    return response;
  }

  async getMatchFromId(matchId, regional_routing) {
    const data = await fetch(`https://${regional_routing}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.riot_token}`);
    const response = await data.json();
    return response
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
    }
    return queue;
  }

}
export default riotApi;