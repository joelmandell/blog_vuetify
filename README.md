# Blog (Vuetify Developer)

I really tried to follow the assignment to the letter. First thing is that it was **required** to use the **Essential preset**. Using the latest create-vuetify did not have that. So I searched for "Essential preset" on vuetify github issues and scrolled through Releases to find,
what seemed to be the latest version that had that naming for preset. So I went with `npm create vuetify@2.2.5` that had that naming. I selected yarn and did yarn upgrade to get the latest dependencies.

In order to get away with dart sass 2.0 deprecation warnings I did some changes to vite.config.mts (according to https://vuetifyjs.com/en/features/sass-variables/#build-performance and issues on github).

Other things to note is that I did not use any auth or backend code or any cloud provider like supabase for persisting it to a database. I might do an separate branch for that
at before march 9th if I want to use more time for this, like making sure that this project could be perhaps more maintenable and so on. 
Perhaps some visual changes also for the ui.

There were some custom CSS that was added from the "Essential Preset", but it should be removed now so it adheres to the requirements.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.
