# ZZZ Upgrade Planner

A calculator for planning character upgrades in **Zenless Zone Zero** and estimating the time needed to do so. I made this mostly for the time estimate as I hadn't found a good one online.

Enter a character's current levels and the levels you want to attain. The planner calculates the materials you still need, along with an estimated amount of farming time based on 320 daily energy.

GitHub Pages Instance: https://aftonone.github.io/zzz-upgrade-planner/

## What it calculates

- Agent level and EXP materials
- Agent promotion materials
- Combat skill levels
- Core skill nodes
- W-Engine level
- W-Engine promotion materials
- Disk upgrade materials
- Dennys
- Estimated farming energy and days

The W-Engine section can be disabled if you have one already. Disk costs can be calculated for as many disks as you would like to account for the (painful) RNG when disk farming.
The estimated time includes material and Denny farming, subtracting Dennies earned from core-material farming.
Enable **Manage Inventory** in the materials list to enter how many materials and Dennies you already have. Check the box beside a resource to mark it as fully covered by your inventory. Remaining needs and farming estimates update automatically. Inventory is stored locally in the browser and shared across saved builds.

Core skill nodes require Agent Levels 15, 25, 35, 45, 55, and 60 for A through F. Selecting a core node automatically raises the Agent Level target to its minimum requirement.

## Saving builds

Click **Save build**, enter a character name, and save the current plan. Saved builds can be loaded from the dropdown at the top of the page.

Builds are saved in your browser using local storage. They are not uploaded to a server or shared between devices.

Open **Planner notes** from the top bar to review the farming assumptions and planner details.

## Running locally

No build tools or dependencies are required. Copy the javascript, html and css files anywhere you want and open [`index.html`](./index.html) in a browser.

## GitHub Pages deployment

The site is hosted on GitHub pages for your (and my) convenience. 

## Note

Game costs and reward rates may change with future updates. If something becomes inaccurate, update the data in [`app.js`](./app.js) and open an issue or pull request with the corrected values.

## Contributing

Bug reports, corrected game data, and small improvements are welcome. I am not perfect and I make mistakes! When reporting an issue, include the levels used and the expected result if possible.
