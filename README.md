# My Travel Map
## Code Fellows Project Week (Week 8)
### Kumji, Phil, Jeff, & Alina

## Live Demo [here](https://mytravelmap.herokuapp.com/)

## Description

A web app to manage travel plans, past and future. User will sign up/log in, choose location on Google Map (API). After selecting location, user can add/modify the following features:

- Travel Dates
- Itinerary
- Bookmark URLs for favorite places
- Photos

## Workflow
- Always make a new branch when working on a new issue! Don't work on master branch.

## Folder Structure

- api = back-end stuff, for development
- app = front-end stuff, for development
- db = database
- gulp = gulp tasks (see Gulp section)
- public = for production!
  - !!! stuff from /api and /app will pipe through Gulp tasks into /public, so don't worry or change code in /public folder!
- test = test files for javascript modules


## Gulp

/gulp directory contains /tasks, some for front-end, some for back-end. We can set gulp default task to run specified tasks, maybe a gulp-dev (list of tasks) and gulp-design (list of tasks).

- tasks
  - default
  - html
  - index
  - javascript (for Angular code)
  - sass
  - serve (for front-end testing)
  - watch (watch all specified tasks)
  - servertest (for back-end testing)
  - routertest
  - webpack:test
  - webpack:dev

- util
  - handleErrors


## Node Modules Explanation (for reference)






