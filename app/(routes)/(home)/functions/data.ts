import {
  LayoutDashboard,
  Users,
  Bell,
  BarChart2,
  Tags,
  ListChecks,
  CalendarIcon,
  Link2,
  Paperclip,
  MessageSquare,
} from "lucide-react";

export const details = [
  {
    Icon: LayoutDashboard,
    title: "Boards Kanban",
    description:
      "Organiza cualquier proyecto en tableros visuales con listas totalmente personalizables. Arrastra y suelta tareas entre columnas con soporte completo de drag & drop, cambia prioridades al instante y mantén a tu equipo siempre al día.",
    points: [
      "Crea múltiples boards por proyecto",
      "Listas ilimitadas por tablero",
      "Drag & drop entre listas",
      "Color personalizado por board",
    ],
  },
  {
    Icon: Users,
    title: "Colaboración en equipo",
    description:
      "Invita a tu equipo con un simple enlace o por email. Asigna tareas a miembros específicos, gestiona roles y mantén a todos sincronizados sin esfuerzo.",
    points: [
      "Invitaciones por email",
      "Asignación de tareas por miembro",
      "Gestión de roles (admin / miembro)",
      "Actualizaciones en tiempo real",
    ],
  },
  {
    Icon: Bell,
    title: "Notificaciones inteligentes",
    description:
      "Recibe alertas inmediatas cuando te asignan una tarea, cuando alguien comenta en tu proyecto o cuando hay cambios importantes. Nunca pierdas el hilo.",
    points: [
      "Notificaciones en tiempo real",
      "Alertas de asignación de tareas",
      "Avisos de nuevos comentarios",
      "Centro de notificaciones unificado",
    ],
  },
  {
    Icon: BarChart2,
    title: "Progreso y métricas",
    description:
      "Visualiza el avance de cada proyecto con barras de progreso, actividad semanal y métricas por board. Toma decisiones basadas en datos reales.",
    points: [
      "Gráfico de actividad semanal",
      "Barras de progreso por board",
      "Contador de tareas completadas",
      "Vista de estadísticas en dashboard",
    ],
  },
  {
    Icon: Tags,
    title: "Etiquetas y prioridades",
    description:
      "Clasifica tareas con etiquetas de colores personalizadas y niveles de prioridad. Filtra y encuentra lo que necesitas en segundos.",
    points: [
      "Etiquetas con colores personalizados",
      "Prioridades: alta, media, baja",
      "Múltiples etiquetas por tarea",
      "Etiquetas por board",
    ],
  },
  {
    Icon: ListChecks,
    title: "Subtareas",
    description:
      "Divide tareas complejas en pasos manejables. Realiza un seguimiento del progreso con una barra visual y marca subtareas conforme las completas.",
    points: [
      "Subtareas anidadas por tarea",
      "Barra de progreso visual",
      "Reordenamiento por drag & drop",
      "Contador de completadas",
    ],
  },
  {
    Icon: CalendarIcon,
    title: "Calendario de vencimientos",
    description:
      "Visualiza todas tus tareas con fecha de vencimiento en un calendario mensual. Planifica sprints, entregas y deadlines con claridad.",
    points: [
      "Vista mensual de tareas",
      "Fechas de inicio y vencimiento",
      "Indicadores visuales de urgencia",
      "Navegación rápida por mes",
    ],
  },
  {
    Icon: MessageSquare,
    title: "Comentarios en tareas",
    description:
      "Debate, resuelve dudas y deja feedback directamente en cada tarea. Mantén toda la conversación del proyecto en un solo lugar.",
    points: [
      "Comentarios por tarea",
      "Historial de conversación",
      "Avatares de participantes",
      "Notificaciones de respuesta",
    ],
  },
  {
    Icon: Link2,
    title: "Links del proyecto",
    description:
      "Añade enlaces relevantes al board: ramas de Git, deploys, diseños en Figma o cualquier recurso externo. Accede a todo sin salir del contexto.",
    points: [
      "Links rápidos en el header del board",
      "Etiqueta personalizable por enlace",
      "Acceso instantáneo desde cualquier vista",
      "Solo el propietario puede editar",
    ],
  },
  {
    Icon: Paperclip,
    title: "Adjuntos",
    description:
      "Sube archivos directamente a las tareas: imágenes, documentos, capturas. Todo el material del proyecto organizado y siempre a mano.",
    points: [
      "Adjuntos por tarea",
      "Previsualización de imágenes",
      "Descarga directa",
      "Control de tamaño de archivo",
    ],
  },
];
