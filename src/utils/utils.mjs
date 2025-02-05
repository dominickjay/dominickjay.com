const WORDS_PER_MINUTE = 200;

export function getReadingTime(content) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}

export function generateSlug(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}

export function generateCategoryData(categories) {
    let categoryData = [];
    categories.forEach((category) => {
      categoryData.push({
        name: category,
        slug: `${generateSlug(category)}`,
      });
    });
    return categoryData;
  }
