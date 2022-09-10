# Monalect

## Introduction

Monalect is a personal course manager, and a self-learning management system. It allows users to upload their learning material, and go through it.

At first, users are expected to create their own questions to test themselves gainst the material, but shareable courses are planned.

Monalect is a web-app built with [RedwoodJS](https://redwoodjs.com/). I highly recommend it as a pure Javascript full-stack framework. It's simplified, yet complicated enough for the user to use.

Monalect will eventually be wholly hosted on https://www.monalect.com 

It should be done by the end of August 2022, that's my last deadline.

## To-Do

I'm quite a ways into programming it without a to-do list. I'm content this way. Not knowing how much left I have to do immensely helps with motivation productivity, because I just focus on the next immediate thing.

When the first version comes out, I'll start taking the features more seriously, and creating lists and models and stuff so I don't lose my place when I inevitably step away for a few days.

The giant list of to-dos is right here: [REFACTORING.md](./REFACTORING.md)

### Future Priority Features

+ [ ] Drag & Drop functionality 
+ [ ] Import & Export functionality
+ [X] Faster, more lightweight PDF viewer (*I have second thoughts on this one, but we'll see if pdf.js express works out*)
	+ It turns out browsers have native pdf viewers much faster than anything I can embed. Use `<object type="application/pdf">`. How it took me this long to learn about it, I don't know. I'm questioning my googling skills.
+ [ ] Persistent frontend caching using `apollo3-cache-persist`

#### Longterm Things to Keep in Mind

+ I'm going to be moving to Bun.js once it's good for production
+ ReactJS is good and I'm probably sticking with it for a good while, but I have eyes for other more performant frameworks when the time comes. Later on, I want to move to Svelte when I have a month+ free to do so.
	+ As such, try to purify my functions as much as possible.
+ Testing will come for me later on, so remember the unit-integration-system test structure. I'll include performance testing as well, as well as more systemized ux testing.
+ KPI measurement will have to be created, remember that.

## Thank Yous

This section is a just a reminder to thank the people that helped me when I'm done with this thing.
