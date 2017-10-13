---
title: CHANGELOGS
layout: page.nunjucks
collection: api
date: 2015-01-04
---

# Changelogs

## 1.0.0-rc15

* added `/projects/{gid}/messages` *POST* and *GET* endpoints, to send and see project messages to a project
* renamed existing `solo` mode project to `solo_legacy`. New `solo` are meant to be in feed (project messages) form

## 1.0.0-rc11

* changed file and image fields schema. Image variations are embed now to be able to get any image into its right size.

```json
{
  "logo": "https://filer-creads-partners.s3-eu-west-1.amazonaws.com/myfile.jpg"
}
```

becomes:


```json
{
  "logo": {
    "url": "https://filer-creads-partners.s3-eu-west-1.amazonaws.com/myfile.jpg",
    "variations": {
      "icon": {
        "url": "https://filer-creads-partners.s3-eu-west-1.amazonaws.com/cache/icon/myfile.jpg"
      },
      "thumb": {
        "url": "https://filer-creads-partners.s3-eu-west-1.amazonaws.com/cache/icon/myfile.jpg"
      }
    }
  }
}
```

## 1.0.0-rc8

* removed /files endpoint
* added `logo` field in Organization returned by `/p/organizations/{hostname}`
* removed endpoint `/organizations/{gid}/logo_{variation}.jpg`, use embed S3 URL in Organization returned by `/p/organizations/{hostname}`
* removed  endpoint `/dl`, use embed S3 URL in resources
* changed `organization.logo` field type
* changed `project.receipt_filepath`, `project.brief_file` and `project.source_file` field type
* Removed embed file resource in worker.image, replaced by a filepath in worker.avatar_filepath
* changed `work.image` and `work.thumbnail` field type
* replaced `worker.image` field by `worker.avatar`
* added `me.upload_form` field when responding to GET /me and having scope `upload_files`

## 1.0.0-rc4

* Added `test` to organization, option that allows to create Organizations where project are not charged

## 1.0.0-rc3

* added `last_seen` and `projects_count` fields in resource User for admin only
* Added `avatar` to user, generated from his firstname and lastname

## 1.0.0-rc2

* Added `budget` and `user_rank` fields to invitation (data to be provided to generated user)
* Added project state `require_approval` for over-budget project to be launched by manager

## 1.0.0-rc1

* /products/{gid}/organizations is now restricted to admin only

## 1.0.0-beta23

* added `published_at` to `project` resource to display the date of publication (formerly in `started_at`)
* added `canceled_at` to `project` resource to display the date of cancelation
* `started_at` in `project` now contains the date at which the project is really in progress

## 1.0.0-beta21

* added new OAuth2 scope `files` that allows to fetch only files resources
* renamed `/me/change-password` to `/me/password`
* client authenticated with `client_credentials` won't be able to request `GET /me, PUT /me, GET /me/member_of`
* only *admin* users can request `POST /works`, `PUT /works/{gid}`, `DELETE /works/{gid}`

## 1.0.0-alpha14

> everything started here
