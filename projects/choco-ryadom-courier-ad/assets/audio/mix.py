#!/usr/bin/env python3
"""Сведение дорожки ролика по cues.json.
Запуск из папки assets/audio:  python3 mix.py cues.json mix.wav
Голос + музыка (с дакингом под голос) + SFX → громкость master.lufs, пик master.true_peak."""
import json, subprocess, sys
from pathlib import Path
cfg = json.load(open(sys.argv[1])); out = sys.argv[2]
D = cfg["duration"]; sfx_dir = Path("sfx")
inp, f = [], []
for i, ln in enumerate(cfg["lines"]):
    inp += ["-i", ln["file"]]
    f.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={ln.get('gain_db',0)}dB,adelay={int(ln['start']*1000)}:all=1[v{i}]")
n = len(cfg["lines"])
f.append("".join(f"[v{i}]" for i in range(n)) + f"amix=inputs={n}:normalize=0,apad=whole_dur={D},atrim=0:{D},asplit=2[vo][vosc]")
for j, s in enumerate(cfg["sfx"]):
    peak = cfg["sfx_peak_db"].get(s["file"], 0)
    inp += ["-i", str(sfx_dir / f"{s['file']}.mp3")]
    f.append(f"[{n+j}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={s['gain_db']-peak}dB,adelay={int(s['at']*1000)}:all=1[s{j}]")
m = n + len(cfg["sfx"])
f.append("".join(f"[s{j}]" for j in range(len(cfg["sfx"]))) + f"amix=inputs={len(cfg['sfx'])}:normalize=0,apad=whole_dur={D},atrim=0:{D}[sfx]")
mu = cfg["music"]; dk = mu["duck"]
inp += ["-i", mu["file"]]
f.append(f"[{m}:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:{D},volume={mu['gain_db']}dB,afade=t=out:st={mu['fade_out_at']}:d={D-mu['fade_out_at']}[mus]")
f.append(f"[mus][vosc]sidechaincompress=threshold={dk['threshold']}:ratio={dk['ratio']}:attack={dk['attack']}:release={dk['release']}[musd]")
ms = cfg["master"]
f.append(f"[vo][musd][sfx]amix=inputs=3:normalize=0,loudnorm=I={ms['lufs']}:TP={ms['true_peak']}:LRA=9,aresample=48000,atrim=0:{D}[out]")
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *inp, "-filter_complex", ";".join(f), "-map", "[out]", "-c:a", "pcm_s16le", out], check=True)
print("ok", out)
