# Module 2 acceptance reference
The canonical contract is docs/report-brief.md. Preserve fixture values and assertions.
- All: 6 operations, 360000 cents; pending: OP003 and OP006, 75000 cents; confirmed: 4 operations, 285000 cents.
- Segment totals: tech 165000, home 100000, sports 95000 cents. Format pesos only for presentation and export.
- The report selector is independent of dashboard filters. Preserve the API, existing table, dashboard filters and navigation.
- Empty data: zero totals and useful message. Summary and CSV use the selected rows; escape CSV and handle clipboard errors.
- New work belongs in ReportBuilder.tsx and its dedicated helpers/styles/tests. Keep the existing Orbit shell and data source.
