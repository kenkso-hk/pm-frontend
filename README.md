# Property Management Frontend

This code is part of the Frontend for the "Property Management" project by HK Consulting. This API efficiently manages various key entities in property administration:

- Users: Individuals seeking to submit applications to rent a unit within a complex.

- Landlords: Owners of the complexes who wish to rent out their properties.

- Complex: Groups of housing units available for rent.

- Units: Individual housing units within a complex that are available for rent.

- Applications: Requests submitted by users to rent a unit in a complex.

- Surveys: Forms designed to collect information about a Landlord's experience renting a unit to a user.



## Usage

### Install

```
$ npm install
```
If this is your first time working on this project, it's necessary to install all dependencies before running the project, otherwise, you'll encounter numerous error alerts.

### Build

```
$ npm run build
```


### Deployment

Before deploying for the first time, it is crucial to install the AWS CLI and configure your AWS access keys. You can configure the access keys using the following command:

```
$ aws configure
```

By default, the system will use the access keys associated with a profile named "hk." If you need to change the profile name, you can do so by editing the file:
```
nano ~/.aws/credentials
```

Once the AWS access keys are configured under the "hk" profile, you can proceed with the deployment.

```
$ npm run deploy
```

React landing page template designed by Cruip.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://vitejs.dev/guide/).

## Support notes
We are shipping our templates with a very basic React configuration to let you quickly get into the development process, but we don't discourage you from using any other configuration or framework built on the top of React. So, please note that any request dealing with React (e.g. extra features, customisations, et cetera) is to be considered out of the support scope.

For more information about what support covers, please see our (FAQs)[https://cruip.com/faq/].
