---
title: Ressources
layout: page.nunjucks
collection: api
date: 2015-01-03
---

# Ressources

Pour les exemples de cette documentation nous utilisons curl comme solution générique.
Une variable `TOKEN` est initialisée avec la valeur du token OAuth obtenu lors de l'authentification OAuth2.

Par exemple :
```bash
export TOKEN=MjZjNGFiZjExN2U1NzIzMGI3MmI5ZGIxZGRjYzA5YTIyMTVhOGVkMTk1YzUxYzkxYmI2YmVhYjgyZjNhZmM1NA
```

## Organization

Une ressource `Organization` (organisation) représente un partenaire ou une sous-entité d'un partenaire. Elle isole les utilisateurs, produits, projets, travaux et factures par entité.

**Seules les organisations desquelles vous êtes membre ou manager sont accessibles.**

### Obtenir la liste des organisations

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/organizations
```

Réponse :
```json
{
    "total_count": 3,
    "items": [
        {
            "gid": "55f2ab761d0bd",
            "created_at": "2015-09-11T10:22:46+0000",
            "modified_at": "2015-09-11T10:22:46+0000",
            "href": "/organizations/55f2ab761d0bd",
            "name": "WayneCorp",
            "hostname": null,
            "vat": null,
            "billing_address": {
                "division": null,
                "address1": null,
                "address2": null,
                "zipcode": "10007",
                "city": "Gotham City",
                "state": null,
                "country": "US",
                "additional": null,
                "country_name": "États-Unis"
            }
        }
        ...
    ]
}
```

### Chercher des organisations

Le paramètre d'URL `query` appliqué au *endpoint* [précédement évoqué](#Obtenir la liste des organisations) permet d'effectuer une recherche dans les organisations. Pour savoir comment utiliser ce paramètre d'URL veuillez vous référer à [Recherche dans une collection](overview#Recherche dans une collection).

Les champs sur lequel on peut effectuer une recherche sont les suivants :

 * `products.gid` : les organisations pour lesquelles un produit donné est activé

Par exemple, pour rechercher des organisations qui ont le produit de gid `55a6842ac3f6b` activé :
```bash
curl -H "Authorization: Bearer $TOKEN" 'https://api.creads-partners.com/v1/organizations?query=\["products.gid","==","55a6842ac3f6b"\]'
```

### Obtenir une organisation (par son GID)

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/organizations/55f2ab761d0bd
```

Réponse :
```json
{
    "gid": "55f2ab761d0bd",
    "created_at": "2015-09-11T10:22:46+0000",
    "modified_at": "2015-09-11T10:22:46+0000",
    "href": "/organizations/55f2ab761d0bd",
    "name": "WayneCorp",
    "hostname": null,
    "vat": null,
    "billing_address": {
        "division": null,
        "address1": null,
        "address2": null,
        "zipcode": "10007",
        "city": "Gotham City",
        "state": null,
        "country": "US",
        "additional": null,
        "country_name": "États-Unis"
    }
}
```

### Créer une organisation

**Seul un utilisateur *admin* peut créer une organisation.**

### Modifier une organisation

**Seul un utilisateur *admin* peut modifier une organisation.**

### Supprimer une organisation

**Seul un utilisateur *admin* peut modifier une organisation.**

## User

Une ressource `User` (utilisateur) représente un utilsateur de l'application.

Un utilisateur peut être désigné *manager* de l'organisation par un utilisateur *admin*.
Un manager a alors le droit de :
 * voir les bons de commande de tous les collaborateurs de l'organisation
 * inviter de nouveaux utilisateurs à utiliser l'outil (collaborateur)
 * configurer une limite de dépense pour chaque collaborateur

**Seuls votre compte utilisateur et les utilisateurs des organisations desquelles vous êtes *manager* sont accessibles.**

### Obtenir la liste des utilisateurs

```bash
curl -i -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/users
```

Réponse :
```json
{
    "total_count": 22,
    "items": [
        {
            "gid": "55f2a84f150a2",
            "created_at": "2015-09-11T10:09:19+0000",
            "modified_at": "2015-09-11T10:09:19+0000",
            "href": "/users/55f2a84f150a2",
            "firstname": "Doe",
            "lastname": "John",
            "email": "j.doe@creads.org",
            "locale": "FR",
            "phone": null,
            "mobile_phone": null,
            "member_of": [
                {
                    "gid": "55f2ac24163ed",
                    "monthly_budget": null,
                    "is_manager": false,
                    "monthly_spent": {
                        "amount": 0,
                        "currency": "EUR"
                    },
                    "organization": {
                        "gid": "55f2ab761d0bd",
                        "href": "/organizations/55f2ab761d0bd",
                        "name": "WayneCorp",
                        "hostname": null
                    }
                }
            ],
            "roles": [
                "user"
            ],
            "pending_email": null
        }
        ...
    ]
}
```

### Chercher des utilisateurs

Le paramètre d'URL `query` appliqué au *endpoint* [précédement évoqué](#Obtenir la liste des utilisateurs) permet d'effectuer une recherche dans les organisations. Pour savoir comment utiliser ce paramètre d'URL veuillez vous référer à [Recherche dans une collection](overview#Recherche dans une collection).

Les champs sur lequel on peut effectuer une recherche sont les suivants :

 * `created_at` : les utilisateurs en fontion de leur date de création
 * `modified_at` : les utilisateurs en fontion de leur date de dernière modification
 * `member_of.organization.gid` : les utilisateurs membres d'une organisation donnée

Par exemple, pour rechercher un utilisateur créé après minuit du 11/09/2015 (en temps universel) :
```bash
curl -H "Authorization: Bearer $TOKEN" 'https://api.creads-partners.com/v1/users?query=\["created_at",">","2015-09-11T00:00:00Z"\]'
```

### Obtenir un utilisateur (par son GID)

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/users/55f2a84f150a2
```

Réponse :
```json
{
    "gid": "55f2a84f150a2",
    "created_at": "2015-09-11T10:09:19+0000",
    "modified_at": "2015-09-11T10:09:19+0000",
    "href": "/users/55f2a84f150a2",
    "firstname": "Doe",
    "lastname": "John",
    "email": "j.doe@creads.org",
    "locale": "FR",
    "phone": null,
    "mobile_phone": null,
    "member_of": [
        {
            "gid": "55f2ac24163ed",
            "monthly_budget": null,
            "is_manager": false,
            "monthly_spent": {
                "amount": 0,
                "currency": "EUR"
            },
            "organization": {
                "gid": "55f2ab761d0bd",
                "href": "/organizations/55f2ab761d0bd",
                "name": "WayneCorp",
                "hostname": null
            }
        }
    ],
    "roles": [
        "user"
    ],
    "pending_email": null
}
```

### Créer un utilisateur

**Seul un utilisateur *admin* peut créer un utilisateur.**

### Modifier un utilisateur

**Seul un utilisateur *admin* peut modifier un utilisateur.**


### Supprimer un utilisateur

**Seul un utilisateur *admin* peut supprimer un utilisateur**

## Product

Une ressource `Product` (produit) représente un produit qu'un utilisateur de votre organisation peut commander.

**Seuls les produits activés dans les organisations desquelles vous êtes membre ou *manager* sont accessibles.**

### Obtenir la liste des produits

Pour une organisation donnée, vous pouvez obtenir la liste des produits possibles à commander

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/orgs/55f2ab761d0bd/products
```

Réponse :
```json
{
    "total_count": 14,
    "items": [
        {
            "gid": "55a6842ac3f6b",
            "created_at": "2015-08-04T15:24:23+0000",
            "modified_at": "2015-09-11T12:22:06+0000",
            "href": "/products/55a6842ac3f6b",
            "category": {
                "gid": "55c0d9279d5a6",
                "href": "/categories/55c0d9279d5a6",
                "title": "Logo & Identité"
            },
            "title": "Logo",
            "available_options": {
                "due": {
                    "type": "integer",
                    "default": 5,
                    "required": true,
                    "enum": [
                        1,
                        2,
                        5,
                        10
                    ]
                },
                "mode": {
                    "type": "string",
                    "default": "solo",
                    "required": true,
                    "enum": [
                        "solo",
                        "multi"
                    ]
                },
                "skill": {
                    "type": "string",
                    "default": "conception",
                    "required": true,
                    "enum": [
                        "conception",
                        "execution"
                    ]
                }
            },
            "additional_meta": {
                "solo_mode_meta": {
                    "description": "- Sollicitation d'un designer professionnel pour votre projet.\n- Recevez 3 propositions de logo.\n- 3 aller/retours sur celle de votre choix et recevez les fichiers sources.",
                    "brief_template": "Décrivez votre besoin, le contexte du projet, les livrables attendus..."
                },
                "multi_mode_meta": {
                    "description": "- Sollicitation de 3 designers professionnels pour votre projet.\n- Recevez 9 propositions de logo.\n- 3 aller/retours sur celle de votre choix et recevez les fichiers sources.",
                    "brief_template": "Décrivez votre besoin, le contexte du projet, les livrables attendus..."
                }
            },
            "is_enabled": true,
            "is_cumulative": false,
            "interface": "default"
        },
        ...
    ]
}
```

### Chercher des produits

Le paramètre d'URL `query` appliqué au *endpoint* [précédement évoqué](#Obtenir la liste des produits) permet d'effectuer une recherche dans les produits. Pour savoir comment utiliser ce paramètre d'URL veuillez vous référer à [Recherche dans une collection](overview#Recherche dans une collection).

Les champs sur lesquels on peut effectuer une recherche sont les suivants :

 * `category.id` : les produits d'une catégorie donnée
 * `organizations.gid` : les produits activés dans une organisation donnée

Par exemple, pour rechercher la produits de la catégorie *Logo & Identité* :
```bash
curl -H "Authorization: Bearer $TOKEN" 'https://api.creads-partners.com/v1/products?query=\["category.gid","==","55c0d9279d5a6"\]'
```

### Obtenir un produit (par son GID)

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/products/55a6842ac3f6b
```

Réponse :
```json
{
    "gid": "55a6842ac3f6b",
    "created_at": "2015-08-04T15:24:23+0000",
    "modified_at": "2015-09-11T12:22:06+0000",
    "href": "/products/55a6842ac3f6b",
    "category": {
        "gid": "55c0d9279d5a6",
        "href": "/categories/55c0d9279d5a6",
        "title": "Logo & Identité"
    },
    "title": "Logo",
    "available_options": {
        "due": {
            "type": "integer",
            "default": 5,
            "required": true,
            "enum": [
                1,
                2,
                5,
                10
            ]
        },
        "mode": {
            "type": "string",
            "default": "solo",
            "required": true,
            "enum": [
                "solo",
                "multi"
            ]
        },
        "skill": {
            "type": "string",
            "default": "conception",
            "required": true,
            "enum": [
                "conception",
                "execution"
            ]
        }
    },
    "additional_meta": {
        "solo_mode_meta": {
            "description": "- Sollicitation d'un designer professionnel pour votre projet.\n- Recevez 3 propositions de logo.\n- 3 aller/retours sur celle de votre choix et recevez les fichiers sources.",
            "brief_template": "Décrivez votre besoin, le contexte du projet, les livrables attendus..."
        },
        "multi_mode_meta": {
            "description": "- Sollicitation de 3 designers professionnels pour votre projet.\n- Recevez 9 propositions de logo.\n- 3 aller/retours sur celle de votre choix et recevez les fichiers sources.",
            "brief_template": "Décrivez votre besoin, le contexte du projet, les livrables attendus..."
        }
    },
    "is_enabled": true,
    "is_cumulative": false,
    "interface": "default",
    "organizations": [
        {
            "gid": "55f2ab761d0bd",
            "href": "/organizations/55f2ab761d0bd",
            "name": "WayneCorp",
            "hostname": null
        }
    ]
}
```

### Créer un produit

**Seul un utilisateur *admin* peut créer un produit.**

### Modifier un produit

**Seul un utilisateur *admin* peut modifier un produit.**

### Supprimer un produit

**Seul un utilisateur *admin* peut modifier un produit.**

## Project

Une ressource `Project` représente une commande d'un produit qu'un utilisateur peut effectuer.

**En tant que qu'utilisateur simple, seuls les projets que vous avez créés ou auxquels vous êtes invités à collaborer sont accessibles.**
**En tant qu'utilisateur *manager*, seuls les projets créés dans les organisations desquelles vous êtes *manager* sont accessibles.**

### Obtenir la liste des projets

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/projects
```

Réponse :
```json
{
    "total_count": 4,
    "items": [
        {
            "gid": "55c0d927cad5c",
            "created_at": "2015-08-04T15:24:23+0000",
            "modified_at": "2015-08-04T15:24:23+0000",
            "href": "/projects/55c0d927cad5c",
            "started_at": "2015-08-04T15:24:23+0000",
            "finished_at": null,
            "status": "in_progress",
            "title": "Malesuada",
            "description": "Caesaris observante",
            "options": {
                "due": 1,
                "mode": "solo",
                "skill": "conception"
            },
            "quantity": 1,
            "owner": {
                "gid": "55f2a84f150a2",
                "href": "/users/55f2a84f150a2"
            },
            "organization":         {
                "gid": "55f2ab761d0bd",
                "href": "/organizations/55f2ab761d0bd",
                "name": "WayneCorp",
                "hostname": null
            },
            "product": {
                "gid": "55a6842ac3f6b",
                "href": "/products/55a6842ac3f6b"
            },
            "brief_files": [],
            "source_files": [],
            "receipt_file": null,
            "price": {
                "amount": 1470,
                "currency": "EUR"
            },
            "vat": {
                "amount": 0,
                "ratio": 0,
                "currency": "EUR"
            },
            "winner": null
        },
        ...
    ]
}
```

### Chercher des projets

Le paramètre d'URL `query` appliqué au *endpoint* [précédement évoqué](#Obtenir la liste des projets) permet d'effectuer une recherche dans les projets. Pour savoir comment utiliser ce paramètre d'URL veuillez vous référer à [Recherche dans une collection](overview#Recherche dans une collection).

Les champs sur lesquels on peut effectuer une recherche sont les suivants :

 * `organization.id` : les projets d'une organisation donnée.
 * `owner.gid` : les projets créés par un utilisateur donnée.
 * `status` : les projets dans un état donné.
 * `created_at` : les projets créés par rapport à une date donnée.


Par exemple, pour rechercher les projets créés dans l'organization *WayneCorp* depuis le début de l'année :
```bash
curl -H "Authorization: Bearer $TOKEN" 'https://api.creads-partners.com/v1/projects?query=\[\["organization.gid","==","55f2ab761d0bd"\],\["created_at",">=","2015-01-01T00:00:00Z"\]\]'
```

### Obtenir un projet (par son GID)

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/project/55c0d927cad5c
```

Réponse :
```json
{
    "gid": "55c0d927cad5c",
    "created_at": "2015-08-04T15:24:23+0000",
    "modified_at": "2015-08-04T15:24:23+0000",
    "href": "/projects/55c0d927cad5c",
    "started_at": "2015-08-04T15:24:23+0000",
    "finished_at": null,
    "status": "in_progress",
    "title": "Malesuada",
    "description": "Caesaris observante",
    "options": {
        "due": 1,
        "mode": "solo",
        "skill": "conception"
    },
    "quantity": 1,
    "owner": {
        "gid": "55f2a84f150a2",
        "href": "/users/55f2a84f150a2"
    },
    "organization":         {
        "gid": "55f2ab761d0bd",
        "href": "/organizations/55f2ab761d0bd",
        "name": "WayneCorp",
        "hostname": null
    },
    "product": {
        "gid": "55a6842ac3f6b",
        "href": "/products/55a6842ac3f6b"
    },
    "brief_files": [],
    "source_files": [],
    "receipt_file": null,
    "price": {
        "amount": 1470,
        "currency": "EUR"
    },
    "vat": {
        "amount": 0,
        "ratio": 0,
        "currency": "EUR"
    },
    "winner": null
}
```

### Créer un projet

Un projet est une commande d'un produit dans une configuration donnée.

Vous pouvez vous abstenir de choisir un produit si aucun ne vous convient, en réalisant une [demande spécifique](#demande-sp-cifique).

#### Obtenir les options du produit

Avant de créer un projet, on doit d'abord connaitre les options disponibles pour le produit du projet (mode, délai, métier...) et s'il peut être cumulé.
Cette récupération peut être faite une fois pour toute car l'on suppose qu'un produit ne perdra pas ou ne changera pas de caractéristique.

Obtention du produit "Logo" :
```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/products/55a6842ac3f6b
```

Réponse :
```json
{
    "gid": "55a6842ac3f6b",
    "created_at": "2015-08-04T15:24:23+0000",
    "modified_at": "2015-09-11T12:22:06+0000",
    "href": "/products/55a6842ac3f6b",
    "category": {
        "gid": "55c0d9279d5a6",
        "href": "/categories/55c0d9279d5a6",
        "title": "Logo & Identité"
    },
    "title": "Logo",
    "available_options": {
        "due": {
            "type": "integer",
            "default": 5,
            "required": true,
            "enum": [
                1,
                2,
                5,
                10
            ]
        },
        "mode": {
            "type": "string",
            "default": "solo",
            "required": true,
            "enum": [
                "solo",
                "multi"
            ]
        },
        "skill": {
            "type": "string",
            "default": "conception",
            "required": true,
            "enum": [
                "conception",
                "execution"
            ]
        }
    },
    "additional_meta": {
        "solo_mode_meta": {
            "description": "- Sollicitation d'un designer professionnel pour votre projet.\n- Recevez 3 propositions de logo.\n- 3 aller/retours sur celle de votre choix et recevez les fichiers sources.",
            "brief_template": "Décrivez votre besoin, le contexte du projet, les livrables attendus..."
        },
        "multi_mode_meta": {
            "description": "- Sollicitation de 3 designers professionnels pour votre projet.\n- Recevez 9 propositions de logo.\n- 3 aller/retours sur celle de votre choix et recevez les fichiers sources.",
            "brief_template": "Décrivez votre besoin, le contexte du projet, les livrables attendus..."
        }
    },
    "is_enabled": true,
    "is_cumulative": false,
    "interface": "default",
    "organizations": [
        {
            "gid": "55f2ab761d0bd",
            "href": "/organizations/55f2ab761d0bd",
            "name": "WayneCorp",
            "hostname": null
        }
    ]
}
```

Le champ `available_options` indique au format [JSON Schema](http://json-schema.org/) les différentes options disponibles à la création du projet:

* `available_options.due` est le délai de rendu souhaité exprimé en jours. Observez la valeur `available_options.due.enum` pour savoir quels sont les délais possibles pour le produit.
* `available_options.mode` est le mode de travail souhaité. Observez la valeur `available_options.mode.enum` pour savoir quels sont les modes possibles pour le produit.
* `available_options.skill` est l'expertise métier souhaitée (Direction artistique, exécution, ...). Observez la valeur `available_options.skill.enum` pour savoir quels sont les modes possibles pour le produit.

Le champ `is_cumulative` est un booléen indiquant s'il est à `true` que le produit peut être commandé en quantité.

Le champ `additional_meta` contient des meta-données non-essentielles :
* `additional_meta.solo_mode_meta`: description détaillée du mode solo
* `additional_meta.multi_mode_meta`: description détaillée du mode multi

#### Calculer le prix d'un projet

La création d'un projet nécessite la vérification et l'approbation du prix de ce projet
Pour ce faire, le prix correct du projet doit être calculé puis soumis à la création du projet (`POST /projects`).

Par exemple, calcul du prix pour une commande en 2 jours d'un *Logo* en mode *solo* en *Direction artistique* :
```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/prices/for?product.gid=55a6842ac3f6b&organization.gid=55f2ab761d0bd&options.due=2&options.mode=solo&options.skill=conception
```

Réponse :
```json
{
    "gid": "55f307e922d88",
    "created_at": "2015-09-11T16:57:13+0000",
    "modified_at": "2015-09-11T16:57:13+0000",
    "href": "/prices/55f307e922d88",
    "organization": null,
    "product": {
        "gid": "55a6842ac3f6b",
        "href": "/products/55a6842ac3f6b"
    },
    "options": {
        "mode": "solo",
        "due": 2,
        "skill": "conception"
    },
    "amount": 735,
    "currency": "EUR"
}
```

#### Demande spécifique

Vous pouvez créer un projet sans produit et sans calculer son prix en procédant à une demande spécifique.

Pour ce faire, il vous faut envoyer `null` comme valeur du produit et `true` dans `specific_request`.

```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
    "title": "titre du projet",
    "description": "Description précise de la commande (brief)",
    "product": null,
    "specific_request": true,
    "state": "draft"
}' -X POST https://api-preprod.creads-partners.com/v1/projects
```

Ensuite, vous pouvez envoyer la demande en passant le statut à `waiting_for_proposal`.

```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
    "state": "waiting_for_proposal"
}' -X PUT https://api-preprod.creads-partners.com/v1/projects/1234567891012
```

Lorsque le projet aura reçu une proposition (avec ou sans produit), il passera en statut `proposal`, vous pourrez alors le publier en mettant son statut à `published` si votre budget et votre solde vous le permettent.

```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
    "state": "published"
}' -X PUT https://api-preprod.creads-partners.com/v1/projects/1234567891012
```


#### Créer le projet

Un projet peut être créé en état de brouillon (`state: draft`) pour pouvoir être modifié avant lancement définitif de la commande, ou définitivement lancé (`state: published).
Les options du projet doivent être précisées (voir [Obtenir les options du produit](#Obtenir les options du produit)).
Le prix calculé au préalable doit être soumis à titre d'approbation (voir [Calculer le prix d'un projet](#Calculer le prix d'un projet)).

Par exemple, création d'une commande en 2 jours d'un *Logo* en mode *solo* et *Direction artistique* avec validation du prix à 990.0€ :
```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
    "title": "titre du projet",
    "description": "Description précise de la commande (brief)",
    "product": {"gid": "55a6842ac3f6b"},
    "organization": {"gid": "55f2ab761d0bd"},
    "options": {"due":2, "mode": "solo", "skill": "conception"},
    "price": {"amount": 735.0},
    "state": "published"
}' -X POST https://api-preprod.creads-partners.com/v1/projects
```

Réponse :
```
```

Second exemple, création d'une commande en 2 jours de 3 *Logos* en mode *multi* et *Execution* avec validation du prix à 1800.0€ à l'état de brouillon :
```bash
curl -H "Authorization: Bearer $TOKEN" -d '{
    "title": "titre du projet 2",
    "description": "Description précise de la commande (brief)",
    "product": {"gid": "55a6842ac3f6b"},
    "organization": {"gid": "55f2ab761d0bd"},
    "options": {"due":2, "mode": "multi", "skill": "execution"},
    "price": {"amount": 1800.0},
    "state": "draft",
    "quantity": 3
}' -X POST https://api.creads-partners.com/v1/projects
```

Réponse :
```
HTTP/1.1 201 Created
Cache-Control: no-cache
Content-Type: application/json
Date: Fri, 18 Sep 2015 16:29:25 GMT
Location: /v1/projects/55fc3be3a69db
Server: nginx/1.6.2
Content-Length: 0
Connection: keep-alive
```

En complément, le project accepte un tableau de fichiers de brief qui peuvent accompagner la commande pour guider les créatifs.

```json
"brief_files": [
    {
        "url": "https://cre.ads/43348e3ea6-1.zip",
    },
    {
        "url": "https://cre.ads/43348e3ea6-2.zip",
    },
    {
        "url": "https://cre.ads/43348e3ea6-3.zip"
    }
],
```

### Modifier un projet

**En tant que qu'utilisateur, seuls les les projets que vous avez créé sont modifiables.**

## Works/Messages

* Dans le cadre des projets **solo** (avec un seul créatif), les projets sont gérés en mode **Project Box**. Des messages (resource `Project Message`) seront ajoutés au projet lorsque le créatif fera des propositions.
* Dans le cadre des projets **multi** (avec plusieurs créatifs), des créations (resource `Works`) seront ajoutés au projet lorsque des créatifs feront des propositions.

# Project Message

Dans le cas d'un projet solo, le contact avec le créatif s'effectue sous forme conversationnelle.

Le créatif postera ses questions et ses propositions qui apparaitront comme des messages. Le client peut répondre sous la même forme.

Ces messages acceptent des pièces jointes (`attached_files`).

Vous pouvez obtenir la liste des messages existants dans un projet :

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.creads-partners.com/v1/projects/55c0d927cad5c/messages
```

Réponse :
```json
{
    "total_count": 1,
    "items": [
        {
          "gid": "559befeeab59f",
          "href": "/project-message/559befeeab59f",
          "created_at": "2014-09-08T22:47:31-07:00",
          "modified_at": "2014-09-08T22:47:31-07:00",
          "accepted_at": null,
          "rejected_at": null,
          "message": "Lorem ipsum dolor sit amet",
          "project": {
            "gid": "559befeeab59a"
          },
          "mine": false,
          "worker": {
            "gid": "559befeeab59b"
          },
          "user": null,
          "type": "simple",
          "attached_files": [
            {
              "url": "https://cre.ads/43348e3ea6-1.zip"
            },
            {
              "url": "https://cre.ads/43348e3ea6-2.zip",
            }
          ]
        },
        ...
    ]
}
```

Les utilisateurs ayant accès au projet peuvent poster des messages sur ce même endpoint.

```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
    "message": "Veuillez me faire une proposition"
}' -X POST https://api-preprod.creads-partners.com/v1/projects/559bf06dc73e8/messages
```

Lorsque le créatif postera un message livraison (`type` à `delivery`), il faudra répondre à ce message par une acceptation (mesage de type `accept`, qui finira le projet) ou un refus (type `reject`) pour continuer a discuter.


# Work

Dans le cas d'un projet multi, une ressource `Work` (travail) représente une création envoyée par un créatif pour un projet.

**En tant que qu'utilisateur simple, seuls les travaux des projets que vous avez créé ou auxquels vous avez été invité sont accessibles.**
**En tant qu'utilisateur *manager*, seuls les travaux des projets des organisations desquelles vous êtes *manager* sont accessibles.**

Il contient soit une image (`image`), soit dans le cas des concours de rédaction un contenu texte (`content`). Il est rattaché à un créatif (`Worker`) et peut avoir un autre `Work` parent. Les *enfants* d'un `work` sont des images (déclinaisons) que le créatif a souhaité grouper sous la même création.

Par exemple, pour obtenir les créations principales (parentes) d'un projet:

```bash
curl -H "Authorization: Bearer $TOKEN" 'https://api.creads-partners.com/v1/works?query=\[\["project.gid","==","55c0d927cad5c"\],\["parent","==",null\]\]'
```

Réponse :
```json
{
    "total_count": 4,
    "items": [
        {
          "gid": "559bf0527764e",
          "created_at": "2014-09-08T22:47:31-07:00",
          "won_at": null,
          "description" : "Quisque ac ligula faucibus, pretium orci ac, porta velit. Cras ante enim, lacinia a commodo ut, iaculis et sem. Sed faucibus leo id justo imperdiet sollicitudin. Nunc tempor et risus vitae pulvinar. Quisque sed lacinia erat, vitae efficitur turpis. Fusce vel mollis tortor. Vivamus fermentum lacus in ultricies euismod.",
          "image": "https://cre.ads/43348e3ea6-1.jpg",
          "worker": {
            "gid": "559bf0683e9a5"
          },
          "project": {
            "gid": "559bf06dc73e8",
            "title": "lorem ipsum dolor"
          }
        },
        ...
    ]
}
```

Pour terminer un projet et recevoir des fichiers sources lorsque vous êtes satisfait d'une création, il faut sélectionner un vainqueur.
Mettre à jour le projet en lui indiquant la création gagnante:

```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
    "winner": {
        "gid": "559bf0527764e"
    }
}' -X PUT https://api-preprod.creads-partners.com/v1/projects/559bf06dc73e8
```

Le projet est alors terminé. Lorsque des **fichiers sources** arriveront, ils apparaitront dans la resource `project` en tant que `source_files`:

```json
{
    "source_files": [
        {
            "url": "https://cre.ads/43348e3ea6-1.zip",
        },
        {
            "url": "https://cre.ads/43348e3ea6-2.zip",
        },
        {
            "url": "https://cre.ads/43348e3ea6-3.zip"
        }
    ],
    ...
}
```

## Worker

Une ressource `Worker` (travailleur) représente un créatif.

Il est caractérisé par son nom et un avatar.

## Comments

Il est possible de commenter des resources. Par exemple, pour échanger avec le créatif sur un `Work`, il suffit de poster un commentaire portant le `uri` du commentaire.

```bash
curl -i -H "Authorization: Bearer $TOKEN" -d '{
  "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque viverra sodales. Vestibulum quis fringilla nisi. Donec congue neque ac consequat vestibulum. Praesent sed urna maximus ante ornare vestibulum. In in vulputate sapien. Ut elementum bibendum mi sit amet congue. Aliquam suscipit turpis vitae dapibus efficitur. Nullam quis lacinia ligula. Nam at lectus sem.",
  "uri": "/works/559bef4a9b600"
}' -X POST https://api-preprod.creads-partners.com/v1/comments
```

Et pour récuperer les autres commentaires de la même ressource


```bash
curl -H "Authorization: Bearer $TOKEN" 'https://api.creads-partners.com/v1/comments?query=\["uri","==","/works/559bef4a9b600"\]'
```

# Batch

Il est possible de grouper plusieurs requêtes en une seule requête "Batch".

Reportez-vous à la [référence du Batch](/references/#batch) pour voir un example.

