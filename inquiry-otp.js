(function () {
  const STORAGE_KEY = 'alsultania_verified_phone';
  const stepPhone = document.getElementById('step-phone');
  const stepOtp = document.getElementById('step-otp');
  const countryCode = document.getElementById('country-code');
  const phoneNumber = document.getElementById('phone-number');
  const sendOtpBtn = document.getElementById('send-otp-btn');
  const verifyOtpBtn = document.getElementById('verify-otp-btn');
  const changePhoneBtn = document.getElementById('change-phone-btn');
  const resendOtpBtn = document.getElementById('resend-otp-btn');
  const otpPhoneDisplay = document.getElementById('otp-phone-display');
  const otpTimer = document.getElementById('otp-timer');
  const otpInputs = document.querySelectorAll('#otp-inputs input');
  const steps = document.querySelectorAll('.step-indicator .step');

  let timerInterval = null;
  let secondsLeft = 59;

  function formatPhone(code, number) {
    const digits = number.replace(/\D/g, '');
    return code + ' ' + digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  }

  function fullE164(code, number) {
    return code + number.replace(/\D/g, '');
  }

  function setStep(stepNum) {
    stepPhone.hidden = stepNum !== 1;
    stepOtp.hidden = stepNum !== 2;
    steps.forEach(function (el) {
      el.classList.toggle('active', Number(el.getAttribute('data-step')) === stepNum);
      el.classList.toggle('done', Number(el.getAttribute('data-step')) < stepNum);
    });
  }

  function startTimer() {
    secondsLeft = 59;
    resendOtpBtn.disabled = true;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function () {
      secondsLeft -= 1;
      const m = Math.floor(secondsLeft / 60);
      const s = String(secondsLeft % 60).padStart(2, '0');
      otpTimer.textContent = '(' + m + ':' + s + ')';
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        otpTimer.textContent = '';
        resendOtpBtn.disabled = false;
      }
    }, 1000);
  }

  function getOtpValue() {
    return Array.from(otpInputs).map(function (input) { return input.value; }).join('');
  }

  otpInputs.forEach(function (input, index) {
    input.addEventListener('input', function () {
      input.value = input.value.replace(/\D/g, '').slice(0, 1);
      if (input.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  sendOtpBtn.addEventListener('click', function () {
    if (!phoneNumber.value.trim()) {
      phoneNumber.focus();
      return;
    }
    const formatted = formatPhone(countryCode.value, phoneNumber.value);
    otpPhoneDisplay.textContent = formatted;
    setStep(2);
    startTimer();
    otpInputs[0].focus();
  });

  changePhoneBtn.addEventListener('click', function () {
    setStep(1);
    otpInputs.forEach(function (input) { input.value = ''; });
  });

  resendOtpBtn.addEventListener('click', function () {
    if (resendOtpBtn.disabled) return;
    startTimer();
    otpInputs.forEach(function (input) { input.value = ''; });
    otpInputs[0].focus();
  });

  verifyOtpBtn.addEventListener('click', function () {
    const otp = getOtpValue();
    if (otp.length !== 6) {
      otpInputs[otp.length] ? otpInputs[otp.length].focus() : otpInputs[0].focus();
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, fullE164(countryCode.value, phoneNumber.value));
    sessionStorage.setItem(STORAGE_KEY + '_display', formatPhone(countryCode.value, phoneNumber.value));
    location.href = 'inquiry-create.html';
  });
})();
