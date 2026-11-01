---
name: review-change
description: Review the selected module 2 route against its acceptance contract without editing files.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---
# Review the selected change
1. Ask whether the learner is following the web or data route if it is not stated.
2. Read docs/acceptance.md and references/acceptance.md in this skill directory.
3. For web, read web/src/selection.ts and tests/selection.test.mjs. For data, read data/pipeline.py and data/tests/test_pipeline.py.
4. Explain the rule, one normal case and one edge case. Cite the files you read.
5. Do not edit files or execute commands. Distinguish code inspection from tests actually executed. Explain findings in Spanish and keep code identifiers in English.
