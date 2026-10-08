export default {
  title: "Pamphlet",
  subtitle: "",
  url: "https://example.com/",
  language: "en",
  description: "A description of this literary work",
  author: {
    name: "Your Name",
  },
  image: "",
  // Stylesheet in css/: "spine" or "log" (timeline looks for the index),
  // "utilitarian" (plain Helvetica, wide page), or omit for the literary default.
  // Spine and log are utilitarian plus an index-only section.
  // stylesheet: "utilitarian",
  // Chapter order: omit to sort by `order` front matter, or "date" for a
  // newest-first feed by each chapter's last git commit (CI needs full
  // history: fetch-depth: 0 in the Pages workflow).
  // sortBy: "date",
}
