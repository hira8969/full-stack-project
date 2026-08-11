const incidents = [
  { id: 'RS-2048', level: 'critical', title: 'Family trapped on roof', area: 'Kampung Baru · 4 people', time: '2m ago' },
  { id: 'RS-2057', level: 'critical', title: 'Medical evacuation required', area: 'Taman Melati · dialysis patient', time: '5m ago' },
  { id: 'RS-2051', level: 'high', title: 'Vehicle stalled in floodwater', area: 'Jalan Gombak · 2 people', time: '8m ago' },
  { id: 'RS-2053', level: 'medium', title: 'Road blocked by debris', area: 'Setapak · verified report', time: '11m ago' }
];
const teams = [
  { name: 'Alpha 01', detail: 'Swift water rescue · 5 members', state: 'deployed', label: 'DEPLOYED', initials: 'A1' },
  { name: 'Delta 03', detail: 'Medical response · 4 members', state: 'available', label: 'AVAILABLE', initials: 'D3' },
  { name: 'Bravo 02', detail: 'Evacuation unit · 6 members', state: 'returning', label: 'RETURNING', initials: 'B2' }
];
const shelters = [
  { name: 'SMK Taman Melati', detail: '284 / 320 beds', capacity: '89%', risk: true },
  { name: 'Gombak Community Hall', detail: '116 / 250 beds', capacity: '46%' },
  { name: 'Dewan Seri Setapak', detail: '208 / 240 beds', capacity: '87%', risk: true }
];

const incidentList = document.querySelector('#incidentList');
function renderIncidents() {
  incidentList.innerHTML = incidents.map((item) => `<article class="incident" data-id="${item.id}"><span class="severity ${item.level}"></span><div><strong>${item.title}</strong><small>${item.id} · ${item.area}</small></div><time>${item.time}</time></article>`).join('');
  document.querySelector('#alertBadge').textContent = incidents.length;
  document.querySelector('#priorityCount').textContent = String(incidents.filter((item) => item.level === 'critical').length + 5).padStart(2, '0');
}
function renderTeams() {
  document.querySelector('#teamList').innerHTML = teams.map((team) => `<div class="team-row"><span class="team-avatar">${team.initials}</span><div><strong>${team.name}</strong><small>${team.detail}</small></div><span class="status ${team.state}">${team.label}</span></div>`).join('');
}
function renderShelters() {
  document.querySelector('#shelterList').innerHTML = shelters.map((shelter) => `<div class="shelter-row"><span class="shelter-marker" style="position:static">&#8962;</span><div><strong>${shelter.name}</strong><small>${shelter.detail}</small></div><span class="capacity ${shelter.risk ? 'warning' : ''}">${shelter.capacity}</span></div>`).join('');
}
function showIncident(id) {
  const item = incidents.find((incident) => incident.id === id);
  if (!item) return;
  document.querySelectorAll('.incident').forEach((node) => node.classList.remove('selected'));
  document.querySelector(`.incident[data-id="${id}"]`)?.classList.add('selected');
  alert(`${item.id}: ${item.title}\n${item.area}\nPriority: ${item.level.toUpperCase()}\n\nDispatcher workflow opened.`);
}
renderIncidents(); renderTeams(); renderShelters();

document.addEventListener('click', (event) => {
  const incident = event.target.closest('.incident, .incident-marker');
  if (incident) showIncident(incident.dataset.id || incident.dataset.incident);
  const view = event.target.closest('[data-view]');
  if (view) { document.querySelectorAll('.nav-link').forEach((node) => node.classList.remove('active')); document.querySelector(`.nav-link[data-view="${view.dataset.view}"]`)?.classList.add('active'); }
});
document.querySelectorAll('.map-control').forEach((control) => control.addEventListener('click', () => {
  document.querySelectorAll('.map-control').forEach((node) => node.classList.remove('active'));
  control.classList.add('active');
  const layer = control.dataset.layer;
  document.querySelectorAll('#map .incident-marker').forEach((node) => node.style.display = layer === 'all' || layer === 'incidents' ? '' : 'none');
  document.querySelectorAll('#map .team-marker').forEach((node) => node.style.display = layer === 'all' || layer === 'teams' ? '' : 'none');
  document.querySelectorAll('#map .shelter-marker').forEach((node) => node.style.display = layer === 'all' || layer === 'shelters' ? '' : 'none');
}));
document.querySelector('#incidentButton').addEventListener('click', () => document.querySelector('#incidentDialog').showModal());
document.querySelector('#submitIncident').addEventListener('click', (event) => {
  const location = document.querySelector('#incidentLocation');
  if (!location.value.trim()) { event.preventDefault(); location.focus(); return; }
  incidents.unshift({ id: `RS-${2060 + incidents.length}`, level: document.querySelector('#incidentPriority').value, title: document.querySelector('#incidentType').value, area: location.value.trim(), time: 'now' });
  renderIncidents(); document.querySelector('#openSos').textContent = Number(document.querySelector('#openSos').textContent) + 1;
});
document.querySelector('#viewAllButton').addEventListener('click', () => alert(`${incidents.length} active reports in the incident queue.`));
document.querySelector('#soundButton').addEventListener('click', (event) => { event.currentTarget.classList.toggle('muted'); event.currentTarget.innerHTML = event.currentTarget.classList.contains('muted') ? '&#9835;' : '&#9834;'; });
function tick() { document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date()); }
tick(); setInterval(tick, 1000);
