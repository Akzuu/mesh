import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const { NODE_ENV } = process.env;

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal:
      NODE_ENV === "production"
        ? [
            "@mui/icons-material",
            "@mui/system",
            "@mui/material",
            "@mui/x-date-pickers",
            "@mui/utils",
            "@mui/x-data-grid",
            "@mui/x-tree-view",
            "@mui/x-internals",
            "@mui/styled-engine",
          ]
        : ["@mui/icons-material"],
  },
  optimizeDeps: {
    include: ["@mui/icons-material"],
  },
});
