const $ = (id) => document.getElementById(id);
const materialLabels = {
  cLog: ['Trainee Investigator Log', 'C', 'rank-c', 'Item_Trainee_Investigator_Log.webp'], bLog: ['Official Investigator Log', 'B', 'rank-b', 'Item_Official_Investigator_Log.webp'], aLog: ['Senior Investigator Log', 'A', 'rank-a', 'Item_Senior_Investigator_Log.webp'],
  cSeal: ['Basic Certification Seal', 'C', 'rank-c', 'Item_Basic_Certification_Seal.webp'], bSeal: ['Advanced Certification Seal', 'B', 'rank-b', 'Item_Advanced_Certification_Seal.webp'], aSeal: ['Specialized Certification Seal', 'A', 'rank-a', 'Item_Specialized_Certification_Seal.webp'],
  cChip: ['Basic Chip', 'C', 'rank-c', 'Item_Basic_Physical_Chip.webp'], bChip: ['Advanced Chip', 'B', 'rank-b', 'Item_Advanced_Physical_Chip.webp'], aChip: ['Specialized Chip', 'A', 'rank-a', 'Item_Specialized_Physical_Chip.webp'],
  coreA: ['Higher Dimensional Data', 'A', 'rank-a', 'Item_Higher_Dimensional_Data.webp'], coreS: ['Notorious Hunt Material', 'S', 'rank-special', 'Item_Notorious_Hunt_Material.webp'], cage: ['Hamster Cage', '◆', 'rank-special', 'Item_Hamster_Cage_Pass.webp'],
  cBattery: ['W-Engine Battery', 'C', 'rank-c', 'Item_W-Engine_Battery.webp'], bBattery: ['W-Engine Power Supply', 'B', 'rank-b', 'Item_W-Engine_Power_Supply.webp'], aBattery: ['W-Engine Energy Module', 'A', 'rank-a', 'Item_W-Engine_Energy_Module.webp'],
  cComponent: ['Basic Component', 'C', 'rank-c', 'Item_Basic_Component.webp'], bComponent: ['Reinforced Component', 'B', 'rank-b', 'Item_Reinforced_Component.webp'], aComponent: ['Specialized Component', 'A', 'rank-a', 'Item_Specialized_Component.webp'],
  cPlating: ['Molded Plating', 'C', 'rank-c', 'Item_Molded_Plating_Agent.webp'], bPlating: ['Crystallized Plating', 'B', 'rank-b', 'Item_Crystallized_Plating_Agent.webp'], aPlating: ['Ether Plating', 'A', 'rank-a', 'Item_Ether_Plating_Agent.webp']
};
const skills = [
  {name:'Basic Attack', icon:'Icon_Basic_Attack.webp'},
  {name:'Dodge', icon:'Icon_Dodge.webp'},
  {name:'Assist', icon:'Icon_Assist_Attack.webp'},
  {name:'Special Attack', icon:'Icon_Special_Attack.webp'},
  {name:'Chain Attack', icon:'Icon_Chain_Attack.webp'}
];
const skillCosts = [
  {cChip:2, denny:2000},{cChip:3,denny:3000},{bChip:2,denny:6000},{bChip:3,denny:9000},{bChip:4,denny:12000},{bChip:6,denny:18000},
  {aChip:5,denny:45000},{aChip:8,denny:67500},{aChip:10,denny:90000},{aChip:12,denny:112500},{aChip:15,denny:135000,cage:1}
];
const coreCosts = [{denny:5000},{coreA:2,denny:12000},{coreA:4,denny:28000},{coreS:2,coreA:9,denny:60000},{coreS:3,coreA:15,denny:100000},{coreS:4,coreA:30,denny:200000}];
const agentExp = [0,50,200,450,850,1450,2250,3250,4500,6000,7800,9735,11800,14000,16335,18800,21400,24135,27000,30000,34680,39655,44920,50480,56335,62480,68920,75655,82680,90000,100800,112200,124200,136800,150000,163800,178200,193200,208800,225000,242100,260400,279900,300600,322500,345600,369900,395400,422100,450000,484200,520800,559800,601200,645000,691200,739800,790800,844200,900000];
const engineExp = [0,50,150,300,500,800,1200,1700,2300,3050,4000,5200,6490,7870,9335,10890,12530,14265,16090,18000,20000,23120,26435,29945,33650,37550,41650,45945,50435,55120,60000,67200,74800,82800,91200,100000,109200,118800,128800,139200,150000,161400,173600,186600,200400,215000,230400,246600,263600,281400,300000,322800,347200,373200,400800,430000,460800,493200,527200,562800,600000];
const diskExp = [0,480,1200,2400,3840,5520,7680,10080,12720,15840,19440,23520,28560,34320,40800,48000];
const uncapAgent = [{cSeal:4,denny:24000},{bSeal:12,denny:56000},{bSeal:20,denny:120000},{aSeal:10,denny:200000},{aSeal:20,denny:400000}];
const uncapEngine = [{cComponent:4,denny:12000},{bComponent:12,denny:28000},{bComponent:20,denny:60000},{aComponent:10,denny:100000},{aComponent:20,denny:200000}];
const diskMaterials = [{key:'cPlating',exp:100,denny:150},{key:'bPlating',exp:500,denny:750},{key:'aPlating',exp:2000,denny:3000}];
const farmingYields = {aLog:['aLog','bLog','cLog'],aBattery:['aBattery','bBattery','cBattery'],aPlating:['aPlating','bPlating','cPlating'],aSeal:['aSeal','bSeal','cSeal'],aComponent:['aComponent','bComponent','cComponent'],aChip:['aChip','bChip','cChip']};
const inventoryStorageKey = 'zzz-inventory';
const inventoryAllStorageKey = 'zzz-inventory-all';
const inventoryModeStorageKey = 'zzz-track-inventory';
let currentRequirements = {};

function add(out, costs) { Object.entries(costs).forEach(([key, value]) => { out[key] = (out[key] || 0) + value; }); }
function inventoryState() { return JSON.parse(localStorage.getItem(inventoryStorageKey) || '{}'); }
function inventoryAllState() { return JSON.parse(localStorage.getItem(inventoryAllStorageKey) || '{}'); }
function inventoryCount(key) { return Math.max(0, Number(inventoryState()[key]) || 0); }
function hasAllInventory(key) { return inventoryAllState()[key] === true; }
function remainingRequirements(out) {
  if (!$('trackInventory').checked) return out;
  const inventory = inventoryState();
  const allInventory = inventoryAllState();
  return Object.fromEntries(Object.entries(out).map(([key, value]) => [key, allInventory[key] ? 0 : Math.max(0, value - (Number(inventory[key]) || 0))]));
}
function saveInventoryCount(key, value) {
  const inventory = inventoryState();
  inventory[key] = Math.max(0, Math.min(999999999, Math.floor(Number(value) || 0)));
  localStorage.setItem(inventoryStorageKey, JSON.stringify(inventory));
}
function saveAllInventory(key, checked) {
  const inventory = inventoryAllState();
  inventory[key] = checked;
  localStorage.setItem(inventoryAllStorageKey, JSON.stringify(inventory));
}
function levelCosts(current, target, expTable, uncaps, expKeys, levelOffset = 0, minimumLevel = 1) {
  const out = {denny:0}; const from = Math.max(minimumLevel, Math.min(current, 60)); const to = Math.max(from, Math.min(target, 60));
  const exp = expTable[to + levelOffset] - expTable[from + levelOffset]; if (exp > 0) {
    let remaining = exp; expKeys.forEach(([key, value]) => { const quantity = Math.floor(remaining / value); if (quantity) { out[key] = quantity; remaining -= quantity * value; } });
    if (remaining > 0) out[expKeys[expKeys.length - 1][0]] = (out[expKeys[expKeys.length - 1][0]] || 0) + Math.ceil(remaining / expKeys[expKeys.length - 1][1]);
  }
  uncaps.slice(from >= 20 ? Math.floor((from - 1) / 10) : 0, Math.floor((to - 1) / 10)).forEach((cost) => add(out, cost));
  return out;
}
function calculate() {
  const out = {denny:0}; add(out, levelCosts(+$('agentCurrent').value, +$('agentTarget').value, agentExp, uncapAgent, [['aLog',3000],['bLog',600],['cLog',100]], -1));
  if ($('engineEnabled').checked) add(out, levelCosts(+$('engineCurrent').value, +$('engineTarget').value, engineExp, uncapEngine, [['aBattery',3000],['bBattery',600],['cBattery',100]], 0, 0));
  document.querySelectorAll('.skill-item').forEach(skill => { const current = Math.max(1, Math.min(12, +skill.querySelector('.skill-current').value || 1)); const target = Math.max(current, Math.min(12, +skill.querySelector('.skill-target').value || current)); for (let i=current; i<target; i++) add(out, skillCosts[i-1]); });
  const coreTarget = Math.max(0, Math.min(6, +$('coreTarget').value || 0)); for (let i=0;i<coreTarget;i++) add(out, coreCosts[i]);
  const diskCount = Math.max(0, Math.min(99, +$('diskCount').value || 0)); const diskExpNeeded = diskExp[15]; let remaining = diskExpNeeded; let diskDennyCost = 0;
  [...diskMaterials].reverse().forEach(mat => { const qty = Math.floor(remaining / mat.exp); if (qty) { out[mat.key] = (out[mat.key] || 0) + qty * diskCount; remaining -= qty * mat.exp; diskDennyCost += qty * mat.denny; } });
  if (remaining) { const qty = Math.ceil(remaining / 100); out.cPlating = (out.cPlating || 0) + qty * diskCount; diskDennyCost += qty * diskMaterials[0].denny; }
  out.denny += diskDennyCost * diskCount;
  currentRequirements = out;
  render(out); renderTimeline(remainingRequirements(out));
}
function inventoryRow(key, name, icon, required) {
  const tracked = $('trackInventory').checked;
  const allChecked = hasAllInventory(key);
  const remaining = allChecked ? 0 : Math.max(0, required - inventoryCount(key));
  return `<div class="material-row" data-key="${key}" data-required="${required}"><span class="material-name"><label class="inventory-all" title="Mark as having all required ${name}" ${tracked ? '' : 'hidden'}><input ${key === 'denny' ? 'id="dennyHaveAll"' : ''} class="inventory-all-checkbox" data-inventory-key="${key}" type="checkbox" aria-label="Have all required ${name}" ${allChecked ? 'checked' : ''}></label><img class="material-icon material-image" src="./assets/materials/${icon}" alt="" loading="lazy">${name}</span><span class="material-demand"><span class="inventory-have" ${tracked ? '' : 'hidden'}><input ${key === 'denny' ? 'id="dennyHave"' : ''} class="inventory-count" data-inventory-key="${key}" type="number" min="0" max="999999999" step="1" value="${inventoryCount(key)}" aria-label="${name} currently on hand"></span><strong ${key === 'denny' ? 'id="dennyTotal"' : ''} class="material-remaining">${(tracked ? remaining : required).toLocaleString()}</strong></span></div>`;
}
function render(out) {
  const list = $('materialList'); list.innerHTML = '';
  $('inventoryHint').hidden = !$('trackInventory').checked;
  list.insertAdjacentHTML('beforeend', inventoryRow('denny', 'Dennies', 'Item_Denny.webp', out.denny || 0));
  Object.entries(out).filter(([key,value]) => key !== 'denny' && value > 0).forEach(([key,value]) => {
    const item=materialLabels[key]; if(!item)return;
    list.insertAdjacentHTML('beforeend', inventoryRow(key, item[0], item[3], value));
  });
  $('emptyState').style.display = Object.entries(out).every(([key,value]) => key === 'denny' || value <= 0) ? 'block' : 'none';
  enhanceNumberInputs();
  syncInventoryInputs();
}
function updateInventoryResults() {
  document.querySelectorAll('.material-row').forEach(row => {
    const have = Number(row.querySelector('.inventory-count').value) || 0;
    const all = row.querySelector('.inventory-all-checkbox').checked;
    row.querySelector('.material-remaining').textContent = (all ? 0 : Math.max(0, Number(row.dataset.required) - have)).toLocaleString();
  });
  syncInventoryInputs();
  renderTimeline(remainingRequirements(currentRequirements));
}
function syncInventoryInputs() {
  document.querySelectorAll('.material-row').forEach(row => {
    const all = row.querySelector('.inventory-all-checkbox').checked;
    const input = row.querySelector('.inventory-count');
    input.disabled = all;
    input.closest('.number-control').querySelectorAll('.number-buttons button').forEach(button => { button.disabled = all; });
  });
}
function farmingRuns(out, keys, low, high) {
  const a = out[keys[0]] || 0;
  const bEquivalent = (out[keys[1]] || 0) + (out[keys[2]] || 0) / 3;
  return {low: Math.max(a / high, bEquivalent / high), high: Math.max(a / low, bEquivalent / low)};
}
function timelineEnergy(out, sCoreDays) {
  const runs = [];
  [['aLog',3,4],['aBattery',4,5],['aSeal',1,1],['aComponent',1,1],['aChip',1,1],['aPlating',4,5]].forEach(([key,low,high]) => {
    const result = farmingRuns(out, farmingYields[key], low, high); if (result.high > 0) runs.push({low:result.low * 20, high:result.high * 20});
  });
  const coreABatches = Math.ceil((out.coreA || 0) / 5);
  const coreA = coreABatches * 40;
  const coreSRequired = Math.max(0, (out.coreS || 0) - Math.floor(sCoreDays / 7) * 3);
  const coreS = coreSRequired * 60;
  if (coreA > 0) runs.push({low:coreA, high:coreA});
  if (coreS > 0) runs.push({low:coreS, high:coreS});
  const coreDennyRewards = coreABatches * 2500 + coreSRequired * 4500;
  const dennyEnergy = Math.max(0, (out.denny || 0) - coreDennyRewards) / 25000 * 20;
  if (dennyEnergy > 0) runs.push({low:dennyEnergy, high:dennyEnergy});
  return {low:runs.reduce((total,item)=>total+item.low,0), high:runs.reduce((total,item)=>total+item.high,0)};
}
function solveTimeline(out) {
  const solve = (mode) => { let days = 0; for (let i=0;i<1000;i++) { const energy=timelineEnergy(out,days)[mode]; const next=Math.ceil(energy/320); if(next===days)return {days,energy}; days=next; } return {days,energy:timelineEnergy(out,days)[mode]}; };
  return {low:solve('low'),high:solve('high')};
}
function renderTimeline(out) {
  const estimate=solveTimeline(out); $('daysEstimate').textContent=`${estimate.low.days}–${estimate.high.days} days`; $('energyEstimate').textContent=`${Math.ceil(estimate.low.energy).toLocaleString()}–${Math.ceil(estimate.high.energy).toLocaleString()} energy`;
  const coreRewardNote = (out.coreS || 0) > 0 ? ' Includes 3 free S-rank core materials each week.' : '';
  $('energyNote').textContent = `Estimate includes material and Denny farming; manually managed inventory is deducted. Core-farming Denny rewards are deducted. Range reflects drops.${coreRewardNote}`;
}
function buildState() { return {agentCurrent:$('agentCurrent').value,agentTarget:$('agentTarget').value,engineEnabled:$('engineEnabled').checked,engineCurrent:$('engineCurrent').value,engineTarget:$('engineTarget').value,diskCount:$('diskCount').value,coreTarget:$('coreTarget').value,skills:[...document.querySelectorAll('.skill-item')].map(skill=>({current:skill.querySelector('.skill-current').value,target:skill.querySelector('.skill-target').value}))}; }
function loadState(s) { Object.entries(s).forEach(([key,value])=>{ if(key === 'skills')return; const el=$(key); if(el){if(el.type==='checkbox')el.checked=value;else el.value=value;} }); s.skills?.forEach((saved,i)=>{const skill=document.querySelectorAll('.skill-item')[i];if(!skill)return;const current=typeof saved==='object'?saved.current:'1';const target=typeof saved==='object'?saved.target:saved;skill.querySelector('.skill-current').value=current;skill.querySelector('.skill-target').value=target;}); if(s.cores && s.coreTarget === undefined) $('coreTarget').value = s.cores.filter(value => value === '1').length; updateCoreSlider(); ensureAgentTargetMeetsCore(); calculate(); }
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
skills.forEach(skill=>$('skillGrid').insertAdjacentHTML('beforeend',`<div class="skill-item"><div class="skill-title"><img src="./assets/icons/${skill.icon}" alt=""><span>${skill.name}</span></div><div class="skill-levels"><label>Current<input class="skill-current" type="number" min="1" max="12" value="1" aria-label="${skill.name} current level"></label><label>Target<input class="skill-target" type="number" min="1" max="12" value="12" aria-label="${skill.name} target level"></label></div></div>`));
function enhanceNumberInputs() {
  document.querySelectorAll('input[type="number"]:not([data-spinner-ready])').forEach(input => {
    input.dataset.spinnerReady = 'true';
    const wrapper = document.createElement('span');
    wrapper.className = 'number-control';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    const buttons = document.createElement('span');
    buttons.className = 'number-buttons';
    buttons.innerHTML = '<button type="button" data-step="up" aria-label="Increase value">+</button><button type="button" data-step="down" aria-label="Decrease value">−</button>';
    wrapper.appendChild(buttons);
    buttons.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || input.disabled) return;
      const min = Number(input.min || 0), max = Number(input.max || 999), step = Number(input.step || 1);
      input.value = Math.max(min, Math.min(max, Number(input.value || min) + (button.dataset.step === 'up' ? step : -step)));
      input.dispatchEvent(new Event('input', {bubbles:true}));
    });
  });
}
enhanceNumberInputs();
const coreAgentLevelRequirements = [0,15,25,35,45,55,60];
function ensureAgentTargetMeetsCore() {
  const requiredLevel = coreAgentLevelRequirements[+$('coreTarget').value] || 0;
  if (+$('agentTarget').value < requiredLevel) $('agentTarget').value = requiredLevel;
}
function updateCoreSlider() { const value = +$('coreTarget').value; $('coreTargetLabel').textContent = value === 0 ? 'Skip' : `Through ${'ABCDEF'[value - 1]}`; $('coreTarget').style.setProperty('--core-progress', `${(value / 6) * 100}%`); }
updateCoreSlider();
document.querySelectorAll('input,select').forEach(el=>{ if(!el.matches('.inventory-count,.inventory-all-checkbox'))el.addEventListener('input',calculate); }); $('engineEnabled').addEventListener('change',calculate);
$('trackInventory').checked = localStorage.getItem(inventoryModeStorageKey) === 'true';
$('trackInventory').addEventListener('change',() => {
  localStorage.setItem(inventoryModeStorageKey, String($('trackInventory').checked));
  render(currentRequirements);
  renderTimeline(remainingRequirements(currentRequirements));
});
$('materialList').addEventListener('input',event => {
  const input = event.target.closest('.inventory-count');
  if (!input) return;
  saveInventoryCount(input.dataset.inventoryKey, input.value);
  updateInventoryResults();
});
$('materialList').addEventListener('change',event => {
  const input = event.target.closest('.inventory-all-checkbox');
  if (!input) return;
  saveAllInventory(input.dataset.inventoryKey, input.checked);
  updateInventoryResults();
});
document.querySelectorAll('.skill-item').forEach(skill=>skill.addEventListener('input',event=>{
  const current=skill.querySelector('.skill-current'), target=skill.querySelector('.skill-target');
  if (+current.value > +target.value) target.value=current.value;
  if (+target.value < +current.value) current.value=target.value;
  calculate();
}));
$('coreTarget').addEventListener('input',()=>{ ensureAgentTargetMeetsCore(); updateCoreSlider(); calculate(); });
$('agentTarget').addEventListener('input',()=>{ ensureAgentTargetMeetsCore(); calculate(); });
function refreshProfiles(){const profiles=JSON.parse(localStorage.getItem('zzz-profiles')||'{}'), select=$('profileSelect');select.innerHTML='';const empty=document.createElement('option');empty.value='';empty.textContent=Object.keys(profiles).length?'Saved builds':'No saved builds';select.appendChild(empty);Object.keys(profiles).forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name;select.appendChild(option)});}
function closeSaveDialog(){ $('saveDialog').hidden = true; $('characterName').value = ''; }
$('notesButton').addEventListener('click',()=>{ $('notesDialog').hidden = false; $('closeNotesButton').focus(); });
function closeNotesDialog(){ $('notesDialog').hidden = true; $('notesButton').focus(); }
$('closeNotesButton').addEventListener('click',closeNotesDialog);
$('notesDialog').addEventListener('click',event=>{if(event.target === $('notesDialog'))closeNotesDialog()});
document.addEventListener('keydown',event=>{
  if ($('notesDialog').hidden) return;
  if (event.key === 'Escape') closeNotesDialog();
  else if (event.key === 'Tab') { event.preventDefault(); $('closeNotesButton').focus(); }
});
$('saveButton').addEventListener('click',()=>{ $('saveDialog').hidden = false; $('characterName').focus(); });
['cancelSaveButton','cancelSaveButtonSecondary'].forEach(id=>$(id).addEventListener('click',closeSaveDialog));
$('saveDialog').addEventListener('click',event=>{if(event.target === $('saveDialog'))closeSaveDialog()});
$('saveForm').addEventListener('submit',event=>{event.preventDefault();const name=$('characterName').value.trim();if(!name)return;const profiles=JSON.parse(localStorage.getItem('zzz-profiles')||'{}');profiles[name]=buildState();localStorage.setItem('zzz-profiles',JSON.stringify(profiles));refreshProfiles();$('profileSelect').value=name;closeSaveDialog();toast(`${name} build saved`)});
$('profileSelect').addEventListener('change',e=>{if(!e.target.value)return;const profiles=JSON.parse(localStorage.getItem('zzz-profiles')||'{}');loadState(profiles[e.target.value])});
$('resetButton').addEventListener('click',()=>{if(confirm('Reset this planner?'))location.reload()}); refreshProfiles(); calculate();
