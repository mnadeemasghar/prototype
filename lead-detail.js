(function () {
  var LEAD_ID = 'LD-1042';
  var STORAGE_KEY = 'leadStatus_' + LEAD_ID;

  var STAGES = ['New', 'Contacted', 'Quoted', 'Negotiation', 'Booked', 'Lost'];

  var BADGE_CLASS = {
    New: 'badge-new',
    Contacted: 'badge-contacted',
    Quoted: 'badge-quoted',
    Negotiation: 'badge-negotiation',
    Booked: 'badge-booked',
    Lost: 'badge-lost',
  };

  var TRANSITIONS = {
    New: [
      { to: 'Contacted', label: 'Mark as Contacted' },
      { to: 'Lost', label: 'Mark as Lost', tone: 'danger' },
    ],
    Contacted: [
      { to: 'Quoted', label: 'Mark as Quoted' },
      { to: 'Lost', label: 'Mark as Lost', tone: 'danger' },
    ],
    Quoted: [
      { to: 'Negotiation', label: 'Start Negotiation' },
      { to: 'Booked', label: 'Mark as Booked', tone: 'primary' },
    ],
    Negotiation: [
      { to: 'Quoted', label: 'Send Revised Quote' },
      { to: 'Booked', label: 'Mark as Booked', tone: 'primary' },
      { to: 'Lost', label: 'Mark as Lost', tone: 'danger' },
    ],
    Booked: [],
    Lost: [],
  };

  var TIMELINE_COPY = {
    Contacted: 'Status changed to Contacted',
    Quoted: 'Status changed to Quoted',
    Negotiation: 'Status changed to Negotiation',
    Booked: 'Status changed to Booked — ready for customer conversion and booking',
    Lost: 'Status changed to Lost',
  };

  var badge = document.getElementById('lead-status-badge');
  var timeline = document.getElementById('lead-timeline');
  var stagesEl = document.getElementById('lead-pipeline-stages');
  var actionsEl = document.getElementById('lead-quick-actions');
  var bookedActionsEl = document.getElementById('lead-booked-actions');
  var lostNoteEl = document.getElementById('lead-lost-note');

  if (!badge || !actionsEl) return;

  function readStatus() {
    if (sessionStorage.getItem('leadQuoted') === LEAD_ID) {
      sessionStorage.removeItem('leadQuoted');
      sessionStorage.setItem(STORAGE_KEY, 'Quoted');
      prependTimeline('Quotation sent via WhatsApp', 'Sara Al-Mansoori · AED 18,500 · Valid until 14-Jun-2026');
    }
    return sessionStorage.getItem(STORAGE_KEY) || 'New';
  }

  function writeStatus(status) {
    sessionStorage.setItem(STORAGE_KEY, status);
  }

  function prependTimeline(title, meta) {
    if (!timeline) return;
    var item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML =
      '<div class="timeline-dot"></div><div><strong>' +
      title +
      '</strong><p class="timeline-meta">' +
      meta +
      '</p></div>';
    timeline.insertBefore(item, timeline.firstChild);
  }

  function nowMeta() {
    return 'Sara Al-Mansoori · just now';
  }

  function setStatus(status, options) {
    options = options || {};
    writeStatus(status);
    badge.textContent = status;
    badge.className = 'badge ' + (BADGE_CLASS[status] || 'badge-pending');
    if (!options.silent && TIMELINE_COPY[status]) {
      prependTimeline(TIMELINE_COPY[status], nowMeta());
    }
    render();
  }

  function buttonClass(transition) {
    if (transition.tone === 'primary') return 'btn btn-primary btn-sm';
    if (transition.tone === 'danger') return 'btn btn-danger btn-sm';
    return 'btn btn-secondary btn-sm';
  }

  function renderStages(current) {
    if (!stagesEl) return;
    stagesEl.innerHTML = STAGES.map(function (stage) {
      var classes = ['lead-status-step'];
      if (stage === current) classes.push('is-current');
      if (stage === 'Lost' && current === 'Lost') classes.push('is-lost');
      if (stage === 'Booked' && current === 'Booked') classes.push('is-won');
      return (
        '<span class="' +
        classes.join(' ') +
        '" data-stage="' +
        stage +
        '"><span class="lead-status-step-dot"></span>' +
        stage +
        '</span>'
      );
    }).join('');
  }

  function renderActions(current) {
    var transitions = TRANSITIONS[current] || [];

    actionsEl.innerHTML = transitions
      .map(function (transition) {
        return (
          '<button type="button" class="' +
          buttonClass(transition) +
          '" data-status="' +
          transition.to +
          '">' +
          transition.label +
          '</button>'
        );
      })
      .join('');

    actionsEl.querySelectorAll('[data-status]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setStatus(btn.getAttribute('data-status'));
      });
    });

    if (bookedActionsEl) {
      bookedActionsEl.hidden = current !== 'Booked';
    }
    if (lostNoteEl) {
      lostNoteEl.hidden = current !== 'Lost';
    }
  }

  function render() {
    var current = readStatus();
    badge.textContent = current;
    badge.className = 'badge ' + (BADGE_CLASS[current] || 'badge-pending');
    renderStages(current);
    renderActions(current);
  }

  render();
})();

(function () {
  var noteInput = document.getElementById('lead-note-input');
  var noteFeed = document.getElementById('lead-notes-feed');
  var saveBtn = document.getElementById('save-note-btn');
  var focusBtn = document.getElementById('focus-note-btn');
  var timeline = document.getElementById('lead-timeline');

  if (!noteInput || !noteFeed || !saveBtn) return;

  function prependTimeline(title, meta) {
    if (!timeline) return;
    var item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML =
      '<div class="timeline-dot"></div><div><strong>' +
      title +
      '</strong><p class="timeline-meta">' +
      meta +
      '</p></div>';
    timeline.insertBefore(item, timeline.firstChild);
  }

  function saveNote() {
    var text = noteInput.value.trim();
    if (!text) {
      noteInput.focus();
      return;
    }

    var article = document.createElement('article');
    article.className = 'lead-note-item';
    article.innerHTML =
      '<div class="lead-note-meta">Sara Al-Mansoori · just now</div><p></p>';
    article.querySelector('p').textContent = text;
    noteFeed.insertBefore(article, noteFeed.firstChild);

    prependTimeline('Internal note added', 'Sara Al-Mansoori · just now');
    noteInput.value = '';
    noteInput.focus();
  }

  saveBtn.addEventListener('click', saveNote);
  noteInput.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') saveNote();
  });

  if (focusBtn) {
    focusBtn.addEventListener('click', function () {
      noteInput.focus();
      noteInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
