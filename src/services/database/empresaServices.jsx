import { database } from "@services/config";
import { child, get, ref, set } from "firebase/database";

/**
 * Obtiene la configuración activa para una determinada empresa.
 * @param empresa - el nombre de la empresa
 */
export const getActive = async (empresa) => {
  try {
    var snapshot = await get(
      child(ref(database), `empresas/${empresa}/config`)
    );
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};
/**
 * Obtiene el objeto utils de la base de datos.
 * @param empresa - El nombre de la empresa.
 */

export const getUtils = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/utils`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

export const getEmpresas = async () => {
  try {
    var snapshot = await get(child(ref(database), `empresas`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

export const addEmpresas = async (empresa) => {
  try {
    const dbRef = ref(database, `empresaCompact/${empresa.id}`);

    const nuevoObjetoRef = await set(dbRef, empresa);
    console.log(nuevoObjetoRef.key);
    console.log(nuevoObjetoRef);
    return empresa;
  } catch (err) {
    console.log(false);
    return false;
  }
};

export const getEmpresasArray = async () => {
  try {
    var snapshot = await get(child(ref(database), `empresaCompact`));
    if (snapshot.exists()) {
      const empresaObj = snapshot.val();
      const empresaArr = Object.values(empresaObj);
      return empresaArr;
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

export const getEmpresaById = async (id) => {
  try {
    const snapshot = await get(child(ref(database), `empresas/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
