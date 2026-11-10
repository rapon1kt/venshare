export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

export async function generateUniqueSlug(
  title: string,
  checkExists: (slug: string) => Promise<boolean>,
): Promise<string> {
  let slug = generateSlug(title);
  let counter = 1;
  let originalSlug = slug;

  while (await checkExists(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  return slug;
}