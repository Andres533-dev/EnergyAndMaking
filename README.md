# Energy and Making

Sitio web de Energy and Making, una empresa dedicada a servicios de ingeniería y mantenimiento eléctrico. El proyecto presenta la información de la compañía, sus servicios y un formulario de contacto para que los usuarios puedan comunicarse directamente desde la página.

Demo en línea: https://energy-and-making.vercel.app

## De qué trata el proyecto

El sitio funciona como página principal (landing page) de la empresa e incluye:

- Página de inicio con presentación general de la compañía.
- Sección de servicios, con páginas de detalle para cada uno.
- Formulario de contacto que envía los mensajes mediante un servicio de correo.
- Diseño adaptado a distintos tamaños de pantalla.

## Tecnologías y lenguajes utilizados

- HTML para la estructura de las páginas.
- CSS (junto con SASS) para los estilos y la apariencia visual.
- JavaScript para la interactividad del sitio.
- EmailJS, utilizado para el envío de correos desde el formulario de contacto sin necesidad de un backend propio.
- Supabase, utilizado como backend para el manejo de datos.
- Vercel, utilizado para el despliegue del sitio.

## Estructura del proyecto

- `EnergyAndMaking/`: contiene los archivos principales del sitio (HTML, CSS/SASS y JavaScript).
- `package.json` y `package-lock.json`: definen las dependencias del proyecto (EmailJS y Supabase).
- `node_modules/`: dependencias instaladas (generadas automáticamente por npm).

## Cómo ejecutarlo

Para ejecutar el proyecto de forma local, sigue estos pasos:

1. Clona el repositorio:

   ```
   git clone https://github.com/Andres533-dev/EnergyAndMaking.git
   ```

2. Entra a la carpeta del proyecto:

   ```
   cd EnergyAndMaking
   ```

3. Instala las dependencias:

   ```
   npm install
   ```

4. Abre el archivo `index.html` (dentro de la carpeta correspondiente) en tu navegador, o utiliza una extensión como Live Server en Visual Studio Code para servir el proyecto localmente.

5. Si vas a trabajar con los estilos en SASS, puedes ejecutar el compilador en modo de observación para que los cambios se reflejen automáticamente:

   ```
   sass --watch ruta/al/archivo.scss:ruta/al/archivo.css
   ```

## Configuración adicional

Para que el formulario de contacto funcione correctamente, es necesario configurar las credenciales de EmailJS (Service ID, Template ID y Public Key) y, si aplica, las credenciales de conexión a Supabase (URL del proyecto y clave pública/anon key) dentro de los archivos de JavaScript correspondientes.

## Despliegue

El proyecto está desplegado utilizando Vercel y puede visitarse en https://energy-and-making.vercel.app
