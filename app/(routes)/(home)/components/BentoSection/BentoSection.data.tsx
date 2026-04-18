import {
  Bell,
  CheckCircle2,
  UserCircle,
  MessageSquare,
} from "lucide-react";

export const tasks = [
  { title: "Diseñar landing page", list: "En progreso", done: false },
  { title: "Revisar pull request", list: "Por hacer", done: false },
  { title: "Deploy a producción", list: "Completado", done: true },
  { title: "Reunión de equipo", list: "Por hacer", done: false },
  { title: "Actualizar documentación", list: "En progreso", done: false },
  { title: "Corregir bug #142", list: "Completado", done: true },
];

export const notifications = [
  {
    icon: <UserCircle size={14} />,
    msg: "Ana te asignó una tarea",
    time: "ahora",
  },
  {
    icon: <MessageSquare size={14} />,
    msg: "Nuevo comentario en #diseño",
    time: "1min",
  },
  {
    icon: <CheckCircle2 size={14} />,
    msg: "Tarea completada por Carlos",
    time: "3min",
  },
  {
    icon: <Bell size={14} />,
    msg: "Recordatorio: entrega mañana",
    time: "5min",
  },
  {
    icon: <UserCircle size={14} />,
    msg: "Luis se unió al board",
    time: "10min",
  },
];

export const members = [
  { name: "Ana", color: "bg-violet-500" },
  { name: "Luis", color: "bg-blue-500" },
  { name: "Sara", color: "bg-emerald-500" },
  { name: "Carlos", color: "bg-orange-500" },
];

export const bars = [40, 70, 50, 90, 60, 80, 45];

export const labels = [
  { text: "Urgente", color: "bg-red-500" },
  { text: "Alta", color: "bg-orange-400" },
  { text: "Diseño", color: "bg-violet-500" },
  { text: "Dev", color: "bg-blue-500" },
  { text: "Media", color: "bg-yellow-400" },
  { text: "QA", color: "bg-teal-500" },
  { text: "Baja", color: "bg-slate-400" },
  { text: "Marketing", color: "bg-pink-500" },
];

export const highlighted = [4, 9, 14, 18, 22, 27];

export const subtasks = [
  { label: "Definir wireframes", done: true },
  { label: "Diseño en Figma", done: true },
  { label: "Implementar componentes", done: false },
  { label: "Revisar con el equipo", done: false },
  { label: "Deploy a staging", done: false },
];