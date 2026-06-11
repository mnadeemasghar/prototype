(function () {
  const STORAGE_KEY = 'alsultania_verified_phone';
  const verifiedPhone = sessionStorage.getItem(STORAGE_KEY);
  const displayPhone = sessionStorage.getItem(STORAGE_KEY + '_display');

  if (!verifiedPhone) {
    location.href = 'inquiry-otp.html';
    return;
  }

  const phoneEl = document.getElementById('verified-phone');
  if (phoneEl) {
    phoneEl.textContent = displayPhone || verifiedPhone;
  }

  LeadFormShared.initLeadForm({
    enableHandling: false,
    onSubmit: function (e) {
      e.preventDefault();
      sessionStorage.setItem('alsultania_inquiry_submitted', '1');
      location.href = 'inquiry-success.html';
    },
  });
})();
