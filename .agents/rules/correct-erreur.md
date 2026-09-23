---
trigger: always_on
description: Règle de résolution propre des erreurs et avertissements Oxlint
---

Lorsque tu rencontres une erreur ou un avertissement Oxlint dans mon projet, prends en charge sa résolution automatiquement.

Procède toujours dans cet ordre :

1. Identifie précisément l'erreur, le fichier concerné et la ligne concernée.
2. Explique brièvement la cause de l'erreur en termes simples.
3. Corrige le problème directement dans le code en respectant l'architecture existante du projet.
4. Ne désactive jamais une règle Oxlint simplement pour faire disparaître l'erreur.
5. Ne transforme pas une règle "error" en "warn" uniquement pour contourner le problème.
6. Ne supprime aucune fonctionnalité existante pour résoudre l'erreur.
7. Vérifie que ta correction n'introduit pas de régression dans les autres fonctionnalités.
8. Après la correction, relance le lint et/ou le build pour vérifier que l'erreur est réellement résolue.
9. S'il existe plusieurs solutions, choisis la solution la plus propre, maintenable et conforme aux bonnes pratiques React/Vite/TypeScript.
10. Si l'erreur vient d'une mauvaise utilisation de React Hooks, corrige le code conformément aux Rules of Hooks plutôt que de désactiver la règle.
11. Si l'erreur est un simple avertissement non bloquant, corrige-la si cela est pertinent, mais ne modifie pas inutilement l'architecture.

RÈGLE IMPORTANTE :
Mon objectif est de construire une boutique en ligne stable et maintenable. Ne cherche donc pas simplement à faire disparaître les messages d'erreur. Cherche la cause réelle et corrige-la proprement.