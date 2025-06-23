##Docker
Pasos para levantar el sitio en Docker:

-instalar docker desktop
-abrir un CMD con permisos de administrador  en la raiz del proyecto
-ejecutar los siguientes comandos:
    docker build -t cryptoapp .
    docker run -d -p 5173:80 cryptoapp

-acceder desde el navegador a: http://localhost:5173


## Análisis de Vulnerabilidades

Se utilizó la herramienta 'Snyk' para escanear las dependencias del proyecto.

Comando utilizado:
    npm install -g snyk
    snyk test

