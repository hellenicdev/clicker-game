const state = {
  points: 0,
  clickValue: 1,
  upgrades: {},
  autoClickInterval: null,
  instantClickInterval: null,
};

const UPGRADES = [
  { id: 'doublePoints', name: 'Double Points', cost: 30, effect: s => { s.clickValue *= 2; } },
  { id: 'autoClicker', name: 'Auto-Clicker', cost: 80, effect: s => { startAutoClicker(s); } },
  { id: 'triplePoints', name: 'Triple Points', cost: 100, effect: s => { s.clickValue *= 3; } },
  { id: 'bonusMultiplier', name: 'Bonus Multiplier', cost: 200, effect: s => { s.clickValue *= 3; } },
  { id: 'instantClick', name: 'Instant Click', cost: 400, effect: s => { startInstantClick(s); } },
];

const counterEl = document.getElementById('counter');
const clickBtn = document.getElementById('clickButton');
const upgradesEl = document.getElementById('upgrades');

function render() {
  counterEl.textContent = `Points: ${state.points}`;
  for (const def of UPGRADES) {
    const btn = document.getElementById(`${def.id}Button`);
    if (!btn) continue;
    const up = state.upgrades[def.id];
    const affordable = !up && state.points >= def.cost;
    btn.className = affordable ? 'enabled' : 'disabled';
  }
}

function purchase(def) {
  const up = state.upgrades[def.id];
  if (up || state.points < def.cost) return;
  state.points -= def.cost;
  state.upgrades[def.id] = true;
  def.effect(state);
  render();
}

clickBtn.addEventListener('click', () => {
  state.points += state.clickValue;
  render();
});

for (const def of UPGRADES) {
  const btn = document.createElement('button');
  btn.id = `${def.id}Button`;
  btn.className = 'disabled';
  btn.textContent = `${def.name} (${def.cost})`;
  btn.addEventListener('click', () => purchase(def));
  upgradesEl.appendChild(btn);
}

function startAutoClicker(s) {
  if (s.autoClickInterval) return;
  s.autoClickInterval = setInterval(() => {
    s.points += s.clickValue;
    render();
  }, 1000);
}

function startInstantClick(s) {
  if (s.instantClickInterval) return;
  s.instantClickInterval = setInterval(() => {
    s.points += s.clickValue;
    render();
  }, 200);
}

render();
