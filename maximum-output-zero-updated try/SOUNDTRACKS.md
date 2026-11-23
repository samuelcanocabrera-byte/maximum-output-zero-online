# MAXIMUM OUTPUT: ZERO, Original Soundtrack Update (V7.2)

This update includes four original, instrumental, computer-synthesized tracks. They are **not** recordings or samples from other games, anime, or artists.

| Game state | Track | Replaceable file |
| --- | --- | --- |
| Character select and online lobby | Zero Horizon | `public/music/zero-horizon.mp3` |
| Normal combat | Cursed Circuit | `public/music/cursed-circuit.mp3` |
| Domain Expansion, including clashes | Barrier Collapse | `public/music/barrier-collapse.mp3` |
| Match finished / results screen | Final Verdict | `public/music/final-verdict.mp3` |

## How the soundtrack behaves

* Browser audio begins after a click or keypress. This restriction is normal for modern browsers. If you don't hear it, click the **MUSIC ON** button or start a match.
* Music automatically crossfades when you enter a match, trigger a Domain, finish a match, or return to character select. During pause, music becomes quieter.
* The top bar includes **SOUND ON/OFF** (master mute), **MUSIC ON/OFF**, and **AUDIO** (music volume, sound-effect volume, and track preview).
* Audio settings are local to each browser or Chromebook. Volume preferences are saved in local storage when possible.
* Existing ability sound effects remain independent of the soundtrack. The host and guests play the soundtrack locally based on the match state.
* Files are fully included in the ZIP. Music plays without connecting to streaming services.

## How to add your own soundtrack

1. Create or choose audio you made yourself or have permission to use, ideally short instrumental loops.
2. Convert your audio to MP3 using your preferred editor.
3. Replace the relevant `public/music/*.mp3` file using the **same filename**.
4. Re-upload `public/music/` with the updated `server.mjs` and redeploy to Render or run locally.

For a new song title or an entirely new music cue, edit the `musicSources` and `musicNames` objects near **ORIGINAL ADAPTIVE SOUNDTRACK** in `public/index.html`.

## Local run

From inside the extracted game folder:

```sh
npm start
```

Open `http://localhost:3000`. The server now supports `/music/*.mp3` requests, including HTTP byte-range requests, which are needed for reliable audio playback in browsers.
