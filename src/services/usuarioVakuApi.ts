import axios from "axios";

export type User = {
  id: number;
  password: string;
  displayName: string;
  uid: string;
  error: string;
};

export type GetUsersResponse = {
  data: User[] | User;
};

export async function createUserAuth(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    try {
      axios
        .post<GetUsersResponse>(import.meta.env.VITE_FUNCTION_CREATE_USER, {
          email: email,
          password: password,
          displayName: displayName,
        })
        .then((response) => {
          const { data, status } = response;
          if (status === 200 || status === 201) {
            const userAuth = Array.isArray(response.data)
              ? response.data[0]
              : response.data;
            resolve(userAuth);
          } else {
            reject(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}
