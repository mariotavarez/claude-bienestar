# Module 2 acceptance reference
The canonical contract is docs/acceptance.md. Preserve fixture values and assertions.
- Web: segment AND status. Technology + confirmed returns OP001 and 120000 cents; all + pending returns OP003 and OP006; home + pending is empty; all + all retains six operations.
- Data: 9 input rows reconcile to 5 clean, 1 identical duplicate, 2 conflicting rows and 1 invalid row. Quarantine every version of a conflicting ID. Never guess a null amount as zero.
- Edits, when separately approved, are limited to web/src/selection.ts or data/pipeline.py for the selected route.
