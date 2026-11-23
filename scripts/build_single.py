#!/usr/bin/env python3
"""Build the single-file edition of Unrushed.

Some hosts store a skill as one SKILL.md with no folders: Claude accounts, and agents that
load those skills, such as ChatCut's. This script writes dist/unrushed-single-file.md, which is the
regular SKILL.md followed by the essential references embedded in full or condensed form.

Usage (from the repository root):
  python scripts/build_single.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dist" / "unrushed-single-file.md"


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8").strip()


def demote(md):
    """Push headings down two levels so embedded files sit under one section."""
    return re.sub(r"^(#{1,4}) ", lambda m: "#" * (len(m.group(1)) + 2) + " ", md, flags=re.M)


def condensed_techniques():
    src = read("references/techniques.md")
    index = src.split("## 2. Index by meaning", 1)[1].split("## 3.", 1)[0].strip()
    lessons = src.split("**Two lessons from the whole library:**", 1)[1].split("---", 1)[0].strip()
    entries = []
    for block in re.split(r"^#### ", src.split("## 4. Entries", 1)[1], flags=re.M)[1:]:
        slug = block.splitlines()[0].strip()
        fields = dict(re.findall(r"^- \*\*(\w[\w ]*)\*\*: (.+)$", block, flags=re.M))
        source = re.sub(r"\s*https?://\S+", "", fields.get("Source", "")).rstrip(". ")
        what = fields.get('What', '')
        what = what[:1].upper() + what[1:]
        entries.append(
            f"- **{slug}** ({source}). {what} "
            f"*Params:* {fields.get('Key parameters', '')} *Build:* {fields.get('Build', '')} "
            f"*In video:* {fields.get('In video', '')} "
            f"*Note:* {fields.get('Critical note', '')}"
        )
    return (
        "### Index by meaning\n\n" + index + "\n\n### Two lessons\n\n" + lessons +
        "\n\n### Entries (condensed; sources and links in the full file)\n\n" + "\n".join(entries)
    )


BANNER = (
    "> **Single-file edition.** The reference files are embedded at the end of this file, each under a heading "
    "\"Embedded: <path>\". Whenever an instruction says to read a file in `references/`, read that section instead "
    "of looking for the file on disk. Files not embedded (`targets/remotion.md`, `targets/generic.md`, the templates, the example, "
    "`scripts/detect.py`, `assets/remotion/unrushed-motion.ts`) can be read from https://raw.githubusercontent.com/amladinon94-source/unrushed/main/<path>."
)


def main():
    skill = read("SKILL.md")
    # Put the banner right under the H1, so agents see it before any instruction to open a file.
    skill = skill.replace("\n# Unrushed\n", "\n# Unrushed\n\n" + BANNER + "\n", 1)
    assert BANNER in skill, "banner not inserted" 
    parts = [
        skill,
        "\n---\n\n# Embedded references (single-file edition)\n\n"
        "This edition embeds the essentials so the skill works where only one file is installed. "
        "The full files, with every source link, are in the repository: "
        "https://github.com/amladinon94-source/unrushed. "
        "`targets/remotion.md`, `targets/generic.md`, the templates, `scripts/detect.py` and `assets/remotion/unrushed-motion.ts` are only there.",
        "## Embedded: references/narrative.md\n\n" + demote(read("references/narrative.md")),
        "## Embedded: references/principles.md\n\n" + demote(read("references/principles.md")),
        "## Embedded: references/motion-kit.md\n\n" + demote(read("references/motion-kit.md")),
        "## Embedded: references/visual-explanation.md\n\n" + demote(read("references/visual-explanation.md")),
        "## Embedded: references/transitions.md\n\n" + demote(read("references/transitions.md")),
        "## Embedded: references/effects.md\n\n" + demote(read("references/effects.md")),
        "## Embedded: references/ai-tells.md\n\n" + demote(read("references/ai-tells.md")),
        "## Embedded: references/techniques.md (condensed)\n\n" + condensed_techniques(),
        "## Embedded: references/targets/chatcut.md\n\n" + demote(read("references/targets/chatcut.md")),
        "## Embedded: taste/verdicts.md\n\n" + demote(read("taste/verdicts.md")),
    ]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n\n".join(parts) + "\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)} ({len(OUT.read_text().splitlines())} lines)")


if __name__ == "__main__":
    main()
