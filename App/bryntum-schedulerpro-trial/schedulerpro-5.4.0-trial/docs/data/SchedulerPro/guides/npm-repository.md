# Using Bryntum NPM repository and packages

## Repository access

Bryntum components are commercial products, hosted in a private Bryntum repository. To get repository access you need to
complete these **two steps**:
* [Configure npm](#SchedulerPro/guides/npm-repository.md#configure-npm)
* [Login](#SchedulerPro/guides/npm-repository.md#login)

## Configure npm

Configure **npm** to download packages for the `@bryntum` scope from the Bryntum registry with this command which will
store the npm configuration in your local machine:

```shell
$ npm config set "@bryntum:registry=https://npm.bryntum.com"
```

<div class="note">

Do not forget to put the config value in quotes as shown above (required for Windows PowerShell).

</div>

Check that **npm** uses correct Bryntum repository setting with:

```shell
$ npm config list
```

Command console output should contain this setting:

```shell
@bryntum:registry = "https://npm.bryntum.com"
```

Check [npm-config](https://docs.npmjs.com/cli/v7/commands/npm-config) online documentation.

## Login

Login to the registry using this command which will create and store login credentials in your local machine:

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

### Trial user access

Use your Email as the login but replace the `@` with `..` (double dot) and use `trial` as password.

For example, if your Email is `user@yourdomain.com`, use the following:

```shell
$ npm login --registry=https://npm.bryntum.com

Username: user..yourdomain.com
Password: trial
Email: (this IS public) user@yourdomain.com
```

<div class="note">

Do not forget to change <code>user..yourdomain.com</code> and <code>user@yourdomain.com</code> to your login and email.

</div>

### Licensed user access

Use your [Bryntum Customer Zone](https://customerzone.bryntum.com) email as login but replace `@` with `..`
(double dot). Use your Bryntum Customer Zone password.

For example, if your username in Customer Zone is `user@yourdomain.com`, use the following:

```shell
$ npm login --registry=https://npm.bryntum.com

Username: user..yourdomain.com
Password: your-customer-zone-password
Email: (this IS public) user@yourdomain.com
```

<div class="note">

Access to the licensed packages requires an active support subscription. If you have purchased a new
product license or upgraded a trial license, you must re-login to update registry access.

</div>

<div class="note">

After your subscription expires, you will only have access to packages which were published before subscription expiry
date.

</div>

## Yarn Package Manager

To access the Bryntum repository with **yarn** first use authorization with **npm** as described above. This step is
mandatory. After you have been authorized with **npm** you will be able to install packages with **yarn**.

Please note that **yarn** uses a npm authorization token to access private repository so there is **no need to login** to
the repository with **yarn**.

## Components

Bryntum components (libraries) for web applications are built using pure JavaScript and can be used in any modern web
application without requiring any special JS framework. These components are packaged as follows:

| _Component_            | _Package_                  | Description                     |
|------------------------|----------------------------|---------------------------------|
| Bryntum Scheduler Pro        | **@bryntum/schedulerpro**       | Full licensed component version |
| Bryntum Scheduler Pro Trial  | **@bryntum/schedulerpro-trial** | Trial limited component version |

## Frameworks Wrappers

To integrate Bryntum components with all major frameworks including Angular, Ionic, React and Vue, we provide
framework specific wrappers in the following packages:

| _Framework_           | _Package_                         | Integration guide                                                         |
|-----------------------|-----------------------------------|---------------------------------------------------------------------------|
| Angular (IVY)         | **@bryntum/schedulerpro-angular**      | [Angular integration guide](#SchedulerPro/guides/integration/angular/guide.md) |
| Angular (View Engine) | **@bryntum/schedulerpro-angular-view** | [Angular integration guide](#SchedulerPro/guides/integration/angular/guide.md) |
| Ionic with Angular    | **@bryntum/schedulerpro-angular**      | [Ionic integration guide](#SchedulerPro/guides/integration/ionic/guide.md)     |
| React                 | **@bryntum/schedulerpro-react**        | [React integration guide](#SchedulerPro/guides/integration/react/guide.md)     |
| Vue 2.x               | **@bryntum/schedulerpro-vue**          | [Vue integration guide](#SchedulerPro/guides/integration/vue/guide.md)         |
| Vue 3.x               | **@bryntum/schedulerpro-vue-3**        | [Vue integration guide](#SchedulerPro/guides/integration/vue/guide.md)         |

<div class="note">

Wrapper packages require installing <strong>@bryntum/schedulerpro</strong> but it is not listed in the package dependencies.
This was done to support trial package aliasing. You have to manually add the <strong>@bryntum/schedulerpro</strong> dependency to the 
application's <strong>package.json</strong> file to use the wrapper packages.

</div>

## Demo resources

Bryntum demo applications use resources such as images, fonts and styling from the **demo-resources** npm package.
This package is **optional** and it is not necessary to add it in your application.

| _Description_  | _Package_                   |
|----------------|-----------------------------|
| Demo Resources | **@bryntum/demo-resources** |

<div class="note">

Demo Resources package does not contain framework demos and they are bundled within distribution zip

</div>

## Installing trial packages

Trial packages require using npm package aliasing to install the `"@bryntum/schedulerpro-trial"` using
the `"@bryntum/schedulerpro"` alias.

<div class="note">

The trial Bryntum Scheduler Pro package should be installed first

</div>

Example: For Angular framework integration it can be done with:

Install using **npm**:

```shell
$ npm install @bryntum/schedulerpro@npm:@bryntum/schedulerpro-trial@5.4.0
$ npm install @bryntum/schedulerpro-angular@5.4.0
```

<div class="note">

We recommend to use npm <code>--save-exact</code> arguments to install the precise package versions and take upgrades fully under control.

</div>

or add using **yarn**:

```shell
$ yarn add @bryntum/schedulerpro@npm:@bryntum/schedulerpro-trial@5.4.0
$ yarn add @bryntum/schedulerpro-angular@5.4.0
```

<div class="note">

We recommend using yarn <code>--exact</code> argument to install the specific package versions and keep upgrades fully under control.

</div>

Alternatively, you can directly add entries to the `"dependencies"` section of the `package.json` project file as follows:

```json
"dependencies": {
  "@bryntum/schedulerpro": "npm:@bryntum/schedulerpro-trial@5.4.0",
  "@bryntum/schedulerpro-angular": "5.4.0"
}
```

<div class="note">

We recommend against prefixing package versions with the caret character (<code>^</code>) to install the precise package versions 
and take upgrades fully under control.

</div>

To install Bryntum trial products use the trial product packages `@bryntum/grid-trial`, `@bryntum/gantt-trial`,
`@bryntum/scheduler-trial`, `@bryntum/schedulerpro-trial`, `@bryntum/calendar-trial` or `@bryntum/taskboard-trial`.

<div class="note">

To avoid compatibility issues, please make sure that you use same version for all installed Bryntum product packages.

</div>

Packages for other frameworks are listed in the
[Frameworks Wrappers](#SchedulerPro/guides/npm-repository.md#frameworks-wrappers) table.

The benefit of using npm package aliasing is that we create an alias for the `schedulerpro-trial` package using the name of
the licensed `schedulerpro` package. This means there is no need to change your application code after getting a license,
you will only change the alias in `package.json` to the package version number.

Change this:

```json
"dependencies": {
  "@bryntum/schedulerpro": "npm:@bryntum/schedulerpro-trial@5.4.0",
}
```

to:

```json
"dependencies": {
  "@bryntum/schedulerpro": "5.4.0",
}
```

<div class="note">

<strong>Frameworks Wrappers</strong> and <strong>Bryntum Demo Resources</strong> packages do not have trial versions.

</div>

## Installing licensed packages

All published packages in the private Bryntum npm repository can be installed as any other regular npm packages.

Example: For Angular framework integration it can be done with:

Install using **npm**:

```shell
$ npm install @bryntum/schedulerpro@5.4.0
$ npm install @bryntum/schedulerpro-angular@5.4.0
```

<div class="note">

We recommend to use npm <code>--save-exact</code> arguments to install the specific package versions and keep upgrades fully under
control.

</div>

or add using **yarn**:

```shell
$ yarn add @bryntum/schedulerpro@5.4.0
$ yarn add @bryntum/schedulerpro-angular@5.4.0
```

<div class="note">

We recommend to use yarn <code>--exact</code> arguments to install the specific package versions and keep upgrades fully under 
control.

</div>

Alternatively, you can directly add entries to the `"dependencies"` section of the `package.json` project file as follows:

```json
"dependencies": {
  "@bryntum/schedulerpro": "5.4.0",
  "@bryntum/schedulerpro-angular": "5.4.0"
}
```

<div class="note">

We recommend not to prefix package versions with caret character (<code>^</code>) to install the precise package versions and 
take upgrades fully under control.

</div>

To install Bryntum products use the product packages `@bryntum/grid`, `@bryntum/gantt`, `@bryntum/scheduler`,
`@bryntum/schedulerpro`, `@bryntum/calendar` or `@bryntum/taskboard`.

<div class="note">

To avoid compatibility issues make sure that you use same version for all installed Bryntum product packages

</div>

Packages for other frameworks are listed in the
[Frameworks Wrappers](#SchedulerPro/guides/npm-repository.md#frameworks-wrappers) table.

## NPM Requirements

Bryntum demo applications use package aliasing for trial Bryntum Scheduler Pro package version and for React applications to solve
[performance issues](#SchedulerPro/guides/integration/react/guide.md#cra-performance). This requires **npm** versions that support
aliases.

Minimum supported **npm** versions are `v6.9.0` or `v7.11.0`.

Check installed **npm** version with:

```shell
$ npm -v
```

Use [npm upgrade guide](https://docs.npmjs.com/try-the-latest-stable-version-of-npm) for **npm** upgrade
instructions and check Docs for [package alias](https://docs.npmjs.com/cli/v7/commands/npm-install) syntax.

## Access tokens for CI/CD

Access tokens may be used instead of password authentication with CI/CD for secure authorization to the Bryntum 
repository. You can create a token and save it as a `.npmrc` file in your project directory to be able to install
Bryntum packages with **npm** or **yarn**. Please follow the instructions below.

<div class="note">

You are required to configure and login to the npm server before you are able to use tokens. Please follow the
<a href="#SchedulerPro/guides/npm-repository.md#repository-access">instructions here</a>.

</div>

See also [npm token documentation](https://docs.npmjs.com/creating-and-viewing-access-tokens).

### Creating an access token

To create a new token using the command line, run:

```shell
$ npm token create --registry=https://npm.bryntum.com
npm password: Enter your password here
```

Copy the token from the console which is displayed after this command:

```shell
┌──────────┬─────────────────────────┐
│ token    │ eyJhb...                │
├──────────┼─────────────────────────┤
│ user     │ user..example.com       │
├──────────┼─────────────────────────┤
│ cidr     │                         │
├──────────┼─────────────────────────┤
│ readonly │ false                   │
├──────────┼─────────────────────────┤
│ created  │ 2021-07-20T01:02:03.00Z │
└──────────┴─────────────────────────┘
```

### Viewing access tokens

To view all available tokens using the command line, run:

```shell
$ npm token list --registry=https://npm.bryntum.com
```

All available tokens will be displayed in the console:

```shell
┌────────┬─────────┬────────────┬──────────┬────────────────┐
│ id     │ token   │ created    │ readonly │ CIDR whitelist │
├────────┼─────────┼────────────┼──────────┼────────────────┤
│ b54f12 │ eyJhb.… │ 2021-07-20 │ no       │                │
└────────┴─────────┴────────────┴──────────┴────────────────┘
```

### Removing an access token

To remove a created token using the command line, run:

<div class="note">

Replace <strong>tokenId</strong> with <strong>id</strong> from the tokens table displayed after <strong>npm token list</strong> command

</div>

```shell
$ npm token delete tokenId --registry=https://npm.bryntum.com
```

### `.npmrc` locations

The `npm` package manager uses a configuration file named `.npmrc` that stores information of repositories,
authTokens and other configuration options. `npm` uses this file from the following locations in this order:

* per-project config file (/path/to/my/project/.npmrc)
* per-user config file (~/.npmrc)
* global config file ($PREFIX/etc/npmrc)
* npm builtin config file (/path/to/npm/npmrc)

See also [npmrc documentation](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc).

### Listing the npm configuration

Use `npm config ls` to see the following information:

```ini
; "user" config from /Users/user/.npmrc

@bryntum:registry = "https://npm.bryntum.com"
//npm.bryntum.com/:_authToken = (protected)

; node bin location = /Users/user/.nvm/versions/node/v12.22.1/bin/node
; cwd = /Users/Shared/data/devel/bryntum-suite
; HOME = /Users/user
; Run `npm config ls -l` to show all defaults.
```

The first line shows that the `.npmrc` from the user's home directory will be used and we can also see that we
have configured the registry for `@bryntum` namespace and that we have logged-in because we have an authToken.

If we had `.npmrc` in the project directory, `/Users/Shared/data/devel/bryntum-suite` in this case,
then the output would look like:

```ini
; "user" config from /Users/user/.npmrc

@bryntum:registry = "https://npm.bryntum.com"
//npm.bryntum.com/:_authToken = (protected)

; "project" config from /Users/Shared/data/devel/bryntum-suite/.npmrc

legacy-peer-deps = true

; node bin location = /Users/user/.nvm/versions/node/v12.22.1/bin/node
; cwd = /Users/Shared/data/devel/bryntum-suite
; HOME = /Users/user
; Run `npm config ls -l` to show all defaults.
```

Both user and project configs are used at this time, `legacy-peer-deps` configured in the project directory
and repository and authToken used from the user home directory.

### Using `.npmrc` in Continuous Integration/Continuous Delivery (CI/CD)

The automated CI/CD process will run `npm install` at some point. The command is run in a directory and as
some user. You can manually verify if the `.npmrc` used by the process contains the `@bryntum` repository
configuration and authToken.

**`.npmrc` file should contain this code:**

```ini
@bryntum:registry="https://npm.bryntum.com"
//npm.bryntum.com/:_authToken=AUTH-TOKEN-VALUE
```

## Artifactory integration

To use Bryntum NPM registry as a remote repository please follow this instruction.

### Add Bryntum registry as a remote repository

In Artifactory admin console navigate to **Administration - Repositories** and click **Add repositories - Remote
repository**.

Check [Remote Repositories](https://www.jfrog.com/confluence/display/JFROG/Remote+Repositories) docs from Artifactory.

Configure the repository with:

| Parameter      | Value                                                                                                  |
|----------------|--------------------------------------------------------------------------------------------------------|
| Package Type   | **npm**                                                                                                |
| Repository Key | **bryntum** (or any other name you prefer)                                                             |
| URL            |  https://npm.bryntum.com                                                                               |
| Username       |  Username for [Bryntum repository authentication](#SchedulerPro/guides/npm-repository.md#repository-access) |
| Password       |  Password for [Bryntum repository authentication](#SchedulerPro/guides/npm-repository.md#repository-access) |

### Setup credentials for `@bryntum` package access

After creating the remote repository, click the wrench icon (Set Me Up) in the line with the repository to get 
credentials for accessing the repository.

Create `.npmrc` file in the project's folder and add credentials there for `@bryntum` scope packages:
For example if you use JFrog Platform for hosting your Artifactory registry (e.g. `yourregistry.jfrog.io`) for
Artifactory with the username `user@example.com` than you will have similar config:
```
@bryntum:registry=https://yourregistry.jfrog.io/artifactory/api/npm/bryntum/
//yourregistry.jfrog.io/artifactory/api/npm/bryntum/:_password=<BASE64_PASSWORD>
//yourregistry.jfrog.io/artifactory/api/npm/bryntum/:username=user@example.com
//yourregistry.jfrog.io/artifactory/api/npm/bryntum/:email=user@example.com
//yourregistry.jfrog.io/artifactory/api/npm/bryntum/:always-auth=true
```

`<BASE64_PASSWORD>` will be generated for you in Artifactory console if you enter your credentials there.

After these actions you will be able to install `@bryntum\SchedulerPro` package with your Artifactory login from `.npmrc`
file.

Later you may add `bryntum` Artifactory remote repository to any virtual repository to have access to several
repositories with the same Artifactory credentials.

Check [Virtual Repositories](https://www.jfrog.com/confluence/display/JFROG/Virtual+Repositories) docs from Artifactory.

## Yarn Requirements

The steps in this guide applies to **yarn** `v1.x` Newer versions of **yarn** might require additional configuration
steps.

## Offline packages

If you do not have an internet connection on your development computer, CI/CD system, or you want to use **@bryntum**
offline packages to build your application you may use the instructions below.

Install packages on a computer with access to the Bryntum repository. Installation will store all required packages
under the **node_modules/@bryntum** folder located in your application's root path.

Navigate to **each sub folder** inside the **node_modules/@bryntum** folder and run:

```shell
$ npm pack
```

This will create a **\*.tgz** file inside the folder where you ran the command. Files should be copied and stored in
version control to be used as local npm packages.

Please check documentation for the `npm pack` command [docs here](https://docs.npmjs.com/cli/v7/commands/npm-pack).

For example if you copied the **\*.tgz** files to the **lib/** folder inside your project's root alongside
with `package.json` you need to modify the `package.json` file to use offline packages as shown below.

**For trial version:**

```json
"dependencies": {
  "@bryntum/schedulerpro-trial-lib": "file:./lib/bryntum-schedulerpro-trial-lib-1.0.0.tgz",
  "@bryntum/schedulerpro": "file:./lib/bryntum-schedulerpro-trial-5.4.0.tgz"
}
```

<div class="note">

Please note that <strong>@bryntum/schedulerpro-trial-lib</strong> is a required internal package which is used for product
installation and should be installed first. Place it above <strong>@bryntum/schedulerpro</strong> in the <strong>package.json</strong> file.

</div>

**For licensed version:**

```json
"dependencies": {
  "@bryntum/schedulerpro-lib": "file:./lib/bryntum-schedulerpro-lib-1.0.0.tgz",
  "@bryntum/schedulerpro": "file:./lib/bryntum-schedulerpro-5.4.0.tgz"
}
```

<div class="note">

Please note that <strong>@bryntum/schedulerpro-lib</strong> is a required internal package which is used for product
installation and should be installed first. Place it above <strong>@bryntum/schedulerpro</strong> in the <strong>package.json</strong> file.

</div>

## Troubleshooting

### Project cleanup

If you face any issues building or running examples or your application, such issues can be often resolved by the
project cleanup procedure.

Run these commands in application folder for package cache cleanup, removing installed packages and reinstalling all
project dependencies:

<div class="docs-tabs" data-name="cleanup">
<div>
    <a>MacOS/Linux</a>
    <a>Windows</a>
</div>
<div>

<strong>npm</strong>

```shell
$ npm cache clean --force
$ rm -rf node_modules
$ rm package-lock.json
$ npm install
```

<strong>yarn</strong>

```shell
$ yarn cache clean
$ rm -rf node_modules
$ rm package-lock.json
$ yarn install
```

</div>
<div>

<strong>npm</strong>

```shell
$ npm cache clean --force
$ rmdir node_modules /s /q
$ del package-lock.json
$ npm install
```

<strong>yarn</strong>

```shell
$ yarn cache clean
$ rmdir node_modules /s /q
$ del package-lock.json
$ yarn install
```
</div>
</div>

## Access problems

### ERR! user is not allowed to access package

```shell
"user user..yourdomain.com is not allowed to access package @bryntum/schedulerpro"
```

means you are not allowed to access this package when logged in as **trial** or your account in the
[CustomerZone](https://customerzone.bryntum.com) has no Bryntum Scheduler Pro license.

<div class="note">

If you have purchased a new product license or upgraded from trial, you must re-login to update registry access.

</div>

### ERR! 404 Not Found

```shell
Not Found - GET https://registry.npmjs.org/@bryntum%2fschedulerpro"
npm ERR! 404
npm ERR! 404 ‘@bryntum/schedulerpro@5.4.0’ is not in the npm registry.
```

This error means that **npm** tries to get package from public repository at `https://registry.npmjs.org` but not from
Bryntum private repository at `https://npm.bryntum.com`.

To fix access problem configure **npm** as stated above in
[Configure npm](#SchedulerPro/guides/npm-repository.md#configure-npm) and reinstall the package.

### ERR! Web login not supported

Bryntum repository does not support new login protocol used by NPM v9. Please use `--auth-type=legacy` option to 
authenticate:

```shell
npm login --auth-type=legacy --registry=https://npm.bryntum.com
```

## Other problems

If you have problems with accessing Bryntum NPM repository please check these first:

* Install supported **npm** version as stated above in
  [NPM Requirements](#SchedulerPro/guides/npm-repository.md#npm-requirements)
* You can not have an access to full package `@bryntum/schedulerpro` from trial account. Use `@bryntum/schedulerpro-trial`
  package as described above in [Installing trial packages](#SchedulerPro/guides/npm-repository.md#installing-trial-packages)
* Check you have typed a correct password from [Bryntum Customer Zone](https://customerzone.bryntum.com)
* To access full packages check if you are a real [Bryntum Customer Zone](https://customerzone.bryntum.com) user.
  Register or ask a license owner to add you there
* If you use **yarn** please check [Yarn Package Manager](#SchedulerPro/guides/npm-repository.md#yarn-package-manager)
  information above
* Contact us at [Bryntum Support Forum](https://forum.bryntum.com/) for any questions. Please attach **npm** console log
  to your question

## Online references

* Visit [npm Package Manager homepage](https://npmjs.com)
* Read [npm Documentation](https://docs.npmjs.com)
* Visit [yarn Package Manager homepage](https://yarnpkg.com)
* Read [yarn Documentation](https://yarnpkg.com/getting-started)
* Check all available packages in [Bryntum npm Repository](https://npm.bryntum.com)
* Browse [Bryntum Scheduler Pro examples](https://bryntum.com/products/schedulerpro/examples/)
* Browse [All Bryntum products examples](https://bryntum.com/examples/)
* Purchase licensed components in our [Store](https://bryntum.com/store/)
* Read [Bryntum Scheduler Pro Online Documentation](https://bryntum.com/products/schedulerpro/docs/)
* Post you questions to [Bryntum Support Forum](https://forum.bryntum.com/)
* Access [Bryntum Customer Zone](https://customerzone.bryntum.com)
* [Contact us](https://bryntum.com/contact/)


<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>