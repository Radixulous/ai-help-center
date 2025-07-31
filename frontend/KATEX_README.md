# KaTeX Math Formula Rendering

This implementation adds support for rendering LaTeX math formulas in the chat interface using KaTeX.

## Features

- **LaTeX Block Math**: Formulas wrapped in `\[ ... \]` are rendered as centered, block-level math
- **Fallback Support**: When KaTeX is not available, formulas are displayed as formatted plain text
- **Error Handling**: Graceful error handling for malformed LaTeX
- **Responsive Design**: Math formulas are properly styled and responsive

## Installation

To enable full KaTeX support, install the required packages:

```bash
npm install katex @types/katex
```

## Usage

### In Chat Messages

The system automatically detects and renders LaTeX formulas in chat responses. For example:

```
**Net Effective Rent (NER)**
- **Definition**: The effective rent after accounting for concessions.
- **Calculation**:
\[
\text{NER} = \text{Rent} - \left(\text{Recurring Concessions} + \left(\frac{\text{One-Time Concessions}}{12}\right)\right) / \text{Total Units}
\]
```

### LaTeX Syntax Support

The implementation supports common LaTeX math commands:

- `\text{...}` - Text within math mode
- `\frac{...}{...}` - Fractions
- `\left(...\right)` - Parentheses with automatic sizing
- `\sqrt{...}` - Square roots
- `\sum`, `\prod` - Summation and product symbols
- And many more standard LaTeX math commands

## Implementation Details

### Components

1. **MathFormula**: Renders individual LaTeX formulas
2. **RichTextContent**: Enhanced to detect and render math formulas within text content

### Fallback Behavior

When KaTeX is not available, the system:
- Displays formulas in a styled monospace font
- Converts LaTeX syntax to readable plain text
- Maintains visual distinction from regular text

### Error Handling

- Malformed LaTeX is displayed as plain text
- Console warnings are logged for debugging
- The chat interface remains functional even with math rendering errors

## Testing

You can test the math formula rendering by:

1. Starting the development server: `npm run dev`
2. Asking questions that might return formulas, such as:
   - "How is Net Effective Rent calculated?"
   - "What's the formula for occupancy percentage?"
   - "Show me the revenue per available unit calculation"

## Example Formulas

Here are some example formulas that work well with this implementation:

```
\[
\text{Occupancy \%} = \frac{\text{Occupied Units}}{\text{Total Units}} \times 100
\]

\[
\text{RevPAU} = \frac{\text{Total Revenue}}{\text{Total Units}}
\]

\[
\text{Closing Ratio} = \frac{\text{Leases}}{\text{Tours}} \times 100
\]
```

## Future Enhancements

- Support for inline math with `\( ... \)` syntax
- Additional LaTeX packages for more complex formulas
- Math formula search and indexing
- Export formulas as images or PDF 