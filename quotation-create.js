(function () {
  var btn = document.querySelector('.btn-primary[data-action="send-quotation"]');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    sessionStorage.setItem('leadQuoted', 'LD-1042');
    location.href = 'lead-detail.html';
  });
})();
