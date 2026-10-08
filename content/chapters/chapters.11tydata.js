import metadata from "../_data/metadata.js"

export default {
  layout: "layouts/chapter.njk",
  // With metadata.sortBy = "date", a chapter's date is its last git commit
  // (newest-first feed). A `date:` in a chapter's own front matter overrides it.
  ...(metadata.sortBy === "date" && { date: "git Last Modified" })
}
