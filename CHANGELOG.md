# Changelog
All notable changes to this project will be documented in this file.

## Unreleased
...

## 0.0.1 - 2017-12-01
- Created a `base.handler` for generic CRUD handler
- Added basic CRUD for entities `article`, `author`, `tag`
- Added basic token based authorization for `POST`, `PUT/PATCH`, `DELETE` endpoints
- Added articles filter for published/non published articles based on authorization token
- Added `key` parameter for fetch an article by his key
- `PUT/PATCH` endpoints for articles store it respective tags (from body payload)

## 0.0.2 - 2018-01-28
- Pagination behaviour on `base.handler` added
- Sorting behaviour on `base.handler` added
- Sorting & Pagination options on `article.handler` added
- Added article short URL support
- Improved auth strategy (database)