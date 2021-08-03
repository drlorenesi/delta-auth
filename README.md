# Node Auth

Este proyecto es una aplicación básica, tipo REST API, para autenticar y crear sesiones de usuarios usando
[Express](https://expressjs.com/) y Base de Datos [mongoDB](https://www.mongodb.com/).

Crea un archivo tipo `.env` en el folder raíz con la siguiente información:

```text
JWT_SIGNATURE=
MONGO_URL=
BASE_URL=

/* Optional */
SENTRY=
```

Asegurate que los valores de este archivo estén de acuerdo al entorno:

- producción (production)
- desarrollo (dev)
- pruebas (test)

Iniciar la aplicación en modo `produccion`:

```bash
npm start
```

o en modo `desarrollo`

```bash
npm run dev
```

Se pueden correr las pruebas con:

```bash
npm run test
```
