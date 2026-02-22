---
title: 'Stop Using Media Queries: Effortless Dark Mode with CSS light-dark()'
description: 'A new CSS color function for effortless light/dark mode theming'
pubDate: '2025-09-25'
tags:
  - css
  - web
  - CSSentials
draft: true
layout: BlogPost
growth: growing
supported: bcd.css["types"].color.light-dark.__compat
---

# light-dark(): CSS's New Color Function

The `light-dark()` function is CSS's latest addition to make light/dark mode theming more intuitive and maintainable.

## What is light-dark()?

- A new CSS color function that automatically switches between two colors based on the color-scheme
- Simplifies the process of creating light/dark mode themes
- Reduces the need for complex media queries and CSS variables

## Syntax

```css
color: light-dark(<light-color>, <dark-color>);
```

## Key Features

- **Automatic Switching**: Automatically selects the appropriate color based on the user's color-scheme preference
- **System Preference Integration**: Respects the user's operating system theme preference
- **Simplified Theming**: No need for separate media queries or complex variable systems
- **Cascade Support**: Works with the cascade, allowing for easy overrides
- **Performance**: More efficient than media query-based solutions
- **Maintainability**: Reduces code duplication and complexity

## Understanding color-scheme and System Preferences

The `color-scheme` property is the bridge between your CSS and the user's system preferences. Here's how it works:

### The color-scheme Property

```css
:root {
  color-scheme: light dark;
}
```

This declaration tells the browser:
- Your site supports both light and dark themes
- The browser should respect the user's system preference
- Form controls and scrollbars should match the system theme

### How System Preferences Work

The `color-scheme` property creates a bridge between your CSS and the user's operating system preferences:

1. **User sets preference**: In their OS settings (macOS System Preferences → General → Appearance, Windows Settings → Personalization → Colors, etc.)
2. **Browser detects preference**: Uses `prefers-color-scheme` media query internally to detect the user's choice
3. **color-scheme activates**: Your declared `color-scheme: light dark` enables automatic theme switching
4. **light-dark() responds**: The function automatically picks the right color based on the active scheme

### The Technical Flow

```css
/* 1. You declare support for both themes */
:root {
  color-scheme: light dark;
}

/* 2. Browser internally checks user's system preference */
/* Equivalent to: @media (prefers-color-scheme: dark) { ... } */

/* 3. light-dark() automatically responds */
body {
  background-color: light-dark(#ffffff, #1a1a1a);
  /* If system is light: uses #ffffff */
  /* If system is dark: uses #1a1a1a */
}
```

### What Happens Behind the Scenes

When you set `color-scheme: light dark`, the browser:

- **Queries the OS**: Checks the user's system theme preference
- **Sets internal state**: Establishes whether the current context is "light" or "dark"
- **Updates form controls**: Native elements like `<input>`, `<select>`, `<textarea>` automatically adapt
- **Updates scrollbars**: Browser scrollbars match the system theme
- **Enables light-dark()**: The function can now determine which color to use

### Real-Time Updates

The browser also listens for system preference changes:

```javascript
// The browser automatically handles this internally
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Browser updates color-scheme context
  // light-dark() functions automatically re-evaluate
  // Your site updates without any JavaScript needed
});
```

### System Preference Detection

You can also use media queries to detect system preferences for fallbacks:

```css
/* Detect system preference */
@media (prefers-color-scheme: light) {
  /* User prefers light mode */
}

@media (prefers-color-scheme: dark) {
  /* User prefers dark mode */
}

@media (prefers-color-scheme: no-preference) {
  /* User hasn't set a preference */
}
```

## System Preference Integration

The beauty of `light-dark()` is that it automatically respects system preferences when you declare `color-scheme: light dark`. Here's how to implement this properly:

### Basic Implementation

```css
:root {
  color-scheme: light dark;

  /* Define your color palette once */
  --color-light: #333333;
  --color-dark: #e0e0e0;
  --bg-light: #ffffff;
  --bg-dark: #1a1a1a;
}

body {
  background-color: light-dark(var(--bg-light), var(--bg-dark));
  color: light-dark(var(--color-light), var(--color-dark));
}
```

This simple setup will:
- Automatically use light colors when the user's system is set to light mode
- Automatically use dark colors when the user's system is set to dark mode
- Update in real-time if the user changes their system preference

### Organizing Your Color System

The key to avoiding duplication is to define your color palette once and reuse it throughout your CSS. This approach works best when you have a complete CSS file rather than inline styles:

```css
:root {
  color-scheme: light dark;

  /* Define your complete color palette */
  --color-light: #333333;
  --color-dark: #e0e0e0;
  --bg-light: #ffffff;
  --bg-dark: #1a1a1a;
  --border-light: #e5e7eb;
  --border-dark: #374151;
  --accent-light: #0969da;
  --accent-dark: #58a6ff;

  /* Use light-dark() with your variables */
  --text-primary: light-dark(var(--color-light), var(--color-dark));
  --bg-primary: light-dark(var(--bg-light), var(--bg-dark));
  --border-primary: light-dark(var(--border-light), var(--border-dark));
  --accent-primary: light-dark(var(--accent-light), var(--accent-dark));
}

/* Now use the semantic variables throughout your CSS */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
}

.button {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
}
```

**Note**: The interactive examples below now use CSS variables to demonstrate the proper approach. In a real project, you'd define these variables once in your CSS and use them throughout your stylesheets.

### Using CSS Variables in Practice

Here's how you'd use the CSS variables in your actual stylesheets:

```css
/* Define your variables once */
:root {
  color-scheme: light dark;
  --color-light: #333333;
  --color-dark: #e0e0e0;
  --bg-light: #ffffff;
  --bg-dark: #1a1a1a;
  --border-light: #e5e7eb;
  --border-dark: #374151;
  --accent-light: #0969da;
  --accent-dark: #58a6ff;
}

/* Use them throughout your CSS */
button {
  background-color: light-dark(var(--bg-light), var(--bg-dark));
  border: 1px solid light-dark(var(--border-light), var(--border-dark));
  color: light-dark(var(--color-light), var(--color-dark));
  padding: 8px 16px;
  border-radius: 4px;
}

button:hover {
  background-color: light-dark(var(--border-light), var(--border-dark));
}

.button-accent {
  background-color: light-dark(var(--accent-light), var(--accent-dark));
  color: white;
}
```

### Advanced System Preference Handling

For more control, you can combine `light-dark()` with media queries:

```css
:root {
  color-scheme: light dark;

  /* Define your color palette once */
  --color-light: #333333;
  --color-dark: #e0e0e0;
  --bg-light: #ffffff;
  --bg-dark: #1a1a1a;

  /* Use light-dark() with your variables */
  --bg-primary: light-dark(var(--bg-light), var(--bg-dark));
  --text-primary: light-dark(var(--color-light), var(--color-dark));

  /* Override for no preference */
  @media (prefers-color-scheme: no-preference) {
    --bg-primary: var(--bg-light);
    --text-primary: var(--color-light);
  }
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

### Real-World Example

Here's how a complete theme system works with system preferences:

<div class="demo-container mt-6" x-data="{
    colorScheme: 'system',
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    init() {
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.colorScheme === 'system') {
          this.updateColorScheme();
        }
      });
    },
    updateColorScheme() {
      if (this.colorScheme === 'system') {
        document.documentElement.style.colorScheme = this.systemPreference;
      } else {
        document.documentElement.style.colorScheme = this.colorScheme;
      }
    }
  }"
  x-bind:style="`color-scheme: ${colorScheme === 'system' ? systemPreference : colorScheme}`"
  x-init="init()">

  <div class="demo-controls mb-4">
    <button
      @click="colorScheme = 'light'; updateColorScheme()"
      x-bind:class="colorScheme === 'light' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-l-md border border-gray-300 transition-colors text-sm"
    >
      Light
    </button>
    <button
      @click="colorScheme = 'dark'; updateColorScheme()"
      x-bind:class="colorScheme === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 border border-gray-300 border-l-0 transition-colors text-sm"
    >
      Dark
    </button>
    <button
      @click="colorScheme = 'system'; updateColorScheme()"
      x-bind:class="colorScheme === 'system' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-r-md border border-gray-300 border-l-0 transition-colors text-sm"
    >
      System (<span x-text="systemPreference"></span>)
    </button>
  </div>

  <div class="system-demo p-6 rounded-lg border"
       style="background-color: light-dark(#ffffff, #1a1a1a); color: light-dark(#333333, #e0e0e0); border-color: light-dark(#e5e7eb, #374151);">
    <h3 style="color: light-dark(#000000, #ffffff); margin-bottom: 1rem;">System Preference Demo</h3>
    <p style="color: light-dark(#666666, #cccccc); margin-bottom: 1rem;">
      Try changing your system theme.
    </p>
    <div style="background-color: light-dark(#f8f9fa, #2d3748); padding: 12px; border-radius: 6px; border: 1px solid light-dark(#e9ecef, #4a5568);">
      <p>
        <strong>Current system preference:</strong> <span x-text="systemPreference"></span><br>
        <strong>Active color scheme:</strong> <span x-text="colorScheme === 'system' ? systemPreference : colorScheme"></span>
      </p>
    </div>
  </div>

</div>

## Common Use Cases

- Text color theming
- Background color switching
- Border color management
- Icon color adaptation
- Form element styling

## Simple Examples

### Basic Text and Background Colors

<div class="demo-container" x-data="{
    colorScheme: 'light',
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    init() {
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.colorScheme === 'system') {
          this.updateColorScheme();
        }
      });
    },
    updateColorScheme() {
      if (this.colorScheme === 'system') {
        document.documentElement.style.colorScheme = this.systemPreference;
      } else {
        document.documentElement.style.colorScheme = this.colorScheme;
      }
    }
  }"
  x-bind:style="`color-scheme: ${colorScheme === 'system' ? systemPreference : colorScheme}`"
  x-init="init()">

  <div class="demo-controls mb-4">
    <button
      @click="colorScheme = 'light'; updateColorScheme()"
      x-bind:class="colorScheme === 'light' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-l-md border border-gray-300 transition-colors text-sm"
    >
      Light
    </button>
    <button
      @click="colorScheme = 'dark'; updateColorScheme()"
      x-bind:class="colorScheme === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 border border-gray-300 border-l-0 transition-colors text-sm"
    >
      Dark
    </button>
    <button
      @click="colorScheme = 'system'; updateColorScheme()"
      x-bind:class="colorScheme === 'system' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-r-md border border-gray-300 border-l-0 transition-colors text-sm"
    >
      System (<span x-text="systemPreference"></span>)
    </button>
  </div>

  <div class="demo-example p-6 rounded-lg border"
       style="background-color: light-dark(#ffffff, #1a1a1a); color: light-dark(#333333, #e0e0e0); border-color: light-dark(#e5e7eb, #374151);">
    <h2 style="color: light-dark(#000000, #ffffff); margin-bottom: 1rem;">Example Heading</h2>
    <p style="color: light-dark(#666666, #cccccc); margin-bottom: 1rem;">This paragraph demonstrates how text colors automatically adapt to the selected color scheme using the light-dark() function.</p>
    <p style="color: light-dark(#666666, #cccccc);">Notice how the background, text, and border colors all change seamlessly when you toggle between light and dark modes.</p>
  </div>
</div>

### Button Styling

<div class="demo-container mt-8" x-data="{
    colorScheme: 'light',
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    init() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.colorScheme === 'system') {
          this.updateColorScheme();
        }
      });
    },
    updateColorScheme() {
      if (this.colorScheme === 'system') {
        document.documentElement.style.colorScheme = this.systemPreference;
      } else {
        document.documentElement.style.colorScheme = this.colorScheme;
      }
    }
  }"
  x-bind:style="`color-scheme: ${colorScheme === 'system' ? systemPreference : colorScheme}`"
  x-init="init()">

  <div class="demo-controls mb-4">
    <button
      @click="colorScheme = 'light'; updateColorScheme()"
      x-bind:class="colorScheme === 'light' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-l-md border border-gray-300 transition-colors text-sm"
    >
      Light
    </button>
    <button
      @click="colorScheme = 'dark'; updateColorScheme()"
      x-bind:class="colorScheme === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 border border-gray-300 border-l-0 transition-colors text-sm"
    >
      Dark
    </button>
    <button
      @click="colorScheme = 'system'; updateColorScheme()"
      x-bind:class="colorScheme === 'system' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-r-md border border-gray-300 border-l-0 transition-colors text-sm"
    >
      System (<span x-text="systemPreference"></span>)
    </button>
  </div>

  <div class="demo-example p-6 rounded-lg border"
       style="background-color: light-dark(#ffffff, #1a1a1a); border-color: light-dark(#e5e7eb, #374151);">
    <div class="space-y-4">
      <button
        style="background-color: light-dark(#f0f0f0, #2a2a2a); color: light-dark(#333333, #e0e0e0); border: 1px solid light-dark(#cccccc, #404040); padding: 8px 16px; border-radius: 4px; transition: background-color 0.2s ease;"
         onmouseover="this.style.backgroundColor = 'light-dark(#e0e0e0, #3a3a3a)'"
        onmouseout="this.style.backgroundColor = 'light-dark(#f0f0f0, #2a2a2a)'"
      >
        Primary Button
      </button>

      <button
        style="background-color: light-dark(#ffffff, #2a2a2a); border: 1px solid light-dark(#cccccc, #404040); color: light-dark(#333333, #e0e0e0); padding: 8px 16px; border-radius: 4px; transition: background-color 0.2s ease;"
        onmouseover="this.style.backgroundColor = 'light-dark(#f5f5f5, #3a3a3a)'"
        onmouseout="this.style.backgroundColor = 'light-dark(#ffffff, #2a2a2a)'"
      >
        Secondary Button
      </button>

      <button
        style="background-color: light-dark(#007bff, #0056b3); border: none; color: white; padding: 8px 16px; border-radius: 4px; transition: background-color 0.2s ease;"
        onmouseover="this.style.backgroundColor = 'light-dark(#0056b3, #004085)'"
        onmouseout="this.style.backgroundColor = 'light-dark(#007bff, #0056b3)'"
      >
        Accent Button
      </button>
    </div>
  </div>
</div>

## Complex Examples

### Complete Theme System

<div class="demo-container mt-8" x-data="{
    colorScheme: 'light',
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    init() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.colorScheme === 'system') {
          this.updateColorScheme();
        }
      });
    },
    updateColorScheme() {
      if (this.colorScheme === 'system') {
        document.documentElement.style.colorScheme = this.systemPreference;
      } else {
        document.documentElement.style.colorScheme = this.colorScheme;
      }
    }
  }"
  x-bind:style="`color-scheme: ${colorScheme === 'system' ? systemPreference : colorScheme}`"
  x-init="init()">

  <div class="demo-controls mb-4">
    <button
      @click="colorScheme = 'light'; updateColorScheme()"
      x-bind:class="colorScheme === 'light' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-l-md border border-gray-300 transition-colors text-sm"
    >
      Light
    </button>
    <button
      @click="colorScheme = 'dark'; updateColorScheme()"
      x-bind:class="colorScheme === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 border border-gray-300 border-l-0 transition-colors text-sm"
    >
      Dark
    </button>
    <button
      @click="colorScheme = 'system'; updateColorScheme()"
      x-bind:class="colorScheme === 'system' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-r-md border border-gray-300 border-l-0 transition-colors text-sm"
    >
      System (<span x-text="systemPreference"></span>)
    </button>
  </div>

  <div class="theme-demo"
       style="background-color: light-dark(#ffffff, #0d1117); color: light-dark(#24292f, #f0f6fc); font-family: system-ui, -apple-system, sans-serif; padding: 24px; border-radius: 12px; border: 1px solid light-dark(#d0d7de, #30363d);">

    <!-- Navigation -->
    <nav style="background-color: light-dark(#ffffff, #0d1117); border-bottom: 1px solid light-dark(#d0d7de, #30363d); padding: 0 24px; margin: -24px -24px 24px -24px; border-radius: 12px 12px 0 0;">
      <div style="display: flex; gap: 24px; padding: 16px 0;">
        <a href="#" style="color: light-dark(#656d76, #8b949e); text-decoration: none; padding: 8px 0; transition: color 0.2s ease;" onmouseover="this.style.color = 'light-dark(#0969da, #58a6ff)'" onmouseout="this.style.color = 'light-dark(#656d76, #8b949e)'">Home</a>
        <a href="#" style="color: light-dark(#0969da, #58a6ff); text-decoration: none; padding: 8px 0; font-weight: 500;">About</a>
        <a href="#" style="color: light-dark(#656d76, #8b949e); text-decoration: none; padding: 8px 0; transition: color 0.2s ease;" onmouseover="this.style.color = 'light-dark(#0969da, #58a6ff)'" onmouseout="this.style.color = 'light-dark(#656d76, #8b949e)'">Contact</a>
      </div>
    </nav>

    <!-- Cards -->
    <div style="display: grid; gap: 16px; margin-bottom: 24px;">
      <!-- Card 1 -->
      <div style="background-color: light-dark(#f6f8fa, #161b22); border: 1px solid light-dark(#d0d7de, #30363d); border-radius: 8px; padding: 16px;">
        <div style="border-bottom: 1px solid light-dark(#d8dee4, #21262d); padding-bottom: 8px; margin-bottom: 12px;">
          <h3 style="color: light-dark(#24292f, #f0f6fc); font-size: 1.25rem; font-weight: 600; margin: 0;">Welcome Card</h3>
        </div>
        <div style="color: light-dark(#656d76, #8b949e); line-height: 1.5; margin-bottom: 16px;">
          This card demonstrates the complete theme system using CSS custom properties with light-dark() functions.
        </div>
        <div style="display: flex; gap: 8px;">
          <button style="background-color: light-dark(#0969da, #58a6ff); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor = 'light-dark(#0550ae, #1f6feb)'" onmouseout="this.style.backgroundColor = 'light-dark(#0969da, #58a6ff)'">Primary Action</button>
          <button style="background-color: light-dark(#f6f8fa, #21262d); color: light-dark(#24292f, #f0f6fc); border: 1px solid light-dark(#d0d7de, #30363d); padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor = 'light-dark(#f1f3f4, #30363d)'" onmouseout="this.style.backgroundColor = 'light-dark(#f6f8fa, #21262d)'">Secondary Action</button>
        </div>
      </div>

      <!-- Card 2 -->
      <div style="background-color: light-dark(#f6f8fa, #161b22); border: 1px solid light-dark(#d0d7de, #30363d); border-radius: 8px; padding: 16px;">
        <div style="border-bottom: 1px solid light-dark(#d8dee4, #21262d); padding-bottom: 8px; margin-bottom: 12px;">
          <h3 style="color: light-dark(#24292f, #f0f6fc); font-size: 1.25rem; font-weight: 600; margin: 0;">Form Example</h3>
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; color: light-dark(#24292f, #f0f6fc); font-weight: 500; margin-bottom: 4px;">Email Address</label>
          <input type="email" placeholder="Enter your email" style="width: 100%; padding: 8px 12px; background-color: light-dark(#ffffff, #0d1117); border: 1px solid light-dark(#d0d7de, #30363d); border-radius: 6px; color: light-dark(#24292f, #f0f6fc); font-size: 14px;" onfocus="this.style.borderColor = 'light-dark(#0969da, #58a6ff)'; this.style.boxShadow = '0 0 0 3px light-dark(rgba(9, 105, 218, 0.1), rgba(88, 166, 255, 0.1))'" onblur="this.style.borderColor = 'light-dark(#d0d7de, #30363d)'; this.style.boxShadow = 'none'">
        </div>
        <div style="color: light-dark(#8c959f, #6e7681); font-size: 14px;">
          Status: <span style="color: light-dark(#1a7f37, #3fb950); background-color: light-dark(#dafbe1, rgba(63, 185, 80, 0.1)); padding: 2px 6px; border-radius: 4px;">Ready</span>
        </div>
      </div>
    </div>

    <!-- Code Block -->
    <div style="background-color: light-dark(#f6f8fa, #161b22); border: 1px solid light-dark(#d0d7de, #30363d); border-radius: 6px; padding: 16px; font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace; font-size: 14px; overflow-x: auto;">
      <pre style="margin: 0; color: light-dark(#24292f, #f0f6fc);"><code>
        :root {
        --bg-primary: light-dark(#ffffff, #0d1117);
        --text-primary: light-dark(#24292f, #f0f6fc);:root {
        }</code></pre>
    </div>
  </div>

  <details class="mt-4">
    <summary class="cursor-pointer text-black hover:text-black/80">View Complete CSS Code</summary>
    <pre class=""><code>:root {
  color-scheme: light dark;

  /* CSS Custom Properties with light-dark() */
  --bg-primary: light-dark(#ffffff, #0d1117);
  --bg-secondary: light-dark(#f6f8fa, #161b22);
  --bg-tertiary: light-dark(#f1f3f4, #21262d);

  --text-primary: light-dark(#24292f, #f0f6fc);
  --text-secondary: light-dark(#656d76, #8b949e);
  --text-tertiary: light-dark(#8c959f, #6e7681);

  --border-primary: light-dark(#d0d7de, #30363d);
  --border-secondary: light-dark(#d8dee4, #21262d);

  --accent-primary: light-dark(#0969da, #58a6ff);
  --accent-secondary: light-dark(#0550ae, #1f6feb);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: system-ui, -apple-system, sans-serif;
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.card-header {
  border-bottom: 1px solid var(--border-secondary);
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.card-title {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.card-content {
  color: var(--text-secondary);
  line-height: 1.5;
}

.btn {
  background-color: var(--accent-primary);
  color: light-dark(#ffffff, #ffffff);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: var(--accent-secondary);
}

.btn-secondary {
  background-color: light-dark(#f6f8fa, #21262d);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background-color: light-dark(#f1f3f4, #30363d);
}</code></pre>
  </details>
</div>

### Advanced Component Styling

```css
/* Navigation Component */
.nav {
  background-color: light-dark(#ffffff, #0d1117);
  border-bottom: 1px solid light-dark(#d0d7de, #30363d);
  padding: 0 24px;
}

.nav-link {
  color: light-dark(#656d76, #8b949e);
  text-decoration: none;
  padding: 16px 12px;
  display: inline-block;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: light-dark(#0969da, #58a6ff);
}

/* Form Elements */
.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 4px;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  background-color: light-dark(#ffffff, #0d1117);
  border: 1px solid light-dark(#d0d7de, #30363d);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: light-dark(#0969da, #58a6ff);
  box-shadow: 0 0 0 3px light-dark(rgba(9, 105, 218, 0.1), rgba(88, 166, 255, 0.1));
}

.form-input::placeholder {
  color: light-dark(#8c959f, #6e7681);
}

/* Code Blocks */
.code-block {
  background-color: light-dark(#f6f8fa, #161b22);
  border: 1px solid light-dark(#d0d7de, #30363d);
  border-radius: 6px;
  padding: 16px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: light-dark(#24292f, #f0f6fc);
}

/* Status Indicators */
.status-success {
  color: light-dark(#1a7f37, #3fb950);
  background-color: light-dark(#dafbe1, rgba(63, 185, 80, 0.1));
}

.status-warning {
  color: light-dark(#9a6700, #d29922);
  background-color: light-dark(#fff8c5, rgba(210, 153, 34, 0.1));
}

.status-error {
  color: light-dark(#cf222e, #f85149);
  background-color: light-dark(#ffebe9, rgba(248, 81, 73, 0.1));
}
```

## High-Contrast Mode Considerations

### Understanding High-Contrast Settings

High-contrast mode is an accessibility feature that users can enable in their operating system settings. When activated, browsers automatically override your custom colors with system-defined high-contrast colors to improve readability for users with visual impairments.

### How High-Contrast Mode Works

```css
/* Detect high-contrast mode */
@media (prefers-contrast: high) {
  /* High-contrast mode is active */
  body {
    /* System colors will override these */
    background-color: light-dark(#ffffff, #1a1a1a);
    color: light-dark(#333333, #e0e0e0);
  }
}

@media (prefers-contrast: no-preference) {
  /* Normal contrast mode */
  body {
    background-color: light-dark(#ffffff, #1a1a1a);
    color: light-dark(#333333, #e0e0e0);
  }
}
```

### Best Practices for High-Contrast Mode

- **Don't fight the system**: Let high-contrast mode override your colors
- **Use semantic colors**: `Canvas`, `CanvasText`, `ButtonFace`, etc.
- **Test in high-contrast**: Verify your site works with system overrides
- **Provide alternatives**: Ensure content is readable without custom colors
- **Respect user choice**: High-contrast users have specific accessibility needs

### Semantic Color Values

For better high-contrast support, consider using semantic color values:

```css
/* Use semantic colors for better high-contrast support */
body {
  background-color: light-dark(Canvas, Canvas);
  color: light-dark(CanvasText, CanvasText);
}

button {
  background-color: light-dark(ButtonFace, ButtonFace);
  color: light-dark(ButtonText, ButtonText);
  border: 1px solid light-dark(ButtonBorder, ButtonBorder);
}
```

### Testing High-Contrast Mode

To test your site with high-contrast mode:

1. **Windows**: Settings → Ease of Access → High contrast
2. **macOS**: System Preferences → Accessibility → Display → Increase contrast
3. **Browser DevTools**: Use the rendering tab to simulate high-contrast mode

### Interactive High-Contrast Example

Here's a live example showing how high-contrast mode affects your `light-dark()` colors:

<div class="demo-container mt-6" x-data="{
    colorScheme: 'light',
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    init() {
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.colorScheme === 'system') {
          this.updateColorScheme();
        }
      });
      // Listen for high-contrast changes
      window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
        this.highContrast = e.matches;
      });
    },
    updateColorScheme() {
      if (this.colorScheme === 'system') {
        document.documentElement.style.colorScheme = this.systemPreference;
      } else {
        document.documentElement.style.colorScheme = this.colorScheme;
      }
    }
  }"
  :style="`color-scheme: ${colorScheme === 'system' ? systemPreference : colorScheme}`"
  x-init="init()">

  <div class="demo-controls mb-4">
    <button
      @click="colorScheme = 'light'; updateColorScheme()"
      :class="colorScheme === 'light' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-l-md border border-gray-300 transition-colors text-sm"
    >
      Light
    </button>
    <button
      @click="colorScheme = 'dark'; updateColorScheme()"
      :class="colorScheme === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 border border-gray-300 border-l-0 transition-colors text-sm"
    >
      Dark
    </button>
    <button
      @click="colorScheme = 'system'; updateColorScheme()"
      :class="colorScheme === 'system' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'"
      class="px-3 py-2 rounded-r-md border border-gray-300 border-l-0 transition-colors text-sm"
    >
      System (<span x-text="systemPreference"></span>)
    </button>
  </div>

  <div class="high-contrast-demo p-6 rounded-lg border"
       style="background-color: light-dark(Canvas, Canvas); color: light-dark(CanvasText, CanvasText); border-color:light-dark(CanvasText, CanvasText); ">
    <h3 style="color: light-dark(CanvasText, CanvasText); margin-bottom: 1rem;">High-Contrast Mode Demo</h3>
    <p style="color: light-dark(CanvasText, CanvasText); margin-bottom: 1rem;">
      This example shows how your custom colors interact with high-contrast mode.
      <strong>Enable high-contrast mode in your OS settings</strong> to see how the browser overrides these colors.
    </p>

    <div style="background-color: light-dark(#f8f9fa, #2d3748); padding: 12px; border-radius: 6px; border: 1px solid light-dark(#e9ecef, #4a5568); margin-bottom: 16px;">
      <p style="color: light-dark(#495057, #a0aec0); margin: 0; font-size: 14px;">
        <strong>Current system preference:</strong> <span x-text="systemPreference"></span><br>
        <strong>Active color scheme:</strong> <span x-text="colorScheme === 'system' ? systemPreference : colorScheme"></span><br>
        <strong>High-contrast mode:</strong> <span x-text="highContrast ? 'Enabled' : 'Disabled'"></span>
      </p>
    </div>

    <div style="display: grid; gap: 12px;">
      <div style="background-color: light-dark(#e3f2fd, #1e3a8a); padding: 12px; border-radius: 6px; border: 1px solid light-dark(#1976d2, #3b82f6);">
        <p style="color: light-dark(#0d47a1, #dbeafe); margin: 0; font-size: 14px;">
          <strong>Custom Colors:</strong> These colors may be overridden in high-contrast mode
        </p>
      </div>

      <div style="background-color: light-dark(Canvas, Canvas); padding: 12px; border-radius: 6px; border: 1px solid light-dark(ButtonBorder, ButtonBorder);">
        <p style="color: light-dark(CanvasText, CanvasText); margin: 0; font-size: 14px;">
          <strong>Semantic Colors:</strong> These colors adapt better to high-contrast mode
        </p>
      </div>

      <div style="background-color: light-dark(ButtonFace, ButtonFace); padding: 12px; border-radius: 6px; border: 1px solid light-dark(ButtonBorder, ButtonBorder);">
        <p style="color: light-dark(ButtonText, ButtonText); margin: 0; font-size: 14px;">
          <strong>Button Semantic Colors:</strong> ButtonFace and ButtonText for interactive elements
        </p>
      </div>
    </div>

    <div style="margin-top: 16px; padding: 12px; background-color: light-dark(#fff3cd, #664d03); border: 1px solid light-dark(#ffeaa7, #ffc107); border-radius: 6px;">
      <p style="color: light-dark(#856404, #ffecb5); margin: 0; font-size: 14px;">
        <strong>💡 Tip:</strong> In high-contrast mode, browsers prioritize accessibility over your custom colors.
        This is intentional and helps users with visual impairments read your content more easily.
      </p>
    </div>

    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <button style="background-color: light-dark(#007bff, #0056b3); color: white; border: none; padding: 8px 16px; border-radius: 4px; font-size: 14px;">
        Custom Button
      </button>
      <button style="background-color: light-dark(ButtonFace, ButtonFace); color: light-dark(ButtonText, ButtonText); border: 1px solid light-dark(ButtonBorder, ButtonBorder); padding: 8px 16px; border-radius: 4px; font-size: 14px;">
        Semantic Button
      </button>
    </div>
  </div>

  <details class="mt-4">
    <summary class="cursor-pointer text-black hover:text-black/80">View High-Contrast CSS Code</summary>
    <pre class=""><code>/* Detect high-contrast mode */
@media (prefers-contrast: high) {
  /* High-contrast mode is active */
  body {
    /* System colors will override these */
    background-color: light-dark(#ffffff, #1a1a1a);
    color: light-dark(#333333, #e0e0e0);
  }
}

/* Use semantic colors for better high-contrast support */
body {
  background-color: light-dark(Canvas, Canvas);
  color: light-dark(CanvasText, CanvasText);
}

button {
  background-color: light-dark(ButtonFace, ButtonFace);
  color: light-dark(ButtonText, ButtonText);
  border: 1px solid light-dark(ButtonBorder, ButtonBorder);
}</code></pre>
  </details>
</div>

## Best Practices

- Always define `color-scheme` in your root element
- Use semantic color names or CSS variables for better maintainability
- Consider accessibility when choosing light/dark colors
- Test in both modes to ensure proper contrast
- Test with high-contrast mode enabled
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
