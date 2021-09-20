# Node Auth

Este proyecto es una aplicación básica, tipo REST API, para autenticar y crear sesiones de usuarios que utiliza [Express](https://expressjs.com/) y [mongoDB](https://www.mongodb.com/).

## Como Iniciar

Crea un archivo tipo `.env` en el folder raíz con la siguiente información:

```text
FIRMA_JWT=
URL_APP=
URL_MONGO=

# Opcional #
SENTRY=
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```

Si la aplicación no detecta esta información, no iniciará y desplegará "`ERROR TERMINAL: ...`" en la consola.

Asegurate que los valores de este archivo estén de acuerdo al entorno:

- produccion
- desarrollo
- pruebas

Iniciar la aplicación en modo `produccion`:

```bash
npm start
```

o en modo `desarrollo`:

```bash
npm run dev
```

En caso se agreguen pruebas, estas se pueden correr con:

```bash
npm run test
```
