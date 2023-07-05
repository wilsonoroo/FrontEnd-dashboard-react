import { child, get, ref, set, update } from "firebase/database";
import { database } from "../config";

export const getVehiculos = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/vehiculos`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getVehiculosArray = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/vehiculos`));
    if (snapshot.exists()) {
      const vehiculoObj = snapshot.val();
      const vehiculoArr = Object.values(vehiculoObj);
      return vehiculoArr;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getVehiculo = async (id, empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/vehiculos/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    return false;
  }
};

export const updateVehiculoById = async (uid, data, empresa) => {
  try {

    const caca = await update(ref(database, `empresas/${empresa}/vehiculos/${uid}`), data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export async function crearVehiculo(data, empresa) {
  try {
    console.error(err);
    await set(ref(database, `empresas/${empresa}/vehiculos/${data.id}`), data);

    return true;
  } catch (err) {
    return false;
  }
}

export async function eliminarVehiculo(vehiculoId, empresa) {
  try {
    await update(ref(database, `empresas/${empresa}/vehiculos/${vehiculoId}`), {
      isEliminado: true
    });
    console.error(err);

    return true;

  } catch (err) {
    console.error(err);
    return false;
  }
}
