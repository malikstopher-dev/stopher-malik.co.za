export function formatJournalCopy(source: string) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/(R[\d,]+)[ \t]*[–—][ \t]*(?=\d)/g, "$1 to R")
    .replace(/(\d)[ \t]*[–—][ \t]*(?=R?\d)/g, "$1 to ")
    .replace(/[ \t]+[–—][ \t]+/g, " - ")
    .replace(/[–—]/g, "-");
}
