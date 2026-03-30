---
status: resolved
severity: P3
file: docs/plans/CCM-129-content-updates.md
---

# Plan doc references pre-merge line numbers and commit hashes

The plan document references specific line numbers (e.g., "line 33", "line 24", "lines 35-37") and commit hashes (e.g., `ef2e481`, `77e4a4d`) from the `dev` branch state before the merge. After the merge commit (`fbd78b0`) and the TODO re-tag commit, these line numbers have shifted.

This is cosmetic since the plan is a historical artifact, but if it is used as a living reference for Phase 2 blocked items, the line numbers in the "Blocked on Client" section will be wrong and could confuse future implementers. Consider either adding a note that line numbers are approximate or updating them post-merge.
