import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad y uso de cookies de Kikiboard.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Volver al inicio
        </Link>

        <h1 className="text-2xl font-semibold mb-1">Política de privacidad</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Última actualización: mayo 2026
        </p>

        <div className="flex flex-col gap-8 text-sm text-muted-foreground leading-relaxed">

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">1. Responsable</h2>
            <p>
              El responsable del tratamiento de los datos recogidos a través de{" "}
              <span className="text-foreground">kikiboard.xyz</span> es el equipo
              detrás de Kikiboard. Para cualquier consulta relacionada con tu privacidad
              puedes contactarnos en{" "}
              <a
                href="mailto:contacto@kikiboard.xyz"
                className="text-foreground underline underline-offset-2"
              >
                contact@kikiboard.xyz
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">2. Datos que recopilamos</h2>
            <ul className="list-disc list-inside flex flex-col gap-1">
              <li>
                <span className="text-foreground">Datos de cuenta:</span> nombre,
                dirección de correo electrónico y proveedor de autenticación (email/contraseña
                o Google OAuth), gestionados a través de Clerk.
              </li>
              <li>
                <span className="text-foreground">Contenido generado:</span> boards,
                listas, tareas, subtareas, comentarios y archivos adjuntos que creas
                dentro de la plataforma.
              </li>
              <li>
                <span className="text-foreground">Datos de uso:</span> registro de
                actividad dentro de los boards (acciones realizadas, fechas).
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">3. Finalidad del tratamiento</h2>
            <ul className="list-disc list-inside flex flex-col gap-1">
              <li>Prestar el servicio de gestión de proyectos.</li>
              <li>Identificar y autenticar a los usuarios.</li>
              <li>Permitir la colaboración entre miembros de un board.</li>
              <li>Enviar notificaciones relacionadas con la actividad del usuario.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">4. Cookies</h2>
            <p>
              Kikiboard utiliza cookies estrictamente necesarias para el funcionamiento
              de la aplicación:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-1">
              <li>
                <span className="text-foreground">Cookies de sesión:</span> gestionadas
                por Clerk para mantener tu sesión activa de forma segura.
              </li>
              <li>
                <span className="text-foreground">Preferencias locales:</span>{" "}
                almacenadas en <code className="text-foreground">localStorage</code>{" "}
                (por ejemplo, aceptación de esta política). No se envían a ningún servidor.
              </li>
            </ul>
            <p>
              No utilizamos cookies de seguimiento, publicidad ni analítica de terceros.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">5. Servicios de terceros</h2>
            <ul className="list-disc list-inside flex flex-col gap-1">
              <li>
                <span className="text-foreground">Clerk</span> — autenticación y gestión
                de usuarios.
              </li>
              <li>
                <span className="text-foreground">Neon</span> — base de datos PostgreSQL
                en la nube.
              </li>
              <li>
                <span className="text-foreground">Vercel</span> — infraestructura de
                despliegue y almacenamiento de archivos.
              </li>
            </ul>
            <p>
              Cada uno de estos servicios cuenta con su propia política de privacidad y
              medidas de seguridad.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">6. Conservación de datos</h2>
            <p>
              Los datos se conservan mientras la cuenta esté activa. Al eliminar tu
              cuenta, todos tus datos son borrados de nuestra base de datos de forma
              permanente e irreversible.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">7. Tus derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar y suprimir tus datos. Puedes ejercer
              estos derechos directamente desde la configuración de tu cuenta o
              contactándonos en{" "}
              <a
                href="mailto:contacto@kikiboard.xyz"
                className="text-foreground underline underline-offset-2"
              >
                contacto@kikiboard.xyz
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-foreground">8. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política ocasionalmente. En caso de cambios
              relevantes, te notificaremos a través de la plataforma o por correo
              electrónico.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
