import {
  CheckCircle2,
  Users,
  LayoutDashboard,
  Bell,
  Tags,
  Paperclip,
  Calendar,
  BarChart2,
  ListTodo,
  Zap,
} from "lucide-react";

export const features = [
  { icon: <LayoutDashboard size={16} />, label: "Boards Kanban" },
  { icon: <Users size={16} />, label: "Colaboración en equipo" },
  { icon: <CheckCircle2 size={16} />, label: "Subtareas" },
  { icon: <Bell size={16} />, label: "Notificaciones" },
  { icon: <Tags size={16} />, label: "Etiquetas" },
  { icon: <Paperclip size={16} />, label: "Adjuntos" },
  { icon: <Calendar size={16} />, label: "Fechas de vencimiento" },
  { icon: <BarChart2 size={16} />, label: "Progreso visual" },
  { icon: <ListTodo size={16} />, label: "Vista de lista" },
  { icon: <Zap size={16} />, label: "Tiempo real" },
];
