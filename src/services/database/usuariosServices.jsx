import { database, storage } from "@services/config/index";
import { child, get, push, ref, set, update } from "firebase/database";
import { ref as ref2, uploadBytes } from "firebase/storage";
import { pickBy } from "lodash";

import axios from "axios";
//import admin from "firebase-admin";

/**
 * Obtiene los usuarios de la base de datos y devuelve una promesa con los usuarios.
 * @param empresa - La identificación de la empresa
 */
export const subirImagen = (image, ruta, uuid) => {
  const storageRef = ref2(
    storage,
    `${ruta}/${uuid}.${image.name.split(".").at(-1)}`
  );
  return uploadBytes(storageRef, image).then((snapshot) => {
    return `https://firebasestorage.googleapis.com/v0/b/vaku-dev.appspot.com/o/${snapshot.metadata.fullPath}?alt=media`;
  });
  /* const uploadTask = uploadBytesResumable(ref2(storage, `${ruta}/${uuid}.${image.name.split(".").at(-1)}`), image);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  let imagen;
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        imagen = downloadURL;
      });
    }
  );
  console.log("hola");
  console.log(imagen);
  return imagen; */
};
export const getUsers = (empresa) => {
  return new Promise((resolve, reject) => {
    try {
      get(child(ref(database), `empresas/${empresa}/usuarios/auth`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            var returnArr = [];

            snapshot.forEach(function (childSnapshot) {
              var item = childSnapshot.val();
              item.key = childSnapshot.key;
              if (item.key !== "undefined") {
                returnArr.push(item);
              }
            });
            resolve(returnArr);
            return snapshot.val();
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          reject(false);
        });
    } catch (error) {
      reject(false);
    }
  });
};

/**
 * Devuelve una promesa que se resuelve en el valor de la referencia de la base de datos en la ruta
 * "auth"
 * @param value - El valor de la dirección de correo electrónico.
 */
export const getUserByEmail = (value) => {
  return new Promise((resolve, reject) => {
    try {
      get(child(ref(database), "auth")).then((snapShot) => {
        resolve(snapShot.val());
      });
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
};

/**
 * Obtiene los usuarios de la base de datos.
 * @param empresa - el nombre de la empresa
 * @returns Una lista de usuarios
 */
export const getUsuarios = async (empresa) => {
  try {
    var snapshot = await get(
      child(ref(database), `empresas/${empresa}/usuarios/auth`)
    );
    if (snapshot.exists()) {
      // console.log('Usuarios obtenidos correctamente');
      const usuariosArr = Object.values(snapshot.val());
      return usuariosArr;
    }
  } catch (err) {
    return false;
  }
};

export const getUsuariosArray = async (empresa) => {
  try {
    const snapshot = await get(
      child(ref(database), `empresas/${empresa}/usuarios/auth`)
    );
    if (snapshot.exists()) {
      const usuariosObj = snapshot.val();
      const usuariosArr = Object.values(usuariosObj);
      return usuariosArr;
    }
  } catch (err) {
    return false;
  }
};

/**
 * Devuelve el objeto de usuario de la base de datos si existe, de lo contrario devuelve falso
 * @param uid - La identificación única del usuario.
 * @returns El objeto de usuario
 */
export const getUsuarioByUid = async (uid) => {
  try {
    var snapshot = await get(child(ref(database), `auth/${uid}`));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Obtiene los datos del usuario de la base de datos.
 * @param uid - La identificación del usuario.
 * @param empresa - El ID de la empresa
 * @returns El objeto de usuario
 */
export const getUsuario = async (uid, empresa, gerencia, division) => {
  try {
    //empresas/shingeki_no_sushi-v2/gerencia-id_1/divisiones/division-id_1/contenido/usuarios/auth/jc7IxBgOnchtk91ftbPbcpvcsj33
    var snapshot = await get(
      child(
        ref(database),
        `empresas/${empresa}/gerencias/${gerencia}/divisiones/${division}/contenido/usuarios/auth/${uid}`
      )
    );
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    return false;
  }
};

/**
 * Actualiza la contraseña del usuario, luego actualiza los datos del usuario en la base de datos.
 * @param uid - La identificación única del usuario.
 * @param data - Los datos que desea almacenar en la base de datos.
 * @param empresa - La identificación de la empresa
 */
export const updateUsuarioByUid = async (uid, data, pass, empresa) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof pass !== "undefined")
        axios
          .post(`${process.env.REACT_APP_FUNCTION_UPDATE_PASSWORD}${uid}`, {
            email: data.email,
            password: pass,
            displayName: data.displayName,
          })
          .then(function (response) {
            if (response.status === 200) {
              const cleanedObject = pickBy(data, (v) => v !== undefined);

              return update(
                ref(database, `empresas/${empresa}/usuarios/auth/${uid}`),
                data
              );
            } else {
              throw Error(response.data);
            }
          })
          .then(function (result) {
            return set(ref(database, `auth/${uid}`), {
              email: data.email,
              empresaId: empresa,
              id: uid,
            });
          })
          .then(function () {
            resolve(true);
          })
          .catch(function (error) {
            // handle error

            reject(false);
          });
    } catch (err) {
      reject(false);
    }
  });
};

/**
 * Crea un usuario en Firebase auth, luego crea un usuario en la base de datos, luego crea un usuario
 * en la base de datos de autenticación
 * @param data - Los datos que desea almacenar en la base de datos.
 * @param email - La dirección de correo electrónico del usuario a crear.
 * @param password - La contraseña de la nueva cuenta.
 * @param empresa - El nombre de la compañía
 * @returns Una promesa que se resuelve en verdadero o falso.
 */
export async function crearUsuario(data, email, password, empresa) {
  let uid;
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(process.env.REACT_APP_FUNCTION_CREATE_USER, {
          email: email,
          password: password,
          displayName: empresa,
        })
        .then(function (response) {
          // handle success

          uid = response.data.uid;
          data.id = uid;
          const cleanedObject = pickBy(data, (v) => v !== undefined);

          return set(
            ref(
              database,
              `empresas/${empresa}/usuarios/auth/${response.data.uid}`
            ),
            cleanedObject
          );
        })
        .then(function (result) {
          return set(ref(database, `auth/${uid}`), {
            email: email,
            empresaId: empresa,
            id: uid,
          });
        })
        .then(function () {
          resolve(true);
        })
        .catch(function (error) {
          // handle error

          reject(false);
        });
    } catch (err) {
      reject(false);
    }
  });
}

export async function editUsuario() {
  const uid = "Q3BYHenrVwYxFY8Y4CsR91IFGT43";
  /* admin.auth().updateUser(uid, {
    email: "eren@gmai.com",
    phoneNumber: "+11234567890",
    emailVerified: true,
    password: "newPassword",
    displayName: "Jane Doe",
    photoURL: "http://www.example.com/12345678/photo.png"
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());
    })
    .catch(function(error) {
      console.log("Error updating user:", error);
    }); */
}

export async function eliminarUsuario(uId, empresa) {
  try {
    await update(ref(database, `empresas/${empresa}/usuarios/auth/${uId}`), {
      isEliminado: true,
    });

    return true;
  } catch (err) {
    return false;
  }
}

export async function guardarDatosEnFirebase(values, empresa) {
  try {
    const dbRef = ref(database, `empresas/${empresa}/usuarios/auth`);
    // Generar una nueva ID para el objeto
    const nuevoObjetoRef = push(dbRef);
    // Guardar los datos en la base de datos utilizando la nueva ID generada
    await set(nuevoObjetoRef, values);
  } catch (error) {
    console.error("Error al guardar datos en Firebase:", error);
  }
}

export async function editarUsuario(uId, empresa, nuevosDatos) {
  try {
    await update(
      ref(database, `empresas/${empresa}/usuarios/auth/${uId}`),
      nuevosDatos
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function moverUsuario(userId, empresaActualId, nuevaEmpresaId) {
  try {
    // Obtener los datos del usuario de la empresa actual
    const usuarioSnapshot = await get(
      ref(database, `empresas/${empresaActualId}/usuarios/auth/${userId}`)
    );

    // Obtener los datos del usuario como objeto JavaScript
    const usuarioData = usuarioSnapshot.val();

    // Eliminar el usuario de la empresa actual
    await eliminarUsuario(userId, empresaActualId);

    // Guardar los datos del usuario en la nueva empresa
    await guardarDatosEnFirebase(usuarioData, nuevaEmpresaId);

    return true;
  } catch (error) {
    console.error("Error al mover el usuario:", error);
    return false;
  }
}
