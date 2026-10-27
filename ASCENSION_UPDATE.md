# Maximum Output: Zero V8.0, Ascension Update

The update retains all six fighters, their current Domain rules, the wager system, original soundtrack files, online room infrastructure, RCT/CTR, Black Flash, unique techniques and the full in-game control reference.

## Combat

- Inputs: Attack produces a five-strike string with a heavy final hit. Up + Attack launches; Down + Attack sweeps. Land a hit on an airborne opponent to prolong the juggle.
- Weight and impact: knocked-back players retain momentum while stunned. Heavy hits near a wall can bounce opponents back for follow-up attacks.
- Defense: a precisely timed guard creates a 0.58-second counter opportunity. Press Attack while COUNTER READY is displayed to respond with a knockback launcher.
- Feedback: combo hits and damage are counted per attacker, with short on-screen notices. Invalid Domain and Maximum activation provides useful resource messages instead of silent failures.

## Domain cinematics

- Individual Domain-cast stingers are procedurally generated and use the Sound Effects volume setting.
- Domain activation displays the owner's zoomed character portrait and hand-sign title with a cinematic progress bar and special overlays.
- During a clash, both fighters appear against clashing barrier graphics. The barrier collision prelude is 2 seconds; the existing timed virtual-damage competition follows.
- All six Domain environments have additional ambient effects, each matching the Domain's energy aesthetic.

## Arenas

1. Ruined City, broken towers and cinders
2. Abandoned Shrine, torii gates, forest silhouettes and lanterns
3. Rooftop at Night, skyline and moonlight
4. Underground Arena, floodlights and concrete supports

Stages are visually different; they do not add gameplay hazards or arena stat modifiers. During a Domain, the Domain environment replaces the normal arena.

## Audio and platform support

Four original MP3 tracks retained: Zero Horizon, Cursed Circuit, Barrier Collapse, and Final Verdict. They switch automatically with the match state. Music/effects volumes remain separate.

On a mobile/touchscreen device, there are touch controls for the device's own fighter. Landscape mode is recommended. Each remote online player uses the same touch button layout. For 2 or 3 friends on phones, connect each person via an online room.

## Testing conducted

- Desktop browser title → roster → arena → match → pause flow, no JavaScript exceptions.
- All six Domain activations rendered.
- A 2-fighter Domain-clash cinematic started with proper resource checks.
- Insufficient CE/Awakening could not open a Domain or consume resources.
- Successful parry → counter and combo accumulation behavior verified.
- Mobile landscape control layer displayed; touch event handlers executed without exceptions.
- Server room creation, host-only arena selection, invalid-arena rejection, HTML and MP3 serving checked.

The game was tested in browser automation, not through a long competitive playtest with multiple school devices. Performance, browser-specific audio, complex multiplayer situations and input balancing may still need testing with friends.
