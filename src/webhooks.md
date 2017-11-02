---
title: Webhooks
layout: page.nunjucks
collection: api
date: 2017-11-02
---

# Webhooks

Des webhooks sont disponibles sur l'API Creads Partners. Il vous permetteront d'être notifié des changements et évènements qui opèrent au sein de votre Organisation.

## Activer les webhooks

Pour activer les webhooks, il vous faut

* Un compte **developer** (contactez notre support pour activer cette option).
* Ajouter un nouveau webhook dans le menu *Developer* de l'application Creads Partners
* Un serveur qui répond à l'url que vous avez renseignée dans l'interface *Developer*

## Erreurs

En cas d'erreur sur un de vos webhooks (erreur HTTP ou bien échec de connexion), nous retenterons de vous notifier plusieurs fois.

Si trop d'échecs successifs se produisent, **le webhook sera désactivé** le temps que vous régliez le problème, et vous serez **notifiés par email** du problème.

## Évènements

Les notifications webhooks qui sont envoyées suivent un schéma d'évènements se constituant comme ceci:

| Attribut                | Description                                                               |
|-------------------------|---------------------------------------------------------------------------|
| `event`                 | Le type d'évènement déclenché (création, mise à jour, suppression)        |
| `resource_type`         | Le type de la ressource concernée                                         |
| `resource_gid`          | Le gid de la ressource concernée                                          |
| `resource`              | La ressource dans son nouvel état (absent dans le cas de la suppression)  |

Les type d'évènements possibles sont les suivants

| Type               | Description                            |
|--------------------|----------------------------------------|
| `resource.created` | La ressource vient d'être créée.       |
| `resource.updated` | La ressource a subie des modifications |
| `resource.deleted` | La ressource a été supprimée           |

## Évènements disponibles


Voici une liste à date des évènements webhooks qui sont disponibles, par ressource:

### Invitation
* `resource.created`
* `resource.updated`
* `resource.deleted`


### Organization
* `resource.updated`


### Product
* `resource.updated`


### Membership
* `resource.created`
* `resource.updated`
* `resource.deleted`


### Project
* `resource.created`
* `resource.updated`
* `resource.deleted`


### Project Message
* `resource.created`


### Work
* `resource.created`


### Webhook
* `resource.created`
* `resource.updated`
* `resource.deleted`


### Comment
* `resource.created`



