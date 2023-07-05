import { child, get, push, ref, set, update } from "firebase/database";
import { database } from "../config";
import contenido from "../contenido.json";



export const getDivisionesArray = async (empresa, gerencia) => {
  let divisionesArr = []
  try {
    const snapshot = await get(child(ref(database), `empresas/${empresa}/gerencias/${gerencia}/divisiones`));
    if (snapshot.exists()) {
      const divisionesObj = snapshot.val();
      //Se filtra la lista solo con los datos que no esten eliminados
      divisionesArr = Object.values(divisionesObj).filter((item) => !item.isEliminado);
    }
    return divisionesArr;
  } catch (err) {
    return divisionesArr;
  }
};



export async function deleteDivision(empresa, gerencia, division) {

  try {
    await update(ref(database, `empresas/${empresa}/gerencias/${gerencia}/divisiones/${division}`), {
      isEliminado: true
    });

  } catch (error) {
    console.error('Error al eliminar división:', error);
  }
}




export async function guardarDatosEnFirebase(values, empresa, gerencia) {
  try {
    const dbRef = ref(database, `empresas/${empresa}/gerencias/${gerencia}/divisiones`);
    // Generar una nueva ID para el objeto
    const nuevoObjetoRef = push(dbRef);

    // Guardar información predefinida de json en "contenido"
    values.id = nuevoObjetoRef.key
    values.contenido = contenido
    values.contenido.id = nuevoObjetoRef.key
    values.contenido.nombre = values.nombre

    // Guardar los datos en la base de datos utilizando la nueva ID generada
    await set(nuevoObjetoRef, values);


  } catch (error) {
    console.error("Error al guardar datos en Firebase:", error);
  }
}