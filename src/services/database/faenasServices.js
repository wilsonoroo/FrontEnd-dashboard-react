import { child, get, ref, set, update } from "firebase/database";
import { database } from "../config";

/**
 * Obtiene las faenas de una empresa de la base de datos
 * @param empresa - la identificación de la compañía
 * @returns Un objeto con las faenas de la empresa.
 */
export const getFaenas = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/faenas`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

export const getFaenasArray = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/faenas`));
    if (snapshot.exists()) {
      const faenasObj = snapshot.val();
      const faenasArr = Object.values(faenasObj);
      return faenasArr;
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};
/**
 * Obtiene una faena de la base de datos.
 * @param id - la identificación de la faena
 * @param empresa - La identificación de la empresa
 * @returns Una promesa que se resuelve en el valor de la instantánea.
 */

export const getFaena = async (id, empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/faenas/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    return false;
  }
};

/**
 * Actualiza una faena en la base de datos
 * @param uid - la identificación de la faena
 * @param data - {
 * @param empresa - la identificación de la empresa
 * @returns Un valor booleano.
 * TODO: DEPURAR CODIGO Y NOMBRRE DE VARIBLES 
 */
export const updateFaenaById = async (uid, data, empresa) => {
  try {
    console.log(uid, data, empresa);
    const caca = await update(ref(database, `empresas/${empresa}/faenas/${uid}`), data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * Crea una nueva faena en la base de datos.
 * @param data - Los datos que se escribirán en la base de datos.
 * @param empresa - la identificación de la empresa
 * @returns Una promesa
 */
export async function crearFaena(data, empresa) {
  try {

    await set(ref(database, `empresas/${empresa}/faenas/${data.id}`), data);

    return true;
  } catch (err) {
    return false;
  }
}

export async function eliminarFaena(faenaId, empresa) {
  // const db = getDatabase();

  try {
      await update(ref(database, `empresas/${empresa}/faenas/${faenaId}`), {
          isEliminado: true
      });
      console.log("Faena eliminada correctamente");

      return true;

  } catch (err) {
      console.log(err);
      return false;
  }
}