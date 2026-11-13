import { Calendar, Compass, Home, Palette, User } from 'lucide-react';

interface FooterProps {
  activeNav: string;
}

const MOBILE_TABS = [
  { id: 'inicio', label: 'Inicio', href: '#inicio', Icon: Home },
  { id: 'obras', label: 'Obras', href: '#obras', Icon: Palette },
  { id: 'agenda', label: 'Agenda', href: '#agenda', Icon: Calendar },
  { id: 'aprender', label: 'Aprender', href: '#aprender', Icon: Compass },
  { id: 'cuenta', label: 'Cuenta', href: '#cuenta', Icon: User },
];

export function Footer({ activeNav }: FooterProps) {
  return (
    <>
      <footer className="mt-16 bg-[#B76904] text-white pb-20 md:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 pt-9 pb-10 lg:px-8">
          {/* Trust strip matching reference footer */}
          <div className="grid grid-cols-2 gap-3 pb-7 text-sm font-medium text-[#FDF6E8] sm:grid-cols-4 sm:gap-6">
            <span>Selección curatorial</span>
            <span>Certificado digital</span>
            <span>Pagos protegidos</span>
            <span>Atención personalizada</span>
          </div>

          <div className="border-t border-[#E6B86C]/35 pt-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <a
                  href="#inicio"
                  className="font-serif text-[1.6rem] font-medium tracking-[0.16em] text-white"
                >
                  LUMINA
                </a>
              </div>

              <div className="text-sm leading-relaxed text-[#F7DFB2]">
                <p className="font-medium text-white">Contacto</p>
                <p className="mt-1.5">
                  <a
                    href="mailto:hola@lumina.example"
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    hola@lumina.example
                  </a>
                </p>
                <p>Lun–vie · 9:00 a. m.–6:00 p. m.</p>
              </div>

              <div className="flex flex-col gap-1.5 text-sm text-[#F7DFB2]">
                <a href="#ayuda" className="hover:text-white hover:underline underline-offset-4">
                  Ayuda y confianza
                </a>
                <a href="#ayuda" className="hover:text-white hover:underline underline-offset-4">
                  Envíos y devoluciones
                </a>
                <a href="#ayuda" className="hover:text-white hover:underline underline-offset-4">
                  Pagos y facturación
                </a>
              </div>

              <div className="flex flex-col gap-1.5 text-sm text-[#F7DFB2]">
                <a href="#ayuda" className="hover:text-white hover:underline underline-offset-4">
                  Términos y condiciones
                </a>
                <a href="#ayuda" className="hover:text-white hover:underline underline-offset-4">
                  Política de privacidad
                </a>
                <a href="#ayuda" className="hover:text-white hover:underline underline-offset-4">
                  Tratamiento de datos
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-[#E6B86C]/25 pt-5 text-xs leading-relaxed text-[#F5D8A2]">
              <p>© 2026 Lumina · Colombia · Precios en COP</p>
              <p className="mt-0.5">
                Experiencia de muestra · Datos de catálogo y contacto ilustrativos.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp contact */}
      <a
        href="https://wa.me/570000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-20 z-20 rounded-full bg-[#1F6E43] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-transform duration-150 hover:scale-[1.03] md:bottom-5 md:text-sm"
      >
        WhatsApp
      </a>

      {/* Compact mobile bottom navigation (<= 15% mobile height) */}
      <nav
        aria-label="Barra inferior"
        className="fixed right-0 bottom-0 left-0 z-20 flex border-t border-[#E5DAC3] bg-[#FAF7F0] px-1.5 py-1 md:hidden"
      >
        {MOBILE_TABS.map(({ id, label, href, Icon }) => {
          const isActive = activeNav === id;
          return (
            <a
              key={id}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center justify-center rounded-md py-1.5 text-[0.7rem] transition-colors ${
                isActive
                  ? 'bg-[#F2E7CF] font-semibold text-[#9E5602]'
                  : 'text-[#7A6247]'
              }`}
            >
              <Icon className="mb-0.5 h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
