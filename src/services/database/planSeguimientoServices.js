import { child, get, ref } from "firebase/database";
import { database } from "../config";

/**
 * It gets the planes de seguimiento for a given empresa
 * @param empresa - El DNI de la empresa
 * @returns Una matriz de objetos.
 */
export const getPlanesSeguimiento = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/planesDeSeguimiento`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

/**
 * Obtiene un plan de seguimiento de la base de datos
 * @param id - la identificación del plan
 * @param empresa - El ID de la empresa
 * @returns A plan de seguimiento
 */
export const getPlanSeguimiento = async (id, empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/planesDeSeguimiento/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    return false;
  }
};