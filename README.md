Shortly: Deployment
==============

In this sprint, you will learn about deployment and various build tools. The tools and techniques you gain experience with here will allow you to kick off your group project with a bang.

## Orientation

We're giving you a canonical version of the Shortly-express repo to start with. Before diving in, do a code review. Take a few minutes with your partner and compare this canonical repo to your work from the last sprint. How was your app architected differently? Could your code be DRYer, or was it well organized? Are there any functional differences between your apps and this one? You can often learn as much from reading code as you can from writing it.

For the basic requirements you will be using Azure. Azure has more advanced features than Heroku, but is less complicated to set up than AWS. It is an excellent service to use for your first foray into deployment. After completing the basic requirements, you will have the opportunity to deploy your app, with less guidance, on other services.

## Tests

You will find all tests are in pending state. They are all written for [MongoDB](https://www.mongodb.org/). Before starting on your mongo refactor, remove 'x' from each `describe` block.

## Basic requirements

### Get your code ready for deployment

 * [ ] Fork the shortly-deploy repo
 * [ ] Prepare your code for publication using [Liberator](https://github.com/[[ SCHOOL_NAME ]]/liberator)

## Deployment

 * [ ] Read about [how to use node modules](http://azure.microsoft.com/eN-us/documentation/articles/nodejs-use-node-modules-azure-apps/) with Azure.

### Reconfigure your app to work in both evironments (locally and in production)

 * [ ] Inject any production configuration dependencies
 * [ ] Set any necessary environment variables which will be accessed on [`process.env`](https://nodejs.org/api/process.html#process_process_env). Certain variables, such as the `PORT` that your production server is running on, will be populated by your server instance and should be handled accordingly.

### Create and configure your server using the Azure CLI

1. Install Azure-CLI: `npm install -g azure-cli`
1. Connect to your Azure account
    1. Authenticate and download credentials: `azure account download`
    1. Install credentials: `azure account import <FILE_PATH>`
1. Get SHA of BizSpark account: `azure account list`
1. Set Azure-CLI to use BizSpark account: `azure account set <SHA_OF_BIZSPARK_ACCOUNT>`
1. CD to your repo directory: `cd <REPO_PATH>`
1. Create a new website on Azure (within your repo dir): `azure site create <NAME_OF_SITE> --git`
  - This adds a new remote to your repo named, 'azure'. Confirm this with `git remote -v`
  - __NOTE:__ You will likely need use the web-interface to reset your deployment credentials for the specific site you just created at this point
1. View the environmental variables set for your server: `azure site appsetting list <SITE_NAME>`
1. Add ENVIRONMENTAL variables to your site so that your node server can access them dynamically: `azure site appsetting add <KEY>=<VALUE>`  
 - As in: `azure site appsetting add NODE_ENV=production`
1. If you need to delete ENVIRONMENTAL variables: `site appsetting clear <KEY>` 
 - As in:`site appsetting clear NODE_ENV`

### Deploy your code to your server using the Azure CLI

1. Scale your site so it can handle the deployment process: `azure site scale mode standard <SITE_NAME>`
1. Deploy your repo to Azure by pushing to the new remote ‘azure’: git push azure master
1. Log the output of your site as it deploys to track errors: `azure site log tail <SITE_NAME>`
  - **Note:** If viewing the logs isn't enough for you, you can try this too (note that this should not be needed. It's provided here as a potentially usefull tip for the future). If your website is named foo.azurewebsites.net, try going to http://foo.scm.azurewebsites.net.  Your login credentials will be your Git/FTP username and password.  Once in, you’ll be able to open a PowerShell prompt, see running processes, download a diagnostics dump, and more. More info here: https://github.com/projectkudu/kudu/wiki/Accessing-the-kudu-service.
1. After the deployment finishes, check to make sure your site is running: `azure site browse`
1. __CRITICAL:__ Scale your site back down now that deployment is finished: `azure site scale mode free <SITE_NAME>`
  - If you don't do this, you're server will remain at a high SLA tier and will cost you ~$70/month of your free BizSpark credits.

**Note on deploy.sh:** Provided for you is a deployment script generated by the Azure CLI and modified to run `npm install`, `bower install`, and `grunt` as part of deployment, but only if their respective configuration files are present. The commands in this script will be run remotely to install your server's dependency packages and concatenate/uglify your backbone app for you. Feel free to look through the script, but **YOU DO NOT NEED TO EDIT IT**.


## Create a Gruntfile:

**Note:** Building and deploying an app involves a number of important tasks that need to be performed in a certain order. When you're trying to rapidly prototype your app, this can become repetitive and is prone to error. Grunt is a super useful tool that can automate a wide variety of tasks for you. Still not convinced? Read [this](http://24ways.org/2013/grunt-is-not-weird-and-hard/) article about the advantages of using Grunt. Let Grunt do the work!

 * [ ] Use [Grunt](http://gruntjs.com/) to create a build script
 * [ ] Concatenate files before deployment
 * [ ] Uglify your code using Grunt before deployment -- Don't forget to update your views to point to the minified versions of your asset files in the public/dist folder (CSS, JS). The folder public/dist is already .gitignored for you, but make sure that you aren't committing your compiled scripts and CSS to your Github repo.
 * [ ] Run jshint before deployment -- if jshint fails, the build process should exit
 * [ ] Run your Mocha tests before deployment -- if any tests fail, the build process should exit

When you're done, you will have programmed a hierarchy of tasks that can be run with a single command. Run `grunt deploy` to build and host your app on a local dev server, and run `grunt deploy --prod` when you're ready to push up to the production server

## Refactor your database

In the previous sprint, our shortened links were stored using sqlite, a server-less database engine. Sqlite is great for development, but it's not well suited for well-trafficked production sites for [various reasons](http://stackoverflow.com/questions/913067/sqlite-as-a-production-database-for-a-low-traffic-site).

  * [ ] Refactor the app to use MongoDB/Mongoose, and run it locally
  * [ ] Follow the instructions below to host a MongoDB instance on [Azure](http://www.windowsazure.com/en-us/documentation/articles/store-mongolab-web-sites-nodejs-store-data-mongodb/). 
  * [ ] Refactor your database code to handle both enviroments--if you're running the app locally, it should connect to a local database, and when you navigate to your deployed site, it should connect to your hosted Mongo instance

#### Setting up MongoDB on Azure

In order to use Mongo on Azure, you'll need to add the MongoLab add-on to your account. Follow these steps:

  1. Select your email address in the upper right corner, then choose “View my bill”
  1. Click “Add subscription”
  1. Select “Pay as you go”
  1. Enter in your credit card, etc. IF YOU FOLLOW THESE STEPS YOU WILL NOT BE CHARGED
  1. Go back to the Management Portal and select "Subscriptions" on the top right, then make sure the “Pay-As-You-Go” box is checked. (You may need to refresh the Management Portal tab for it to appear)
  1. Click the “+ NEW” button in the lower left
  1. Click on “Store”
  1. Click on “MongoLab” and then the arrow in the lower right of the dialog
  1. Make sure “Sandbox” is checked in the order form
  1. Select “Pay-As-You-Go” from the subscription drop-down menu
  1. Continue checking out. You will not be charged (make sure the cost is $0.00/month before confirming)
  1. Back in the Azure portal, navigate to Add-Ons
  1. Select MongoLab and then click “Connection Info” in the bottom bar to get the MongoDB URI for accessing your database

## Extra Credit

### Use another cloud service

 * [ ] Deploy your site to another service ([Heroku](https://start.heroku.com/), [AWS](https://http://aws.amazon.com/)u, [DigitalOcean](https://www.digitalocean.com))

### Refactor `server.js` to use promises

  * [ ] Several routes in the server use nested callbacks. Refactor them all to use promises. Consider using [Bluebird](https://github.com/petkaantonov/bluebird), a popular and performant promise library.

### Serve your pre-compiled JS files from a CDN:

 * [ ] Save your pre-compiled/processed JS files on [Azure's](http://www.windowsazure.com/en-us/documentation/articles/cdn-how-to-use/) content delivery network
 * [ ] Be sure to correctly reference your pre-compiled JS from your application - Hint: this is another development vs production environment issue

### Nightmare Mode

  * [ ] Figure out how to push your latest build to the CDN
  * [ ] Refactor all HTML & templates to use correct paths to the CDN
  * [ ] Version your CDN build & manage [expiration](http://msdn.microsoft.com/en-us/library/gg680306.aspx)  of the files you store

### Other Challenges

### Incorprate images in your shortened links

  * [ ] Find an image used on the site of the original url and use that instead of the generic icon (hint: use a regular expression or a [parser](http://stackoverflow.com/questions/7977945/html-parser-on-nodejs) to analyze the HTML document). How will you store this new information?
  * [ ] Store saved images in the CDN (this might be very difficult)
