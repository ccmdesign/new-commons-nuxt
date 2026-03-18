# [P3] Missing newline at end of contentImporter.js

## Finding
The diff shows `contentImporter.js` ends without a trailing newline (`\ No newline at end of file`). This is a minor code hygiene issue that can cause noisy diffs in future changes.

## Location
`contentImporter.js` -- last line

## Suggested Fix
Add a trailing newline after `getResources();`.

## Status
- [ ] Pending
