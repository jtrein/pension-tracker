## Running locally

```bash
npm ci
npm run dev
```

## Running tests
```bash
npm test
```

## What I'd do next
- Tests: I like to write tests first, or at least alongside development of a unit of code, but given the time I decided to leave it until the end.
  - Write unit tests for each `lib` function
  - Write unit tests for each component
  - Write component integration tests from a higher component level in the tree (e.g. `page.tsx`)

## Some notes on what I think is important, given more time

Thanks for reviewing the assessment! It was fun to work on focusing what's vital in a limited span of time. I believe I was able to finsh the entire core of the task, with the *Stretch* items. Below are some items, with respect to the time alotted that I'd try and implement as I believe they're important.

- Form fields
  - Prepended and styled £ symbol for currency inset on `<input type="number">`. These guide the user in what to expect.
  - Formatting constraints on input for the number inputs for easy reading:
    - `10000.5055` -> `10,000.51`
  - Remove default `0` values on number inputs and let the `placeholder`s be visible so the users can see exanple text
  - Assistive: Add `aria-invalid`, `aria-describedby` (mapping to error text) on inputs for accessible field errors
  - Clear CSS transitions on background and `box-shadow` attributes to help give the user clues something is active under the mouse
- Charts:
  - Accessibile labels (at least) for charts for assistive tech and easier testing.
  - A grid layout with 2 charts per row
  - Graphs inside bounded "cards" with some depth (e.g. slight shadow)
  - Improve styling of tooltip labels: The x axis value is too light on a white background.
  - Use colours which play well with one another

