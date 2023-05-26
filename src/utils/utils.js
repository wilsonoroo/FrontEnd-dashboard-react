export function firstLetterUpperCase(valor) {
  return valor.charAt(0).toUpperCase() + valor.slice(1);
}

export function formatoPrecio(precio) {
  return precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
}

export function dateToString(valor) {
  try {
    if (valor) {
      return (new Date(valor)).toLocaleDateString();
    } else {
      return null;
    }

  } catch (err) {
    return "desconocido";
  }
}

