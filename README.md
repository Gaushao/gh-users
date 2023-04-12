# GH Users

React application written in TypeScript that allows to search for users by the GitHubAPI. With a user-friendly interface and powerful search capabilities, GH Users makes it easy to find the users you're looking for on GitHub.

## Try

- [Live](https://gaushao.github.io/gh-users/)
- [Docs](https://gaushao.github.io/gh-users/docs)
- [Jest](https://gaushao.github.io/gh-users/coverage/)
- [Git](https://github.com/Gaushao/gh-users)

## Run

### install

<br />

```sh
$ yarn
```

<br />

### dev

<br />

```sh
$ yarn start
```

[open in the browser](http://localhost:3000/gh-users)

### test

<br />

```sh
$ yarn test
```

<br />

## Build

### docs

<br />

```sh
$ yarn docs
```

<br />

### jest coverage

<br />

```sh
$ yarn cover
```

<br />

### gh-pages

<br />

```sh
$ yarn deploy
```

<br />

## Tech

<br />

- [TypeScript](https://www.typescriptlang.org/) - superset of JavaScript that adds static type checking
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) - library for declarative routing
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework
- [Jest](https://jestjs.io/) - framework for unit tests
- [TypeDoc](https://typedoc.org/) - documentation generator
- [GitHub Pages](https://pages.github.com/) - for deploying

<br />

## Feats

### Search for Users

search for GitHub users with [Github Search Users API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users), powered by [useFetchUsersEffect](https://gaushao.github.io/gh-users/docs/functions/api_hooks.useFetchUsersEffect.html). have so far implemented `q` [searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) as [Github API search query](https://docs.github.com/rest/reference/search#constructing-a-search-query).

`q` parameter can be used to specify the search query to be used in the API call. allows to search for GitHub users based on various criteria such as username, full name, location, or organization.

### Search User Input

text input field that allows to enter a query to search. the fetch effect occurs on input value changes and its response is displayed by the users table

### Users Table

render search results in table rows displaying columns for:

- `avatar_url` - as image
- `login` - as text
- `site_admin` - as checkbox

on click a row routes the browser to user details page

### User Details

displays the following details of a GitHub user:

- `login` - user's login ID
- `id` - user's ID
- `avatar_url` - user's avatar image URL
- `html_url` - user's GitHub profile page external link

### Page Header

render of page logo and application name. also links to [Docs](https://gaushao.github.io/gh-users/docs), [Jest](https://gaushao.github.io/gh-users/coverage/), [Git](https://github.com/Gaushao/gh-users)

### Page Logo

will change to `CancelIcon` if browser location lands in user details and navigate to home `onClick`

### Page Redirect

any missing pathname after `https://gaushao.github.io/gh-users` will be handle by [404.html](https://github.com/Gaushao/gh-users/blob/main/public/404.html) and redirected as search query to application home page

### Search Query

on [badroute](https://gaushao.github.io/gh-users/reallybadroute) landing query is loaded by the [Context](https://gaushao.github.io/gh-users/docs/modules/ui_users_Context.html) as [query](https://gaushao.github.io/gh-users/docs/classes/ui_users_Context.UsersContextValue.html#query) causing the search for users effect to occurs, case only a single result is returned there will be redirected directly to the user details

### Search Routing

[GitHub Pages doesn't natively support single page apps](https://github.com/rafgraph/spa-github-pages), so GH Users is routed with [HashRouter](https://reactrouter.com/en/main/router-components/hash-router) which enables routing single-page applications on servers like GitHub Pages.

this implementation allows not only the page to be refreshed but users to be searched by URL pathname, like [Gaushao](https://gaushao.github.io/gh-users/Gaushao).
