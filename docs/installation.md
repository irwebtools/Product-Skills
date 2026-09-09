# Installation notes (maintainers)

**Product Team:** install the `product-skills` Cursor Plugin from the Cursor Marketplace. See root [`README.md`](../README.md).

## Maintainer / non-Marketplace bootstrap

```bash
node install/install.mjs --target /path/to/your-project
node install/bootstrap.mjs --target /path/to/your-project
node install/init.mjs --target /path/to/your-project
```

Official source: `https://github.com/irwebtools/Product-Skills`

Safe by default: no blind overwrite, no `.git` / `node_modules` / `.env*` copy, no arbitrary script execution from downloaded content.
