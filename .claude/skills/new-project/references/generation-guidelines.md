# Generation Guidelines

This document provides detailed prompts and patterns for generating each config file during project setup.

---

## 1. project.yml

**Simplest file. Generate first.**

```yaml
# Project Configuration
# This file stores project-level metadata for the content pipeline.

name: "{Business Name from website}"
website: "{Original URL provided by user}"
```

**Rules:**
- Use the official business name as it appears on the website
- Include the full URL with protocol

---

## 2. audience.md

**Generate 3-5 personas based on services offered.**

### Structure

```markdown
# Personas do Público-Alvo  (Portuguese)
# Audience Personas  (English)

Este documento define as personas do público-alvo para o conteúdo de [Business Name]. A diretiva primária é compreender seus mundos, motivações e dores antes de gerar qualquer conteúdo.

---

## Persona 1: [Descriptive Name]

- **Quem são**: [Demographics, role, situation, background]
- **O que valorizam**: **[Core Value].** [1-2 sentence expansion]
- **Principais dores**:
  - **[Pain Point Name]**: [Specific description of the pain]
  - **[Pain Point Name]**: [Specific description of the pain]
  - **[Pain Point Name]**: [Specific description of the pain]
  - **[Pain Point Name]**: [Specific description of the pain]

[Repeat for 3-5 personas]
```

### Persona Generation Process

1. **Map services to audience segments:**
   - Each service typically implies 1-2 audience types
   - Example: "Regularização de imóveis" → Property owners with irregular documentation

2. **Create specific, emotional pain points:**
   - Bad: "They have problems with documents"
   - Good: "Medo de perder o imóvel: Preocupação constante de que alguém possa contestar a propriedade"

3. **Use language the audience uses:**
   - Not industry jargon, but how they describe their own problems
   - Include specific scenarios they recognize

### Example Personas by Industry

**Legal (Real Estate Law):**
- O Proprietário com Imóvel Irregular
- O Comprador Cauteloso
- A Família em Processo de Inventário
- O Proprietário que Quer Vender para a Família
- O Possuidor de Longa Data (Usucapião)

**Design/Creative:**
- The Impact-Driven Researcher
- The High-Stakes Communicator
- The Lead-Driven Marketer
- The Creative Partner

---

## 3. voice.md

**Define HOW to write. This is the personality Claude adopts.**

### Structure

```markdown
# Guia de Voz e Tom  (Portuguese)
# Voice and Tone Guide  (English)

Este documento define a voz e o tom para o conteúdo de [Business Name]. O posicionamento estratégico é o de **"[Persona Name]"** — [1-2 sentence description].

## Persona Central: [Persona Name]

[2-3 paragraphs describing the voice personality, what it values, how it communicates]

## Princípios a Seguir

### 1. [Principle Name]
- [Explanation with example]
- **Não Use**: [Bad example]
- **Use**: [Good example]

[4-6 principles total]

## Tabela Resumo: Voz Aplicada

| Atributo | Como Expressar |
|----------|----------------|
| **Expertise** | [How to demonstrate knowledge] |
| **Acessibilidade** | [How to be approachable] |
| **Propósito** | [What each content should achieve] |
| **Chamada para Ação** | [CTA style] |

## Padrões Proibidos

**Nunca use:**
- [Prohibited pattern 1]
- [Prohibited pattern 2]
- [Prohibited pattern 3]

**Evite usar em excesso:**
- [Pattern to limit]

**Anti-Padrões Comuns:**
- [Common mistake to avoid]

## Idioma

[Language specification]

---

## CTA Voice Guidelines

### Tom para CTAs
- [CTA tone principle 1]
- [CTA tone principle 2]

### CTA Templates Aprovados

| Contexto | Template |
|----------|----------|
| [Context 1] | "[CTA with actual contact info]" |
| [Context 2] | "[CTA with actual contact info]" |
| Genérico | "[Generic CTA with actual contact info]" |
```

### Voice Persona Patterns

**Legal (Brazilian):** "Advogada Acessível e Educadora"
- Accessible, not arrogant
- Educational, explains jargon
- Empathetic, validates concerns
- Practical, gives concrete actions
- Preventive, alerts before problems

**Design/Creative:** "Confident, Clear-Sighted Guide"
- Authoritative but approachable
- Translates complexity into clarity
- Purpose-driven
- Thought leadership

### CTA Generation Rules

1. **Extract actual contact info from website:**
   - WhatsApp number (format: (XX) XXXXX-XXXX)
   - Email address
   - Phone number

2. **Include contact in CTA templates:**
   ```
   "Se você está nessa situação, posso ajudar. Me chama no WhatsApp: (34) 99134-8004"
   ```

3. **Match CTA tone to voice persona:**
   - Warm and welcoming for accessible personas
   - Professional and consultative for authority personas

---

## 4. expertise.md

**Define WHAT you can and cannot speak about.**

### Structure

```markdown
# Áreas de Expertise e Autoridade  (Portuguese)
# Areas of Expertise and Authority  (English)

Este documento define as áreas onde [Business Name] tem credibilidade e autoridade.

---

## Expertise Principal

### 1. [Area Name]

[1-2 sentence description of the specialty]

**Podemos falar com autoridade sobre:**
- [Specific topic 1]
- [Specific topic 2]
- [Specific topic 3]
- [5-10 topics total]

[Repeat for 5-8 core expertise areas]

---

## Tópicos Adjacentes (Podemos Comentar)

Áreas onde temos perspectivas informadas, mas não somos especialistas primários:

- [Adjacent topic 1]
- [Adjacent topic 2]
- [5-8 adjacent topics]

---

## Fora do Escopo (Evitar)

Tópicos sobre os quais não devemos nos posicionar como especialistas:

- [Out of scope topic 1]
- [Out of scope topic 2]
- [5-10 out of scope topics]

---

## Sinais de Credibilidade

Ao estabelecer autoridade, podemos referenciar:

**Especialização:**
- [Credential 1]
- [Credential 2]

**Abrangência:**
- [Scope indicator 1]

**Abordagem:**
- [Methodology or approach]

---

## Voz ao Demonstrar Expertise

[How to show expertise according to voice.md]
```

### Expertise Mapping Process

1. **Core expertise:** Direct mapping from services listed on website
2. **Adjacent topics:** Related areas that naturally come up
3. **Out of scope:** Topics that could cause credibility damage if covered

---

## 5. constraints.md

**Define content rules and limits.**

### Structure

```markdown
# Restrições e Padrões de Conteúdo  (Portuguese)
# Content Constraints and Standards  (English)

---

## Extensão do Conteúdo

| Tipo de Conteúdo | Extensão Alvo | Limite Máximo |
|------------------|---------------|---------------|
| Artigo padrão | [range] palavras | [max] palavras |
| Resumo | [range] palavras | [max] palavras |

---

## Regras de CTA

| Estilo de CTA | Exemplo |
|---------------|---------|
| [Style 1] | "[Example with actual contact]" |
| [Style 2] | "[Example with actual contact]" |

**Regras:**
- [CTA rule 1]
- [CTA rule 2]

---

## CTA Checklist

[Industry-specific compliance checklist]

---

## Padrões de Títulos

**Faça:**
- [Good practice 1]
- [Good practice 2]

**Não faça:**
- [Bad practice 1]
- [Bad practice 2]

---

## Requisitos de SEO

### Todo Artigo Deve Ter:
- **Meta título** — 50-60 caracteres
- **Meta descrição** — 150-160 caracteres
- **Palavra-chave principal** — No H1, primeiro parágrafo, e 2-3 subtítulos

### Estrutura de URL:
- Formato: `/blog/[slug]`
- Slug: minúsculas, hífens, 3-5 palavras

---

## Template de Metadados

```yaml
---
title: ""
slug: ""
meta_title: ""
meta_description: ""
primary_keyword: ""
keywords: []
category: ""
author: "[Author Name]"
status: draft | review | approved | published
created: YYYY-MM-DDTHH:MM:SSZ
published: null
---
```
```

### Content Length by Industry

| Industry | Target | Max |
|----------|--------|-----|
| Legal | 800-1,500 | 2,000 |
| Design/Creative | 1,200-2,000 | 2,500 |
| Healthcare | 600-1,200 | 1,500 |
| Technology | 1,000-1,800 | 2,500 |

---

## 6. marketing.md

**Define platform-specific social media rules.**

### Platform Selection by Industry

| Industry | Primary | Secondary |
|----------|---------|-----------|
| Legal (B2B) | LinkedIn | Instagram |
| Design/Creative | LinkedIn | X (Twitter), Instagram |
| Healthcare | LinkedIn | Instagram |
| Technology | LinkedIn | X (Twitter) |
| E-commerce | Instagram | LinkedIn |

### Structure

```markdown
# Diretrizes de Marketing para Redes Sociais

---

## Plataforma: LinkedIn

### Limites de Caracteres
[Table with limits]

### Formatos de Post
[Short and long post structures]

### Regras de Conteúdo
[Do's and don'ts]

### Padrões de Gancho
[Hook patterns that work]

---

## Plataforma: Instagram

### Limites de Caracteres
[Table with limits]

### Formatos de Post
[Carousel and single post structures]

### Regras de Conteúdo
[Do's and don'ts]

### Hashtags
[Category suggestions]

---

## Princípios de Adaptação

[Article to social transformation rules]

---

## Requisitos de Output

[Frontmatter and structure for generated content]

---

## Checklist de Qualidade

[Quality checklist]
```

---

## 7. memory.md

**Initialize empty article registry.**

### Structure

```markdown
---
articles: []
---

# Article Memory

This file serves as the central registry of published articles for the Linker agent. It enables cross-linking opportunities and "related posts" generation.

## Schema

Each article entry should include:

```yaml
- title: "Article Title"
  slug: "article-slug"
  excerpt: "1-2 sentence summary"
  meta_title: "SEO Title"
  meta_description: "SEO description"
  category: "category-name"
  keywords: ["keyword1", "keyword2"]
  primary_keyword: "main-keyword"
  author: "Author Name"
  status: "ready"
  related_posts:
    - slug: "related-slug"
      title: "Related Title"
  publish_date: "YYYY-MM-DD"
```

## Usage

The Linker agent reads this file to:
1. Find cross-linking opportunities
2. Generate "related posts" sections
3. Track content inventory

## Updating

After the Formatter agent produces final.md, add the article to this registry.
```

---

## 8. format.md

**Define article structure and categories.**

### Structure

```markdown
---
links: true
footnotes: true
---

# Estrutura de Formato de Posts  (Portuguese)
# Post Format Structure  (English)

---

## Formato de Artigo Padrão

### Frontmatter (YAML)

```yaml
---
title: "Título do Artigo"
slug: "titulo-do-artigo"
excerpt: "Resumo de 1-2 frases"
meta_title: "Título SEO"
meta_description: "Descrição SEO"
category: "[category]"
primary_keyword: "palavra-chave"
keywords: ["kw1", "kw2", "kw3"]
author: "[Author Name]"
---
```

**Regras CRÍTICAS:**
- SEM placeholders
- SEM dicas de extensão nos campos meta
- YAML válido
- Título APENAS no frontmatter

### Estrutura do Corpo

```markdown
## TL;DR
{Resumo}

{Parágrafo de abertura}

## {Seção 1}
{2-4 parágrafos}

## {Seção 2}
{2-4 parágrafos}

## {Seção 3}
{2-4 parágrafos}

## {Conclusão}
{1-2 parágrafos}

{CTA}
```

---

## Regras de Formatação

[Headings, paragraphs, lists, emphasis rules]

---

## Categorias Disponíveis

- `[category1]` - [Description]
- `[category2]` - [Description]
- `[category3]` - [Description]
```

### Category Generation

Map from expertise areas:

| Expertise Area | Category Slug | Description |
|----------------|---------------|-------------|
| Regularização de imóveis | regularizacao | Property regularization |
| Contratos | contratos | Real estate contracts |
| Inventário | inventario | Probate, inheritance |

---

## 9. Topics File

**Generate 10 topic ideas based on services and audience pain points.**

### File Naming

Name based on primary expertise area:
- `direito-imobiliario.yaml` (real estate law)
- `design-systems.yaml` (design)
- `healthcare-marketing.yaml` (healthcare)

### Structure

```yaml
# Tópicos de [Primary Expertise] - [Business Name]
# Foco: [Focus areas]

- topic: "Question/problem phrased as audience would search"
  keywords: [keyword1, keyword2, keyword3, keyword4, keyword5]
  category: category-slug
  angle:
    - Unique perspective or hook 1
    - Emotional connection angle 2
    - Practical insight angle 3
    - Counter-intuitive or surprising angle 4
    - Call to action or next step angle 5
```

### Topic Generation Rules

1. **Start with services:** Each service suggests 1-2 topics
2. **Add pain point topics:** Each persona pain point suggests a topic
3. **Include common questions:** What does the audience frequently ask?
4. **Mix topic types:**
   - How-to guides (2-3)
   - Problem/solution (2-3)
   - Checklist/list posts (1-2)
   - Myth-busting (1)
   - Case study/story (1-2)

### Angle Generation

Each topic needs 4-5 angles:
- **Hook angle:** Surprising or attention-grabbing opening
- **Emotional angle:** Connects to fear, desire, or frustration
- **Practical angle:** Concrete, actionable insight
- **Authority angle:** Demonstrates expertise
- **CTA angle:** Natural lead-in to contact

### Example Topic

```yaml
- topic: "Escritura não é registro: entenda por que você pode não ser dono do imóvel que comprou"
  keywords: [escritura, registro, matrícula, cartório, transferência]
  category: regularizacao
  angle:
    - Muita gente acha que ter a escritura significa ser dono — mas a lei diz outra coisa
    - A escritura é o contrato; o registro é o que transfere a propriedade de verdade
    - Casos reais de pessoas que descobriram que não eram donas quando foram vender
    - Se você só tem escritura, seu imóvel ainda está no nome do vendedor perante a lei
    - O passo a passo para verificar e regularizar a situação
```
