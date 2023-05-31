# Instrucciones para hacer deploy

## login para Firebase

En caso de que ya se este logeado saldra el mensaje correspondiente

```console
vaku-dev:~$ firebase login
✔  Logged out from javier.malebran@vaku.cl
```

Para poder realizar el login de firebase a cli

```console
vaku-dev:~$ firebase login
htps://policies.google.com/privacy) and is not used to identify you.

? Allow Firebase to collect CLI and Emulator Suite usage and error reporting information?
```

Presionar Y

Para asegurar en que proyecto estamos

```console
vaku-dev:~$ firebase use [id-Proyecto]
```

ejemplo:

```console
vaku-dev:~$ firebase use vaku-89121
```

## Deploy de funcionalidad a produccion

Ejecutar la siguiente linea

```console
vaku-dev:~$ firebase deploy --only  hosting:[id-Hosting]
```

Para poder verificar cual es el id del hosting revisar el archivo firebase.json

```json
{
  "hosting": {
    "public": "build",
    "site": "vaku-admin",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
  },
  ....
}
```

El campo site contendra el hosting que esta configurado el proyecto

Ejemplo

```console
vaku-dev:~$ firebase deploy --only  hosting:vaku-admin
```

posterior a eso se debe realizar un tag con la version que ha sido deployada

para mostrar las tag que se han hecho

```console
vaku-dev:~$ git tag
```

para configurar el Tag en local

```console
vaku-dev:~$ git tag 1.2.100
```

para configurar el Tag en local

```console
vaku-dev:~$ git tag 1.2.100
```
