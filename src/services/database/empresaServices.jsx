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
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    return [];
  }
};

export const addEmpresas = async (empresa) => {
  try {
    const dbRef = ref(database, `empresasCompact/${empresa.id}`);

    const nuevoObjetoRef = await set(dbRef, empresa);

    return empresa;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getEmpresasArray = async () => {
  try {
    var snapshot = await get(child(ref(database), `empresasCompact`));
    if (snapshot.exists()) {
      const empresaObj = snapshot.val();

      const empresaArr = Object.values(empresaObj);
      return empresaArr;
    }
  } catch (err) {
    console.error(err);
    return [];
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
    console.error(err);
    return null;
  }
};

export const getLogoEmpresa = async (id, isUserDT = false) => {
  try {
    if (!isUserDT) {
      const snapshot = await get(
        child(ref(database), `empresas/${id}/config/logo`)
      );
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } else {
      return "https://firebasestorage.googleapis.com/v0/b/vaku-89121.appspot.com/o/logo_dt.jpeg?alt=media&token=d36aa2ed-d291-4a6c-a782-2617ca7a3869";
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
