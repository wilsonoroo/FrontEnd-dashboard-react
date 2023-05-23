import { child, get, ref } from "firebase/database";
import { database } from "../config";

export const getDocumentos = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/documentos`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};