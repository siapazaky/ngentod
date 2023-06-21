export const getRandom = (max) => {
    return Math.round((Math.random() * (max - 1)) + 1);
};

export const getDateAgoFromTimeStamp = (timestamp) => {
let timestampEspecifico = timestamp;
let fechaActual = new Date().getTime();
let diferencia = fechaActual - timestampEspecifico;

let segundos = Math.round(diferencia / 1000);
let minutos = Math.round(segundos / 60);
let horas = Math.round(minutos / 60);
let dias = Math.round(horas / 24);
let meses = Math.round(dias / 30);

let unidadTiempo;
let cantidad;

if (meses > 0) {
  unidadTiempo = "mes";
  cantidad = meses;
} else if (dias > 0) {
  unidadTiempo = "día";
  cantidad = dias;
} else if (horas > 0) {
  unidadTiempo = "hora";
  cantidad = horas;
} else if (minutos > 0) {
  unidadTiempo = "minuto";
  cantidad = minutos;
} else {
  unidadTiempo = "segundo";
  cantidad = segundos;
}

// Verificar singular o plural
if (cantidad !== 1) {
  if (unidadTiempo == "mes") {
    unidadTiempo += "es";
  } else {
    unidadTiempo += "s";
  }
}

let strTime = `${cantidad} ${unidadTiempo}`;
return strTime;
};

export const generateUniqueId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';
  
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    uniqueId += randomChar;
  }
  
  return uniqueId;
}

// Solo toma encuenta si el ID se encuentra en el slash final y no en un query
export const obtenerIDDesdeURL = (url) => {
  const expresionRegular = /\/([a-zA-Z0-9_-]+)(?:\.[a-zA-Z0-9]+)?(?:\?|$|\/$)/;
  const resultado = expresionRegular.exec(url);
  if (resultado && resultado.length > 1) {
    return resultado[1];
  } else {
    return null;
  }
}