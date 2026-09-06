'use strict';

/* ════════════════════════════════════════════════════════
   CONTACT FORM — Web3Forms integration
   • Client-side validation (name, email, message)
   • Loading spinner on submit
   • Success state (green button flash + confirmation)
   • Error fallback → WhatsApp deep-link
   • Clears error banner on field input
   ════════════════════════════════════════════════════════ */
(function () {
  const form   = document.getElementById('contact-form');
  const btn    = document.getElementById('form-btn');
  const status = document.getElementById('form-status');
  if (!form || !btn || !status) return;

  const label   = btn.querySelector('.btn-label');
  const spinner = btn.querySelector('.spinner');
  let lastFormData;

  /* ── Default English translations ── */
  var translations = {
    en: {
      form_send: 'Send Message',
      form_sending: 'Sending...',
      form_sent: 'Sent!',
      form_success_msg: 'Message sent successfully! I\'ll get back to you soon.',
      form_error_required: 'Please fill in all required fields.',
      form_error_email: 'Please enter a valid email address.',
      form_error_generic: 'Something went wrong. Try again or reach out on',
      form_error_wa: 'WhatsApp',
      form_wa_intro: 'Hi Stopher, I\'d like to work with you.'
    }
  };

  /* ── Get current language translations ── */
  function t(key) {
    var lang = localStorage.getItem('smk-lang') || 'en';
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  }

  /* ── WhatsApp direct CTA ── */
  const waCta = document.getElementById('wa-cta');
  if (waCta) {
    waCta.addEventListener('click', () => {
      window.open(
        'https://wa.me/27729998863?text=' +
        encodeURIComponent(t('form_wa_intro')),
        '_blank'
      );
    });
  }

  /* ── Helpers ── */
  function setLoading(on) {
    btn.disabled = on;
    btn.classList.toggle('loading', on);
    if (spinner) spinner.style.display = on ? 'block' : 'none';
    if (label)   label.textContent     = on ? t('form_sending') : t('form_send');
  }

  function showStatus(type, html) {
    status.className   = 'form-status-msg ' + type;
    status.innerHTML   = html;
    status.style.display = 'block';
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideStatus() {
    status.style.display = 'none';
  }

  /* ── Form submit ── */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    hideStatus();

    const fd      = new FormData(form);
    lastFormData  = fd;

    /* ── Honeypot check: if either trap field has a value, silently reject ── */
    const botcheck   = form.querySelector('[name="botcheck"]');
    const websiteUrl = (fd.get('website_url') || '').trim();
    if ((botcheck && botcheck.checked) || websiteUrl) {
      /* Pretend success to fool bots — do not submit */
      showStatus('success', t('form_success_msg'));
      form.reset();
      return;
    }

    const name    = (fd.get('name')    || '').trim();
    const email   = (fd.get('email')   || '').trim();
    const message = (fd.get('message') || '').trim();

    /* Validation */
    if (!name || !email || !message) {
      showStatus('error', t('form_error_required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('error', t('form_error_email'));
      return;
    }

    /* Submit */
    setLoading(true);
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        body:    fd,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        /* ── Success ── */
        if (label) label.textContent = t('form_sent');
        btn.style.background = '#00e5a0';
        btn.style.boxShadow  = '0 8px 32px rgba(0,229,160,0.4)';
        btn.disabled         = false;
        btn.classList.remove('loading');
        if (spinner) spinner.style.display = 'none';

        showStatus('success', t('form_success_msg'));
        form.reset();

        setTimeout(() => {
          if (label) label.textContent = t('form_send');
          btn.style.background = '';
          btn.style.boxShadow  = '';
        }, 4000);

      } else {
        throw new Error('submission_failed');
      }

    } catch {
      setLoading(false);

      const waName = (lastFormData.get('name')    || '').trim();
      const waMsg  = (lastFormData.get('message') || '').trim();
      const waLink = 'https://wa.me/27729998863?text=' +
        encodeURIComponent(`Hi Stopher, I\u2019m ${waName} \u2014 ${waMsg}`);

      showStatus(
        'error',
        t('form_error_generic') + ' ' +
        `<a href="${waLink}" target="_blank" rel="noopener" ` +
        `style="color:var(--cyan);text-decoration:underline">${t('form_error_wa')}</a>`
      );
    }
  });

  /* ── Clear error banner on any field input ── */
  form.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('input', () => {
      if (status.classList.contains('error')) hideStatus();
    });
  });
})();
