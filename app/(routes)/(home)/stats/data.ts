import {
  Zap,
  ShieldCheck,
  Clock,
  TrendingUp,
  Users,
  BarChart2,
  CheckCircle2,
  Globe,
} from "lucide-react";

export const mainStats = [
  {
    value: 10000,
    suffix: "+",
    label: "Tareas completadas",
    desc: "por equipos activos en la plataforma",
  },
  {
    value: 500,
    suffix: "+",
    label: "Equipos activos",
    desc: "gestionando proyectos cada día",
  },
  {
    value: 99,
    suffix: "%",
    label: "Uptime garantizado",
    desc: "infraestructura confiable 24/7",
  },
  {
    value: 2,
    suffix: "min",
    label: "Para empezar",
    desc: "desde el registro hasta tu primer board",
  },
];

export const benefits = [
  {
    Icon: Zap,
    title: "Velocidad real",
    value: "3×",
    desc: "Los equipos que usan Kiki reportan completar proyectos hasta 3 veces más rápido gracias a la visibilidad centralizada.",
  },
  {
    Icon: TrendingUp,
    title: "Más entregas",
    value: "87%",
    desc: "de los equipos mejoran su tasa de entrega a tiempo en el primer mes de uso.",
  },
  {
    Icon: Users,
    title: "Adopción de equipo",
    value: "94%",
    desc: "de los miembros invitados se activan en las primeras 24 horas.",
  },
  {
    Icon: BarChart2,
    title: "Tareas completadas",
    value: "+40%",
    desc: "de incremento promedio en productividad tras el primer sprint gestionado en Kiki.",
  },
  {
    Icon: Clock,
    title: "Ahorro de tiempo",
    value: "5h/sem",
    desc: "que los equipos recuperan al eliminar reuniones de status update innecesarias.",
  },
  {
    Icon: CheckCircle2,
    title: "Reducción de errores",
    value: "60%",
    desc: "menos tareas olvidadas o duplicadas gracias a las asignaciones y notificaciones automáticas.",
  },
];

export const pillars = [
  {
    Icon: ShieldCheck,
    title: "Seguridad primero",
    points: [
      "Autenticación segura con Clerk",
      "Roles y permisos por board",
      "Acceso solo para miembros invitados",
      "Datos encriptados en tránsito",
    ],
  },
  {
    Icon: Globe,
    title: "Siempre disponible",
    points: [
      "99% uptime en infraestructura cloud",
      "Despliegue en Vercel Edge Network",
      "Base de datos gestionada en Neon",
      "Actualizaciones sin interrupciones",
    ],
  },
  {
    Icon: Zap,
    title: "Rendimiento rápido",
    points: [
      "Carga inicial < 1s en conexiones rápidas",
      "Interfaz reactiva sin recargas de página",
      "Caché inteligente en servidor",
      "Optimizado para Next.js 15",
    ],
  },
];
