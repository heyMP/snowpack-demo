# Pika Snowpack Demo

http://snowpack-demo.heymp.surge.sh

This is a little web components experiment using the https://www.snowpack.dev/ as a bundless option.


## Adding a package

Adding a new package

```bash
npm install --save mobx
```
```bash
npx snowpack
```

## Importing package 

Instead of using node_modules and [bare references](http://dplatz.de/blog/2019/es6-bare-imports.html) you can use relative imports from the `web_modules` directory

```js
import { autorun } from "../web_modules/mobx.js";
```