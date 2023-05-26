import { child, get, ref } from "firebase/database";
import { database } from "../config";


export const getGerenciasArray = async (empresa) => {
  let gerenciasArr = []
  try {
    const snapshot = await get(child(ref(database), `empresaCompact/${empresa}/gerencias/`));
    if (snapshot.exists()) {
      const gerenciasObj = snapshot.val();
      gerenciasArr = Object.values(gerenciasObj).filter((item) => !item.isEliminado);
    }
    return gerenciasArr;
  } catch (err) {
    return gerenciasArr;
  }
};

export const getDivisionesPorGerencia = async (empresa, gerencia) => {
  console.log("🚀 ~ file: gerenciasServices.js:20 ~ getDivisionesPorGerencia ~ empresa, gerencia:", `empresaCompact/${empresa}/gerencias/${gerencia}/divisiones/`)

  let divisionesArr = []
  try {
    const snapshot = await get(child(ref(database), `empresaCompact / ${empresa} / gerencias / ${gerencia} / divisiones / `));
    if (snapshot.exists()) {
      const divisionesObj = snapshot.val();
      divisionesArr = Object.values(divisionesObj);
    }
    return divisionesArr;
  } catch (err) {
    return divisionesArr;
  }
}



/**
 * Obtiene los datos de gerencia de la base de datos.
 * @param id - La identificación de gerencia.
 * @param empresa - El ID de la gerencia
 * @returns El objeto de gerencia
 */
export const getGerencia = async (id, empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas / ${empresa} / gerencias / ${id}`));
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
    await update(ref(database, `empresas / ${empresa} / gerencias / ${gerencia}`), {
      isEliminado: true
    });
    console.log('Gerencia eliminado exitosamente.');
  } catch (error) {
    console.error('Error al eliminar gerencia:', error);
  }
}




export async function guardarDatosEnFirebase(values, empresa) {
  try {
    const dbRef = ref(database, `empresas / ${empresa} / gerencias`);
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

export async function guardarGerenciasEmpresas(values, empresa) {
  try {
    const dbRef = ref(database, `empresaCompact / ${empresa} / gerencias`);
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

export async function guardarDivisionGerenciasEmpresas(values, empresa, gerencia) {
  try {
    const dbRef = ref(database, `empresaCompact / ${empresa} / gerencias / ${gerencia} / divisiones`);
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