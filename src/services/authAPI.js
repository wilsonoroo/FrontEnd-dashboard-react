import { signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import { basePath } from '../config/config';
import { auth } from "./config";
import { getUsuarioByUid } from "./database/usuariosServices";
import { getAccessToken } from './token';

export async function ingresarUsuarioApi(email, password) {
  const url = `${basePath}/login`;
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }
  try {
    const response = await fetch(url, params);
    return response;

  } catch (err) {
    console.log(err);
  }

}

export async function loginUsuarioVakuWithToken(token) {
  try {
    console.log(token)

    let result = await signInWithCustomToken(auth, token)


    let usuarioVaku = getUsuarioByUid(result.user.uid)
    console.log(result)
    return {
      status: 200,
      user: result.user,
      token: result.user.accessToken
    }

  } catch (error) {
    console.log(error)
  }


}

export async function loginUsuarioVaku(email, password) {
  try {
    console.log(auth, email, password)
    let result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result.user.uid)
    let usuarioVaku = getUsuarioByUid(result.user.uid)
    console.log(result)
    return {
      status: 200,
      user: result.user,
      token: result.user.accessToken
    }

  } catch (error) {
    console.log(error)
  }


}

export async function reIngresarUsuarioApi() {
  const url = `${basePath}/token`;

  const params = {
    method: "GET",
    'mode': 'cors',
    headers: {
      "Authorization": getAccessToken(),
      'Content-Type': 'application/json',
      crossorigin: true,
    }
  }
  try {
    const response = await fetch(url, params);
    const data = await response;
    return data;

  } catch (err) {
    console.log(err);
  }
}