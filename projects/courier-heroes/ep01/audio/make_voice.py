#!/usr/bin/env python3
"""Озвучка реплик из cues.json, у которых ещё нет файла (или --force <id>).
Запуск из корня репозитория OpenMontage:
  python3 projects/<id>/assets/audio/make_voice.py projects/<id>/assets/audio/cues.json [--force E2]
Использует инструмент OpenMontage elevenlabs_tts (ключ ELEVENLABS_API_KEY). Соседние реплики идут
как контекст (previous_text / next_text), чтобы интонация совпадала. Тишина по краям обрезается."""
import json, subprocess, sys
from pathlib import Path
from tools.tool_registry import registry
cfg_path = Path(sys.argv[1]); base = cfg_path.parent
force = set(sys.argv[sys.argv.index("--force")+1:]) if "--force" in sys.argv else set()
cfg = json.load(open(cfg_path)); v = cfg["voice"]
registry.discover(); tts = registry.get("elevenlabs_tts")
lines = cfg["lines"]
for i, ln in enumerate(lines):
    wav = base / ln["file"]
    if wav.exists() and ln["id"] not in force:
        continue
    mp3 = wav.with_suffix(".mp3")
    req = {"text": ln["text"], "voice_id": v["voice_id"], "model_id": v["model_id"], "language_code": ln.get("language_code", v["language_code"]),
           "stability": ln.get("stability", v["stability"]), "similarity_boost": v["similarity_boost"], "seed": v["seed"], "output_path": str(mp3)}
    if i > 0: req["previous_text"] = lines[i-1]["text"][-100:]
    if i + 1 < len(lines): req["next_text"] = lines[i+1]["text"][:100]
    r = tts.execute(req)
    if not r.success:
        sys.exit(f"{ln['id']}: {r.error}")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(mp3), "-af",
        "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.05",
        "-ar", "44100", "-ac", "1", str(wav)], check=True)
    dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(wav)], capture_output=True, text=True).stdout.strip()
    print(f"{ln['id']}: {wav} ({dur} s) — проверьте, что start + длительность не наезжает на следующую реплику")
