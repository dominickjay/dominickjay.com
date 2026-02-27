---
title: 'Deploying a Next.js Boilerplate to Netlify'

description: 'Setting up the Netlify CLI to deploy a Next application to Netlify'
intro: 'In this post, we will clone a repo and set up the Netlify CLI in order to deploy a Next.js application!'
pubDate: '2021-11-03'
tags:
  - react
  - devops
growth: evergreen
---

## Clone repo

Pull down Cassidy Williams Next.js [Netlify Starter repo](https://github.com/cassidoo/next-netlify-starter). I've moved the contents of this - excluding the .git folder - into a seperate folder. Commit this repo to your github account, and add it to the Build Settings section in your Netlify account.

### What's in the repo

This projects contains; 2 sample components, a global stylesheet, a `netlify.toml` for deployment (more on that later), and a `jsconfig.json` for setting up absolute imports and aliases. It also includes the [Essential Next.js Build Plugin](https://github.com/netlify/netlify-plugin-nextjs), which will allow for you to implement features like Preview Mode, server-side rendering/incremental static regeneration via Netlify Functions, and internationalized routing.

You can either do a "one-click" deploy from the github repo to push straight up to Netlify, or you can take the more challenging setup, which is what we are detailing today.

## Install Netlify-CLI

To install Netlify CLI, make sure you have [Node.js](https://nodejs.org/en/download/) version 10 or later. For this post, I'm using the latest version of the CLI which at this time of writing is 6.14.5, and my node version is v14.17.0.

`yarn add netlify-cli` or `npm install netlify-cli -g`

After installation, check version and basic information by using the `netlify` command.

<div class="fyi-block fyi-block--warning fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)]">
  	<span class="fl-text-step-2 heading">Global vs Local</span>
	<p>Installing Netlify CLI globally means that your system always has the latest version, including any breaking changes. While global installation is appropriate for initial development and experimentation, for managing builds in a continuous integration (CI) environment, use <a href='https://docs.netlify.com/cli/get-started/#installation-in-a-ci-environment'>local CLI installation</a> instead.</p>
</div>

### Authenticating with Netlify

Netlify CLI will use an access token in order to authenticate with Netlify. This token can be generated two ways; through the CLI, or through the Netlify UI. We're going to authenticate via the CLI here, using this command;

`netlify login`

When this command is run, we are redirected in the browser to this page to authorize the application.

![image alt text](/images/blog/nextjs-deploy-netlify/20211028112712.png)

Once we have aquired an access token, we _should_ be able use one of the commands to push the contents of our folder to Netlify. Looking through the list of commands when we run `netlify` shows us that `deploy` would be the one to deploy the application, so let's try that!

`netlify deploy`

![](/images/blog/nextjs-deploy-netlify/20211028113147.png)

Ok, so we run it, and are given this back. Seems pretty straightforward. Let's just select 'Create & configure a new site'.

![](/images/blog/nextjs-deploy-netlify/20211028113336.png)

Selecting `Projects` here, we are then asked to enter a site name (which must be unique, I've set mine as domjay-next-porfolio, so you will have to choose a different one)

![](/images/blog/nextjs-deploy-netlify/20211028113627.png)

Looks good, except for that error message at the bottom. Let's dig in and see what's going on.

```
Error: No such directory dom-next-project\out!
Did you forget to run a build?
```

Looks like we were too quick to deploy, and forgot to actually _generate_ our site. At this time of writing, we need to add some extra lines to our `netlify.toml` file;

```yaml
[[plugins]]
package = "@netlify/plugin-nextjs"
```

Also we will need to install this package using `npm install -D @netlify/plugin-nextjs@beta` to make it available for our deployment to be successful overall. For more information on the beta package, this is a great article: [Essential Next.js Build Plugin (beta)](https://github.com/netlify/netlify-plugin-nextjs#installing-the-beta)

<div class="fyi-block fyi-block--info fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)]">
  	<span class="fl-text-step-2 heading">What's the netlify.toml file?</span>
	<p>Netlify couldn't put it better themselves from their documentation;</p>
	<p>'...is a configuration file that specifies how Netlify builds and deploys your site — including redirects, branch and context-specific settings, and more. Its goal is to describe much of your site configuration alongside your code — with two goals:</p>
	<ul>
	<li><p>When someone forks your repository, they can instantly create a Netlify site using the new repo. They don’t have to configure anything in the UI, and they’ll still get an identical site configuration.</p></li>
	<li><p>You can track configuration changes using version control and configure some things that aren’t customizable in our UI.'</p></li></p>
	</ul>
</div>

The reason we added these extra lines was because the `build` plugin that is being used will check for the `out` directory, but Netlify's beta version that was released for Next 12 was changed to match to the `.next` directory. This should be how our netlify.toml file looks at the moment;

```yaml
[build]
	command = "yarn build"
	publish = ".next"

[[plugins]]
	package = "@netlify/plugin-nextjs"
```

Now we've got this sorted, lets run `netlify build` again.

<aside-block type="info" heading="" text="
I found that along the way - I think when the deploy command was run - that a /.next directory was created, which caused the `netlify build` command to hang. If this occurs to you, try deleting this directory and running the build command again."></aside-block>

After a while, this should complete, with the CLI returning something like this;

![](/images/blog/nextjs-deploy-netlify/20211028120806.png)

Run the `netlify deploy` command for the final time, and....

![](/images/blog/nextjs-deploy-netlify/20211028124418.png)

Got it!

At the end of the console message there is a website draft URL which you can navigate to, to see a preview of your site. Wonderful!

## What's next?

Let's say - hypothetically - that you are 100% happy with this boilerplate as your site. You want it to go live, hooray! So, how do we do that. If everything looks good on your draft URL, deploy it to your main site URL with the `--prod` flag.

`netlify deploy --prod`

Hopefully by following these steps, the deploy should move your site to it's live environment!
