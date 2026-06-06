# BORG DESIGN SRL — Job Scraper

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-24.x-green.svg)
![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-orange.svg)

**job_seeker_ro_spider** — web scraper pentru a aduce locurile de munca de la **BORG DESIGN** in platforma [peviitor.ro](https://peviitor.ro).

## Despre

Acest scraper extrage anunturile de angajare de pe [jobs.borgdesign.ro](https://jobs.borgdesign.ro/) si [eJobs](https://www.ejobs.ro/company/borg-design/95634) si le publica in platforma peviitor.ro prin API-ul SOLR.

## Cum functioneaza

| Pas | Actiune | API/Sursa |
|-----|---------|-----------|
| 1 | Valideaza compania in ANAF | [demoanaf.ro](https://demoanaf.ro) |
| 2 | Cross-valideaza in Peviitor | [api.peviitor.ro](https://api.peviitor.ro) |
| 3 | Extrage job-urile din HTML | [jobs.borgdesign.ro](https://jobs.borgdesign.ro/) |
| 4 | Extrage job-urile din eJobs | [ejobs.ro](https://www.ejobs.ro/company/borg-design/95634) |
| 5 | Deduplicare dupa titlu | - |
| 6 | Trimite la SOLR | [solr.peviitor.ro](https://solr.peviitor.ro) |

## Tech Stack

- **Node.js 24** — Runtime
- **GitHub Actions** — CI/CD

## Instalare

```bash
git clone https://github.com/sebiboga/borgdesign-srl-nodejs-scraper.git
cd borgdesign-srl-nodejs-scraper
npm install
```

## Utilizare

```bash
# Ruleaza scraperul
npm start

# Ruleaza testele
npm test
```

## GitHub Actions

| Workflow | Schedule | Runner |
|----------|----------|--------|
| **Scrape** | La fiecare 6 ore | `ubuntu-latest` |
| **Tests** | La fiecare push/PR | `ubuntu-latest` |

## Structura proiect

```
.
├── index.js              # Orchestrator principal
├── company.js            # Validare companie (ANAF + Peviitor + SOLR)
├── src/anaf.js           # Modul ANAF API
├── solr.js               # Operatii SOLR
├── package.json
├── .github/workflows/
│   ├── scrape.yml        # Scraper principal
│   └── test.yml          # Teste automate
├── tests/
│   └── unit/             # Teste unitare
└── docs/
    └── index.html        # GitHub Pages site
```

## License

MIT License — Copyright (c) 2026 BOGA SEBASTIAN-NICOLAE

## Autor

**Boga Sebastian-Nicolae**
- GitHub: [@sebiboga](https://github.com/sebiboga)
- Website: [peviitor.ro](https://peviitor.ro)
