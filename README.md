![nodejs-image]
![npm-image]

# Proyecto de backend para prueba tecnica
Este proyecto es creado con el objetivo de demostrar el uso y conocimiento de las tecnologias al momento de desarrollar un backend.

## Librerias utilizadas en el proyecto
| Libreria  | Uso en el proyecto |
| ------------- | ------------- |
| express  | Permite desarrollar la aplicacion de servidor  |
| sequelize | Permite manipular la base de datos de forma mas ordenada en el codigo  |
| sqlite3 | Se utilizo como base de datos primaria  |
| swagger-ui-express | Permite crear documentacion y un panel para probar los apis de forma rapida  |
| nodemon | Util para desarrollar de forma continua  |
| jest | Para realizar pruebas de todo tipo  |
| supertest | Para realizar las pruebas de integracion a la aplicacion express  |
| tsoa | Para generar el archivo swagger con la documentacion |
| dotenv | Para administrar las variables de entorno del proyecto |
| joi-typescript-validator | Permite validar objetos de entrada en los apis |


## Requerimientos
Es necesario tener instalados las siguientes herramientas para el correcto funcionamiento del proyecto\
NodeJs v18.14.0 o superior\
npm v9.3.1


## Variables de entorno
Asegurarse de tener un archivo .env en el root del proyecto con las siguientes propiedades llenas
```
PORT=3000
```

## Instalación
Antes de ejecutar los comandos asegurese de estar en la ruta del proyecto.
```sh
npm install
```

## Scripts
Compila el proyecto a javascript y lo genera en la carpeta dist
```sh
npm run build
```

Ejecuta el proyecto en forma de desarrollo para trabajar en el
```sh
npm run dev
```

Ejecuta el proyecto compilado en javascript
```sh
npm run start
```

Ejecuta las pruebas necesarias con jest
```sh
npm run test
```

Crea el JSON necesario para la documentación en swagger
```sh
npm run swagger
```

## Docker
El proyecto se puede ejecutar en un contenedor de docker ya cuenta con los archivos necesarios para su correcto funcionamiento, ademas de crear la imagen se ejecutan las pruebas unitarias e integrales necesarias antes de crear la imagen, a continuacion los comandos en orden para lanzar la aplicación con docker de forma local.

El siguiente comando construye la imagen docker realizando las pruebas necesarias, se puede usar el nombre que se requiera
```sh
docker build . -t todo-list-backend
```


El siguiente comando pone en marcha la imagen de docker en un contenedor e inicia el backend para consumirlo mediante el puerto 3000, el puerto de salida se puede cambiar al que se requiera, y el nombre de la imagen debe ser el mismo escogido en el paso anterior.
```sh
docker run -p 3000:3000 -d todo-list-backend
```

Una vez ejecutados los comandos se puede realizar pruebas con postman a la ruta <a href="localhost:3000">http://localhost:3000</a>, de igual forma se puede ver la documentacion de swagger que se muestra en el siguiente punto.

## Github Actions
Se agrego un apartado para ejecutar las pruebas cada vez que se haga un pull request o un push a la rama principal.

## Documentacion 
Para ver la documentación en desarrollo se accede a <a href="localhost:3000/docs">http://localhost:3000/docs</a>

Proyecto desarrollado por <a href="https://github.com/jaimejosu3">jaimejosu3</a> 



[nodejs-image]: https://badgen.net/badge/nodejs/18.14.0/green
[npm-image]: https://badgen.net/badge/npm/9.3.1/cyan