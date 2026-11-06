// Hace que cada sección aparezca con una animación suave (fundido + leve subida) cuando entra en pantalla al hacer scroll.
// Las clases "reveal" (oculta) y "reveal--visible" (visible) se definen en src/index.css.
// Devuelve una función que deshace todo (React la usa al desmontar).
export function activarAparicion(): () => void {
  // Si el usuario pidió reducir movimiento, o el navegador es muy viejo, no se anima nada y todo se ve directamente.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    return () => {}
  }

  const alto = window.innerHeight

  // El observador avisa cuando una sección entra en pantalla: se la muestra y se deja de observar (aparece una sola vez).
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible')
          observador.unobserve(e.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
  )

  const elementos = document.querySelectorAll<HTMLElement>('main > section, .footer')
  elementos.forEach((el) => {
    // Lo que ya está a la vista al cargar (o quedó más arriba al recargar a mitad de página) no se oculta, para evitar parpadeos.
    if (el.getBoundingClientRect().top < alto * 0.85) return
    el.classList.add('reveal')
    observador.observe(el)
  })

  return () => {
    observador.disconnect()
    elementos.forEach((el) => el.classList.remove('reveal', 'reveal--visible'))
  }
}
