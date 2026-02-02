export const MOCK_RESPONSE = `# React Native Hello World

Here's a simple example to get you started:

## Basic Component

\`\`\`javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World! 👋</Text>
      <Text style={styles.subtitle}>Welcome to React Native</Text>
    </View>
  );
}
\`\`\`

## Key Concepts

React Native uses **native components** instead of web components:

- \`<View>\` instead of \`<div>\`
- \`<Text>\` instead of \`<p>\` or \`<span>\`
- \`<Image>\` instead of \`<img>\`

### Styling

Styles use **JavaScript objects** with camelCase properties:

| Web CSS | React Native |
|---------|--------------|
| background-color | backgroundColor |
| font-size | fontSize |
| margin-top | marginTop |

That's it! You're ready to build mobile apps. 🚀`;

export const STREAM_DELAY_MS = 20;
