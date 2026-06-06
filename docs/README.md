# job_seeker_ro_spider

**job_seeker_ro_spider** — scraper pentru job-urile BORG DESIGN SRL din România.

Extrage anunțurile de pe [Borg Design Jobs](https://jobs.borgdesign.ro/) și [eJobs](https://www.ejobs.ro/company/borg-design/95634) și le publică în [peviitor.ro](https://peviitor.ro).

## Ce face

1. **Validează compania** — interoghează API-ul ANAF după CIF-ul 14837428
2. **Cross-validează cu Peviitor** — verifică existența în API-ul Peviitor
3. **Scrape-uiește job-urile** — extrage lista de job-uri din HTML Borg Design și datele Nuxt de pe eJobs
4. **Deduplicare** — combină sursele, elimină duplicatele după titlu
5. **Stochează în SOLR**

## Structură proiect

```
├── index.js           # Orchestrator principal
├── company.js         # Validare companie
├── src/anaf.js        # Modul ANAF API
├── solr.js            # Operații SOLR
├── tests/unit/        # Teste unitare
└── .github/workflows/
    ├── scrape.yml     # Rulează la fiecare 6 ore
    └── test.yml       # Teste la fiecare push/PR
```

## Testare

```bash
npm test
```
