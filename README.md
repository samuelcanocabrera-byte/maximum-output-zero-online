# MAXIMUM OUTPUT: ZERO, Six Fighters Update (V7)

A browser fighting game with **six playable characters**, local two- or three-player matches, and rooms for friends on separate Chromebooks. This is an updated version of the uploaded online-multiplayer game, not a separate simplified game.

## New characters

| Fighter | Main techniques | Domain |
| --- | --- | --- |
| Hido Dakara | Triangular Genesis, Creation, Enlarge, Bind, Reconstruction, 8,000-triangle reserve | Infinite Triangulation (**game-original** Domain because none was supplied) |
| Kitsune | Trajectory Strike, Refraction Barrier, Velocity Siphon (10 uses), Kinetic Loop | Intersectional Compass |
| Arashi | Tempest, Repelling Monsoon, Gale Step, Maximum: Zephyr | Eye of the Silent Hurricane |

**Still available:** Kisaragi Jin, Arata Michizane, and Shirogane Aizawa, including their card, Momentum, hologram, Domain wager, Black Flash, and three-way Domain clash systems.

### Universal Simple Domain

**Hold Guard + press Domain** for a defensive Simple Domain:

- On each Chromebook: hold **H**, tap **E**.
- Shared keyboard, Player 2: hold **L**, tap **O**.
- Shared keyboard, Player 3: hold **3**, tap **0**.
- Costs **24 Cursed Energy**, lasts **3.3 seconds**, and has a **9.5-second cooldown**. Protects the user against sure-hit attacks and the related status effects while active.
- It does not cancel Jin's nonviolent wagering Domain, and it doesn't automatically win Domain clashes.

### Extra fighter controls

All fighters use the same action buttons. On a separate Chromebook: **WASD** to move, **F** to attack, **G** Technique, **H** Guard, **Q** Cycle/Style, **E** Domain, **R** Maximum, **C** RCT, **Left Shift** Dash.

- **Hido:** G conjures the active creation. Q cycles sword, spear, shield and chain / reconstructs a trap. S+G enlarges the marked trap. H+G binds up to two additional crystal arms. The triangle meter decreases with creation and upkeep.
- **Kitsune:** G launches Trajectory Strike, S+G uses Velocity Siphon at short range, H+G creates a Refraction Barrier and redirects projectiles, Q charges a Kinetic Loop for the next G. R fires an enhanced Vector Cannon, an original gameplay adaptation.
- **Arashi:** G launches Tempest, S+G uses Repelling Monsoon, H+G uses Storm Veil, Q activates Gale Step. R charges Zephyr; connect a melee Attack within 5 seconds to apply a 6-second RCT lockout. Once per match.

## Publish the update for friends in different houses

This is a **GitHub-root-ready ZIP**. Extract it, then upload the following items **at the top level** of your existing GitHub repository, replacing the old copies:

```
package.json
server.mjs
render.yaml
public/
    index.html
README.md
CHANGELOG.md
```

**Do not upload the outer folder** as another level. If the repository previously had an extra directory around those files, instead point Render's **Root Directory** to that directory. The `package.json` must be inside the configured Root Directory.

If your Render Web Service is already connected to GitHub, committing these files typically triggers a new deployment. Otherwise, select **Manual Deploy → Deploy latest commit** in its dashboard.

Use these Render settings: Runtime **Node**, Build Command **`npm install`**, Start Command **`npm start`**, Health Check **`/health`**. The server uses Render's assigned `PORT` automatically.

To confirm: visit **your real Render URL followed by `/health`**. A running server responds with JSON containing `"ok":true`.

Then all players open your Render site, choose **Play on Separate Chromebooks**, join the same six-character room, each pick a fighter, ready up, and the room host starts.

## Run locally on a Mac

Install Node.js 18 or newer, open Terminal in the extracted folder, and run:

```bash
npm start
```

Open `http://localhost:3000` on your Mac. Friends on your home Wi-Fi can use your Mac's LAN IP address with port 3000, assuming the firewall allows it. For friends at different houses, deploy the server publicly instead.

## Network notes

The host's browser runs the authoritative match, while other players transmit inputs and receive game state through a lightweight Node.js room service. This build reduces visual stutter through client-side position smoothing and sends fewer decorative effects over the network. **It does not remove internet latency or guarantee low ping on Render's free tier.** The server and host browser both need to remain active. This has not been load-tested under all home-network conditions.

## Character interpretation

Each character's abilities are adapted to a ~150-second fighting-game round. Some complex effects are simplified for fairness and technical feasibility. In particular, **Hido's Domain Expansion was not supplied**, so Infinite Triangulation is an original addition. The additional Maximum-style attacks for Hido and Kitsune are also gameplay adaptations rather than abilities claimed in the supplied character descriptions.
