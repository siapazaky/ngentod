export const getRandom = (max) => {
  return Math.round((Math.random() * (max - 1)) + 1);
};

export const getDateAgoFromTimeStamp = (timestamp) => {
  let timestampEspecifico = timestamp;
  let fechaActual = new Date().getTime();
  let diferencia = fechaActual - timestampEspecifico;

  let segundos = Math.floor(diferencia / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);
  let meses = Math.floor(dias / 30);

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
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    uniqueId += randomChar;
  }

  return uniqueId;
};

// Solo toma encuenta si el ID se encuentra en el slash final y no en un query
export const obtenerIDDesdeURL = (url) => {
  const expresionRegular = /\/([a-zA-Z0-9_-]+)(?:\.[a-zA-Z0-9]+)?(?:\?|$|\/\?|\/$)/;
  const resultado = expresionRegular.exec(url);
  if (resultado && resultado.length > 1) {
    return resultado[1];
  }
  return null;
};

export const getTimeUnitsFromISODate = (ISO) => {
  // Fecha proporcionada
  const targetDate = new Date(ISO);

  // Fecha actual
  const today = new Date();

  // Calcula la diferencia en milisegundos
  const msdiff = today - targetDate;

  // Calcula las unidades de tiempo
  const unMinuto = 60 * 1000; // milisegundos en un minuto
  const unaHora = unMinuto * 60; // milisegundos en una hora
  const unDia = unaHora * 24; // milisegundos en un día
  const unMes = unDia * 30.4375; // milisegundos en un mes
  const unAnio = unDia * 365.242189; // milisegundos en un año

  const anios = Math.floor(msdiff / unAnio);
  const meses = Math.floor((msdiff % unAnio) / unMes);
  const dias = Math.floor((msdiff % unMes) / unDia);
  const horas = Math.floor((msdiff % unDia) / unaHora);
  const minutos = Math.floor(msdiff % unaHora / unMinuto);

  // Construye el resultado
  const unidades = [];

  if (anios > 0) {
    unidades.push(`${anios} año${anios !== 1 ? "s" : ""}`);
  }

  if (meses > 0) {
    unidades.push(`${meses} mes${meses !== 1 ? "es" : ""}`);
  }

  if (dias > 0) {
    unidades.push(`${dias} día${dias !== 1 ? "s" : ""}`);
  }

  if (horas > 0) {
    unidades.push(`${horas} hora${horas !== 1 ? "s" : ""}`);
  }

  if (minutos > 0 && anios === 0) {
    unidades.push(`${minutos} minuto${minutos !== 1 ? "s" : ""}`);
  }

  const result = unidades.join(", ");
  return result;
};

export const KVSorterByValue = (KVarray) => {
  return KVarray.sort((a, b) => {
    if (a.metadata.value > b.metadata.value) {
      return -1;
    }
  });
};

export const jsonCustomSorterByProperty = (array, customOrderArray, property) => {
  return array.sort((a, b) => {
    const indexA = customOrderArray.indexOf(a[property]);
    const indexB = customOrderArray.indexOf(b[property]);
    if (indexA === -1 && indexB === -1) {
      return 0;
    }
    if (indexA === -1) {
      return 1;
    }
    if (indexB === -1) {
      return -1;
    }
    return indexA - indexB;
  });
};