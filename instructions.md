# Instructions

## Project Purpose

This scraper extracts job listings from BORG DESIGN careers page and eJobs, then imports them to peviitor.ro.

Target: https://jobs.borgdesign.ro/
Secondary: https://www.ejobs.ro/company/borg-design/95634

## Technologies

- **Node.js & JavaScript** - For scraping and data extraction
- **Apache SOLR** - For data storage and indexing

## Workflow Steps

1. **Start with brand** - BORG
2. **Get company details from ANAF** - Using CIF 14837428
3. **Validate with Peviitor** - Verify company exists
4. **Check existing jobs in SOLR** - Query SOLR by CIF
5. **Check company status** - If inactive, DELETE jobs from SOLR and STOP
6. **Save company.json** - Save all ANAF + Peviitor data for backup
7. **Scrape Borg Design website** - Extract jobs from HTML
8. **Scrape eJobs** - Extract jobs from Nuxt data
9. **Merge and deduplicate** - Remove duplicates by title
10. **Transform for SOLR** - Map to job model
11. **Upsert to SOLR** - Import/update jobs

## API Endpoints

- **DemoANAF Search**: `https://demoanaf.ro/api/search?q=BRAND`
- **DemoANAF Company**: `https://demoanaf.ro/api/company/:cui`
- **Peviitor API**: `https://api.peviitor.ro/v1/company/`
- **Solr**: `https://solr.peviitor.ro/solr/job` (auth: via `SOLR_AUTH` environment variable)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SOLR_AUTH` | SOLR credentials in format `user:password` |

## Testing

```bash
npm test
```

## Temporary Files

All temporary/scratch files must be placed in `tmp/` inside the project root (never outside the project). The `tmp/` directory is in `.gitignore` and will not be committed.
