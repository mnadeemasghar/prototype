(function () {
  const TOP_NAV = {
    Leads: 'leads-list.html',
    Bookings: 'booking-list.html',
    // Finance/Admin default; Sales Manager/Agent → customer-list.html (role-aware in Phase 1+)
    Accounts: 'accounting-dashboard.html',
    Tools: 'whatsapp-inbox.html',
    Reports: 'reports-hub.html',
  };

  const NAV_MENUS = {
    Leads: [
      { label: 'Leads List', href: 'leads-list.html' },
      { label: 'Create Lead', href: 'leads-create.html' },
      { label: 'Pipeline', href: 'pipeline.html' },
    ],
    Bookings: [
      { label: 'Booking List', href: 'booking-list.html' },
      { label: 'New Booking', href: 'booking-create.html' },
    ],
    // Role-filtered visibility (Phase 1+): Receivables/Analysis hidden for Travel Agent;
    // Payables visible to Sales Manager + Finance; Customers visible to all except Finance (read).
    Accounts: [
      { label: 'Customers', href: 'customer-list.html', roles: 'all' },
      { type: 'separator', label: 'Receivables' },
      { label: 'Finance Dashboard', href: 'accounting-dashboard.html', roles: 'finance' },
      { label: 'Payment Queue', href: 'payment-tracking.html', roles: 'finance' },
      { label: 'Invoices', href: 'invoice-list.html', roles: 'finance' },
      { label: 'Revenue Adjustments', href: 'revenue-recording.html', roles: 'finance' },
      { type: 'separator', label: 'Payables' },
      { label: 'Expenses', href: 'expense-list.html', roles: 'payables' },
      { label: 'Log Expense', href: 'log-expense.html', roles: 'payables' },
      { label: 'Expense Approvals', href: 'expense-approvals.html', roles: 'payables', badge: 5 },
      { label: 'Cost Centres', href: 'cost-centres.html', roles: 'payables' },
      { type: 'separator', label: 'Analysis' },
      { label: 'Financial Reports', href: 'financial-reports.html', roles: 'finance' },
    ],
    // Role-filtered visibility (Phase 1+): admin items hidden for Travel Agent;
    // Automation & Settings read-only for Sales Manager.
    Tools: [
      { label: 'WhatsApp Inbox', href: 'whatsapp-inbox.html', roles: 'all' },
      { type: 'separator', label: 'Administration' },
      { label: 'User Management', href: 'user-management.html', roles: 'admin' },
      { label: 'Roles & Permissions', href: 'roles-permissions.html', roles: 'admin' },
      { label: 'Multi-Branch', href: 'multi-branch.html', roles: 'admin' },
      { type: 'separator', label: 'Communications' },
      { label: 'Notifications', href: 'notifications-center.html', roles: 'all' },
      { label: 'Communication Templates', href: 'communication-templates.html', roles: 'admin' },
      { label: 'Channel Settings', href: 'channel-settings.html', roles: 'admin' },
      { type: 'separator', label: 'Automation' },
      { label: 'Automation Rules', href: 'automation-rules.html', roles: 'automation' },
      { label: 'Workflow Triggers', href: 'workflow-triggers.html', roles: 'automation' },
      { label: 'System Settings', href: 'system-settings.html', roles: 'automation' },
    ],
    // Role-filtered visibility (Phase 1+): Report Builder read-only for Travel Agent;
    // Attendance & HR hidden for Agent/Finance; Consolidated View Admin/Sales Manager only.
    Reports: [
      { label: 'Reports Hub', href: 'reports-hub.html' },
      { label: 'Report Builder', href: 'report-builder.html' },
      { type: 'separator', label: 'Performance' },
      { label: 'Staff Performance', href: 'staff-performance.html', roles: 'performance' },
      { label: 'Attendance & HR', href: 'attendance-hr.html', roles: 'hr' },
      { type: 'separator', label: 'Management' },
      { label: 'Consolidated View', href: 'consolidated-view.html', roles: 'management' },
    ],
  };

  const PAGE_TOP_NAV = {
    'dashboard.html': null,
    'leads-list.html': 'Leads',
    'leads-create.html': 'Leads',
    'lead-detail.html': 'Leads',
    'pipeline.html': 'Leads',
    'booking-list.html': 'Bookings',
    'booking-create.html': 'Bookings',
    'booking-detail.html': 'Bookings',
    'customer-list.html': 'Accounts',
    'customer-profile.html': 'Accounts',
    'accounting-dashboard.html': 'Accounts',
    'revenue-recording.html': 'Accounts',
    'payment-tracking.html': 'Accounts',
    'invoice-list.html': 'Accounts',
    'expense-list.html': 'Accounts',
    'log-expense.html': 'Accounts',
    'expense-approvals.html': 'Accounts',
    'cost-centres.html': 'Accounts',
    'financial-reports.html': 'Accounts',
    'whatsapp-inbox.html': 'Tools',
    'user-management.html': 'Tools',
    'roles-permissions.html': 'Tools',
    'system-settings.html': 'Tools',
    'channel-settings.html': 'Tools',
    'multi-branch.html': 'Tools',
    'automation-rules.html': 'Tools',
    'workflow-triggers.html': 'Tools',
    'notifications-center.html': 'Tools',
    'communication-templates.html': 'Tools',
    'staff-performance.html': 'Reports',
    'attendance-hr.html': 'Reports',
    'consolidated-view.html': 'Reports',
    'reports-hub.html': 'Reports',
    'report-builder.html': 'Reports',
  };

  const file = location.pathname.split('/').pop() || 'index.html';
  const fileBase = file.split('?')[0];
  const activeTopNav = PAGE_TOP_NAV[fileBase];
  let openDropdown = null;

  function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function getSubmenuLinks(submenu) {
    return Array.from(submenu.querySelectorAll('a[href]'));
  }

  function closeDropdown(dropdown, returnFocus) {
    if (!dropdown) return;
    var trigger = dropdown.querySelector('.top-nav-trigger');
    var submenu = dropdown.querySelector('.top-nav-submenu');
    if (!trigger || !submenu) return;
    trigger.setAttribute('aria-expanded', 'false');
    submenu.hidden = true;
    dropdown.classList.remove('is-open');
    if (openDropdown === dropdown) openDropdown = null;
    if (returnFocus) trigger.focus();
  }

  function closeAllDropdowns(returnFocusFrom) {
    document.querySelectorAll('.top-nav-item.is-open').forEach(function (item) {
      if (returnFocusFrom && item.contains(returnFocusFrom)) return;
      closeDropdown(item, false);
    });
  }

  function openDropdownMenu(dropdown, focusFirst) {
    closeAllDropdowns();
    var trigger = dropdown.querySelector('.top-nav-trigger');
    var submenu = dropdown.querySelector('.top-nav-submenu');
    if (!trigger || !submenu) return;
    trigger.setAttribute('aria-expanded', 'true');
    submenu.hidden = false;
    dropdown.classList.add('is-open');
    openDropdown = dropdown;
    if (focusFirst) {
      var links = getSubmenuLinks(submenu);
      if (links.length) links[0].focus();
    }
  }

  function toggleDropdown(dropdown, focusFirst) {
    var isOpen = dropdown.classList.contains('is-open');
    if (isOpen) closeDropdown(dropdown, false);
    else openDropdownMenu(dropdown, focusFirst);
  }

  function focusSiblingLink(currentLink, direction) {
    var submenu = currentLink.closest('.top-nav-submenu');
    if (!submenu) return;
    var links = getSubmenuLinks(submenu);
    var index = links.indexOf(currentLink);
    if (index === -1) return;
    var nextIndex = (index + direction + links.length) % links.length;
    links[nextIndex].focus();
  }

  function bindDropdownEvents(dropdown) {
    var trigger = dropdown.querySelector('.top-nav-trigger');
    var submenu = dropdown.querySelector('.top-nav-submenu');
    if (!trigger || !submenu) return;

    trigger.addEventListener('click', function () {
      toggleDropdown(dropdown, false);
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdownMenu(dropdown, true);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        openDropdownMenu(dropdown, false);
        var links = getSubmenuLinks(submenu);
        if (links.length) links[links.length - 1].focus();
      } else if (e.key === 'Escape') {
        closeDropdown(dropdown, true);
      }
    });

    submenu.addEventListener('keydown', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusSiblingLink(link, 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusSiblingLink(link, -1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown(dropdown, true);
      } else if (e.key === 'Tab') {
        closeDropdown(dropdown, false);
      }
    });

    dropdown.addEventListener('mouseenter', function () {
      openDropdownMenu(dropdown, false);
    });

    dropdown.addEventListener('mouseleave', function () {
      closeDropdown(dropdown, false);
    });
  }

  function initTopNavDropdowns() {
    document.querySelectorAll('.top-nav-menu').forEach(function (menu) {
      if (menu.closest('.demo-frame') || menu.querySelector('.top-nav-list')) return;

      var links = Array.from(menu.querySelectorAll(':scope > .top-nav-link'));
      if (!links.length) return;

      var list = document.createElement('ul');
      list.className = 'top-nav-list';

      links.forEach(function (link) {
        var navKey = link.getAttribute('data-nav');
        var submenuItems = NAV_MENUS[navKey] || [];
        var li = document.createElement('li');
        li.className = 'top-nav-item';

        if (submenuItems.length > 0) {
          var menuId = 'nav-menu-' + slugify(navKey);
          var isSectionActive = navKey === activeTopNav;

          var trigger = document.createElement('button');
          trigger.type = 'button';
          trigger.className = 'top-nav-trigger';
          if (isSectionActive) trigger.classList.add('active');
          trigger.setAttribute('aria-haspopup', 'true');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.setAttribute('aria-controls', menuId);
          trigger.id = menuId + '-trigger';

          var label = document.createElement('span');
          label.textContent = navKey;
          trigger.appendChild(label);

          var caret = document.createElement('span');
          caret.className = 'nav-caret';
          caret.setAttribute('aria-hidden', 'true');
          caret.textContent = '▾';
          trigger.appendChild(caret);

          var submenu = document.createElement('ul');
          submenu.id = menuId;
          submenu.className = 'top-nav-submenu';
          submenu.setAttribute('aria-labelledby', trigger.id);
          submenu.hidden = true;

          submenuItems.forEach(function (item) {
            var subLi = document.createElement('li');
            if (item.type === 'separator') {
              subLi.className = 'top-nav-submenu-sep';
              subLi.setAttribute('role', 'separator');
              subLi.setAttribute('aria-hidden', 'true');
              var sepLabel = document.createElement('span');
              sepLabel.className = 'top-nav-submenu-sep-label';
              sepLabel.textContent = item.label;
              subLi.appendChild(sepLabel);
            } else {
              var a = document.createElement('a');
              a.href = item.href;
              var linkLabel = document.createElement('span');
              linkLabel.className = 'top-nav-submenu-link-label';
              linkLabel.textContent = item.label;
              a.appendChild(linkLabel);
              if (item.badge != null) {
                var badge = document.createElement('span');
                badge.className = 'nav-menu-badge';
                badge.textContent = String(item.badge);
                a.appendChild(badge);
              }
              if (fileBase === item.href.split('?')[0]) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
              }
              subLi.appendChild(a);
            }
            submenu.appendChild(subLi);
          });

          li.appendChild(trigger);
          li.appendChild(submenu);
          bindDropdownEvents(li);
        } else {
          var plainLink = document.createElement('a');
          plainLink.className = 'top-nav-link';
          plainLink.href = TOP_NAV[navKey] || link.getAttribute('href') || '#';
          plainLink.setAttribute('data-nav', navKey);
          plainLink.textContent = navKey;
          if (navKey === activeTopNav) {
            plainLink.classList.add('active');
            plainLink.setAttribute('aria-current', 'page');
          }
          li.appendChild(plainLink);
        }

        list.appendChild(li);
      });

      menu.innerHTML = '';
      menu.appendChild(list);
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.top-nav-item')) closeAllDropdowns();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openDropdown) closeDropdown(openDropdown, true);
    });
  }

  function initMobileNav() {
    document.querySelectorAll('.top-nav').forEach(function (nav) {
      if (nav.closest('.demo-frame')) return;
      if (nav.querySelector('.top-nav-menu-toggle')) return;

      var menu = nav.querySelector('.top-nav-menu');
      if (!menu) return;

      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'top-nav-menu-toggle';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', menu.id || 'main-nav-menu');
      if (!menu.id) menu.id = 'main-nav-menu';
      toggle.textContent = '☰';

      function setMenuOpen(open) {
        nav.classList.toggle('is-menu-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        toggle.textContent = open ? '✕' : '☰';
        if (!open) closeAllDropdowns();
      }

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenuOpen(!nav.classList.contains('is-menu-open'));
      });

      nav.insertBefore(toggle, menu);

      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('is-menu-open')) return;
        if (!nav.contains(e.target)) setMenuOpen(false);
      });

      menu.querySelectorAll('a[href]').forEach(function (link) {
        link.addEventListener('click', function () { setMenuOpen(false); });
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 992) setMenuOpen(false);
      });
    });
  }

  initTopNavDropdowns();
  initMobileNav();

  document.querySelectorAll('.top-nav-notify').forEach(function (btn) {
    btn.addEventListener('click', function () {
      location.href = 'notifications-center.html';
    });
  });

  document.querySelectorAll('.top-nav-brand').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (el.getAttribute('href')) return;
      e.preventDefault();
      location.href = 'dashboard.html';
    });
  });

  document.querySelectorAll('[data-href]').forEach(function (el) {
    el.addEventListener('click', function () {
      location.href = el.getAttribute('data-href');
    });
  });

  document.querySelectorAll('.login-card .btn-primary').forEach(function (btn) {
    if (btn.tagName === 'BUTTON') {
      btn.addEventListener('click', function () {
        location.href = 'dashboard.html';
      });
    }
  });

  document.querySelectorAll('.topbar-actions .btn').forEach(function (btn) {
    const text = btn.textContent.trim();
    if (text.includes('New Lead') || text.includes('Add Lead')) {
      btn.addEventListener('click', function () { location.href = 'leads-create.html'; });
    }
    if (text.includes('New Booking') || text.includes('Add Booking')) {
      btn.addEventListener('click', function () { location.href = 'booking-create.html'; });
    }
    if (text.includes('Send WhatsApp')) {
      btn.addEventListener('click', function () { location.href = 'whatsapp-inbox.html'; });
    }
    if (text.includes('Convert to Customer')) {
      btn.addEventListener('click', function () { location.href = 'customer-profile.html'; });
    }
    if (text.includes('Create Booking')) {
      btn.addEventListener('click', function () { location.href = 'booking-create.html'; });
    }
    if (text.includes('Create Quotation')) {
      btn.addEventListener('click', function () { location.href = 'quotation-create.html'; });
    }
  });

  document.querySelectorAll('.action-stack .btn').forEach(function (btn) {
    const text = btn.textContent.trim();
    if (text.includes('Create Booking')) {
      btn.addEventListener('click', function () { location.href = 'booking-create.html'; });
    }
  });

  document.querySelectorAll('table tbody tr[data-href]').forEach(function (row) {
    row.addEventListener('click', function (e) {
      if (e.target.closest('button, a, input')) return;
      location.href = row.getAttribute('data-href');
    });
  });

  document.querySelectorAll('.lead-card[data-href]').forEach(function (card) {
    card.addEventListener('click', function () {
      location.href = card.getAttribute('data-href');
    });
  });

  document.querySelectorAll('.perm-select').forEach(function (sel) {
    function syncClass() {
      sel.classList.remove('perm-full', 'perm-read', 'perm-none');
      var v = sel.value.toLowerCase();
      if (v === 'full') sel.classList.add('perm-full');
      else if (v === 'read') sel.classList.add('perm-read');
      else sel.classList.add('perm-none');
    }
    sel.addEventListener('change', syncClass);
    syncClass();
  });
})();
