---
status: resolved
severity: P3
file: docs/plans/CCM-129-content-updates.md
---

# Plan doc understates TODO count (says 20, actual is 22)

The plan document in Step 4 lists 20 TODOs to re-tag across 4 files, but the actual implementation correctly found and re-tagged 22 TODOs across 6 files. The plan missed:

- `pages/faq.vue` (1 TODO referencing CCM-127)
- `components/ncTimeline.vue` (1 TODO referencing CCM-127)

The implementation is correct -- the plan doc is simply stale. Consider updating the plan's Step 4 section and total count from "20" to "22" and adding the two missing files to the file list for accuracy.
