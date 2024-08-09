# Angular Basics Project
Application without tests and server side rendering 

## How to install Angular
```bash
npm i @angular/cli -g 
```

Create an angular aplication whithout tests
```bash
ng new todo_app --skip-tests
```

Run Angular application
```bash
ng serve
```

Create Angular component (route: pages/home)
```bash
ng g component pages/home
```

The folder `/dist/[name-project]/` is the one to deploy.

## Deploy to Production

Build the application (optimization tasks)
```bash
ng build
```

This application was deployed at [Firebase Console](https://console.firebase.google.com)

```bash
sudo npm install -g firebase-tools

firebase login

firebase init

firebase deploy --debug
``` 

<!--
On firebase init, those are the settings
? Which Firebase features do you want to set up for this 
directory? Press Space to select features, then Enter to confirm 
your choices. Hosting: Configure files for Firebase Hosting and 
(optionally) set up GitHub Action deploys
...
? What do you want to use as your public directory? dist/todo_app
? Configure as a single-page app (rewrite all urls to 
/index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
-->

[TODO application deployed](https://todoapp-d5e74.web.app)


### Pending
Check how Injector works with local storage
```js
injector = inject(Injector);
```