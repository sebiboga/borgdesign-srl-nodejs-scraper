# AGENTS.md — Rules for AI agents

## Project
BORG DESIGN scraper for peviitor.ro (Node.js, ESM, Jest)

## Critical Rules

### 1. Temporary Files
All temporary/scratch files MUST go in `tmp/` inside the project root.
NEVER use paths outside the project (e.g. `C:\Users\...\AppData\Local\Temp\opencode`).

### 2. Issues & GitHub
- **Orice modificare de cod trebuie să aibă un issue în GitHub Issues** (vezi [ISSUES.md](ISSUES.md))
- Excepții: typo-uri, whitespace, documentație minoră
- Create a GitHub issue before implementing any change
- Commit messages must reference the issue they close
- Never commit credentials (`.env.local`, `*.pem`, etc.)
- Push after commit

### 3. Environment Variables
- `SOLR_AUTH` must be set in `.env.local` for SOLR tests (format: `user:password`)
- `.env.local` is in `.gitignore` — never commit it

### 4. Testing
```bash
# Unit tests (no env vars needed)
npm test
```

### 5. ESM + Jest
- Use `jest.unstable_mockModule` (NOT `jest.mock`) for mocking ESM modules
- Run with `--experimental-vm-modules` flag

### 6. Module Structure
- `src/anaf.js` — core ANAF library
- `company.js` — company validation (ANAF + Peviitor + SOLR)
- `solr.js` — SOLR operations
- `index.js` — main scraper orchestrator
