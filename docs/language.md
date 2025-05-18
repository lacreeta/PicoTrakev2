# Sistema de traducció (i18n)

Aquest projecte utilitza la biblioteca **i18next** per gestionar la internacionalització i oferir una experiència multilingüe completa.

## Idiomes suportats
Actualment, l'aplicació suporta els idiomes següents:
- Català (`ca`)
- Castellà (`es`)
- Anglès (`en`)
- Francès (`fr`)

## Característiques tècniques

### Inicialització (`i18n.ts`)
El sistema s’inicialitza al fitxer `src/language/i18n.ts`, que:
- Carrega les traduccions de forma estàtica des del directori `src/language/locales/`.
- Estableix el català com a idioma per defecte.
- Habilita la detecció automàtica de l’idioma del navegador mitjançant `i18next-browser-languagedetector`.
- Permet la interpolació de variables i configuració de `fallbackLng`.

### Detecció de l’idioma
La llengua de l’usuari es detecta automàticament segons la configuració del navegador (`navigator.language`). Si l’idioma no està suportat, es fa servir el valor de reserva definit a `fallbackLng`.

### Canvi d’idioma
L’usuari pot canviar manualment l’idioma des de la pantalla de configuració (`Settings.tsx`), mitjançant el `LanguageContext`, que:
- Canvia l’idioma a nivell global amb `i18n.changeLanguage()`.
- Desa la preferència en `localStorage` per mantenir-la entre sessions.

### Integració amb components
A cada component s’utilitza el hook `useTranslation()` per accedir a les claus definides al fitxer de traduccions:

```tsx
const { t } = useTranslation();
return <h1>{t("home.title")}</h1>
```

### Gestió de les traduccions
Les traduccions es troben al directori:
```
src/language/
```
El fitxer conté les claus i valors corresponents al seu idioma. S'estructuren de forma jeràrquica per facilitar-ne el manteniment i la reutilització.

## Bones pràctiques aplicades
- Totes les cadenes visibles per l’usuari estan externalitzades en el fitxer `.json`.
- S’utilitza interpolació segura per mostrar variables dins de frases (`{{name}}`, `{{count}}`, etc.).
- S’evita la concatenació directa de textos dins dels components.
