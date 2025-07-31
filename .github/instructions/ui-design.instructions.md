# UI Design Instructions

## Visual Consistency
- Maintain consistent spacing, typography, and color schemes across all components
- Use a unified design system with predefined tokens for colors, fonts, and spacing
- Ensure all interactive elements follow the same visual patterns and behaviors
- Keep consistent border radius, shadows, and other visual effects throughout the app

## Layout Stability
- Prevent layout shifts when content length changes (use min-height, fixed dimensions when appropriate)
- Use CSS Grid or Flexbox for responsive layouts that don't break with varying content
- Implement skeleton loading states to maintain layout structure while data loads
- Reserve space for dynamic content to avoid sudden jumps or reflows
- Use CSS containment properties to isolate layout changes

## User Experience Patterns
- Follow established UI conventions and user expectations
- Implement familiar interaction patterns (hover states, click feedback, focus indicators)
- Provide clear visual hierarchy with proper contrast and typography scales
- Use consistent iconography and maintain icon alignment across components
- Ensure all interactive elements have appropriate click targets
- Design for mouse and keyboard interactions primarily

## Desktop-Focused Design
- Focus on desktop/PC web layout optimization
- Use relative units (rem, em, %) for scalable designs
- Ensure text remains readable at different zoom levels
- Test layouts with various content lengths on desktop screens
- Design for standard desktop screen resolutions (1920x1080, 1366x768, etc.)

## Accessibility
- Maintain proper color contrast ratios (WCAG AA standards)
- Provide focus indicators for keyboard navigation
- Use semantic HTML elements and proper ARIA labels
- Ensure all interactive elements are keyboard accessible
- Support screen readers with meaningful alt text and descriptions

## Animation and Transitions
- Use subtle animations to enhance user experience, not distract
- Keep animation durations between 200-500ms for optimal perception
- Implement easing functions that feel natural (ease-out, ease-in-out)
- Provide reduced motion options for accessibility
- Use animations to guide user attention and provide feedback

## Component Design
- Create reusable components with consistent props and behaviors
- Implement proper loading, error, and empty states for all components
- Use compound components pattern for complex UI elements
- Ensure components work well in isolation and composition
- Document component usage and variations

## Theme Support
- Design for both light and dark modes from the beginning
- Use CSS custom properties for themeable values
- Ensure proper contrast in both theme modes
- Test all components in both themes regularly
- Provide smooth theme transition animations

## Performance Considerations
- Optimize images and use appropriate formats (WebP, SVG)
- Implement lazy loading for images and heavy components
- Use CSS containment to optimize rendering performance
- Minimize layout thrashing with proper CSS architecture
- Consider bundle size impact of UI libraries and components

## Error Handling
- Design clear and actionable error messages
- Provide helpful suggestions for error resolution
- Use consistent error styling and positioning
- Implement proper form validation with inline feedback
- Show progress indicators for long-running operations

## Content Strategy
- Design for internationalization (i18n) from the start
- Handle text expansion for different languages
- Use flexible layouts that accommodate varying text lengths
- Implement proper text truncation with tooltips when needed
- Consider right-to-left (RTL) language support
