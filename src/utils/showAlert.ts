import Swal from "sweetalert2";
const alertConfig = {
  background: "#18191d",
  color: "#e4e4e7",
  confirmButtonColor: "#059669",
  customClass: {
    popup: "rounded-xl border border-white/[0.08]",
    title: "text-base font-semibold",
    htmlContainer: "text-xs text-zinc-400",
  },
};

const showAlert = async (
  icon: "success" | "error" | "warning" | "info",
  title: string,
  text: string,
  options?: {
    timer?: number;
    showConfirmButton?: boolean;
  },
) => {
  return Swal.fire({
    icon,
    title,
    text,
    ...alertConfig,
    ...options,
  });
};

export default showAlert;
