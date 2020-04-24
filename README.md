# Hack-Covid - Risques de menaces d'un employé sur un site

Contrat permettant l'ajout et la consultation des risques et menaces d'un employé pour un site sur le blockchain Tron.

# Blockchain: TRON

 Le Blockchain TRON a été choisi parce que:
  - Un débit élevé est atteint en améliorant les transactions par seconde comparativemen à ETHEREUM
  - Les applications décentralisées disposent d'une plus grande variété de moyens de déploiements en raison de son évolutivité
 - La structure de réseau est plus fiable que ETHEREUM ou EOS
 - Les transactions sont gratuites et très rapides

# Confidentialité

- Les informations enregistrées sur le blockchain sont encryptées par le protocole sha3 **KECCAK-256**.
- Les informations encryptées sont comparées avec des enregistrements détenus seulement par l'utilisateur qui les ajoutes.
- Les enregistrements représentent des types de données et non des données sur un individu.
    *par exemple: Il est possible de savoir qu'un **employé x** a été inscrit par **compte y** comme ayant été à risque sur un **site z***

# Audits
- Le contrat étant décentralisé, il permet en tout temps d'être audité par n'importe qui
- Les informations inscrites le sont grâce à des expressions mnémoniques de schémas de comptes déterministes hiérarchiques (HD), où les clés privées sont dérivées de manière déterministe d'une valeur de 128 bits (mnémonique de 12 mots) comme décrit par BIP32.
- Il est impossible d'altérer les données inscrites par un compte et l'historique n'est pas modifiable ou supprimable.
- Un compte est le seul validateur possible d'une donnée.
- La validité des données est vérifiable en les faisant correspondre avec le compte qui les a inscrites sans toutefois les révéler.
