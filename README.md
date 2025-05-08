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
### Charts
- Add an x-axis label for `age` on the charts for pension growth and drawdown. I was having issues with the label clashing with the age's ticks, so I moved ahead.
- Display a styled `Tooltip` label for `age` (e.g. `Age 30` instead of `30`) with good colour contrast on the white background
- Move the charts to display to the right of the form on larger screens, only after the successful first and subsequent form submisions. On smaller screens, I'd stack the form and charts along the y-axis gradually.

## Calculations
- Run the calculations only after form submit, when charts are ready to display. There's no performance issue at the moment running them in the function body during render; however, I think it is cleaner to run them only when needed, especially in a smaller client app where they're fast to calculate.
- Improve the signature for the functions' parameters; perhaps by using a single object for improved readability (e.g. `calc({lots: '', of: '', data: ''})`)

### Write more comprehensive tests
I like to write tests first, or at least alongside development of a unit of code, but given the time I decided to leave it until the end.
  - Write unit tests for each `lib` function
  - Write unit tests for each component
  - Write component integration tests from a higher component level in the tree (e.g. `page.tsx`)

## Some notes on what I think is important, given more time

Thanks for reviewing the assessment! It was fun to work on and focus on what's vital in a limited span of time. I believe I was able to finsh the entire core of the task, with the *Stretch* items. Below are some items, with respect to the time alotted that I'd try and implement as I believe they're important.

- Form fields
  - Prepended and styled £ symbol for currency inset on `<input type="number">`. These guide the user in what to expect.
  - Formatting constraints on input for the number inputs for easy reading:
    - `10000.5055` -> `10,000.51`
  - Remove default `0` values on number inputs and let the `placeholder`s be visible so the users can see guidance text
  - Assistive: Add `aria-invalid`, `aria-describedby` (mapping to error text) on inputs for accessible field errors
  - Clear CSS transitions on background and `box-shadow` attributes to help give the user clues something is active under the mouse
- Charts:
  - Accessibile labels (at least) for charts for assistive tech and easier testing.
  - Use themed colours which play well with one another

