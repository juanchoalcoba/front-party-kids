// Importa el plugin de aspecto con la sintaxis correcta
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    aspectRatio, // Aquí usamos la sintaxis de importación
  ],
}
