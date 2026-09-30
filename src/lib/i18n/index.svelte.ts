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
    "app.pageTitle": "Shy Safari — free classroom noise level monitor",
    "app.description":
      "A free classroom noise monitor for the projector. Shy savanna and coral reef animals come out the longer the room stays quiet. No sign-up, nothing recorded.",
    "brand.title": "Built by teacher.dev",
    "common.builtBy": "Built by teacher.dev",
    "common.about": "about",
    "common.privacy": "privacy",
    "common.howItWorks": "how it works",
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
    "controls.pause": "Pause",
    "controls.pauseHint":
      "Stop listening for a moment, so you can talk to the class",
    "controls.resume": "Resume",
    "paused.status": "Noise meter paused",
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
    "guide.title": "How Shy Safari works",
    "guide.lede":
      "A free classroom noise level monitor that rewards quiet instead of punishing noise.",
    "guide.whatTitle": "What it is",
    "guide.what":
      "Shy Safari is a classroom noise monitor that runs in a web browser. Put it on the projector or interactive whiteboard and it shows a calm savanna or coral reef. It listens to how loud the room is through the computer's microphone, and while the class stays under the volume goal, shy animals come out one at a time. It is the opposite of a bouncing noise meter: there is no score, no needle and no red warning light, so nothing makes being loud more interesting than being quiet.",
    "guide.useTitle": "Using it in class",
    "guide.use.open":
      "Open shysafari.com on the computer connected to your projector, pick the savanna or the coral reef, and press Start. The browser asks to use the microphone.",
    "guide.use.goal":
      "Set the volume goal for the activity: Silent, Independent (quiet whispers) or Partner work (conversation voices), or drag the line on the meter to anywhere in between.",
    "guide.use.rate":
      "Let the class work. The first animal appears after 10 to 20 quiet seconds, and after that about one every five minutes of quiet work. Choose Relaxed, Normal or Lively in Settings, or type any number of minutes.",
    "guide.loudTitle": "How it decides the room is too loud",
    "guide.loud":
      "A single noise does not count. Sound over the goal fills up a bucket, and the further over it is, the faster it fills: just over the line takes about six seconds to count as too loud, far over takes about one second. Quiet moments drain the bucket again, so a knock at the door or a dropped book costs the class nothing. Once the room settles, it counts as quiet again within three seconds.",
    "guide.calibrate":
      "Calibration is optional. Five seconds of silence and five seconds of normal talking teach the app what your room and your microphone sound like.",
    "guide.tooLoudTitle": "What happens when it gets too loud",
    "guide.tooLoud":
      "The scene clouds over, with a dusty haze on the savanna and murky water on the reef, and no new animals come out. What happens next is your choice:",
    "guide.tooLoud.flee":
      "Animals run away (the default). The scene freezes and, while the room stays too loud, one animal and then a few more every five seconds run off the edge of the screen.",
    "guide.tooLoud.pause":
      "Pause the scene. The animals hold still, nothing is taken away, and progress toward the next animal waits until the room is calm again.",
    "guide.animalsTitle": "The animals",
    "guide.animals":
      "The savanna has 17 animals, from meerkats and zebras to giraffes, hippos and rhinos, with lions, leopards and elephants as the rare ones. The coral reef has 18, from clownfish and seahorses to sea turtles and octopuses, with hammerhead sharks, manta rays and whale sharks as the rare ones. Common animals turn up often and rare ones are a real event that many sessions will not see at all. Each scene keeps its own animals, and the collection remembers every animal the class has spotted.",
    "guide.forTitle": "Who it is for",
    "guide.for":
      "Teachers from kindergarten through middle school who want a calm, visual cue for voice levels during independent work, reading time, tests, centers or group work. The whole class shares one screen, and students need nothing at all.",
    "guide.faqTitle": "Questions teachers ask",
    "guide.faq.free.q": "Is Shy Safari free?",
    "guide.faq.free.a":
      "Yes. There are no paywalls, no ads and no premium version. It came out of the EdTech-a-thon, a community of builders making free tools for classrooms, and is maintained by teacher.dev.",
    "guide.faq.record.q": "Does it record the classroom?",
    "guide.faq.record.a":
      "No. The microphone is used only to measure how loud the room is, as a single number, moment by moment, on your computer. Nothing is recorded, saved or sent anywhere.",
    "guide.faq.accounts.q": "Do I or my students need an account?",
    "guide.faq.accounts.a":
      "No. There is no sign-up, no login and nothing to install. Settings are saved in the browser on that computer.",
    "guide.faq.devices.q": "What do I need to run it?",
    "guide.faq.devices.a":
      "A computer with a microphone and an up-to-date web browser such as Chrome, Edge, Firefox or Safari. Laptops, Chromebooks and interactive whiteboards all work. It is designed for a projector or large screen, but it runs on a tablet or phone too.",
    "guide.faq.languages.q": "Which languages does it support?",
    "guide.faq.languages.a":
      "English, Spanish and French. It follows the browser's language, and you can change it from the menu at the top of the screen.",
    "guide.faq.meter.q": "How is it different from a noise meter?",
    "guide.faq.meter.a":
      "A noise meter shows the class how loud they are, which can turn getting louder into a game. Shy Safari shows only a peaceful scene that slowly fills with animals, so the reward for quiet work is what the class sees, and there is no score to beat.",
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
    "app.pageTitle": "Shy Safari — medidor de ruido gratuito para el aula",
    "app.description":
      "Un medidor de ruido gratuito para el proyector del aula. Animales tímidos de la sabana y del arrecife aparecen mientras la clase está en silencio. Sin registro, sin grabaciones.",
    "brand.title": "Creado por teacher.dev",
    "common.builtBy": "Creado por teacher.dev",
    "common.about": "acerca de",
    "common.privacy": "privacidad",
    "common.howItWorks": "cómo funciona",
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
    "controls.pause": "Pausar",
    "controls.pauseHint":
      "Dejar de escuchar un momento, para poder hablar con la clase",
    "controls.resume": "Reanudar",
    "paused.status": "Medidor de ruido en pausa",
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
    "guide.title": "Cómo funciona Shy Safari",
    "guide.lede":
      "Un medidor de ruido gratuito para el aula que premia el silencio en lugar de castigar el ruido.",
    "guide.whatTitle": "Qué es",
    "guide.what":
      "Shy Safari es un medidor de ruido para el aula que funciona en el navegador. Ponlo en el proyector o en la pizarra digital y muestra una sabana o un arrecife de coral tranquilos. Escucha lo fuerte que suena la clase a través del micrófono del ordenador y, mientras la clase se mantiene por debajo del límite de volumen, van apareciendo animales tímidos uno a uno. Es lo contrario de un medidor de ruido que salta: no hay puntuación, ni aguja, ni luz roja de aviso, así que hacer ruido nunca resulta más interesante que estar en silencio.",
    "guide.useTitle": "Cómo usarlo en clase",
    "guide.use.open":
      "Abre shysafari.com en el ordenador conectado al proyector, elige la sabana o el arrecife de coral y pulsa Empezar. El navegador pedirá permiso para usar el micrófono.",
    "guide.use.goal":
      "Elige el límite de volumen para la actividad: Silencio, Individual (solo susurros) o En parejas (voz de conversación), o arrastra la línea del medidor a cualquier punto intermedio.",
    "guide.use.rate":
      "Deja trabajar a la clase. El primer animal aparece tras 10 a 20 segundos de silencio y, después, más o menos uno cada cinco minutos de trabajo en silencio. Elige Tranquilo, Normal o Animado en Ajustes, o escribe cualquier número de minutos.",
    "guide.loudTitle": "Cómo decide que hay demasiado ruido",
    "guide.loud":
      "Un ruido suelto no cuenta. El sonido por encima del límite va llenando un cubo, y cuanto más se pasa, más rápido se llena: justo por encima de la línea tarda unos seis segundos en contar como demasiado ruido; muy por encima, alrededor de un segundo. Los momentos de silencio vacían el cubo, así que un golpe en la puerta o un libro que se cae no le cuestan nada a la clase. Cuando la clase se calma, vuelve a contar como silencio en tres segundos.",
    "guide.calibrate":
      "La calibración es opcional. Cinco segundos de silencio y cinco segundos de conversación normal le enseñan a la aplicación cómo suenan tu aula y tu micrófono.",
    "guide.tooLoudTitle": "Qué pasa cuando hay demasiado ruido",
    "guide.tooLoud":
      "La escena se nubla, con una neblina de polvo en la sabana y agua turbia en el arrecife, y no aparecen animales nuevos. Lo que pasa después lo eliges tú:",
    "guide.tooLoud.flee":
      "Los animales huyen (la opción por defecto). La escena se congela y, mientras siga habiendo demasiado ruido, un animal y luego unos cuantos más cada cinco segundos salen corriendo de la pantalla.",
    "guide.tooLoud.pause":
      "Pausar la escena. Los animales se quedan quietos, no se pierde nada y el progreso hacia el siguiente animal espera a que la clase vuelva a estar en calma.",
    "guide.animalsTitle": "Los animales",
    "guide.animals":
      "La sabana tiene 17 animales, desde suricatas y cebras hasta jirafas, hipopótamos y rinocerontes, con leones, leopardos y elefantes como los más raros. El arrecife de coral tiene 18, desde peces payaso y caballitos de mar hasta tortugas marinas y pulpos, con tiburones martillo, mantarrayas y tiburones ballena como los más raros. Los animales comunes aparecen a menudo y los raros son todo un acontecimiento que muchas sesiones no llegan a ver. Cada escena guarda sus propios animales, y la colección recuerda todos los que la clase ha visto.",
    "guide.forTitle": "Para quién es",
    "guide.for":
      "Para docentes de infantil, primaria y secundaria que quieren una señal visual y tranquila del nivel de voz durante el trabajo individual, la lectura, los exámenes, los rincones o el trabajo en grupo. Toda la clase comparte una pantalla y el alumnado no necesita nada.",
    "guide.faqTitle": "Preguntas frecuentes",
    "guide.faq.free.q": "¿Shy Safari es gratis?",
    "guide.faq.free.a":
      "Sí. No hay muros de pago, ni anuncios, ni versión premium. Nació en el EdTech-a-thon, una comunidad que crea herramientas gratuitas para las aulas, y lo mantiene teacher.dev.",
    "guide.faq.record.q": "¿Graba lo que pasa en el aula?",
    "guide.faq.record.a":
      "No. El micrófono solo se usa para medir lo fuerte que suena la clase, como un único número, momento a momento, en tu ordenador. No se graba, no se guarda y no se envía nada a ningún sitio.",
    "guide.faq.accounts.q": "¿Necesitamos una cuenta mis alumnos o yo?",
    "guide.faq.accounts.a":
      "No. No hay registro, ni inicio de sesión, ni nada que instalar. Los ajustes se guardan en el navegador de ese ordenador.",
    "guide.faq.devices.q": "¿Qué necesito para usarlo?",
    "guide.faq.devices.a":
      "Un ordenador con micrófono y un navegador actualizado, como Chrome, Edge, Firefox o Safari. Funciona en portátiles, Chromebooks y pizarras digitales. Está pensado para un proyector o una pantalla grande, pero también funciona en una tableta o un móvil.",
    "guide.faq.languages.q": "¿En qué idiomas está?",
    "guide.faq.languages.a":
      "En inglés, español y francés. Sigue el idioma del navegador, y puedes cambiarlo desde el menú de la parte superior de la pantalla.",
    "guide.faq.meter.q": "¿En qué se diferencia de un medidor de ruido?",
    "guide.faq.meter.a":
      "Un medidor de ruido le muestra a la clase lo fuerte que está hablando, y eso puede convertir el hacer ruido en un juego. Shy Safari solo muestra una escena tranquila que se va llenando de animales, así que lo que la clase ve es la recompensa por trabajar en silencio, y no hay ninguna puntuación que batir.",
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
    "app.pageTitle": "Shy Safari — sonomètre gratuit pour la classe",
    "app.description":
      "Un sonomètre gratuit pour le vidéoprojecteur de la classe. Des animaux timides de la savane et du récif sortent tant que la classe reste calme. Sans inscription, sans enregistrement.",
    "brand.title": "Créé par teacher.dev",
    "common.builtBy": "Créé par teacher.dev",
    "common.about": "à propos",
    "common.privacy": "confidentialité",
    "common.howItWorks": "comment ça marche",
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
    "controls.pause": "Pause",
    "controls.pauseHint":
      "Arrêter d’écouter un moment, pour pouvoir parler à la classe",
    "controls.resume": "Reprendre",
    "paused.status": "Sonomètre en pause",
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
    "guide.title": "Comment fonctionne Shy Safari",
    "guide.lede":
      "Un sonomètre gratuit pour la classe qui récompense le calme au lieu de punir le bruit.",
    "guide.whatTitle": "Ce que c'est",
    "guide.what":
      "Shy Safari est un sonomètre pour la classe qui fonctionne dans le navigateur. Affichez-le au vidéoprojecteur ou sur le tableau interactif : il montre une savane ou un récif de corail paisibles. Il écoute le niveau sonore de la salle grâce au micro de l'ordinateur et, tant que la classe reste sous l'objectif de volume, des animaux timides sortent un par un. C'est le contraire d'un sonomètre qui s'agite : pas de score, pas d'aiguille, pas de voyant rouge, donc rien ne rend le bruit plus intéressant que le calme.",
    "guide.useTitle": "L'utiliser en classe",
    "guide.use.open":
      "Ouvrez shysafari.com sur l'ordinateur relié au vidéoprojecteur, choisissez la savane ou le récif de corail, puis appuyez sur Commencer. Le navigateur demande l'accès au micro.",
    "guide.use.goal":
      "Réglez l'objectif de volume pour l'activité : Silence, Travail seul (chuchotements) ou En binôme (voix de conversation), ou faites glisser la ligne du sonomètre n'importe où entre les deux.",
    "guide.use.rate":
      "Laissez la classe travailler. Le premier animal arrive après 10 à 20 secondes de calme, puis environ un toutes les cinq minutes de travail silencieux. Choisissez Tranquille, Normal ou Animé dans les réglages, ou saisissez le nombre de minutes de votre choix.",
    "guide.loudTitle": "Comment il décide que c'est trop bruyant",
    "guide.loud":
      "Un bruit isolé ne compte pas. Le son au-dessus de l'objectif remplit un seau, d'autant plus vite qu'il est fort : juste au-dessus de la ligne, il faut environ six secondes pour que ce soit trop bruyant ; bien au-dessus, environ une seconde. Les moments de calme vident le seau, donc un coup à la porte ou un livre qui tombe ne coûte rien à la classe. Dès que la salle se calme, elle redevient calme en trois secondes.",
    "guide.calibrate":
      "L'étalonnage est facultatif. Cinq secondes de silence et cinq secondes de conversation normale apprennent à l'application comment sonnent votre salle et votre micro.",
    "guide.tooLoudTitle": "Ce qui se passe quand c'est trop bruyant",
    "guide.tooLoud":
      "La scène se trouble, avec une brume de poussière sur la savane et une eau trouble sur le récif, et aucun nouvel animal ne sort. La suite dépend de votre choix :",
    "guide.tooLoud.flee":
      "Les animaux s'enfuient (par défaut). La scène se fige et, tant que la salle reste trop bruyante, un animal puis quelques autres toutes les cinq secondes s'enfuient hors de l'écran.",
    "guide.tooLoud.pause":
      "Mettre la scène en pause. Les animaux restent immobiles, rien n'est perdu, et la progression vers le prochain animal attend que la classe se calme.",
    "guide.animalsTitle": "Les animaux",
    "guide.animals":
      "La savane compte 17 animaux, des suricates et des zèbres aux girafes, hippopotames et rhinocéros, avec les lions, les léopards et les éléphants parmi les plus rares. Le récif de corail en compte 18, des poissons-clowns et hippocampes aux tortues marines et pieuvres, avec les requins-marteaux, les raies manta et les requins-baleines parmi les plus rares. Les animaux communs arrivent souvent et les plus rares sont un vrai événement que beaucoup de séances ne verront pas. Chaque scène garde ses propres animaux, et la collection se souvient de tous ceux que la classe a aperçus.",
    "guide.forTitle": "Pour qui",
    "guide.for":
      "Pour les enseignants de la maternelle au collège qui veulent un repère visuel et apaisant du niveau de voix pendant le travail autonome, la lecture, les évaluations, les ateliers ou le travail de groupe. Toute la classe partage un seul écran et les élèves n'ont besoin de rien.",
    "guide.faqTitle": "Questions fréquentes",
    "guide.faq.free.q": "Shy Safari est-il gratuit ?",
    "guide.faq.free.a":
      "Oui. Pas de paiement, pas de publicité, pas de version premium. Il est né de l'EdTech-a-thon, une communauté qui crée des outils gratuits pour les classes, et il est maintenu par teacher.dev.",
    "guide.faq.record.q": "Est-ce qu'il enregistre la classe ?",
    "guide.faq.record.a":
      "Non. Le micro sert uniquement à mesurer le niveau sonore de la salle, sous la forme d'un seul nombre, instant après instant, sur votre ordinateur. Rien n'est enregistré, conservé ni envoyé nulle part.",
    "guide.faq.accounts.q": "Mes élèves ou moi avons-nous besoin d'un compte ?",
    "guide.faq.accounts.a":
      "Non. Pas d'inscription, pas de connexion, rien à installer. Les réglages sont conservés dans le navigateur de cet ordinateur.",
    "guide.faq.devices.q": "De quoi ai-je besoin pour l'utiliser ?",
    "guide.faq.devices.a":
      "D'un ordinateur avec un micro et d'un navigateur à jour comme Chrome, Edge, Firefox ou Safari. Il fonctionne sur les ordinateurs portables, les Chromebooks et les tableaux interactifs. Il est pensé pour un vidéoprojecteur ou un grand écran, mais fonctionne aussi sur tablette ou téléphone.",
    "guide.faq.languages.q": "Quelles langues sont disponibles ?",
    "guide.faq.languages.a":
      "L'anglais, l'espagnol et le français. Il suit la langue du navigateur, et vous pouvez la changer depuis le menu en haut de l'écran.",
    "guide.faq.meter.q": "En quoi est-ce différent d'un sonomètre ?",
    "guide.faq.meter.a":
      "Un sonomètre montre à la classe à quel point elle est bruyante, ce qui peut transformer le bruit en jeu. Shy Safari ne montre qu'une scène paisible qui se remplit peu à peu d'animaux : ce que la classe voit, c'est la récompense du travail silencieux, et il n'y a aucun score à battre.",
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
