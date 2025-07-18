# Tahm-ken.ch

This repository contain the front-end for the Tahm-ken.ch website v2.
It uses Javascript with Svelte on Node.

## Setup

First you either need to choose between using the production backend or running your own backend locally.

### Using production backend

In `vite.config.ts` comment the current proxy and use the one in comment.

That's it!

### Using local back-end

Please follow the readme at https://github.com/TheRaphael0000/api.tahm-ken.ch/

### Update caches


#### LCU

Run this python script with your League of Legends client open. This will ask the LCU for the latest challenges every profile specific data will be discarded.

You can't run this in the WSL. You must run this in Windows directly so it can communicate with League.

```python
python update_challenges.py
```

#### Datadragon / Discord

```
node cache/cache.js
```

### Run the Dev server

```bash
npm i # install dependencies
npm run dev # run dev env
```

## Build

Please check that the build pass before pushing

```bash
npm run build # build
npm run preview # test the build
```