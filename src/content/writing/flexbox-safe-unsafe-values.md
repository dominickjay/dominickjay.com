---
title: "Flexbox Safe and Unsafe Values: A Complete Guide"
description: "Understanding safe and unsafe values in CSS flexbox properties and their impact on layout behavior."
pubDate: 2025-01-27
draft: true
tags: ["css"]
growth: evergreen
---

## Understanding Safe vs Unsafe Values

In CSS flexbox, certain properties accept "safe" and "unsafe" keywords that control how the browser handles content that might overflow or cause layout issues.

## The `align-self` Property

The `align-self` property controls how a flex item aligns along the cross axis and supports safe/unsafe variants.

### Safe Values
- `safe center` - Centers the item but prevents it from overflowing the container
- `safe start` - Aligns to the start but prevents overflow
- `safe end` - Aligns to the end but prevents overflow
- `safe flex-start` - Aligns to flex-start but prevents overflow
- `safe flex-end` - Aligns to flex-end but prevents overflow

### Unsafe Values
- `unsafe center` - Centers the item even if it causes overflow
- `unsafe start` - Aligns to start even if it causes overflow
- `unsafe end` - Aligns to end even if it causes overflow
- `unsafe flex-start` - Aligns to flex-start even if it causes overflow
- `unsafe flex-end` - Aligns to flex-end even if it causes overflow

## The `justify-self` Property

Similar to `align-self`, `justify-self` also supports safe/unsafe variants for controlling alignment along the main axis.

### Safe Values
- `safe center` - Centers without causing overflow
- `safe start` - Aligns to start without overflow
- `safe end` - Aligns to end without overflow
- `safe left` - Aligns to left without overflow
- `safe right` - Aligns to right without overflow

### Unsafe Values
- `unsafe center` - Centers even if it causes overflow
- `unsafe start` - Aligns to start even if it causes overflow
- `unsafe end` - Aligns to end even if it causes overflow
- `unsafe left` - Aligns to left even if it causes overflow
- `unsafe right` - Aligns to right even if it causes overflow

## Practical Examples

### Safe Alignment
```css
.flex-item {
  align-self: safe center;
  justify-self: safe start;
}
```

### Unsafe Alignment
```css
.flex-item {
  align-self: unsafe center;
  justify-self: unsafe end;
}
```

## When to Use Safe vs Unsafe

### Use Safe When:
- Content might be dynamic or user-generated
- You want to prevent layout breaking
- Accessibility is a priority
- Working with responsive designs
- Content length is unpredictable

### Use Unsafe When:
- You have complete control over content
- You want precise positioning
- Content is guaranteed to fit
- You need specific visual alignment
- Working with fixed-size content

## Browser Support

Safe and unsafe values are supported in modern browsers, but it's important to test across different browsers and devices to ensure consistent behavior.

## Common Gotchas

- Safe values might cause unexpected centering when content is smaller than expected
- Unsafe values can cause content to overflow and break layouts
- The behavior can vary between different flexbox implementations
- Always test with various content lengths and container sizes

## Best Practices

1. **Default to safe** for most use cases
2. **Test thoroughly** with different content lengths
3. **Use unsafe sparingly** and only when you have control over content
4. **Consider fallbacks** for older browsers
5. **Document your choices** for team members
