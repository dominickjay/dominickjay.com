---
title: 'light-dark()'
description: 'A new CSS color function for effortless light/dark mode theming'
pubDate: '2024-03-15'
tags:
  - css
  - web
  - CSSentials
draft: true
layout: BlogPost
---

# light-dark(): CSS's New Color Function

The `light-dark()` function is CSS's latest addition to make light/dark mode theming more intuitive and maintainable.

## What is light-dark()?

- A new CSS color function that automatically switches between two colors based on the color-scheme
- Simplifies the process of creating light/dark mode themes
- Reduces the need for complex media queries and CSS variables
- Part of CSS Color Module Level 5

## Syntax

```css
color: light-dark(<light-color>, <dark-color>);
```

## Key Features

- **Automatic Switching**: Automatically selects the appropriate color based on the user's color-scheme preference
- **Simplified Theming**: No need for separate media queries or complex variable systems
- **Cascade Support**: Works with the cascade, allowing for easy overrides
- **Performance**: More efficient than media query-based solutions
- **Maintainability**: Reduces code duplication and complexity

## Common Use Cases

- Text color theming
- Background color switching
- Border color management
- Icon color adaptation
- Form element styling

## Browser Support

<div class="browser-support-table">
  <table>
    <caption>Browser Support for light-dark()</caption>
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
        <td>123+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Firefox</th>
        <td>120+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Safari</th>
        <td>17.2+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Edge</th>
        <td>123+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Opera</th>
        <td>109+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
    </tbody>
  </table>
</div>

## Example Usage

```css
:root {
  color-scheme: light dark;
}

body {
  background-color: light-dark(#ffffff, #1a1a1a);
  color: light-dark(#333333, #e0e0e0);
}

button {
  background-color: light-dark(#f0f0f0, #2a2a2a);
  border-color: light-dark(#cccccc, #404040);
}
```

## Best Practices

- Always define `color-scheme` in your root element
- Use semantic color names or CSS variables for better maintainability
- Consider accessibility when choosing light/dark colors
- Test in both modes to ensure proper contrast
- Use in combination with other modern CSS features like `@media (prefers-color-scheme)`

## Fallback Strategy

For browsers that don't support `light-dark()`, you can use:

```css
/* Modern browsers */
body {
  background-color: light-dark(#ffffff, #1a1a1a);
}

/* Fallback for older browsers */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
  }
}
```
