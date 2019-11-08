# BERGA BPM - DashBoard

## Installation

Le projet roule sur angular, il faut donc installer angular cli sur la machine.

1. npm install
2. ng serve --o

## Déploiements 

La partie dashboard est hosté sur le sous-directory /app/. Il faut donc buildé en incluant ce directory pour la production.

1.  Dans angular, rouler la commande `ng build --prod --base-href /app/`

2. Déployer le contenu du dossier Berga.BPM.Dashboard/dist dans le bon répertoire sur le ftp (wwwroot-app)

   **<u>*NB: NE PAS SUPPRIMER LE WEB.CONFIG existant sur le FTP</u>***



