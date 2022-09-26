# THE GREAT REFACTORING

My code's a mess. It's not that bad of a mess that I'm lost on anything. The only two big messes that I have are `CreateCoursePage.js` [EDIT: and `CourseQuestionPage.js` soon enough], which is a failure in design if anything, and `batch.js` in `/api/src/services/batch/`.

However, I'm not refactoring until I'm done with a nice workeable beta. Refactoring is going to end up being its own giant phase that I'll spend a few days/weeks doing. It'll probably mold with the redesign as well, as I tend towards it.

I'll also be refactoring this page as well, as I think out ideas, as well as a few redesign things I need.

## API

## WEB

### Clean-Up

+ [ ] Outline new component structure
+ [ ] Implement structure w/ SCSS
+ [ ] Standardize component names
+ [ ] Standardize function and variable names
 
### Clean Code and Software Design

+ [ ] move gql queries into a shared file
+ [ ] change plural names (ex. lessons) to 'all' (ex. allLesson) and keep everything singular so I stop making typos and confusing myself
+ [ ] switch to object parameters, so arguments can be order agnostic
+ [ ] I'm going to make goal generation use a seperate query, but in the future mix it in with the other initialization queries. In fact, mix all initialization queries into a single one and handle it that way.
+ [ ] ~~use a layout for the header/navbar~~
	+ this is "impossible" since redwoodjs doesn't seem to provide support for accessing route parameters in layouts instead of pages, which seems silly, but it's insurmountable. Best I could do was a header component, which turned out well.
+ [ ] when there's no correct answer for a multiple choice question, select "none of the above"
+ [ ] handle case where there's more choices then there are answers; duplicate answers and ensure they end up correct
+ [ ] organize components, use indexes and curly brace imports. 
+ [ ] switch Question `multiple: Boolean` to `type: String` because somehow i forgot i'll add more question types in the future
+ [X] move question CRUD queries to their forms instead of the wrappers/pages 

### Optimizations 

+ [ ] Prefetch requests + ~~Localstorage caching~~ (Apollo Client already handles caching)
+ [ ] switch the `.filter().map()` in `Question.js` to `.reduce()`
+ [ ] put function definitions outside of component.

### Accessibility

+ [ ] aria-labels

### UI/UX

+ [ ] Jankless loading.
+ [ ] Slick loading animations, and soft error handling.
+ [ ] Add CSS transitions for smoother UI
+ [ ] Make personally designed dropdown menu, instead of the browser provided one.
+ [ ] Ensure important delete actions have confirmation prompts.
+ [ ] Frontend Validation for more soft things like textbook ISBN and what not

## SCSS

+ [ ] replace the weird sizing system with simple variables at the start of each component file.
+ [ ] create shared classes for similar things, for example all the lesson and section displays the same height, have the same colors depending on whether they're active or not. The only large difference is their width, and internal makeup, which can be ignored.
+ [ ] dark mode and light mode; make way for theme support? actually, just rework out my sass structure entirely.
+ [ ] 
