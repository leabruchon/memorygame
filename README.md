## Step 0 - Setup 

### 0.2 Setup

- Play the whole game with size=2. By browsing the 3 views of the application, how many files did your browser download overall? How many time did it took to load them all?

Les fichiers comprennent tout ce qui permet de faire tourner la page sur laquelle on est : fichier js, html, css, images...
Page d'initialisation : 5 files, 111ms
Page de jeu : 10 files, 188ms
page de score : 6 files, 123ms

## Step 1 - The component architecture

- Component-oriented programming for the web is considered more maintainable. Why?

La programmation orientée composants est plus facilement maintenable car on retrouve tous les fichiers liés à un composant (js, css, html...) dans le même dossier ou fichier ce qui permet de rapidement y faire des modifications. De plus, si on change quelque chose sur un composant on ne modifie qu'une fois et il s'actualise sur toutes les pages où il est utilisé, ce qui permet de gagner beaucoup de temps.  

- If you look at the source code, every JS file wraps its code into a closure:
Try to remove the 2 closures from both card.component.js & game.component.js. What happens? Why?
Once figured out, remove the extra variable that makes the code to crash.

Quand on supprime les closures, on ne définit pas le type du code dans le fichier javascript, les deux variables environnement des fichiers game.component.js et card.component.js sont en conflit donc le jeu ne fonctionne plus.


## Step 2 - NPM

### 2.1 Init a new package

- As you can see, npm install command also generated a package-lock.json file along with package.json. What is the purpose of this file?

Le package-lock.json est modifié/généré quand on modifie package.json, c’est un historique des dépendances qui sont ou ont été utilisées dans le projet. On peut réinstaller les dépendances d’un projet grâce à ce fichier.

### 2.2 Install bootstrap

- By convention, all NPM dependencies use a 3-digit format for version numbers. How do you call this? Can you explain the meaning of the ^ symbol next to the bootstrap version?

Le premier chiffre correspond au numéro de version, le deuxième à une correction de beugs et le troisième à l'ajout de nouvelles fonctionnalités.
Quand on écrit ^, cela siginifie qu'on fait des mises à jour ne modifiant pas le nombre le plus à gauche différent de 0. Par exemple, si on écrit ^1.13.0, on obtiendra des corrections du type 1.13.2, 1.14.1, mais le 1 à gauche ne sera pas remplacé par un 2. 

### 2.3 NPM Scripts

- What is a devDependency exactly? What are the differences with a dependency?

Une devDependency est une dépendance qui n’est utilisée que pendant le développement de l‘application tandis qu’une dependency est requise pour compiler le projet en développement et en production. 

## Step 3 - ES Next

### 3.1 ES6 classes

- Can you think of at least 2 things that are possible with Java classes, but cannot be done with ES6 classes?

En javascript, on ne peut pas faire de la surcharge de méthode, c'est à dire d'avoir dans une classe plusieurs méthodes portant le même nom mais ayant des arugments différents. On ne peut également pas créer un lien d'héritage en un objet et une classe, sauf en utilisant: Object.setPrototypeOf(). 


### 3.2 ES6 Arrow functions

- What are the differences between var and let ?

var : Quand on déclare une variable avec var, sa portée est limitée. Si on la déclare dans une fonction, elle ne pourra être utilisée que dans la fonction. Si elle est définie en dehors d’une fonction c’est une variable globale qu’on peut utiliser dans tout le script. Avec var on peut également redéfinir une variable plusieurs fois ce qui implique qu’on écrase la variable et cela peut être problématique si on le fait par erreur. 

Donc on n’utilise plus var aujourd’hui pour définir une variable sauf si on travaille avec du vieux code (ou qu’on apprend à passer d’ES5 à ES6 ;)). 
let : aujourd’hui on utilise let ( ou const) : avec let on peut redéfinir une variable comme avec var mais il ne faut pas la rédeclarer, ce qui évite des erreurs. La portée d’une variable déclarée avec let fonctionne par bloc (par exemple déclarée dans un bloc if elle ne pourra être utilisée que dans ce bloc). 

- What is the .bind(this) stuff? What does happen if you delete it? Is it needed when using an arrow function ?

Arrow function met le contexte directement alors que sans il faut mettre bind pour ajouter le contexte. Si on ne met pas le .bind(this), la fonction va aller récuperer le this de la window, qui n'est pas le bon donc implique une erreur dans la fonction. Avec arrow function le bind se fait automatiquement et il n'est pas nécessaire de l'écrire. 


## Step 4 - Promises, Async/Wait

- What are the advantages of Promises?

Une promesse c’est un objet qui est envoyé auquel on raccroche des callback tandis qu’avec une XmlHttpRequest les callback sont passés en argument. Les avantages : 
1. Les callback ne sont pas appelés avant que la boucle d'événements courante javascript soit exécuté 
2. On peut mettre plusieurs callback dans les .then() qui seront exécutés les uns après les autres, et ils seront appelés peut importe l’échec ou le succès de la boucle d'événements courante

- What version of ECMAScript async / await was released in?

Async/await ont été publiés dans la version ECMAScript 2017.

## Step 5 - Babel, transpilation 

- What does the @ symbol mean in @babel/***?

Le symbole @ est suivi du namespace , ce qui permet de choisir les noms de fichiers ensuite après le / et ne cause pas de conflit si le nom est déjà utilisé car il est précédé. 

- Look at the files produced within dist/ folder. How babel transpile your class WelcomeComponent?

Dans les fichiers js présents dans dist, les classes sont supprimées et les prototypes sont réutilisés. Toutes les nouvelles fonctionnalités ES6 qui n'existaient pas en ES5 sont recodées en version 'old school'. 

- What is the weight of the transpiled sources compared to your original sources?

dist welcome component : 3Ko 
welcome component ESNext : 2Ko 
On voit donc que le fichier transpilé est 1Ko plus lourd 


## Step 6 - Webpack import

### 6.1 Import, export

- What is the difference between import * from './utils' and import { parseUrl } from './utils'?

Avec * on importe toutes les fonctions présentes dans utils.js mais on peut préciser {parseUrl} pour n’importer que cette fonction.

### 6.2 The bundler

- Why the utils.js will also be transpiled?

Tous les fichiers javascript sont transpilés car ils sont tous nécessaires au fonctionnement de l’application, si un seul n'est pas transpilé et qu'il est nécessaire pour faire fonctionner cette page, alors ça ne fonctionne plus. 

- What does the webpack --config webpack.config.js do ?

Ce fichier permet de configurer le bundler webpack. Le but de webpack est de prendre un fichier javascript, de résoudre ses dépendances (import et export), et d’en générer un  fichier javascript qui contient tout. Le fichier webpack.config.js est exécuté lorsqu’on lance notre commande npm build car nous avons défini cela dans notre package.json. 

## Step 7 - SPA

### 7.2 Refactor WelcomeComponent and ScoreComponent

- Play the whole game with size=2. By browsing the 3 views of the application, how many files did your browser download in total? How many time did it took to load them all?

Page d'initialisation : 4 files, 124ms
Page de jeu : 8 files, 183ms
page de score : 9 files, 400ms
Le temps de chargement dépend à la fois du poids des fichiers mais également de la connexion de l'utilisateur, qui est ici celle de l'EPF donc pas très rapide notamment pour la page des scores. 

## Step 8 - Style the application

### 8.1 CSS to SCSS

- Can you guess how exactly style-loader works exactly?

Style loader s'ajoute à la configuration webpack et permet d'injecter du CSS dans le DOM HTML. 

### 8.2 Sass variables

- What does the _ prefix means on a sass file?

Ce préfixe devant un nom de fichier scss rend le fichier partiel. Cela permet de séparer le style en différentes parties logiques : par exemple un fichier pour les couleurs, un pour les polices etc. Tout est ensuite compilé dans un seul fichier. 





