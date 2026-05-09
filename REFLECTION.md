# Reflection

## 1. Hardest bug you hit this week
The hardest bug was when the page crashed with "Parenthesized expression cannot be empty" after copying code with placeholder comments. I learned to always replace placeholders completely. I debugged by checking the exact line number in the error, removing comments, and ensuring all brackets were closed.

## 2. A decision you reversed mid-week
I initially used a very simple mock savings calculation. I reversed it to build a proper `auditEngine.ts` with tool-specific logic based on team size and plan type. This made the recommendations much more defensible.

## 3. What you would build in week 2
- Real Supabase backend with audit history
- PDF export using react-pdf
- Benchmark comparisons ("Your spend per dev vs industry average")
- Embeddable widget
- Better AI summary using Anthropic API

## 4. How you used AI tools
I used Grok extensively for code generation, debugging errors, and writing markdown files. I didn't trust AI with the core audit logic — I wrote and refined that myself. One time Grok suggested incomplete code with placeholder comments which caused a crash — I caught it by reading the error and fixing the syntax.

## 5. Self-rating (1-10)
- **Discipline**: 9/10 — Consistent daily commits and devlog
- **Code quality**: 8/10 — Clean, typed, readable components
- **Design sense**: 8/10 — Modern dark UI with good UX
- **Problem-solving**: 9/10 — Quickly fixed setup and syntax issues
- **Entrepreneurial thinking**: 8/10 — Focused on user value and lead capture