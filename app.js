(() => {
  const data = window.PROFILE_DATA;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const external = (url, label, cls = '') => url ? `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>` : '';
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  $('#person-name').textContent = data.person.name;
  $('#person-role').textContent = `${data.person.role} · ${data.person.team}`;
  $('#person-tagline').textContent = data.person.tagline;
  $('#snapshot').textContent = `Instantané éditorial établi le ${data.snapshotDate}.`;
  $('#main-source-link').href = data.sourcePage;
  $('#main-source-link').target = '_blank';
  $('#main-source-link').rel = 'noopener noreferrer';
  $('#footer-source').href = data.sourcePage;
  $('#footer-source').target = '_blank';
  $('#footer-source').rel = 'noopener noreferrer';
  $('#method-note').textContent = data.methodNote;
  $('#privacy-note').textContent = data.privacyNote;

  const sourceLink = data.links.find(link => link.label.includes('Page source'));
  const scholarLink = data.links.find(link => link.label.includes('Scholar'));
  $('#hero-actions').innerHTML = [
    external(sourceLink.url, 'Voir la source', 'button-link'),
    external(scholarLink.url, 'Google Scholar', 'button-link secondary')
  ].join('');

  const stats = [
    [data.preprints.length, 'prépublications'],
    [data.publications.length, 'articles'],
    [data.proceedings.length, 'actes'],
    [data.degrees.length, 'diplômes de recherche'],
    [data.projects.current.length + data.projects.past.length, 'projets référencés']
  ];
  $('#stats-grid').innerHTML = stats.map(([value, label]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join('');

  $('#contact-content').innerHTML = `
    <p><strong>${escapeHtml(data.person.role)}</strong><br>${escapeHtml(data.person.team)}</p>
    <address class="address">${data.person.address.map(escapeHtml).join('<br>')}</address>
    <div class="meta-list">
      <div class="meta-row"><strong>Téléphone</strong><span>${escapeHtml(data.person.phone)}</span></div>
      <div class="meta-row"><strong>Fax</strong><span>${escapeHtml(data.person.fax)}</span></div>
      <div class="meta-row"><strong>E-mail</strong><span>${escapeHtml(data.person.emailDisplay)}</span></div>
    </div>`;

  $('#award-content').innerHTML = `<p class="eyebrow">${data.award.year}</p><h3>${escapeHtml(data.award.title)}</h3><p>${escapeHtml(data.award.issuer)}</p>${external(data.award.source, 'Source CNRS Mathématiques', 'text-link')}`;
  $('#leadership-content').innerHTML = `<p><strong>${escapeHtml(data.scienceLeadership.role)}</strong></p><p>${escapeHtml(data.scienceLeadership.with)}</p>${external(data.scienceLeadership.url, 'Consulter le groupe EMS', 'text-link')}`;

  $('#themes-grid').innerHTML = data.researchThemes.map((theme, index) => `
    <article class="theme-card"><span>${String(index + 1).padStart(2, '0')}</span><h3>${escapeHtml(theme.title)}</h3><p>${escapeHtml(theme.text)}</p></article>`).join('');

  $('#degrees-timeline').innerHTML = data.degrees.map((degree, index) => `
    <article class="timeline-item">
      <div class="timeline-dot">${index + 1}</div>
      <div class="timeline-card">
        <span class="date">${escapeHtml(degree.date)}</span>
        <h3>${escapeHtml(degree.kind)} — ${escapeHtml(degree.title)}</h3>
        <p><strong>${escapeHtml(degree.institution)}</strong> · ${escapeHtml(degree.supervisors)}</p>
        <p>${escapeHtml(degree.summary)}</p>
        <div class="inline-links">${degree.links.map(link => external(link.url, escapeHtml(link.label))).join('')}</div>
      </div>
    </article>`).join('');

  $('#editorial-list').innerHTML = data.editorial.map(item => `<li>${external(item.url, escapeHtml(item.name))}</li>`).join('');
  $('#institution-links').innerHTML = data.links.map(item => `<li>${external(item.url, escapeHtml(item.label))}</li>`).join('');

  const renderProjectCards = projects => projects.map(project => `
    <article class="project-card">
      <div class="project-card-header"><h4>${escapeHtml(project.name)}</h4><span class="project-period">${escapeHtml(project.period)}</span></div>
      <p class="project-role">${escapeHtml(project.role)}</p>
      <p>${escapeHtml(project.summary)}</p>
      ${project.url ? external(project.url, 'Page du projet') : ''}
    </article>`).join('');
  $('#current-projects').innerHTML = renderProjectCards(data.projects.current);
  $('#past-projects').innerHTML = renderProjectCards(data.projects.past);

  const renderChips = items => `<div class="member-chips">${items.map(item => `<span class="member-chip">${escapeHtml(item)}</span>`).join('')}</div>`;
  $('#career-history').innerHTML = data.careerHistory.map(item => `
    <div class="career-item"><strong>${escapeHtml(item.period)}</strong><div><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.detail)}</p></div></div>`).join('');
  $('#skills-snapshot').innerHTML = `<h4>${escapeHtml(data.skillsSnapshot.label)}</h4><p>${escapeHtml(data.skillsSnapshot.note)}</p><div class="skills-columns"><div><strong>Langues</strong>${renderChips(data.skillsSnapshot.languages)}</div><div><strong>Logiciels et langages</strong>${renderChips(data.skillsSnapshot.software)}</div></div>`;
  $('#highleap-card').innerHTML = `
    <p class="project-kicker">ERC Starting Grant · ${escapeHtml(data.highleap.period)}</p>
    <h3>${escapeHtml(data.highleap.title)}</h3>
    <p>${escapeHtml(data.highleap.description)}</p>
    <h4>Équipe</h4>${renderChips(data.highleap.members)}
    <h4>Défis</h4><ul>${data.highleap.challenges.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <h4>Applications citées</h4>${renderChips(data.highleap.applications)}
    <details class="project-resources"><summary>Publications rattachées par la page HighLEAP (${data.highleap.publications.length})</summary><ul>${data.highleap.publications.map(item => `<li>${item.year} — ${external(item.url, escapeHtml(item.title))}</li>`).join('')}</ul></details>
    <p>${external(data.highleap.source, 'Ouvrir la page HighLEAP')}</p>`;
  $('#comodo-card').innerHTML = `
    <p class="project-kicker">ANR JCJC · ${escapeHtml(data.comodo.period)}</p>
    <h3>${escapeHtml(data.comodo.title)}</h3>
    <p>${escapeHtml(data.comodo.description)}</p>
    <h4>Membres</h4>${renderChips(data.comodo.members)}
    <h4>Étudiants et postdoctorants</h4>${renderChips(data.comodo.students)}
    <h4>Quatre tâches</h4><ul>${data.comodo.tasks.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <details class="project-resources"><summary>Vidéos de simulation (${data.comodo.videos.length})</summary><ul>${data.comodo.videos.map((url,index) => `<li>${external(url, `Simulation 2D — espèce ${index + 1}`)}</li>`).join('')}</ul></details>
    <details class="project-resources"><summary>Publications et prépublications rattachées (${data.comodo.publications.length})</summary><ul>${data.comodo.publications.map(item => `<li><strong>${escapeHtml(item.category)}</strong> · ${item.year} — ${item.url ? external(item.url, escapeHtml(item.title)) : escapeHtml(item.title)}</li>`).join('')}</ul></details>
    <p>${external(data.comodo.source, 'Ouvrir la page COMODO')}</p>`;

  const bibliography = [
    ...data.preprints.map(item => ({...item, type: 'preprint', typeLabel: 'Prépublication'})),
    ...data.publications.map(item => ({...item, type: 'publication', typeLabel: 'Article'})),
    ...data.proceedings.map(item => ({...item, type: 'proceeding', typeLabel: 'Actes'}))
  ].sort((a, b) => b.year - a.year || Number(b.number) - Number(a.number));

  const years = [...new Set(bibliography.map(item => item.year))].sort((a,b) => b-a);
  $('#year-filter').insertAdjacentHTML('beforeend', years.map(year => `<option value="${year}">${year}</option>`).join(''));

  const searchInput = $('#search-input');
  const typeFilter = $('#type-filter');
  const yearFilter = $('#year-filter');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  function renderBibliography() {
    const query = normalize(searchInput.value.trim());
    const type = typeFilter.value;
    const year = yearFilter.value;
    const filtered = bibliography.filter(item => {
      const haystack = normalize([item.authors, item.title, item.venue, item.typeLabel, ...(item.topics || [])].join(' '));
      return (!query || haystack.includes(query)) && (type === 'all' || item.type === type) && (year === 'all' || String(item.year) === year);
    });
    $('#results-summary').textContent = `${filtered.length} résultat${filtered.length > 1 ? 's' : ''} sur ${bibliography.length}`;
    $('#publication-list').innerHTML = filtered.length ? filtered.map(item => `
      <article class="publication-item">
        <div class="publication-number">${item.type === 'publication' ? `#${item.number}` : escapeHtml(item.number)}</div>
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="publication-authors">${escapeHtml(item.authors)}</p>
          <p class="publication-venue">${escapeHtml(item.typeLabel)} · ${escapeHtml(item.venue)}</p>
          <div class="publication-tags">${(item.topics || []).map(topic => `<span class="publication-tag">${escapeHtml(topic)}</span>`).join('')}</div>
          ${item.url ? external(item.url, 'Accéder à la ressource', 'publication-link') : '<span class="publication-link">Lien non fourni par la page source</span>'}
        </div>
        <div class="publication-year">${item.year}</div>
      </article>`).join('') : `<div class="no-results">Aucun résultat ne correspond aux filtres.</div>`;
  }
  [searchInput, typeFilter, yearFilter].forEach(control => control.addEventListener('input', renderBibliography));
  $('#reset-filters').addEventListener('click', () => { searchInput.value = ''; typeFilter.value = 'all'; yearFilter.value = 'all'; renderBibliography(); });
  renderBibliography();

  const graph = $('#relationship-graph');
  const NS = 'http://www.w3.org/2000/svg';
  const nodes = [
    {id:'root', label:'Virginie\nEhrlacher', type:'root', x:800, y:470, r:72},
    {id:'cermics', label:'CERMICS', type:'institution', x:330, y:170, r:42},
    {id:'enpc', label:'École des Ponts', type:'institution', x:160, y:340, r:48},
    {id:'matherials', label:'Inria MATHERIALS', type:'institution', x:300, y:680, r:50},
    {id:'ems', label:'EMS TAG SciML', type:'institution', x:500, y:850, r:44},
    {id:'phd', label:'Doctorat\n2012', type:'output', x:540, y:170, r:42},
    {id:'hdr', label:'HDR\n2020', type:'output', x:1020, y:165, r:42},
    {id:'award', label:'Prix Irène\nJoliot-Curie', type:'output', x:1270, y:260, r:48},
    {id:'highleap', label:'HighLEAP\n2023–2028', type:'project', x:1320, y:500, r:52},
    {id:'emc2', label:'EMC2', type:'project', x:1260, y:720, r:38},
    {id:'comodo', label:'COMODO\n2019–2023', type:'project', x:1040, y:835, r:50},
    {id:'adapt', label:'ADAPT', type:'project', x:780, y:880, r:36},
    {id:'msmath', label:'MsMath', type:'project', x:580, y:760, r:38},
    {id:'hd', label:'Grande\ndimension', type:'theme', x:555, y:330, r:48},
    {id:'rom', label:'Réduction de\nmodèles', type:'theme', x:680, y:235, r:48},
    {id:'materials', label:'Sciences des\nmatériaux', type:'theme', x:920, y:245, r:50},
    {id:'cross', label:'Diffusion\ncroisée', type:'theme', x:1040, y:360, r:46},
    {id:'ot', label:'Transport\noptimal', type:'theme', x:1050, y:590, r:46},
    {id:'multi', label:'Multi-échelle', type:'theme', x:920, y:720, r:44},
    {id:'preprints', label:`${data.preprints.length}\nprépublications`, type:'output', x:545, y:520, r:45},
    {id:'articles', label:`${data.publications.length}\narticles`, type:'output', x:650, y:650, r:50},
    {id:'proceedings', label:`${data.proceedings.length}\nactes`, type:'output', x:805, y:720, r:42},
    {id:'journals', label:'4 revues\néditées', type:'output', x:1125, y:470, r:44}
  ];
  const edges = [
    ['root','cermics'],['root','enpc'],['root','matherials'],['root','ems'],
    ['root','phd'],['root','hdr'],['root','award'],
    ['root','highleap'],['root','emc2'],['root','comodo'],['root','adapt'],['root','msmath'],
    ['root','hd'],['root','rom'],['root','materials'],['root','cross'],['root','ot'],['root','multi'],
    ['root','preprints'],['root','articles'],['root','proceedings'],['root','journals'],
    ['highleap','hd'],['highleap','ot'],['highleap','rom'],['comodo','cross'],['comodo','rom'],['comodo','materials'],
    ['phd','materials'],['phd','hd'],['hdr','hd'],['hdr','rom'],['hdr','multi'],['hdr','cross'],
    ['articles','journals'],['preprints','articles'],['proceedings','articles'],['cermics','enpc'],['matherials','cermics']
  ];
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  edges.forEach(([a,b]) => {
    const n1 = nodeMap.get(a), n2 = nodeMap.get(b);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', n1.x); line.setAttribute('y1', n1.y); line.setAttribute('x2', n2.x); line.setAttribute('y2', n2.y);
    line.setAttribute('class', 'graph-edge'); line.dataset.types = `${n1.type} ${n2.type}`;
    graph.appendChild(line);
  });
  nodes.forEach(node => {
    const group = document.createElementNS(NS, 'g');
    group.setAttribute('class', `graph-node ${node.type}`); group.dataset.type = node.type; group.setAttribute('transform', `translate(${node.x} ${node.y})`);
    const circle = document.createElementNS(NS, 'circle'); circle.setAttribute('r', node.r); group.appendChild(circle);
    const lines = node.label.split('\n');
    const text = document.createElementNS(NS, 'text'); text.setAttribute('text-anchor', 'middle'); text.setAttribute('dominant-baseline', 'middle');
    lines.forEach((lineText, index) => { const tspan = document.createElementNS(NS, 'tspan'); tspan.setAttribute('x', '0'); tspan.setAttribute('dy', index === 0 ? `${-(lines.length-1)*7}` : '16'); tspan.textContent = lineText; text.appendChild(tspan); });
    group.appendChild(text); graph.appendChild(group);
  });
  $$('.graph-filter').forEach(button => button.addEventListener('click', () => {
    $$('.graph-filter').forEach(b => b.classList.remove('active')); button.classList.add('active');
    const filter = button.dataset.graphFilter;
    $$('.graph-node', graph).forEach(node => node.classList.toggle('is-hidden', filter !== 'all' && node.dataset.type !== filter && node.dataset.type !== 'root'));
    $$('.graph-edge', graph).forEach(edge => edge.classList.toggle('is-hidden', filter !== 'all' && !edge.dataset.types.includes(filter)));
  }));

  const tree = [
    {label:'Institutions et réseaux', children:[
      {label:'CERMICS', url:'https://cermics-lab.enpc.fr/'}, {label:'École des Ponts', url:'https://ecoledesponts.fr/'},
      {label:'Inria MATHERIALS', url:'https://team.inria.fr/matherials/'}, {label:'EMS TAG Scientific Machine Learning', url:data.scienceLeadership.url}
    ]},
    {label:'Diplômes', children:data.degrees.map(d => ({label:`${d.kind} — ${d.date}`, children:d.links.map(l => ({label:l.label, url:l.url}))}))},
    {label:'Projets', children:[...data.projects.current, ...data.projects.past].map(p => ({label:`${p.name} — ${p.period}`, url:p.url || undefined}))},
    {label:'Activités éditoriales', children:data.editorial.map(j => ({label:j.name, url:j.url}))},
    {label:'Thèmes de recherche', children:data.researchThemes.map(t => ({label:t.title, text:t.text}))},
    {label:'Productions scientifiques', children:[
      {label:`Prépublications (${data.preprints.length})`, children:data.preprints.map(p => ({label:`${p.year} — ${p.title}`, url:p.url}))},
      {label:`Articles (${data.publications.length})`, children:data.publications.map(p => ({label:`${p.year} — ${p.title}`, url:p.url}))},
      {label:`Actes (${data.proceedings.length})`, children:data.proceedings.map(p => ({label:`${p.year} — ${p.title}`, url:p.url || undefined}))}
    ]}
  ];
  function treeHtml(items, depth = 0) {
    return items.map(item => item.children ? `<details ${depth < 1 ? 'open' : ''}><summary>${escapeHtml(item.label)}</summary>${treeHtml(item.children, depth + 1)}</details>` : `<div class="tree-leaf">${item.url ? external(item.url, escapeHtml(item.label)) : escapeHtml(item.label)}${item.text ? ` — ${escapeHtml(item.text)}` : ''}</div>`).join('');
  }
  $('#relation-tree').innerHTML = treeHtml(tree);

  const menuButton = $('.menu-button');
  const navLinks = $('#nav-links');
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  $$('#nav-links a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }));
})();
