# BeejSetu Frontend

## Footer Component

The FooterBlackBox component provides a standardized footer for the BeejSetu platform. It includes sections for About Us, Contact Information, Quick Links, and Platform Metrics.

### Customization

To update placeholder values, edit the constants at the top of `src/components/FooterBlackBox.tsx`:

```typescript
const PLATFORM_NAME = 'BeejSetu';
const DOMAIN = 'beejsetu.in';
const ORG_NAME = 'BeejSetu Technologies';
```

### Translation

Footer content can be translated by adding translations to the `locales/[lang].json` file under the `footer` key:

```json
{
  "footer": {
    "about": {
      "title": "About Us",
      "description": "..."
    },
    "contact": {
      "title": "Contact Us",
      "general": "General Enquiries",
      ...
    }
  }
}
```

### Development

- Run `npm run storybook` to view the footer component in isolation
- Run `npm run test` to run component tests
- Run `npm run build:footer-demo` to generate the static HTML version

### Accessibility

The footer component follows WCAG 2.1 AA guidelines:
- Uses semantic HTML5 elements
- Includes proper ARIA labels
- Maintains color contrast ratios
- Supports keyboard navigation
- Provides print styles

### Analytics

The footer includes data attributes for tracking:
```html
data-section="footer"
data-subsection="[about|contact|links|newsletter|metrics]"
```

### API Integration

The visitor metrics section fetches data from `/api/v1/metrics/footer`. Implement this endpoint to provide:

```typescript
interface VisitorMetrics {
  visitors_today: number;
  visitors_month: number;
  registered_users: number;
  active_fpos: number;
}