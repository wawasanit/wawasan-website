
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const header=document.getElementById('header');
const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  if(header) header.classList.toggle('scrolled',window.scrollY>12);
  if(progress){
    const h=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(h?window.scrollY/h*100:0)+'%';
  }
},{passive:true});

const counters=document.querySelectorAll('.counter');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el=entry.target;
    const target=Number(el.dataset.target||0);
    const duration=1200;
    const start=performance.now();
    const tick=now=>{
      const p=Math.min((now-start)/duration,1);
      const value=Math.floor(target*(1-Math.pow(1-p,3)));
      el.textContent=value.toLocaleString()+(el.dataset.suffix||'');
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.6});
counters.forEach(c=>counterObserver.observe(c));
