# Robots.txt Analysis — borgdesign.ro

Sursa: https://jobs.borgdesign.ro/robots.txt

## Reguli

```
User-agent: *
Disallow:
```

## Interpretare

| Cale | Accesibil? | Ce conține |
|---|---|---|
| `/` | ✅ Da | Pagina principală cu listarea job-urilor |

## Recomandare

- Scraperul accesează doar `/` — permis de robots.txt
- Rate limiting: 1 request per scrape
- User-Agent standard de browser
- Risc minim de blocare
