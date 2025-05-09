/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],  
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
          },
        },
      },
      colors: {
        // Colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Alert Colors
        'alert-success-bg': 'hsl(var(--alert-success-bg))',
        'alert-success-text': 'hsl(var(--alert-success-text))',
        'alert-success-border': 'hsl(var(--alert-success-border))',
        'alert-warning-bg': 'hsl(var(--alert-warning-bg))',
        'alert-warning-text': 'hsl(var(--alert-warning-text))',
        'alert-warning-border': 'hsl(var(--alert-warning-border))',
        'alert-error-bg': 'hsl(var(--alert-error-bg))',
        'alert-error-text': 'hsl(var(--alert-error-text))',
        'alert-error-border': 'hsl(var(--alert-error-border))',
        'alert-info-bg': 'hsl(var(--alert-info-bg))',
        'alert-info-text': 'hsl(var(--alert-info-text))',
        'alert-info-border': 'hsl(var(--alert-info-border))',
        // Badge Colors
        'badge-success-bg': 'hsl(var(--badge-success-bg))',
        'badge-success-text': 'hsl(var(--badge-success-text))',
        'badge-warning-bg': 'hsl(var(--badge-warning-bg))',
        'badge-warning-text': 'hsl(var(--badge-warning-text))',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
      },
      switchSize: {
        'sm-track-height': 'var(--switch-sm-track-height)',
        'sm-track-width': 'var(--switch-sm-track-width)',
        'sm-thumb-size': 'var(--switch-sm-thumb-size)',
        'sm-translate': 'var(--switch-sm-translate)',
        'md-track-height': 'var(--switch-md-track-height)',
        'md-track-width': 'var(--switch-md-track-width)',
        'md-thumb-size': 'var(--switch-md-thumb-size)',
        'md-translate': 'var(--switch-md-translate)',
        'lg-track-height': 'var(--switch-lg-track-height)',
        'lg-track-width': 'var(--switch-lg-track-width)',
        'lg-thumb-size': 'var(--switch-lg-thumb-size)',
        'lg-translate': 'var(--switch-lg-translate)',
      },
      fontSize: {
        sm: 'var(--font-sm)',
        base: 'var(--font-base)',
        lg: 'var(--font-lg)',
        xl: 'var(--font-xl)',
        '2xl': 'var(--font-2xl)',
        '3xl': 'var(--font-3xl)',
        '4xl': 'var(--font-4xl)',
        '5xl': 'var(--font-5xl)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}