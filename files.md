# Project Files

## JavaScript Files

| File | Description |
|------|-------------|
| `index.js` | Main scraper - full workflow: validate company, scrape Borg Design + eJobs, dedup, transform, upsert |
| `company.js` | Validates company via ANAF + Peviitor APIs, checks if company is active/inactive |
| `solr.js` | SOLR operations module - exports querySOLR, deleteJobByUrl, upsertJobs + standalone verify command |
| `src/anaf.js` | ANAF API core module - exports getCompanyFromANAF(cif), getCompanyFromANAFWithFallback(cif, cached), searchCompany(brandName) |

## Markdown Files

| File | Description |
|------|-------------|
| `instructions.md` | Project documentation - workflow, technologies, API endpoints |
| `job-model.md` | Job schema definition (Peviitor Core) - fields, types, validation rules |
| `company-model.md` | Company schema definition (Peviitor Core) - fields, types, validation rules |
| `files.md` | This file - documents role of each project file |

## Configuration Files

| File | Description |
|------|-------------|
| `package.json` | Node.js project config - dependencies (node-fetch), scripts |
| `package-lock.json` | Locked dependency versions |
| `.gitignore` | Ignores node_modules/, jobs.json, jobs_existing.json, .env.local |
| `.env.local` | Local environment variables (SOLR_AUTH) - NOT committed |

## Dependencies (node_modules/)

Installed via npm:
- `node-fetch` - HTTP requests

## Notes

- All `.md` files contain dynamic schemas that may change over time
- Full workflow: validate company (ANAF+Peviitor) → scrape borgdesign.ro → scrape eJobs → dedup → transform → upsert → log summary
