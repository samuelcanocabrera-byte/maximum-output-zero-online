# Changelog

## V9 3D Arena: Full Combat Parity
### Geometry and stages
- `boxRect`, `obox` and `spire` now emit outward-facing winding. Every box used to draw its far faces, which made fighters look hollow and let stage geometry drop out of the painter's sort.
- The ground is drawn as a 16x16 projected tile grid instead of one quad, so the floor can never vanish when a corner leaves the camera frustum.
- Camera distance is clamped to 1450 world units and the pitch rises with distance, keeping the eye inside the skyline. Previously a spread-out fight pushed the camera past the fortress walls and the whole stage appeared to disappear.

### Fighters
- Rebuilt rig: hips, waist, torso, shoulder pads, upper arm, forearm, hand, thigh, shin, boot, jaw, ears, brows, mouth and back-of-head hair.
- Per-fighter detail from the sheets: Jin's coat tails, gold lapels, high collar and card case; Arata's open jacket, shirt wedge, wristband and taped fists; Shirogane's crystal facets, shard halo and white hair; Hido's asymmetric coat, triangle stitching and crystal extra arms; Kitsune's ponytail, coin pendant and asymmetric sleeve; Arashi's tattered strips and wind rings.
- Animations: walk cycle, idle breathing, guard crouch, three strike poses (jab / launcher / sweep), dash lean, air tuck, stun recoil and a KO pose.
- Fighters now angle a quarter toward the camera so coats, faces and weapons read in the shot.

### Combat parity with the 2D build
- 5-hit combo string with finisher knockback, SPACE + strike launcher and DOWN + strike sweep.
- Just Guard parry into COUNTER READY, guard damage reduction, dash i-frames with after-images.
- Per-fighter techniques: Jin's four arcanum suits (severance / integrity / accumulation / attachment) with a card wheel HUD, Avalanche, Luminal Lash plus holograms, crystal shards, homing vector loops and triple wind blades.
- Maximum at 70 Awakening, RCT heal and DOWN + RCT reversal, Simple Domain (guard + Domain), emotes, CE / Awakening / Momentum meters, 150 second clock, HP-scaled results, KO announcement and rematch flow.
- Domains: 100 Awakening + 35 CE, orbit cinematic, nine-second world replacement, and a 2.9 second clash window where a rival spends 35 Awakening + 28 CE to turn it into a barrier war with real HP frozen and 22 damage to the loser.
- Synth SFX for hits, heavy hits, guard, parry, dash, techniques, Maximum, Domain, heals and KO.

### Menu
- `#/3d` now opens on a real main menu: 2 Player Duel, 3 Player Free-for-All, Choose Fighters, Choose Arena, How to Play and a live 3D lineup behind the panel.
- Pause, result and a full controls/rules reference are menu pages, and the in-match bar reaches them.
- The 2D main menu gains **FIGHT THIS MATCH IN 3D**, which carries the selected mode, fighters and stage into `/3d` through query parameters; the title screen's 3D ARENA button does the same.

## V8.2 Combat, Roster, Online 3P, Input Devices
### Combat input
- An attack now commits the fighter: `attack()` clears guard frames (`guardStart = 0`, `guard = false`) and the per-frame guard recompute requires `attackAnim <= 0`.
- Holding Guard and striking is reliable again, and guard resumes the frame the swing ends instead of stacking block frames on top of the attack.
- Just Guard, parry windows, counter prompts and every existing attack/technique animation are unchanged.

### Shirogane Aizawa rebalance
- Base stats: HP 280 -> 265, speed 324 -> 314, energy regen 8.9 -> 8.0.
- Holograms (Cycle): 10 mirrors x 3 hits, 22 CE, 5.4 s -> 6 mirrors x 2 hits, 27 CE, 4.2 s. Absorb chance 43% -> 30%. Label reads "EMULATION // 6 MIRRORS".
- Luminal Lash (Technique): 17 -> 13 damage per beam, 21 -> 24 CE, cooldown 0.55 -> 0.62 s. Domain-reflected lash inherits the new values.
- Chronal Lag (Down + Technique): 10 -> 15 CE, invulnerability 0.28 -> 0.2 s, chronal window 0.25 -> 0.2, dash cooldown 0.6 -> 0.75, skill cooldown 0.48 -> 0.55.
- Moment Capture (Guard + Technique): 25 -> 30 CE, heal is capped at 40% of max HP, and it no longer refunds Cursed Energy.
- Overclock (Maximum): 86 -> 66 damage, burnout 3.3 -> 5.2 s.
- Domain (Negative Exposure): tick 0.53 -> 0.6 s, rays 3 + 2 x pressure -> 2 + 2 x pressure, damage 7 + 5 x pressure -> 5 + 4 x pressure.
- CTR Inverted Exposure: 24 -> 19 damage.

### Hido Dakara weapon visuals
- New `crystalWeapon(kind)` draw routine: crystal sword (blade, crossguard, hilt, pommel), spear (shaft, leaf blade, butt cap), faceted shield and a linked chain blade.
- Constructs are held in hand while attacking, constructing or casting, angled per weapon type.
- The shield is drawn whenever `shieldTime > 0`.
- Flying `triangle` constructs carry `weapon` and render as the same weapon in flight.
- Damage, projectile radius, speed, pierce and hitboxes are untouched.

### Three-player online
- The Host A Match panel has a 2 PLAYERS / 3 PLAYERS selector that sets the room size before creating it.
- Room creation sends the chosen size; `net.mode` follows the lobby and snapshots, so start, rosters and input routing use the real room size.
- Guest input is accepted for every slot below the room size, and snapshots rebuild a missing roster instead of assuming two fighters.
- Two-player rooms keep their previous defaults and behaviour.

### Typing and text fields
- `isTextEntry()` guard on both the local and guest keydown/keyup handlers, so room codes and nicknames receive every keystroke.
- The captured-key list is rebuilt after a remap instead of staying tied to the old layout.

### Custom keybinds
- New `KEYS` button in the top bar opens a panel using the existing settings chrome.
- 13 rebindable Player 1 actions including the emote key: click a key, press the new one.
- Conflicting keys swap instead of being refused; Escape cancels a rebind.
- Layout is saved in `localStorage` (`zero-keybinds-v1`), applied to Player 1, to the key-capture list and to the online input map, and can be restored to defaults.

### Controllers (PS4/PS5, Xbox, Switch Pro)
- Standard-mapping gamepad support: stick or D-pad move, A/Cross jump, X/Square strike, Y/Triangle technique, B/Circle guard, LB/L1 dash, RB/R1 cycle, LT/L2 RCT, RT/R2 Domain, R3 Maximum, Options/Menu emote.
- Controller is assigned to Player 1 and works alongside the keyboard at the same time.
- Brand is detected from the device id, and the KEYS panel shows connection state plus brand-specific button prompts.
- Entering an online room relays controller edges as normal inputs, so guests can play on a pad.
- Disconnecting clears held buttons and releases them for the server; reconnecting announces itself and restores prompts.

### Emotes
- Six emotes drawn with the existing fighter sigils, chosen from an on-canvas palette.
- Defaults: T (Player 1), ; (Player 2), Numpad + (Player 3), Options on a controller. Left/Right selects, the same key sends, 3.4 s timeout and 1.4 s cooldown.
- The palette and the 2.4 s speech bubble are drawn in the arena, so existing HUD layout is untouched.
- Emotes are simulated by the host and reach other players through snapshots; the server accepts the new `emote` action.

### Credits
- `CREDITS` button added to the existing menu footer, opening an overlay with Samuel, Ateeb and Wendao.
- No menu structure, palette, typography or animation changed.

### Copy
- HOW TO PLAY gains a CONTROLLERS & EMOTES paragraph; Host A Match copy now describes room sizes.

## V8.1.1 Domain Clash Crash Fix
- Fixed an asymmetric freeze when Player 1 challenged Player 2's Domain during its activation cinematic.
- The Domain-input loop now snapshots the active Domain and exits immediately after handling a challenge, before the clash can clear that state.
- Preserves the existing Domain cinematic, barrier collision, resource checks, and clash rules.

## V8.1 Clean Combat UI
- Fewer floating combat labels. Regular hit damage is shown in health meters instead of a flood of numbers.
- Key moments still have short, readable cues: parry, counter, Black Flash, finisher, launch, and resource limits.
- Cleaner, shorter Domain cinematics, Domain status and clash scores. All previous cinematics, effects and gameplay preserved.
- Removed the always-on tutorial ribbon from the fight. Detailed fighter guidance now lives under CONTROLS.
- Suppressed duplicate Domain labels and two-player-only third-fighter prompts.

## V8.0 Ascension
- Standalone title screen, separate fighter roster, four distinct arena selection cards.
- New procedural ruined city, shrine, rooftop and underground arena scenes.
- Heavier finishers, grounded and airborne combo hits, launchers, sweeps, wall bounces, responsive hit reaction physics.
- Timed parry and active counterattack with UI prompts.
- Combo hit/damage counter, Domain/Maximum resource warnings, refreshed in-game advanced move reference.
- Domain zoom, character close-up, sign stamp, extra visual atmosphere for all six Domains, custom activation stingers.
- Two-second opposing-barrier collision sequence at the start of a Domain clash, then normal virtual damage contest.
- Host arena selection in online lobby, arena synchronization via server and game snapshots.
- Mobile/tablet touch controller with landscape floating controls.
- Original adaptive four-track OST retained.

## V7.2 Original Soundtrack
- Four original theme MP3s with adaptive transitions and independent music/SFX volume.

## V7.1 Domain Crash Fix
- Central resource check for Domain/Clash actions and preserved nonviolent Domain logic.
