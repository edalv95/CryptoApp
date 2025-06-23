## 🚀 Docker

### 🛠️ Pasos para levantar el sitio en Docker:

1. Instalar **Docker Desktop** desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Abrir una terminal (CMD o PowerShell) con **permisos de administrador** en la raíz del proyecto.
3. Ejecutar los siguientes comandos:

   ```bash
   docker build -t cryptoapp .
   docker run -d -p 5173:80 cryptoapp
   ```

4. Acceder a la aplicación desde el navegador en:  
   👉 [http://localhost:5173](http://localhost:5173)

---

## 🛡️ Análisis de Vulnerabilidades

Se utilizó la herramienta **[Snyk](https://snyk.io/)** para analizar las dependencias del proyecto en busca de vulnerabilidades de seguridad conocidas.

### 🔍 Comandos utilizados:

```bash
npm install -g snyk
snyk test
```

El análisis permitió identificar paquetes potencialmente inseguros, indicando su nivel de severidad y recomendaciones para su actualización.
