(function () {
  LeadFormShared.initLeadForm({
    onSubmit: function (e) {
      e.preventDefault();
      location.href = 'lead-detail.html';
    },
  });
})();
