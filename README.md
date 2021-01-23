# Bottomify

![npm bundle size](https://img.shields.io/bundlephobia/min/bottomify?style=plastic)

## Installation

### Node:

```sh
$ npm i bottomify
# OR
$ yarn add bottomify
```

### Deno:

```ts
import { encode, decode } from "https://deno.land/x/bottomify@0.3.0/deno.ts";
```

### Browser:

```html
<!-- unpkg -->
<script src="https://unpkg.com/bottomify@0.3.0/dist/bottomify.js"></script>
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/bottomify@0.3.0/dist/bottomify.js"></script>

<!-- Minified -->

<!-- unpkg -->
<script src="https://unpkg.com/bottomify@0.3.0/dist/bottomify.min.js"></script>
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/bottomify@0.3.0/dist/bottomify.min.js"></script>
```

## Command-line Interface

> Currently this is not available for Deno users.

```sh
$ bottomify --bottomify test
💖💖✨🥺,👉👈💖💖,👉👈💖💖✨🥺👉👈💖💖✨🥺,👉👈
$ bottomify --regress 💖💖✨🥺,👉👈💖💖,👉👈💖💖✨🥺👉👈💖💖✨🥺,👉👈
test
$ bottomify --bottomify --input test.top
💖💖✨🥺,👉👈💖💖,👉👈💖💖✨🥺👉👈💖💖✨🥺,👉👈
$ bottomify --bottomify test --output test.btm
```

## Examples

```js
console.log(encode("Hello World!"));
```
