import type { SVGProps } from "react";

type VocabularyCategoryIconProps = {
  category: string;
  className?: string;
};

function VocabularyCategoryIcon({
  category,
  className,
}: VocabularyCategoryIconProps) {
  const normalized = category.toLowerCase();
  const IconComponent = getIconComponent(normalized);

  return (
    <span className={className} aria-hidden="true">
      <IconComponent />
    </span>
  );
}

function getIconComponent(category: string) {
  if (category.includes("greeting")) {
    return GreetingIcon;
  }

  if (category.includes("conversation")) {
    return ConversationIcon;
  }

  if (category.includes("number")) {
    return NumbersIcon;
  }

  if (category.includes("color")) {
    return PaletteIcon;
  }

  if (category.includes("family")) {
    return FamilyIcon;
  }

  if (category.includes("food") || category.includes("drink")) {
    return FoodIcon;
  }

  if (category.includes("classroom")) {
    return BookIcon;
  }

  if (category.includes("time")) {
    return ClockIcon;
  }

  return WordIcon;
}

function BaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
}

function GreetingIcon() {
  return (
    <BaseIcon>
      <rect x="10" y="15" width="44" height="30" rx="12" fill="#E0F2FE" />
      <path
        d="M20 26H44M20 34H35"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M24 45L18 53L30 47" fill="#E0F2FE" />
      <path
        d="M24 45L18 53L30 47"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

function ConversationIcon() {
  return (
    <BaseIcon>
      <rect x="9" y="14" width="28" height="22" rx="10" fill="#DBEAFE" />
      <path d="M17 36L14 44L23 38" fill="#DBEAFE" />
      <rect x="27" y="26" width="28" height="22" rx="10" fill="#E0E7FF" />
      <path d="M41 48L47 55L48 47" fill="#E0E7FF" />
      <path
        d="M17 23H29M35 35H47"
        stroke="#4F46E5"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

function NumbersIcon() {
  return (
    <BaseIcon>
      <rect x="10" y="10" width="44" height="44" rx="14" fill="#ECFCCB" />
      <path
        d="M24 19L18 46M38 19L32 46M16 27H44M14 38H42"
        stroke="#65A30D"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

function PaletteIcon() {
  return (
    <BaseIcon>
      <path
        d="M32 12C20 12 10 21 10 32C10 43 18 52 29 52H34C38 52 41 49 41 45C41 42 39 39 39 36C39 32 42 29 46 29H48C52 29 55 26 55 22C55 16 45 12 32 12Z"
        fill="#FDE68A"
        stroke="#D97706"
        strokeWidth="3"
      />
      <circle cx="22" cy="27" r="3.5" fill="#60A5FA" />
      <circle cx="29" cy="21" r="3.5" fill="#F472B6" />
      <circle cx="21" cy="37" r="3.5" fill="#34D399" />
      <circle cx="31" cy="41" r="3.5" fill="#A78BFA" />
    </BaseIcon>
  );
}

function FamilyIcon() {
  return (
    <BaseIcon>
      <circle cx="22" cy="23" r="7" fill="#BFDBFE" />
      <circle cx="42" cy="23" r="7" fill="#BFDBFE" />
      <circle cx="32" cy="18" r="6" fill="#93C5FD" />
      <path
        d="M16 48C16 40 21 35 28 35H36C43 35 48 40 48 48"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M11 48C11 43 14 39 18 37M53 48C53 43 50 39 46 37"
        stroke="#60A5FA"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

function FoodIcon() {
  return (
    <BaseIcon>
      <rect x="14" y="15" width="18" height="30" rx="9" fill="#FDE68A" />
      <path
        d="M22 15V9M18 15V10M26 15V10M22 45V54"
        stroke="#D97706"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M42 10C37 10 34 14 34 19C34 24 37 28 42 28V54"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

function BookIcon() {
  return (
    <BaseIcon>
      <path
        d="M16 14H32C38 14 42 18 42 24V50H23C19 50 16 47 16 43V14Z"
        fill="#DBEAFE"
        stroke="#2563EB"
        strokeWidth="3"
      />
      <path
        d="M48 14H32C26 14 22 18 22 24V50H41C45 50 48 47 48 43V14Z"
        fill="#E0E7FF"
        stroke="#4F46E5"
        strokeWidth="3"
      />
      <path d="M28 23H37M28 30H37" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
    </BaseIcon>
  );
}

function ClockIcon() {
  return (
    <BaseIcon>
      <circle cx="32" cy="32" r="20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
      <path d="M32 21V33L40 38" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13L13 18M46 13L51 18" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
    </BaseIcon>
  );
}

function WordIcon() {
  return (
    <BaseIcon>
      <rect x="12" y="12" width="40" height="40" rx="14" fill="#E2E8F0" />
      <path
        d="M18 24L24 42L31 27L38 42L45 24"
        stroke="#334155"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

export default VocabularyCategoryIcon;
