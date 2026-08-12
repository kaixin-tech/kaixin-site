// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function(){
  var t = document.querySelector('.menu-toggle');
  var m = document.querySelector('.mobile-menu');
  if(t && m){
    t.addEventListener('click', function(){ m.classList.toggle('open'); });
    m.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ m.classList.remove('open'); }); });
  }

  // Product gallery thumbnail switching
  document.querySelectorAll('.gallery').forEach(function(g){
    var main = g.querySelector('.main-img img');
    g.querySelectorAll('.thumbs img').forEach(function(th){
      th.addEventListener('click', function(){
        g.querySelectorAll('.thumbs img').forEach(function(x){x.classList.remove('active');});
        th.classList.add('active');
        if(main) main.src = th.src;
      });
    });
  });

  // Inquiry form -> Web3Forms backend (no server needed)
  var form = document.getElementById('inquiry-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = document.getElementById('form-ok');
      var name = form.querySelector('[name=name]').value.trim();
      var email = form.querySelector('[name=email]').value.trim();
      var msg = form.querySelector('[name=message]').value.trim();
      if(!name || !email || !msg){
        alert('Please fill in Name, Email and Message.');
        return;
      }
      var key = (form.querySelector('[name=access_key]').value || '').trim();
      var product = form.querySelector('[name=product]') ? form.querySelector('[name=product]').value : '';
      var quantity = form.querySelector('[name=quantity]') ? form.querySelector('[name=quantity]').value : '';

      // Fallback: if access_key not configured yet, open mail client pre-filled
      if(!key || key === 'YOUR_WEB3FORMS_KEY'){
        var subject = 'New Inquiry from ' + name;
        var body = 'Name: ' + name + '\nEmail: ' + email + '\nProduct: ' + product +
          '\nQuantity: ' + quantity + '\nMessage: ' + msg;
        if(ok){ ok.textContent = '✅ Please send the email that just opened to complete your inquiry.'; ok.style.display = 'block'; }
        window.location.href = 'mailto:alina@kaixinkeji.cn?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        return;
      }

      // Send via Web3Forms
      var data = {
        access_key: key,
        name: name,
        email: email,
        company: form.querySelector('[name=company]') ? form.querySelector('[name=company]').value : '',
        whatsapp: form.querySelector('[name=whatsapp]') ? form.querySelector('[name=whatsapp]').value : '',
        product: product,
        quantity: quantity,
        message: msg,
        subject: 'New Inquiry from ' + name
      };
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function(r){ return r.json(); })
        .then(function(res){
          if(res.success){
            if(ok){ ok.textContent = '✅ Thanks! Your inquiry has been sent. We will reply within 24 hours.'; ok.style.display = 'block'; }
            form.reset();
          } else {
            alert('Sorry, submission failed. Please email alina@kaixinkeji.cn or use WhatsApp.');
          }
        }).catch(function(){
          alert('Network error. Please email alina@kaixinkeji.cn or use WhatsApp.');
        });
    });
  }
});
