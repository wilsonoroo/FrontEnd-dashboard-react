import { child, get, push, ref, set, update } from "firebase/database";
import { database } from "../config";


export const getGerenciasArray = async (empresa) => {
  let gerenciasArr = []
  try {
    const snapshot = await get(child(ref(database), `empresas/${empresa}/gerencias/`));
    if (snapshot.exists()) {
      const gerenciasObj = snapshot.val();
      gerenciasArr = Object.values(gerenciasObj).filter((item) => !item.isEliminado);
    }
    return gerenciasArr;
  } catch (err) {
    return gerenciasArr;
  }
};



/**
 * Obtiene los datos de gerencia de la base de datos.
 * @param id - La identificación de gerencia.
 * @param empresa - El ID de la gerencia
 * @returns El objeto de gerencia
 */
export const getGerencia = async (id, empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/gerencias/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    return false;
  }
};



export async function deleteGerencia(empresa, gerencia) {

  try {
    /* await remove(gerenciaRef); */
    await update(ref(database, `empresas/${empresa}/gerencias/${gerencia}`), {
      isEliminado: true
    });
    console.log('Gerencia eliminado exitosamente.');
  } catch (error) {
    console.error('Error al eliminar gerencia:', error);
  }
}




export async function guardarDatosEnFirebase(values, empresa) {
  try {
    const dbRef = ref(database, `empresas/${empresa}/gerencias`);
    // Generar una nueva ID para el objeto
    const nuevoObjetoRef = push(dbRef);
    // Guardar los datos en la base de datos utilizando la nueva ID generada
    values.id = nuevoObjetoRef.key
    await set(nuevoObjetoRef, values);

    console.log("Datos guardados en Firebase");
  } catch (error) {
    console.error("Error al guardar datos en Firebase:", error);
  }
}