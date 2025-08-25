// ejercicios.js (global, sin módulos)
window.EXERCISES = [
  /* ===== PECHO ===== */
  { name:"Flexiones", muscle:"chest", patterns:["horizontalPush"], equipment:["bodyweight"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Manos bajo hombros, cuerpo en línea.", variant:"chest_pushup" },
  { name:"Flexiones inclinadas", muscle:"chest", patterns:["horizontalPush"], equipment:["bodyweight","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Manos elevadas; versión más fácil.", variant:"chest_incline" },
  { name:"Flexiones declinadas", muscle:"chest", patterns:["horizontalPush"], equipment:["bodyweight","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:false, instructions:"Pies elevados (énfasis porción superior).", variant:"chest_decline" },
  { name:"Press plano con mancuernas", muscle:"chest", patterns:["horizontalPush"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Escápulas retraídas, 2s abajo/1s arriba.", variant:"chest_db_flat" },
  { name:"Press inclinado con mancuernas", muscle:"chest", patterns:["horizontalPush"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"15–30°, controla la bajada.", variant:"chest_db_incline" },
  { name:"Press declinado con mancuernas", muscle:"chest", patterns:["horizontalPush"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Trayecto vertical, sin rebote.", variant:"chest_db_decline" },
  { name:"Aperturas planas (mancuernas)", muscle:"chest", patterns:["horizontalPush"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Codos semi-flex, estiramiento controlado.", variant:"chest_fly_flat" },
  { name:"Squeeze press (mancuernas)", muscle:"chest", patterns:["horizontalPush"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Mancuernas juntas; tensión continua.", variant:"chest_squeeze" },

  /* ===== ESPALDA ===== */
  { name:"Remo mancuerna un brazo", muscle:"back", patterns:["horizontalPull"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Tracción a la cadera, sin balanceo.", variant:"back_db_one" },
  { name:"Remo DB inclinado", muscle:"back", patterns:["horizontalPull"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Torso estable, columna neutra.", variant:"back_db_bent" },
  { name:"Remo con barra", muscle:"back", patterns:["horizontalPull"], equipment:["barbell"], environment:["home","gym"], unilateral:false, beginnerFriendly:false, instructions:"Torso 30–45°, evita encorvar.", variant:"back_bb_row" },
  { name:"Remo invertido (banco)", muscle:"back", patterns:["horizontalPull"], equipment:["bodyweight","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Cuerpo alineado, talones al piso.", variant:"back_inverted" },
  { name:"Pullover con mancuerna", muscle:"back", patterns:["verticalPull"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Codos semirrígidos, arco controlado.", variant:"back_pullover" },
  { name:"Pull-aparts con banda", muscle:"back", patterns:["horizontalPull"], equipment:["bands"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Retrae escápulas.", variant:"back_pullapart" },

  /* ===== CUÁDRICEPS ===== */
  { name:"Sentadilla goblet", muscle:"quads", patterns:["kneeDominant"], equipment:["dumbbells","kettlebell"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Rodillas siguen puntas, torso estable.", variant:"quads_goblet" },
  { name:"Split squat búlgaro", muscle:"quads", patterns:["kneeDominant"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Controla bajada, cadera estable.", variant:"quads_bulgarian" },
  { name:"Zancadas caminando", muscle:"quads", patterns:["kneeDominant"], equipment:["dumbbells"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Paso largo, tronco erguido.", variant:"quads_walk" },
  { name:"Step-up en banco", muscle:"quads", patterns:["kneeDominant"], equipment:["dumbbells","bench"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Impulsa desde el talón.", variant:"quads_stepup" },

  /* ===== FEMORAL (HAMSTRINGS) ===== */
  { name:"Peso muerto rumano (mancuernas)", muscle:"hamstrings", patterns:["hipHinge"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Cadera atrás, espalda neutra.", variant:"hams_rdl_db" },
  { name:"RDL a una pierna (DB)", muscle:"hamstrings", patterns:["hipHinge"], equipment:["dumbbells"], environment:["home","gym"], unilateral:true, beginnerFriendly:false, instructions:"Equilibrio, cadera cuadrada.", variant:"hams_rdl_single" },
  { name:"Buenos días con banda", muscle:"hamstrings", patterns:["hipHinge"], equipment:["bands"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Bisagra controlada.", variant:"hams_gm_band" },
  { name:"Curl femoral con banda (prono)", muscle:"hamstrings", patterns:["hipHinge"], equipment:["bands","bench"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Talones a glúteos; sin impulso.", variant:"hams_curl_band" },

  /* ===== GLÚTEOS ===== */
  { name:"Glute bridge", muscle:"glutes", patterns:["hipHinge"], equipment:["bodyweight"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Empuja talones; aprieta arriba.", variant:"glutes_bridge" },
  { name:"Glute bridge con banda", muscle:"glutes", patterns:["hipHinge"], equipment:["bodyweight","bands"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Banda sobre caderas; control.", variant:"glutes_bridge_band" },
  { name:"Puente unilateral", muscle:"glutes", patterns:["hipHinge"], equipment:["bodyweight"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Caderas niveladas.", variant:"glutes_bridge_uni" },
  { name:"Hip thrust (banco + DB)", muscle:"glutes", patterns:["hipHinge"], equipment:["bench","dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Retroversión pélvica; pausa 1s.", variant:"glutes_hipthrust" },

  /* ===== HOMBROS ===== */
  { name:"Press militar con mancuernas", muscle:"shoulders", patterns:["verticalPush"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Core firme; evita arco lumbar.", variant:"shoulders_db_press" },
  { name:"Elevación lateral", muscle:"shoulders", patterns:["verticalPush"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Sin impulso; rango medio.", variant:"shoulders_lateral" },
  { name:"Press con banda", muscle:"shoulders", patterns:["verticalPush"], equipment:["bands"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Bloqueo suave; control.", variant:"shoulders_band_press" },

  /* ===== BÍCEPS ===== */
  { name:"Curl supinado con mancuernas", muscle:"biceps", patterns:["elbowFlexion"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Codo quieto; excéntrica controlada.", variant:"biceps_curl_db" },
  { name:"Curl alterno", muscle:"biceps", patterns:["elbowFlexion"], equipment:["dumbbells"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Alterna brazos; sin balanceo.", variant:"biceps_alt" },
  { name:"Curl martillo", muscle:"biceps", patterns:["elbowFlexion"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Agarre neutro; antebrazos fuertes.", variant:"biceps_hammer" },

  /* ===== TRÍCEPS ===== */
  { name:"Extensión sobre cabeza (DB)", muscle:"triceps", patterns:["elbowExtension"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Codos fijos; evita arquear.", variant:"triceps_oh_db" },
  { name:"Kickback (DB)", muscle:"triceps", patterns:["elbowExtension"], equipment:["dumbbells"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Tronco estable; extensión total.", variant:"triceps_kickback" },
  { name:"Fondos entre bancos", muscle:"triceps", patterns:["elbowExtension"], equipment:["bench","bodyweight"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Hombros abajo; rango cómodo.", variant:"triceps_bench_dips" },

  /* ===== CORE ===== */
  { name:"Plancha frontal", muscle:"core", patterns:["abAntiExtension"], equipment:["bodyweight"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Costillas abajo; glúteos activos.", variant:"core_plank" },
  { name:"Plancha lateral", muscle:"core", patterns:["abLateralFlexion"], equipment:["bodyweight"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Cadera alta; cuello neutro.", variant:"core_side_plank" },
  { name:"Pallof press con banda", muscle:"core", patterns:["abAntiRotation"], equipment:["bands"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Resiste rotación; exhala al extender.", variant:"core_pallof" },

  /* ===== PANTORRILLAS ===== */
  { name:"Elevación de talones (de pie)", muscle:"calves", patterns:["calfRaise"], equipment:["bodyweight"], environment:["home","gym"], unilateral:false, beginnerFriendly:true, instructions:"Pausa 1s arriba; controla bajada.", variant:"calves_standing" },
  { name:"Elevación de talón unilateral", muscle:"calves", patterns:["calfRaise"], equipment:["bodyweight"], environment:["home","gym"], unilateral:true, beginnerFriendly:true, instructions:"Busca equilibrio; rango completo.", variant:"calves_single" },
];
// Puedes añadir mediaURL: "...mp4/.gif" para que se abra en el modal interno.
