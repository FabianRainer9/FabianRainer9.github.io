# Fabian Rainer Portfolio Website

Statische Portfolio-Website fuer GitHub Pages. Keine Build-Tools, kein Backend, keine Abhaengigkeiten.

## Struktur

```text
fabian-portfolio-site/
├── index.html
├── adventures.html
├── projects.html
├── resume.html
├── 404.html
├── .nojekyll
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── favicon.svg
    ├── media/
    │   ├── spartan/
    │   └── innsbruck-neapel/
    ├── projects/
    └── resume/Fabian_Rainer_CV.pdf
```

## Website lokal ansehen

Oeffne `index.html` direkt im Browser oder starte im Projektordner einen kleinen lokalen Server:

```bash
python -m http.server 8000
```

Dann im Browser oeffnen:

```text
http://localhost:8000
```

## Auf GitHub Pages hosten

1. Auf GitHub ein neues Repository anlegen:

```text
FabianRainer9.github.io
```

2. Diese Dateien in das Repository kopieren.

3. Hochladen per Git:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/FabianRainer9/FabianRainer9.github.io.git
git push -u origin main
```

4. In GitHub: Repository → Settings → Pages.

5. Unter "Build and deployment" einstellen:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

6. Danach ist die Seite unter dieser Adresse erreichbar:

```text
https://FabianRainer9.github.io/
```

Es kann ein paar Minuten dauern, bis GitHub Pages die neue Version ausliefert.

## Lebenslauf ersetzen

Ersetze diese Datei:

```text
assets/resume/Fabian_Rainer_CV.pdf
```

mit deinem echten Lebenslauf. Der Dateiname muss exakt gleich bleiben, sonst musst du die Links in `resume.html` anpassen.

## Fotos und Videos ersetzen

### Spartan Ultra Zell am See 2025

Lege Medien hier ab:

```text
assets/media/spartan/
```

Dann in `adventures.html` die `src`-Pfade anpassen:

```html
<img src="assets/media/spartan/dein-foto.jpg" alt="Beschreibung des Fotos" />
```

Fuer Videos:

```html
<video muted loop playsinline controls preload="metadata" poster="assets/media/spartan/dein-poster.jpg">
  <source src="assets/media/spartan/dein-video.mp4" type="video/mp4" />
  Dein Browser unterstuetzt dieses Video nicht.
</video>
```

Wichtig: `poster` muss ein Bild sein, zum Beispiel `.jpg`, `.png` oder `.webp` — keine `.mp4`-Datei. Fuer maximale Browser-Kompatibilitaet sollten Videos als MP4 mit H.264-Video und AAC-Audio exportiert werden. MOV-/HEVC-Dateien funktionieren je nach Browser oft nicht zuverlaessig.

### Innsbruck nach Neapel

Lege Medien hier ab:

```text
assets/media/innsbruck-neapel/
```

Dann in `adventures.html` die `src`-Pfade anpassen.

## Projekte bearbeiten

Projektbilder liegen in:

```text
assets/projects/
```

Du kannst normale Bildformate verwenden, zum Beispiel `.jpg`, `.jpeg`, `.png`, `.webp` oder `.svg`.
GitHub Pages unterscheidet Gross- und Kleinschreibung. `MCMS.jpg` ist also nicht dasselbe wie `mcms.jpg`.

In `projects.html` hat jede Projektkarte genau eine Bildzeile:

```html
<img src="assets/projects/dein-projektbild.jpg" alt="Kurze Beschreibung des Projektbildes" />
```

Lege dein Bild in `assets/projects/` ab und ersetze nur den `src`-Wert. Danach aenderst du Titel, Tags, Beschreibung und Fakten.

Fuer ein neues Projekt kopierst du eine komplette Karte:

```html
<article class="project-card reveal tilt-card">
  ...
</article>
```

Projektkarten enthalten aktuell keine GitHub-Buttons. Die Projekte werden bewusst als eigenstaendige Case Studies dargestellt.

## Design anpassen

Die wichtigsten Farben stehen oben in `assets/css/styles.css`:

```css
:root {
  --bg: #070912;
  --accent: #57e6c4;
  --accent-2: #8a7cff;
  --accent-3: #ffb86b;
}
```

## Hinweis zu Datenschutz

GitHub Pages ist fuer oeffentliche Inhalte gedacht. Lade keinen CV mit sensiblen privaten Daten hoch, wenn die Website oeffentlich bleiben soll.
