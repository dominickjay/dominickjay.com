---
title: 'Temporal API: JavaScript’s New Time Machine'
description: 'A modern approach to handling dates and times in JavaScript'
pubDate: '2024-03-15'
tags:
  - javascript
  - ByteSize
  - web
draft: true
layout: BlogPost
growth: growing
supported: bcd.javascript["builtins"].Temporal.__compat
---

## Key Features

- **Immutable Objects**: All Temporal objects are immutable, preventing accidental modifications
- **Better Timezone Handling**: Built-in support for timezone operations
- **ISO 8601 Compliance**: Strict adherence to international standards
- **Type Safety**: Clear separation between different types of temporal data
- **Human-Readable API**: More intuitive method names and operations

## Core Types

- `Temporal.PlainDate`: Represents a calendar date
- `Temporal.PlainTime`: Represents a wall-clock time
- `Temporal.PlainDateTime`: Combines date and time
- `Temporal.Instant`: Represents a point in time
- `Temporal.ZonedDateTime`: Date and time with timezone
- `Temporal.Duration`: Represents a length of time

## Common Use Cases

- Date arithmetic without timezone headaches
- Formatting dates for different locales
- Calculating durations between dates
- Working with timezones in a predictable way
- Parsing and validating date strings

## Browser Support

<div class="browser-support-table">
  <table>
    <caption>Browser Support for Temporal API</caption>
    <thead>
      <tr>
        <th scope="col">Browser</th>
        <th scope="col">Version</th>
        <th scope="col">Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Chrome</th>
        <td>117+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Firefox</th>
        <td>115+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Safari</th>
        <td>16.4+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Edge</th>
        <td>117+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Opera</th>
        <td>103+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
    </tbody>
  </table>
</div>

## Polyfill Options

For browsers that don't support Temporal yet, you can use:
- `@js-temporal/polyfill`
- `temporal-polyfill`

## Example Usage

```javascript
// Creating a date
const date = Temporal.PlainDate.from('2024-03-15');

// Adding days
const nextWeek = date.add({ days: 7 });

// Formatting
const formatted = date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
```

## Best Practices

- Use Temporal for all new date/time operations
- Convert legacy Date objects to Temporal early in your code
- Leverage the built-in timezone support
- Use the appropriate Temporal type for your use case
- Take advantage of the immutable nature for safer code
