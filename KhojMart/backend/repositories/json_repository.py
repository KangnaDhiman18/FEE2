import json
from pathlib import Path
from typing import Any


class JsonRepository:
    def __init__(self, filename: str):
        self.path = Path(__file__).resolve().parent.parent / "data" / filename
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def read(self) -> list[dict[str, Any]]:
        if not self.path.exists():
            self.write([])
        return json.loads(self.path.read_text(encoding="utf-8"))

    def write(self, records: list[dict[str, Any]]) -> None:
        self.path.write_text(json.dumps(records, indent=2), encoding="utf-8")

    def next_id(self) -> int:
        records = self.read()
        return max((int(item["id"]) for item in records), default=0) + 1
