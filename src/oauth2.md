---
title: OAuth2
layout: page.nunjucks
collection: api
date: 2015-01-02
---

# OAuth2

L'API Creads Partners utilise OAuth2 comme unique protocole d'authentification.
Vous devez disposer d'un compte Creads Partners et d'identifiants pour votre application.
Le compte Creads Partners est un couple email + mot de passe.
Les identifiants d'application sont un *Client ID* et un *Client Secret* OAuth.
**Ses identifiants ne doivent jamais être partagés.**

Si vous n'avez pas de compte Creads Partners ou pas d'identifiants d'application,
veuillez contacter contact@creads-partners.com.

## Workflow pour une application serveur

**client_credentials** grant type

Ce workflow permet d'authentifier une application qui ne nécessite pas d'authentification de plusieurs utilisateurs Partners différents.

Obtenir un access token:

```
curl -u CLIENT_ID:CLIENT_SECRET "https://api.creads-partners.com/oauth2/token" -d 'grant_type=client_credentials'
```

> remplacer `CLIENT_ID` par votre *Client ID*
> remplacer `CLIENT_SECRET` par votre *Client Secret*

Réponse:
```
{
    "access_token": "MWFjYjgxZGRmMTRjMDA0MDUyYmNmODA5ZDRlNzFjYTc1NTZlYzc0ODMwYTc2OTE3NzIzYzY4ZDc0OGE4YWRhYg",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "base"
}
```

## Workflow pour une application serveur avec authentification de chaque utilisateur Partners

**password** grant type

Ce workflow permet d'authentifier des utilisateurs Partners différents.
Le serveur doit obtenir un *access token* et le stocker en l'associant à un utilisateur (en session par exemple).
L'*access token* devra être associé à toutes les requêtes effectuées par l'utilisateur.

```
curl -u CLIENT_ID:CLIENT_SECRET "https://api.creads-partners.com/oauth2/token?grant_type=password' -d 'grant_type=password&username=USERNAME&password=PASSWORD'
```

> remplacer `CLIENT_ID` par votre *Client ID*
> remplacer `CLIENT_SECRET` par votre *Client Secret*
> remplacer `USERNAME` par l'email de l'utilisateur à authentifier
> remplacer `PASSWORD` par le mot de passe saisie par l'utilisateur à authentifier

Réponse:
```
{
    "access_token": "NWE4MmVmZjgyYjA1NTBkODI5ZDY1ZmFlMGZlZmIyZTE1NDE1MWM2ZmQ0NjEwMjNlYmI0M2MxNDYxOTMyNmFlMQ",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "base",
    "refresh_token": "ZWNmZWEwNjU0OTY5ZjUxMThjN2VlM2NkMjI5MDk1OWM3MGE1NTI2OTNmMzUwZWU3M2MzZTc0ZmFiMmVhYTk4Nw"
}
```


## Refresh token (*refresh_token* grant type)

**refresh_token** grant type

Permet de raffraichir un *access token* OAuth2 sans redemander le mot de passe de l'utilisateur.
A l'obtention d'un *access token* et son stockage sur le serveur, on peut également stocker un *refresh token*.
Ce *refresh token* valable pour une plus longue durée permettra d'obtenir un nouvel *access token* pour un utilisateur Partners sans le forcer à resaisir son mot de passe.

```
curl -u CLIENT_ID:CLIENT_SECRET "https://api.creads-partners.com/oauth2/token?grant_type=password' -d 'grant_type=refresh_token&refresh_token=REFRESH_TOKEN'
```

> remplacer `CLIENT_ID` par votre *Client ID*
> remplacer `CLIENT_SECRET` par votre *Client Secret*
> remplacer `REFRESH_TOKEN` par le *refresh token* obtenu avec l'*access token*

Réponse:
```
{
    "access_token": "NWE4MmVmZjgyYjA1NTBkODI5ZDY1ZmFlMGZlZmIyZTE1NDE1MWM2ZmQ0NjEwMjNlYmI0M2MxNDYxOTMyNmFlMQ",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "base",
    "refresh_token": "ZWNmZWEwNjU0OTY5ZjUxMThjN2VlM2NkMjI5MDk1OWM3MGE1NTI2OTNmMzUwZWU3M2MzZTc0ZmFiMmVhYTk4Nw"
}
```

## Scopes

L'API Partners permet de demander un `access_token` pour un `scope` particulier lors de l'authentification. Par défaut, cette valeur est définie à `base`.

### Scopes existants

* **base**: Permet d'obtenir et modifier des resources et des fichiers (soumis aux règles de sécurité de l'utilisateur)
* **files**: Ne permet que d'obtenir des images ou des fichiers sur les endpoints prévus à cet effet.
* **upload_files**: Permet d'uploader des fichiers.

> Un token avec le scope `base` ne devrait **jamais** être exposé à un client. L'obtention de ce token par un tiers constitue une faille de sécurité

### Donner accès aux images à des utilisateurs anonymes

Si une application (grant type `client_credentials`) a besoin d'afficher une image à ses utilisateurs qui ne sont pas eux mêmes authentifiés sur Partners, les scopes permettent d'exposer un token non critique pour effectuer cet affichage.


Obtenir un access token pour les fichiers:

```
curl -u CLIENT_ID:CLIENT_SECRET "https://api.creads-partners.com/oauth2/token" -d 'grant_type=client_credentials' -d 'scope=files'
```

> remplacer `CLIENT_ID` par votre *Client ID*
> remplacer `CLIENT_SECRET` par votre *Client Secret*
> Remarquer *scope=files*

Réponse:
```
{
    "access_token": "MWFjYjgxZGRmMTRjMDA0MDUyYmNmODA5ZDRlNzFjYTc1NTZlYzc0ODMwYTc2OTE3NzIzYzY4ZDc0OGE4YWRhYg",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "files"
}
```

Ce token peut maintenant être joint à l'url d'une image :

```
<img src="https://api.creads-partners.com/v1/img/whateverImage.png?access_token=ACCESS_TOKEN">
```

> remplacer `ACCESS_TOKEN` par la valeur de ce champ dans la réponse obtenue précédemment

