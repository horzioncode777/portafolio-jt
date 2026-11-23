// Current project description, based on the Bastión Executive implementation.
const translations={};
const text=(es,en)=>{translations[es]=en;return es;};
const name='Bastión Executive';
const description=text('Bastión Executive es la evolución de mi proyecto de trading con IA: una plataforma local que reúne análisis de CFDs con MetaTrader 5, modelos ASTRA y un módulo independiente de Options en demo. Integra mercados, gráficos, posiciones, historial y controles de riesgo en una interfaz negra y dorada.','Bastión Executive is the evolution of my AI trading project: a local platform combining CFD analysis through MetaTrader 5, ASTRA models and a separate demo Options module. It brings together markets, charts, positions, history and risk controls in a black-and-gold interface.');
const extraDescription=text('Su arquitectura conecta una interfaz en JavaScript con servicios Node.js y procesos Python. ASTRA permite entrenar por mercado y trabajar en observación o pruebas demo; ASTRA-LAB incorpora investigación con validación walk-forward y señales de solo lectura. El desarrollo continúa centrado en integración, trazabilidad y evaluación de los modelos.','Its architecture connects a JavaScript interface with Node.js services and Python processes. ASTRA supports training per market, observation and demo testing; ASTRA-LAB adds research with walk-forward validation and read-only signals. Development continues to focus on integration, traceability and model evaluation.');
const skillsSummary=text('Node.js · Python · MetaTrader 5','Node.js · Python · MetaTrader 5');
const learning=text('He ampliado el proyecto desde una terminal de cotizaciones hasta una aplicación modular: integración con MetaTrader 5 y Deriv Demo, comunicación entre Node.js y Python, modelos con scikit-learn, investigación con pandas y NumPy, y pruebas de los servicios y las reglas de ejecución.','I have expanded the project from a quote terminal into a modular application: integration with MetaTrader 5 and Deriv Demo, communication between Node.js and Python, scikit-learn models, research with pandas and NumPy, and testing of services and execution rules.');
const features=[
 text('Terminal CFD conectada a MetaTrader 5: símbolos, velas, cotizaciones, posiciones e historial.','A CFD terminal integrated with MetaTrader 5: symbols, candles, quotes, positions and history.'),
 text('ASTRA: entrenamiento por mercado, lectura de señales, observación y pruebas de ejecución en demo.','ASTRA: training per market, signal analysis, observation and demo execution testing.'),
 text('ASTRA-LAB: investigación histórica, validación walk-forward y observación sin enviar órdenes.','ASTRA-LAB: historical research, walk-forward validation and observation without sending orders.'),
 text('Options Demo: análisis de ticks de Deriv, modelos por mercado y duración, registro y exportación CSV.','Options Demo: Deriv tick analysis, models per market and duration, logging and CSV export.'),
 text('Controles de volumen, Stop Loss, Take Profit, límites de riesgo y notificaciones de actividad.','Controls for volume, Stop Loss, Take Profit, risk limits and activity notifications.')
];
const areas=[
 text('Integración con MetaTrader 5','MetaTrader 5 integration'),
 text('Node.js y procesos Python','Node.js and Python processes'),
 text('scikit-learn · pandas · NumPy','scikit-learn · pandas · NumPy'),
 text('Validación walk-forward','Walk-forward validation'),
 text('WebSockets y Deriv Demo','WebSockets and Deriv Demo'),
 text('Pruebas y trazabilidad','Testing and traceability')
];
const gallery=[
 ['overview.jpg',text('Bastión Executive · Vista general sin cuenta conectada','Bastión Executive · Overview with no account connected')],
 ['modules.jpg',text('Módulos de CFDs, ASTRA, riesgo y ASTRA-LAB','CFD, ASTRA, risk and ASTRA-LAB modules')],
 ['cfds.jpg',text('Terminal CFD y catálogo de mercados · MT5 sin conectar','CFD terminal and market catalog · MT5 disconnected')],
 ['astra.jpg',text('ASTRA · Panel de análisis y controles de observación','ASTRA · Analysis panel and observation controls')],
 ['lab.jpg',text('ASTRA-LAB · Investigación y validación de modelos','ASTRA-LAB · Model research and validation')],
 ['options.jpg',text('Options Demo · Interfaz de análisis de ticks y contratos','Options Demo · Tick and contract analysis interface')]
].map(([file,caption])=>['assets/bastion-gallery/'+file,caption]);
module.exports={
 name,description,extraDescription,learning,features,areas,gallery,skillsSummary,
 stage:text('En desarrollo','In development'),
 interfaceAlt:text('Interfaz de Bastión Executive','Bastión Executive interface'),
 galleryLabel:text('Capturas de Bastión Executive','Screenshots of Bastión Executive'),
 image:'assets/bastion-gallery/overview.jpg',logo:'bastion-emblem.png',
 stack:['JavaScript','Node.js','Python','MetaTrader 5','scikit-learn','pandas','NumPy','WebSockets'],
 alt:text('Bastión Executive: vista general de la plataforma de trading con IA, sin cuenta conectada','Bastión Executive: overview of the AI trading platform with no account connected'),
 pageIntro:text('Desarrollo Full Stack, comercio electrónico y audio digital: conoce el propósito, las funcionalidades y las tecnologías de cada proyecto. Explora también Bastión Executive, la evolución de mi plataforma de trading con IA.','Full Stack development, e-commerce and digital audio: discover the purpose, features and technologies behind each project. Also explore Bastión Executive, the evolution of my AI trading platform.'),
 heading:text('Análisis, modelos y control en una misma plataforma.','Analysis, models and control in one platform.'),
 bannerLabel:text('TRADING CON IA · PLATAFORMA LOCAL','AI TRADING · LOCAL PLATFORM'),
 bannerTitle:text('Una nueva etapa del trading con IA.','A new stage in AI trading.'),
 bannerSubtitle:text('CFDs · MetaTrader 5 · ASTRA · ASTRA-LAB · Options Demo','CFDs · MetaTrader 5 · ASTRA · ASTRA-LAB · Demo Options'),
 previewNote:text('Capturas de la interfaz actual sin cuenta conectada.','Screenshots of the current interface with no account connected.'),
 context:text('PROYECTO PERSONAL · EN DESARROLLO','PERSONAL PROJECT · IN DEVELOPMENT'),
 tabLabel:text('Bastión Executive · Trading con IA','Bastión Executive · AI Trading'),
 tags:[text('IA aplicada','Applied AI'),'MetaTrader 5','ASTRA'],
 skillCard:{
  label:text('IA APLICADA · BASTIÓN EXECUTIVE','APPLIED AI · BASTIÓN EXECUTIVE'),
  title:text('Integración de plataformas y modelos','Platform and model integration'),
  description:text('Desarrollo una aplicación modular que conecta JavaScript, Node.js y Python con MetaTrader 5. Trabajo en entrenamiento de modelos, investigación histórica y seguimiento de operaciones en entornos demo.','I develop a modular application connecting JavaScript, Node.js and Python with MetaTrader 5. I work on model training, historical research and trade tracking in demo environments.'),
  items:[
   text('Servicios locales, procesos Python y comunicación con APIs de plataformas de trading.','Local services, Python processes and communication with trading platform APIs.'),
   text('Preparación de datos, modelos con scikit-learn y validación cronológica walk-forward.','Data preparation, scikit-learn models and chronological walk-forward validation.'),
   text('Registros persistentes, conciliación de estados y pruebas de las reglas de ejecución.','Persistent logs, state reconciliation and testing of execution rules.')
  ]
 },
 appliedSummary:text('Conectar datos de mercado, modelos y controles de ejecución.','Connecting market data, models and execution controls.'),
 layers:[
  ['realtime',text('Conectar las plataformas','Connect the platforms'),'Node.js · Python · MT5',text('Servicios locales y puentes con MetaTrader 5 y Deriv Demo.','Local services and bridges to MetaTrader 5 and Deriv Demo.')],
  ['data',text('Entrenar e investigar','Train and research'),'scikit-learn · pandas · NumPy',text('Modelos por mercado, preparación de históricos y validación walk-forward.','Models per market, historical data preparation and walk-forward validation.')],
  ['quality',text('Observar y comprobar','Observe and verify'),text('ASTRA · Registros · Pruebas','ASTRA · Logs · Tests'),text('Observación, seguimiento de posiciones y pruebas de controles de riesgo en demo.','Observation, position tracking and testing of risk controls in demo.')]
 ],
 evidence:text('Bastión Executive conecta una interfaz de trading con servicios locales, modelos cuantitativos y herramientas de investigación. He trabajado en la integración entre capas, la persistencia de estados y el seguimiento de decisiones y operaciones demo.','Bastión Executive connects a trading interface with local services, quantitative models and research tools. I have worked on integration across layers, state persistence and the tracking of decisions and demo trades.'),
 evidencePoints:[
  text('JavaScript, Node.js y Python integrados con MetaTrader 5 y Deriv Demo.','JavaScript, Node.js and Python integrated with MetaTrader 5 and Deriv Demo.'),
  text('ASTRA-LAB, validación walk-forward y pruebas de los servicios.','ASTRA-LAB, walk-forward validation and service tests.')
 ],
 translations
};
