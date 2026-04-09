---
name: run
description: >
  Runs Varro pipeline commands quickly. This skill should be used when the user
  wants to run any project command: pipeline agents, batch processing, database
  operations, scripts, or services. Triggers on "run pipeline", "run researcher",
  "start server", "batch topics", "db start", "process topics", or any mention
  of running project commands. Invoked with: /run <command> [args]
---

# Varro Command Runner

Run any project command quickly. All commands execute via Bash so they appear in the main terminal window.

## Invocation

```
/run <command> [args]
```

## Command Reference

Parse the user's request and match it to one of these commands. Be flexible with natural language — e.g. "run the pipeline on X" or "start the database" should resolve correctly.

### Pipeline (Full)

Run the complete content pipeline for a topic file:

```bash
npm run pipeline -- <project>/<topic-file>.yaml [index]
```

- `project` — project slug (e.g. `aline-alves`, `jessica-torres`)
- `topic-file` — YAML filename without path (e.g. `direito-imobiliario`)
- `index` — optional 0-based index to process a single topic from the file

Aliases: `npm run topics` does the same thing.

**Examples:**
- `/run pipeline aline-alves/direito-imobiliario.yaml`
- `/run pipeline jessica-torres/familia-sucessoes-patrimonio.yaml 2`

### Individual Agents

Run a single agent by name with a run ID (the timestamped directory from a previous pipeline run):

| Agent | Command |
|-------|---------|
| researcher | `npm run researcher -- <runId>` |
| fact-checker | `npm run fact-checker -- <runId>` |
| architect | `npm run architect -- <runId>` |
| writer | `npm run writer -- <runId>` |
| editor | `npm run editor -- <runId>` |
| reviewer | `npm run reviewer -- <runId>` |
| marketer | `npm run marketer -- <runId>` |
| linker | `npm run linker -- <runId>` |
| formatter | `npm run formatter -- <runId>` |

The `runId` is the directory name inside a project's output folder (e.g. `2025-01-15T10-30-00`). If the user doesn't provide one, list recent runs for them to pick from.

**Examples:**
- `/run researcher 2025-01-15T10-30-00`
- `/run writer 2025-06-20T14-00-00`

### Batch Processing

#### Process specific topics:
```bash
npm run batch -- <project:topic-file[:index]> [more pairs...]
```

Or using the shell script directly for retry support:
```bash
./scripts/batch-topics.sh [--continue] [--max-retries N] [--dry-run] <project:topic-file[:index]> [...]
```

#### Process all pending topics:
```bash
npm run batch-all -- [--dry-run] [--generate] [--execute]
```

- `--dry-run` — preview what would run
- `--generate` — only generate batch.txt
- `--execute` — run the batch

**Examples:**
- `/run batch aline-alves:direito-imobiliario fabiana-mota:direito-condominial`
- `/run batch-all --dry-run`
- `/run batch --dry-run jessica-torres:familia-sucessoes-patrimonio`

### Database

| Command | What it does |
|---------|-------------|
| `npm run db:start` | Start local Supabase |
| `npm run db:stop` | Stop local Supabase |
| `npm run db:reset` | Reset database |
| `npm run db:types` | Generate TypeScript types |
| `npm run db:migrate` | Create new migration |
| `npm run db:push` | Push migrations |
| `npm run db:verify` | Verify connection |

**Examples:**
- `/run db start`
- `/run db reset`
- `/run db types`

### Services

| Command | What it does |
|---------|-------------|
| `npm run server` | Start Hono HTTP server |
| `npm run pyresearcher` | Start Python GPT Researcher API |

**Examples:**
- `/run server`
- `/run pyresearcher`

### Scout Queue Check

Check whether Scout should be triggered to replenish a client's topic queue. These scripts respect the 4-step guard (active check → queue depth → cooldown → atomic claim). **Do NOT use `generate-topics` for this — it bypasses all guards.**

| Command | What it does |
|---------|-------------|
| `npm run scout:check-all` | Check all active clients for queue depletion; spawns Scout for depleted clients past cooldown |
| `PROJECT=<route_prefix> npm run scout:check-one` | Check a single client; respects cooldown; use for targeted queue replenishment |
| `npm run auto-approve` | Promote Scout-generated draft topics (`status='draft'`) to pending (`status='pending'`), making them available for the dispatcher |

**Examples:**
- `/run scout:check-all`
- `/run scout:check-one varro`

**Full Scout → dispatch lifecycle:**
1. Scout runs (via `scout:check-all`, `scout:check-one`, or dispatcher trigger) → generates topics with `status='draft'`
2. `npm run auto-approve` → promotes drafts to `status='pending'` (**required step — skipping this leaves topics in draft forever**)
3. `npm run dispatch` → processes pending topics through the pipeline

**When to use each:**
- `scout:check-all` — Cron job or when you notice queue health is low across multiple clients
- `scout:check-one` — After a specific client's topics are depleted, or for targeted investigation
- `auto-approve` — After Scout runs; always run this before dispatch to unlock Scout-generated topics
- `npm run generate-topics` — Low-level debug only; bypasses cooldown and race prevention

### Tools

| Command | What it does |
|---------|-------------|
| `npm run memory:seed` | Seed memory with initial data |
| `npm run sync` | Sync content to client repo |
| `npm run import` | Import external research data |
| `npm run dispatch` | Run the dispatcher |

**Examples:**
- `/run sync`
- `/run memory seed`

### Marketing Scripts

| Command | What it does |
|---------|-------------|
| `npx tsx scripts/marketing-inventory.ts` | Report missing marketing content |
| `npx tsx scripts/marketing-verify.ts [--verbose]` | Deep-verify marketing.md files |
| `npx tsx scripts/marketing-batch-regen.ts [--execute] [--force] [--project X]` | Re-run Marketer agent for incomplete articles |
| `npx tsx scripts/migrate-marketing-to-posts.ts [--dry-run]` | Add marketing to archived posts |
| `npx tsx scripts/sync-all-posts.ts [--dry-run]` | Bulk sync posts to client repo |

**Examples:**
- `/run marketing inventory`
- `/run marketing verify --verbose`
- `/run marketing regen --execute --project aline-alves`

### Build & Dev

| Command | What it does |
|---------|-------------|
| `npm run build` | Compile TypeScript + copy agent .md files |
| `npm run dev` | Watch mode for development |
| `npm run test` | Quick test (researcher on sample topic) |

**Examples:**
- `/run build`
- `/run dev`

## Execution Rules

1. **Always use Bash** to run commands so output appears in the user's terminal.
2. **Set working directory** to the project root: `/Users/claudiomendonca/Documents/GitHub/_chatterbox-engine`
3. **Long-running commands** (server, pyresearcher, dev, pipeline) — run in background using `run_in_background: true` so the user can keep working.
4. **Before running agents individually** — if the user doesn't provide a runId, list the most recent runs:
   ```bash
   ls -t src/projects/*/content-archive/ | head -10
   ```
5. **Before running pipeline** — if no topic file specified, list available topic files:
   ```bash
   ls src/projects/*/topics/*.yaml
   ```
6. **Dry-run first for destructive operations** — if the user asks to batch-all or reset db, suggest `--dry-run` first.
7. **Show output** — always let the command output flow to the user. Don't suppress or summarize unless asked.

## Natural Language Mapping

Match these phrases to commands:

| User says | Command |
|-----------|---------|
| "run the pipeline" / "process topics" | `npm run pipeline` |
| "run [agent-name]" | `npm run [agent-name]` |
| "batch" / "batch topics" | `npm run batch` or `batch-topics.sh` |
| "process all" / "batch all" | `npm run batch-all` |
| "start db" / "database up" | `npm run db:start` |
| "stop db" / "database down" | `npm run db:stop` |
| "reset db" | `npm run db:reset` |
| "generate types" | `npm run db:types` |
| "start server" / "start api" | `npm run server` |
| "start researcher" / "python researcher" | `npm run pyresearcher` |
| "build" / "compile" | `npm run build` |
| "dev mode" / "watch" | `npm run dev` |
| "sync" / "sync client" | `npm run sync` |
| "seed memory" | `npm run memory:seed` |
| "import" / "import research" | `npm run import` |
| "marketing inventory" / "check marketing" | `npx tsx scripts/marketing-inventory.ts` |
| "verify marketing" | `npx tsx scripts/marketing-verify.ts` |
| "regen marketing" | `npx tsx scripts/marketing-batch-regen.ts` |
| "test" | `npm run test` |
| "check if Scout needs to run" / "scout check" | `PROJECT=<client> npm run scout:check-one` |
| "replenish topics for all clients" / "check queue depletion" | `npm run scout:check-all` |
| "auto-approve" / "approve topics" / "promote drafts" | `npm run auto-approve` |
