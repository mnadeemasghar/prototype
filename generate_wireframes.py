#!/usr/bin/env python3
"""Generate wireframe HTML screens for Alsultania CRM blueprint."""

SCREENS = [
    ("02", "user-management", "User Management", "Invite users, deactivate accounts, assign roles", "Users", [
        ("User Table", "Name, email, role, status, last login"),
        ("Actions", "Invite user, bulk deactivate, export"),
    ]),
    ("03", "roles-permissions", "Roles & Permissions", "RBAC matrix — modules × roles", "Settings", [
        ("Permission Matrix", "Admin, Manager, Agent × CRM modules"),
        ("Module Access", "Leads, Bookings, Finance, HR, Reports"),
    ]),
    ("08", "whatsapp-inbox", "WhatsApp Inbox", "Incoming messages, auto-capture, FAQ replies", "WhatsApp", [
        ("Message List", "Customer, preview, timestamp, capture status"),
        ("Conversation Panel", "Thread view, auto-reply log, manual reply"),
    ]),
    ("09", "customer-list", "Customer List", "Search, tags, stats, booking count", "Customers", [
        ("Customer Stats", "Total, active, avg bookings, outstanding"),
        ("Customer Table", "Name, phone, tags, bookings, outstanding, lead link"),
    ]),
    ("10", "customer-profile", "Customer Profile", "Contact, preferences, booking history", "Customers", [
        ("Contact Panel", "Phone, email, preferences, notes, timeline"),
        ("Booking History", "Bookings table with status, payment, amounts"),
    ]),
    ("11", "booking-list", "Booking List", "Status, destination, payment state", "Bookings", [
        ("Booking Table", "ID, customer, destination, status, payment"),
        ("Filters", "Status, date range, agent"),
    ]),
    ("12", "booking-detail", "Booking Detail", "Itinerary, travelers, documents, payments", "Bookings", [
        ("Itinerary", "Dates, destinations, flights, hotels"),
        ("Documents", "Passports, visas, tickets upload"),
        ("Payment Milestones", "Deposit, balance, reminders"),
    ]),
    ("13", "accounting-dashboard", "Finance Dashboard", "Revenue summary, outstanding balances, finance work queues", "Finance", [
        ("Revenue KPIs", "MTD revenue, outstanding, overdue, pending approvals"),
        ("Work Queues", "Overdue payments, expense approvals, pending revenue"),
    ]),
    ("14", "revenue-recording", "Revenue Adjustments", "Manual corrections and reconciliation", "Finance", [
        ("Adjustment Form", "Booking ref, amount, date, category"),
        ("Auto-posted Entries", "Revenue derived from payments"),
    ]),
    ("15", "invoice-list", "Invoice List / Generate", "Invoice table, PDF preview, send", "Finance", [
        ("Invoice Table", "Number, customer, amount, status, due date"),
        ("Actions", "Generate PDF, send email, mark paid"),
    ]),
    ("16", "payment-tracking", "Payment Queue", "Booking-centric outstanding, overdue queue, reminders", "Finance", [
        ("Payment Table", "Booking, amount paid, balance, next due"),
        ("Reminders", "Automated payment reminder schedule"),
    ]),
    ("17", "financial-reports", "Financial Reports", "P&L, revenue by agent/destination", "Finance", [
        ("P&L Table", "Revenue and expense line items with month comparison"),
        ("Rankings", "Revenue by agent and destination tables"),
    ]),
    ("18", "expense-list", "Expense List", "Filter by cost centre, approval status", "Finance", [
        ("Expense Stats", "MTD spend, pending, approved, budget used"),
        ("Expense Table", "Ref, category, centre, booking, status, receipt"),
    ]),
    ("19", "log-expense", "Log Expense", "Expense form, budget vs actual", "Finance", [
        ("Expense Form", "Centre, category, amount, booking, receipt upload"),
        ("Budget Tracker", "Per-centre budget bars and linked booking panel"),
    ]),
    ("20", "expense-approvals", "Expense Approvals", "Manager approval queue", "Finance", [
        ("Approval Queue", "Pending table with approve/reject actions"),
        ("Detail Sidebar", "Selected expense detail and recent decisions"),
    ]),
    ("21", "staff-performance", "Staff Performance", "Agent leaderboard, conversion rates", "HR", [
        ("Leaderboard", "Agent ranking by conversions, revenue"),
        ("Metrics", "Leads handled, conversion %, avg response time"),
    ]),
    ("22", "attendance-hr", "Attendance & HR Reports", "Attendance log, productivity metrics", "HR", [
        ("Attendance Log", "Daily check-in/out, leave balance"),
        ("HR Reports", "Productivity, attendance summary export"),
    ]),
    ("23", "cost-centres", "Cost Centre Allocation", "Branch budgets and spend allocation", "Finance", [
        ("Cost Centre Table", "Budget, MTD actual, utilization, expense count"),
        ("Allocation Panel", "Spend by category and branch split stats"),
    ]),
    ("24", "reports-hub", "Reports Hub", "Report categories — sales, bookings, financials, agents", "Reports", [
        ("Category Cards", "Sales, Bookings, Financials, Agent Performance"),
        ("Recent Reports", "Saved and scheduled reports"),
    ]),
    ("25", "report-builder", "Custom Report Builder", "Filters, date range, export", "Reports", [
        ("Filter Panel", "Date range, agent, destination, status"),
        ("Preview & Export", "Table/chart preview, CSV/PDF export"),
    ]),
    ("26", "notifications-center", "Notifications Center", "In-app alert feed, read/unread", "Notifications", [
        ("Alert Feed", "Lead assigned, payment received, follow-up due"),
        ("Filters", "All, unread, by type"),
    ]),
    ("27", "communication-templates", "Communication Templates", "WhatsApp / email template editor", "Notifications", [
        ("Template List", "Greeting, follow-up, payment reminder"),
        ("Editor", "Subject, body, variables, preview"),
    ]),
    ("28", "channel-settings", "Channel Settings", "WhatsApp API, email SMTP config", "Settings", [
        ("WhatsApp API", "API key, webhook URL, test connection"),
        ("Email SMTP", "Host, port, credentials, test send"),
    ]),
    ("29", "automation-rules", "Automation Rules", "IF/THEN rule builder", "Automation", [
        ("Rule Builder", "Trigger condition → action mapping"),
        ("Active Rules", "Lead rotation, status change notifications"),
    ]),
    ("30", "workflow-triggers", "Workflow Triggers", "Scheduled tasks, reminder schedules", "Automation", [
        ("Schedule List", "Daily follow-ups, payment reminders"),
        ("Trigger Config", "Cron schedule, target audience"),
    ]),
    ("31", "multi-branch", "Multi-Branch Management", "Branch list, data segregation", "Settings", [
        ("Branch List", "Dubai HQ, Abu Dhabi, Sharjah branches"),
        ("Segregation Rules", "Data isolation per branch"),
    ]),
    ("32", "consolidated-view", "Consolidated Branch View", "Cross-branch KPIs for management", "Dashboard", [
        ("Branch KPIs", "Leads, bookings, revenue per branch"),
        ("Comparison Chart", "Branch performance comparison"),
    ]),
    ("33", "system-settings", "System Settings", "Global config, rotation rules, FAQ keywords", "Settings", [
        ("Lead Rotation", "Round-robin rules, active agents"),
        ("FAQ Keywords", "Auto-reply keyword matching config"),
    ]),
]

NAV_ITEMS = [
    ("Dashboard", "▣"),
    ("Leads", "☰"),
    ("Pipeline", "▤"),
    ("Customers", "👤"),
    ("Bookings", "✈"),
    ("Finance", "💰"),
    ("HR", "📊"),
    ("Reports", "📈"),
    ("WhatsApp", "💬"),
    ("Settings", "⚙"),
]

TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{num} — {title} — Alsultania CRM</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">AT</div><div><h1>Alsultania CRM</h1><p>Travel &amp; Tourism</p></div></div>
{nav}
      <div class="sidebar-footer">Signed in as Admin · Manager</div>
    </aside>
    <div class="main">
      <header class="topbar">
        <div><h2>{title}</h2><p>{subtitle}</p></div>
        <div class="topbar-actions">
          <button class="btn btn-secondary">Export</button>
          <button class="btn btn-primary">+ Add New</button>
        </div>
      </header>
      <div class="content">
        <span class="wf-label">Wireframe — Phase Blueprint</span>
        <div class="wf-grid">
{blocks}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
'''

def nav_html(active):
    lines = []
    for name, icon in NAV_ITEMS:
        cls = ' active' if name == active else ''
        lines.append(f'      <a class="nav-item{cls}" href="#"><span class="nav-icon">{icon}</span> {name}</a>')
    return '\n'.join(lines)

def blocks_html(blocks):
    lines = []
    for title, desc in blocks:
        lines.append(f'          <div class="wf-block"><h4>{title}</h4><p>{desc}</p></div>')
    return '\n'.join(lines)

import os
base = os.path.dirname(os.path.abspath(__file__))
for num, slug, title, subtitle, active, blocks in SCREENS:
    html = TEMPLATE.format(
        num=num, title=title, subtitle=subtitle,
        nav=nav_html(active), blocks=blocks_html(blocks)
    )
    path = os.path.join(base, f"{slug}.html")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Created {slug}.html")
