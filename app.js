/* ===================== i18n ===================== */
const I18N = {
  es: {
    appTitle:"Rutinas en casa", muscle:"Músculo", fullBody:"Cuerpo completo", filters:"Filtros", generate:"Generar",
    minutes:"Minutos", goal:"Objetivo", environment:"Entorno", equipment:"Equipo disponible", beginner:"Enfocar a principiantes",
    gym:"Gimnasio", home:"Casa", strength:"Fuerza", hypertrophy:"Hipertrofia", fatLoss:"Pérdida de grasa", maintenance:"Mantenimiento",
    warmup:"Calentamiento", cooldown:"Vuelta a la calma", rest:"Descanso", unilateral:"Unilateral", favorites:"Favoritos",
    saveFavorite:"Guardar en favoritos", saved:"Guardado", timer:"Temporizador", start:"Iniciar", pause:"Pausar", reset:"Reiniciar",
    selectMuscle:"Elige un músculo o activa Cuerpo completo y presiona Generar.",
    ready:"Listo", close:"Cerrar", timeBased:"Duración estimada",
    replace:"Sustituir", clear:"Limpiar", settings:"Ajustes", language:"Idioma", systemLang:"Sistema",
    addExercise:"Añadir ejercicio", remove:"Eliminar", searchExercises:"Buscar ejercicios", createExercise:"Crear ejercicio",
    patterns:"Patrones", unilateralQ:"¿Unilateral?", beginnerQ:"Apto principiantes", instructions:"Instrucciones",
    mediaURL:"URL multimedia (opcional)", save:"Guardar", cancel:"Cancelar", setsRepsRest:"Series / Reps / Descanso",
    feedback:"Comentarios", name:"Nombre", email:"Correo", message:"Mensaje", send:"Enviar",
    thanksFeedback:"Gracias por tus comentarios.",
    supportDev:"Apoyar al desarrollador", tipJar:"Invítame un café ☕️", loading:"Cargando…", custom:"Personalizado",
    all:"Todos", use:"Usar", editTime:"Editar tiempo", max1000:"Máximo 10:00"
  },
  en: {
    appTitle:"Home Routines", muscle:"Muscle", fullBody:"Full body", filters:"Filters", generate:"Generate",
    minutes:"Minutes", goal:"Goal", environment:"Environment", equipment:"Available equipment", beginner:"Beginner friendly",
    gym:"Gym", home:"Home", strength:"Strength", hypertrophy:"Hypertrophy", fatLoss:"Fat loss", maintenance:"Maintenance",
    warmup:"Warm-up", cooldown:"Cool-down", rest:"Rest", unilateral:"Unilateral", favorites:"Favorites",
    saveFavorite:"Save favorite", saved:"Saved", timer:"Timer", start:"Start", pause:"Pause", reset:"Reset",
    selectMuscle:"Pick a muscle or switch to Full body, then tap Generate.",
    ready:"Done", close:"Close", timeBased:"Estimated duration",
    replace:"Replace", clear:"Clear", settings:"Settings", language:"Language", systemLang:"System",
    addExercise:"Add exercise", remove:"Remove", searchExercises:"Search exercises", createExercise:"Create exercise",
    patterns:"Movement patterns", unilateralQ:"Unilateral?", beginnerQ:"Beginner friendly", instructions:"Instructions",
    mediaURL:"Media URL (optional)", save:"Save", cancel:"Cancel", setsRepsRest:"Sets / Reps / Rest",
    feedback:"Feedback", name:"Name", email:"Email", message:"Message", send:"Send",
    thanksFeedback:"Thanks for your feedback.",
    supportDev:"Support the developer", tip Jar:"Tip Jar ☕️", loading:"Loading…", custom:"Custom",
    all:"All", use:"Use", editTime:"Edit time", max1000:"Max 10:00"
  }
};
// default español
const Lang = {
  key:"app_lang_v1",
  get(){ const raw=localStorage.getItem(this.key)||"es"; return raw==="system" ? ((navigator.language||"en").toLowerCase().startsWith("es")?"es":"en") : raw; },
  set(v){ localStorage.setItem(this.key,v); }
};
let L = I18N[Lang.get()];
const t = k => L[k] ?? k;
const $ = s => document.querySelector(s);

function applyStaticI18n(){ document.querySelectorAll("[data-i]").forEach(n => n.textContent = t(n.dataset.i)); }

/* ===================== Domain & Storage ===================== */
const Env = { home:"home", gym:"gym" };
const Equip = { bodyweight:"bodyweight", dumbbells:"dumbbells", kettlebell:"kettlebell", barbell:"barbell", bench:"bench", bands:"bands", cable:"cable", machine:"machine", smith:"smith" };
const Muscles = ["chest","back","quads","hamstrings","glutes","shoulders","biceps","triceps","calves","core"];
const Pattern = { horizontalPush:"horizontalPush", verticalPush:"verticalPush", horizontalPull:"horizontalPull", verticalPull:"verticalPull", kneeDominant:"kneeDominant", hipHinge:"hipHinge", elbowFlexion:"elbowFlexion", elbowExtension:"elbowExtension", abAntiExtension:"abAntiExtension", abAntiRotation:"abAntiRotation", abFlexion:"abFlexion", abLateralFlexion:"abLateralFlexion", calfRaise:"calfRaise" };
const Goal = { strength:"strength", hypertrophy:"hypertrophy", fatLoss:"fatLoss", maintenance:"maintenance" };

function mTitle(m){
  const es = {chest:"Pecho",back:"Espalda",quads:"Cuádriceps",hamstrings:"Isquios",glutes:"Glúteos",shoulders:"Hombros",biceps:"Bíceps",triceps:"Tríceps",calves:"Pantorrillas",core:"Core"};
  const en = {chest:"Chest",back:"Back",quads:"Quads",hamstrings:"Hamstrings",glutes:"Glutes",shoulders:"Shoulders",biceps:"Biceps",triceps:"Triceps",calves:"Calves",core:"Core"};
  return (Lang.get()==="es"?es:en)[m];
}
function equipTitle(e){
  const es = {bodyweight:"Peso corporal",dumbbells:"Mancuernas",kettlebell:"Pesa rusa",barbell:"Barra",bench:"Banco",bands:"Ligas",cable:"Poleas",machine:"Máquina",smith:"Multipower (Smith)"};
  const en = {bodyweight:"Bodyweight",dumbbells:"Dumbbells",kettlebell:"Kettlebell",barbell:"Barbell",bench:"Bench",bands:"Bands",cable:"Cables",machine:"Machine",smith:"Smith machine"};
  return (Lang.get()==="es"?es:en)[e] || e;
}

const Storage = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{ return def; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
const CustomStoreKey = "custom_exercises_v1";
const FavoriteKey = "favorite_plans_v2";
const CustomStore = { list(){ return Storage.get(CustomStoreKey,[]); }, add(ex){ const a=this.list(); a.unshift(ex); Storage.set(CustomStoreKey,a); } };
const Favorites = { list(){ return Storage.get(FavoriteKey,[]); }, add(p){ const a=this.list(); a.unshift(p); Storage.set(FavoriteKey,a); }, removeAt(i){ const a=this.list(); a.splice(i,1); Storage.set(FavoriteKey,a); } };

/* ===================== VM defaults ===================== */
const TrainingDefaults = {
  targetExercises(d, fb){ if(d<30) return fb?3:2; if(d<45) return fb?4:3; if(d<60) return fb?5:4; if(d<90) return fb?6:5; return fb?6:6; },
  sets(goal,d){ switch(goal){ case Goal.strength: return d<40?3:4; case Goal.hypertrophy: return d<40?3:4; case Goal.fatLoss: return 3; case Goal.maintenance: return 3; } },
  repRange(goal){ switch(goal){ case Goal.strength: return [4,6]; case Goal.hypertrophy: return [8,12]; case Goal.fatLoss: return [12,20]; case Goal.maintenance: return [8,12]; } },
  rest(goal){ switch(goal){ case Goal.strength: return 120; case Goal.hypertrophy: return 90; case Goal.fatLoss: return 60; case Goal.maintenance: return 75; } }
};

let EXERCISES = []; // exercises.json + custom
let Filters = {
  environment: Env.home,
  allowedEquipment: new Set(Object.values(Equip).filter(e => !["cable","machine","smith"].includes(e))), // todo salvo poleas/máq/smith
  minutes: 30,
  preferBeginner: false, // principiantes OFF
  goal: Goal.hypertrophy,
  fullBody: false
};
let selectedMuscle = null;
let currentPlan = null;

/* ===================== Utils ===================== */
const makeId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const shuffle = a => { const x=[...a]; for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]];} return x; };
const norm = s => (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

/* ===================== Built-in fallback ===================== */
function fallbackLibrary(){
  const H = (Lang.get()==="es");
  const s = (es,en)=> H?es:en;
  const arr = [];
  const add = (n,m,p,eq,env,uni,beg,ins,v,media=null)=> arr.push({
    id:makeId(), name:n, muscle:m, patterns:p, equipment:eq, environment:env, unilateral:uni, beginnerFriendly:beg, instructions:ins, variant:v, mediaURL:media
  });
  // Agregamos algunos por músculo (el grueso vendrá de exercises.json)
  add(s("Flexiones","Push-ups"),"chest",["horizontalPush"],["bodyweight"],["home","gym"],false,true,s("Manos bajo hombros.","Hands under shoulders."),"chest_pushup");
  add(s("Press plano con mancuernas","DB Flat Press"),"chest",["horizontalPush"],["dumbbells","bench"],["home","gym"],false,true,s("Escápulas retraídas.","Scap retracted."),"chest_mid_db");
  add(s("Remo mancuerna un brazo","One-arm DB Row"),"back",["horizontalPull"],["dumbbells","bench"],["home","gym"],true,true,s("Hacia la cadera, sin balanceo.","To hip, no swing."),"back_row_db_one");
  add(s("Barbell Row","Remo con barra"),"back",["horizontalPull"],["barbell"],["home","gym"],false,false,s("Torso 30–45°, neutro.","30–45° torso."),"back_row_bb");
  add(s("Goblet Squat","Sentadilla goblet"),"quads",["kneeDominant"],["dumbbells","kettlebell"],["home","gym"],false,true,s("Rodillas siguen puntas.","Knees track toes."),"quads_goblet");
  add(s("DB RDL","Peso muerto rumano DB"),"hamstrings",["hipHinge"],["dumbbells"],["home","gym"],false,true,s("Cadera atrás, neutro.","Hips back, neutral."),"hams_rdl_db");
  add(s("Hip Thrust (banco)","Hip Thrust (bench)"),"glutes",["hipHinge"],["bench","dumbbells"],["home","gym"],false,true,s("Pausa arriba.","Top pause."),"glutes_hipthrust_bench");
  add(s("DB Overhead Press","Press militar DB"),"shoulders",["verticalPush"],["dumbbells"],["home","gym"],false,true,s("Core firme.","Brace core."),"shoulders_press_db");
  add(s("DB Curl","Curl DB supinado"),"biceps",["elbowFlexion"],["dumbbells"],["home","gym"],false,true,s("Codo quieto.","Elbow still."),"biceps_curl_db");
  add(s("DB Overhead Triceps","Extensión DB sobre cabeza"),"triceps",["elbowExtension"],["dumbbells"],["home","gym"],false,true,s("Codos fijos.","Elbows fixed."),"triceps_db_oh");
  add(s("Front Plank","Plancha frontal"),"core",["abAntiExtension"],["bodyweight"],["home","gym"],false,true,s("Costillas adentro.","Ribs down."),"core_plank");
  add(s("Standing Calf Raise","Elevación talones de pie"),"calves",["calfRaise"],["bodyweight"],["home","gym"],false,true,s("Pausa 1s arriba.","1s top pause."),"calves_standing");
  return arr;
}

/* ===================== Load ===================== */
async function loadExercises(){
  try{
    const res = await fetch("exercises.json?v=4", {cache:"no-store"});
    if(!res.ok) throw new Error("HTTP "+res.status);
    const json = await res.json();
    // Asegura IDs por si faltan
    json.forEach(ex => { if(!ex.id) ex.id = makeId(); });
    return json.concat(CustomStore.list());
  }catch(e){
    return fallbackLibrary().concat(CustomStore.list());
  }
}

/* ===================== Generator ===================== */
function pool(muscle){
  return EXERCISES.filter(ex =>
    ex.environment.includes(Filters.environment) &&
    ex.equipment.every(e => Filters.allowedEquipment.has(e)) &&
    (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
    (muscle ? ex.muscle === muscle : true)
  );
}
function alternatives(ex){
  const all = pool(ex.muscle).filter(e=>e.id!==ex.id);
  const sameVariant = all.filter(e=>e.variant===ex.variant);
  if(sameVariant.length) return shuffle(sameVariant);
  const samePattern = all.filter(e=>e.patterns.some(p => ex.patterns.includes(p)));
  return samePattern.length ? shuffle(samePattern) : shuffle(all);
}
function generate(){
  const p = shuffle(pool(Filters.fullBody?null:selectedMuscle));
  const count = TrainingDefaults.targetExercises(Filters.minutes, Filters.fullBody);
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  const wanted = [Pattern.horizontalPush,Pattern.horizontalPull,Pattern.kneeDominant,Pattern.hipHinge,Pattern.abAntiExtension];

  let chosen = [];
  if(Filters.fullBody){
    for(const pat of wanted){
      const pick = p.find(e => e.patterns.includes(pat) && !chosen.includes(e));
      if(pick) chosen.push(pick);
      if(chosen.length === count) break;
    }
  }
  while(chosen.length < count){
    const next = p.find(e => !chosen.includes(e));
    if(!next) break;
    chosen.push(next);
  }
  if(!chosen.length && p.length) chosen=[p[0]];

  const items = chosen.map(ex => ({
    id: makeId(),
    exercise: ex,
    sets,
    reps: [rmin,rmax],
    restSeconds: rest,
    notes: ex.unilateral ? (Lang.get()==="es" ? "Trabaja ambos lados. RPE 7–8." : "Work both sides. RPE 7–8.") : (Lang.get()==="es" ? "RPE 7–8." : "RPE 7–8.")
  }));

  const warm = Lang.get()==="es" ? "5–7 min movilidad + 2 series ligeras del primer ejercicio." : "5–7 min mobility + 2 light ramp-up sets.";
  const cool = Lang.get()==="es" ? "3–5 min respiración nasal + estiramientos suaves." : "3–5 min nasal breathing + gentle stretches.";

  currentPlan = {
    id: makeId(),
    muscle: Filters.fullBody ? null : selectedMuscle,
    goal: Filters.goal,
    durationMinutes: Filters.minutes,
    items,
    warmup: warm,
    cooldown: cool,
    createdAt: Date.now()
  };
  renderAll();
}

/* ===================== UI: Header/Chips/Content ===================== */
function renderHeader(){
  $("#appTitle").textContent = t("appTitle");
  $("#subtitle").textContent = t("selectMuscle");
}
function renderMuscleChips(){
  const c = $("#muscleChips");
  c.innerHTML = "";
  const full = document.createElement("button");
  full.className = "chip"+(Filters.fullBody?" active":"");
  full.textContent = t("fullBody");
  full.onclick = () => { Filters.fullBody = !Filters.fullBody; if(Filters.fullBody) selectedMuscle = null; renderAll(); };
  c.appendChild(full);

  for(const m of Muscles){
    const b = document.createElement("button");
    b.className = "chip"+((selectedMuscle===m && !Filters.fullBody)?" active":"");
    b.textContent = mTitle(m);
    b.onclick = () => { Filters.fullBody = false; selectedMuscle = m; renderAll(); };
    c.appendChild(b);
  }
}
function flashSaved(){
  const n = (()=>{ const d=document.createElement('div'); d.style.cssText="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#00dc82;color:#000;border-radius:999px;padding:8px 14px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.3);z-index:3000"; d.textContent="✅ "+t('saved'); return d;})();
  document.body.appendChild(n);
  setTimeout(()=>n.remove(),1200);
}
function renderContent(){
  const root = $("#content");
  root.innerHTML = "";

  if(!currentPlan){
    root.appendChild(el(`<div class="empty">
      <div>
        <div style="font-size:56px;line-height:1">🏋️</div>
        <div>${t('selectMuscle')}</div>
      </div>
    </div>`));
    return;
  }

  // Header plan
  root.appendChild(el(`<div class="card">
    <div class="row">
      <div>
        <div style="font-weight:700">${currentPlan.muscle?mTitle(currentPlan.muscle):t('fullBody')}</div>
        <div class="caption">${t(currentPlan.goal)} • ${currentPlan.durationMinutes} ${t('minutes').toLowerCase()}</div>
      </div>
    </div>
  </div>`));

  // Warmup
  root.appendChild(el(`<div class="card"><div class="group"><h3>${t('warmup')}</h3><div class="caption">${currentPlan.warmup}</div></div></div>`));

  // Items
  currentPlan.items.forEach((item, idx) => {
    const card = el(`<div class="card">
      <div class="row">
        <div style="max-width:60%">
          <div style="font-weight:700">${item.exercise.name}</div>
          <div class="caption">${item.exercise.instructions}</div>
        </div>
        <div class="row-right">
          <div class="caption">${item.sets}×${item.reps[0]}–${item.reps[1]}</div>
          <button class="btn secondary small" data-act="replace">${t('replace')}</button>
          <button class="btn secondary small" data-act="remove">${t('remove')}</button>
        </div>
      </div>
      <div class="row" style="margin-top:6px">
        <div class="caption">⏱ ${t('rest')} <span data-rest>${item.restSeconds}</span>s ${item.exercise.unilateral?` • 🔁 ${t('unilateral')}`:""}</div>
        <div class="timer">
          <span class="time" data-time>0:00</span>
          <button class="btn primary small" data-act="start">${t('start')}</button>
          <button class="btn secondary small" data-act="pause">${t('pause')}</button>
          <button class="btn secondary small" data-act="reset">${t('reset')}</button>
          <button class="btn secondary small" data-act="gif">GIF</button>
        </div>
      </div>
    </div>`);

    // Timer
    const timeEl = card.querySelector("[data-time]");
    const restEl = card.querySelector("[data-rest]");
    let remaining = item.restSeconds, running=false, int=null;
    const fmt = s => { const m=Math.floor(s/60), r=s%60; return `${m}:${r.toString().padStart(2,"0")}`; };
    const draw = ()=> timeEl.textContent = fmt(remaining);
    const start = ()=>{
      if(running) return;
      running = true;
      if(remaining<=0) remaining = item.restSeconds;
      int = setInterval(()=>{
        if(!running) return;
        remaining--; draw();
        if(remaining<=0){ running=false; clearInterval(int); navigator.vibrate?.(100); }
      },1000);
    };
    const pause = ()=>{ running=false; clearInterval(int); };
    const reset = ()=>{ running=false; clearInterval(int); remaining=item.restSeconds; draw(); };
    // Edit tapping time
    timeEl.title = t("editTime");
    timeEl.onclick = ()=>{
      const cur = remaining || item.restSeconds;
      const raw = prompt(Lang.get()==="es" ? "Segundos (1–600):" : "Seconds (1–600):", String(cur));
      if(!raw) return;
      let v = parseInt(raw,10);
      if(isNaN(v)) return;
      v = Math.max(1, Math.min(600, v));
      item.restSeconds = v;
      remaining = v;
      restEl.textContent = v;
      draw();
    };

    draw();
    card.querySelector('[data-act="start"]').onclick = start;
    card.querySelector('[data-act="pause"]').onclick = pause;
    card.querySelector('[data-act="reset"]').onclick = reset;
    card.querySelector('[data-act="gif"]').onclick = ()=>{
      const q = encodeURIComponent(`${item.exercise.name} exercise gif`);
      window.open(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`,"_blank","noopener");
    };

    // replace/remove
    card.querySelector('[data-act="replace"]').onclick = (e)=>{ e.stopPropagation(); const alt = alternatives(item.exercise)[0]; if(!alt) return; currentPlan.items[idx] = { ...item, exercise: alt }; renderAll(); };
    card.querySelector('[data-act="remove"]').onclick = (e)=>{ e.stopPropagation(); currentPlan.items.splice(idx,1); renderAll(); };

    // tap card header -> GIF (evita si fue botón)
    card.querySelector(".row").onclick = (e)=>{ if(e.target.closest("button")) return; const q = encodeURIComponent(`${item.exercise.name} exercise gif`); window.open(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`,"_blank","noopener"); };

    root.appendChild(card);
  });

  // Acciones
  const actions = el(`<div class="card">
    <div class="grid cols3" style="margin-top:4px">
      <button class="btn primary" id="addEx">＋ ${t('addExercise')}</button>
      <button class="btn secondary" id="saveFav">❤️ ${t('saveFavorite')}</button>
      <button class="btn danger" id="clearPlan">🗑️ ${t('clear')}</button>
    </div>
  </div>`);
  root.appendChild(actions);

  // Cooldown al final
  root.appendChild(el(`<div class="card"><div class="group"><h3>${t('cooldown')}</h3><div class="caption">${currentPlan.cooldown}</div></div></div>`));

  // Handlers
  $("#addEx").onclick = openPicker;
  $("#saveFav").onclick = ()=>{ Favorites.add(currentPlan); flashSaved(); };
  $("#clearPlan").onclick = ()=>{ currentPlan=null; renderAll(); };
}
function renderAll(){
  L = I18N[Lang.get()];
  applyStaticI18n();
  renderHeader();
  renderMuscleChips();
  $("#generate").disabled = (!Filters.fullBody && !selectedMuscle);
  renderContent();
}
const el = html => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; };

/* ===================== Bottom Sheet (single) ===================== */
const Sheet = (()=> {
  const overlay = $("#overlay");
  const sheet = $("#sheet");
  const title = $("#sheetTitle");
  const body = $("#sheetBody");
  const closeBtn = $("#sheetClose");
  let scrollY = 0;

  function open({titleText, html, onOpen}){
    title.textContent = titleText || "";
    body.innerHTML = html || "";
    // Bloquea scroll del body
    scrollY = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollY}px`;

    overlay.hidden = false;
    setTimeout(()=> overlay.classList.add("show"), 10);
    sheet.setAttribute("aria-hidden","false");
    sheet.classList.add("open");

    closeBtn.onclick = close;
    overlay.onclick = close;
    onOpen?.(body);
  }
  function close(){
    overlay.classList.remove("show");
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden","true");
    setTimeout(()=>{ overlay.hidden = true; }, 200);
    // Restaura scroll
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }
  return { open, close, el: body };
})();

/* ===================== Filters Sheet ===================== */
function openFilters(){
  const eqList = Object.values(Equip).map(e=>`
    <label><input type="checkbox" data-eq="${e}" ${Filters.allowedEquipment.has(e)?"checked":""}> ${equipTitle(e)}</label>
  `).join('<br>');

  const html = `
    <div class="grid cols2">
      <div>
        <label>${t('goal')}</label>
        <select id="f_goal">
          <option value="strength">${t('strength')}</option>
          <option value="hypertrophy">${t('hypertrophy')}</option>
          <option value="fatLoss">${t('fatLoss')}</option>
          <option value="maintenance">${t('maintenance')}</option>
        </select>
      </div>
      <div>
        <label>${t('environment')}</label>
        <select id="f_env">
          <option value="home">${t('home')}</option>
          <option value="gym">${t('gym')}</option>
        </select>
      </div>
    </div>
    <div class="group">
      <label>${t('minutes')}: <span id="minsVal">${Filters.minutes}</span></label>
      <input type="range" min="20" max="120" step="5" id="f_minutes" value="${Filters.minutes}">
      <div class="caption">${t('timeBased')}</div>
    </div>
    <div class="group">
      <label>${t('equipment')}</label>
      <div class="grid">${eqList}</div>
    </div>
    <div class="group grid cols2">
      <label><input type="checkbox" id="f_beg" ${Filters.preferBeginner?"checked":""}> ${t('beginner')}</label>
      <label><input type="checkbox" id="f_full" ${Filters.fullBody?"checked":""}> ${t('fullBody')}</label>
    </div>
    <div class="grid cols2">
      <button class="btn secondary" id="f_close">✖️ ${t('close')}</button>
      <button class="btn primary" id="f_ready">✅ ${t('ready')}</button>
    </div>
  `;
  Sheet.open({
    titleText: t('filters'),
    html,
    onOpen: (root)=>{
      root.querySelector('#f_goal').value = Filters.goal;
      root.querySelector('#f_env').value = Filters.environment;
      root.querySelector('#f_minutes').oninput = e => root.querySelector('#minsVal').textContent = e.target.value;
      root.querySelector('#f_close').onclick = Sheet.close;
      root.querySelector('#f_ready').onclick = ()=>{
        Filters.goal = root.querySelector('#f_goal').value;
        Filters.environment = root.querySelector('#f_env').value;
        Filters.minutes = parseInt(root.querySelector('#f_minutes').value,10);
        Filters.preferBeginner = root.querySelector('#f_beg').checked;
        Filters.fullBody = root.querySelector('#f_full').checked;
        const inputs=[...root.querySelectorAll('[data-eq]')];
        const set = new Set(); inputs.forEach(inp=>{ if(inp.checked) set.add(inp.dataset.eq); });
        Filters.allowedEquipment = set.size ? set : new Set(Object.values(Equip));
        Sheet.close(); renderAll();
      };
    }
  });
}

/* ===================== Picker Sheet ===================== */
function openPicker(){
  let query = "";
  let muscleFilter = selectedMuscle || null;

  function filtered(){
    const q = norm(query);
    return EXERCISES.filter(ex =>
      (muscleFilter==null || ex.muscle===muscleFilter) &&
      ex.environment.includes(Filters.environment) &&
      ex.equipment.every(e => Filters.allowedEquipment.has(e)) &&
      (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
      (q==="" ? true : (
        norm(ex.name).includes(q) ||
        norm(ex.instructions).includes(q) ||
        norm(mTitle(ex.muscle)).includes(q) ||
        norm(ex.variant).includes(q)
      ))
    ).sort((a,b)=> a.name.localeCompare(b.name));
  }

  function renderList(root){
    const chips = `<button class="chip ${muscleFilter==null?"active":""}" data-muscle="">${t('all')}</button>` +
      Muscles.map(m=>`<button class="chip ${muscleFilter===m?"active":""}" data-muscle="${m}">${mTitle(m)}</button>`).join('');
    const items = filtered().map(ex=>`
      <tr>
        <td><strong>${ex.name}</strong><div class="caption">${ex.instructions}</div></td>
        <td class="small">${mTitle(ex.muscle)}<br><span class="caption">${ex.equipment.map(equipTitle).join(", ")}</span></td>
        <td style="text-align:right"><button class="btn primary small" data-add="${ex.id}">＋</button></td>
      </tr>`).join('');
    root.innerHTML = `
      <div class="grid cols2" style="margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:8px">
          <span>🔎</span>
          <input id="q" placeholder="${t('searchExercises')}" autocomplete="off">
        </div>
        <div style="text-align:right">
          <button class="btn secondary small" id="mkCustom">＋ ${t('createExercise')}</button>
        </div>
      </div>
      <div class="chips" id="chips">${chips}</div>
      <table class="table">${items}</table>
    `;
    root.querySelector('#q').value = query;
    root.querySelector('#q').oninput = e => { query = e.target.value; renderList(root); };
    root.querySelectorAll('[data-muscle]').forEach(b => b.onclick = () => { const v=b.dataset.muscle; muscleFilter = v? v : null; renderList(root); });
    root.querySelectorAll('[data-add]').forEach(btn => btn.onclick = () => {
      const ex = filtered().find(e=>e.id===btn.dataset.add); if(!ex) return;
      openConfig(ex, (sets,repsMin,repsMax,rest)=>{
        currentPlan.items.push({ id:makeId(), exercise:ex, sets, reps:[repsMin,repsMax], restSeconds:rest,
          notes: ex.unilateral ? (Lang.get()==="es"?"Trabaja ambos lados. RPE 7–8.":"Work both sides. RPE 7–8.") : (Lang.get()==="es"?"RPE 7–8.":"RPE 7–8.") });
        Sheet.close(); renderAll();
      });
    });
    root.querySelector('#mkCustom').onclick = ()=> openNewExerciseForm(()=> renderList(root));
    setTimeout(()=> root.querySelector('#q').focus(), 50);
  }

  Sheet.open({
    titleText: t('addExercise'),
    html: `<div id="pickerRoot"></div>`,
    onOpen: () => renderList($("#pickerRoot"))
  });
}

/* ===================== Config Sheet ===================== */
function openConfig(ex, onAdd){
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  const html = `
    <div class="group"><strong>${ex.name}</strong><div class="caption">${ex.instructions}</div></div>
    <div class="grid cols3">
      <div><label>${Lang.get()==="es"?"Series":"Sets"}</label><input type="number" id="cfg_sets" min="1" max="10" value="${sets}"></div>
      <div><label>${Lang.get()==="es"?"Reps mín":"Min reps"}</label><input type="number" id="cfg_min" min="1" max="30" value="${rmin}"></div>
      <div><label>${Lang.get()==="es"?"Reps máx":"Max reps"}</label><input type="number" id="cfg_max" min="${rmin}" max="30" value="${rmax}"></div>
    </div>
    <div class="group"><label>${t('rest')} (s)</label><input type="number" id="cfg_rest" min="15" max="300" step="15" value="${rest}"></div>
    <div class="grid cols2">
      <button class="btn secondary" id="cfg_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="cfg_save">💾 ${t('save')}</button>
    </div>
  `;
  Sheet.open({
    titleText: t('setsRepsRest'),
    html,
    onOpen: (root)=>{
      root.querySelector('#cfg_cancel').onclick = Sheet.close;
      root.querySelector('#cfg_save').onclick = ()=>{
        const s = Math.max(1,Math.min(10,parseInt(root.querySelector('#cfg_sets').value||sets)));
        const min = Math.max(1,parseInt(root.querySelector('#cfg_min').value||rmin));
        const max = Math.max(min,parseInt(root.querySelector('#cfg_max').value||rmax));
        const r = Math.max(15,parseInt(root.querySelector('#cfg_rest').value||rest));
        onAdd(s,min,max,r);
      };
    }
  });
}

/* ===================== New Exercise Sheet ===================== */
function openNewExerciseForm(onDone){
  const eqOpts = Object.values(Equip).map(e=>`<label><input type="checkbox" data-eq="${e}"> ${equipTitle(e)}</label>`).join('<br>');
  const envOpts = [Env.home,Env.gym].map(e=>`<label><input type="checkbox" data-env="${e}" checked> ${t(e)}</label>`).join('<br>');
  const patOpts = Object.values(Pattern).map(p=>`<label><input type="checkbox" data-p="${p}"> ${p}</label>`).join('<br>');

  const html = `
    <div class="grid cols2">
      <div><label>${t('name')}</label><input id="nx_name" placeholder="${t('name')}"></div>
      <div><label>${t('muscle')}</label>
        <select id="nx_muscle">${Muscles.map(m=>`<option value="${m}">${mTitle(m)}</option>`).join('')}</select>
      </div>
    </div>
    <div class="group"><label>${t('patterns')}</label><div class="grid">${patOpts}</div></div>
    <div class="group"><label>${t('equipment')}</label><div class="grid">${eqOpts}</div></div>
    <div class="group"><label>${t('environment')}</label><div class="grid">${envOpts}</div></div>
    <div class="grid cols2">
      <label><input type="checkbox" id="nx_uni"> ${t('unilateralQ')}</label>
      <label><input type="checkbox" id="nx_beg" checked> ${t('beginnerQ')}</label>
    </div>
    <div class="group"><label>${t('instructions')}</label><textarea id="nx_ins" rows="3"></textarea></div>
    <div class="group"><label>${t('mediaURL')}</label><input id="nx_media" placeholder="https://..."></div>
    <div class="grid cols2">
      <button class="btn secondary" id="nx_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="nx_save">💾 ${t('save')}</button>
    </div>
    <div class="caption" style="margin-top:6px">${t('custom')}</div>
  `;
  Sheet.open({
    titleText: t('createExercise'),
    html,
    onOpen: (root)=>{
      root.querySelector('#nx_cancel').onclick = ()=> openPicker();
      setTimeout(()=>root.querySelector('#nx_name').focus(),50);
      root.querySelector('#nx_save').onclick = ()=>{
        const name = (root.querySelector('#nx_name').value||"").trim() || (Lang.get()==="es"?"Ejercicio sin nombre":"Untitled exercise");
        const muscle = root.querySelector('#nx_muscle').value;
        const pats=[...root.querySelectorAll('[data-p]')].filter(i=>i.checked).map(i=>i.dataset.p);
        const eq=[...root.querySelectorAll('[data-eq]')].filter(i=>i.checked).map(i=>i.dataset.eq);
        const env=[...root.querySelectorAll('[data-env]')].filter(i=>i.checked).map(i=>i.dataset.env);
        const unilateral = root.querySelector('#nx_uni').checked;
        const beginner = root.querySelector('#nx_beg').checked;
        const instructions = (root.querySelector('#nx_ins').value||"").trim() || (Lang.get()==="es"?"Ejercicio personalizado.":"Custom exercise.");
        const mediaURL = (root.querySelector('#nx_media').value||"").trim() || null;
        const ex = { id:makeId(), name, muscle, patterns: pats.length?pats:["hipHinge"], equipment: eq.length?eq:["bodyweight"], environment: env.length?env:["home","gym"], unilateral, beginnerFriendly: beginner, instructions, variant:`custom_${muscle}`, mediaURL };
        CustomStore.add(ex);
        EXERCISES.push(ex);
        onDone?.(ex);
      };
    }
  });
}

/* ===================== Favorites Sheet ===================== */
function openFavorites(){
  const list = Favorites.list();
  const html = `
    ${!list.length? `<div class="caption" style="padding:10px">${Lang.get()==="es"?"Aún no hay favoritos.":"No favorites yet."}</div>`: ""}
    <div>
      ${list.map((p,i)=>`
        <div class="card">
          <div class="row">
            <div>
              <div style="font-weight:700">${p.muscle?mTitle(p.muscle):t('fullBody')}</div>
              <div class="caption">${t(p.goal)} • ${p.durationMinutes} ${t('minutes').toLowerCase()}</div>
            </div>
            <div class="row-right">
              <button class="btn primary small" data-use="${i}">✔ ${t('use')}</button>
              <button class="btn secondary small" data-del="${i}">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  Sheet.open({
    titleText: t('favorites'),
    html,
    onOpen: (root)=>{
      root.querySelectorAll('[data-use]').forEach(b => b.onclick = ()=>{
        const plan = Favorites.list()[parseInt(b.dataset.use,10)];
        currentPlan = plan; Sheet.close(); renderAll();
      });
      root.querySelectorAll('[data-del]').forEach(b => b.onclick = ()=>{
        Favorites.removeAt(parseInt(b.dataset.del,10)); openFavorites();
      });
    }
  });
}

/* ===================== Settings Sheet ===================== */
function openSettings(){
  const cur = localStorage.getItem(Lang.key)||"es";
  const html = `
    <div class="group">
      <label>${t('language')}</label>
      <select id="s_lang">
        <option value="system">${t('systemLang')}</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
    <div class="group">
      <label>${t('feedback')}</label>
      <div><a href="mailto:paul_rios@engineer.com?subject=%5BApp%20Feedback%5D">✉️ Email</a></div>
    </div>
    <div class="group">
      <label>${t('supportDev')}</label>
      <div class="caption">${t('tipJar')} — ${Lang.get()==="es"?"(en web es informativo)":"(informational on web)"}.</div>
    </div>
  `;
  Sheet.open({
    titleText: t('settings'),
    html,
    onOpen: (root)=>{
      const sel = root.querySelector('#s_lang');
      sel.value = cur;
      sel.onchange = e => { Lang.set(e.target.value); renderAll(); };
    }
  });
}

/* ===================== Events & Boot ===================== */
$("#openFilters").onclick = openFilters;
$("#btnFilters").onclick = openFilters;
$("#btnFavorites").onclick = openFavorites;
$("#btnSettings").onclick = openSettings;
$("#generate").onclick = generate;

async function boot(){
  L = I18N[Lang.get()];
  applyStaticI18n();
  $("#subtitle").textContent = t("selectMuscle");
  EXERCISES = await loadExercises();
  renderAll();
}
boot();
