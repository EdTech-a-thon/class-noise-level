/**
 * Every word the teacher or the class reads, in each language on offer.
 *
 * English is the source: its keys are the type every other language must
 * fill, so a missing translation is a type error rather than a blank button.
 * The choice is remembered on this computer, like the rest of the settings.
 */

import { browser } from "$app/environment";

export type LanguageCode = "en" | "es" | "fr";

const en = {
  name: "English",
  locale: "en",
  ui: {
    "language.change": "Change language",
    "app.pageTitle": "Shy Safari — classroom noise level",
    "app.description":
      "A calm safari where shy animals come out the longer a classroom stays quiet.",
    "brand.title": "Built by teacher.dev",
    "common.builtBy": "Built by teacher.dev",
    "common.about": "about",
    "common.privacy": "privacy",
    "common.back": "← Back to Shy Safari",
    "common.close": "Close",
    "common.cancel": "Cancel",
    "common.done": "Done",
    "fullScreen.enter": "Full screen",
    "fullScreen.exit": "Exit full screen",
    "start.shy": "Shh… these animals are shy!",
    "start.explain":
      "If it gets too loud, they stay hidden. When the room is calm again, they'll start coming out.",
    "start.button": "Start",
    "start.micNote":
      "Your browser will ask to use the microphone. Audio is measured on this computer and never recorded or sent anywhere.",
    "scene.label": "Scene",
    "scene.savanna.name": "Savanna",
    "scene.savanna.hint": "Zebras, giraffes and lions",
    "scene.reef.name": "Coral reef",
    "scene.reef.hint": "Fish, turtles and sharks",
    "controls.reset": "Reset",
    "controls.confirmReset": "Confirm reset",
    "controls.resetQuestion": "Empty this scene and start over?",
    "controls.resetYes": "Yes, reset",
    "controls.keepGoing": "Keep going",
    "controls.settings": "Settings",
    "controls.animals": "Animals",
    "settings.title": "Settings",
    "settings.microphone": "Microphone",
    "settings.meter": "Noise Meter",
    "start.explainFlee":
      "If it gets too loud, they'll run away! Keep the room calm and they'll come out and stay.",
    "settings.tooLoud": "When it's too loud",
    "loud.flee.label": "Animals run away",
    "loud.flee.hint":
      "Everyone freezes, and some run off every 5 seconds until it's calm",
    "loud.pause.label": "Pause the scene",
    "loud.pause.hint": "Animals hold still and no new ones come out",
    "settings.arrival": "How often animals arrive",
    "settings.aboutEvery": "About one animal every",
    "settings.minutes": "minutes",
    "settings.tryIt": "Try it out",
    "settings.summon": "Bring out every animal",
    "settings.savedNote":
      "Settings are saved on this computer only. Microphone audio never leaves the device.",
    "goal.silent.label": "Silent",
    "goal.silent.hint": "No talking at all",
    "goal.independent.label": "Independent",
    "goal.independent.hint": "Quiet whispers only",
    "goal.partner.label": "Partner work",
    "goal.partner.hint": "Conversation voices",
    "rate.relaxed": "Relaxed",
    "rate.normal": "Normal",
    "rate.lively": "Lively",
    "rate.hint": "about one animal every {minutes} minutes",
    "mic.default": "Default microphone",
    "mic.numbered": "Microphone {number}",
    "mic.connecting": "Connecting…",
    "mic.connect": "Connect microphone",
    "meter.current": "Current volume",
    "meter.paused": "Paused — too loud",
    "meter.arriving": "Animals are arriving",
    "meter.goal":
      "Animals arrive while the room stays left of the line ({goal}%)",
    "calibration.title": "Calibration",
    "calibration.needMic": "Connect a microphone first",
    "calibration.calibrated": "✓ Calibrated",
    "calibration.fit": "Fit the meter to your microphone",
    "calibration.calibrate": "Calibrate",
    "calibration.recalibrate": "Recalibrate",
    "calibration.dialogTitle": "Calibrate this room",
    "calibration.progress": "Progress",
    "calibration.stepQuiet": "Quiet room",
    "calibration.stepTalking": "Normal talking",
    "calibration.stepDone": "Done",
    "calibration.introLead": "Step 1:",
    "calibration.intro":
      "ask the class to be completely silent. When ready, we will sample for {seconds} seconds.",
    "calibration.quietButton": "The room is quiet!",
    "calibration.listening": "Listening:",
    "calibration.quietLeft": "keep the room silent for {seconds} more seconds…",
    "calibration.readyLead": "Step 2:",
    "calibration.ready": "ask the class to talk at a normal working volume.",
    "calibration.talkingButton": "The class is talking!",
    "calibration.talkingLeft":
      "keep talking normally for {seconds} more seconds…",
    "calibration.doneLead": "Calibrated.",
    "calibration.done":
      "The meter now reads on this room's scale — check that the goal line still sits where you want it.",
    "calibration.retryLead": "Let's try that again.",
    "calibration.retry":
      "Those two samples were too close together to tell apart — the room may not have been quiet, or the microphone may not be picking up the class.",
    "calibration.startAgain": "Start again",
    "calibration.hears": "What the microphone hears",
    "collection.title": "Animals",
    "collection.spotted": "{seen} of {total} spotted on this computer",
    "collection.notSeen": "Not seen yet",
    "collection.seen": "Seen {count}×",
    "tier.common": "Common",
    "tier.uncommon": "Uncommon",
    "tier.rare": "Rare",
    "chance.common.label": "Chance of common animals",
    "chance.uncommon.label": "Chance of uncommon animals",
    "chance.rare.label": "Chance of rare animals",
    "chance.common": "{percent}% of arrivals are common",
    "chance.uncommon": "{percent}% of arrivals are uncommon",
    "chance.rare": "{percent}% of arrivals are rare",
    "blocked.title": "The animals need to hear the room",
    "blocked.denied":
      "This browser blocked access to the microphone. Click the padlock or camera icon in the address bar, allow the microphone, then try again.",
    "blocked.missing":
      "That microphone is no longer available. Choose a different one below and try again.",
    "blocked.unsupported":
      "This browser cannot use a microphone. Chrome, Edge and Safari all work.",
    "blocked.tryAgain": "Try again",
    "about.pageTitle": "About — Shy Safari",
    "about.meta":
      "Shy Safari is a free, ad-free classroom noise-level tool built by teacher.dev.",
    "about.title": "About",
    "about.lede":
      "A calm safari where shy animals come out the longer a classroom stays quiet.",
    "about.originTitle": "From the EdTech-a-thon",
    "about.origin.beforeEvent": "Shy Safari came out of the ",
    "about.origin.afterEvent":
      ", a community of builders making free tools for classrooms. It is maintained by ",
    "about.origin.afterTeacher":
      ", where you can find the rest of what we are building.",
    "about.photoAlt": "Participants of the 2026 EdTech-a-thon",
    "about.purposeTitle": "What it is for",
    "about.purpose":
      "Put a savanna or a coral reef on the board and press start. While the room stays under the volume goal, shy animals come out one by one; when it gets too loud, they wait until it is calm again. Nothing is ever taken away, so a noisy moment pauses the reward rather than punishing the class. Common animals turn up often and rare ones are a treat, and the collection remembers every animal the class has spotted.",
    "about.promiseTitle": "Our promise",
    "about.promise.paywalls": "Zero paywalls.",
    "about.promise.ads": "Zero ads.",
    "about.promise.tracking": "Zero tracking of personal data.",
    "about.feedbackTitle": "Feedback & ideas",
    "about.feedback":
      "We'd love to hear from you. Tell us what's working, what's not, or pitch us an idea for a tool you wish existed. We're here to help.",
    "about.email": "Email support@teacher.dev",
    "privacy.pageTitle": "Privacy — Shy Safari",
    "privacy.meta": "What Shy Safari collects, what it doesn't, and why.",
    "privacy.title": "Privacy",
    "privacy.lede": "What we collect, what we don't, and why.",
    "privacy.microphone":
      "Shy Safari listens through your microphone only to measure how loud the room is. The sound is turned into a single volume level on this computer, moment by moment; it is never recorded, never saved, and never sent anywhere.",
    "privacy.local":
      "There are no accounts, and we do not collect personal information from teachers or students. Your settings, your calibration and the animals your class has spotted are kept in this browser's local storage on this computer only, and clearing your browser data removes them.",
    "privacy.analytics.beforeLink":
      "We use Cloudflare Web Analytics to anonymously count visits, which helps us understand how Shy Safari is being used in classrooms. Cloudflare Web Analytics is cookieless, does not fingerprint visitors, and does not track users across other sites; see Cloudflare's ",
    "privacy.analytics.link": "privacy policy",
    "privacy.analytics.afterLink":
      " for details. We do not share, sell, or otherwise transfer any visitor data to third parties.",
    "privacy.contact": "Questions or concerns? Email ",
  },
  creatures: {
    meerkat: "Meerkat",
    warthog: "Warthog",
    zebra: "Zebra",
    gazelle: "Thomson's gazelle",
    ostrich: "Ostrich",
    "guinea-fowl": "Guinea fowl",
    tortoise: "Tortoise",
    hornbill: "Hornbill",
    giraffe: "Giraffe",
    hippo: "Hippo",
    rhino: "Rhino",
    cheetah: "Cheetah",
    flamingo: "Flamingo",
    vulture: "Vulture",
    lion: "Lion",
    leopard: "Leopard",
    elephant: "Elephant",
    clownfish: "Clownfish",
    "blue-tang": "Blue tang",
    angelfish: "Angelfish",
    seahorse: "Seahorse",
    starfish: "Starfish",
    crab: "Crab",
    shrimp: "Shrimp",
    parrotfish: "Parrotfish",
    pufferfish: "Pufferfish",
    octopus: "Octopus",
    "sea-turtle": "Sea turtle",
    "moray-eel": "Moray eel",
    stingray: "Stingray",
    "jellyfish-bloom": "Jellyfish bloom",
    cuttlefish: "Cuttlefish",
    "hammerhead-shark": "Hammerhead shark",
    "manta-ray": "Manta ray",
    "whale-shark": "Whale shark",
  },
} as const;

export type UiKey = keyof typeof en.ui;
type CreatureSlug = keyof typeof en.creatures;
type Language = {
  readonly name: string;
  readonly locale: string;
  readonly ui: Record<UiKey, string>;
  readonly creatures: Record<CreatureSlug, string>;
};

const es = {
  name: "Español",
  locale: "es",
  ui: {
    "language.change": "Cambiar idioma",
    "app.pageTitle": "Shy Safari — nivel de ruido en el aula",
    "app.description":
      "Un safari tranquilo donde los animales tímidos salen cuanto más tiempo se mantiene el aula en silencio.",
    "brand.title": "Creado por teacher.dev",
    "common.builtBy": "Creado por teacher.dev",
    "common.about": "acerca de",
    "common.privacy": "privacidad",
    "common.back": "← Volver a Shy Safari",
    "common.close": "Cerrar",
    "common.cancel": "Cancelar",
    "common.done": "Listo",
    "fullScreen.enter": "Pantalla completa",
    "fullScreen.exit": "Salir de pantalla completa",
    "start.shy": "Shh… ¡estos animales son tímidos!",
    "start.explain":
      "Si hay demasiado ruido, se quedan escondidos. Cuando el aula vuelva a estar tranquila, empezarán a salir.",
    "start.button": "Empezar",
    "start.micNote":
      "El navegador pedirá permiso para usar el micrófono. El sonido se mide en esta computadora y nunca se graba ni se envía a ningún sitio.",
    "scene.label": "Escena",
    "scene.savanna.name": "Sabana",
    "scene.savanna.hint": "Cebras, jirafas y leones",
    "scene.reef.name": "Arrecife de coral",
    "scene.reef.hint": "Peces, tortugas y tiburones",
    "controls.reset": "Reiniciar",
    "controls.confirmReset": "Confirmar reinicio",
    "controls.resetQuestion": "¿Vaciar esta escena y empezar de nuevo?",
    "controls.resetYes": "Sí, reiniciar",
    "controls.keepGoing": "Seguir",
    "controls.settings": "Ajustes",
    "controls.animals": "Animales",
    "settings.title": "Ajustes",
    "settings.microphone": "Micrófono",
    "settings.meter": "Medidor de ruido",
    "start.explainFlee":
      "¡Si hay demasiado ruido, se escaparán! Mantengan el aula tranquila y saldrán y se quedarán.",
    "settings.tooLoud": "Cuando hay demasiado ruido",
    "loud.flee.label": "Los animales se escapan",
    "loud.flee.hint":
      "Todos se quedan quietos y algunos se escapan cada 5 segundos hasta que vuelva la calma",
    "loud.pause.label": "Pausar la escena",
    "loud.pause.hint": "Los animales se quedan quietos y no sale ninguno nuevo",
    "settings.arrival": "Con qué frecuencia llegan animales",
    "settings.aboutEvery": "Más o menos un animal cada",
    "settings.minutes": "minutos",
    "settings.tryIt": "Pruébalo",
    "settings.summon": "Sacar a todos los animales",
    "settings.savedNote":
      "Los ajustes se guardan solo en esta computadora. El sonido del micrófono nunca sale del dispositivo.",
    "goal.silent.label": "Silencio",
    "goal.silent.hint": "Nada de hablar",
    "goal.independent.label": "Individual",
    "goal.independent.hint": "Solo susurros",
    "goal.partner.label": "En parejas",
    "goal.partner.hint": "Voz de conversación",
    "rate.relaxed": "Tranquilo",
    "rate.normal": "Normal",
    "rate.lively": "Animado",
    "rate.hint": "más o menos un animal cada {minutes} minutos",
    "mic.default": "Micrófono predeterminado",
    "mic.numbered": "Micrófono {number}",
    "mic.connecting": "Conectando…",
    "mic.connect": "Conectar el micrófono",
    "meter.current": "Volumen actual",
    "meter.paused": "En pausa — demasiado ruido",
    "meter.arriving": "Están llegando animales",
    "meter.goal":
      "Los animales llegan mientras el aula se mantiene a la izquierda de la línea ({goal}%)",
    "calibration.title": "Calibración",
    "calibration.needMic": "Primero conecta un micrófono",
    "calibration.calibrated": "✓ Calibrado",
    "calibration.fit": "Ajusta el medidor a tu micrófono",
    "calibration.calibrate": "Calibrar",
    "calibration.recalibrate": "Volver a calibrar",
    "calibration.dialogTitle": "Calibrar esta aula",
    "calibration.progress": "Progreso",
    "calibration.stepQuiet": "Aula en silencio",
    "calibration.stepTalking": "Conversación normal",
    "calibration.stepDone": "Listo",
    "calibration.introLead": "Paso 1:",
    "calibration.intro":
      "pide a la clase que guarde silencio total. Cuando estén listos, escucharemos durante {seconds} segundos.",
    "calibration.quietButton": "¡El aula está en silencio!",
    "calibration.listening": "Escuchando:",
    "calibration.quietLeft": "mantengan el silencio {seconds} segundos más…",
    "calibration.readyLead": "Paso 2:",
    "calibration.ready":
      "pide a la clase que hable al volumen normal de trabajo.",
    "calibration.talkingButton": "¡La clase está hablando!",
    "calibration.talkingLeft":
      "sigan hablando con normalidad {seconds} segundos más…",
    "calibration.doneLead": "Calibrado.",
    "calibration.done":
      "El medidor ya usa la escala de esta aula: comprueba que la línea del objetivo sigue donde la quieres.",
    "calibration.retryLead": "Probemos otra vez.",
    "calibration.retry":
      "Las dos muestras eran demasiado parecidas para distinguirlas: puede que el aula no estuviera en silencio o que el micrófono no capte a la clase.",
    "calibration.startAgain": "Empezar de nuevo",
    "calibration.hears": "Lo que oye el micrófono",
    "collection.title": "Animales",
    "collection.spotted": "{seen} de {total} vistos en esta computadora",
    "collection.notSeen": "Aún no visto",
    "collection.seen": "Visto {count}×",
    "tier.common": "Comunes",
    "tier.uncommon": "Poco comunes",
    "tier.rare": "Raros",
    "chance.common.label": "Probabilidad de animales comunes",
    "chance.uncommon.label": "Probabilidad de animales poco comunes",
    "chance.rare.label": "Probabilidad de animales raros",
    "chance.common": "El {percent}% de las llegadas son comunes",
    "chance.uncommon": "El {percent}% de las llegadas son poco comunes",
    "chance.rare": "El {percent}% de las llegadas son raras",
    "blocked.title": "Los animales necesitan oír el aula",
    "blocked.denied":
      "Este navegador bloqueó el acceso al micrófono. Haz clic en el candado o en el icono de la cámara de la barra de direcciones, permite el micrófono y vuelve a intentarlo.",
    "blocked.missing":
      "Ese micrófono ya no está disponible. Elige otro abajo y vuelve a intentarlo.",
    "blocked.unsupported":
      "Este navegador no puede usar un micrófono. Chrome, Edge y Safari funcionan.",
    "blocked.tryAgain": "Volver a intentarlo",
    "about.pageTitle": "Acerca de — Shy Safari",
    "about.meta":
      "Shy Safari es una herramienta gratuita y sin anuncios para el nivel de ruido en el aula, creada por teacher.dev.",
    "about.title": "Acerca de",
    "about.lede":
      "Un safari tranquilo donde los animales tímidos salen cuanto más tiempo se mantiene el aula en silencio.",
    "about.originTitle": "Del EdTech-a-thon",
    "about.origin.beforeEvent": "Shy Safari nació en el ",
    "about.origin.afterEvent":
      ", una comunidad de creadores que hacen herramientas gratuitas para las aulas. Lo mantiene ",
    "about.origin.afterTeacher":
      ", donde puedes encontrar el resto de lo que estamos creando.",
    "about.photoAlt": "Participantes del EdTech-a-thon 2026",
    "about.purposeTitle": "Para qué sirve",
    "about.purpose":
      "Proyecta una sabana o un arrecife de coral y pulsa empezar. Mientras el aula se mantenga por debajo del objetivo de volumen, los animales tímidos salen uno a uno; si hay demasiado ruido, esperan a que vuelva la calma. Nunca se quita nada, así que un momento ruidoso pausa la recompensa en lugar de castigar a la clase. Los animales comunes aparecen a menudo y los raros son una sorpresa, y la colección recuerda cada animal que la clase ha visto.",
    "about.promiseTitle": "Nuestra promesa",
    "about.promise.paywalls": "Cero muros de pago.",
    "about.promise.ads": "Cero anuncios.",
    "about.promise.tracking": "Cero seguimiento de datos personales.",
    "about.feedbackTitle": "Comentarios e ideas",
    "about.feedback":
      "Nos encantaría saber de ti. Cuéntanos qué funciona, qué no, o propón una idea para una herramienta que te gustaría que existiera. Estamos aquí para ayudar.",
    "about.email": "Escribir a support@teacher.dev",
    "privacy.pageTitle": "Privacidad — Shy Safari",
    "privacy.meta": "Qué recopila Shy Safari, qué no y por qué.",
    "privacy.title": "Privacidad",
    "privacy.lede": "Qué recopilamos, qué no y por qué.",
    "privacy.microphone":
      "Shy Safari escucha por el micrófono solo para medir cuánto ruido hay en el aula. El sonido se convierte en un único nivel de volumen en esta computadora, momento a momento; nunca se graba, nunca se guarda y nunca se envía a ningún sitio.",
    "privacy.local":
      "No hay cuentas y no recopilamos información personal de docentes ni estudiantes. Tus ajustes, tu calibración y los animales que ha visto tu clase se guardan en el almacenamiento local de este navegador, solo en esta computadora; al borrar los datos del navegador se eliminan.",
    "privacy.analytics.beforeLink":
      "Usamos Cloudflare Web Analytics para contar las visitas de forma anónima, lo que nos ayuda a entender cómo se usa Shy Safari en las aulas. Cloudflare Web Analytics no usa cookies, no crea huellas digitales de los visitantes y no los rastrea en otros sitios; consulta la ",
    "privacy.analytics.link": "política de privacidad",
    "privacy.analytics.afterLink":
      " de Cloudflare para más detalles. No compartimos, vendemos ni transferimos de ningún otro modo los datos de los visitantes a terceros.",
    "privacy.contact": "¿Tienes preguntas o dudas? Escribe a ",
  },
  creatures: {
    meerkat: "Suricata",
    warthog: "Facóquero",
    zebra: "Cebra",
    gazelle: "Gacela de Thomson",
    ostrich: "Avestruz",
    "guinea-fowl": "Pintada",
    tortoise: "Tortuga",
    hornbill: "Cálao",
    giraffe: "Jirafa",
    hippo: "Hipopótamo",
    rhino: "Rinoceronte",
    cheetah: "Guepardo",
    flamingo: "Flamenco",
    vulture: "Buitre",
    lion: "León",
    leopard: "Leopardo",
    elephant: "Elefante",
    clownfish: "Pez payaso",
    "blue-tang": "Cirujano azul",
    angelfish: "Pez ángel",
    seahorse: "Caballito de mar",
    starfish: "Estrella de mar",
    crab: "Cangrejo",
    shrimp: "Camarón",
    parrotfish: "Pez loro",
    pufferfish: "Pez globo",
    octopus: "Pulpo",
    "sea-turtle": "Tortuga marina",
    "moray-eel": "Morena",
    stingray: "Raya",
    "jellyfish-bloom": "Banco de medusas",
    cuttlefish: "Sepia",
    "hammerhead-shark": "Tiburón martillo",
    "manta-ray": "Mantarraya",
    "whale-shark": "Tiburón ballena",
  },
} satisfies Language;

const fr = {
  name: "Français",
  locale: "fr",
  ui: {
    "language.change": "Changer de langue",
    "app.pageTitle": "Shy Safari — niveau sonore en classe",
    "app.description":
      "Un safari paisible où des animaux timides sortent tant que la classe reste calme.",
    "brand.title": "Créé par teacher.dev",
    "common.builtBy": "Créé par teacher.dev",
    "common.about": "à propos",
    "common.privacy": "confidentialité",
    "common.back": "← Retour à Shy Safari",
    "common.close": "Fermer",
    "common.cancel": "Annuler",
    "common.done": "Terminé",
    "fullScreen.enter": "Plein écran",
    "fullScreen.exit": "Quitter le plein écran",
    "start.shy": "Chut… ces animaux sont timides !",
    "start.explain":
      "S’il y a trop de bruit, ils restent cachés. Quand la classe redevient calme, ils commencent à sortir.",
    "start.button": "Commencer",
    "start.micNote":
      "Le navigateur va demander l’accès au micro. Le son est mesuré sur cet ordinateur ; il n’est jamais enregistré ni envoyé nulle part.",
    "scene.label": "Décor",
    "scene.savanna.name": "Savane",
    "scene.savanna.hint": "Zèbres, girafes et lions",
    "scene.reef.name": "Récif de corail",
    "scene.reef.hint": "Poissons, tortues et requins",
    "controls.reset": "Réinitialiser",
    "controls.confirmReset": "Confirmer la réinitialisation",
    "controls.resetQuestion": "Vider ce décor et tout recommencer ?",
    "controls.resetYes": "Oui, réinitialiser",
    "controls.keepGoing": "Continuer",
    "controls.settings": "Réglages",
    "controls.animals": "Animaux",
    "settings.title": "Réglages",
    "settings.microphone": "Micro",
    "settings.meter": "Sonomètre",
    "start.explainFlee":
      "S’il y a trop de bruit, ils s’enfuient ! Gardez la classe calme et ils sortiront et resteront.",
    "settings.tooLoud": "Quand il y a trop de bruit",
    "loud.flee.label": "Les animaux s’enfuient",
    "loud.flee.hint":
      "Tout le monde se fige, et certains s’enfuient toutes les 5 secondes jusqu’au retour du calme",
    "loud.pause.label": "Mettre la scène en pause",
    "loud.pause.hint": "Les animaux restent immobiles et aucun nouveau ne sort",
    "settings.arrival": "Fréquence d’arrivée des animaux",
    "settings.aboutEvery": "Environ un animal toutes les",
    "settings.minutes": "minutes",
    "settings.tryIt": "Essayer",
    "settings.summon": "Faire sortir tous les animaux",
    "settings.savedNote":
      "Les réglages sont enregistrés sur cet ordinateur uniquement. Le son du micro ne quitte jamais l’appareil.",
    "goal.silent.label": "Silence",
    "goal.silent.hint": "Personne ne parle",
    "goal.independent.label": "Travail seul",
    "goal.independent.hint": "Chuchotements seulement",
    "goal.partner.label": "En binôme",
    "goal.partner.hint": "Voix de conversation",
    "rate.relaxed": "Tranquille",
    "rate.normal": "Normal",
    "rate.lively": "Animé",
    "rate.hint": "environ un animal toutes les {minutes} minutes",
    "mic.default": "Micro par défaut",
    "mic.numbered": "Micro {number}",
    "mic.connecting": "Connexion…",
    "mic.connect": "Connecter le micro",
    "meter.current": "Volume actuel",
    "meter.paused": "En pause — trop de bruit",
    "meter.arriving": "Les animaux arrivent",
    "meter.goal":
      "Les animaux arrivent tant que la classe reste à gauche de la ligne ({goal} %)",
    "calibration.title": "Étalonnage",
    "calibration.needMic": "Connectez d’abord un micro",
    "calibration.calibrated": "✓ Étalonné",
    "calibration.fit": "Adapter le sonomètre à votre micro",
    "calibration.calibrate": "Étalonner",
    "calibration.recalibrate": "Réétalonner",
    "calibration.dialogTitle": "Étalonner cette salle",
    "calibration.progress": "Progression",
    "calibration.stepQuiet": "Salle silencieuse",
    "calibration.stepTalking": "Conversation normale",
    "calibration.stepDone": "Terminé",
    "calibration.introLead": "Étape 1 :",
    "calibration.intro":
      "demandez à la classe de faire un silence complet. Quand c’est prêt, nous écouterons pendant {seconds} secondes.",
    "calibration.quietButton": "La salle est silencieuse !",
    "calibration.listening": "Écoute :",
    "calibration.quietLeft": "gardez le silence encore {seconds} secondes…",
    "calibration.readyLead": "Étape 2 :",
    "calibration.ready":
      "demandez à la classe de parler au volume habituel du travail.",
    "calibration.talkingButton": "La classe parle !",
    "calibration.talkingLeft":
      "continuez à parler normalement encore {seconds} secondes…",
    "calibration.doneLead": "Étalonné.",
    "calibration.done":
      "Le sonomètre suit maintenant l’échelle de cette salle — vérifiez que la ligne d’objectif est toujours là où vous la voulez.",
    "calibration.retryLead": "Essayons encore une fois.",
    "calibration.retry":
      "Les deux mesures étaient trop proches pour être distinguées — la salle n’était peut-être pas silencieuse, ou le micro ne capte pas la classe.",
    "calibration.startAgain": "Recommencer",
    "calibration.hears": "Ce que le micro entend",
    "collection.title": "Animaux",
    "collection.spotted": "{seen} sur {total} aperçus sur cet ordinateur",
    "collection.notSeen": "Pas encore vu",
    "collection.seen": "Vu {count}×",
    "tier.common": "Communs",
    "tier.uncommon": "Peu communs",
    "tier.rare": "Rares",
    "chance.common.label": "Probabilité des animaux communs",
    "chance.uncommon.label": "Probabilité des animaux peu communs",
    "chance.rare.label": "Probabilité des animaux rares",
    "chance.common": "{percent} % des arrivées sont communes",
    "chance.uncommon": "{percent} % des arrivées sont peu communes",
    "chance.rare": "{percent} % des arrivées sont rares",
    "blocked.title": "Les animaux ont besoin d’entendre la classe",
    "blocked.denied":
      "Ce navigateur a bloqué l’accès au micro. Cliquez sur le cadenas ou l’icône de caméra dans la barre d’adresse, autorisez le micro, puis réessayez.",
    "blocked.missing":
      "Ce micro n’est plus disponible. Choisissez-en un autre ci-dessous et réessayez.",
    "blocked.unsupported":
      "Ce navigateur ne peut pas utiliser de micro. Chrome, Edge et Safari fonctionnent tous.",
    "blocked.tryAgain": "Réessayer",
    "about.pageTitle": "À propos — Shy Safari",
    "about.meta":
      "Shy Safari est un outil gratuit et sans publicité pour gérer le niveau sonore en classe, créé par teacher.dev.",
    "about.title": "À propos",
    "about.lede":
      "Un safari paisible où des animaux timides sortent tant que la classe reste calme.",
    "about.originTitle": "Né à l’EdTech-a-thon",
    "about.origin.beforeEvent": "Shy Safari est né à l’",
    "about.origin.afterEvent":
      ", une communauté de créateurs qui conçoivent des outils gratuits pour les classes. Il est maintenu par ",
    "about.origin.afterTeacher":
      ", où vous trouverez tout ce que nous construisons d’autre.",
    "about.photoAlt": "Participants de l’EdTech-a-thon 2026",
    "about.purposeTitle": "À quoi ça sert",
    "about.purpose":
      "Affichez une savane ou un récif de corail au tableau et appuyez sur Commencer. Tant que la classe reste sous l’objectif de volume, des animaux timides sortent un à un ; quand il y a trop de bruit, ils attendent le retour du calme. Rien n’est jamais retiré : un moment bruyant met la récompense en pause au lieu de punir la classe. Les animaux communs se montrent souvent, les rares sont une belle surprise, et la collection se souvient de chaque animal que la classe a aperçu.",
    "about.promiseTitle": "Notre promesse",
    "about.promise.paywalls": "Aucun accès payant.",
    "about.promise.ads": "Aucune publicité.",
    "about.promise.tracking": "Aucun suivi des données personnelles.",
    "about.feedbackTitle": "Avis et idées",
    "about.feedback":
      "Nous serions ravis d’avoir de vos nouvelles. Dites-nous ce qui fonctionne, ce qui ne fonctionne pas, ou proposez-nous l’idée d’un outil que vous aimeriez voir exister. Nous sommes là pour vous aider.",
    "about.email": "Écrire à support@teacher.dev",
    "privacy.pageTitle": "Confidentialité — Shy Safari",
    "privacy.meta":
      "Ce que Shy Safari collecte, ce qu’il ne collecte pas, et pourquoi.",
    "privacy.title": "Confidentialité",
    "privacy.lede":
      "Ce que nous collectons, ce que nous ne collectons pas, et pourquoi.",
    "privacy.microphone":
      "Shy Safari écoute par le micro uniquement pour mesurer le niveau sonore de la classe. Le son est transformé en un simple niveau de volume sur cet ordinateur, instant après instant ; il n’est jamais enregistré, jamais conservé et jamais envoyé nulle part.",
    "privacy.local":
      "Il n’y a pas de compte, et nous ne collectons aucune information personnelle sur les enseignants ou les élèves. Vos réglages, votre étalonnage et les animaux aperçus par votre classe sont conservés dans le stockage local de ce navigateur, sur cet ordinateur uniquement ; effacer les données du navigateur les supprime.",
    "privacy.analytics.beforeLink":
      "Nous utilisons Cloudflare Web Analytics pour compter les visites de façon anonyme, ce qui nous aide à comprendre comment Shy Safari est utilisé en classe. Cloudflare Web Analytics n’utilise pas de cookies, ne crée pas d’empreinte des visiteurs et ne les suit pas sur d’autres sites ; consultez la ",
    "privacy.analytics.link": "politique de confidentialité",
    "privacy.analytics.afterLink":
      " de Cloudflare pour en savoir plus. Nous ne partageons, ne vendons ni ne transférons d’aucune autre manière les données des visiteurs à des tiers.",
    "privacy.contact": "Des questions ou des inquiétudes ? Écrivez à ",
  },
  creatures: {
    meerkat: "Suricate",
    warthog: "Phacochère",
    zebra: "Zèbre",
    gazelle: "Gazelle de Thomson",
    ostrich: "Autruche",
    "guinea-fowl": "Pintade",
    tortoise: "Tortue",
    hornbill: "Calao",
    giraffe: "Girafe",
    hippo: "Hippopotame",
    rhino: "Rhinocéros",
    cheetah: "Guépard",
    flamingo: "Flamant rose",
    vulture: "Vautour",
    lion: "Lion",
    leopard: "Léopard",
    elephant: "Éléphant",
    clownfish: "Poisson-clown",
    "blue-tang": "Chirurgien bleu",
    angelfish: "Poisson-ange",
    seahorse: "Hippocampe",
    starfish: "Étoile de mer",
    crab: "Crabe",
    shrimp: "Crevette",
    parrotfish: "Poisson-perroquet",
    pufferfish: "Poisson-globe",
    octopus: "Pieuvre",
    "sea-turtle": "Tortue marine",
    "moray-eel": "Murène",
    stingray: "Raie",
    "jellyfish-bloom": "Banc de méduses",
    cuttlefish: "Seiche",
    "hammerhead-shark": "Requin-marteau",
    "manta-ray": "Raie manta",
    "whale-shark": "Requin-baleine",
  },
} satisfies Language;

const languages: Record<LanguageCode, Language> = { en, es, fr };
const STORAGE_KEY = "class-noise-level:language";

export const languageOptions = (Object.keys(languages) as LanguageCode[]).map(
  (code) => ({ code, name: languages[code].name }),
);

export const language = $state<{ code: LanguageCode }>({ code: "en" });
let initialized = false;

function browserCode(): LanguageCode | null {
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of preferred) {
    const code = String(tag ?? "")
      .toLowerCase()
      .split("-")[0];
    if (code in languages) return code as LanguageCode;
  }
  return null;
}

/**
 * The page is prerendered in English; this picks the saved language, or the
 * browser's own, once it is running in a browser.
 */
export function initializeLanguage() {
  if (!browser || initialized) return;
  initialized = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in languages) {
      language.code = saved as LanguageCode;
      return;
    }
  } catch {
    // Private browsing may refuse storage; the language still works this visit.
  }
  language.code = browserCode() ?? "en";
}

export function setLanguage(code: string) {
  if (!(code in languages)) return;
  language.code = code as LanguageCode;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Keep the in-memory choice when storage is unavailable.
  }
}

export function current(): Language {
  return languages[language.code] ?? en;
}

export function t(key: UiKey, values: Record<string, string | number> = {}) {
  const text = current().ui[key] ?? en.ui[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) =>
    values[name] === undefined ? match : String(values[name]),
  );
}

/** A Creature's name, by the slug its artwork is filed under. */
export function creatureName(slug: string): string {
  return current().creatures[slug as CreatureSlug] ?? slug;
}
