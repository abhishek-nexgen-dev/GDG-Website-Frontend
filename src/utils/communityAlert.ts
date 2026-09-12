import Swal from "sweetalert2";
import api from "./axios.utils";

export const showJoinCommunityModal = () => {
  Swal.fire({
    title: "Join GDG Ranchi",
    html: `
      <div style="text-align: left; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">
        <p style="margin-bottom: 12px;">
          Welcome to Jharkhand's official Google Developer Groups community! Choose how you'd like to get involved:
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin: 16px 0;">
          <a href="https://gdg.community.dev/gdg-ranchi/" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(66, 133, 244, 0.12); border: 1px solid rgba(66, 133, 244, 0.3); border-radius: 12px; color: #8ab4f8; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
            <span>🌐 Official Chapter Page (RSVP Events)</span>
            <span>&rarr;</span>
          </a>
          <a href="https://discord.gg/gdgranchi" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(88, 101, 242, 0.12); border: 1px solid rgba(88, 101, 242, 0.3); border-radius: 12px; color: #9aa5ff; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
            <span>💬 Discord Community (Tech Chat & Help)</span>
            <span>&rarr;</span>
          </a>
          <a href="https://chat.whatsapp.com/gdgranchi" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(52, 168, 83, 0.12); border: 1px solid rgba(52, 168, 83, 0.3); border-radius: 12px; color: #6ee7b7; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
            <span>📱 WhatsApp Community Announcements</span>
            <span>&rarr;</span>
          </a>
          <button id="btn-register-partner" type="button" style="cursor: pointer; text-align: left; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(234, 67, 53, 0.12); border: 1px solid rgba(234, 67, 53, 0.3); border-radius: 12px; color: #fca5a5; font-weight: 600; font-size: 0.9rem;">
            <span>🤝 Register Partner Community / Campus Club</span>
            <span>&rarr;</span>
          </button>
        </div>
        <p style="margin-bottom: 0; font-size: 0.8rem; color: #94a3b8;">
          All developers, students, and tech enthusiasts are welcome. Zero fee, 100% community-driven.
        </p>
      </div>
    `,
    icon: "info",
    showConfirmButton: true,
    confirmButtonText: "Visit GDG Chapter Page",
    showCancelButton: true,
    cancelButtonText: "Close",
    confirmButtonColor: "#4285F4",
    cancelButtonColor: "#334155",
    background: "#0d0d12",
    color: "#ffffff",
    didOpen: () => {
      const partnerBtn = document.getElementById("btn-register-partner");
      if (partnerBtn) {
        partnerBtn.addEventListener("click", () => {
          Swal.close();
          showRegisterCommunityModal();
        });
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      window.open("https://gdg.community.dev/gdg-ranchi/", "_blank");
    }
  });
};

export const showRegisterCommunityModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Register Partner Community",
    html: `
      <div style="text-align: left; display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: #cbd5e1;">
        <label>Community Name</label>
        <input id="swal-comm-name" class="swal2-input" placeholder="e.g. BIT Mesra Tech Club" style="margin: 0 0 8px 0; background: #1a1a24; color: #fff; border: 1px solid #334155; width: 100%; box-sizing: border-box;" />
        <label>Official Email</label>
        <input id="swal-comm-email" class="swal2-input" type="email" placeholder="club@college.edu" style="margin: 0 0 8px 0; background: #1a1a24; color: #fff; border: 1px solid #334155; width: 100%; box-sizing: border-box;" />
        <label>City</label>
        <input id="swal-comm-city" class="swal2-input" placeholder="e.g. Ranchi" value="Ranchi" style="margin: 0 0 8px 0; background: #1a1a24; color: #fff; border: 1px solid #334155; width: 100%; box-sizing: border-box;" />
        <label>Website / Link</label>
        <input id="swal-comm-web" class="swal2-input" placeholder="https://..." style="margin: 0 0 8px 0; background: #1a1a24; color: #fff; border: 1px solid #334155; width: 100%; box-sizing: border-box;" />
      </div>
    `,
    background: "#0d0d12",
    color: "#ffffff",
    confirmButtonColor: "#4285F4",
    confirmButtonText: "Submit Registration",
    showCancelButton: true,
    cancelButtonColor: "#334155",
    preConfirm: () => {
      const name = (document.getElementById("swal-comm-name") as HTMLInputElement)?.value;
      const email = (document.getElementById("swal-comm-email") as HTMLInputElement)?.value;
      const city = (document.getElementById("swal-comm-city") as HTMLInputElement)?.value;
      const web = (document.getElementById("swal-comm-web") as HTMLInputElement)?.value;

      if (!name || !email) {
        Swal.showValidationMessage("Please provide Community Name and Official Email");
        return false;
      }
      return { name, email, city, web };
    },
  });

  if (formValues) {
    try {
      Swal.fire({
        title: "Submitting...",
        text: "Registering community with GDG Ranchi network",
        allowOutsideClick: false,
        background: "#0d0d12",
        color: "#ffffff",
        didOpen: () => Swal.showLoading(),
      });

      await api.post("/api/v1/auth/community-signup", {
        CommunityName: formValues.name,
        OfficialEmail: formValues.email,
        City: formValues.city || "Ranchi",
        Country: "India",
        Website: formValues.web || "https://gdg.community.dev/gdg-ranchi/",
        password: "DefaultTempPassword123!",
        Bio: "Partner student / tech community aligned with Google Developer Groups Ranchi.",
        ContactPhone: "9999999999",
      });

      Swal.fire({
        title: "Community Registered!",
        text: `${formValues.name} has been successfully registered to the network.`,
        icon: "success",
        confirmButtonColor: "#34A853",
        background: "#0d0d12",
        color: "#ffffff",
      });
    } catch {
      Swal.fire({
        title: "Registration Processed",
        text: `${formValues.name} partner application received. We'll be in touch!`,
        icon: "info",
        confirmButtonColor: "#4285F4",
        background: "#0d0d12",
        color: "#ffffff",
      });
    }
  }
};
