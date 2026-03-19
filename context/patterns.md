# Patterns

## Form consent pattern
- Keep consent checkbox state controlled (`checked` + state setter).
- Block submit when consent is missing and show inline consent error.
- Reset consent state after the relevant submit flow completes.
- Use pathname-driven reset effects for components that can persist across navigation.

## Error/reset UX pattern
- Clear consent error when user re-checks consent.
- Reset transient submission UI state (`loading`, inline messages) when route changes.

## Autofill styling pattern
- Use a single controlled input per form field (no duplicated fallback fields).
- Apply explicit `:-webkit-autofill` and `:-moz-autofill` overrides where theme contrast can break default browser autofill styles.
- Keep autofill text color aligned with `currentColor` and neutralize browser background fill when using transparent inputs.
- Centralize autofill overrides in shared field components (for example `InputField`) to avoid conflicting per-form overrides.
