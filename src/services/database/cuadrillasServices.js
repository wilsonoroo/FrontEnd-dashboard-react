import { child, get, ref, set, update } from "firebase/database";
import { database } from "../config";

export const getCuadrillas = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/cuadrillas`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

export const getCuadrilla = async (id, empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/cuadrillas/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    return false;
  }
};

export const updateCuadrillaById = async (uid, data, empresa) => {
  try {
    console.log(uid, data, empresa);
    const caca = await update(ref(database, `empresas/${empresa}/cuadrillas/${uid}`), data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export async function crearCuadrilla(data, empresa) {
  try {

    await set(ref(database, `empresas/${empresa}/cuadrillas/${data.id}`), data);

    return true;
  } catch (err) {
    return false;
  }
}