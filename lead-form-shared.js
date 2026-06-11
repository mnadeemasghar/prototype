window.LeadFormShared = (function () {
  const DATE_LABELS = {
    FLIGHT: ['Departure', 'Return'],
    HOTEL: ['Check-in', 'Check-out'],
    VISA: ['Travel Date', 'Return'],
    TOUR: ['Departure', 'Return'],
    UMRAH: ['Departure', 'Return'],
    HAJJ: ['Departure', 'Return'],
    INSURANCE: ['Travel Start', 'Travel End'],
    PACKAGE: ['Departure', 'Return'],
    OTHER: ['Service Date', 'Return'],
  };

  const TYPE_SECTIONS = {
    FLIGHT: `
      <div class="form-grid form-grid-4">
        <div class="field"><label>From <span class="req">*</span></label><input type="text" name="from" placeholder="LHE" required></div>
        <div class="field"><label>To <span class="req">*</span></label><input type="text" name="to" placeholder="KHI" required></div>
        <div class="field"><label>Type <span class="req">*</span></label><select name="trip_type" required><option value="">Select</option><option>One Way</option><option>Return</option><option>Multi City</option></select></div>
        <div class="field"><label>Class <span class="req">*</span></label><select name="class" required><option value="">Select</option><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First</option></select></div>
      </div>`,
    HOTEL: `
      <div class="form-grid form-grid-4">
        <div class="field"><label>City <span class="req">*</span></label><input type="text" name="city" placeholder="JED" required></div>
        <div class="field"><label>Rating</label><select name="rating"><option value="">Any</option><option>3 Star</option><option>4 Star</option><option>5 Star</option></select></div>
        <div class="field"><label>Rooms <span class="req">*</span></label><select name="rooms">${countOptions(1, 6)}</select></div>
        <div class="field"><label>Board Basis <span class="req">*</span></label><select name="board_basis" required><option value="">Select</option><option>Room Only</option><option>Bed &amp; Breakfast</option><option>Half Board</option><option>Full Board</option><option>All Inclusive</option></select></div>
      </div>`,
    VISA: `
      <div class="form-grid form-grid-2">
        <div class="field"><label>Country <span class="req">*</span></label><input type="text" name="country" placeholder="UAE" required></div>
        <div class="field"><label>Type <span class="req">*</span></label><input type="text" name="visa_type" placeholder="Tourist" required></div>
      </div>`,
    TOUR: `
      <div class="form-grid form-grid-2">
        <div class="field"><label>Destination City (or Cities) <span class="req">*</span></label><input type="text" name="destinations" placeholder="Paris, Rome" required></div>
        <div class="field"><label>Need Visa</label><select name="need_visa"><option value="">Select</option><option>Yes</option><option>No</option></select></div>
        <div class="field"><label>Hotel</label><select name="hotel"><option value="">Select</option><option>3 Star</option><option>4 Star</option><option>5 Star</option><option>Not Required</option></select></div>
        <div class="field"><label>Days <span class="req">*</span></label><select name="days">${countOptions(1, 30)}</select></div>
      </div>`,
    UMRAH: `
      <div class="form-grid form-grid-4">
        <div class="field"><label>Route <span class="req">*</span></label><select name="route" required><option value="">Select</option><option>Jeddah — Makkah — Madina</option><option>Madinah First</option><option>Custom</option></select></div>
        <div class="field"><label>Makkah (Nights) <span class="req">*</span></label><select name="makkah_nights">${countOptions(1, 14)}</select></div>
        <div class="field"><label>Madina (Nights) <span class="req">*</span></label><select name="madina_nights">${countOptions(1, 14)}</select></div>
        <div class="field"><label>Package <span class="req">*</span></label><select name="package" required><option value="">Select</option><option>Economy</option><option>Standard</option><option>Premium</option><option>VIP</option></select></div>
      </div>`,
    HAJJ: `
      <div class="form-grid form-grid-2">
        <div class="field"><label>Package <span class="req">*</span></label><select name="package" required><option value="">Select</option><option>Standard</option><option>Premium</option><option>VIP</option></select></div>
        <div class="field"><label>Days <span class="req">*</span></label><select name="days">${countOptions(7, 45)}</select></div>
      </div>`,
    INSURANCE: `
      <div class="form-grid form-grid-2">
        <div class="field"><label>Country <span class="req">*</span></label><input type="text" name="country" placeholder="UAE" required></div>
        <div class="field"><label>Stay <span class="req">*</span></label><select name="stay" required><option value="">Select</option><option>Up to 7 days</option><option>Up to 15 days</option><option>Up to 30 days</option><option>Up to 90 days</option></select></div>
        <div class="field"><label>Vendor</label><input type="text" name="vendor" placeholder="Optional"></div>
        <div class="field"><label>Plan Name</label><input type="text" name="plan_name" placeholder="Optional"></div>
      </div>`,
    PACKAGE: `
      <div class="form-grid form-grid-2">
        <div class="field"><label>Required At (City/Country) <span class="req">*</span></label><input type="text" name="required_at" placeholder="Dubai, UAE" required></div>
        <div class="field"><label>Package/Service Detail <span class="req">*</span></label><input type="text" name="service_detail" placeholder="Describe package" required></div>
      </div>`,
    OTHER: `
      <div class="form-grid">
        <div class="field"><label>Required Service Detail <span class="req">*</span></label><input type="text" name="service_detail" placeholder="Describe service needed" required></div>
      </div>`,
  };

  function countOptions(start, end) {
    let html = '';
    for (let i = start; i <= end; i++) {
      html += `<option${i === start ? ' selected' : ''}>${i}</option>`;
    }
    return html;
  }

  function toggleDateInput(checkboxId, inputId) {
    const cb = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);
    if (!cb || !input) return;
    input.disabled = !cb.checked;
    cb.addEventListener('change', function () {
      input.disabled = !cb.checked;
      if (!cb.checked) input.value = '';
    });
  }

  function initLeadForm(options) {
    const leadType = document.getElementById(options.leadTypeId || 'lead-type');
    const typeSection = document.getElementById(options.typeSectionId || 'type-section');
    const typeTitle = document.getElementById(options.typeSectionTitleId || 'type-section-title');
    const depLabel = document.getElementById(options.departureLabelId || 'departure-label');
    const retLabel = document.getElementById(options.returnLabelId || 'return-label');
    const form = document.getElementById(options.formId || 'lead-create-form');

    function renderTypeSection(type) {
      const labels = DATE_LABELS[type] || DATE_LABELS.FLIGHT;
      if (depLabel) depLabel.textContent = labels[0];
      if (retLabel) retLabel.textContent = labels[1];
      if (typeTitle) {
        typeTitle.textContent = type;
      }
      if (typeSection) {
        typeSection.innerHTML = TYPE_SECTIONS[type] || TYPE_SECTIONS.FLIGHT;
      }
    }

    if (leadType) {
      leadType.addEventListener('change', function () {
        renderTypeSection(leadType.value);
      });
      renderTypeSection(leadType.value);
    }

    if (options.enableHandling !== false) {
      const handlingRadios = document.querySelectorAll('input[name="handling"]');
      const agentField = document.getElementById('agent-field');

      function toggleAgentField() {
        const selected = document.querySelector('input[name="handling"]:checked');
        const show = selected && selected.value !== 'TAKEOVER';
        if (agentField) agentField.hidden = !show;
      }

      handlingRadios.forEach(function (radio) {
        radio.addEventListener('change', toggleAgentField);
      });
      toggleAgentField();
    }

    toggleDateInput('departure-enabled', 'departure-date');
    toggleDateInput('return-enabled', 'return-date');

    if (form && options.onSubmit) {
      form.addEventListener('submit', options.onSubmit);
    }

    return { renderTypeSection };
  }

  return {
    DATE_LABELS,
    TYPE_SECTIONS,
    countOptions,
    initLeadForm,
  };
})();
