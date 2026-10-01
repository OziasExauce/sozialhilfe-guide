(function(){
  const root=document.documentElement;
  const langButtons=document.querySelectorAll('[data-set-lang]');
  const menuButton=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('[data-nav]');
  const WHATSAPP_NUMBER='49XXXXXXXXXX'; // À remplacer par le numéro complet, sans + ni espaces.
  const messages={de:'Guten Tag, ich habe eine Frage zu den Informationen auf sozialhilfeinfo.de.',fr:"Bonjour, j’ai une question au sujet des informations sur sozialhilfeinfo.de."};
  const subjects={de:'Anfrage über sozialhilfeinfo.de',fr:'Demande via sozialhilfeinfo.de'};

  function setLanguage(lang){
    const safeLang=lang==='fr'?'fr':'de';
    root.lang=safeLang;
    langButtons.forEach(function(button){button.setAttribute('aria-pressed',String(button.dataset.setLang===safeLang));});
    document.querySelectorAll('[data-whatsapp-link]').forEach(function(link){link.href='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(messages[safeLang]);});
    document.querySelectorAll('[data-email-link]').forEach(function(link){link.href='mailto:kontakt@sozialhilfeinfo.de?subject='+encodeURIComponent(subjects[safeLang]);});
    try{sessionStorage.setItem('language',safeLang);}catch(error){}
  }

  langButtons.forEach(function(button){button.addEventListener('click',function(){setLanguage(button.dataset.setLang);});});
  setLanguage((function(){try{return sessionStorage.getItem('language');}catch(error){return null;}})()||'de');

  if(menuButton&&nav){
    menuButton.addEventListener('click',function(){
      const open=menuButton.getAttribute('aria-expanded')!=='true';
      menuButton.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('open',open);
      document.body.classList.toggle('menu-open',open);
    });
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){menuButton.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open');});});
  }

  document.querySelectorAll('.partner-link').forEach(function(link){
    const image=link.querySelector('img');
    if(!image)return;
    function loaded(){if(image.naturalWidth>0)link.classList.add('logo-loaded');}
    image.addEventListener('load',loaded);image.addEventListener('error',function(){link.classList.remove('logo-loaded');});
    if(image.complete)loaded();
  });

  const form=document.querySelector('[data-contact-form]');
  if(form){form.addEventListener('submit',function(event){
    event.preventDefault();
    const name=form.name.value.trim(),email=form.email.value.trim(),message=form.message.value.trim();
    const error=form.querySelector('[data-form-error]');
    const valid=name&&name.length<=100&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&email.length<=255&&message&&message.length<=2000;
    error.hidden=!!valid;if(!valid)return;
    const lang=root.lang==='fr'?'fr':'de';
    const body=(lang==='fr'?'Nom : ':'Name: ')+name+'\n'+(lang==='fr'?'E-mail : ':'E-Mail: ')+email+'\n\n'+message;
    window.location.href='mailto:kontakt@sozialhilfeinfo.de?subject='+encodeURIComponent(subjects[lang]+' – '+name)+'&body='+encodeURIComponent(body);
  });}

  const year=document.querySelector('[data-year]');if(year)year.textContent=String(new Date().getFullYear());
})();
