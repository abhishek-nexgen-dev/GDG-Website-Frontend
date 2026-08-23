import  { useState } from "react";
import {
  AlertTriangle,
  
  ChevronDown,
  Download,
  Globe2,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
  UserRound,
  Wrench,
  Zap,
} from "lucide-react";

import Section from "../../Components/Section";
import Badge from "../../Components/Badge";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import { Button } from "../../Components/Button";

// ============================================================
// TYPES
// ============================================================

type UserSettings = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    memberId: string;
    memberSince: string;
    membershipStatus: string;
    onboardingSource: string;
    avatar: string;
    location: string;
  };

  preferences: {
    theme: "dark" | "light" | "system";
    language: string;
    timezone: string;
  };

  maintenanceMode: boolean;
};

// ============================================================
// INITIAL DATA
// ============================================================

const initialSettings: UserSettings = {
  user: {
    firstName: "Aarav",
    lastName: "Mehta",
    email: "aarav.mehta4827@protonmail.com",
    role: "Full Stack Developer",
    memberId: "MEM-7F3A2D",
    memberSince: "14 Jul 2026",
    membershipStatus: "On Boarding",
    onboardingSource: "Website",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Aarav",
    location: "Toronto, Ontario, Canada",
  },

  preferences: {
    theme: "dark",
    language: "English",
    timezone: "Asia/Kolkata",
  },

  maintenanceMode: false,
};

// ============================================================
// REUSABLE SELECT
// ============================================================

const SelectField = ({
  label,
  description,
  value,
  onChange,
  options,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>

      <p className="mb-2 mt-1 text-[10px] leading-4 text-white/30 sm:text-[11px]">{description}</p>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            h-10
            w-full
            appearance-none
            rounded-xl
            border
            border-white/[0.07]
            bg-[#181b20]
            px-3
            pr-9
            text-xs
            text-zinc-200
            outline-none
            transition

            hover:border-white/[0.12]

            focus:border-emerald-500/50
            focus:ring-2
            focus:ring-emerald-500/[0.08]

            sm:text-sm
          "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-white/30
          "
        />
      </div>
    </div>
  );
};

// ============================================================
// TOGGLE
// ============================================================

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative
        h-7
        w-12
        shrink-0
        rounded-full
        border
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500/20

        ${checked ? "border-emerald-400/30 bg-emerald-500" : "border-white/10 bg-[#292d33]"}
      `}
    >
      <span
        className={`
          absolute
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          rounded-full
          bg-white
          shadow-md
          transition-transform
          duration-200

          ${checked ? "translate-x-[25px]" : "translate-x-[3px]"}
        `}
      />
    </button>
  );
};

// ============================================================
// SETTINGS
// ============================================================

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);

  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  // ==========================================================
  // UPDATE PREFERENCE
  // ==========================================================

  const updatePreference = <K extends keyof UserSettings["preferences"]>(
    key: K,
    value: UserSettings["preferences"][K],
  ) => {
    setSettings((current) => ({
      ...current,
      preferences: {
        ...current.preferences,
        [key]: value,
      },
    }));
  };

  // ==========================================================
  // MAINTENANCE
  // ==========================================================

  const toggleMaintenanceMode = (enabled: boolean) => {
    setSettings((current) => ({
      ...current,
      maintenanceMode: enabled,
    }));
  };

  // ==========================================================
  // COPY EMAIL
  // ==========================================================

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(settings.user.email);
    } catch {
      // Clipboard unavailable.
    }
  };

  // ==========================================================
  // EXPORT DATA
  // ==========================================================

  const exportData = () => {
    const data = {
      user: settings.user,
      preferences: settings.preferences,
      maintenanceMode: settings.maintenanceMode,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${settings.user.firstName}-${settings.user.lastName}-data.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  // ==========================================================
  // DELETE ACCOUNT
  // ==========================================================

  const deleteAccount = async () => {
    if (deleteConfirmation !== "DELETE MY ACCOUNT") {
      return;
    }

    const confirmed = window.confirm(
      "Are you absolutely sure you want to permanently delete your account?",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      // Replace with API call.
      // await deleteMember(settings.user.memberId);

      console.log("Deleting account:", settings.user.memberId);
    } finally {
      setIsDeleting(false);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <main
      className="
        min-h-full
        w-full
        overflow-x-hidden
        bg-[#0d0f11]
        text-white
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
          px-3
          py-4

          sm:px-5
          sm:py-6

          md:px-6

          lg:px-8
          lg:py-8

          xl:px-10
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            relative
            mb-5
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#121519]
            px-4
            py-4

            sm:mb-6
            sm:px-5
            sm:py-5

            lg:px-6
            lg:py-6
          "
        >
          {/* subtle background glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-emerald-500/[0.06]
              blur-3xl
            "
          />

          <div className="relative flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-500/15
                bg-emerald-500/10
                text-emerald-400
                shadow-[0_0_30px_rgba(16,185,129,0.05)]
              "
            >
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0">
              <h1
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-white

                  sm:text-xl

                  lg:text-2xl
                "
              >
                Settings
              </h1>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  leading-5
                  text-white/35

                  sm:text-xs
                "
              >
                Manage your account preferences and settings.
              </p>
            </div>
          </div>
        </header>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="space-y-4 sm:space-y-5">
          {/* =================================================
              ACCOUNT OVERVIEW
          ================================================= */}

          <Section
            title="Account Overview"
            description="View your account information and current status"
            icon={<UserRound size={16} />}
          >
            <div
              className="
                grid
                gap-5

                lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]
                lg:gap-6
              "
            >
              {/* USER CARD */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#121519]
                  p-4

                  sm:p-5
                "
              >
                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-emerald-500/[0.04]
                    blur-2xl
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-center
                    gap-4
                  "
                >
                  <img
                    src={settings.user.avatar}
                    alt={`${settings.user.firstName} ${settings.user.lastName}`}
                    className="
                      h-16
                      w-16
                      shrink-0
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#202126]
                      object-cover

                      sm:h-20
                      sm:w-20
                    "
                  />

                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      <h2
                        className="
                          truncate
                          text-base
                          font-semibold
                          text-white

                          sm:text-lg
                        "
                      >
                        {settings.user.firstName} {settings.user.lastName}
                      </h2>

                      <Badge variant="green">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {settings.user.membershipStatus}
                      </Badge>
                    </div>

                    <p className="mt-1 text-xs text-white/45 sm:text-sm">{settings.user.role}</p>

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="
                        mt-2
                        flex
                        max-w-full
                        items-center
                        gap-1.5
                        text-[10px]
                        text-white/30
                        transition
                        hover:text-emerald-400
                        sm:text-xs
                      "
                    >
                      <Mail size={12} className="shrink-0" />

                      <span className="truncate">{settings.user.email}</span>
                    </button>
                  </div>
                </div>

                {/* LOCATION */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    border-t
                    border-white/[0.06]
                    pt-4
                    text-[10px]
                    text-white/35

                    sm:text-xs
                  "
                >
                  <MapPin size={13} className="shrink-0 text-emerald-400/60" />

                  <span className="truncate">{settings.user.location}</span>
                </div>
              </div>

              {/* ACCOUNT DETAILS */}

              <div
                className="
                  grid
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#121519]

                  sm:grid-cols-2
                "
              >
                <div className="border-b border-white/[0.05] sm:border-r">
                  <Input
                    label="Member ID"
                    value={settings.user.memberId}
                    onChange={() => {}}
                    readonly
                  />
                </div>

                <div className="border-b border-white/[0.05]">
                  <Input
                    label="Primary Role"
                    value={settings.user.role}
                    onChange={() => {}}
                    readonly
                  />
                </div>

                <div className="border-b border-white/[0.05] sm:border-b-0 sm:border-r">
                  <Input
                    label="Member Since"
                    value={settings.user.memberSince}
                    onChange={() => {}}
                    readonly
                  />
                </div>

                <div>
                  <Input
                    label="Onboarding Source"
                    value={settings.user.onboardingSource}
                    onChange={() => {}}
                    readonly
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* =================================================
              GENERAL PREFERENCES
          ================================================= */}

          <Section
            title="General Preferences"
            description="Customize how the application works for you"
            icon={<Zap size={16} />}
          >
            <div
              className="
                grid
                gap-4

                md:grid-cols-3
                md:gap-5
              "
            >
              <SelectField
                label="Theme"
                description="Choose your preferred appearance"
                value={settings.preferences.theme}
                onChange={(value) =>
                  updatePreference("theme", value as UserSettings["preferences"]["theme"])
                }
                options={[
                  {
                    label: "Dark",
                    value: "dark",
                  },
                  {
                    label: "Light",
                    value: "light",
                  },
                  {
                    label: "System",
                    value: "system",
                  },
                ]}
              />

              <SelectField
                label="Language"
                description="Select your preferred language"
                value={settings.preferences.language}
                onChange={(value) => updatePreference("language", value)}
                options={[
                  {
                    label: "English",
                    value: "English",
                  },
                  {
                    label: "Hindi",
                    value: "Hindi",
                  },
                ]}
              />

              <SelectField
                label="Time Zone"
                description="Used for dates and scheduled events"
                value={settings.preferences.timezone}
                onChange={(value) => updatePreference("timezone", value)}
                options={[
                  {
                    label: "Asia/Kolkata (IST)",
                    value: "Asia/Kolkata",
                  },
                  {
                    label: "UTC",
                    value: "UTC",
                  },
                  {
                    label: "America/Toronto",
                    value: "America/Toronto",
                  },
                  {
                    label: "America/New_York",
                    value: "America/New_York",
                  },
                ]}
              />
            </div>
          </Section>

          {/* =================================================
              MAINTENANCE MODE
          ================================================= */}

          <Section
            title="Maintenance Mode"
            description="Temporarily make your profile unavailable to others"
            icon={<Wrench size={16} />}
          >
            <div
              className={`
                rounded-2xl
                border
                p-4
                transition

                sm:p-5

                ${
                  settings.maintenanceMode
                    ? `
                      border-emerald-500/20
                      bg-emerald-500/[0.035]
                    `
                    : `
                      border-white/[0.06]
                      bg-[#121519]
                    `
                }
              `}
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="flex min-w-0 gap-3">
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition

                      ${
                        settings.maintenanceMode
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-white/[0.04] text-white/30"
                      }
                    `}
                  >
                    <Wrench size={17} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-white/80">Maintenance Mode</h3>

                      <span
                        className={`
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-medium

                          ${
                            settings.maintenanceMode
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-white/[0.04] text-white/30"
                          }
                        `}
                      >
                        {settings.maintenanceMode ? "ACTIVE" : "OFF"}
                      </span>
                    </div>

                    <p
                      className="
                        mt-1
                        max-w-2xl
                        text-[10px]
                        leading-5
                        text-white/35

                        sm:text-xs
                      "
                    >
                      Hide your profile from other members while keeping your account and data safe.
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    px-3
                    py-2.5

                    sm:min-w-[145px]
                  "
                >
                  <div>
                    <p className="text-[10px] font-medium text-white/50">Status</p>

                    <p
                      className={`
                        mt-0.5
                        text-[10px]
                        ${settings.maintenanceMode ? "text-emerald-400" : "text-white/30"}
                      `}
                    >
                      {settings.maintenanceMode ? "Enabled" : "Disabled"}
                    </p>
                  </div>

                  <Toggle checked={settings.maintenanceMode} onChange={toggleMaintenanceMode} />
                </div>
              </div>

              {settings.maintenanceMode && (
                <div
                  className="
                    mt-4
                    border-t
                    border-emerald-500/10
                    pt-4
                  "
                >
                  <div className="flex gap-3">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-400" />

                    <div>
                      <p className="text-[10px] font-medium text-emerald-400 sm:text-xs">
                        Maintenance mode is active
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-white/35 sm:text-xs">
                        Your profile is currently hidden from member searches. Disable maintenance
                        mode to make it visible again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* =================================================
              QUICK ACTION
          ================================================= */}

          <Section
            title="Quick Actions"
            description="Useful actions for your account"
            icon={<Download size={16} />}
          >
            <button
              type="button"
              onClick={exportData}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#121519]
                p-4
                text-left
                transition-all
                duration-200

                hover:border-blue-500/20
                hover:bg-[#171b20]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500/10
                    text-blue-400
                    transition
                    group-hover:bg-blue-500/15
                  "
                >
                  <Download size={16} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-medium text-white/75 sm:text-sm">Export My Data</h3>

                  <p className="mt-0.5 text-[10px] leading-5 text-white/30 sm:text-xs">
                    Download a copy of your account information as JSON.
                  </p>
                </div>
              </div>

              <span
                className="
                  shrink-0
                  rounded-lg
                  border
                  border-blue-500/10
                  bg-blue-500/[0.05]
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-medium
                  text-blue-400
                  transition
                  group-hover:border-blue-500/20
                  group-hover:bg-blue-500/10
                "
              >
                Export
              </span>
            </button>
          </Section>

          {/* =================================================
              DANGER ZONE
          ================================================= */}

          <Section
            title="Danger Zone"
            description="Permanent and destructive account actions"
            icon={<AlertTriangle size={16} />}
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/[0.025]
              "
            >
              {/* WARNING HEADER */}

              <div className="p-4 sm:p-5">
                <div className="flex gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-500/10
                      text-red-400
                    "
                  >
                    <Trash2 size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-red-400 sm:text-base">
                      Delete Account
                    </h3>

                    <p className="mt-1 max-w-2xl text-[10px] leading-5 text-white/35 sm:text-xs">
                      Permanently delete your account and all associated data. This action cannot be
                      undone.
                    </p>
                  </div>
                </div>

                {/* DATA LIST */}

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-red-500/10
                    bg-black/10
                    p-3.5

                    sm:p-4
                  "
                >
                  <p className="text-[10px] font-medium text-white/55 sm:text-xs">
                    The following data will be permanently deleted:
                  </p>

                  <div
                    className="
                      mt-3
                      grid
                      gap-x-6
                      gap-y-2
                      text-[10px]
                      text-white/35

                      sm:grid-cols-2
                      sm:text-xs
                    "
                  >
                    <span>• Profile information</span>

                    <span>• Account preferences</span>

                    <span>• Community activity</span>

                    <span>• Associated data</span>
                  </div>
                </div>
              </div>

              {/* CONFIRMATION */}

              <div
                className="
                  border-t
                  border-red-500/10
                  bg-red-500/[0.015]
                  p-4

                  sm:p-5
                "
              >
                <Label>
                  Type <span className="font-mono text-red-400">DELETE MY ACCOUNT</span> to confirm
                </Label>

                <div
                  className="
                    mt-2
                    grid
                    gap-2

                    sm:grid-cols-[minmax(0,1fr)_auto]
                  "
                >
                  <Input
                    value={deleteConfirmation}
                    onChange={setDeleteConfirmation}
                    placeholder="DELETE MY ACCOUNT"
                  />

                  <Button
                    type="button"
                    disabled={deleteConfirmation !== "DELETE MY ACCOUNT" || isDeleting}
                    onClick={deleteAccount}
                    className="
                      !inline-flex
                      !h-10
                      !w-full
                      !items-center
                      !justify-center
                      !gap-2
                      !rounded-xl
                      !border
                      !border-red-500/20
                      !bg-red-500/10
                      !px-4
                      !text-red-400
                      !transition

                      hover:!border-red-500/30
                      hover:!bg-red-500/15

                      disabled:!cursor-not-allowed
                      disabled:!opacity-30

                      sm:!w-auto
                    "
                  >
                    <Trash2 size={14} />

                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </Button>
                </div>

                <p className="mt-2 text-[9px] text-white/20 sm:text-[10px]">
                  This action is permanent and cannot be reversed.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-2
            border-t
            border-white/[0.05]
            pt-4
            text-[9px]
            text-white/20

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-[10px]
          "
        >
          <span>Account settings</span>

          <span className="flex items-center gap-1.5">
            <Globe2 size={10} />
            {settings.preferences.timezone}
          </span>
        </div>
      </div>
    </main>
  );
};

export default Settings;
