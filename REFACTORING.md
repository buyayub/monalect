# THE GREAT REFACTORING

My code's a mess. It's not that bad of a mess that I'm lost on anything. The only two big messes that I have is `CreateCoursePage.js`, which is a failure in design if anything, and `batch.js` in `/api/src/services/batch/`.

However, I'm not refactoring until I'm done with a nice workeable beta. Refactoring is going to end up being its own giant phase that I'll spend a few days/weeks doing. It'll probably mold with the redesign as well, as I tend towards it.

I'll also be refactoring this page as well, as I think out ideas.

## API

## WEB

### Clean-Up

+ [ ] Outline new component structure
+ [ ] Implement structure w/ SCSS
+ [ ] Standardize component names
+ [ ] Standardize function and variable names
 
#### Stuff I thought of while programming

+ [ ] move gql queries into a shared file
+ [ ] change plural names (ex. lessons) to 'all' (ex. allLesson) and keep everything singular so I stop making typos and confusing myself
+ [ ] switch to object parameters, so arguments can be order agnostic
+ [ ] I'm going to make goal generation use a seperate query, but in the future mix it in with the other initialization queries. In fact, mix all initialization queries into a single one and handle it that way.
+ [ ] use a layout for the header/navbar

## SCSS
