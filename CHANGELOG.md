# Changelog

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
