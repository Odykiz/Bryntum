# Getting Started with Bryntum Grid in React

## Try React demos

Bryntum Grid is delivered with a variety of React demo applications showing its functionality.
All demo applications have been verified to be compatible with Node 16.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/grid/examples/?framework=react" class="b-card"><i class="fas b-fa-globe"></i>View online React demos</a>
<a href="#Grid/guides/integration/react/guide.md#build-and-run-local-demos" class="b-card"><i class="fab b-fa-react"></i>Build and run React demos</a>
</div>

## Create React application

In this guide we will explain how to get started if you are using the
[Create React App script](https://create-react-app.dev/).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Create Application](##create-application)
3. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the illustration below:

<img src="Grid/getting-started-result-react-cra.png" class="b-screenshot" alt="Getting Started on Bryntum Grid with React Result">

## Access to npm registry

The quickest way to use our products is to use npm (Node Package Manager). If you do not have npm installed on your
computer, please visit [nodejs.org](https://nodejs.org).

Bryntum packages are hosted in a private Bryntum registry. Run the following command to locate the registry:

```shell
$ npm config set "@bryntum:registry=https://npm.bryntum.com"
```

You will then need to login into the registry using authentication details. Please note that these details differ
depending on if you are running the **trial** or the **licensed** version. Please choose the appropriate option below:

Run the following command to login:

<div class="docs-tabs" data-name="npm">
<div>
    <a>NPM v6, v7, v8</a>
    <a>NPM v9</a>
</div>
<div>

```shell
$ npm login --registry=https://npm.bryntum.com
```

</div>
<div>

```shell
npm login --auth-type=legacy --registry=https://npm.bryntum.com
```

<div class="note">

Bryntum repository does not support new login protocol used by NPM v9. Please use <code>--auth-type=legacy</code>
option to authenticate

</div>
</div>
</div>

You will be required to provide a username, password and email address.

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed Version</a>
</div>
<div>

```shell
Username: user..yourdomain.com
Password: trial
Email: (this IS public) user@yourdomain.com
```

<div class="note">

As username, use your email address, but make sure you replace <code>@</code> with <code>..</code> (double dot). Use <code>trial</code> as password.

</div>

<p>
Please note that after the trial period or as soon as you are ready to go on production, you will be required to acquire
a commercial license from the <a href="https://customerzone.bryntum.com">Bryntum Customer Zone</a>. You will then be
required to re-login to the Bryntum private registry with your customer details.
</p>

</div>
<div>

```shell
Username: user..yourdomain.com
Password: 
Email: (this IS public) user@yourdomain.com
```

<div class="note">

As username, use your Bryntum <strong>Customer Zone email</strong> but make sure you replace <code>@</code> with <code>..</code> (double dot).
Use your <strong>Bryntum Customer Zone</strong> password.

</div>
</div>
</div>

For more information, visit our [Npm Repository Guide](#Grid/guides/npm-repository.md).

## Create Application

There are many possible ways of creating and building React applications, but let’s use
the [Create React App script](https://create-react-app.dev/), which has proven to be a simple but reliable way of
building React applications.

If you are using **javascript only**, just type:

```shell
$ npx create-react-app my-app --template @bryntum/cra-template-javascript-grid
```

or if you prefer using **typescript**:

```shell
$ npx create-react-app my-app --template @bryntum/cra-template-typescript-grid
```

<div class="note">

Please feel free to change <code>my-app</code> to your preferred application name

</div>

`create-react-app` may add a caret `^` as a prefix of dependencies version. We recommend not to use the caret character
as a version prefix to take upgrades fully under control. If necessary, please check the generated **package.json** file
and replace `dependencies` and `devDependencies` by the following:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```json
"dependencies": {
  "@bryntum/grid": "npm:@bryntum/grid-trial@5.4.0",
  "@bryntum/grid-react": "5.4.0",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-scripts": "5.0.1"
},
"devDependencies": {
  "babel-preset-react-app": "npm:@bryntum/babel-preset-react-app@10.0.0",
  "cross-env": "~7.0.3",
  "sass": "~1.56.0"
}
```

</div>
<div>

```json
"dependencies": {
  "@bryntum/grid": "5.4.0",
  "@bryntum/grid-react": "5.4.0",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-scripts": "5.0.1"
},
"devDependencies": {
  "babel-preset-react-app": "npm:@bryntum/babel-preset-react-app@10.0.0",
  "cross-env": "~7.0.3",
  "sass": "~1.56.0"
}
```
</div>
</div>

<div class="note">

Note: The version of React above is not mandatory and is used here only for the purpose of the example.

</div>

From your terminal, you can then enter your application folder and build it:

```shell
$ cd my-app
```

```shell
$ npm install
```

## Run Application

Just type the following command:

```shell
$ npm start
```

Your application is now available under [http://localhost:3000](http://localhost:3000), and your browser should
automatically open it for you.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Grid/guides/integration/react/troubleshooting.md).

## What to do next?

### Further on integration with React

Do you want to know more about how Bryntum Grid integrates with react and start to customize your application? We
provide you with a [complete React guide here](#Grid/guides/integration/react/guide.md).

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Grid/guides/data/displayingdata.md) guide explains how they all fit together.



<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>