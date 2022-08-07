# Monalect

## Introduction

Monalect is a personal course manager, and a self-learning management system. It allows users to upload their learning material, and go through it.

At first, users are expected to create their own questions to test themselves gainst the material, but shareable courses are planned.

Monalect is a web-app built with [RedwoodJS](https://redwoodjs.com/), which is the beginning and the end of  all bloated JS frameworks. This is all you need to create a fully functioning app with ease, while still holding complete control over the product.

I highly highly recommend it. It's javascript all the way through, frontend and backend, so you don't suffer having to think in two different languages. It handles component creation, storybook integration, the graphQL and prisma setup-- everything that would be tedious, is taken care of.

I was skeptical at first of another JS framework, but this is everything I wanted. 

I'm going to create a self-hosted version eventually for people to us.

For now it'll eventually be hosted on https://www.monalect.com 

It should be done by the end of August 2022, that's my last deadline.

## To-Do

I'm quite a ways into programming it without a to-do list. I'm content this way. Not knowing how much left I have to do immensely helps with motivation productivity, because I just focus on the next immediate thing.

When the first version comes out, I'll start taking the features more seriously.

### Clean-Up

I don't use a linter, and I appropriately suffer for it. There are also some design inefficiencies, quite a bit of the styling is repeated, the components can be simplified, and less specialized.

It will be the most horrendous spaggheti code you've ever seen., but I'm in the middle of writing the first working version of the app, so I can't care for it. It does need to be done before I regret it, but I'll do it after I build a MVP.

+ [ ] Outline new component structure
+ [ ] Implement structure w/ SCSS
+ [ ] Standardize component names
+ [ ] Standardize function and variable names
 
#### Stuff I thought of while programming

+ [ ] move gql queries into a shared file
+ [ ] change plural names (ex. lessons) to 'all' (ex. allLesson) and keep everything singular so I stop making typos and confusing myself
+ [ ] switch to object parameters, so arguments can be order agnostic
+ [ ] I'm going to make goal generation use a seperate query, but in the future mix it in with the other initialization queries. In fact, mix all initialization queries into a single one and handle it that way.

### Polishing 

+ [ ] Add CSS transitions for smoother UI
+ [ ] Make personally designed dropdown menu, instead of the browser provided one.
+ [ ] Ensure important delete actions have confirmation prompts.
+ [ ] Frontend Validation for more soft things like textbook ISBN and what not

### Immediate Future Features

I'm avoiding thinking long term on this thing. These are just the immediate features I want done after I have the first version cleaned.

+ [ ] Drag & Drop functionality 
+ [ ] Import & Export functionality
+ [ ] Faster, more lightweight PDF viewer


## Thank Yous

This section is a just a reminder to thank the people that helped me when I'm done with this thing.
