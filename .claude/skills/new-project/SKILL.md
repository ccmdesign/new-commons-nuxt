---
name: new-project
description: >
  Automates client project setup for the Varro content pipeline.
  This skill should be used when creating a new client project from a website URL.
  It extracts business info, detects language/industry, and generates all config files
  plus 10 topics. Invoked with: /new-project <url>
---

# New Project Setup

This skill automates the creation of a new client project for the Varro content generation pipeline.

## Invocation

```
/new-project <url>
```

Example: `/new-project https://alinealves.adv.br/`

## Workflow

### Phase 1: Parse URL and Validate

1. **Extract project slug from URL domain:**
   - Remove protocol (`https://`, `http://`)
   - Remove TLD extensions (`.com`, `.br`, `.adv.br`, `.com.br`, `.io`, etc.)
   - Replace dots and underscores with hyphens
   - Convert to lowercase
   - Example: `alinealves.adv.br` → `aline-alves`

2. **Check for existing project:**
   - Look for `src/projects/[slug]/`
   - If exists, use AskUserQuestion to ask: overwrite, use different name, or cancel

### Phase 2: Fetch and Analyze Website

3. **Fetch website content using WebFetch:**
   - Fetch the homepage URL
   - If services page exists (`/servicos`, `/services`), fetch it too
   - If about page exists (`/sobre`, `/about`), fetch it too

4. **Extract key information:**
   - **Business name**: Official company/professional name
   - **Services**: List of all services offered
   - **Contact info**: WhatsApp number, email, phone, address
   - **Positioning**: How they describe themselves, value proposition
   - **Target audience**: Who they serve (inferred from copy)

5. **Detect language:**
   - Portuguese indicators: "Sobre nós", "Serviços", "Contato", "Advocacia", `.com.br`, `.adv.br`
   - English indicators: "About", "Services", "Contact", "Attorney", `.com`, `.io`
   - If unclear, ask user

6. **Classify industry:**

   | Keywords Found | Industry |
   |----------------|----------|
   | advocacia, advogado, OAB, direito, law, attorney | legal |
   | design, branding, creative, UX, visual | design |
   | médico, saúde, health, clinic, hospital | healthcare |
   | consultoria, consulting, advisory, strategy | consulting |
   | imobiliária, real estate, property, imóveis | real-estate |
   | tech, software, desenvolvimento, development | technology |

### Phase 3: Select Reference Project

7. **Choose reference project based on language and industry:**

   | Language | Industry | Reference Project |
   |----------|----------|-------------------|
   | Portuguese | Legal | `src/projects/aline-alves/` |
   | Portuguese | Other | `src/projects/aline-alves/` (adapt voice) |
   | English | Design | `src/projects/ccmdesign/` |
   | English | Other | `src/projects/ccmdesign/` (adapt voice) |

8. **Read reference config files** to understand structure and patterns

### Phase 4: Create Directory Structure

9. **Create project directories:**
   ```bash
   mkdir -p src/projects/[slug]/configs
   mkdir -p src/projects/[slug]/topics
   ```

### Phase 5: Generate Config Files

Generate each file in this order, using the templates from `src/projects/_template/configs/` as structural base and the reference project for style patterns.

**Read `references/generation-guidelines.md` for detailed prompts for each file.**

#### 5.1. project.yml
```yaml
name: "[Business Name]"
website: "[Original URL]"
```

#### 5.2. audience.md
Generate 3-5 personas based on services offered. Each persona needs:
- **Who they are**: Demographics, role, situation
- **What they care about**: Core motivation
- **Primary pain points**: 3-4 specific, emotional pains

Map each service to a potential audience segment.

#### 5.3. voice.md
Generate based on observed website tone:
- **Core persona**: Who is the brand voice (e.g., "Advogada Acessível e Educadora")
- **Key principles**: 4-6 principles with examples
- **Voice table**: Attributes mapped to expressions
- **Prohibited patterns**: Language-specific anti-patterns
- **CTA templates**: Use actual extracted contact info (WhatsApp, email)

#### 5.4. expertise.md
Structure in three tiers:
- **Core expertise**: Direct mapping from services (5-8 areas)
- **Adjacent topics**: Related areas they could comment on
- **Out of scope**: Topics to explicitly avoid

#### 5.5. constraints.md
Set content rules:
- **Content length**: 800-1500 words (legal), 1200-2000 words (design/tech)
- **CTA rules**: Include actual contact info, appropriate restrictions
- **Headline rules**: Benefit/problem focused
- **SEO requirements**: Meta title 50-60 chars, description 150-160 chars
- **Industry compliance**: OAB rules for Brazilian legal (see `references/industry-patterns.md`)

#### 5.6. marketing.md
Platform selection by industry:
- **Legal/B2B**: LinkedIn + Instagram
- **Design/Creative**: LinkedIn + X (Twitter) + Instagram
- **Healthcare**: LinkedIn + Instagram

Include platform-specific formats, character limits, hashtag guidelines.

#### 5.7. memory.md
Initialize with empty article registry:
```yaml
---
articles: []
---
```
Include schema documentation for the Linker agent.

#### 5.8. format.md
- Copy structure from template
- Set author name to match client
- Define categories based on expertise areas (e.g., `regularizacao`, `contratos`, `inventario` for legal)

### Phase 6: Generate Topics File

10. **Create topics file:**
    - Name based on primary expertise: `topics/[primary-category].yaml`
    - Example: `topics/direito-imobiliario.yaml` for real estate law

11. **Generate 10 topic ideas:**
    Each topic must include:
    ```yaml
    - topic: "Question/problem phrased as audience would search"
      keywords: [4-5 search terms]
      category: category-from-format
      angle:
        - Unique perspective 1
        - Emotional hook 2
        - Practical insight 3
        - Counter-intuitive angle 4
    ```

    Base topics on:
    - Services offered (each service = 1-2 topics)
    - Audience pain points from personas
    - Common questions in the industry

### Phase 7: Validation and Summary

12. **Validate generated files:**
    - All 9 config files exist
    - At least one topics file exists
    - YAML files are valid
    - Contact info appears in voice.md CTAs

13. **Present summary to user:**
    ```
    ✓ Project created: src/projects/[slug]/

      configs/
      ├── project.yml     ← [Business Name]
      ├── audience.md     ← [N] personas
      ├── voice.md        ← "[Persona Name]" + [Contact Method] CTA
      ├── expertise.md    ← [Core expertise areas]
      ├── constraints.md  ← [Industry compliance notes]
      ├── marketing.md    ← [Platforms]
      ├── memory.md       ← Empty, ready for articles
      └── format.md       ← [N] categories

      topics/
      └── [category].yaml ← 10 topics

    Review points:
    - Contact info in voice.md CTAs
    - Persona accuracy in audience.md
    - Service coverage in expertise.md
    ```

## Error Handling

- **Website unreachable**: Ask user to provide services, positioning, and contact manually
- **Language unclear**: Ask user to specify Portuguese or English
- **Industry unclear**: Present options and ask user to select
- **Missing contact info**: Generate with placeholder, flag for manual completion
- **Project exists**: Ask whether to overwrite, use different name, or cancel

## Reference Files

- `references/generation-guidelines.md` - Detailed prompts for each config file
- `references/industry-patterns.md` - Industry-specific rules (OAB compliance, platform preferences)

## Example Projects

- **Portuguese + Legal**: `src/projects/aline-alves/`
- **English + Design**: `src/projects/ccmdesign/`
- **Template**: `src/projects/_template/`
