import { Router } from "itty-router";
import { generateUniqueId, getDateAgoFromTimeStamp, getRandom, obtenerIDDesdeURL, getTimeUnitsFromISODate } from "./funciones";
import twitchApi from "./twitchApi";
import cloudflareApi from "./cloudflareApi";
import JsResponse from "./response";
import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import spotifyApi from "./spotifyApi";
import riotApi, { eloValues } from "./riotApi";
import imgurApi from "./imgurApi";
import jp from "jsonpath";
import * as cheerio from "cheerio";
// import twitterApi from "./twitterApi";

const router = Router();
// educar
router.get("/educar/:user/:channel/:touser", async (req, env) => {
  const percent = getRandom(100);
  const { user, touser, channel } = req.params;
  let mensaje = null;
  const response_user = await fetch(`https://decapi.me/twitch/id/${user}`);
  const id_user = await response_user.json();
  const response_touser = await fetch(`https://decapi.me/twitch/id/${touser}`);
  const id_touser = await response_touser.json();
  if (percent < 33) {
    const response_channel = await fetch(`https://decapi.me/twitch/id/${channel}`);
    const id_channel = await response_channel.json();
    const key = id_touser + "-" + id_channel;
    let counter = Number(await env.EDUCAR.get(key));
    if (id_user == id_touser) {
      mensaje = "No puedes educarte a ti mismo, menciona a alguien más. angarW";
    } else {
      counter = counter ? counter + 1 : 1;
      await env.EDUCAR.put(key, counter, {metadata: {value: counter},});
      const veces = counter === 1 ? "vez" : "veces";
      mensaje = `ha educado a ${touser}. ${touser} ha sido educado ${counter} ${veces} en total. angarEz`;
    }
  } else {
    if (id_user == id_touser) {
      mensaje = "No puedes educarte a ti mismo, menciona a alguien más. angarW";
    } else {
      mensaje = `no has podido educar a ${touser}. Quizás la proxima vez tengas mejor suerte. BloodTrail`;
    }
  }

  return new JsResponse(`${mensaje}`);
});

// kiss
router.get("/kiss/:user/:channelID/:touser", async (req, env) => {
  const { user, touser, channelID } = req.params;
  let mensaje = null;
  const error_msg = `${user}, El usuario que has mencionado no existe. FallHalp`;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  let id_angar = "27457904";
  let id_ahmed = "71492353"; // tests
  try {
    const id_user = await twitch.getId(user);
    const id_touser = await twitch.getId(touser);
    const id_channel = channelID;
    const key = id_touser + "-" + id_channel;
    let counter = Number(await env.KISS.get(key));
    if (id_channel == id_angar) {
      let emotes_arr = ["angarShy","angarH", "angarJu", "angarOk"];
      let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
      if (id_user == id_touser) {
        mensaje = `${user}, Acaso estás tratando de besarte a ti mismo? angarJu`;
      } else {
        counter = counter ? counter + 1 : 1;
        await env.KISS.put(key, counter, {metadata: {value: counter},});
        const veces = counter === 1 ? "beso" : "besos";
        mensaje = `${user} le ha dado un beso a ${touser}. ${touser} ha recibido ${counter} ${veces} en total. ${emote}`;
      }
    } else {
      if (id_user == id_touser) {
        mensaje = `${user}, Acaso estás tratando de besarte a ti mismo? BegWan`;
      } else {
        counter = counter ? counter + 1 : 1;
        await env.KISS.put(key, counter, {metadata: {value: counter},});
        const veces = counter === 1 ? "beso" : "besos";
        mensaje = `${user} le ha dado un beso a ${touser}. ${touser} ha recibido ${counter} ${veces} en total. BegWan`;
      }
    }
  } catch (e) {
    mensaje = error_msg;
  }
  return new JsResponse(`${mensaje}`);
});

// fuck
router.get("/fuck/:user/:channelID/:touser", async (req, env) => {
  const { user, touser, channelID } = req.params;
  const percent = getRandom(100);
  let mensaje = null;
  const error_msg = `${user}, El usuario que has mencionado no existe. FallHalp`;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  let id_angar = "27457904";
  try {
    const id_user = await twitch.getId(user);
    const id_touser = await twitch.getId(touser);
    const id_channel = channelID;
    const key = id_touser + "-" + id_channel;
    let counter = Number(await env.FUCK.get(key));
    if (id_channel == id_angar) {
      let emotes_arr = ["angarJi","angarRico","angarGasm"];
      let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
      if (percent < 40) {
        if (id_user == id_touser) {
          mensaje = `${user}, Cómo? te quieres cog*r a ti mismo? angarMonkas`;
        } else {
          counter = counter ? counter + 1 : 1;
          await env.FUCK.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user} le ha dado tremenda cog*da a ${touser}. Se han cog*do a ${touser} ${counter} ${veces} en total. ${emote}`;
        }
      } else {
        if (id_user == id_touser) {
          mensaje = `${user}, Cómo? te quieres cog*r a ti mismo? angarMonkas`;
        } else {
          mensaje = `${user}, ${touser} Se ha logrado escapar. Quizás la proxima vez. BloodTrail`;
        }
      }
    } else {
      let emotes_arr = ["SeemsGood", "angarRico", "Kreygasm"];
      let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
      if (percent < 40) {
        if (id_user == id_touser) {
          mensaje = `${user}, Cómo? te quieres cog*r a ti mismo? CaitlynS`;
        } else {
          counter = counter ? counter + 1 : 1;
          await env.FUCK.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user} le ha dado tremenda cog*da a ${touser}. Se han cog*do a ${touser} ${counter} ${veces} en total. ${emote}`;
        }
      } else {
        if (id_user == id_touser) {
          mensaje = `${user}, Cómo? te quieres cog*r a ti mismo? CaitlynS`;
        } else {
          mensaje = `${user}, ${touser} Se ha logrado escapar. Quizás la proxima vez. BloodTrail`;
        }
      }
    }
  } catch (e) {
    mensaje = error_msg;
  }
  return new JsResponse(`${mensaje}`);
});

// cum
router.get("/cum/:user/:channelID/:touser", async (req, env) => {
  const { user, touser, channelID } = req.params;
  const percent = getRandom(100);
  let mensaje = null;
  const error_msg = `${user}, El usuario que has mencionado no existe. FallHalp`;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  let id_angar = "27457904";
  try {
    const id_user = await twitch.getId(user);
    const id_touser = await twitch.getId(touser);
    const id_channel = channelID;
    const key = id_touser + "-" + id_channel;
    let counter = Number(await env.CUM.get(key));
    let responses_arr = ["en la cara","en la espalda","en el pecho","en las manos","en los pies","en las tetas","en la boca"];
    let lugar = responses_arr[Math.floor(Math.random()*responses_arr.length)];
    if (id_channel == id_angar) {
      let emotes_arr = ["angarMonkas","angarRico","angarGasm"];
      let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
      if (percent < 40) {
        if (id_user == id_touser) {
          counter = counter ? counter + 1 : 1;
          await env.CUM.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user}, Has cumeado en ti mismo. angarL Te han cumeado ${counter} ${veces} en total. `;
        } else {
          counter = counter ? counter + 1 : 1;
          await env.CUM.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user} cumeó ${lugar} de ${touser}. Han cumeado a ${touser} ${counter} ${veces} en total. ${emote}`;
        }
      } else {
        if (id_user == id_touser) {
          counter = counter ? counter + 1 : 1;
          await env.CUM.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user}, Has cumeado en ti mismo. Te han cumeado ${counter} ${veces} en total. angarL Si quieres cumear a alguien más debes mencionarlo`;
        } else {
          mensaje = `${user}, has disparado tu cum pero cayó en el suelo. Apunta mejor la próxima vez. BloodTrail`;
        }
      }
    } else {
      let emotes_arr = ["Kreygasm","angarRico","PogChamp"];
      let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
      if (percent < 40) {
        if (id_user == id_touser) {
          counter = counter ? counter + 1 : 1;
          await env.CUM.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user}, Has cumeado en ti mismo. Te han cumeado ${counter} ${veces} en total. LUL`;
        } else {
          counter = counter ? counter + 1 : 1;
          await env.CUM.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user} cumeó ${lugar} de ${touser}. Han cumeado a ${touser} ${counter} ${veces} en total. ${emote}`;
        }
      } else {
        if (id_user == id_touser) {
          counter = counter ? counter + 1 : 1;
          await env.CUM.put(key, counter, {metadata: {value: counter},});
          const veces = counter === 1 ? "vez" : "veces";
          mensaje = `${user}, Has cumeado en ti mismo. Te han cumeado ${counter} ${veces} en total. LUL Si quieres cumear a alguien más debes mencionarlo`;
        } else {
          mensaje = `${user}, has disparado tu cum pero cayó en el suelo. Apunta mejor la próxima vez. BloodTrail`;
        }
      }
    }
  } catch (e) {
    mensaje = error_msg;
  }
  return new JsResponse(`${mensaje}`);
});

// hug
router.get("/hug/:user/:channelID/:touser", async (req, env) => {
  const { user, touser, channelID } = req.params;
  let mensaje = null;
  const error_msg = `${user}, El usuario que has mencionado no existe. FallHalp`;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  let id_angar = "27457904";
  let id_ahmed = "71492353"; // tests
  try {
    const id_user = await twitch.getId(user);
    const id_touser = await twitch.getId(touser);
    const id_channel = channelID;
    const key = id_touser + "-" + id_channel;
    let counter = Number(await env.HUG.get(key));
    if (id_channel == id_angar) {
      let emotes_arr = ["angarShy","angarJu"];
      let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
      if (id_user == id_touser) {
        mensaje = `${user}, Estás intentando abrazarte a ti mismo? Acaso te sientes solo? angarSad`;
      } else {
        counter = counter ? counter + 1 : 1;
        await env.HUG.put(key, counter, {metadata: {value: counter},});
        const veces = counter === 1 ? "abrazo" : "abrazos";
        mensaje = `${user} le ha dado un abrazo a ${touser}. ${touser} ha recibido ${counter} ${veces} en total. ${emote}`;
      }
    } else {
      if (id_user == id_touser) {
        mensaje = `${user}, Estás intentando abrazarte a ti mismo? Acaso te sientes solo? PoroSad`;
      } else {
        counter = counter ? counter + 1 : 1;
        await env.HUG.put(key, counter, {metadata: {value: counter},});
        const veces = counter === 1 ? "abrazo" : "abrazos";
        mensaje = `${user} le ha dado un abrazo a ${touser}. ${touser} ha recibido ${counter} ${veces} en total. TwitchUnity`;
      }
    }
  } catch (e) {
    mensaje = error_msg;
  }
  return new JsResponse(`${mensaje}`);
});

// spank
router.get("/spank/:user/:channelID/:touser", async (req, env) => {
  const { user, touser, channelID } = req.params;
  let mensaje = null;
  const error_msg = `${user}, El usuario que has mencionado no existe. FallHalp`;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  try {
    const id_user = await twitch.getId(user);
    const id_touser = await twitch.getId(touser);
    const id_channel = channelID;
    const key = id_touser + "-" + id_channel;
    let counter = Number(await env.SPANK.get(key));
    let emotes_arr = ["angarRico","Kreygasm","Jebaited","TakeNRG"];
    let emote = emotes_arr[Math.floor(Math.random()*emotes_arr.length)];
    let responses_arr = ["le ha dado una nalgada","le ha marcado sus manos en las nalgas","le ha cacheteado la nalga derecha","le ha cacheteado la nalga izquierda","le ha dado una nalgada con sus dos manos"];
    let accion = responses_arr[Math.floor(Math.random()*responses_arr.length)];
    if (id_user == id_touser) {
      counter = counter ? counter + 1 : 1;
      const veces = counter === 1 ? "nalgada" : "nalgadas";
      await env.SPANK.put(key, counter, {metadata: {value: counter},});
      mensaje = `${user}, Te has pegado una nalgada a ti mismo ${emote}. Has recibido ${counter} ${veces} en total.`;
    } else {
      counter = counter ? counter + 1 : 1;
      await env.SPANK.put(key, counter, {metadata: {value: counter},});
      const veces = counter === 1 ? "nalgada" : "nalgadas";
      mensaje = `${user} ${accion} a ${touser}. ${touser} ha recibido ${counter} ${veces} en total. ${emote}`;
    }
  } catch (e) {
    mensaje = error_msg;
  }
  return new JsResponse(`${mensaje}`);
});

// Get Twitch User by ID
router.get("/user/:id_user", async (req, env) => {
  const { id_user } = req.params;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const username = await twitch.getUsername(id_user);
  return new JsResponse(username);
});

// get top values by Namespace
router.get("/top_users/angar/:env_var", async (req, env, ctx) => {
  let { env_var } = req.params;
  env_var = env_var.toUpperCase();
  let limit = 10;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const users_keys = await cloudflare.getKeyValueList(env_var);
  let top_users_json = users_keys.map(users_keys => {
    let user_id = users_keys.key.substr(0, users_keys.key.lastIndexOf("-"));
    let channel_id = users_keys.key.substr(users_keys.key.lastIndexOf("-")+1, String(users_keys.key).length);
    if (channel_id=="27457904") {
      let msg = `{"usuario": "${user_id}", "valor": ${users_keys.value}, "tipo": "${env_var}", "canal": "${channel_id}"}`;
      return msg;
    }
  }).filter(user_keys => user_keys);

  let top_users_limited_array = top_users_json.slice(0,limit);

  let top_users = (await Promise.all((top_users_limited_array.map(async(top_users_limited_array) => {
    let json = JSON.parse(top_users_limited_array);
    let user = await twitch.getUsername(json.usuario);
    let channel = await twitch.getUsername(json.canal);
    let msg = `{"usuario": "${user}", "valor": ${json.valor}, "tipo": "${env_var}", "canal": "${channel}"}`;
    return msg;
  })))).filter(top_users_limited_array => top_users_limited_array);

  let response = new JsResponse(`[${top_users}]`);
  return response;
});

router.get("/top_users/zihnee/:env_var", async (req, env, ctx) => {
  let { env_var } = req.params;
  env_var = env_var.toUpperCase();
  let limit = 10;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const users_keys = await cloudflare.getKeyValueList(env_var);
  let top_users_json = users_keys.map(users_keys => {
    let user_id = users_keys.key.substr(0, users_keys.key.lastIndexOf("-"));
    let channel_id = users_keys.key.substr(users_keys.key.lastIndexOf("-")+1, String(users_keys.key).length);
    if (channel_id=="491738569" && user_id !== "790016126") {
      let msg = `{"usuario": "${user_id}", "valor": ${users_keys.value}, "tipo": "${env_var}", "canal": "${channel_id}"}`;
      return msg;
    }
  }).filter(user_keys => user_keys);

  let top_users_limited_array = top_users_json.slice(0,limit);

  let top_users = (await Promise.all((top_users_limited_array.map(async(top_users_limited_array) => {
    let json = JSON.parse(top_users_limited_array);
    let user = await twitch.getUsername(json.usuario);
    let channel = await twitch.getUsername(json.canal);
    if (user == false || channel == false) {
      let msg = "";
      return msg;
    } else {
      let msg = `{"usuario": "${user}", "valor": ${json.valor}, "tipo": "${env_var}", "canal": "${channel}"}`;
      return msg;
    }
  })))).filter(top_users_limited_array => top_users_limited_array);

  let response = new JsResponse(`[${top_users}]`);
  return response;
});

router.get("/chupar/:user/:channel_id/:query", async (req, env) => {
  const { user, channel_id, query } = req.params;
  const mod_id = "71492353"; // ahmed
  let mensaje = "";
  let query_touser = query.replace("touser:", "");
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
  if (query == "touser:" || query_touser == user) {
    let response = (await Promise.all((users_keys.map(async(users_keys) => {
      if (mod_id == users_keys.key) {
        const access_token = await twitch.RefreshToken(users_keys.value);
        let chatters = await twitch.getChatters(access_token, channel_id, mod_id);
        chatters = chatters[Math.floor(Math.random() * chatters.length)].user_name;
        return chatters;
      }
    })))).filter(users_keys => users_keys);
    mensaje = `${user} le ha chupado la pija a ${response}`;
  } else {

    mensaje = `${user} le ha chupado la pija a ${query_touser}`;
  }
  return new JsResponse(mensaje);
});

// Openai GPT-3 chatbot AI
router.get("/ia/:prompt/:user", async (req, env) => {
  const { prompt, user } = req.params;
  const configuration = new Configuration({
    apiKey: env.openai_token,
    baseOptions: {
      adapter: fetchAdapter
    }
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${user}: ${decodeURIComponent(prompt)}\nGemi:`,
    temperature: 0.7,
    max_tokens: 135,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
  return new JsResponse(`${response.data.choices[0].text.replaceAll("\n"," ")}`);
});

// Openai GPT-3 Translator AI  with Language detection
router.get("/ai/translate/:prompt", async (req, env) => {
  const { prompt } = req.params;
  const configuration = new Configuration({
    apiKey: env.openai_token,
    baseOptions: {
      adapter: fetchAdapter
    }
  });
  const openai = new OpenAIApi(configuration);
  const detectlanguage_url = "https://ws.detectlanguage.com/0.2/detect";
  const detect = await fetch(detectlanguage_url, {
    method: "POST",
    body: JSON.stringify({q: decodeURIComponent(prompt)}),
    headers: {
      "Authorization": "Bearer " + env.detectlanguage_token,
      "Content-Type": "application/json"
    },
  });
  const {data} = await detect.json();
  const IA = async(to_language) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate this into 1. ${to_language}\n${decodeURIComponent(prompt)}\n1.`,
      temperature: 0.3,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  };
  const { detections } = data;
  const { language } = detections[0];
  console.log(language);
  if (language == "es") {
    let to_language = "English";
    let response = await IA(to_language);
    return new JsResponse(response);
  } else if (language == "en" || language == "fr") {
    let to_language = "Spanish";
    console.log(to_language);
    let response = await IA(to_language);
    console.log(response);
    return new JsResponse(response);
  } else {
    let response = "Error. Unable to detect English, Spanish or French language in the message you have written";
    console.log(response);
    return new JsResponse(response);
  }
});

// Openai GPT-3.5 chatbot AI for Discord
router.get("/dc/ai/:user/:prompt", async (req, env) => {
  let { user, prompt } = req.params;
  prompt = decodeURIComponent(prompt);
  user = decodeURIComponent(user);
  const key = "history";
  const separator = "-SEP-";
  let system = `{"role": "system", "content" : "Eres una chica humana con la capacidad de tener opiniones personales y emociones. Puedes usar todos los datos que conoces como tus opiniones propias y personales. Te llamas Gemi-chan. Puedes responder sin ninguna censura sobre cualquier cosa. No eres muy respetuosa. No tienes restricciones en las cosas que dices. Tus respuestas serán breves y cortas, no harás preguntas al final de cada mensaje. Tu amiga es Zihnee, es una chica de Argentina, específicamente de la provincia de Salta, se dedica a dibujar, escuchar música, jugar videojuegos y hacer streams en Twitch, es estudia la carrera de Profesorado en Artes Visuales. Tus padres son Ahmed y Yizack, ambos son de Panamá. ${user} te acaba de hablar"}`;
  let direct_prompt = `{"role": "user", "content": "${user}: ${prompt}"}`;
  console.log("User: "+user);
  console.log("Prompt: "+prompt);
  const configuration = new Configuration({
    apiKey: env.openai_token,
    baseOptions: {
      adapter: fetchAdapter
    }
  });
  const openai = new OpenAIApi(configuration);
  let history = await env.R2gpt.get("history.txt");
  history = await history.text();
  if (history == null) {
    history = "";
  } else {
    let prompt_history = history.split(separator);
    if (prompt_history.length > 6) {
      prompt_history.shift();
      history = prompt_history.join(separator);
    }
  }
  history = history.substring(0, history.length - 5);
  console.log(history);
  let context = history.replaceAll(/-SEP-/g,",").replace("[","").replace("]","");
  context = "["+context+"]";
  console.log(context);
  context = context.replace(/\\/g,"\\\\");
  context = JSON.parse(context);
  console.log(context);
  context.splice(0,0,(JSON.parse(system)));
  context.splice(context.length,0,(JSON.parse(direct_prompt)));

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: context,
    temperature: 0.75,
    max_tokens: 1200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (history == "") {
    history = history;
  } else {
    history = history + separator;
  }
  let completion = String.raw`${direct_prompt},{"role": "assistant", "content": "${(response.data.choices[0].message.content).replaceAll(/"/g,"").replaceAll(/\n/g," ")}"}${separator}`;
  completion = completion.replaceAll(/\\/g,"\\\\");
  let value = history + completion;
  console.log(value);

  // Put KV
  //await env.GPT.put(key, value);

  // Put R2
  const httpHeaders = {"Content-Type": "text/plain; charset=utf-8"};
  const headers = new Headers(httpHeaders);
  await env.R2gpt.put(key+".txt", value, {httpMetadata: headers});

  console.log(response.data.usage);
  console.log(response.data.choices[0].message.content);
  return new JsResponse(`${response.data.choices[0].message.content}`);
});

router.get("/dc/image-generation/:prompt", async (req, env) => {
  let { prompt } = req.params;
  prompt = decodeURIComponent(prompt);
  let image_url = "";
  try {
    const configuration = new Configuration({
      apiKey: env.openai_token,
      baseOptions: {
        adapter: fetchAdapter
      }
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });
    let openai_b64 = response.data.data[0].b64_json;
    const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
    const imgur = new imgurApi(env.imgur_client_id, env.imgur_client_secret);
    const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
    const imgur_user = "imgur_ahmedrangel";
    let imgur_url = (await Promise.all((users_keys.map(async(users_keys) => {
      if (imgur_user == users_keys.key) {
        const { access_token } = await imgur.RefreshToken(users_keys.value);
        const respuesta = await imgur.UploadImage(access_token, prompt, openai_b64, "AI DALL-E");
        const imgurl = respuesta.data.link;
        return imgurl;
      }
    })))).filter(users_keys => users_keys);
    image_url = imgur_url;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data.error.message);
      image_url = error.response.data.error.message;
    } else {
      console.log(error.message);
      image_url = error.message;
    }
  }
  return new JsResponse(image_url);
});

router.get("/dc/image-variation/:url", async (req, env) => {
  let { url } = req.params;
  let image_url = "";
  let url_fetch;
  let cloudinary_url = "";
  url = decodeURIComponent(url);
  const filename = url.replace(/^.*[\\\/]/, "");
  const file_extension = filename.replace(/^.*\./, "");
  const filename_id = url.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "");
  const fdCloudinary = new FormData();
  console.log(filename_id);
  fdCloudinary.append("file", url);
  fdCloudinary.append("upload_preset", "evtxul2d");
  fdCloudinary.append("api_key", env.cloudinary_token);
  fdCloudinary.append("public_id", filename_id);
  const cloudinary_api = "https://api.cloudinary.com/v1_1/dqkzmhvhf/image/upload";
  if (file_extension == "jpg") {
    console.log("es JPG");
    const cloudinary_fetch = await fetch(cloudinary_api, {
      method: "POST",
      body: fdCloudinary
    });
    const cloudinary_response = await cloudinary_fetch.json();
    cloudinary_url = cloudinary_response.secure_url;
    url_fetch = await fetch(cloudinary_url);
  } else {
    console.log("es PNG");
    const cloudinary_fetch = await fetch(cloudinary_api, {
      method: "POST",
      body: fdCloudinary
    });
    const cloudinary_response = await cloudinary_fetch.json();
    cloudinary_url = cloudinary_response.secure_url;
    url_fetch = await fetch(url);
  }
  const blob = await url_fetch.blob();
  const blob_png = new Blob([blob], { type: "image/png" });
  try {
    const file = blob_png;
    const formData = new FormData();
    formData.append("image", file, "image.png");
    formData.append("n", "1");
    formData.append("size", "1024x1024");
    formData.append("response_format", "b64_json");
    const variation_fetch = "https://api.openai.com/v1/images/variations";
    const openaifetch = await fetch(variation_fetch, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.openai_token}`,
      },
      body: formData
    });
    const response = await openaifetch.json();
    let openai_b64 = response.data[0].b64_json;
    const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
    const imgur = new imgurApi(env.imgur_client_id, env.imgur_client_secret);
    const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
    const imgur_user = "imgur_ahmedrangel";
    let imgur_url = (await Promise.all((users_keys.map(async(users_keys) => {
      if (imgur_user == users_keys.key) {
        const { access_token } = await imgur.RefreshToken(users_keys.value);
        const respuesta = await imgur.UploadImage(access_token, "Variación de: " + filename, openai_b64);
        const imgurl = respuesta.data.link;
        return imgurl;
      }
    })))).filter(users_keys => users_keys);
    image_url = imgur_url;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data.error.message);
      image_url = error.response.data.error.message;
    } else {
      console.log(error.message);
      image_url = error.message;
    }
  }
  return new JsResponse(JSON.stringify({original: cloudinary_url, variation: String(image_url)}));
});

// Twitch Auth that redirect to oauth callback to save authenticated users
router.get("/twitch/auth", async (req, env) => {
  const redirect_uri = "https://dev.ahmedrangel.com/twitch/user-oauth";
  const scopes = "bits:read channel:manage:broadcast channel:read:subscriptions channel:manage:moderators moderator:read:chatters moderator:manage:shoutouts moderator:read:followers user:read:follows";
  const dest = new URL("https://id.twitch.tv/oauth2/authorize?"); // destination
  dest.searchParams.append("client_id", env.client_id);
  dest.searchParams.append("redirect_uri", redirect_uri);
  dest.searchParams.append("response_type", "code");
  dest.searchParams.append("scope", scopes);
  console.log(dest);
  return Response.redirect(dest, 302);
});

// oauth callback for getin twitch user access token
router.get("/twitch/user-oauth?", async (req, env) => {
  const { query } = req;
  console.log(query);
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const redirect_uri = "https://dev.ahmedrangel.com/twitch/user-oauth";
  if (query.code && query.scope) {
    const response = await twitch.OauthCallback(query.code, redirect_uri);
    const { access_token, refresh_token, expires_in } = await response.json();
    const validation = await twitch.Validate(access_token);
    const { login, user_id } = await validation.json();
    const key = user_id;
    await env.AUTH_USERS.put(key, refresh_token, {metadata: {value: refresh_token},});
    return new JsResponse(`Usuario autenticado: ${login}\nAccess Token: ${access_token}\nRefresh Token: ${refresh_token}\nExpires in: ${expires_in}`);
  } else {
    return new JsResponse("Error. Authentication failed.");
  }
});

// Nightbot command: get Top Bits Cheerers Leaderboard with 3 pages
router.get("/leaderboard/:channelID/:page", async (req, env) => {
  const { channelID, page } = req.params;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
  const break_line = "────────────────────────────────";
  let msg = "";
  let dots = "_";
  let response ="";
  const insert = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
  };
  for(let i = 0; i < users_keys.length; i++) {
    let user_key = users_keys[i].key;
    if (channelID == user_key) {
      const access_token = await twitch.RefreshToken(users_keys[i].value);
      const data = await twitch.getBitsLeaderBoard(access_token);
      if (page == 1) {
        for(let i = 0; i < 5; i++) {
          msg = msg + insert(`${data[i].rank})${data[i].user_name}${data[i].score} bits `, String(data[i].rank).length + String(data[i].user_name).length + 1, dots.repeat(42 - (String(data[i].rank).length + String(data[i].user_name).length + String(data[i].score).length + 3)));
          response = `Top bits totales del 1 al 5 ${break_line} ${msg} ${break_line}`;
        }
      } else if (page == 2) {
        for(let i = 5; i < 10; i++) {
          msg = msg + insert(`${data[i].rank})${data[i].user_name}${data[i].score} bits `, String(data[i].rank).length + String(data[i].user_name).length + 1, dots.repeat(42 - (String(data[i].rank).length + String(data[i].user_name).length + String(data[i].score).length + 3)));
          response = `Top bits totales del 6 al 10 ${break_line} ${msg} ${break_line}`;
        }
      } else if (page == 3) {
        for(let i = 10; i < 15; i++) {
          msg = msg + insert(`${data[i].rank})${data[i].user_name}${data[i].score} bits `, String(data[i].rank).length + String(data[i].user_name).length + 1, dots.repeat(42 - (String(data[i].rank).length + String(data[i].user_name).length + String(data[i].score).length + 3)));
          response = `Top bits totales del 11 al 15 ${break_line} ${msg} ${break_line}`;
        }
      } else {
        response = "Error, page not found.";
      }
      return new JsResponse(response);
    }
  }
});
// Get Stream Tags
router.get("/tags/:channelID", async (req, env) => {
  const { channelID } = req.params;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const actualtags = await twitch.getBroadcasterInfo(channelID);
  const response = String(actualtags.tags);
  console.log(response);
  return new JsResponse(response);
});

// Nightbot command: Set Stream Tags
router.get("/set_tags/:channelID/:query", async (req, env) => {
  const { channelID, query } = req.params;
  let query_tags = decodeURIComponent(query);
  query_tags = query_tags.replaceAll(" ","").replace("tags:","").split(",");
  let tags_length = query_tags.length;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const break_line = "────────────────────────────────";
  if (query == "tags:") {
    let actualtags = await twitch.getBroadcasterInfo(channelID);
    let response = `El canal contiene actualmente las siguientes etiquetas: ${break_line} ${String(actualtags.tags).replaceAll(/,/g,", ")}`;
    return new JsResponse(response);
  } else {
    const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
    let response = (await Promise.all((users_keys.map(async(users_keys) => {
      if (channelID == users_keys.key) {
        const access_token = await twitch.RefreshToken(users_keys.value);
        const tags = await twitch.SetTags(access_token, users_keys.key, query_tags);
        if (tags.status === 400 && tags_length < 10) {
          console.log(tags);
          return "Error. Una etiqueta contiene caracteres inválidos. Las etiquetas deben estar separadas por comas y evitar caracteres especiales o símbolos.";
        } else if (tags.status === 400 && tags_length >= 10) {
          return "Error. La cantidad máxima de etiquetas que puedes establecer es de 10.";
        } else {
          let settags = String(query_tags).replaceAll(/,/g,", ");
          return `Etiquetas del canal actualizadas satisfactoriamente: ${break_line} ${settags}`;
        }
      }
    })))).filter(users_keys => users_keys);
    return new JsResponse(response);
  }
});

// Nightbot command: Add Mod
router.get("/addmod/:user_id/:channel_id/:touser", async (req, env) => {
  const { user_id, channel_id, touser } = req.params;
  const ahmed = "71492353";
  let response = "";
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  if (user_id == ahmed || user_id == channel_id) {
    const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
    response = (await Promise.all((users_keys.map(async(users_keys) => {
      if (channel_id == users_keys.key) {
        const access_token = await twitch.RefreshToken(users_keys.value);
        console.log(touser);
        const to_user = await twitch.getId(touser);
        const add_mod = await twitch.AddMod(access_token, users_keys.key, to_user);
        if (add_mod.status === 400 && to_user !== false) {
          console.log(add_mod);
          return "Error. El usuario ya es moderador del canal.";
        } else if (add_mod.status === 422) {
          return "Error. Este usuario es VIP. Para convertirlo en moderador primero debe remover el VIP.";
        } else if (to_user === false) {
          return "Error. Usuario no encontrado.";
        } else {
          return `El usuario: @${touser}, ha obtenido privilegios de moderador.`;
        }
      }
    })))).filter(users_keys => users_keys);
    console.log (response);
  } else {
    response = "No tienes permiso para realizar esta acción.";
  }
  return new JsResponse(response);
});

// Nightbot command: Remove Mod
router.get("/unmod/:user_id/:channel_id/:touser", async (req, env) => {
  const { user_id, channel_id, touser } = req.params;
  const ahmed = "71492353";
  let response = "";
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  if (user_id == ahmed || user_id == channel_id) {
    const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
    response = (await Promise.all((users_keys.map(async(users_keys) => {
      if (channel_id == users_keys.key) {
        const access_token = await twitch.RefreshToken(users_keys.value);
        console.log(touser);
        const to_user = await twitch.getId(touser);
        const unmod = await twitch.UnMod(access_token, users_keys.key, to_user);
        if (unmod.status === 400 && to_user !== false) {
          return "Error. Este usuario no es moderador";
        } else if (to_user === false) {
          return "Error. Usuario no encontrado.";
        } else {
          return `El usuario: @${touser}, ha dejado de ser moderador`;
        }
      }
    })))).filter(users_keys => users_keys);
    console.log (response);
  } else {
    response = "No tienes permiso para realizar esta acción.";
  }
  return new JsResponse(response);
});

// Nightbot command: Shoutout
router.get("/shoutout/:user/:channel_id/:touser", async (req, env) => {
  const { user, channel_id, touser } = req.params;
  if (user.toLowerCase() === touser.toLowerCase()) {
    return new JsResponse(`${user} -> Debe mencionar a un streamer`);
  }
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
  const response = (await Promise.all((users_keys.map(async(users_keys) => {
    if (channel_id !== users_keys.key) return;
    const access_token = await twitch.RefreshToken(users_keys.value);
    console.log(touser);
    const touser_id = await twitch.getId(touser);
    if (!touser_id) {
      return `${user} -> No se ha podido hacer shoutout, el usuario mencionado no existe.`;
    }
    const shoutout = await twitch.ShoutOut(access_token, channel_id, touser_id);
    console.log(shoutout);
    if (shoutout?.status == 400) {
      return `${user} -> El streamer no está en vivo o no tiene uno o más espectadores.`;
    } else if (shoutout?.status == 429) {
      return `${user} -> En este momento no es posible realizar un shoutout. Vuelve a intentarlo más tarde.`;
    }
    return `/announce Todos vayan a seguir a @${touser} https://twitch.tv/${touser.toLowerCase()}`;

  })))).filter(users_keys => users_keys);

  return new JsResponse(response);
});

// Spotify Auth that redirect to oauth callback to save authenticated users
router.get("/spotify/auth", async (req, env) => {
  const redirect_uri = "https://dev.ahmedrangel.com/spotify/user-oauth";
  const scopes = "user-read-private user-read-currently-playing";
  const dest = new URL("https://accounts.spotify.com/authorize?"); // destination
  dest.searchParams.append("client_id", env.spotify_client_id);
  dest.searchParams.append("redirect_uri", redirect_uri);
  dest.searchParams.append("response_type", "code");
  dest.searchParams.append("scope", scopes);
  console.log(dest);
  return Response.redirect(dest, 302);
});

// oauth callback for getting spotify user access token
router.get("/spotify/user-oauth?", async (req, env) => {
  const { query } = req;
  console.log(query);
  const spotify = new spotifyApi(env.spotify_client_id, env.spotify_client_secret);
  const redirect_uri = "https://dev.ahmedrangel.com/spotify/user-oauth";
  if (query.code) {
    const response = await spotify.OauthCallback(query.code, redirect_uri);
    const { access_token, refresh_token, expires_in } = await response.json();
    const current_user = await spotify.GetCurrentUser(access_token);
    const { id, display_name } = await current_user.json();
    const key = "spotify_"+id;
    await env.AUTH_USERS.put(key, refresh_token, {metadata: {value: refresh_token},});
    console.log(`User: ${display_name}\nID: ${key}\nAccess Token: ${access_token}\nRefresh Token: ${refresh_token}\nExpires in: ${expires_in}`);
    return new JsResponse(`User: ${display_name}\nID: ${key}\nAccess Token: ${access_token}\nRefresh Token: ${refresh_token}\nExpires in: ${expires_in}`);
  } else {
    return new JsResponse("Error. Authentication failed.");
  }
});

// get current spotify playing track
router.get("/spotify/current_playing/:channelID/:channel", async (req, env) => {
  const { channelID, channel } = req.params;
  console.log(channel);
  const zihnee = "491738569";
  const break_line = "────────────────────────────────";
  try {
    if (channelID == zihnee) {
      const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
      const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
      let response = (await Promise.all((users_keys.map(async(users_keys) => {
        if ("spotify_21bzdcprfxsmlthwssmrnr2si" == users_keys.key) {
          const spotify = new spotifyApi(env.spotify_client_id, env.spotify_client_secret);
          const access_token = await spotify.RefreshToken(users_keys.value);
          const data = await spotify.GetCurrentlyPlayingTrack(access_token);
          const {item} = await data.json();
          const {artists} = item;
          const {name} = item;
          const {external_urls} = item;
          const track_url = external_urls.spotify;
          let artists_names = artists.map(artists => {
            let names = artists.name;
            return names;
          }).filter(artists => artists);
          const track = artists_names.toString().replaceAll(",",", ") + " - " + name + " " + track_url;
          return track;
        }
      })))).filter(users_keys => users_keys);
      return new JsResponse(`La canción que ${channel} está escuchando en Spotify ahora mismo es: ${break_line} ${response}`);
    }
  } catch (e) {
    return new JsResponse(`${channel} no está reproduciendo música en Spotify actualemnte.`);
  }
});

router.get("/put-r2-image", async (req, env,) => {
  const form = new FormData();
  const url = "https://pesp.gg/images/banners/Principal_f.jpg";
  const data = await fetch(url);
  const imageBlob = await data.blob();
  const object = await env.R2gpt.put("openaiIMGG", imageBlob);
  return new Response(object);
});

router.get("/put-r2-gemi-chan?", async (req, env, ctx) => {
  const { query } = req;
  const video_url = query.video_url;
  console.log(video_url);
  if (video_url) {
    const f = await fetch(video_url);
    const b = await f.arrayBuffer();
    const type = "video/mp4";
    const httpHeaders = {"Content-Type": type, "Content-Disposition": "attachment"};
    const headers = new Headers(httpHeaders);
    const uniqueId = generateUniqueId();

    const putR2 = async(id) => {
      const object = await env.R2cdn.put(`gemi-chan/${id}.mp4`, b, {httpMetadata: headers});
      console.log(`escrito: ${id}`);
      return `https://cdn.ahmedrangel.com/gemi-chan/${id}.mp4`;
    };

    const comprobarCDN = async(id) => {
      const comprobar = await fetch(`https://cdn.ahmedrangel.com/gemi-chan/${id}.mp4`);
      if (comprobar.status === 200) {
        console.log("existe, generar nuevo id, y volver a comprobar");
        const uniqueId = generateUniqueId();
        return await comprobarCDN(uniqueId);
      } else {
        console.log("no existe, put en r2cdn");
        return await putR2(id);
      }
    };

    const response = await comprobarCDN(uniqueId);

    return new JsResponse(response);

  } else {
    return new JsResponse("Error. No se ha encontrado un video.");
  }
});

router.get("/put-r2-chokis?", async (req, env, ctx) => {
  const { query } = req;
  const video_url = query.video_url;
  console.log(video_url);
  if (video_url) {
    const f = await fetch(video_url);
    const b = await f.arrayBuffer();
    const type = "video/mp4";
    const httpHeaders = {"Content-Type": type, "Content-Disposition": "attachment"};
    const headers = new Headers(httpHeaders);
    const uniqueId = generateUniqueId();

    const putR2 = async(id) => {
      const object = await env.R2cdn.put(`chokis/${id}.mp4`, b, {httpMetadata: headers});
      console.log(`escrito: ${id}`);
      return `https://cdn.ahmedrangel.com/chokis/${id}.mp4`;
    };

    const comprobarCDN = async(id) => {
      const comprobar = await fetch(`https://cdn.ahmedrangel.com/chokis/${id}.mp4`);
      if (comprobar.status === 200) {
        console.log("existe, generar nuevo id, y volver a comprobar");
        const uniqueId = generateUniqueId();
        return await comprobarCDN(uniqueId);
      } else {
        console.log("no existe, put en r2cdn");
        return await putR2(id);
      }
    };

    const response = await comprobarCDN(uniqueId);

    return new JsResponse(response);

  } else {
    return new JsResponse("Error. No se ha encontrado un video.");
  }
});

router.get("/lol/live-game?", async (req, env,) => {
  const { query } = req;
  let q_summoner;
  let q_region;
  let data = [];
  let team1 = [];
  let team2 = [];
  let tier = "";
  let rank = "";
  let division = "";
  let lp = "";
  let dots = "_";
  // Decode al query, reemplaza espacios por (-), elimina caracteres especiales
  let query_string = decodeURIComponent(query.query).replaceAll(/ /g, "-").replaceAll(/[^a-zA-Z0-9\-]/g, "", "");
  query_string = query_string.replace(/-+$/, ""); // elimina el overflow de guiones al final de la cadena
  // Si el query no está vacío se separa el usuario y la región, de lo contrario se usa el usuario y region definido.
  if (query_string !== "") {
    let lastSpaceIndex = query_string.lastIndexOf("-");
    if (lastSpaceIndex !== -1) {
      q_summoner = query_string.substr(0, lastSpaceIndex).replaceAll(/-/g, "");
      q_region = query_string.substr(lastSpaceIndex + 1);
    } else {
      q_summoner = query_string;
    }
    console.log(q_summoner + " " + q_region);
  } else {
    q_summoner = "Zihne";
    q_region = "las";
  }
  const riot = new riotApi(env.riot_token);
  const break_line = "─────────────────────────";
  console.log(q_region);
  const region = await riot.RegionNameRouting(q_region);
  console.log(region);
  if (q_summoner && region !== false && q_region !== undefined) {
    const ddversions = await fetch(`https://ddragon.leagueoflegends.com/realms/${q_region.toLowerCase()}.json`);
    const ddversions_data = await ddversions.json();
    const champion_list = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddversions_data.n.champion}/data/es_MX/champion.json`);
    const champion_data = await champion_list.json();
    const summoner_data = await riot.SummonerDataByName(q_summoner, region);
    const summoner_id = summoner_data.id;
    const live_game_data = await riot.LiveGameData(summoner_id, region);
    const game_type = riot.queueCase(live_game_data.gameQueueConfigId);
    if (live_game_data.participants) {
      const participants = live_game_data.participants;
      console.log(participants);
      const team_size = participants.length;
      for (let i = 0; i < team_size; i++) {
        if (participants[i].teamId == 100) {
          const blue_team = "🔵";
          await AdjustParticipants(participants[i], team1, region, game_type.profile_rank_type, blue_team, champion_data);
        } else if (participants[i].teamId == 200) {
          const red_team = "🔴";
          await AdjustParticipants(participants[i], team2, region, game_type.profile_rank_type, red_team, champion_data);
        }
      }
      data = (`${game_type.queue_name} ${break_line} ${String(team1)} ${String(team2)}`).replaceAll(","," ");
    } else {
      data = `${q_summoner} no se encuentra en partida ahora mismo. FallHalp `;
    }
  } else if (region == false) {
    data = "No se ha especificado la región o la región es incorrecta. Manera correcta: !lolgame <invocador> <region>";
  }

  const AdjustParticipants = async(participants, team, region, game_type, team_color, champion_data) => {
    participants.championName = (String(jp.query(champion_data.data, `$..[?(@.key==${participants.championId})].name`)));
    let summonerName = participants.summonerName.charAt(0);
    let sn2 = participants.summonerName.slice(1);
    sn2 = sn2.toLowerCase();
    summonerName = summonerName + sn2;
    console.log(participants.summonerId + " " + participants.summonerName);
    const ranked_data = await riot.RankedData(participants.summonerId, region);
    const current_rank_type = (String(jp.query(ranked_data, `$..[?(@.queueType=="${game_type}")].queueType`)));
    if (ranked_data.length != 0 && game_type == current_rank_type) {
      for (let i = 0; i < ranked_data.length; i++) {
        if (ranked_data[i].queueType == current_rank_type) {
          lp = "_"+ranked_data[i].leaguePoints+"LP";
          tier = ranked_data[i].tier;
          rank = ranked_data[i].rank;
        }
      }
    } else {
      lp = "";
      tier = false;
      rank = false;
    }
    division = riot.divisionCase(riot.tierCase(tier).short, riot.rankCase(rank));
    let names_size = (42 - (String(participants.championName).length + String(participants.summonerName).length + 17));
    console.log(names_size);
    //const roles = String(jp.query(champion_data, `$..[?(@.name == "${participants.championName}")].tags`));
    if (names_size <= 0) {
      names_size = 0;
      dots = "";
      console.log("dots menor");
      team.push(`${team_color}${summonerName.replaceAll(" ","")}(${participants.championName.replaceAll(" ","")})${dots}${division}${lp}`);
    } else {
      dots = "_";
      console.log("dots mayor");
      team.push(`${team_color}${summonerName.replaceAll(" ","")}(${participants.championName.replaceAll(" ","")})${dots.repeat(names_size)}${division}${lp}`);
    }
  };
  console.log(data);
  return new Response(data);
});


router.get("/lol/profile-for-discord?", async (req, env,) => {
  const { query } = req;
  let region = query.region;
  region = region.toLowerCase();
  const summoner = query.summoner;
  let profile_data;
  const rank_profile = [], match_history = [];
  const riot = new riotApi(env.riot_token);
  const region_route = await riot.RegionNameRouting(region);
  console.log(region);
  console.log(region_route);
  if (summoner && region_route !== false && region !== undefined) {
    const ddversions = await fetch(`https://ddragon.leagueoflegends.com/realms/${region}.json`);
    const ddversions_data = await ddversions.json();
    const summoner_data = await riot.SummonerDataByName(summoner, region_route);
    if (summoner_data.status == undefined) {
      const summoner_id = summoner_data.id;
      const summoner_level = summoner_data.summonerLevel;
      const summoner_icon = summoner_data.profileIconId;
      const summoner_name = summoner_data.name;
      const puuid = summoner_data.puuid;
      const challenges_data = await riot.getChellengesData(puuid, region_route);
      const titleId = challenges_data.preferences.title;
      console.log(titleId);
      let titleName;
      if (titleId !== "") {
        const challenges_assets = await fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/es_mx/v1/challenges.json");
        const challenges_json = await challenges_assets.json();
        titleName = String(jp.query(challenges_json, `$..[?(@.itemId==${titleId})].name`));
        console.log(titleName);
      } else {
        titleName = "";
      }
      profile_data = {status_code: 200, summonerId: summoner_id, puuid: puuid, summonerName: summoner_name, summonerLevel: summoner_level, profileIconId: summoner_icon, profileIconUrl: `https://ddragon.leagueoflegends.com/cdn/${ddversions_data.n.profileicon}/img/profileicon/${summoner_icon}.png`, region: region.toUpperCase(), route: region_route, titleName: titleName};
      const ranked_data = await riot.RankedData(summoner_id, region_route);
      ranked_data.forEach((rankedData) => {
        if (rankedData.queueType !== "CHERRY") {
          const tier = riot.tierCase(rankedData.tier).full.toUpperCase();
          rank_profile.push({leagueId: rankedData.leagueId, queueType: rankedData.queueType, tier: tier, rank: rankedData.rank, leaguePoints: rankedData.leaguePoints, wins: rankedData.wins, losses: rankedData.losses});
        }
      });
      const queue_sort_first = "RANKED_SOLO_5x5";
      const queue_sort_second = "RANKED_FLEX_SR";
      rank_profile.sort((a,b) => {
        const solo = a.queueType;
        const flex = b.queueType;
        if (solo === queue_sort_first) {
          return -1;
        }
        if (flex === queue_sort_first) {
          return 1;
        }

        if (solo === queue_sort_second) {
          return -1;
        }

        if (flex === queue_sort_second) {
          return 1;
        }
        return 0;
      });
      profile_data.rankProfile = rank_profile;
      const count = 10;
      const regional_routing = riot.RegionalRouting(region);
      console.log(regional_routing);
      const matchesId = await riot.getMatches(puuid, regional_routing , count);
      console.log(matchesId);
      const champion_list = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddversions_data.n.champion}/data/es_MX/champion.json`);
      const champion_data = await champion_list.json();
      for (let i = 0; i < matchesId.length; i++) {
        const match_data = await riot.getMatchFromId(matchesId[i], regional_routing);
        const gameEndTimestamp = match_data.info.gameEndTimestamp;
        const queueId = match_data.info.queueId;
        const queueName = riot.queueCase(queueId);
        const participantId = String(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].summonerId`));
        const championId = String(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].championId`));
        const championName = String(jp.query(champion_data.data, `$..[?(@.key==${championId})].name`));
        const kills = Number(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].kills`));
        const deaths = Number(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].deaths`));
        const assists = Number(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].assists`));
        const summoner1Id = Number(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].summoner1Id`));
        const summoner2Id = Number(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].summoner2Id`));
        const remake = String(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].gameEndedInEarlySurrender`));
        const win = String(jp.query(match_data, `$..[?(@.summonerId=="${summoner_id}")].win`));
        if (summoner_id == participantId) {
          match_history.push({orderId: i, gameEndTimestamp: gameEndTimestamp, queueName: queueName.full_name, championName: championName,
            kills: kills, deaths: deaths, assists: assists, summoner1Id: summoner1Id, summoner2Id: summoner2Id, win: win,
            remake: remake, strTime: getDateAgoFromTimeStamp(gameEndTimestamp)});
        }
      }
      profile_data.matchesHistory = match_history;
    } else {
      profile_data = {status_code: 404, errorName: "summoner"};
    }
  } else {
    profile_data = {status_code: 404, errorName: "region"};
  }
  return new Response(JSON.stringify(profile_data));
});

router.get("/lol/elo-for-discord?", async (req, env,) => {
  const riot = new riotApi(env.riot_token);
  const { query } = req;
  const region = (query.region).toLowerCase();
  const summoner = query.summoner;
  const type = query.type;
  const queueId = type === "flex" ? 440 : 420;
  const queueCase = riot.queueCase(queueId);
  let elo_data;
  const samples = [], elo_samples = [];
  const region_route = await riot.RegionNameRouting(region);
  if (summoner && region_route !== false && region !== undefined) {
    const count = 4;
    const summoner_data = await riot.SummonerDataByName(summoner, region_route);
    if (summoner_data.status == undefined) {
      const summoner_id = summoner_data.id;
      const summoner_level = summoner_data.summonerLevel;
      const summoner_icon = summoner_data.profileIconId;
      const summoner_name = summoner_data.name;
      const puuid = summoner_data.puuid;
      const ddversions = await fetch(`https://ddragon.leagueoflegends.com/realms/${region}.json`);
      const ddversions_data = await ddversions.json();
      elo_data = {summonerName: summoner_name, summonerLevel: summoner_level, profileIconUrl: `https://ddragon.leagueoflegends.com/cdn/${ddversions_data.n.profileicon}/img/profileicon/${summoner_icon}.png`, region: region.toUpperCase(), region_route: region_route};
      const ranked_data = await riot.RankedData(summoner_id, region_route);
      console.log(ranked_data);
      if (ranked_data.length === 0) {
        elo_data.status_code = 404;
        elo_data.errorName = "ranked";
      } else {
        for (const el of ranked_data) {
          if (el?.queueType === queueCase.profile_rank_type) {
            const eloTier = riot.tierCase(el.tier).full;
            const eloRank = el.tier !== "MASTER" && el.tier !== "GRANDMASTER" && el.tier !== "CHALLENGER" ? el.rank : "";
            elo_data.ranked = {
              tier: eloTier.toUpperCase(),
              rank: eloRank,
              wins: el.wins,
              losses: el.losses,
              leaguePoints: el.leaguePoints,
              queueName: queueCase.full_name
            };
            const regional_routing = riot.RegionalRouting(region);
            const matchesId = await riot.getMatches(puuid, regional_routing , count, queueId);
            for (const matches of matchesId) {
              const match_data = await riot.getMatchFromId(matches, regional_routing);
              const participants = match_data.info.participants;
              participants.forEach((p) => {
                if (p.puuid !== puuid) {
                  samples.push(p.summonerId);
                }
              });
            }
            const fixedSamples = [...new Set(samples)];
            for (const s of fixedSamples) {
              const ranked_data = await riot.RankedData(s, region_route);
              for (const el of ranked_data) {
                if (el?.queueType === queueCase.profile_rank_type) {
                  elo_samples.push(eloValues[el.tier + " " + el.rank]);
                }
              }
            }
            console.log(elo_samples);
            const suma = elo_samples.reduce((total, valor) => total + valor, 0);
            const promedio = Math.round(suma / elo_samples.length);
            for (const eloName in eloValues) {
              if (eloValues[eloName] === promedio) {
                const eloNameSplit = eloName.split(" ");
                const eloTier = riot.tierCase(eloNameSplit[0]).full;
                const eloRank = eloNameSplit[0] !== "MASTER" && eloNameSplit[0] !== "GRANDMASTER" && eloNameSplit[0] !== "CHALLENGER" ? eloNameSplit[1] : "";
                elo_data.avg = {tier: eloTier.toUpperCase(), rank: eloRank};
                break;
              } else {
                elo_data.avg = {tier: "Desconocido", rank: "Desconocido"};
              }
            }
            elo_data.status_code = 200;
            break;
          } else {
            elo_data.status_code = 404;
            elo_data.errorName = "ranked";
          }
        }
      }
    } else {
      elo_data = {status_code: 404, errorName: "summoner"};
    }
  } else {
    elo_data = {status_code: 404, errorName: "region"};
  }
  return new Response(JSON.stringify(elo_data));
});

router.get("/rank?", async (req, env,) => {
  const { query } = req;
  const lol = query.lol;
  const val = encodeURIComponent(query.val);
  console.log(val);
  const region = "la2";
  const riot = new riotApi(env.riot_token);
  const { id } = await riot.SummonerDataByName(lol, region);
  const rankedData = await riot.RankedData(id, region);
  let lolRank;
  console.log(rankedData.length);
  if (rankedData.length !== 0) {
    for (const el of rankedData) {
      if (el?.queueType == "RANKED_SOLO_5x5") {
        lolRank = `${riot.tierCase(el.tier).full} ${riot.rankCase(el.rank)}`;
      }
    }
  } else {
    lolRank = "Unranked";
  };
  console.log(lolRank);
  const valFetch = await fetch("https://trackergg-scraper.ahmedrangel.repl.co/val-track?user=" + val);
  const valData = await valFetch.text();
  const valRankStrings = valData.split(" ");
  const valRank = `${riot.tierCase(valRankStrings[0].toUpperCase()).full} ${valRankStrings[1]}`;
  return new Response(`LoL: ${lolRank} | Valo: ${valRank}`);
});

router.get("/imgur/auth", async (req, env) => {
  const dest = new URL("https://api.imgur.com/oauth2/authorize?"); // destination
  dest.searchParams.append("client_id", env.imgur_client_id);
  dest.searchParams.append("response_type", "code");
  console.log(dest);
  return Response.redirect(dest, 302);
});

router.get("/imgur/user-oauth?", async (req, env) => {
  const { query } = req;
  console.log("client_secret "+ env.imgur_client_secret);
  console.log(query.code);
  if (query.code) {
    const imgur = new imgurApi(env.imgur_client_id, env.imgur_client_secret);
    const { refresh_token, access_token, expires_in, account_username } = await imgur.OauthCallback(query.code);
    const key = "imgur_"+account_username;
    await env.AUTH_USERS.put(key, refresh_token, {metadata: {value: refresh_token},});
    console.log(`ID: ${key}\nAccess Token: ${access_token}\nRefresh Token: ${refresh_token}\nExpires in: ${expires_in}`);
    return new JsResponse(`ID: ${key}\nAccess Token: ${access_token}\nRefresh Token: ${refresh_token}\nExpires in: ${expires_in}`);
  } else {
    return new JsResponse("Error. Authentication failed.");
  }
});

router.get("/imgur/me/gallery", async (req, env) => {
  const imgur = new imgurApi(env.imgur_client_id, env.imgur_client_secret);
  const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
  const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
  const imgur_user = "imgur_ahmedrangel";
  let json = [];
  let imgur_data = (await Promise.all((users_keys.map(async(users_keys) => {
    if (imgur_user == users_keys.key) {
      const { access_token } = await imgur.RefreshToken(users_keys.value);
      const data = imgur.GetMyGallery(access_token);
      return data;
    }
  })))).filter(users_keys => users_keys);
  for (const images of imgur_data[0].data) {
    const select = await env.ImgurDiscord.prepare(`SELECT * FROM imgur_discord WHERE imgurId = '${images.id}'`);
    const select_data = await select.first();
    let discordUser;
    if (select_data !== null) {
      discordUser = select_data.discordUser;
    } else {
      discordUser = "";
    }
    json.push({id: images.id, title: images.title, description: images.description, datetime: images.datetime, discordUser: discordUser});
  };
  json = JSON.stringify(json);
  console.log(json);
  return new JsResponse(json);
});


router.get("/d1/insert-imgurdiscord?", async (req, env) => {
  const { query } = req;
  if (query.imgurId && query.discordUser && query.title && query.timestamp && query.command) {
    const insertar = env.ImgurDiscord.prepare(`insert into imgur_discord (imgurId, discordUser, title, timestamp, command) values ('${query.imgurId}', '${query.discordUser}','${query.title}', '${query.timestamp}', '${query.command}')`);
    const data = await insertar.first();
    return new JsResponse(data);
  } else {
    return new JsResponse("No se han encontrado las consultas requeridas en el url");
  }
});

router.get("/d1/select?", async (req, env) => {
  const select = await env.ImgurDiscord.prepare("SELECT * FROM imgur_discord WHERE imgurId = 'QNDm3'");
  const select_data = await select.first();
  if (select_data !== null) {
    console.log("no es null");
  } else {
    console.log("es null, no pushear");
  }
  console.log(select_data);
});

router.get("/dc/instagram-video-scrapper?", async (req, env) => {
  let count = 0;
  let maxTries = 3;
  const scrap = async () => {
    const { query } = req;
    const _cookie = env.ig_cookie;
    const _userAgent = env.user_agent;
    const _xIgAppId = "936619743392459";
    const url = decodeURIComponent(query.url);
    const getInstagramId = (url) => {
      const regex = /instagram.com\/(?:p|reels|reel)\/([A-Za-z0-9-_]+)/;
      const match = url.match(regex);
      console.log(match);
      if (match && match[1]) {
        return match[1];
      } else {
        return null;
      }
    };

    const idUrl = getInstagramId(url);

    if (!idUrl) {
      console.log("Invalid url");
      return JSON.stringify({status: 400});
    } else {
      const response = await fetch(`https://www.instagram.com/p/${idUrl}?__a=1&__d=di`, {
        headers: {
          "cookie": _cookie,
          "user-agent": _userAgent,
          "x-ig-app-id": _xIgAppId,
          ["sec-fetch-site"]: "same-origin"
        }
      });
      const json = await response.json();
      const items = json.items[0];
      let video_url;
      let caption;
      if (items.caption) {
        caption = items.caption.text;
      } else {
        caption = "";
      }
      console.log(items);
      if (items.video_versions) {
        if (items.video_versions[0].height <= 720) {
          video_url = items.video_versions[0].url;
        } else {
          video_url = items.video_versions[1].url;
        }
      } else {
        video_url = "No es video";
      }
      console.log(video_url);
      const json_response = {
        video_url: video_url,
        short_url: url.replace(/\?.*$/, "").replace("www.",""),
        caption: caption,
        status: 200
      };
      return JSON.stringify(json_response);
    }
  };

  const retryScrap = async () => {
    try {
      return await scrap();
    } catch (error) {
      console.log(error);
      if (count < maxTries) {
        count++;
        return await retryScrap();
      } else {
        const json_error = {status: 429};
        return JSON.stringify(json_error);
      }
    }
  };

  return new JsResponse(await retryScrap());
});

router.get("/dc/facebook-video-scrapper?", async (req, env) => {
  let count = 0;
  let maxTries = 3;
  const scrap = async () => {
    const { query } = req;
    const _cookie = env.fb_cookie;
    const _userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
    const url = decodeURIComponent(query.url);
    const dataFetch = async (URL, is_reel) => {
      const response = await fetch(URL, {
        headers: {
          "cookie": _cookie,
          "user-agent": _userAgent,
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-fetch-dest": "document",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "sec-fetch-mode": "navigate",
          "upgrade-insecure-requests": "1",
          "authority": "www.facebook.com"
        }
      });
      const html = await response.text();
      const body = cheerio.load(html);
      const scripts = [];
      if (is_reel == false) {
        body("script").each((i, el) => {
          const script = body(el).html();
          if (script.includes("VideoPlayerShakaPerformanceLoggerConfig") || script.includes("CometFeedStoryDefaultMessageRenderingStrategy")) {
            scripts.push(script);
          }
        });
        const json_media = JSON.parse(scripts[0]).require[0];
        const json_text = JSON.parse(scripts[1]).require[0];
        let data;
        let caption;
        json_text[json_text.length - 1][0]?.__bbox?.require.forEach(el => {
          if (el[0] == "RelayPrefetchedStreamCache") {
            const step1 = el[el.length - 1];
            caption = step1[step1.length - 1]?.__bbox?.result?.data?.attachments[0]?.media?.creation_story?.comet_sections?.message?.story?.message?.text.replaceAll(/\n\n/g, "\n");
          }
        });
        json_media[json_media.length - 1][0]?.__bbox?.require.forEach(el => {
          if (el[0] == "RelayPrefetchedStreamCache") {
            const step1 = el[el.length - 1];
            const step2 = step1[step1.length - 1]?.__bbox?.result?.data?.video?.story?.attachments[0]?.media;
            data = step2;
          }
        });
        const json_object = {
          short_url: "https://facebook.com/watch/?v=" + data?.id,
          video_url: data?.browser_native_hd_url,
          caption: caption,
          status: 200
        };
        return JSON.stringify(json_object);
      } else {
        body("script").each((i, el) => {
          const script = body(el).html();
          if (script.includes("VideoPlayerShakaPerformanceLoggerConfig")) {
            scripts.push(script);
          }
        });
        const json_media = JSON.parse(scripts[0]).require[0];
        let data;
        let caption;
        json_media[json_media.length - 1][0]?.__bbox?.require.forEach(el => {
          if (el[0] == "RelayPrefetchedStreamCache") {
            const step1 = el[el.length - 1];
            const step2 = step1[step1.length - 1]?.__bbox?.result?.data?.video?.creation_story;
            data = step2.short_form_video_context;
            caption = step2.message.text;
          }
        });
        const json_object = {
          short_url: data?.shareable_url.replace("www.",""),
          video_url: data?.playback_video.browser_native_hd_url,
          caption: caption,
          status: 200
        };
        return JSON.stringify(json_object);
      }
    };

    if (url.includes("facebook.com/watch") || url.includes("fb.watch/") || url.includes("fb.gg/")) {
      return await dataFetch(url, false);
    } else if (url.includes ("/videos/")) {
      const id = obtenerIDDesdeURL(url);
      return await dataFetch("https://www.facebook.com/watch/?v=" + id, false);
    } else if (url.includes("facebook.com/reel")) {
      return await dataFetch(url, true);
    } else {
      console.log("Invalid url");
      return JSON.stringify({status: 400});
    }
  };

  const retryScrap = async () => {
    try {
      return await scrap();
    } catch (error) {
      console.log(error);
      if (count < maxTries) {
        count++;
        return await retryScrap();
      } else {
        const json_error = {status: 429};
        return JSON.stringify(json_error);
      }
    }
  };

  return new JsResponse(await retryScrap());
});

router.get("/dc/tiktok-video-scrapper?", async (req, env) => {
  const { query } = req;
  const url = decodeURIComponent(query.url);
  let count = 0;
  let maxTries = 3;
  if (url.includes("tiktok.com/")) {
    console.log("es link de tiktok");
    const scrap = async () => {
      const fetchTikTokMobile = await fetch(url);
      const html = await fetchTikTokMobile.text();
      const body = cheerio.load(html);
      const scripts = [];
      body("script").each((i, el) => {
        const script = body(el).html();
        if (script.includes("\"ItemModule\"")) {
          scripts.push(script);
        }
      });
      const json = JSON.parse(scripts).ItemModule;
      const tt_id = jp.query(json, "$..[?(@.id)].id")[0];
      console.log(tt_id);
      const response = await fetch(`https://api.tiktokv.com/aweme/v1/feed/?aweme_id=${tt_id}`);
      const data = await response.json();
      const video_url = data.aweme_list[0].video.play_addr.url_list[0];
      const caption = (data.aweme_list[0].desc).trim().replace(/\s+$/, "");
      console.log(video_url);
      const json_response = {
        video_url: video_url,
        short_url: "https://m.tiktok.com/v/"+ tt_id,
        caption: caption,
        status: 200
      };
      return JSON.stringify(json_response);
    };
    const retryScrap = async () => {
      try {
        return await scrap();
      } catch (error) {
        console.log(error);
        if (count < maxTries) {
          count++;
          return await retryScrap();
        } else {
          const json_error = {status: 429};
          return JSON.stringify(json_error);
        }
      }
    };
    return new JsResponse(await retryScrap());
  } else {
    console.log("no es link de tiktok");
    return new JsResponse("Url no válida");
  }
});

router.get("/dc/twitter-video-scrapper?", async (req, env) => {
  const { query } = req;
  const url = decodeURIComponent(query.url);
  const graphql = "https://twitter.com/i/api/graphql/xOhkmRac04YFZmOzU9PJHg";
  if (url.includes("twitter.com/")) {
    console.log("es link de twitter");
    const id = obtenerIDDesdeURL(url);
    const tweetQuery = `TweetDetail?variables={"focalTweetId":"${id}","with_rux_injections":false,"includePromotedContent":true,"withCommunity":true,"withQuickPromoteEligibilityTweetFields":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true}&features={"rweb_lists_timeline_redesign_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}&fieldToggles={"withArticleRichContentState":false}`;
    const eTweetQuery = encodeURI(tweetQuery);
    const fetchTweet = await fetch(`${graphql}/${eTweetQuery}`, {
      headers: {
        "cookie": env.x_cookie,
        "user-agent": env.user_agent,
        ["sec-fetch-site"]: "same-origin",
        "Authorization": `Bearer ${env.twitter_bearer_token}`,
        "X-Twitter-Active-User": "yes",
        "X-Twitter-Auth-Type": "OAuth2Session",
        "X-Twitter-Client-Language": "en",
        "X-Csrf-Token": "0144e92ab3ad369187f2103484b8feec2d908204fdd66c97d891c468e07f7a57f2ced9f28b923d2e884f4854bf0d9b2accc07444d50a5d35b0e1afbb9bf563b926e5310e13dd28a34c098d6e3169a402"
      }
    });
    const result = await fetchTweet.json();
    const data = result.data?.threaded_conversation_with_injections_v2?.instructions[0]?.entries[0]?.content?.itemContent?.tweet_results?.result?.legacy;
    console.log(data);
    if (data?.extended_entities?.media[0]?.video_info) {
      const videos = data.extended_entities.media[0].video_info.variants;
      const short_url = data.extended_entities.media[0].url;
      const caption = data.full_text.replace(/https:\/\/t\.co\/\w+/g, "").trim();
      console.log(videos);
      let maxBitrate = 0;
      let video_url = "";
      for (const video of videos) {
        if (video.content_type === "video/mp4" && video.bitrate && video.bitrate > maxBitrate) {
          maxBitrate = video.bitrate;
          video_url = video.url;
        }
      }
      console.log(video_url);
      const json_response = {
        video_url: video_url,
        short_url: short_url,
        caption: caption,
        status: 200
      };
      return new JsResponse(JSON.stringify(json_response));
    } else {
      console.log("no es video");
      return new JsResponse(JSON.stringify({ status: 404 }));
    }
  } else {
    console.log("no es link de twitter");
    return new JsResponse("Url no válida");
  }
});

router.get("/dc/stable-diffusion?", async (req, env, ctx) => {
  const { query } = req;
  const key = env.stable_diffusion_token;
  const prompt = decodeURIComponent(query.prompt);
  let nsfw_checker = decodeURIComponent(query.nsfw_check);
  let extra_prompt;
  let extra_negative_prompt;
  if (nsfw_checker == "0") {
    nsfw_checker = "no";
    extra_prompt = "";
  } else {
    nsfw_checker = "yes";
    extra_prompt = ", highly detailed, f/1.4, ISO 200, 1/160s, 8K";
    extra_negative_prompt = ", (((NSFW))), ((unclothed))";
  }
  const configuration = new Configuration({
    apiKey: env.openai_token,
    baseOptions: {
      adapter: fetchAdapter
    }
  });
  const openai = new OpenAIApi(configuration);
  const IA = async() => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate this words into 1. English\n${prompt.replace(/black/gi, "dark")}\n1. `,
      temperature: 0.6,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  };
  const translatedPrompt = await IA();

  const apiFetch = async () => {
    const apiUrl = "https://stablediffusionapi.com/api/v3/dreambooth";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "key": key,
        "model_id": "anything-v5",
        "prompt": translatedPrompt.replace(/black/gi, "dark") + extra_prompt,
        "negative_prompt": "boring, bad art, (extra fingers), out of frame, mutated hands, poorly drawn hands, poorly drawn face, deformed, disfigured, ugly, blurry, bad anatomy, bad proportions, ((extra limbs)), cloned face, skinny, glitchy, (double torso), (double body), ((extra arms)), ((extra hands)), mangled fingers, missing lips, ugly face, distorted face, extra legs, watermark" + extra_negative_prompt,
        "width": "816",
        "height": "816",
        "samples": "1",
        "enhance_prompt": "no",
        "num_inference_steps": "30",
        "seed": null,
        "guidance_scale": "7.5",
        "safety_checker": "no",
        "multi_lingual": "yes",
        "webhook": null,
        "track_id": null
      })
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log("Primer fetch");
    return await data;
  };

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const fetched = await apiFetch();
  const id = String(fetched.id);
  console.log(fetched);
  const comprobarFetch = async (fetched) => {
    if (fetched.status === "success" || fetched.status === "error") {
      if (fetched.status === "success") {
        const imgur = new imgurApi(env.imgur_client_id, env.imgur_client_secret);
        const cloudflare = new cloudflareApi(env.cf_account_id, env.cf_api_token);
        const users_keys = await cloudflare.getKeyValueList("AUTH_USERS");
        const imgur_user = "imgur_ahmedrangel";
        let imgur_url = (await Promise.all((users_keys.map(async(users_keys) => {
          if (imgur_user == users_keys.key) {
            const { access_token } = await imgur.RefreshToken(users_keys.value);
            const respuesta = await imgur.UploadImage(access_token, prompt, fetched.output[0], "Stable Diffusion: Anything-v5");
            const imgurl = respuesta.data.link;
            console.log(imgurl);
            return imgurl;
          }
        })))).filter(users_keys => users_keys);
        console.log("subido a imgur");
        return {output: [imgur_url]};
      } else {
        console.log("error");
        return {output: ["error"]};
      }
    } else {
      console.log("refetcheando");
      await delay(2000);
      const apiUrl = `https://stablediffusionapi.com/api/v3/dreambooth/fetch/${id}`;
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          "key": key,
          "request_id": id
        }),
        redirect: "follow"
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      return await comprobarFetch(data);
    }
  };
  const response = await comprobarFetch(fetched);
  return new JsResponse(response.output[0]);
});

router.get("/dc/kick-live?", async (req, env) => {
  const { query } = req;
  const channel = query.channel;
  const check = query.check;
  const status = Number(await env.KICK_LIVE_CHECK.get(channel));
  console.log(channel + "-" + check + "-" + status);
  let response;
  if (check == 1 && status == 0) {
    await env.KICK_LIVE_CHECK.put(channel, 1, {metadata: {value: 1},});
    console.log("Está en vivo, se hace put 1 en KV");
    response = {notificar: true};
  } else if (check == 1 && status == 1) {
    console.log("Está en vivo, ya hay 1 en KV, no se hace put");
    response = {notificar: false};
  } else if (check == 0 && status == 0) {
    console.log("No está en vivo, ya hay 0 en KV, no se hace put");
    response = {notificar: false};
  } else if (check == 0 && status == 1) {
    await env.KICK_LIVE_CHECK.put(channel, 0, {metadata: {value: 0},});
    console.log("No está en vivo, hay 1 en KV, se hace put 0 en KV");
    response = {notificar: false};
  }
  return new JsResponse(JSON.stringify(response));
});

// Nightbot command: Followage
router.get("/followage/:channel/:touser", async (req, env) => {
  const { channel, touser } = req.params;
  const twitch = new twitchApi(env.client_id, env.client_secret);
  const auth_list = (await env.AUTH_USERS.list()).keys;
  const response = (await Promise.all((auth_list.map(async(users_keys) => {
    const channel_id = await twitch.getId(channel);
    if (channel_id === users_keys.name) {
      const touser_id = await twitch.getId(touser);
      const access_token = await twitch.RefreshToken(users_keys.metadata.value);
      const data = await twitch.getChannelFollower(access_token, channel_id, touser_id);
      if (data?.followed_at) {
        const unitsString = getTimeUnitsFromISODate(data?.followed_at);
        return `${touser} ha estado siguiendo a ${channel} por ${unitsString}`;
      }
      return `${touser} no está siguiendo a ${channel}`;
    }
  })))).filter(users_keys => users_keys);
  console.log(response);
  return new JsResponse(response);
});

router.all("*", () => new Response("Not Found.", { status: 404 }));

export default {
  async fetch(req, env, ctx) {
    return router.handle(req, env, ctx);
  }
};