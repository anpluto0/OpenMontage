# Green Express × Яндекс Еда — таргет-ролик курьера (handoff)

Статус: v4 готов (`renders/final_v4.mp4`, со звуком), пользователь доволен; проект оформлен как шаблон (`TEMPLATE.md`).
Следующий шаг: по запросу — новые ролики в этом формате по `TEMPLATE.md`; официальный SVG Яндекс Еды от заказчика.

- Сценарий (утверждён): `artifacts/script.json`, `artifacts/script_v3.md` — хук «Деньги нужны уже сегодня?», без цифр заработка.
- Раскадровка: `artifacts/scene_plan.json`.
- Стиль: «всё из квадратов», палитра ink #1B1B1F / paper #F4F1EA / yellow #FCE000 / coral #FF5A4E / WhatsApp #25D366; шрифт Onest. Герой — вариант A (`assets/images/hero_a.png`), появляется только с 10.5 с.
- Композиция HyperFrames: `hyperframes/index.html` (GSAP локально в `hyperframes/vendor/`). Рендер: `cd hyperframes && npx hyperframes render --quality standard -o ../renders/<name>.mp4`.
- Логотипы: `assets/brand/` (Green Express — вектор по оригиналу; Яндекс Еда — вырезан из PNG 480×270, нужен исходник лучше).
- Тайминг сцен: 0–3 хук · 3–10.5 проблемы · 10.5–13 поворот · 13–15.5 график · 15.5–19 выплаты · 19–24 CTA.
- Текст диктора: см. `artifacts/script_v3.md`. «Green Express» читать как «Грин Экспресс».
- RHVoice-пробы (`assets/audio/voice_test_*.mp3`) пользователю не понравились.
- ElevenLabs: ключ в переменной окружения `ELEVENLABS_API_KEY`, домен `api.elevenlabs.io` разрешён. Тариф Creator.

## Сессия 2026-11-03 (продолжение)
- Ключ ElevenLabs рабочий (GET /v1/models → 200). Права ключа ограничены: нет `user_read` и `speech_to_text`.
- Пробы голоса, eleven_v4, stability 0.45 / similarity 0.8, seed 7: `assets/audio/voice_samples/`
  - artem_lebedev_v4.mp3 (rQOBu7YxCDxGiFdTm28w) 19.5 с · dmitry_energetic_v4.mp3 (hU3rD0Yk7DoiYULTX1pD) 18.2 с · prince_nur_v4.mp3 (gJEfHTTiifXEDmO687lC) 17.4 с
- Ждём выбор голоса от пользователя.
- Выбран голос: **Prince Nur** (gJEfHTTiifXEDmO687lC), eleven_v4. Финальная озвучка = проба `voice_samples/prince_nur_v4.mp3`, нарезанная по паузам на 8 фраз (`assets/audio/vo/*.wav`, `vo/cues.txt`: id, начало, конец в пробе, позиция в ролике).
- Музыка: ElevenLabs Music через `music_gen`, `assets/audio/music/bgm_v1.mp3` (112 BPM, закончилась на 21.8 с) → продлена на 1 такт вставкой с 15.735 с: `bgm_v1_ext.wav`.
- SFX (ElevenLabs sound-generation): `assets/audio/sfx/` — whoosh, card_pop, phone_buzz, notif_ding, coins, click, paper_burst, success_pop. Точки и громкости — в скрипте микса (копия `assets/audio/mix.py`).
- Микс: `assets/audio/mix_v1.wav` (-14 LUFS, TP -1.5, дакинг музыки под голос). Тайминг сцен не менялся — фразы легли на начала сцен.
- Финал: `renders/final_v1.mp4` = draft_v1_silent.mp4 + mix_v1.wav (AAC 192k). Кадры: `renders/qc/contact.png`.

## Правки v2 (по отзыву пользователя)
- Алматы убраны из текста/голоса (таргет на разные города): фраза перезаписана `assets/audio/vo/E2.wav` (Prince Nur, v4, seed 7, с контекстом соседних фраз). В сцене поворота нет гор и дороги.
- Тайминг v2: 0–3 хук · 3–8.6 проблемы (сжаты, без пустой паузы после «подарок») · 8.6–11.6 поворот · 11.6–14 график · 14–17.5 выплаты · 17.75–24 CTA. В `index.html` позиции записаны в базе v1 и пересчитываются функцией `T()`.
- Герой: исправлен баг «улетающих глаз» (transformOrigin в px на SVG → svgOrigin), рука с лайком перерисована цельной, сцена 3 — заголовок одним шрифтом в две строки.
- Сцена 4: небо день→ночь (солнце садится, луна, окна домов загораются) + большой переключатель «Днём / Ночью».
- Сцена 5: игровые монеты ₸ вылетают из значка выплаты и собираются обратно.
- CTA: логотип Green Express в оригинальной компоновке (одна строка, Montserrat), «официальный партнёр + Яндекс Еда», кнопка «Написать в WhatsApp», палец нажимает, пузырь «Хочу курьером ✓✓».
- SFX: переходы/клики/попы — Pixabay из `.agents/skills/hyperframes-media/assets/sfx`; уведомление кредита — ElevenLabs `msg_tritone` (в духе iPhone, не оригинальный звук Apple); монеты — `coin_collect`/`coin_single`.
- Микс: `assets/audio/mix_v2.py` → `mix_v2.wav`. Старая композиция: `archive/hyperframes_index_v1.html`.

## Правки v3
- Переход проблемы → поворот: вместо разлёта осколков — карточки уходят вверх, из центра разворачивается жёлтый скруглённый квадрат (`#wipe`).
- Монеты без вращения «ребром» (оно сплющивало их) — лёгкое покачивание.
- Палец на CTA заменён курсором-стрелкой; сообщение «Хочу стать курьером» без галочек, подпись «Нажми и напиши:» отдельной строкой.
- Рендер: `renders/final_v3.mp4` (звук — `mix_v2.wav`, тайминги не менялись).

## Правки v4
- CTA: логотипы собраны в один симметричный белый блок по центру — знак GE + «Green Express» (Montserrat) по центральной оси, тонкий разделитель, «официальный партнёр» + логотип Яндекс Еды. Рендер `renders/final_v4.mp4`.
- Логотип Яндекс Еды всё ещё из PNG (исходник 480×270): для максимального качества нужен официальный SVG от пользователя.

## Шаблон (для следующих роликов)
- См. `TEMPLATE.md`. Тексты экрана — `hyperframes/content.js` (45 ключей, `data-k` в index.html).
- Звук — `assets/audio/cues.json` + `make_voice.py` (озвучка недостающих реплик) + `mix.py` (сведение). `mix.py` по cues.json даёт бит-в-бит тот же микс, что `final_v4`.
- Музыка в репозитории — `music/bgm_v1_ext.mp3` (wav-версия не коммитится).
- Хранение: ветка `green-express-courier-ad` в anpluto0/openmontage (projects/ в .gitignore — добавлено через `git add -f`) + артефакт https://claude.ai/artifact/PbTtgDQwk7Zib5wLfvxAjb.

## Правки v5
- Переход проблемы → поворот: сквозной сдвиг вверх (s2 уезжает, жёлтая s3 въезжает снизу за 0.65 с), сцена 3 начинает собираться во время сдвига — без пустого жёлтого кадра. Заливка `#wipe` удалена.
- С термосумки убран логотип.
- Логотип Green Express: официальный SVG от заказчика `assets/brand/green_express_logo_official.svg`; для CTA разрезан на `hyperframes/assets/ge_mark.svg` и `ge_wordmark.svg` (вектор, фирменный шрифт). Рендер `renders/final_v5.mp4`.

## v4 (динамичная версия RU→KZ)
- Сценарий `artifacts/script_v4.md`. Композиция `hyperframes_v4/` (тексты `content.js`), старая — `hyperframes/`.
- Маскот-желейка (как в «Рядом») в цветах Яндекс Еды: жёлтый, тёмная кепка, термосумка-рюкзак, тёмная лямка. Сцены по 2–3 с, переходы сдвигом.
- «Подключаем всех от 18 лет — поможем с оформлением» подтверждено заказчиком (тех, кто не подходит, передают партнёрскому центру — в ролике не говорим). Дисклеймер: только «18+».
- KZ-голос: Adi (wbGUrCE6cHpRbU9idaMy, носитель, eleven_v4, language_code kk) — выбран пользователем.
