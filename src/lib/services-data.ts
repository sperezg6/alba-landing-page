export type ServiceIconName = 'Activity' | 'Droplets' | 'Heart' | 'Apple' | 'Brain' | 'Dumbbell' | 'Stethoscope' | 'UserCog' | 'Scissors';

export interface ServiceProcess {
  step: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface ServiceFAQ {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  iconName: ServiceIconName;
  title: string;
  titleEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  fullDescription: string;
  fullDescriptionEn: string;
  whoNeedsIt: string;
  whoNeedsItEn: string;
  process: ServiceProcess[];
  benefits: string[];
  benefitsEn: string[];
  whatToExpect: string;
  whatToExpectEn: string;
  duration?: string;
  frequency?: string;
  faqs: ServiceFAQ[];
  relatedServices: string[];
  image: string;
  heroImage: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'hemodialisis',
    slug: 'hemodialisis',
    iconName: 'Activity',
    title: 'Hemodiálisis',
    titleEn: 'Hemodialysis',
    shortDescription: 'Tratamiento que filtra tu sangre eliminando toxinas y exceso de líquidos cuando los riñones no pueden hacerlo.',
    shortDescriptionEn: 'Treatment that filters your blood, removing toxins and excess fluids when your kidneys cannot do it.',
    fullDescription: 'La hemodiálisis es un tratamiento médico que realiza la función de filtrado que tus riñones sanos harían de forma natural. Cuando los riñones pierden su capacidad de filtrar adecuadamente, las toxinas, los desechos metabólicos y el exceso de líquidos se acumulan en el cuerpo, lo que puede ser peligroso para la salud. Durante la hemodiálisis, tu sangre circula a través de un filtro especial llamado dializador (o "riñón artificial") que elimina estas sustancias nocivas y devuelve la sangre limpia a tu cuerpo.',
    fullDescriptionEn: 'Hemodialysis is a medical treatment that performs the filtering function that your healthy kidneys would naturally do. When kidneys lose their ability to filter properly, toxins, metabolic waste, and excess fluids accumulate in the body, which can be dangerous to health. During hemodialysis, your blood circulates through a special filter called a dialyzer (or "artificial kidney") that removes these harmful substances and returns clean blood to your body.',
    whoNeedsIt: 'La hemodiálisis es necesaria para personas con enfermedad renal crónica en etapa 5 (también llamada enfermedad renal terminal), cuando los riñones funcionan a menos del 10-15% de su capacidad normal. También puede ser necesaria temporalmente en casos de lesión renal aguda o intoxicaciones.',
    whoNeedsItEn: 'Hemodialysis is necessary for people with stage 5 chronic kidney disease (also called end-stage renal disease), when the kidneys function at less than 10-15% of their normal capacity. It may also be temporarily needed in cases of acute kidney injury or poisoning.',
    process: [
      {
        step: '01',
        title: 'Preparación y conexión',
        titleEn: 'Preparation and connection',
        description: 'Te acomodamos en tu sillón de tratamiento, verificamos tus signos vitales y conectamos tu acceso vascular (fístula, injerto o catéter) al equipo de diálisis.',
        descriptionEn: 'We settle you in your treatment chair, check your vital signs, and connect your vascular access (fistula, graft, or catheter) to the dialysis machine.',
      },
      {
        step: '02',
        title: 'Filtrado de sangre',
        titleEn: 'Blood filtration',
        description: 'Tu sangre pasa a través del dializador, un filtro con miles de fibras pequeñas que eliminan toxinas, urea, creatinina y exceso de líquidos.',
        descriptionEn: 'Your blood passes through the dialyzer, a filter with thousands of tiny fibers that remove toxins, urea, creatinine, and excess fluids.',
      },
      {
        step: '03',
        title: 'Monitoreo continuo',
        titleEn: 'Continuous monitoring',
        description: 'Nuestro equipo médico supervisa constantemente tu presión arterial, ritmo cardíaco, flujo sanguíneo y el funcionamiento del equipo durante toda la sesión.',
        descriptionEn: 'Our medical team constantly monitors your blood pressure, heart rate, blood flow, and equipment function throughout the session.',
      },
      {
        step: '04',
        title: 'Desconexión y recuperación',
        titleEn: 'Disconnection and recovery',
        description: 'Al terminar, desconectamos el equipo de forma segura, verificamos tu estado y te permitimos descansar brevemente antes de irte a casa.',
        descriptionEn: 'When finished, we safely disconnect the equipment, check your condition, and allow you to rest briefly before going home.',
      },
    ],
    benefits: [
      'Elimina toxinas y desechos que tus riñones no pueden procesar',
      'Controla la presión arterial al eliminar exceso de líquidos',
      'Balancea minerales como potasio, sodio y calcio en tu sangre',
      'Mejora tu energía y bienestar general',
      'Permite continuar con tu vida mientras esperas un trasplante',
    ],
    benefitsEn: [
      'Removes toxins and waste that your kidneys cannot process',
      'Controls blood pressure by removing excess fluids',
      'Balances minerals like potassium, sodium, and calcium in your blood',
      'Improves your energy and overall wellbeing',
      'Allows you to continue with your life while waiting for a transplant',
    ],
    whatToExpect: 'Las sesiones duran entre 3 y 4 horas, generalmente 3 veces por semana. Durante el tratamiento puedes leer, ver televisión, dormir o trabajar en tu laptop. Es normal sentir algo de fatiga después de las primeras sesiones, pero la mayoría de los pacientes se adaptan rápidamente y reportan sentirse mejor con el tratamiento regular.',
    whatToExpectEn: 'Sessions last 3 to 4 hours, usually 3 times per week. During treatment, you can read, watch TV, sleep, or work on your laptop. It is normal to feel some fatigue after the first sessions, but most patients adapt quickly and report feeling better with regular treatment.',
    duration: '3-4 horas por sesión',
    frequency: '3 veces por semana',
    faqs: [
      {
        question: '¿Duele la hemodiálisis?',
        questionEn: 'Does hemodialysis hurt?',
        answer: 'La conexión inicial puede causar una molestia leve similar a un pinchazo. Una vez conectado, el tratamiento en sí no es doloroso. Con el tiempo, la mayoría de los pacientes se acostumbran completamente.',
        answerEn: 'The initial connection may cause mild discomfort similar to a pinprick. Once connected, the treatment itself is not painful. Over time, most patients become completely accustomed to it.',
      },
      {
        question: '¿Puedo comer durante la sesión?',
        questionEn: 'Can I eat during the session?',
        answer: 'Sí, puedes comer snacks ligeros durante la sesión. Te recomendamos traer alimentos bajos en potasio y fósforo. Nuestro equipo de nutrición puede orientarte sobre las mejores opciones.',
        answerEn: 'Yes, you can eat light snacks during the session. We recommend bringing foods low in potassium and phosphorus. Our nutrition team can guide you on the best options.',
      },
      {
        question: '¿Puedo viajar si estoy en hemodiálisis?',
        questionEn: 'Can I travel if I am on hemodialysis?',
        answer: 'Sí, es posible viajar. Necesitas coordinar con anticipación tus sesiones en centros de diálisis en tu destino. Nuestro equipo puede ayudarte a encontrar clínicas compatibles.',
        answerEn: 'Yes, it is possible to travel. You need to coordinate your sessions at dialysis centers at your destination in advance. Our team can help you find compatible clinics.',
      },
    ],
    relatedServices: ['hemodiafiltracion', 'accesos-vasculares', 'nutricion-renal'],
    image: '/images/services/hemodialisis.jpg',
    heroImage: '/images/services/hemodialisis-clinic.jpg',
  },
  {
    id: 'hemodiafiltracion',
    slug: 'hemodiafiltracion',
    iconName: 'Droplets',
    title: 'Hemodiafiltración',
    titleEn: 'Hemodiafiltration',
    shortDescription: 'Técnica avanzada que combina hemodiálisis con ultrafiltración para una limpieza más profunda de la sangre.',
    shortDescriptionEn: 'Advanced technique combining hemodialysis with ultrafiltration for deeper blood cleansing.',
    fullDescription: 'La hemodiafiltración (HDF) es una técnica de diálisis más avanzada que combina los principios de la hemodiálisis convencional con la hemofiltración. Además de eliminar toxinas pequeñas como la urea, la HDF es especialmente efectiva para eliminar toxinas de tamaño mediano (llamadas "moléculas medias") que la hemodiálisis convencional no elimina tan eficientemente. Esto se logra mediante la convección, un proceso que "arrastra" estas moléculas más grandes junto con grandes volúmenes de líquido que luego se reponen con solución estéril.',
    fullDescriptionEn: 'Hemodiafiltration (HDF) is a more advanced dialysis technique that combines the principles of conventional hemodialysis with hemofiltration. In addition to removing small toxins like urea, HDF is especially effective at removing medium-sized toxins (called "middle molecules") that conventional hemodialysis does not eliminate as efficiently. This is achieved through convection, a process that "drags" these larger molecules along with large volumes of fluid that are then replaced with sterile solution.',
    whoNeedsIt: 'La hemodiafiltración está indicada para pacientes en diálisis que buscan un tratamiento más eficiente, especialmente aquellos con síntomas persistentes como fatiga, picazón, síndrome de piernas inquietas, o problemas cardiovasculares. También es recomendada para pacientes que llevan tiempo en hemodiálisis convencional y podrían beneficiarse de una mejor eliminación de toxinas.',
    whoNeedsItEn: 'Hemodiafiltration is indicated for dialysis patients seeking more efficient treatment, especially those with persistent symptoms such as fatigue, itching, restless leg syndrome, or cardiovascular problems. It is also recommended for patients who have been on conventional hemodialysis for some time and could benefit from better toxin removal.',
    process: [
      {
        step: '01',
        title: 'Preparación especializada',
        titleEn: 'Specialized preparation',
        description: 'El equipo de HDF se prepara con solución de sustitución ultrapura. Verificamos tus signos vitales y programamos los parámetros específicos de tu tratamiento.',
        descriptionEn: 'The HDF equipment is prepared with ultrapure substitution solution. We check your vital signs and program the specific parameters of your treatment.',
      },
      {
        step: '02',
        title: 'Doble proceso de filtrado',
        titleEn: 'Dual filtration process',
        description: 'Tu sangre pasa por un dializador de alto flujo donde se realiza difusión (como en hemodiálisis) y convección simultáneamente, eliminando más tipos de toxinas.',
        descriptionEn: 'Your blood passes through a high-flux dialyzer where diffusion (as in hemodialysis) and convection occur simultaneously, removing more types of toxins.',
      },
      {
        step: '03',
        title: 'Reposición de líquidos',
        titleEn: 'Fluid replacement',
        description: 'Se repone el líquido extraído con solución estéril de alta pureza, manteniendo tu equilibrio de fluidos mientras maximizamos la limpieza.',
        descriptionEn: 'The extracted fluid is replaced with high-purity sterile solution, maintaining your fluid balance while maximizing cleansing.',
      },
      {
        step: '04',
        title: 'Monitoreo avanzado',
        titleEn: 'Advanced monitoring',
        description: 'Monitoreamos parámetros adicionales como el volumen de sustitución y la presión transmembrana para optimizar tu tratamiento.',
        descriptionEn: 'We monitor additional parameters such as substitution volume and transmembrane pressure to optimize your treatment.',
      },
    ],
    benefits: [
      'Mejor eliminación de toxinas medianas que causan síntomas molestos',
      'Reducción de inflamación crónica asociada a la enfermedad renal',
      'Mejor control de la presión arterial durante y después del tratamiento',
      'Menos síntomas como fatiga, picazón y calambres',
      'Estudios sugieren mejor supervivencia a largo plazo comparado con hemodiálisis convencional',
      'Mayor estabilidad cardiovascular durante las sesiones',
    ],
    benefitsEn: [
      'Better removal of medium-sized toxins that cause bothersome symptoms',
      'Reduction of chronic inflammation associated with kidney disease',
      'Better blood pressure control during and after treatment',
      'Fewer symptoms such as fatigue, itching, and cramps',
      'Studies suggest better long-term survival compared to conventional hemodialysis',
      'Greater cardiovascular stability during sessions',
    ],
    whatToExpect: 'Las sesiones de HDF tienen una duración similar a la hemodiálisis convencional (3-4 horas, 3 veces por semana). Muchos pacientes reportan sentirse mejor después de las sesiones de HDF comparado con la hemodiálisis tradicional, con menos fatiga post-diálisis y mejor bienestar general.',
    whatToExpectEn: 'HDF sessions have a similar duration to conventional hemodialysis (3-4 hours, 3 times per week). Many patients report feeling better after HDF sessions compared to traditional hemodialysis, with less post-dialysis fatigue and better overall wellbeing.',
    duration: '3-4 horas por sesión',
    frequency: '3 veces por semana',
    faqs: [
      {
        question: '¿Cuál es la diferencia entre hemodiálisis y hemodiafiltración?',
        questionEn: 'What is the difference between hemodialysis and hemodiafiltration?',
        answer: 'La hemodiafiltración añade un proceso llamado convección que permite eliminar toxinas de mayor tamaño que la hemodiálisis convencional no puede eliminar eficientemente. Esto resulta en una "limpieza" más completa de la sangre.',
        answerEn: 'Hemodiafiltration adds a process called convection that allows removal of larger toxins that conventional hemodialysis cannot efficiently eliminate. This results in more complete blood "cleansing."',
      },
      {
        question: '¿La HDF es más costosa?',
        questionEn: 'Is HDF more expensive?',
        answer: 'El costo puede ser ligeramente mayor debido al equipo especializado y las soluciones de alta pureza requeridas. Sin embargo, los beneficios para la salud a largo plazo pueden compensar esta diferencia. Consulta con nuestro equipo sobre opciones de cobertura.',
        answerEn: 'The cost may be slightly higher due to specialized equipment and high-purity solutions required. However, the long-term health benefits may offset this difference. Consult with our team about coverage options.',
      },
    ],
    relatedServices: ['hemodialisis', 'accesos-vasculares', 'consulta-nefrologia'],
    image: '/images/services/hemodifiltracion.jpg',
    heroImage: '/images/alba-extracted/fotos-servicios-2.jpg',
  },
  {
    id: 'trasplante-renal',
    slug: 'trasplante-renal',
    iconName: 'Heart',
    title: 'Trasplante Renal',
    titleEn: 'Kidney Transplant',
    shortDescription: 'Programa integral de preparación, coordinación y seguimiento para trasplante de riñón.',
    shortDescriptionEn: 'Comprehensive preparation, coordination, and follow-up program for kidney transplant.',
    fullDescription: 'El trasplante renal es considerado el mejor tratamiento para la enfermedad renal terminal, ya que un riñón trasplantado puede realizar todas las funciones de un riñón sano. En Alba, ofrecemos un programa integral que te acompaña en todo el proceso: desde la evaluación inicial para determinar si eres candidato, pasando por la preparación médica y psicológica, hasta el seguimiento post-trasplante. Trabajamos en coordinación con los principales hospitales de trasplante de la región para asegurar que recibas la mejor atención posible.',
    fullDescriptionEn: 'Kidney transplant is considered the best treatment for end-stage renal disease, as a transplanted kidney can perform all the functions of a healthy kidney. At Alba, we offer a comprehensive program that accompanies you throughout the process: from initial evaluation to determine if you are a candidate, through medical and psychological preparation, to post-transplant follow-up. We work in coordination with the main transplant hospitals in the region to ensure you receive the best possible care.',
    whoNeedsIt: 'El trasplante renal es una opción para pacientes con enfermedad renal crónica avanzada o terminal que son médicamente aptos para la cirugía. No todos los pacientes son candidatos; factores como edad, condición cardiovascular, historial de cáncer y otros problemas de salud se evalúan cuidadosamente. Los pacientes en diálisis o próximos a necesitarla pueden ser evaluados para trasplante.',
    whoNeedsItEn: 'Kidney transplant is an option for patients with advanced or end-stage chronic kidney disease who are medically fit for surgery. Not all patients are candidates; factors such as age, cardiovascular condition, cancer history, and other health issues are carefully evaluated. Patients on dialysis or close to needing it can be evaluated for transplant.',
    process: [
      {
        step: '01',
        title: 'Evaluación inicial',
        titleEn: 'Initial evaluation',
        description: 'Realizamos estudios completos para determinar si eres candidato a trasplante: análisis de sangre, estudios cardíacos, evaluación psicológica y social.',
        descriptionEn: 'We perform complete studies to determine if you are a transplant candidate: blood tests, cardiac studies, psychological and social evaluation.',
      },
      {
        step: '02',
        title: 'Protocolo pre-trasplante',
        titleEn: 'Pre-transplant protocol',
        description: 'Te preparamos médicamente mientras estás en lista de espera o se evalúa un donador vivo. Optimizamos tu salud para el procedimiento.',
        descriptionEn: 'We prepare you medically while you are on the waiting list or a living donor is being evaluated. We optimize your health for the procedure.',
      },
      {
        step: '03',
        title: 'Coordinación del trasplante',
        titleEn: 'Transplant coordination',
        description: 'Trabajamos con hospitales de trasplante de referencia. Cuando llega tu momento, coordinamos todo para que el proceso sea lo más fluido posible.',
        descriptionEn: 'We work with reference transplant hospitals. When your time comes, we coordinate everything so the process is as smooth as possible.',
      },
      {
        step: '04',
        title: 'Seguimiento post-trasplante',
        titleEn: 'Post-transplant follow-up',
        description: 'Después del trasplante, continuamos tu cuidado con consultas regulares, monitoreo de medicamentos inmunosupresores y detección temprana de cualquier complicación.',
        descriptionEn: 'After the transplant, we continue your care with regular consultations, monitoring of immunosuppressive medications, and early detection of any complications.',
      },
    ],
    benefits: [
      'Mejor calidad de vida comparado con diálisis',
      'Mayor libertad en dieta y consumo de líquidos',
      'No más sesiones de diálisis (si el trasplante es exitoso)',
      'Mayor energía y bienestar general',
      'Posibilidad de vida más activa y productiva',
      'Mejor supervivencia a largo plazo que la diálisis',
    ],
    benefitsEn: [
      'Better quality of life compared to dialysis',
      'Greater freedom in diet and fluid intake',
      'No more dialysis sessions (if transplant is successful)',
      'More energy and overall wellbeing',
      'Possibility of more active and productive life',
      'Better long-term survival than dialysis',
    ],
    whatToExpect: 'El proceso de evaluación para trasplante toma varias semanas o meses. Si eres candidato, entrarás en lista de espera para riñón de donante fallecido o se evaluará un posible donante vivo (familiar o altruista). La espera puede ser de meses a años dependiendo de factores como tipo de sangre y compatibilidad. Después del trasplante, necesitarás tomar medicamentos inmunosupresores de por vida y asistir a citas de seguimiento regulares.',
    whatToExpectEn: 'The transplant evaluation process takes several weeks or months. If you are a candidate, you will be placed on a waiting list for a deceased donor kidney or a possible living donor (family member or altruistic) will be evaluated. The wait can be months to years depending on factors such as blood type and compatibility. After transplant, you will need to take immunosuppressive medications for life and attend regular follow-up appointments.',
    faqs: [
      {
        question: '¿Cuánto tiempo dura un riñón trasplantado?',
        questionEn: 'How long does a transplanted kidney last?',
        answer: 'Un riñón de donante vivo puede funcionar 15-20 años o más en promedio, mientras que uno de donante fallecido dura aproximadamente 10-15 años. Con buenos cuidados y seguimiento, muchos trasplantes duran décadas.',
        answerEn: 'A living donor kidney can function 15-20 years or more on average, while one from a deceased donor lasts approximately 10-15 years. With good care and follow-up, many transplants last decades.',
      },
      {
        question: '¿Puedo tener un donante vivo?',
        questionEn: 'Can I have a living donor?',
        answer: 'Sí, un familiar o incluso una persona no relacionada puede donar un riñón si es compatible y pasa las evaluaciones médicas. Los trasplantes de donante vivo generalmente tienen mejores resultados.',
        answerEn: 'Yes, a family member or even an unrelated person can donate a kidney if they are compatible and pass medical evaluations. Living donor transplants generally have better outcomes.',
      },
      {
        question: '¿Puedo seguir en diálisis mientras espero?',
        questionEn: 'Can I continue dialysis while waiting?',
        answer: 'Sí, la mayoría de los pacientes continúan con hemodiálisis o diálisis peritoneal mientras esperan un trasplante. Esto mantiene tu salud estable durante la espera.',
        answerEn: 'Yes, most patients continue with hemodialysis or peritoneal dialysis while waiting for a transplant. This keeps your health stable during the wait.',
      },
    ],
    relatedServices: ['consulta-nefrologia', 'cirugia-trasplantes', 'apoyo-psicologico'],
    image: '/images/services/trasplante.jpg',
    heroImage: '/images/services/clinica-dialisis.jpg',
  },
  {
    id: 'nutricion-renal',
    slug: 'nutricion-renal',
    iconName: 'Apple',
    title: 'Nutrición Renal',
    titleEn: 'Renal Nutrition',
    shortDescription: 'Planes alimenticios personalizados diseñados por nutriólogos especializados en enfermedad renal.',
    shortDescriptionEn: 'Personalized meal plans designed by nutritionists specialized in kidney disease.',
    fullDescription: 'La nutrición es fundamental en el manejo de la enfermedad renal. Cuando los riñones no funcionan correctamente, no pueden eliminar eficientemente ciertos nutrientes y minerales, lo que puede causar acumulación peligrosa en el cuerpo. Nuestros nutriólogos especializados en nefrología crean planes alimenticios personalizados que te permiten disfrutar de comidas sabrosas mientras controlas el potasio, fósforo, sodio y proteínas según tus necesidades específicas. No se trata de "dietas restrictivas" sino de aprender a comer de forma inteligente.',
    fullDescriptionEn: 'Nutrition is fundamental in managing kidney disease. When kidneys do not function properly, they cannot efficiently eliminate certain nutrients and minerals, which can cause dangerous accumulation in the body. Our nephrology-specialized nutritionists create personalized meal plans that allow you to enjoy tasty meals while controlling potassium, phosphorus, sodium, and proteins according to your specific needs. It is not about "restrictive diets" but about learning to eat smartly.',
    whoNeedsIt: 'Todo paciente con enfermedad renal crónica se beneficia de orientación nutricional, especialmente aquellos en etapas 3-5 y pacientes en diálisis. También es crucial para pacientes pre y post-trasplante, personas con diabetes y enfermedad renal, y quienes tienen hipertensión asociada a problemas renales.',
    whoNeedsItEn: 'Every patient with chronic kidney disease benefits from nutritional guidance, especially those in stages 3-5 and dialysis patients. It is also crucial for pre and post-transplant patients, people with diabetes and kidney disease, and those with hypertension associated with kidney problems.',
    process: [
      {
        step: '01',
        title: 'Evaluación nutricional',
        titleEn: 'Nutritional evaluation',
        description: 'Analizamos tus análisis de laboratorio, historial médico, peso, y hábitos alimenticios actuales para entender tu situación única.',
        descriptionEn: 'We analyze your lab results, medical history, weight, and current eating habits to understand your unique situation.',
      },
      {
        step: '02',
        title: 'Plan personalizado',
        titleEn: 'Personalized plan',
        description: 'Creamos un plan alimenticio adaptado a tus necesidades médicas, preferencias culturales, gustos personales y estilo de vida.',
        descriptionEn: 'We create a meal plan adapted to your medical needs, cultural preferences, personal tastes, and lifestyle.',
      },
      {
        step: '03',
        title: 'Educación práctica',
        titleEn: 'Practical education',
        description: 'Te enseñamos a leer etiquetas, preparar comidas, hacer sustituciones inteligentes y manejar situaciones sociales como fiestas o restaurantes.',
        descriptionEn: 'We teach you to read labels, prepare meals, make smart substitutions, and handle social situations like parties or restaurants.',
      },
      {
        step: '04',
        title: 'Seguimiento continuo',
        titleEn: 'Continuous follow-up',
        description: 'Ajustamos tu plan según tus resultados de laboratorio y cambios en tu tratamiento. Estamos disponibles para resolver dudas.',
        descriptionEn: 'We adjust your plan according to your lab results and changes in your treatment. We are available to answer questions.',
      },
    ],
    benefits: [
      'Control de potasio para prevenir problemas cardíacos',
      'Manejo del fósforo para proteger tus huesos',
      'Control de líquidos para evitar sobrecarga',
      'Proteína adecuada para mantener tu fuerza muscular',
      'Mejor control de la presión arterial',
      'Más energía y mejor bienestar general',
      'Aprender a disfrutar la comida sin sacrificar tu salud',
    ],
    benefitsEn: [
      'Potassium control to prevent heart problems',
      'Phosphorus management to protect your bones',
      'Fluid control to avoid overload',
      'Adequate protein to maintain muscle strength',
      'Better blood pressure control',
      'More energy and better overall wellbeing',
      'Learning to enjoy food without sacrificing your health',
    ],
    whatToExpect: 'La primera consulta dura aproximadamente 45-60 minutos. Revisaremos tus análisis, discutiremos tus hábitos actuales y comenzaremos a diseñar tu plan. Las consultas de seguimiento son más cortas (20-30 minutos) y se programan según tus necesidades, generalmente cada 1-3 meses o cuando hay cambios en tu tratamiento.',
    whatToExpectEn: 'The first consultation lasts approximately 45-60 minutes. We will review your tests, discuss your current habits, and begin designing your plan. Follow-up consultations are shorter (20-30 minutes) and are scheduled according to your needs, usually every 1-3 months or when there are changes in your treatment.',
    faqs: [
      {
        question: '¿Tendré que dejar de comer lo que me gusta?',
        questionEn: 'Will I have to stop eating what I like?',
        answer: 'No necesariamente. Nuestro enfoque es enseñarte a modificar recetas, controlar porciones y hacer sustituciones inteligentes para que sigas disfrutando de tus comidas favoritas de forma segura.',
        answerEn: 'Not necessarily. Our approach is to teach you how to modify recipes, control portions, and make smart substitutions so you can continue enjoying your favorite meals safely.',
      },
      {
        question: '¿La dieta renal es igual para todos?',
        questionEn: 'Is the renal diet the same for everyone?',
        answer: 'No, cada plan es completamente personalizado. Depende de tu etapa de enfermedad renal, si estás en diálisis, tus otras condiciones médicas, tus medicamentos y tus preferencias personales.',
        answerEn: 'No, each plan is completely personalized. It depends on your stage of kidney disease, whether you are on dialysis, your other medical conditions, your medications, and your personal preferences.',
      },
    ],
    relatedServices: ['hemodialisis', 'consulta-nefrologia', 'apoyo-psicologico'],
    image: '/images/services/nutricion.jpg',
    heroImage: '/images/alba-extracted/fotos-servicios-13.jpg',
  },
  {
    id: 'apoyo-psicologico',
    slug: 'apoyo-psicologico',
    iconName: 'Brain',
    title: 'Apoyo Psicológico',
    titleEn: 'Psychological Support',
    shortDescription: 'Acompañamiento emocional profesional para pacientes y familias durante el tratamiento renal.',
    shortDescriptionEn: 'Professional emotional support for patients and families during kidney treatment.',
    fullDescription: 'Vivir con enfermedad renal crónica y recibir tratamiento de diálisis tiene un impacto emocional significativo tanto en el paciente como en su familia. Es normal experimentar ansiedad, depresión, miedo, frustración o duelo por la vida anterior al diagnóstico. Nuestro equipo de psicología especializado en pacientes nefrológicos ofrece un espacio seguro para procesar estas emociones, desarrollar estrategias de afrontamiento y encontrar formas de vivir plenamente a pesar de la enfermedad.',
    fullDescriptionEn: 'Living with chronic kidney disease and receiving dialysis treatment has a significant emotional impact on both the patient and their family. It is normal to experience anxiety, depression, fear, frustration, or grief for life before diagnosis. Our psychology team specialized in nephrological patients offers a safe space to process these emotions, develop coping strategies, and find ways to live fully despite the illness.',
    whoNeedsIt: 'El apoyo psicológico beneficia a todo paciente renal y sus familias. Es especialmente importante para quienes experimentan síntomas de depresión o ansiedad, pacientes recién diagnosticados que están adaptándose, quienes tienen dificultad para adherirse al tratamiento, pacientes en espera de trasplante, y familias que necesitan orientación sobre cómo apoyar a su ser querido.',
    whoNeedsItEn: 'Psychological support benefits every kidney patient and their families. It is especially important for those experiencing symptoms of depression or anxiety, newly diagnosed patients who are adapting, those having difficulty adhering to treatment, patients waiting for transplant, and families needing guidance on how to support their loved one.',
    process: [
      {
        step: '01',
        title: 'Evaluación inicial',
        titleEn: 'Initial evaluation',
        description: 'En la primera sesión conocemos tu historia, cómo te ha afectado el diagnóstico, y qué áreas de tu vida te gustaría trabajar.',
        descriptionEn: 'In the first session, we learn about your history, how the diagnosis has affected you, and what areas of your life you would like to work on.',
      },
      {
        step: '02',
        title: 'Plan de intervención',
        titleEn: 'Intervention plan',
        description: 'Desarrollamos juntos objetivos terapéuticos y estrategias personalizadas para tu situación específica.',
        descriptionEn: 'Together we develop therapeutic goals and personalized strategies for your specific situation.',
      },
      {
        step: '03',
        title: 'Sesiones de terapia',
        titleEn: 'Therapy sessions',
        description: 'Sesiones individuales, familiares o de pareja según tus necesidades. Pueden ser durante tu sesión de diálisis o en horario separado.',
        descriptionEn: 'Individual, family, or couples sessions according to your needs. They can be during your dialysis session or at a separate time.',
      },
      {
        step: '04',
        title: 'Seguimiento y grupos',
        titleEn: 'Follow-up and groups',
        description: 'Además de sesiones individuales, ofrecemos grupos de apoyo donde puedes conectar con otros pacientes que entienden tu experiencia.',
        descriptionEn: 'In addition to individual sessions, we offer support groups where you can connect with other patients who understand your experience.',
      },
    ],
    benefits: [
      'Reducción de síntomas de ansiedad y depresión',
      'Mejor adherencia al tratamiento médico',
      'Herramientas para manejar el estrés y la frustración',
      'Mejora en relaciones familiares y de pareja',
      'Procesamiento saludable del diagnóstico y cambios de vida',
      'Conexión con otros pacientes en situaciones similares',
      'Mejor calidad de vida general',
    ],
    benefitsEn: [
      'Reduction of anxiety and depression symptoms',
      'Better adherence to medical treatment',
      'Tools to manage stress and frustration',
      'Improvement in family and couple relationships',
      'Healthy processing of diagnosis and life changes',
      'Connection with other patients in similar situations',
      'Better overall quality of life',
    ],
    whatToExpect: 'Las sesiones duran aproximadamente 45-50 minutos. La frecuencia se determina según tus necesidades, desde semanal hasta mensual. Las sesiones pueden realizarse durante tu tratamiento de diálisis (si lo deseas) o en un horario independiente. Todo lo que compartas es completamente confidencial.',
    whatToExpectEn: 'Sessions last approximately 45-50 minutes. Frequency is determined according to your needs, from weekly to monthly. Sessions can be held during your dialysis treatment (if you wish) or at an independent time. Everything you share is completely confidential.',
    faqs: [
      {
        question: '¿Necesito tener un problema grave para ir a terapia?',
        questionEn: 'Do I need to have a serious problem to go to therapy?',
        answer: 'No. Muchos pacientes vienen simplemente para tener un espacio donde hablar de lo que sienten, recibir apoyo durante su adaptación, o aprender herramientas de manejo del estrés. No necesitas estar en crisis.',
        answerEn: 'No. Many patients come simply to have a space to talk about how they feel, receive support during their adaptation, or learn stress management tools. You do not need to be in crisis.',
      },
      {
        question: '¿Mi familia puede participar?',
        questionEn: 'Can my family participate?',
        answer: 'Sí, ofrecemos sesiones familiares y orientación para cuidadores. La enfermedad renal afecta a toda la familia, y es importante que todos tengan apoyo.',
        answerEn: 'Yes, we offer family sessions and guidance for caregivers. Kidney disease affects the whole family, and it is important that everyone has support.',
      },
    ],
    relatedServices: ['hemodialisis', 'trasplante-renal', 'nutricion-renal'],
    image: '/images/services/psicologia.jpg',
    heroImage: '/images/services/psicologia.jpg',
  },
  {
    id: 'accesos-vasculares',
    slug: 'accesos-vasculares',
    iconName: 'Scissors',
    title: 'Accesos Vasculares',
    titleEn: 'Vascular Access',
    shortDescription: 'Procedimientos especializados para crear y mantener el acceso necesario para hemodiálisis.',
    shortDescriptionEn: 'Specialized procedures to create and maintain the access needed for hemodialysis.',
    fullDescription: 'Para realizar hemodiálisis se necesita un acceso vascular que permita extraer y devolver grandes volúmenes de sangre de manera segura. Existen tres tipos principales: la fístula arteriovenosa (AVF), el injerto arteriovenoso y el catéter venoso central. Nuestros cirujanos especializados realizan estos procedimientos con los más altos estándares de calidad, y nuestro equipo de enfermería experto cuida y monitorea tu acceso para asegurar su óptimo funcionamiento.',
    fullDescriptionEn: 'To perform hemodialysis, vascular access is needed that allows large volumes of blood to be safely extracted and returned. There are three main types: arteriovenous fistula (AVF), arteriovenous graft, and central venous catheter. Our specialized surgeons perform these procedures with the highest quality standards, and our expert nursing team cares for and monitors your access to ensure optimal function.',
    whoNeedsIt: 'Todo paciente que va a iniciar hemodiálisis necesita un acceso vascular. Idealmente, la fístula se crea meses antes de necesitar diálisis para permitir su maduración. Los catéteres se usan cuando se necesita diálisis de urgencia o mientras madura una fístula. Los injertos son una alternativa cuando la anatomía del paciente no permite crear una fístula.',
    whoNeedsItEn: 'Every patient who will start hemodialysis needs vascular access. Ideally, the fistula is created months before needing dialysis to allow maturation. Catheters are used when urgent dialysis is needed or while a fistula matures. Grafts are an alternative when the patient anatomy does not allow creating a fistula.',
    process: [
      {
        step: '01',
        title: 'Evaluación vascular',
        titleEn: 'Vascular evaluation',
        description: 'Realizamos un mapeo de tus venas y arterias para determinar el mejor tipo de acceso y la mejor ubicación para ti.',
        descriptionEn: 'We perform a mapping of your veins and arteries to determine the best type of access and the best location for you.',
      },
      {
        step: '02',
        title: 'Procedimiento quirúrgico',
        titleEn: 'Surgical procedure',
        description: 'La cirugía se realiza típicamente de forma ambulatoria con anestesia local. La fístula conecta una arteria con una vena en tu brazo.',
        descriptionEn: 'Surgery is typically performed on an outpatient basis with local anesthesia. The fistula connects an artery to a vein in your arm.',
      },
      {
        step: '03',
        title: 'Maduración',
        titleEn: 'Maturation',
        description: 'La fístula necesita 2-3 meses para madurar antes de poder usarse. Durante este tiempo, te enseñamos ejercicios para fortalecerla.',
        descriptionEn: 'The fistula needs 2-3 months to mature before it can be used. During this time, we teach you exercises to strengthen it.',
      },
      {
        step: '04',
        title: 'Cuidado continuo',
        titleEn: 'Ongoing care',
        description: 'Monitoreamos regularmente el funcionamiento de tu acceso y realizamos intervenciones si hay problemas como estenosis o infección.',
        descriptionEn: 'We regularly monitor the function of your access and perform interventions if there are problems such as stenosis or infection.',
      },
    ],
    benefits: [
      'La fístula es el acceso más duradero y con menos complicaciones',
      'Menor riesgo de infección comparado con catéteres',
      'Mejor flujo sanguíneo para diálisis más eficiente',
      'Mayor comodidad durante las sesiones de tratamiento',
      'Procedimientos mínimamente invasivos con recuperación rápida',
    ],
    benefitsEn: [
      'Fistula is the most durable access with fewer complications',
      'Lower risk of infection compared to catheters',
      'Better blood flow for more efficient dialysis',
      'Greater comfort during treatment sessions',
      'Minimally invasive procedures with quick recovery',
    ],
    whatToExpect: 'La cirugía para crear una fístula dura 1-2 horas y generalmente puedes ir a casa el mismo día. Tendrás algo de molestia e hinchazón que mejora en días. Es importante seguir las instrucciones de cuidado post-operatorio y hacer los ejercicios indicados para ayudar a la maduración de tu fístula.',
    whatToExpectEn: 'Surgery to create a fistula takes 1-2 hours and you can usually go home the same day. You will have some discomfort and swelling that improves within days. It is important to follow post-operative care instructions and do the indicated exercises to help your fistula mature.',
    faqs: [
      {
        question: '¿Qué tipo de acceso es mejor?',
        questionEn: 'What type of access is best?',
        answer: 'La fístula arteriovenosa (AVF) es considerada el "estándar de oro" porque dura más, tiene menos infecciones y funciona mejor a largo plazo. Sin embargo, el mejor acceso depende de tu anatomía y situación médica específica.',
        answerEn: 'The arteriovenous fistula (AVF) is considered the "gold standard" because it lasts longer, has fewer infections, and works better long-term. However, the best access depends on your anatomy and specific medical situation.',
      },
      {
        question: '¿Cuánto dura un acceso vascular?',
        questionEn: 'How long does vascular access last?',
        answer: 'Una fístula bien cuidada puede durar muchos años, incluso décadas. Los injertos duran típicamente 2-5 años. Los catéteres son generalmente temporales y se busca reemplazarlos por fístula cuando sea posible.',
        answerEn: 'A well-cared-for fistula can last many years, even decades. Grafts typically last 2-5 years. Catheters are generally temporary and we seek to replace them with a fistula when possible.',
      },
    ],
    relatedServices: ['hemodialisis', 'cirugia-trasplantes', 'consulta-nefrologia'],
    image: '/images/services/cirugia.jpg',
    heroImage: '/images/services/procedimientos-quirurgicos.jpg',
  },
  {
    id: 'fisioterapia',
    slug: 'fisioterapia',
    iconName: 'Dumbbell',
    title: 'Fisioterapia Intradiálisis',
    titleEn: 'Intradialysis Physiotherapy',
    shortDescription: 'Programa de ejercicios supervisados durante tu sesión de diálisis para mejorar tu fuerza y bienestar.',
    shortDescriptionEn: 'Supervised exercise program during your dialysis session to improve your strength and wellbeing.',
    fullDescription: 'La fisioterapia intradiálisis es un programa de ejercicios seguros y supervisados que realizas durante tu sesión de hemodiálisis. Contrario a lo que muchos creen, el ejercicio durante la diálisis es seguro y tiene múltiples beneficios comprobados. Nuestros fisioterapeutas especializados diseñan rutinas adaptadas a tu condición física y las supervisan en tiempo real, ajustándolas según cómo te sientes cada día.',
    fullDescriptionEn: 'Intradialysis physiotherapy is a safe and supervised exercise program that you perform during your hemodialysis session. Contrary to what many believe, exercise during dialysis is safe and has multiple proven benefits. Our specialized physiotherapists design routines adapted to your physical condition and supervise them in real-time, adjusting them according to how you feel each day.',
    whoNeedsIt: 'Todos los pacientes en hemodiálisis pueden beneficiarse de la fisioterapia intradiálisis, especialmente aquellos con debilidad muscular, fatiga crónica, problemas de movilidad, o quienes desean mantener su independencia funcional. El programa se adapta a cualquier nivel de condición física, desde pacientes muy debilitados hasta aquellos relativamente activos.',
    whoNeedsItEn: 'All hemodialysis patients can benefit from intradialysis physiotherapy, especially those with muscle weakness, chronic fatigue, mobility problems, or those who want to maintain their functional independence. The program adapts to any fitness level, from very weakened patients to those relatively active.',
    process: [
      {
        step: '01',
        title: 'Evaluación física',
        titleEn: 'Physical evaluation',
        description: 'El fisioterapeuta evalúa tu fuerza, flexibilidad, equilibrio y capacidad funcional para diseñar un programa seguro y efectivo.',
        descriptionEn: 'The physiotherapist evaluates your strength, flexibility, balance, and functional capacity to design a safe and effective program.',
      },
      {
        step: '02',
        title: 'Programa personalizado',
        titleEn: 'Personalized program',
        description: 'Se crea una rutina de ejercicios específica para ti, considerando tus limitaciones, objetivos y preferencias.',
        descriptionEn: 'A specific exercise routine is created for you, considering your limitations, goals, and preferences.',
      },
      {
        step: '03',
        title: 'Ejercicio supervisado',
        titleEn: 'Supervised exercise',
        description: 'Durante la primera mitad de tu sesión de diálisis, realizas los ejercicios con supervisión directa del fisioterapeuta.',
        descriptionEn: 'During the first half of your dialysis session, you perform the exercises with direct supervision from the physiotherapist.',
      },
      {
        step: '04',
        title: 'Progresión gradual',
        titleEn: 'Gradual progression',
        description: 'A medida que mejoras, aumentamos gradualmente la intensidad y complejidad de los ejercicios.',
        descriptionEn: 'As you improve, we gradually increase the intensity and complexity of the exercises.',
      },
    ],
    benefits: [
      'Mejora la eficiencia de la diálisis al aumentar el flujo sanguíneo',
      'Reduce la fatiga post-diálisis',
      'Aumenta la fuerza muscular y previene la pérdida de masa muscular',
      'Mejora la presión arterial y salud cardiovascular',
      'Reduce calambres durante y después de la diálisis',
      'Mejora el equilibrio y reduce riesgo de caídas',
      'Aumenta la energía y mejora el estado de ánimo',
      'Hace que el tiempo de diálisis pase más rápido',
    ],
    benefitsEn: [
      'Improves dialysis efficiency by increasing blood flow',
      'Reduces post-dialysis fatigue',
      'Increases muscle strength and prevents muscle mass loss',
      'Improves blood pressure and cardiovascular health',
      'Reduces cramps during and after dialysis',
      'Improves balance and reduces fall risk',
      'Increases energy and improves mood',
      'Makes dialysis time pass faster',
    ],
    whatToExpect: 'Los ejercicios se realizan generalmente durante las primeras 1-2 horas de tu sesión de diálisis, cuando te sientes mejor. Incluyen ejercicios con bandas elásticas, pesas ligeras, pedaleo con cicloergómetro, y ejercicios de flexibilidad. Todo se hace desde tu sillón de tratamiento. La intensidad se ajusta a cómo te sientes cada día.',
    whatToExpectEn: 'Exercises are generally performed during the first 1-2 hours of your dialysis session, when you feel best. They include exercises with elastic bands, light weights, cycling with a cycle ergometer, and flexibility exercises. Everything is done from your treatment chair. Intensity is adjusted to how you feel each day.',
    faqs: [
      {
        question: '¿Es seguro hacer ejercicio durante la diálisis?',
        questionEn: 'Is it safe to exercise during dialysis?',
        answer: 'Sí, múltiples estudios científicos han demostrado que el ejercicio supervisado durante la diálisis es seguro y beneficioso. Nuestros fisioterapeutas están entrenados específicamente para trabajar con pacientes renales.',
        answerEn: 'Yes, multiple scientific studies have shown that supervised exercise during dialysis is safe and beneficial. Our physiotherapists are specifically trained to work with kidney patients.',
      },
      {
        question: '¿Qué pasa si estoy muy cansado o débil?',
        questionEn: 'What if I am very tired or weak?',
        answer: 'El programa se adapta completamente a tu condición. Incluso pacientes muy debilitados pueden comenzar con ejercicios muy suaves y progresar gradualmente. Siempre respetamos cómo te sientes cada día.',
        answerEn: 'The program adapts completely to your condition. Even very weakened patients can start with very gentle exercises and progress gradually. We always respect how you feel each day.',
      },
    ],
    relatedServices: ['hemodialisis', 'nutricion-renal', 'apoyo-psicologico'],
    image: '/images/services/fisioterapia.jpg',
    heroImage: '/images/services/fisioterapia-intradialisis.jpg',
  },
  {
    id: 'consulta-nefrologia',
    slug: 'consulta-nefrologia',
    iconName: 'Stethoscope',
    title: 'Consulta de Nefrología',
    titleEn: 'Nephrology Consultation',
    shortDescription: 'Consultas especializadas con nefrólogos certificados para diagnóstico y manejo de enfermedad renal.',
    shortDescriptionEn: 'Specialized consultations with certified nephrologists for diagnosis and management of kidney disease.',
    fullDescription: 'La nefrología es la especialidad médica dedicada al diagnóstico y tratamiento de las enfermedades del riñón. Nuestros nefrólogos certificados ofrecen consultas integrales para pacientes en todas las etapas de la enfermedad renal, desde la detección temprana y prevención de progresión, hasta el manejo de enfermedad renal avanzada y coordinación de tratamientos como diálisis y trasplante. Nos enfocamos en un enfoque personalizado donde te conocemos a ti y a tu historia.',
    fullDescriptionEn: 'Nephrology is the medical specialty dedicated to the diagnosis and treatment of kidney diseases. Our certified nephrologists offer comprehensive consultations for patients at all stages of kidney disease, from early detection and prevention of progression, to management of advanced kidney disease and coordination of treatments such as dialysis and transplant. We focus on a personalized approach where we get to know you and your history.',
    whoNeedsIt: 'Deberías consultar con un nefrólogo si tienes: enfermedad renal crónica diagnosticada, diabetes o hipertensión con afectación renal, anomalías en análisis de orina (proteína, sangre), niveles elevados de creatinina, antecedentes familiares de enfermedad renal, infecciones urinarias recurrentes, cálculos renales frecuentes, o si estás en diálisis o evaluación para trasplante.',
    whoNeedsItEn: 'You should consult with a nephrologist if you have: diagnosed chronic kidney disease, diabetes or hypertension with kidney involvement, urine test abnormalities (protein, blood), elevated creatinine levels, family history of kidney disease, recurrent urinary infections, frequent kidney stones, or if you are on dialysis or being evaluated for transplant.',
    process: [
      {
        step: '01',
        title: 'Historia clínica',
        titleEn: 'Medical history',
        description: 'El nefrólogo revisa tu historial médico completo, medicamentos, antecedentes familiares y resultados de estudios previos.',
        descriptionEn: 'The nephrologist reviews your complete medical history, medications, family history, and previous study results.',
      },
      {
        step: '02',
        title: 'Exploración física',
        titleEn: 'Physical examination',
        description: 'Se realiza un examen físico enfocado en signos de enfermedad renal, presión arterial, retención de líquidos, etc.',
        descriptionEn: 'A physical examination focused on signs of kidney disease, blood pressure, fluid retention, etc. is performed.',
      },
      {
        step: '03',
        title: 'Análisis y estudios',
        titleEn: 'Tests and studies',
        description: 'Se ordenan o revisan análisis de sangre, orina y estudios de imagen para evaluar la función renal y buscar la causa.',
        descriptionEn: 'Blood tests, urine tests, and imaging studies are ordered or reviewed to evaluate kidney function and find the cause.',
      },
      {
        step: '04',
        title: 'Plan de tratamiento',
        titleEn: 'Treatment plan',
        description: 'El nefrólogo crea un plan personalizado que puede incluir medicamentos, cambios de estilo de vida, y coordinación con otros especialistas.',
        descriptionEn: 'The nephrologist creates a personalized plan that may include medications, lifestyle changes, and coordination with other specialists.',
      },
    ],
    benefits: [
      'Diagnóstico preciso de la causa de tu enfermedad renal',
      'Plan de tratamiento personalizado para retardar la progresión',
      'Manejo óptimo de condiciones relacionadas (diabetes, hipertensión)',
      'Coordinación integral de tu atención médica',
      'Preparación adecuada si necesitas diálisis o trasplante',
      'Seguimiento continuo y ajuste de tratamiento según evolución',
      'Acceso a un equipo multidisciplinario de especialistas',
    ],
    benefitsEn: [
      'Accurate diagnosis of the cause of your kidney disease',
      'Personalized treatment plan to slow progression',
      'Optimal management of related conditions (diabetes, hypertension)',
      'Comprehensive coordination of your medical care',
      'Proper preparation if you need dialysis or transplant',
      'Continuous follow-up and treatment adjustment according to evolution',
      'Access to a multidisciplinary team of specialists',
    ],
    whatToExpect: 'La primera consulta dura aproximadamente 30-45 minutos. Trae todos tus estudios previos, lista de medicamentos y anota tus preguntas. Las consultas de seguimiento son más cortas (15-20 minutos) y se programan según la severidad de tu condición, desde mensuales hasta cada 6 meses para casos estables.',
    whatToExpectEn: 'The first consultation lasts approximately 30-45 minutes. Bring all your previous studies, medication list, and write down your questions. Follow-up consultations are shorter (15-20 minutes) and are scheduled according to the severity of your condition, from monthly to every 6 months for stable cases.',
    faqs: [
      {
        question: '¿Cuándo debo ver a un nefrólogo en vez de mi médico general?',
        questionEn: 'When should I see a nephrologist instead of my general doctor?',
        answer: 'Generalmente, tu médico te referirá cuando tu función renal cae a cierto nivel (etapa 3-4) o cuando hay complicaciones. Sin embargo, puedes solicitar una consulta si tienes preocupaciones específicas sobre tus riñones.',
        answerEn: 'Generally, your doctor will refer you when your kidney function falls to a certain level (stage 3-4) or when there are complications. However, you can request a consultation if you have specific concerns about your kidneys.',
      },
      {
        question: '¿La enfermedad renal tiene cura?',
        questionEn: 'Does kidney disease have a cure?',
        answer: 'Dependiendo de la causa, algunas formas de enfermedad renal pueden mejorar o estabilizarse. Sin embargo, la enfermedad renal crónica generalmente es progresiva. El objetivo del tratamiento es retardar la progresión y manejar los síntomas.',
        answerEn: 'Depending on the cause, some forms of kidney disease can improve or stabilize. However, chronic kidney disease is generally progressive. The goal of treatment is to slow progression and manage symptoms.',
      },
    ],
    relatedServices: ['hemodialisis', 'trasplante-renal', 'nutricion-renal'],
    image: '/images/services/nefrologia.jpg',
    heroImage: '/images/services/consulta.jpg',
  },
  {
    id: 'cirugia-trasplantes',
    slug: 'cirugia-trasplantes',
    iconName: 'UserCog',
    title: 'Cirugía de Trasplantes',
    titleEn: 'Transplant Surgery',
    shortDescription: 'Cirujanos especializados en trasplante renal y procedimientos quirúrgicos relacionados.',
    shortDescriptionEn: 'Surgeons specialized in kidney transplant and related surgical procedures.',
    fullDescription: 'Nuestro equipo de cirugía de trasplantes está compuesto por cirujanos con amplia experiencia y especialización en trasplante renal. Realizamos procedimientos tanto para receptores de trasplante como para donadores vivos, utilizando técnicas modernas que minimizan las complicaciones y aceleran la recuperación. Trabajamos en estrecha coordinación con los nefrólogos y el equipo de trasplante para asegurar los mejores resultados posibles.',
    fullDescriptionEn: 'Our transplant surgery team is composed of surgeons with extensive experience and specialization in kidney transplant. We perform procedures for both transplant recipients and living donors, using modern techniques that minimize complications and speed recovery. We work in close coordination with nephrologists and the transplant team to ensure the best possible outcomes.',
    whoNeedsIt: 'La cirugía de trasplante es para pacientes que han sido aprobados para recibir un riñón (ya sea de donante vivo o fallecido) y para personas que desean donar un riñón a un ser querido. También atendemos cirugías relacionadas como nefrectomías por otras causas y reparación de complicaciones de trasplantes previos.',
    whoNeedsItEn: 'Transplant surgery is for patients who have been approved to receive a kidney (either from a living or deceased donor) and for people who wish to donate a kidney to a loved one. We also perform related surgeries such as nephrectomies for other causes and repair of complications from previous transplants.',
    process: [
      {
        step: '01',
        title: 'Evaluación pre-quirúrgica',
        titleEn: 'Pre-surgical evaluation',
        description: 'Realizamos estudios completos para asegurar que estés en las mejores condiciones para la cirugía.',
        descriptionEn: 'We perform complete studies to ensure you are in the best condition for surgery.',
      },
      {
        step: '02',
        title: 'Preparación',
        titleEn: 'Preparation',
        description: 'Te preparamos física y mentalmente para el procedimiento, explicando cada paso y resolviendo todas tus dudas.',
        descriptionEn: 'We prepare you physically and mentally for the procedure, explaining each step and resolving all your questions.',
      },
      {
        step: '03',
        title: 'Cirugía',
        titleEn: 'Surgery',
        description: 'El trasplante dura aproximadamente 3-4 horas. El riñón nuevo se coloca en la parte baja del abdomen y se conecta a tus vasos sanguíneos y vejiga.',
        descriptionEn: 'The transplant takes approximately 3-4 hours. The new kidney is placed in the lower abdomen and connected to your blood vessels and bladder.',
      },
      {
        step: '04',
        title: 'Recuperación',
        titleEn: 'Recovery',
        description: 'Permanecerás hospitalizado 5-7 días típicamente. El equipo monitorea el funcionamiento del nuevo riñón y ajusta los medicamentos.',
        descriptionEn: 'You will typically stay hospitalized 5-7 days. The team monitors the function of the new kidney and adjusts medications.',
      },
    ],
    benefits: [
      'Cirujanos con alta especialización y experiencia en trasplante renal',
      'Técnicas mínimamente invasivas para donadores (laparoscópica)',
      'Coordinación integral con todo el equipo de trasplante',
      'Seguimiento quirúrgico cercano post-operatorio',
      'Atención de complicaciones quirúrgicas si ocurren',
      'Tiempos de recuperación optimizados',
    ],
    benefitsEn: [
      'Surgeons with high specialization and experience in kidney transplant',
      'Minimally invasive techniques for donors (laparoscopic)',
      'Comprehensive coordination with the entire transplant team',
      'Close post-operative surgical follow-up',
      'Attention to surgical complications if they occur',
      'Optimized recovery times',
    ],
    whatToExpect: 'La cirugía de trasplante se realiza bajo anestesia general. Para el receptor, la cirugía dura 3-4 horas. Para el donador vivo, se usa técnica laparoscópica que permite recuperación más rápida. La hospitalización típica es de 5-7 días para el receptor y 2-3 días para el donador. El seguimiento cercano continúa por varias semanas después del alta.',
    whatToExpectEn: 'Transplant surgery is performed under general anesthesia. For the recipient, surgery takes 3-4 hours. For the living donor, laparoscopic technique is used allowing faster recovery. Typical hospitalization is 5-7 days for the recipient and 2-3 days for the donor. Close follow-up continues for several weeks after discharge.',
    faqs: [
      {
        question: '¿Qué tan riesgosa es la cirugía de trasplante?',
        questionEn: 'How risky is transplant surgery?',
        answer: 'Como toda cirugía mayor, tiene riesgos, pero la cirugía de trasplante renal es un procedimiento bien establecido con tasas de éxito muy altas. Los riesgos específicos se discuten detalladamente durante tu evaluación.',
        answerEn: 'Like all major surgery, it has risks, but kidney transplant surgery is a well-established procedure with very high success rates. Specific risks are discussed in detail during your evaluation.',
      },
      {
        question: '¿Es seguro donar un riñón?',
        questionEn: 'Is it safe to donate a kidney?',
        answer: 'Sí, los donadores vivos son evaluados exhaustivamente para asegurar que la donación sea segura para ellos. Las personas pueden vivir vidas normales y saludables con un solo riñón. La técnica laparoscópica minimiza las molestias y acelera la recuperación.',
        answerEn: 'Yes, living donors are thoroughly evaluated to ensure donation is safe for them. People can live normal, healthy lives with one kidney. Laparoscopic technique minimizes discomfort and speeds recovery.',
      },
    ],
    relatedServices: ['trasplante-renal', 'consulta-nefrologia', 'accesos-vasculares'],
    image: '/images/services/cirugia.jpg',
    heroImage: '/images/services/procedimientos-quirurgicos.jpg',
  },
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find(service => service.slug === slug);
}

// Helper function to get all service slugs
export function getAllServiceSlugs(): string[] {
  return servicesData.map(service => service.slug);
}
