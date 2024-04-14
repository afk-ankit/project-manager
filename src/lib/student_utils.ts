export type FrameworkType = Array<{
  label: string;
  value: string;
}>;

type FieldType = string[];

export const frameworks: FrameworkType = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const labelFormatter = (
  frameworks: FrameworkType,
  field: FieldType,
): string => {
  const matchedFramerworks = frameworks.filter((framework) =>
    field.some((f) => f === framework.value),
  );
  const label = matchedFramerworks
    .map((framework) => framework.label)
    .join(", ");
  return label;
};
