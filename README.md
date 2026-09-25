# ZZZ Upgrade Planner

A calculator for planning character upgrades in **Zenless Zone Zero** and estimating the time needed to do so.

Enter a character's current levels and the levels you want to attain. The planner calculates the materials you still need, along with an estimated amount of farming time based on 320 daily energy.

GitHub Pages Instance: https://aftonone.github.io/zzz-upgrade-planner/

## What it calculates

- Agent level and EXP materials
- Agent promotion materials
- Regular skill levels
- Core skill nodes
- W-Engine level and promotion materials
- Disk upgrades
- Dennies
- Estimated farming energy and days

The W-Engine section can be disabled if it is already fully upgraded or you have one already. Disk costs can be calculated for multiple disks to account for the (awful) RNG when disk farming.
The estimated time does not include dennys. I did this because we get dennys from many other sources and I didn't think adding them to the esitmate was fair. If you're always low on currency and you have to farm dennys, you may need to add that to the time estimate yourself.

## Saving builds

Click **Save build**, enter a character name, and save the current plan. Saved builds can be loaded from the dropdown at the top of the page.

Builds are saved in your browser using local storage. They are not uploaded to a server or shared between devices.

## Running locally

No build tools or dependencies are required. Open [`index.html`](./index.html) in a browser.

## GitHub Pages deployment

This is a static website, so it can be hosted directly with GitHub Pages:

1. Create a public GitHub repository.
2. Add `index.html`, `app.js`, and `styles.css` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Save the settings.

GitHub will provide a public URL after the site finishes deploying.

## Note

Game costs and reward rates may change with future updates. If something becomes inaccurate, update the data in [`app.js`](./app.js) and open an issue or pull request with the corrected values.

## Contributing

Bug reports, corrected game data, and small improvements are welcome. When reporting an issue, include the levels used and the expected result if possible.

