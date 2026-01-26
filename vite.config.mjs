import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

const inlineFavicon = () => ({
  name: "inline-favicon",
  apply: "build",
  enforce: "post",
  generateBundle(_, bundle) {
    const assets = new Map();

    for (const asset of Object.values(bundle)) {
      if (asset.type === "asset") {
        assets.set(asset.fileName, asset);
      }
    }

    const toDataUrl = (filename, source) => {
      const lower = filename.toLowerCase();
      const mime =
        lower.endsWith(".ico")
          ? "image/x-icon"
          : lower.endsWith(".png")
            ? "image/png"
            : lower.endsWith(".svg")
              ? "image/svg+xml"
              : null;

      if (!mime) return null;

      const buffer = Buffer.isBuffer(source)
        ? source
        : Buffer.from(source);

      return `data:${mime};base64,${buffer.toString("base64")}`;
    };

    for (const asset of Object.values(bundle)) {
      if (asset.type !== "asset" || !asset.fileName.endsWith(".html")) {
        continue;
      }

      let html = asset.source.toString();
      let didInline = false;

      html = html.replace(
        /<link\s+[^>]*rel=["'](?:shortcut\s+icon|icon)["'][^>]*>/gi,
        (tag) => {
          const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
          if (!hrefMatch) return tag;

          const href = hrefMatch[1];
          if (/^(data:|https?:)?\/\//i.test(href)) return tag;

          const cleanHref = href
            .split(/[?#]/)[0]
            .replace(/^\.?\//, "");
          const faviconAsset = assets.get(cleanHref);

          if (!faviconAsset) return tag;

          const dataUrl = toDataUrl(cleanHref, faviconAsset.source);
          if (!dataUrl) return tag;

          didInline = true;
          delete bundle[cleanHref];
          assets.delete(cleanHref);

          return tag.replace(hrefMatch[0], `href="${dataUrl}"`);
        }
      );

      if (didInline) {
        asset.source = html;
      }
    }
  },
});

export default defineConfig({
  plugins: [
    inlineFavicon(),
    viteSingleFile(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    cssCodeSplit: false,
  },
});
