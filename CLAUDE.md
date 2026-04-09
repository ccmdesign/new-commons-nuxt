# Varro Project Guidelines

## Documentation Structure

This project uses modular documentation. Each piece of information has ONE owner.

### Ownership Model

| Document | Owns | Does NOT Own |
|----------|------|--------------|
| `docs/executive-summary.md` | What the system does, why it exists | How it works |
| `docs/1-pipeline.md` | Agent sequence, file flow, CLI commands | Agent implementation details |
| `docs/agents/*.md` | HOW each agent works (logic, thresholds, models) | Client-specific content rules |
| `docs/config/*.md` | WHAT we write (audience, voice, constraints) | Pipeline flow |

### Key Principle: No Duplication

When information appears in multiple places, it WILL become inconsistent.

**Wrong:**
- Pipeline says ">40% threshold"
- Agent doc says ">60% threshold"

**Right:**
- Pipeline says "validates sources" (high-level)
- Pipeline links to agent doc: "See [Fact-Checker](./agents/3-fact-checker.md) for rules"
- Agent doc says ">60% threshold" (owns the detail)

### Where Does This Belong?

Ask: "If this changes, which file should I update?"

| Information Type | Owner |
|------------------|-------|
| Agent execution order | `1-pipeline.md` |
| Specific validation thresholds | Agent doc |
| Model used by agent | Agent doc |
| Target audience personas | `config/audience.md` |
| Voice guidelines | `config/voice.md` |
| Frontmatter schema | Agent that creates the file |
| CLI commands | `1-pipeline.md` |

### Modularity for Swappability

Agents are designed to be swappable. The Researcher could use Gemini, OpenAI, Perplexity, or an open-source framework.

**Contract:** As long as an agent:
1. Accepts the documented inputs
2. Produces the documented outputs
3. Follows the frontmatter schema

...the pipeline keeps working.

When documenting agents, focus on the **interface** (inputs/outputs) in the pipeline doc, and the **implementation** (how it works) in the agent doc.

## File Naming

- Pipeline docs: numbered prefix (`1-pipeline.md`, `2-frontmatter-example.md`)
- Agent docs: numbered by execution order (`1-orchestrator.md` through `9-formatter.md`)
- Config docs: named by purpose (`audience.md`, `voice.md`)

## Cross-References

Always use relative paths. If a link breaks, the file was likely renamed.

```markdown
# From docs/agents/
- [Pipeline Flow](../1-pipeline.md)
- [Config](../config/voice.md)

# From docs/
- [Agents](./agents/)
- [Fact-Checker](./agents/3-fact-checker.md)
```

## Linear Integration

This project uses Linear for issue tracking, connected via MCP.

### Working on Linear Issues

When asked to work on a Linear issue (by identifier like ABC-42, or by description):

1. **Read the issue** from Linear first
2. **Read the codebase** to understand current patterns and architecture
3. **If the issue is vague or underspecified:**
   - Research what's needed
   - Write a clear specification with:
     - Problem statement
     - Proposed approach
     - Acceptance criteria (checklist format)
     - Technical notes
     - Edge cases
   - Update the Linear issue description with this spec
   - Set appropriate labels and priority
   - Move issue to "Todo" state
4. **When implementing:**
   - Create a branch named: `feature/{issue-identifier}-{short-description}`
   - Follow existing code patterns and conventions in this repo
   - Move issue to "In Progress"
   - Add comments on the Linear issue for significant progress
5. **When complete:**
   - Move issue to "Done"
   - Add a summary comment on the Linear issue
   - Note any follow-up issues that should be created

### Creating New Issues

When discovering bugs, tech debt, or new requirements during implementation:
- Create new Linear issues for them rather than scope-creeping the current task
- Link related issues when possible
- Add them to Backlog state

### Issue Enrichment Only

If asked to "spec" or "enrich" an issue without implementing:
- Follow steps 1-3 above but stop before implementation
- Present the spec for review before any code changes
