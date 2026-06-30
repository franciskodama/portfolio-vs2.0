import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  plugins: [
    {
      postcssPlugin: "postcss-fix-from",
      Once(root, { result }) {
        if (!result.opts.from) {
          result.opts.from = root.source?.input?.file || path.join(__dirname, "globals.css");
        }
      },
    },
    "@tailwindcss/postcss",
  ],
};

export default config;
