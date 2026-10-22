type Json = unknown;

const LONG_TEXT_KEYS = new Set(["body", "content", "explanation", "description", "summary", "prompt"]);
const TITLE_KEYS = ["title", "prompt", "french", "label", "text", "id"];

const ARRAY_TEMPLATES: Record<string, () => Json> = {
  dialogues: () => ({ id: newId("dialogue"), title: "", lines: [{ speaker: "A", french: "", english: "" }] }),
  lines: () => ({ speaker: "A", french: "", english: "" }),
  explanations: () => ({ id: newId("explanation"), title: "", body: "" }),
  questions: () => ({
    id: newId("question"),
    category: "",
    prompt: "",
    explanation: "",
    options: [
      { id: newId("option"), label: "", isCorrect: true },
      { id: newId("option"), label: "", isCorrect: false },
    ],
  }),
  options: () => ({ id: newId("option"), label: "", isCorrect: false }),
};

function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}

function humanize(key: string) {
  const spaced = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function blank(value: Json): Json {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, blank(item)]));
  }
  return "";
}

function itemTitle(item: Json, index: number) {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    const record = item as Record<string, unknown>;
    for (const key of TITLE_KEYS) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        return `${index + 1}. ${value.length > 60 ? `${value.slice(0, 60)}…` : value}`;
      }
    }
  }
  return `Item ${index + 1}`;
}

type FieldProps = {
  label: string;
  fieldKey: string;
  value: Json;
  onChange: (next: Json) => void;
};

function Field({ label, fieldKey, value, onChange }: FieldProps) {
  if (typeof value === "boolean") {
    return (
      <label className="admin-form__check">
        <input checked={value} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="admin-field">
        {label}
        <input
          onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))}
          type="number"
          value={value}
        />
      </label>
    );
  }

  if (typeof value === "string" || value === null || value === undefined) {
    const text = typeof value === "string" ? value : "";
    const isLong = LONG_TEXT_KEYS.has(fieldKey) || text.length > 70 || text.includes("\n");
    return (
      <label className="admin-field">
        {label}
        {isLong ? (
          <textarea
            onChange={(event) => onChange(event.target.value)}
            rows={Math.min(8, Math.max(3, Math.ceil(text.length / 70)))}
            value={text}
          />
        ) : (
          <input onChange={(event) => onChange(event.target.value)} type="text" value={text} />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return <ListField label={label} fieldKey={fieldKey} items={value} onChange={onChange} />;
  }

  return (
    <fieldset className="admin-form__group">
      <legend>{label}</legend>
      <ObjectFields value={value as Record<string, unknown>} onChange={onChange} />
    </fieldset>
  );
}

function ListField({
  label,
  fieldKey,
  items,
  onChange,
}: {
  label: string;
  fieldKey: string;
  items: Json[];
  onChange: (next: Json) => void;
}) {
  const isPrimitiveList = items.every((item) => typeof item !== "object" || item === null);

  const addItem = () => {
    const template = ARRAY_TEMPLATES[fieldKey];
    const next = template ? template() : items.length > 0 ? blank(items[items.length - 1]) : "";
    onChange([...items, next]);
  };

  return (
    <div className="admin-form__list">
      <div className="admin-form__list-head">
        <strong>{label}</strong>
        <span>{items.length}</span>
      </div>
      {items.length === 0 ? <p className="admin-empty">Nothing here yet.</p> : null}
      {items.map((item, index) => (
        <div className="admin-form__item" key={index}>
          <div className="admin-form__item-head">
            <span>{isPrimitiveList ? `Item ${index + 1}` : itemTitle(item, index)}</span>
            <button
              className="admin-button admin-button--danger"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              type="button"
            >
              Remove
            </button>
          </div>
          {item && typeof item === "object" && !Array.isArray(item) ? (
            <ObjectFields
              onChange={(next) => onChange(items.map((current, itemIndex) => (itemIndex === index ? next : current)))}
              value={item as Record<string, unknown>}
            />
          ) : (
            <Field
              fieldKey={fieldKey}
              label="Value"
              onChange={(next) => onChange(items.map((current, itemIndex) => (itemIndex === index ? next : current)))}
              value={item}
            />
          )}
        </div>
      ))}
      <button className="admin-button" onClick={addItem} type="button">
        + Add {humanize(fieldKey).toLowerCase()} item
      </button>
    </div>
  );
}

function ObjectFields({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  return (
    <div className="admin-form__fields">
      {Object.entries(value).map(([key, fieldValue]) => (
        <Field
          fieldKey={key}
          key={key}
          label={humanize(key)}
          onChange={(next) => onChange({ ...value, [key]: next })}
          value={fieldValue}
        />
      ))}
    </div>
  );
}

export default function ContentForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  return (
    <div className="admin-form">
      <ObjectFields onChange={onChange} value={data} />
    </div>
  );
}
