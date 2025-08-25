// app.js
import { EXERCISES } from "./ejercicios.js";

/* ========= Estado ========= */
const Env = { home:"home", gym:"gym" };
const Equip = { bodyweight:"bodyweight", dumbbells:"dumbbells", kettlebell:"kettlebell", barbell:"barbell", bench:"bench", bands:"bands", cable:"cable", machine:"machine", smith:"smith" };

const MUSCLES = [
  {key:"chest",      es:"Pecho"},
  {key:"back",       es:"Espalda"},
  {key:"quads",      es:"Cuádriceps"},
  {key:"hamstrings", es:"Femoral"},   // <- renombrado como "Femoral"
  {key:"glutes",     es:"Glúteos"},
  {key:"shoulders",  es:"Hombros"},
  {key:"biceps",     es:"Bíceps"},
  {key:"triceps",    es:"Tríceps"},
  {key:"calves",     es:"Pantorrillas"},
  {key:"core",       es:"Core"},
];

const DEFAULT_FILTERS = {
  environment: Env.home,
  // Por defecto: TODO activo MENOS cable, machine y smith
  allowedEquipment: new Set(Object.values(Equip).filter(e => !["cable","machine","smith"].includes(e))),
  minutes: 30,
  preferBeginner: false,  // por defecto NO “enfocar a principiantes”
  goal: "hypertrophy",    // strength | hypertrophy | fatLoss | maintenance
  fullBody: false,
};

let Filters = {...DEFAULT_FILTERS};
let selectedMuscle = null;
let currentPlan = null;
let AllExercises = [...EXERCISES, ...getCustom()];

const Storage = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{return def;} },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
const CustomKey = "custom_exercises_v1";
const FavKey = "favorite_plans_v2";
function getCustom(){ return Storage.get(CustomKey,[]); }
function saveCustom(list){ Storage.set(CustomKey, list); }
const Favorites = {
  list(){ return Storage.get(FavKey,[]); },
  add(plan){ const arr=this.list(); arr.unshift(plan); Storage.set(FavKey,arr); },
  removeAt(i){ const arr=this.list(); arr.splice(i,1); Storage.set(FavKey,arr); }
};

const TrainingDefaults = {
  targetExercises(duration, fullBody){ if(duration<30) return fullBody?3:2; if(duration<45) return fullBody?4:3; if(duration<60) return fullBody?5:4; if(duration<90) return fullBody?6:5; return fullBody?6:6; },
  sets(goal, duration){ switch(goal){ case "strength": return duration<40?3:4; case "hypertrophy": return duration<40?3:4; case "fatLoss": return 3; case "maintenance": return 3; } },
  repRange(goal){ switch(goal){ case "strength": return [4,6]; case "hypertrophy": return [8,12]; case "fatLoss": return [12,20]; case "maintenance": return [8,12]; } },
  rest(goal){ switch(goal){ case "strength": return 120; case "hypertrophy": return 90; case "fatLoss": return 60; case "maintenance": return 75; } }
};

/* ========= Utilidades ========= */
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const el = html => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; };
const uuid = () => (crypto.randomUUID?.() ?? (Date.now()+"-"+Math.random().toString(16).slice(2)));
const shuffle = a => { const x=[...a]; for(let i=x.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [x[i],x[j]]=[x[j],x[i]];} return x; };

function muscleTitle(key){ return (MUSCLES.find(m=>m.key===key)?.es) || key; }
function equipmentTitle(e){
  const map = {bodyweight:"Peso corporal", dumbbells:"Mancuernas", kettlebell:"Pesa rusa", barbell:"Barra", bench:"Banco", bands:"Ligas", cable:"Poleas", machine:"Máquina", smith:"Multipower (Smith)"};
  return map[e] || e;
}
function patternTitle(p){
  const map = {horizontalPush:"Empuje horizontal",verticalPush:"Empuje vertical",horizontalPull:"Tracción horizontal",verticalPull:"Tracción vertical",kneeDominant:"Dominante rodilla",hipHinge:"Bisagra cadera",elbowFlexion:"Flexión codo",elbowExtension:"Extensión codo",abAntiExtension:"Anti-extensión",abAntiRotation:"Anti-rotación",abFlexion:"Flexión abdominal",abLateralFlexion:"Flexión lateral",calfRaise:"Pantorrilla"};
  return map[p] || p;
}

/* ========= Modal helpers ========= */
function openModal(id){
  qs("#overlay").classList.remove("hidden");
  qs(id).classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeModals(){
  qs("#overlay").classList.add("hidden");
  qsa(".modal").forEach(m=>m.classList.add("hidden"));
  document.body.style.overflow="";
}
qs("#overlay").addEventListener("click", closeModals);

/* ========= Pool & generación ========= */
function pool(muscle){
  return AllExercises.filter(ex =>
    ex.environment.includes(Filters.environment) &&
    ex.equipment.every(e=>Filters.allowedEquipment.has(e)) &&
    (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
    (muscle ? ex.muscle===muscle : true)
  );
}
function alternatives(ex){
  const all = pool(ex.muscle).filter(e=>e.name!==ex.name || e.variant!==ex.variant);
  const sameVariant = all.filter(e=>e.variant===ex.variant);
  if(sameVariant.length) return shuffle(sameVariant);
  const samePattern = all.filter(e=>e.patterns.some(p=>ex.patterns.includes(p)));
  return (samePattern.length?shuffle(samePattern):shuffle(all));
}
function generate(){
  const p = shuffle(pool(Filters.fullBody?null:selectedMuscle));
  const count = TrainingDefaults.targetExercises(Filters.minutes, Filters.fullBody);
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);

  const wanted = ["horizontalPush","horizontalPull","kneeDominant","hipHinge","abAntiExtension"];
  let chosen=[];
  if(Filters.fullBody){
    for(const pat of wanted){
      const pick = p.find(e=>e.patterns.includes(pat) && !chosen.includes(e));
      if(pick) chosen.push(pick);
      if(chosen.length===count) break;
    }
  }
  while(chosen.length<count){
    const next = p.find(e=>!chosen.includes(e));
    if(!next) break; chosen.push(next);
  }
  if(!chosen.length && p.length) chosen = [p[0]];

  const items = chosen.map(ex=>({
    id: uuid(),
    exercise: ex,
    sets,
    reps:[rmin,rmax],
    restSeconds: rest,
    notes: ex.unilateral ? "Trabaja ambos lados. RPE 7–8." : "RPE 7–8."
  }));
  const warm = "5–7 min movilidad + 2 series ligeras del primer ejercicio.";
  const cool = "3–5 min respiración nasal + estiramientos suaves.";

  currentPlan = {
    id: uuid(),
    muscle: Filters.fullBody?null:selectedMuscle,
    goal: Filters.goal,
    durationMinutes: Filters.minutes,
    items,
    warmup:warm,
    cooldown:cool,
    createdAt: Date.now()
  };
  render();
}

/* ========= Render ========= */
function renderHeader(){
  qs("#appTitle").textContent = "Rutinas en casa";
  qs("#subtitle").textContent = "Elige un músculo o usa Cuerpo completo";
}
function renderMuscleGrid(){
  const grid = qs("#muscleGrid");
  grid.innerHTML = "";

  const full = el(`<button class="muscle ${Filters.fullBody?'active':''}" data-full="1">Cuerpo completo</button>`);
  full.addEventListener("click", ()=>{
    Filters.fullBody = !Filters.fullBody;
    if(Filters.fullBody) selectedMuscle = null;
    render();
  });
  grid.appendChild(full);

  MUSCLES.forEach(m => {
    const b = el(`<button class="muscle ${(!Filters.fullBody && selectedMuscle===m.key)?'active':''}" data-muscle="${m.key}">${m.es}</button>`);
    b.addEventListener("click", ()=>{
      Filters.fullBody = false;
      selectedMuscle = m.key;
      render();
    });
    grid.appendChild(b);
  });
}
function renderContent(){
  const root = qs("#content");
  root.innerHTML = "";

  // Botón “generar” habilitado solo si hay músculo o fullBody
  qs("#generate").disabled = (!Filters.fullBody && !selectedMuscle);

  if(!currentPlan){
    root.appendChild(el(`<div class="empty">
      <div>
        <div style="font-size:56px;line-height:1">💪</div>
        <div>Elige un músculo y pulsa “Generar rutina”.</div>
      </div>
    </div>`));
    return;
  }

  // Cabecera
  root.appendChild(el(`
    <div class="card">
      <div class="row">
        <div>
          <div class="h-strong">${currentPlan.muscle ? muscleTitle(currentPlan.muscle) : "Cuerpo completo"}</div>
          <div class="caption">${goalTitle(currentPlan.goal)} • ${currentPlan.durationMinutes} minutos</div>
        </div>
      </div>
    </div>
  `));

  // Calentamiento
  root.appendChild(el(`
    <div class="card">
      <div class="h-strong" style="margin-bottom:4px">Calentamiento</div>
      <div class="caption">${currentPlan.warmup}</div>
    </div>
  `));

  // Items
  currentPlan.items.forEach((item, idx) => {
    const card = el(`
      <div class="card" data-item="${item.id}">
        <div class="row">
          <div style="max-width:60%">
            <div class="h-strong">${item.exercise.name}</div>
            <div class="caption">${item.exercise.instructions}</div>
            <div class="caption" style="margin-top:4px">
              ${item.sets}×${item.reps[0]}–${item.reps[1]} • ⏱ Descanso ${item.restSeconds}s
              ${item.exercise.unilateral ? " • 🔁 Unilateral" : ""}
            </div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end">
            <button class="btn sm soft" data-act="gif">GIF</button>
            <button class="btn sm soft" data-act="replace">Sustituir</button>
            <button class="btn sm soft" data-act="remove">Eliminar</button>
          </div>
        </div>
        <div class="row" style="margin-top:8px">
          <div class="timer">
            <span class="time" data-time title="Toca para editar">${formatTime(item.restSeconds)}</span>
            <button class="btn sm primary" data-act="start">Iniciar</button>
            <button class="btn sm soft" data-act="pause">Pausar</button>
            <button class="btn sm soft" data-act="reset">Reiniciar</button>
          </div>
          <div></div>
        </div>
      </div>
    `);
    root.appendChild(card);
  });

  // Vuelta a la calma
  root.appendChild(el(`
    <div class="card">
      <div class="h-strong" style="margin-bottom:4px">Vuelta a la calma</div>
      <div class="caption">${currentPlan.cooldown}</div>
    </div>
  `));

  // Botonera final
  const actions = el(`
    <div class="card">
      <div class="row" style="flex-wrap:wrap; gap:10px">
        <button class="btn primary" id="addEx">＋ Añadir ejercicio</button>
        <button class="btn soft" id="saveFav">❤️ Guardar en favoritos</button>
        <button class="btn soft" id="clearPlan">🗑️ Limpiar</button>
      </div>
    </div>
  `);
  root.appendChild(actions);

  // Acciones globales
  qs("#addEx").onclick = () => openPicker();
  qs("#saveFav").onclick = () => { Favorites.add(currentPlan); toast("Guardado ✅"); };
  qs("#clearPlan").onclick = () => { currentPlan = null; render(); };
}
function render(){
  renderHeader();
  renderMuscleGrid();
  renderContent();
}

/* ========= Título objetivo ========= */
function goalTitle(g){
  return {strength:"Fuerza", hypertrophy:"Hipertrofia", fatLoss:"Pérdida de grasa", maintenance:"Mantenimiento"}[g] || g;
}

/* ========= Toast ========= */
function toast(msg){
  const n = el(`<div style="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#00dc82; color:#05150e; font-weight:800; border-radius:999px;padding:8px 14px; z-index:999">${msg}</div>`);
  document.body.appendChild(n); setTimeout(()=>n.remove(), 1300);
}

/* ========= Timers (delegación) ========= */
const timers = new Map(); // id -> {remaining,running,int,default}
function formatTime(s){ const m=(s/60)|0; const r=s%60; return `${m}:${String(r).padStart(2,"0")}`; }
function ensureTimer(itemId, defaultSeconds){
  if(!timers.has(itemId)){
    timers.set(itemId, {remaining: defaultSeconds, running:false, int:null, default:defaultSeconds});
  }
  return timers.get(itemId);
}

qs("#content").addEventListener("click", (e)=>{
  const card = e.target.closest(".card[data-item]"); if(!card) return;
  const itemId = card.getAttribute("data-item");
  const item = currentPlan.items.find(i=>i.id===itemId);
  if(!item) return;
  const T = ensureTimer(itemId, item.restSeconds);
  const actBtn = e.target.closest("[data-act]");
  const timeEl = card.querySelector("[data-time]");

  // Editar tiempo tocando el número
  if(e.target === timeEl){
    openTimeEditor(T.default, (newSec)=>{
      T.default = Math.max(1, Math.min(600, newSec));
      T.remaining = T.default; T.running=false; if(T.int) clearInterval(T.int);
      timeEl.textContent = formatTime(T.remaining);
    });
    return;
  }

  if(!actBtn) return;
  const act = actBtn.dataset.act;

  if(act==="start"){
    if(T.running) return;
    if(T.remaining<=0) T.remaining=T.default;
    T.running = true;
    T.int = setInterval(()=>{
      if(!T.running) return;
      T.remaining--;
      timeEl.textContent = formatTime(T.remaining);
      if(T.remaining<=0){
        T.running=false; clearInterval(T.int); T.int=null;
        if(navigator.vibrate) navigator.vibrate(120);
      }
    },1000);
  }
  if(act==="pause"){
    T.running=false; if(T.int){ clearInterval(T.int); T.int=null; }
  }
  if(act==="reset"){
    T.running=false; if(T.int){ clearInterval(T.int); T.int=null; }
    T.remaining = T.default;
    timeEl.textContent = formatTime(T.remaining);
  }
  if(act==="gif"){
    if(item.exercise.mediaURL){
      openMedia(item.exercise.mediaURL, item.exercise.name);
    } else {
      const q = encodeURIComponent(`${item.exercise.name} ejercicio gif`);
      window.open(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`, "_blank");
    }
  }
  if(act==="replace"){
    const alt = alternatives(item.exercise)[0]; if(!alt) return;
    currentPlan.items = currentPlan.items.map(it => it.id===item.id ? {...it, exercise: alt} : it);
    render();
  }
  if(act==="remove"){
    currentPlan.items = currentPlan.items.filter(it => it.id!==item.id);
    render();
  }
});

/* ========= Editor de tiempo ========= */
function openTimeEditor(defaultSec, onSave){
  const m = qs("#modalConfig");
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">Editar tiempo</h3></div>
    <div class="grid cols3" style="margin-top:8px">
      <div>
        <label>Min</label>
        <input id="te_min" type="number" min="0" max="10" value="${Math.floor(defaultSec/60)}">
      </div>
      <div>
        <label>Seg</label>
        <input id="te_sec" type="number" min="0" max="59" value="${defaultSec%60}">
      </div>
      <div>
        <label>&nbsp;</label>
        <button id="te_max" class="btn soft" style="width:100%">Max 10:00</button>
      </div>
    </div>
    <div class="grid cols2" style="margin-top:8px">
      <button id="te_cancel" class="btn soft">✖️ Cerrar</button>
      <button id="te_ok" class="btn primary">✅ Listo</button>
    </div>
  `;
  qs("#te_cancel").onclick=closeModals;
  qs("#te_max").onclick=()=>{ qs("#te_min").value=10; qs("#te_sec").value=0; };
  qs("#te_ok").onclick=()=>{
    let mins = parseInt(qs("#te_min").value||0,10);
    let secs = parseInt(qs("#te_sec").value||0,10);
    mins = Math.max(0,Math.min(10,mins));
    secs = Math.max(0,Math.min(59,secs));
    const total = Math.max(1, Math.min(600, mins*60+secs));
    onSave(total);
    closeModals();
  };
  openModal("#modalConfig");
}

/* ========= Media modal ========= */
function openMedia(url, title){
  const m = qs("#modalMedia");
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${title}</h3></div>
    <div style="aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden">
      <iframe src="${url}" style="width:100%; height:100%; border:0" allow="autoplay; encrypted-media"></iframe>
    </div>
    <div class="footer-note">Si no se muestra, se abrirá en una pestaña nueva.</div>
    <div style="margin-top:10px"><button id="mm_close" class="btn soft">✖️ Cerrar</button> <a class="btn primary" href="${url}" target="_blank" rel="noopener">🔗 Abrir en pestaña</a></div>
  `;
  qs("#mm_close").onclick=closeModals;
  openModal("#modalMedia");
}

/* ========= Picker (añadir ejercicio) ========= */
function openPicker(){
  const m = qs("#modalPicker");
  let query = "";
  let muscleFilter = selectedMuscle || null;

  function filtered(){
    const q = norm(query);
    return AllExercises
      .filter(ex =>
        (muscleFilter==null || ex.muscle===muscleFilter) &&
        ex.environment.includes(Filters.environment) &&
        ex.equipment.every(e=>Filters.allowedEquipment.has(e)) &&
        (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
        (q==="" ? true : (
          norm(ex.name).includes(q) ||
          norm(ex.instructions).includes(q) ||
          norm(muscleTitle(ex.muscle)).includes(q) ||
          norm(ex.variant).includes(q)
        ))
      )
      .sort((a,b)=> a.name.localeCompare(b.name));
  }
  function norm(s){ return (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(); }

  function renderPicker(){
    const chips = `<button class="muscle ${muscleFilter==null?"active":""}" data-mus="">Todos</button>` +
      MUSCLES.map(m=>`<button class="muscle ${muscleFilter===m.key?"active":""}" data-mus="${m.key}">${m.es}</button>`).join('');

    m.innerHTML = `
      <div class="sticky">
        <h3 style="margin:0">Añadir ejercicio</h3>
        <div class="grid cols2" style="margin-top:8px">
          <div style="display:flex; align-items:center; gap:8px">
            <span>🔎</span>
            <input id="pk_q" placeholder="Buscar ejercicios" autocomplete="off">
          </div>
          <div style="text-align:right">
            <button id="pk_new" class="btn soft">＋ Crear ejercicio</button>
            <button id="pk_close" class="btn soft">✖️ Cerrar</button>
          </div>
        </div>
        <div class="muscle-grid" style="margin-top:8px">${chips}</div>
      </div>
      <table class="table">
        <tbody>
          ${filtered().map(ex=>`
            <tr>
              <td>
                <strong>${ex.name}</strong>
                <div class="caption">${ex.instructions}</div>
              </td>
              <td class="caption" style="width:35%">
                ${muscleTitle(ex.muscle)}<br>
                <span>${ex.equipment.map(equipmentTitle).join(", ")}</span>
              </td>
              <td style="text-align:right; width:1%"><button class="btn sm primary" data-add="${ex.variant}">＋</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    qs("#pk_q").value=query;
    setTimeout(()=>qs("#pk_q").focus(), 50);
    qs("#pk_q").oninput = e=>{ query=e.target.value; renderPicker(); };
    qs("#pk_close").onclick=closeModals;
    qs("#pk_new").onclick=()=>openNewExerciseForm(()=>{ AllExercises=[...EXERCISES, ...getCustom()]; renderPicker(); });
    qsa("[data-mus]").forEach(b=>b.onclick=()=>{ muscleFilter = b.dataset.mus || null; renderPicker(); });
    qsa("[data-add]").forEach(b=>b.onclick=()=>{
      const ex = filtered().find(e=>e.variant===b.dataset.add);
      if(!ex) return;
      openConfig(ex, (sets,rmin,rmax,rest)=>{
        currentPlan.items.push({ id:uuid(), exercise:ex, sets, reps:[rmin,rmax], restSeconds:rest, notes: ex.unilateral ? "Trabaja ambos lados. RPE 7–8." : "RPE 7–8." });
        closeModals(); render();
      });
    });
  }
  renderPicker();
  openModal("#modalPicker");
}

/* ========= Config (sets/reps/rest) ========= */
function openConfig(ex, onAdd){
  const m = qs("#modalConfig");
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">Configurar</h3></div>
    <div class="card" style="margin:8px 0">
      <strong>${ex.name}</strong>
      <div class="caption">${ex.instructions}</div>
      <div class="caption" style="margin-top:4px">
        ${muscleTitle(ex.muscle)} • ${ex.patterns.map(patternTitle).join(", ")}
      </div>
    </div>
    <div class="grid cols3">
      <div><label>Series</label><input id="cfg_sets" type="number" min="1" max="10" value="${sets}"></div>
      <div><label>Reps mín</label><input id="cfg_min" type="number" min="1" max="30" value="${rmin}"></div>
      <div><label>Reps máx</label><input id="cfg_max" type="number" min="${rmin}" max="30" value="${rmax}"></div>
    </div>
    <div style="margin-top:8px"><label>Descanso (s)</label><input id="cfg_rest" type="number" min="15" max="300" step="15" value="${rest}"></div>
    <div class="grid cols2" style="margin-top:8px">
      <button id="cfg_cancel" class="btn soft">✖️ Cancelar</button>
      <button id="cfg_save" class="btn primary">💾 Guardar</button>
    </div>
  `;
  qs("#cfg_cancel").onclick=closeModals;
  qs("#cfg_save").onclick=()=>{
    const s = clamp(intVal("#cfg_sets",sets),1,10);
    const min = clamp(intVal("#cfg_min",rmin),1,30);
    const max = clamp(intVal("#cfg_max",rmax),min,30);
    const r = clamp(intVal("#cfg_rest",rest),15,300);
    onAdd(s,min,max,r);
  };
  openModal("#modalConfig");
}
function intVal(sel, def){ const v=parseInt(qs(sel).value||def,10); return isNaN(v)?def:v; }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

/* ========= Crear ejercicio nuevo ========= */
function openNewExerciseForm(onDone){
  const m = qs("#modalPicker");
  const eqOpts = Object.values(Equip).map(e=>`<label><input type="checkbox" data-eq="${e}" ${["bodyweight","dumbbells","bench","bands"].includes(e)?"checked":""}> ${equipmentTitle(e)}</label>`).join('<br>');
  const envOpts = [Env.home,Env.gym].map(e=>`<label><input type="checkbox" data-env="${e}" checked> ${e==="home"?"Casa":"Gimnasio"}</label>`).join('<br>');
  const patterns = ["horizontalPush","verticalPush","horizontalPull","verticalPull","kneeDominant","hipHinge","elbowFlexion","elbowExtension","abAntiExtension","abAntiRotation","abFlexion","abLateralFlexion","calfRaise"];
  const patOpts = patterns.map(p=>`<label><input type="checkbox" data-p="${p}"> ${patternTitle(p)}</label>`).join('<br>');

  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">Crear ejercicio</h3></div>
    <div class="grid cols2">
      <div><label>Nombre</label><input id="nx_name" placeholder="Nombre"></div>
      <div><label>Músculo</label>
        <select id="nx_muscle">
          ${MUSCLES.map(m=>`<option value="${m.key}">${m.es}</option>`).join('')}
        </select>
      </div>
    </div>
    <div style="margin-top:6px"><label>Patrones</label><div class="grid">${patOpts}</div></div>
    <div style="margin-top:6px"><label>Equipo</label><div class="grid">${eqOpts}</div></div>
    <div style="margin-top:6px"><label>Entorno</label><div class="grid">${envOpts}</div></div>
    <div class="grid cols2" style="margin-top:6px">
      <label><input type="checkbox" id="nx_uni"> Unilateral</label>
      <label><input type="checkbox" id="nx_beg"> Apto principiantes</label>
    </div>
    <div style="margin-top:6px"><label>Instrucciones</label><textarea id="nx_ins" rows="3"></textarea></div>
    <div style="margin-top:6px"><label>URL multimedia (opcional)</label><input id="nx_media" placeholder="https://..."></div>
    <div class="grid cols2" style="margin-top:8px">
      <button id="nx_cancel" class="btn soft">✖️ Cancelar</button>
      <button id="nx_save" class="btn primary">💾 Guardar</button>
    </div>
    <div class="footer-note">Se guarda localmente (puedes exportar luego).</div>
  `;
  qs("#nx_cancel").onclick = openPicker; // volver al picker
  setTimeout(()=>qs("#nx_name").focus(), 50);
  qs("#nx_save").onclick = ()=>{
    const name = (qs("#nx_name").value||"").trim() || "Ejercicio sin nombre";
    const muscle = qs("#nx_muscle").value;
    const pats = qsa("[data-p]").filter(i=>i.checked).map(i=>i.dataset.p);
    const eq   = qsa("[data-eq]").filter(i=>i.checked).map(i=>i.dataset.eq);
    const env  = qsa("[data-env]").filter(i=>i.checked).map(i=>i.dataset.env);
    const unilateral = qs("#nx_uni").checked;
    const beginner = qs("#nx_beg").checked;
    const ins = (qs("#nx_ins").value||"").trim() || "Ejercicio personalizado.";
    const media = (qs("#nx_media").value||"").trim() || null;

    const ex = {
      name, muscle, patterns: pats.length?pats:["hipHinge"], equipment: eq.length?eq:["bodyweight"],
      environment: env.length?env:["home","gym"], unilateral, beginnerFriendly: beginner,
      instructions: ins, variant:`custom_${muscle}_${Date.now()}`, mediaURL: media
    };
    const list = getCustom();
    list.unshift(ex); saveCustom(list);
    AllExercises = [...EXERCISES, ...getCustom()];
    if(typeof onDone==="function") onDone(ex);
  };
}

/* ========= Filtros ========= */
function openFilters(){
  const m = qs("#modalFilters");
  const eqList = Object.values(Equip).map(e=>`
    <label><input type="checkbox" data-eq="${e}" ${Filters.allowedEquipment.has(e)?"checked":""}> ${equipmentTitle(e)}</label>
  `).join('<br>');

  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">Filtros</h3></div>
    <div class="grid cols2">
      <div>
        <label>Objetivo</label>
        <select id="f_goal">
          <option value="strength">Fuerza</option>
          <option value="hypertrophy">Hipertrofia</option>
          <option value="fatLoss">Pérdida de grasa</option>
          <option value="maintenance">Mantenimiento</option>
        </select>
      </div>
      <div>
        <label>Entorno</label>
        <select id="f_env">
          <option value="home">Casa</option>
          <option value="gym">Gimnasio</option>
        </select>
      </div>
    </div>
    <div style="margin-top:8px">
      <label>Minutos: <span id="minsVal">${Filters.minutes}</span></label>
      <input type="range" min="20" max="120" step="5" id="f_minutes" value="${Filters.minutes}">
      <div class="caption">Duración estimada</div>
    </div>
    <hr>
    <div style="margin-top:8px">
      <label>Equipo disponible</label>
      <div class="grid">${eqList}</div>
    </div>
    <div class="grid cols2" style="margin-top:8px">
      <label><input type="checkbox" id="f_beg" ${Filters.preferBeginner?"checked":""}> Enfocar a principiantes</label>
      <label><input type="checkbox" id="f_full" ${Filters.fullBody?"checked":""}> Cuerpo completo</label>
    </div>
    <div class="grid cols2" style="margin-top:10px">
      <button class="btn soft" id="f_close">✖️ Cerrar</button>
      <button class="btn primary" id="f_ready">✅ Listo</button>
    </div>
  `;
  qs("#f_goal").value = Filters.goal;
  qs("#f_env").value = Filters.environment;
  qs("#f_minutes").oninput = e=> qs("#minsVal").textContent = e.target.value;

  qs("#f_close").onclick = closeModals;
  qs("#f_ready").onclick = ()=>{
    Filters.goal = qs("#f_goal").value;
    Filters.environment = qs("#f_env").value;
    Filters.minutes = parseInt(qs("#f_minutes").value,10);
    Filters.preferBeginner = qs("#f_beg").checked;
    Filters.fullBody = qs("#f_full").checked;

    const set = new Set();
    qsa('[data-eq]').forEach(inp=>{ if(inp.checked) set.add(inp.dataset.eq); });
    Filters.allowedEquipment = set.size?set:new Set(Object.values(Equip));

    if(Filters.fullBody) selectedMuscle=null;
    closeModals(); render();
  };
  openModal("#modalFilters");
}

/* ========= Favoritos ========= */
function openFavorites(){
  const m = qs("#modalFavorites");
  const list = Favorites.list();
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">Favoritos</h3></div>
    ${!list.length ? `<div class="caption" style="padding:8px">Aún no hay favoritos.</div>` : ""}
    <div>
      ${list.map((p,i)=>`
        <div class="card" style="margin:8px 0">
          <div class="row">
            <div>
              <div class="h-strong">${p.muscle ? muscleTitle(p.muscle) : "Cuerpo completo"}</div>
              <div class="caption">${goalTitle(p.goal)} • ${p.durationMinutes} minutos</div>
            </div>
            <div style="display:flex; gap:8px">
              <button class="btn sm primary" data-use="${i}">Usar</button>
              <button class="btn sm soft" data-del="${i}">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:8px"><button class="btn soft" id="favClose">✖️ Cerrar</button></div>
  `;
  qs("#favClose").onclick = closeModals;
  qsa("[data-use]").forEach(b=>b.onclick=()=>{
    const plan = Favorites.list()[parseInt(b.dataset.use,10)];
    currentPlan = plan; closeModals(); render();
  });
  qsa("[data-del]").forEach(b=>b.onclick=()=>{
    Favorites.removeAt(parseInt(b.dataset.del,10)); openFavorites();
  });
  openModal("#modalFavorites");
}

/* ========= Settings ========= */
function openSettings(){
  const m = qs("#modalSettings");
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">Ajustes</h3></div>
    <div class="card">
      <div class="caption">La app está en Español por defecto.</div>
    </div>
    <div class="card">
      <div><strong>Comentarios</strong></div>
      <div><a href="mailto:paul_rios@engineer.com?subject=%5BApp%20Feedback%5D">✉️ Enviar correo</a></div>
    </div>
    <div><button class="btn soft" id="s_close">✖️ Cerrar</button></div>
  `;
  qs("#s_close").onclick = closeModals;
  openModal("#modalSettings");
}

/* ========= Eventos de UI ========= */
document.addEventListener("DOMContentLoaded", ()=>{
  // Botonera superior
  qs("#btnFilters").addEventListener("click", openFilters);
  qs("#openFilters").addEventListener("click", openFilters);
  qs("#btnFavorites").addEventListener("click", openFavorites);
  qs("#btnSettings").addEventListener("click", openSettings);
  qs("#generate").addEventListener("click", generate);

  // Render inicial
  render();
});
