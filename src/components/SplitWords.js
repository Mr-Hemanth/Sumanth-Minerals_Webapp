// Word-by-word reveal for headlines: each word slides up from behind a mask.
// Pure CSS (see .split-words in globals.css), so it works without JavaScript,
// costs nothing on phones and is switched off for people who prefer reduced motion.
// The spaces stay as real text, so screen readers and search engines read the
// sentence normally.
export default function SplitWords({ text, delay = 0, step = 0.06 }) {
  const words = String(text).split(' ');
  return (
    <span className="split-words">
      {words.map((word, i) => (
        <span key={i}>
          <span className="w">
            <span style={{ animationDelay: `${(delay + i * step).toFixed(2)}s` }}>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
