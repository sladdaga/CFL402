// Cómo debe desplazarse la página por código (scrollTo): suave, salvo que el usuario haya pedido "reducir movimiento"
// en su sistema (en ese caso salta directo). Complementa la regla equivalente que ya existe en el CSS.
export function comportamientoScroll(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}
