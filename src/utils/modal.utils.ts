import { Modal } from "bootstrap";

// README: estou utilizando bootstrap para lidar com as modais,
// porém não consigo fechar ele, mesmo usando um gerenciador de estado, ou o useRef
// então para não perder tempo decidi remover o modal-backdrop e adicionar o display none
export function removeModalBackdrop() {
  const backdrop = document.querySelector(".modal-backdrop");
  console.log("oi");
  if (backdrop) {
    backdrop?.parentNode?.removeChild(backdrop);
  }
}

export function openModal(id: string) {
  const modalElement = document?.getElementById(id) || "";
  const modal = new Modal(modalElement, {
    backdrop: true,
    keyboard: true,
    focus: true,
  });

  modal.show();
}
