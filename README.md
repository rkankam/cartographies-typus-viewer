# Cartographies Typus Viewer

Guided Viewer prototype for Typus Orbis Terrarum.

Live:
[https://cartographies-typus-viewer.pages.dev](https://cartographies-typus-viewer.pages.dev)

Source image:
Digital Commonwealth / Boston Public Library / Leventhal Map & Education Center.

IIIF service:
[https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:x633f9472](https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:x633f9472)

IIIF manifest:
[https://collections.leventhalmap.org/search/commonwealth:x633f946s/manifest](https://collections.leventhalmap.org/search/commonwealth:x633f946s/manifest)

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Deploy

```
wrangler pages deploy dist --project-name cartographies-typus-viewer --branch main
```

## Notes

This is a standalone prototype. It is linked from the book but not integrated into the `client_instit_museum` monorepo.
