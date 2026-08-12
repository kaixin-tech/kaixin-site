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

  // Inquiry form: local feedback (no backend on free host)
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
      // Compose a mailto fallback so inquiries still reach you without a server
      var subject = 'New Inquiry from ' + name;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\nProduct: ' +
        (form.querySelector('[name=product]') ? form.querySelector('[name=product]').value : '') +
        '\nQuantity: ' + (form.querySelector('[name=quantity]') ? form.querySelector('[name=quantity]').value : '') +
        '\nMessage: ' + msg;
      var mailto = 'mailto:alina@kaixinkeji.cn?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if(ok) ok.style.display = 'block';
      window.location.href = mailto;
    });
  }
});
