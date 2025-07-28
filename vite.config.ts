import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
<<<<<<< HEAD
=======
import path from "path";
>>>>>>> 3c08b929f5a458570a719f4b5eccee16e2fc4c1d

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
