# Maximum Output: Zero, playing from different houses

This V7.2 folder includes `public/music/` with four MP3 tracks. **Upload the whole music folder and the new `server.mjs` too.** This folder is ready for a GitHub repository and a Render **Web Service**. It is not already hosted.

## A. Upload to GitHub

1. Extract this ZIP on your Mac.
2. Visit https://github.com/new and create a new repository called `maximum-output-zero-online`. Private is okay if Render is authorized to see it. You can choose Public if you want to use a public repository.
3. In the repository, select **Add file > Upload files**.
4. From **inside** the extracted `Maximum_Output_Zero_Deploy_Ready` folder, drag these items into the GitHub upload area: `server.mjs`, `package.json`, `render.yaml`, `public` (the folder), and optionally this instructions file. Do not upload the outer folder as an extra level.
5. Commit the files. Make sure your repository has:

    server.mjs
    package.json
    render.yaml
    public/index.html
    public/music/*.mp3

If dragging the `public` folder doesn't work, create a `public` folder in the repository by uploading `index.html` while you are viewing a `public` subdirectory, or use GitHub's Create new file path `public/index.html` and paste the contents of the local file.

## B. Make an online web service

1. Visit https://dashboard.render.com/
2. Click **New > Web Service** and connect your GitHub account to Render if prompted.
3. Select your `maximum-output-zero-online` repo.
4. Fill in the fields:
   - **Language/Runtime:** Node
   - **Branch:** main (or the branch with your files)
   - **Root Directory:** leave blank
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type/Plan:** Free (if eligible/available)
   - **Health Check Path**, if shown: `/health`
5. Click **Create Web Service** (or the equivalent deploy button) and follow its deploy logs.
6. The dashboard will show an HTTPS address like `https://maximum-output-zero-online-xyz.onrender.com`. This is an example, not a working link. Use the actual URL from your dashboard.
7. Check the deployed server by visiting its URL with `/health` appended. A healthy response includes `"ok":true`.

## C. Play

1. All 2 or 3 players open the **same HTTPS address** on their Chromebooks.
2. Select **PLAY ON SEPARATE CHROMEBOOKS**.
3. One player selects **CREATE ROOM**, then shares the six-character room code.
4. The others join using the code, choose their own fighters, and click **READY UP**.
5. The host clicks **START ONLINE MATCH**.
6. Everyone uses WASD, F (attack), G (technique), H (guard), Q (special), E (Domain), R (Maximum), C (RCT), and Left Shift (dash). Keep the host's browser tab open and visible throughout.

## If something doesn't work

- **Site says not found or deploy failed:** confirm `server.mjs`, `package.json`, and `public/index.html` are in the repository in the exact layout above.
- **Cannot join:** make sure everyone uses the **same HTTPS link** and enters the room code, rather than `localhost` or a local `192.168.x.x` IP.
- **Players disconnect:** all tabs must remain open, and the host should not close or refresh mid-match.
- **Slow to start:** Render's free tier can go to sleep after 15 minutes of inactivity and may take about a minute to wake back up. It can also restart unexpectedly, which clears the temporary rooms.
- **Friend's school-managed Chromebook blocks the link:** ask the school's IT administrator; don't bypass school filtering rules.

## Safety and account requirements

Render's published terms prohibit anyone under 16 from using its service; other eligibility rules also apply. If you aren't eligible for a Render account, have a parent/guardian who is eligible handle the hosting under their own account rather than bypassing the site's age requirements. Public GitHub repositories expose all the code, but game room codes are still private to invitees unless you share them.

## Technical notes

- `server.mjs` listens on `process.env.PORT` and `0.0.0.0`, as Render requires.
- Node 18+ is required.
- No third-party Node.js packages or database are required.
- The game server stores game rooms only in memory, so rooms reset when the service restarts.
- This is a friendly prototype. Lag and host performance affect responsiveness.
