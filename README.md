
# Desarrollo

## 🖥️ Tecnologias Utilizadas:

-	**React**

-	**Bootstrap**

---

## 👨 Ejemplo historias de usuario

**Historia 1** - Como usuario, quiero ver el precio actual de las principales criptomonedas para tomar decisiones de inversión.  

**Historia 2** - Como usuario, quiero ver el cambio de valor en las últimas 24 horas para entender cómo ha variado el mercado.  

**Historia 3** - Como usuario, quiero buscar una criptomoneda específica por nombre o símbolo para consultar su precio.  

**Historia 4** - Como usuario, quiero poder ver más detalles de una criptomoneda al hacer clic en ella (por ejemplo, volumen, market cap, etc).

**Historia 5** - Como usuario, quiero ver un gráfico comparativo del precio de varias criptomonedas para visualizar rápidamente sus diferencias y evolución.

 **Historia 6** - Como usuario, quiero saber cuál fue la criptomoneda más volátil del día para analizar oportunidades de inversión arriesgada.

**Historia 7** - Como usuario, quiero comparar el precio actual de varias criptomonedas en diferentes monedas fiat (USD, EUR, etc).

---

## 🌐 API:

### CoinGecko: [Most Comprehensive Cryptocurrency Price & Market Data API | CoinGecko API](https://www.coingecko.com/en/api)

### Endpoints utilizados:  
- https://api.coingecko.com/api/v3/simple/price:

	Endpoint que permite consultar los precios de una o más criptomonedas utilizando su identificador ID único.

	**Parámetros utilizados:**

	- ids(string): ID de las criptomonedas, separadas por coma.
  
	- vs_currency(string, requerido): Nombre de las monedas a las que comparar, separadas por coma.
<br><br>


- **https://api.coingecko.com/api/v3/coins/list**

	Endpoint para consultar el total de criptomonedas soportadas por Coingecko, devuelve el ID, nombre y símbolo.
<br><br>
  

-	**https://api.coingecko.com/api/v3/coins/${id}**

	Endpoint para consultar toda la metadata y los datos de mercado de una criptomoneda en particular. Los datos 					devueltos incluyen: imagen, sitios web, redes sociales, descripción, contactos, precio y más. ${id} es reemplazado 	por la ID en formato de string de la moneda en particular.

	**Parámetros utilizados:**

  

	- localization(boolean, true por default): Incluir los datos de la criptomoneda localizados en todos los lenguajes soportados.

  

	- tickers(boolean, true por default): Incluir los datos de los tickers.

  

	- market_data(boolean, true por default): Incluir datos de mercado.

  

	- community_data(boolean, true por default): Incluir datos de la comunidad.

  

	- developer_data(boolean, true por default): Incluir datos del desarrollador.

  

	- sparkline(boolean, false por default): Incluir un Sparkline de los últimos 7 días.
<br><br>
  

	**https://api.coingecko.com/api/v3/coins/markets**

	Endpoint para consultar todas las criptomonedas soportadas con su precio, capitalización de mercado, 	volumen y datos de mercado
	
	 **Parámetros utilizados:**

	- vs_currency(string, requerido): Nombre de las monedas a las que comparar, separadas por coma.

	- ids(string): ID de las criptomonedas, separadas por coma.

	- sparkline(boolean, false por default): Incluir un Sparkline de los últimos 7 días.

	- order(string, 'market_cap_desc' por default): Ordenar los datos de manera ascendente o descendente por un campo (id, volumen o capitalización de mercado).

  

	- per_page(integer, 100 por default, rango válido: 1-250): Número de resultados totales por página.

  

	- page(integer, 1 por default): Página específica de los resultados

  

	- price_change_percentage(string, valores válidos:1h, 24h, 7d, 14d, 30d, 200d, 1y): Incluir el porcentaje de cambio del precio
<br><br>
---

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
  

---



## Criterios de Accesibilidad Digital:

  

**La aplicación cumple con los 30 criterios de accesibilidad digital de clase A de la Web Content Accessibility Guidelines**

**https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/comunicacion/publicaciones/requisitos-tecnicos-accesibilidad-digital/requisitos-tecnicos-7**

**1.1.1 Contenido no textual:** Toda gráfica tiene su valor en números.

**1.2.1 Sólo audio y sólo vídeo (grabado):** no se incluye audio ni videos grabados.

**1.2.2 Subtítulos (grabados):** no se incluyen videos.

**1.2.3 Audio descripción o Medio Alternativo (grabado):** no se incluye audio.

**1.3.1 Información y relaciones:** se cumple con el formato correcto.

**1.3.2 Secuencia significativa:** El orden de navegación y lectura es lógico e intuitivo.

**1.3.3 Características sensoriales:** no se proporcionan instrucciones dependientes de ubicación.

**1.4.1 Uso del color:** Los elementos visuales tienen texto y los enlaces están diferenciados tanto por color como con subrayado.

**2.1.1 Teclado:** Todas las funciones de la página son accesibles con el teclado.

**2.1.2 Sin trampas para el foco del teclado:** El foco del teclado no se bloquea y la navegación es accesible con tabulador y shift+tabulador.

**2.1.4 Atajos de teclado:** No se utilizan atajos del teclado.

**2.2.1 Tiempo ajustable:** No hay tiempos límite para la realización de tareas.

**2.2.2 Poner en pausa, detener, ocultar:** No hay redireccionamientos, movimientos o actualizaciones automáticas.

**2.3.1 Umbral de tres destellos o menos:** No hay destellos ni parpadeos.

**2.4.1 Evitar bloque:** Hay una barra de navegación con enlaces.

**2.4.2 Título de la página:** El título es descriptivo.

**2.4.3 Orden del foco:** El orden es intuitivo.

**2.4.4 Propósito de los enlaces (en su contexto):** Los enlaces no son ambiguos ni se repite su texto.

**2.5.1 Gestos del puntero:** No se considera su uso en mobile.

**2.5.2 Cancelación del puntero:** Se utiliza el up-event.

**2.5.3 Nombre en la etiqueta:** No hay interacción con voz.

**2.5.4 Actuación por movimiento:** No hay sensores de movimiento.

**3.1.1 Idioma de la página:** El idioma principal de la página está identificado utilizando el atributo lang de HTML.

**3.2.1 Al recibir el foco:** No se cambia el contexto al cambiar el foco.

**3.2.2 Al recibir entradas:** No se cambia el contexto al recibir una entrada.

**3.3.1 Identificación de errores:** Se le comunica al usuario los errores.

**3.3.2 Etiquetas o instrucciones:** Se incluyen placeholders en los campos de entrada.

**4.1.1 Procesamiento:** No hay errores de sintaxis.

