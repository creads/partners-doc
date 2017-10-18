---
title: Overview
layout: page.nunjucks
permalink: false
collection: api
date: 2015-01-01
---

# Overview

L'API est actuellement en version `beta`. Sa spécification peut être amenée à évoluer. Les changements de spécification apparaissent dans la section Changelogs.

Ce document est à l'état de brouillon et peut être incomplet. Pour toute information d'ordre technique, contactez teamdev@creads.org.

## Schema

Tous les accès à API se font sur couche HTTPS, sur le domaine `api.creads-partners.com`. Toutes les données sont envoyées et reçues en JSON.

```bash
curl -i https://api.creads-partners.com/v1/
```

Réponse :
```
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Type: application/json
Date: Thu, 03 Sep 2015 08:55:35 GMT
Server: nginx/1.6.2
Content-Length: 72
Connection: keep-alive

{"name":"Creads Partners API","version":"1.0.0"}
```

Les champs vides sont inclus en tant que valeur `null` plutôt que d'être omis.

Toutes les dates sont renvoyées au format ISO 8601:

```
YYYY-MM-DDTHH:MM:SS+0000
```

### Représentation partielle

> La représentation partielle n'est **pas supportée dans la version 1.0.0-alphaXXX**

Quand vous récupérez une liste de ressources, la réponse contient une sous-sélection d'attributs de cette ressource.

**Exemple**: Quand vous récupérer la liste des catégories de produits (https://api.creads-partners.com/v1/categories), vous obtenez une représentation partielle de chaque categorie.

```json
{
    "total_count": 7,
    "items": [
        {
            "gid": "55e80f50da498",
            "created_at": "2015-09-03T09:13:52+0000",
            "modified_at": "2015-09-03T09:13:52+0000",
            "href": "/categories/55e80f50da498",
            "is_removable": true,
            "title": "Exécution graphique"
        },
        {
            "gid": "55e80f50da568",
            "created_at": "2015-09-03T09:13:52+0000",
            "modified_at": "2015-09-03T09:13:52+0000",
            "href": "/categories/55e80f50da568",
            "is_removable": false,
            "title": "Logo & Identité"
        },
        ...
    ]
}
```

### Représentation complète

Quand vous récupérez une ressource individuelle, la réponse renvoyée contient généralement tous les attributs pour cette ressource.
C'est la vue "complète" de la ressource. (Notez que vos droits d'accès sur l'API peuvent influencer la présence de certains champs.)

**Exemple**: Quand vous récupérez une catégorie de produits (https://api.creads-partners.com/v1/categories/{gid}), sa représentation contient tous les champs.

```json
{
    "gid": "55e80f50da498",
    "created_at": "2015-09-03T09:13:52+0000",
    "modified_at": "2015-09-03T09:13:52+0000",
    "href": "/categories/55e80f50da498",
    "is_removable": true,
    "title": "Exécution graphique",
    "description": "Détourage photo, retouches photo, adaptation de fichiers..."
}
```

### Représentation de référence

Quand vous récupérez une ressource à laquelle est associée à une autre ressource, cette autre ressource apparait en sous-élement représenté partiellement.
Cette représentation est une "représentation de référence" contenant les éléments essentiels pour identifier la resource associée.

**Exemple**: Quand vous récupérer un projet (https://api.creads-partners.com/v1/projects/{gid}), sa représentation contient une référence `owner` vous permettant de retrouver l'utilisateur qui à créé le project.

```json
{
    "gid": "55e80f5163e3a",
    "owner": {
        "gid": "55e80f4b9f4c9",
        "href": "/users/55e80f4b9f4c9"
    },
    ...
}

```

## Paramètres

Plusieurs méthodes de l'API supportent des paramètres optionnels.
Pour les requêtes GET, ormis les paramètres obligatoires présents dans le segment d'URL, les paramètres optionnels doivent être passés comme paramètre d'URL HTTP (query string parameter).

**Exemple**: On récupère la liste des utlisateurs, triés pas date de création:

```bash
curl -i https://api.creads-partners.com/v1/users?orderBy=created_at
```

Pour les requêtes POST, PUT et DELETE, mes paramètres ne sont pas inclus dans l'URL mais encodés en JSON dans le *body* de la requête
dont l'entête `Content-Type` doit être initialisé à la valeur `application/json`.

For POST, PATCH, PUT, and DELETE requests, parameters not included in the URL should be encoded as JSON with a Content-Type of ‘application/json’:

```bash
curl -i -X POST -d '{"firstname":"John"}' https://api.creads-partners.com/v1/users/55e80f4af117f
```

## Erreurs HTTP

Il y a plusieurs sortes d'erreurs possibles.

1. Envoyer un JSON invalide provoquera une réponse `400 Bad Request`.

2. Envoyer une requête non-identifiée ou avec un token invalide provoquera une réponse `401 Unauthorized`

3. Envoyer une requête à un endpoint nécessitant des droits supérieurs provoquera une réponse `403 Forbidden`

4. Envoyer une requête à une ressource inexistante provoquera une réponse `404 Not found`

5. Envoyer une requête des champs invalides provoquera une réponse `422 Unprocessable Entity`

> L'erreur 422 n'est **pas supportée dans la version 1.0.0-alphaXXX**. Renvoie `400 Bad Request` en lieu et place.


Toutes les erreurs ont un schéma de réponse équivalent:

```
HTTP/1.1 403 Forbidden
Host: localhost:8000
Connection: close
X-Powered-By: PHP/5.5.27
Cache-Control: no-cache
Date: Thu, 03 Sep 2015 12:13:26 GMT
X-Debug-Token: 450626
X-Debug-Token-Link: /_profiler/450626
Content-Type: application/json

{"error":{"code":403,"message":"Forbidden"}}
```

## Redirections HTTP

L'API peut utiliser des redirections HTTP. Le client doit faire en sorte que ces redirections soient prises en charge.
Les redirections portent une entête `Location` qui contient l'URL de la resource vers laquelle le client doit renvoyer la requête.

| Status code | Description            |
|-------------|------------------------|
| 301         | Redirection permanente |
| 302         | Redirection temporaire |

## Actions HTTP

L'API utiliser les méthodes HTTP pour identifier l'action à exécuter sur les ressources.

| Action | Description                                                                                                                                 |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | Utilisée pour obtenir une ressource                                                                                                         |
| POST   | Utilisée pour créer une ressource.                                                                                                          |
| PUT    | Utilisée pour mettre à jour une ressource.                                                                                                  |
| DELETE | Utilisée pour supprimer une ressource.                                                                                                      |
| HEAD   | Utilisée sur une ressource pour obtenir seulement le status code et les en-têtes. Permet notamment de vérifier l'existence d'une ressource. |

## Authentification

En dehors du endpoint de base (https://api.creads-partners.com/v1/), tous les autres endpoints nécessitent d'être authentifié pour être interrogés.
Certaines requêtes non-authentifiées peuvent retourner `404 Not Found` au lieu de `403 Forbidden` pour prévenir de fuites de sécurité.

L'authentification se fait grâce à un token OAuth2 (access token).
Veuillez lire la section [authentication OAuth2](/doc/api/oauth2) pour plus d'information sur les méthodes pour obtenir un access token.

Il y a deux solutions pour authentifier les requêtes à l'aide du token OAuth2:

**Token Oauth2 envoyé en en-têtes:**

```bash
curl -H "Authorization: Bearer OAUTH-TOKEN" https://api.creads-partners.com/v1/me
```

**Token Oauth2 envoyé en paramètre d'URL:**

```bash
curl https://api.creads-partners.com/v1/me?access_token=OAUTH-TOKEN
```

Si l'authentification échoue, la réponse retournée prendra la forme d'une `401 Unauthorized`:

```json
{
    "error": "invalid_grant",
    "error_description": "The access token provided is invalid."
}
```

## Timezones

Certaines requêtes renvoient des dates ou nécessitent d'en envoyer.
**Toutes les dates renvoyées par l'API sont exprimées en temps universelle (UTC) au format ISO 8601.**

Par exemple :

```
2015-08-04T15:24:21+0000
```

Lorsque vous souhaitez soummetre une date générée sur un autre fuseau horaire qu'UTC, vous devez prendre soin de spécifier la timezone employée.
L'exemple présent sur le fuseau Europe/Paris en heure d'été sera :

```
2015-08-04T17:24:21+0200
```


## les collections de ressource

Les collections de resource représentent un ensemble d'items d'une certaine ressource accompagné d'un compte. Il s'agit des réponses aux requêtes `GET` sur les listes de resources (ex: `GET /projects`) ou de collections imbriquées dans une autre ressources.

Une collection est une resource qui contient deux attributs:

* `total_count`: Ce compte contient le nombre d'élements total correspondant à la requête faites (sans prendre en compte la pagination)
* `items`: un tableau d'éléments (ressources) du même type


### Recherche dans une collection

Certaines ressources sont *searchable* ce qui signifie que vous pouvez filtrer le résultat d'une requête sur la collection de cette resource.

Par exemple, si vous voulez avoir tous les produits existants, vous pouvez faire

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/products
```

Ce qui vous retournera une liste complète.

Si en revanche vous souhaitez obtenir seulement les produits d'une catégorie dont le gid est `$CATEGORY_GID`, vous pouvez filtrer cette requête via une query.

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/products?query=["category.gid", "==", "$CATEGORY_GID"]
```

Le paramètre d'url `query` est un tableau JSON. Il s'agit d'un assemblage *d'expressions* et d'opérateurs logiques.

Une *expression* se compose de trois éléments: un **champ**, un **opérateur**, et une **valeur**.

```json
[ "$FIELD", "$OPERATOR", "$VALUE"]
```

Les champs et opérateurs utilisables sont définies dans la documentation des resources.

#### Opérateurs conditionnels

* `==` : Egalité

Exemple: Produit dont le GID est 123456789

```json
["gid", "==", "123456789"]
```

* `!=` : Inegalité

Exemple: Produit dont le GID n'est pas 123456789

```json
["gid", !=", "123456789"]
```

* `<` : Inférieur (strict)

Exemple: Projets crééés après le 21 Octobre 2015 (strictement)

```json
["created_at", ">", "2015-08-21T01:00:00+0000"]
```

Note: la date doit être au format ISO 8601

* `>` : Supérieur (strict)
* `<=` : Inférieur ou égal
* `>=` : Supérieur ou égal
* `in` : Resources dont la valeur de *field* appartient au tableau *value*. La *value* pour cet opérateur doit-êtreun tableau de valeurs scalaires.
* `in` : Resources dont la valeur de *field* n'appartient pas au tableau *value*. La *value* pour cet opérateur doit-êtreun tableau de valeurs scalaires.
* `~=` : Opérateur **LIKE** qui permet de controler qu'un champ contient une expression. Le champ doit être **likable** pour effecteur ce genre de condition

Exemple: Produits dont le titre contient le mot 'projet'

```json
["title", "~=", "projet"]
```

* `intersect` : Intersection. La *value* pour cet opérateur doit-être elle-même une expression, elle permet de ne filter que les résultats qui répondent au membre droite de cette condition

Exemple: Produits contenant l'organisation dont le gid est 123456879

```json
["gid", "in", ["organizations.gid", "==", "123456789"]]
```

* `exclude` : Exclusion. Comme le précédent, permet d'obtenir une liste de resource n'étant pas comprise dans le résultat d'une autre condition.

Exemple: Produits ne contenant pas l'organisation dont le gid est 123456879

```json
["gid", "!in", ["organizations.gid", "==", "123456789"]]
```

#### Opérateurs Logiques

Vous pouvez également assembler plusieurs expressions dans la même `query` de manière logique. Par défaut, apposer les expressions en liste réalisera des **ET logiques** entre chacune:

Imaginons cette query sur `/products`

```json
[["title", "~=", "projet"],["gid", "==", "123456789"],["category.gid", ">=", "12456789"]]
```

Cette requête signifie :

> Tous les produits dont le titre contient "projet" **et** dont le gid est 123456789 **et** donc la category a un gid supérieur à 123456789

Si vous souhaitez la version explicite de cette logique, il faut appliqer un `AND` a la liste d'expressions:

```json
["AND", [ ["title", "~=", "projet"], ["gid", "==", "123456789"], ["category.gid", ">=", "12456789"] ]]
```

De la même manière, le **OU logique** est possible.:

```json
["OR", [ ["title", "~=", "projet"],,["gid", "==", "123456789"], ["category.gid", ">=", "12456789"] ]]
```

En d'autres termes:

```json
["$OPERATOR", [ $EXPRESSION_LIST ]]
```

Pour **prioriser** un opérateur logique, il faut *imbriquer* une query en tant qu'expression :

```json
["AND", [["title", "~=", "projet"], ["OR", [["category.gid", ">=", "12456789"], ["gid", "==", "123456789"]]] ] ]
```

se traduit:

> Produits dont le titre contient "projet" **ET** ( gid égale 123456789 **OU** category a un gid supérieur à 123546789 )


### Tri d'une collection

Vous pouvez ordonner et trier les réponses d'une requête en utilisant les paramètres de requête `orderBy` et `sort`.

* `orderBy` permet de trier selon le champ d'une ressource (à condition que ce champ soit *orderable*, c.f. References)
* `sort` vous permet de choisir l'ordre de tri ascendant (`asc`) ou descendant (`desc`). Par défaut, cette valeur est à `asc`

Pour obtenir les projets triés par date de modification (les plus récents en premier):

```
/projects?orderBy=modified_at&sort=desc
```

### Pagination d'une collection

Il est possible d'utiliser la pagination (et la cumuler avec le tri et les `query`) pour n'afficher qu'une partie des résultats. Les paramètres de requêtes `offset` et `limit` vous permettent cette opération.

* `offset` définit l'index de l'élément à partir duquel afficher la collection de réponse
* `limit` définit le nombre d'éléments maximum à afficher

Par exemple, pour obtenir la deuxieme page de la liste de projet, à raison de 10 éléments par page:

```
/projects?offset=10&limit=10
```

