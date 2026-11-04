"""Pure transformation. Never change the input or guess missing amounts."""
from collections import defaultdict

SEGMENTS = {"tech", "home", "sports"}
STATUSES = {"confirmed", "pending"}

def normalize_operation(row):
    if not isinstance(row, dict):
        raise ValueError("Row must be an object")
    identifier = row.get("id")
    amount = row.get("amount_cents")
    segment = row.get("segment")
    status = row.get("status")
    if not isinstance(identifier, str) or not identifier.strip():
        raise ValueError("Missing operation ID")
    if type(amount) is not int or amount < 0:
        raise ValueError("Amount must be a non-negative integer in cents")
    if not isinstance(segment, str) or not isinstance(status, str):
        raise ValueError("Missing segment or status")
    segment, status = segment.strip().lower(), status.strip().lower()
    if segment not in SEGMENTS or status not in STATUSES:
        raise ValueError("Unknown segment or status")
    return {"id": identifier.strip(), "segment": segment, "status": status, "amount_cents": amount}

def clean_operations(rows):
    groups = defaultdict(list)
    result = {"clean": [], "duplicates": [], "conflicts": [], "invalid": []}
    for index, row in enumerate(rows):
        try:
            operation = normalize_operation(row)
            groups[operation["id"]].append({"index": index, "operation": operation})
        except ValueError as error:
            result["invalid"].append({"index": index, "reason": str(error)})
    for entries in groups.values():
        signatures = {tuple(sorted(entry["operation"].items())) for entry in entries}
        if len(signatures) > 1:
            result["conflicts"].extend(entries)
        else:
            result["clean"].append(entries[0]["operation"])
            result["duplicates"].extend(entries[1:])
    return result
