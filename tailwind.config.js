/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],  
  theme: {
    // Breakpoints (named 'screens' here) must be updated in three places:
    // - theme/index.css
    // - theme/tokens.ts
    // - tailwind.config.js
    // This config controls responsive behavior in Tailwind utilities.
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
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
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(var(--skeleton-wave-from))' },
          '100%': { transform: 'translateX(var(--skeleton-wave-to))' },
        },
        indeterminate: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + 1rem))' },
          to: { transform: 'translateX(0)' },
        },
        slideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(100% + 1rem))' },
        },
        slideInFromTop: {
          from: { transform: 'translateY(calc(-100% - 1rem))' },
          to: { transform: 'translateY(0)' },
        },
        slideOutToTop: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - 1rem))' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideInFromLeft: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideOutToLeft: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        slideInFromRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideOutToRight: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        slideInFromBottom: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        slideOutToBottom: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + 1rem))' },
        },
      },
      animation: {
        wave: 'wave 1.6s ease-in-out infinite',
        indeterminate: 'indeterminate var(--progress-indeterminate-animation-duration) ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideIn: 'slideIn var(--toast-animation-duration) ease-out',
        slideOut: 'slideOut var(--toast-animation-duration) ease-in',
        slideInFromTop: 'slideInFromTop var(--toast-animation-duration) ease-out',
        slideOutToTop: 'slideOutToTop var(--toast-animation-duration) ease-in', 
        slideInFromLeft: 'slideInFromLeft var(--drawer-animation-duration) ease-out',
        slideOutToLeft: 'slideOutToLeft var(--drawer-animation-duration) ease-in',
        slideInFromRight: 'slideInFromRight var(--drawer-animation-duration) ease-out',
        slideOutToRight: 'slideOutToRight var(--drawer-animation-duration) ease-in',
        slideInFromBottom: 'slideInFromBottom var(--drawer-animation-duration) ease-out',
        slideOutToBottom: 'slideOutToBottom var(--drawer-animation-duration) ease-in',
        fadeIn: 'fadeIn var(--toast-animation-duration) ease-out',
        fadeOut: 'fadeOut var(--toast-animation-duration) ease-in',
        swipeOut: 'swipeOut 100ms ease-out',
      },
      /**
       * Design tokens mapped for Tailwind utility classes.
       * These can be used directly like `bg-primary`, `text-foreground`, `rounded-md`, `p-spacing-md` etc.
       */
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
        // Slider Colors
        'slider-track': 'hsl(var(--slider-track-bg))',
        'slider-range': 'hsl(var(--slider-range-bg))',
        'slider-thumb': 'hsl(var(--slider-thumb-bg))',
        'slider-thumb-border': 'hsl(var(--slider-thumb-border))',
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
        // Dialog Colors
        'dialog-overlay-background': 'var(--dialog-overlay-background)',
        'dialog-close-text-color': 'var(--dialog-close-text-color)',
        // Drawer Colors
        'drawer-overlay-background': 'var(--drawer-overlay-background)',
        // Avatar Status Colors
        'avatar-status-online': 'hsl(var(--avatar-status-color-online))',
        'avatar-status-away': 'hsl(var(--avatar-status-color-away))',
        'avatar-status-busy': 'hsl(var(--avatar-status-color-busy))',
        'avatar-fallback-blue-bg': 'hsl(var(--avatar-fallback-color-blue-bg))',
        'avatar-fallback-blue-text': 'hsl(var(--avatar-fallback-color-blue-text))',
        'avatar-fallback-green-bg' : 'rgb(var(--avatar-fallback-color-green-bg))',
        'avatar-fallback-green-text' : 'rgb(var(--avatar-fallback-color-green-text))',
        'avatar-fallback-yellow-bg' : 'rgb(var(--avatar-fallback-color-yellow-bg))',
        'avatar-fallback-yellow-text' : 'rgb(var(--avatar-fallback-color-yellow-text))',
        'avatar-fallback-red-bg' : 'rgb(var(--avatar-fallback-color-red-bg))',
        'avatar-fallback-red-text' : 'rgb(var(--avatar-fallback-color-red-text))',
        // Skeleton Colors
        'skeleton-bg': 'hsl(var(--skeleton-bg))',
        'skeleton-highlight': 'hsl(var(--skeleton-highlight))',
        // Progress Colors
        'progress-bg': 'hsl(var(--progress-bg))',
        'progress-primary': 'hsl(var(--progress-primary-color))',
        'progress-secondary': 'hsl(var(--progress-secondary-color))',
        'progress-success': 'hsl(var(--progress-success-color))',
        'progress-warning': 'hsl(var(--progress-warning-color))',
        'progress-danger': 'hsl(var(--progress-danger-color))',
        // Toast Colors
        'toast-background': 'hsl(var(--toast-background))',
        'toast-foreground': 'hsl(var(--toast-foreground))',
        'toast-success-bg': 'hsl(var(--toast-success-bg))',
        'toast-success-text': 'hsl(var(--toast-success-text))',
        'toast-success-border': 'hsl(var(--toast-success-border))',
        'toast-warning-bg': 'hsl(var(--toast-warning-bg))',
        'toast-warning-text': 'hsl(var(--toast-warning-text))',
        'toast-warning-border': 'hsl(var(--toast-warning-border))',
        'toast-error-bg': 'hsl(var(--toast-error-bg))',
        'toast-error-text': 'hsl(var(--toast-error-text))',
        'toast-error-border': 'hsl(var(--toast-error-border))',
        'toast-info-bg': 'hsl(var(--toast-info-bg))',
        'toast-info-text': 'hsl(var(--toast-info-text))',
        'toast-info-border': 'hsl(var(--toast-info-border))',
        // Stepper Colors
        'stepper-inactive-bg': 'hsl(var(--stepper-inactive-bg))',
        'stepper-inactive-text': 'hsl(var(--stepper-inactive-text))',
        'stepper-active-bg': 'hsl(var(--stepper-active-bg))',
        'stepper-active-text': 'hsl(var(--stepper-active-text))',
        'stepper-complete-bg': 'hsl(var(--stepper-complete-bg))',
        'stepper-complete-text': 'hsl(var(--stepper-complete-text))',
        'stepper-error-bg': 'hsl(var(--stepper-error-bg))',
        'stepper-error-text': 'hsl(var(--stepper-error-text))',
        'stepper-description': 'hsl(var(--stepper-description-color))',
        // Calendar Colors
        'calendar-day-hover': 'hsl(var(--calendar-day-hover-bg))',
        'calendar-day-active-bg': 'hsl(var(--calendar-day-active-bg))',
        'calendar-day-active-text': 'hsl(var(--calendar-day-active-text))',
        'calendar-today-border': 'hsl(var(--calendar-today-border-color))',
        'calendar-selected-bg': 'hsl(var(--calendar-selected-bg))',
        'calendar-selected-text': 'hsl(var(--calendar-selected-text))',
        'calendar-event-bg': 'hsl(var(--calendar-event-bg))',
        'calendar-event-text': 'hsl(var(--calendar-event-text))',
        'calendar-weekday': 'hsl(var(--calendar-weekday-color))',
        // Sidebar Colors
        'sidebar-background': 'hsl(var(--sidebar-background))',
        'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
        'sidebar-border': 'var(--sidebar-border-color)',
        'sidebar-item-color': 'var(--sidebar-item-color)',
        'sidebar-item-hover': 'var(--sidebar-item-hover-bg)',
        'sidebar-item-active': 'var(--sidebar-item-active-bg)',
        'sidebar-item-active-text': 'var(--sidebar-item-active-color)',
        
        // Carousel Colors
        'carousel-control-bg': 'var(--carousel-control-bg)',
        'carousel-control-hover-bg': 'var(--carousel-control-hover-bg)',
        'carousel-control-color': 'var(--carousel-control-color)',
        'carousel-indicator-color': 'var(--carousel-indicator-color)',
        'carousel-indicator-active-color': 'var(--carousel-indicator-active-color)',
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
      /**
       * Component-specific tokens not intended for direct Tailwind class usage.
       * These are meant to be consumed via `var(--token-name)` inside component class definitions or inline styles.
       * Example: `style={{ zIndex: 'var(--dialog-content-z-index)' }}` or `className="rounded-[var(--card-title-letter-spacing)]"`.
       */
      // switchSize
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
      // Accordion
      accordion: {
        'trigger-padding-y': 'var(--accordion-trigger-padding-y)',
        'trigger-font-weight': 'var(--accordion-trigger-font-weight)',
        'trigger-hover-opacity': 'var(--accordion-trigger-hover-opacity)',
        'icon-size': 'var(--accordion-icon-size)',
        'icon-transition': 'var(--accordion-icon-transition)',
        'content-padding-bottom': 'var(--accordion-content-padding-bottom)',
        'animation-duration': 'var(--accordion-animation-duration)',
      },
      // Dialog
      dialog: {
        'overlay-blur': 'var(--dialog-overlay-blur)',
        'overlay-z-index': 'var(--dialog-overlay-z-index)',
        'content-z-index': 'var(--dialog-content-z-index)',
        'content-width': 'var(--dialog-content-width)',
        'content-max-width': 'var(--dialog-content-max-width)',
        'content-gap': 'var(--dialog-content-gap)',
        'content-padding': 'var(--dialog-content-padding)',
        'content-border-radius': 'var(--dialog-content-border-radius)',
        'title-font-size': 'var(--dialog-title-font-size)',
        'title-font-weight': 'var(--dialog-title-font-weight)',
        'close-right': 'var(--dialog-close-right)',
        'close-top': 'var(--dialog-close-top)',
        'close-icon-size': 'var(--dialog-close-icon-size)',
      },
      // Tabs
      tabs: {
        'list-height': 'var(--tabs-list-height)',
        'list-padding': 'var(--tabs-list-padding)',
        'list-border-radius': 'var(--tabs-list-border-radius)',
        'trigger-border-radius': 'var(--tabs-trigger-border-radius)',
        'content-border-radius': 'var(--tabs-content-border-radius)',
      },
      // Popover
      popover: {
        'content-z-index': 'var(--popover-content-z-index)',
        'content-width': 'var(--popover-content-width)',
        'content-padding': 'var(--popover-content-padding)',
        'close-right': 'var(--popover-close-right)',
        'close-top': 'var(--popover-close-top)',
        'close-size': 'var(--popover-close-size)',
        'close-border-radius': 'var(--popover-close-border-radius)',
        'close-icon-size': 'var(--popover-close-icon-size)',
      },
      // Header
      header: {
        'padding-y': 'var(--header-padding-y)',
        'title-font-weight': 'var(--header-title-font-weight)',
        'nav-item-gap': 'var(--header-nav-item-gap)',
      },
      // Button
      button: {
        'font-weight': 'var(--button-font-weight)',
        'transition': 'var(--button-transition)',
        'focus-outline': 'var(--button-focus-outline)',
        'focus-ring-width': 'var(--button-focus-ring-width)',
        'focus-ring-offset': 'var(--button-focus-ring-offset)',
        'disabled-opacity': 'var(--button-disabled-opacity)',
        'disabled-events': 'var(--button-disabled-events)',
        'border-radius': 'var(--button-border-radius)',
        'padding-y-sm': 'var(--button-padding-y-sm)',
        'padding-y-md': 'var(--button-padding-y-md)',
        'padding-y-lg': 'var(--button-padding-y-lg)',
        'hover-background-opacity': 'var(--button-hover-background-opacity)',
        'disabled-cursor': 'var(--button-disabled-cursor)',
        'sm-offset': 'var(--button-sm-offset)',
      },
      // Card
      card: {
        'shadow': 'var(--card-shadow)',
        'header-gap': 'var(--card-header-gap)',
        'title-line-height': 'var(--card-title-line-height)',
        'title-letter-spacing': 'var(--card-title-letter-spacing)',
        'title-font-weight': 'var(--card-title-font-weight)',
        'footer-padding-top': 'var(--card-footer-padding-top)',
        'content-padding-top': 'var(--card-content-padding-top)',
      },
      // Input
      input: {
        'width': 'var(--input-width)',
        'border-radius': 'var(--input-border-radius)',
        'border-width': 'var(--input-border-width)',
        'background': 'var(--input-background)',
        'padding-y': 'var(--input-padding-y)',
        'ring-offset-color': 'var(--input-ring-offset-color)',
        'focus-outline': 'var(--input-focus-outline)',
        'focus-ring-width': 'var(--input-focus-ring-width)',
        'focus-ring-offset': 'var(--input-focus-ring-offset)',
        'disabled-cursor': 'var(--input-disabled-cursor)',
        'disabled-opacity': 'var(--input-disabled-opacity)',
      },
      // Avatar
      avatar: {
        'shrink': 'var(--avatar-shrink)',
        'overflow': 'var(--avatar-overflow)',
        'size-xs': 'var(--avatar-size-xs)',
        'size-sm': 'var(--avatar-size-sm)',
        'size-md': 'var(--avatar-size-md)',
        'size-lg': 'var(--avatar-size-lg)',
        'size-xl': 'var(--avatar-size-xl)',
        'border-width': 'var(--avatar-border-width)',
        'status-border-radius': 'var(--avatar-status-border-radius)',
        'status-border-width': 'var(--avatar-status-border-width)',
        'status-size-xs': 'var(--avatar-status-size-xs)',
        'status-size-sm': 'var(--avatar-status-size-sm)',
        'status-size-md': 'var(--avatar-status-size-md)',
        'status-size-lg': 'var(--avatar-status-size-lg)',
        'status-size-xl': 'var(--avatar-status-size-xl)',
        'image-height': 'var(--avatar-image-height)',
        'image-width': 'var(--avatar-image-width)',
        'image-fit': 'var(--avatar-image-fit)',
        'fallback-height': 'var(--avatar-fallback-height)',
        'fallback-width': 'var(--avatar-fallback-width)',
        'fallback-font-weight': 'var(--avatar-fallback-font-weight)',
      },
      // Slider
      slider: {
        'track-height': 'var(--slider-track-height)',
        'thumb-size': 'var(--slider-thumb-size)',
        'thumb-shadow': 'var(--slider-thumb-shadow)',
        'thumb-ring-width': 'var(--slider-thumb-ring-width)',
        'tooltip-bg': 'var(--slider-tooltip-bg)',
        'tooltip-text': 'var(--slider-tooltip-text)',
      },
      // Table & TableResponsive
      table: {
        'border-color': 'var(--table-border-color)',
        'header-bg': 'var(--table-header-bg)',
        'header-font-weight': 'var(--table-header-font-weight)',
        'row-hover-bg': 'var(--table-row-hover-bg)',
        'row-stripe-bg': 'var(--table-row-stripe-bg)',
        'sticky-header-shadow': 'var(--table-sticky-header-shadow)',
        'responsive-card-padding': 'var(--table-responsive-card-padding)',
        'responsive-stacked-spacing': 'var(--table-responsive-stacked-spacing)',
        'responsive-breakpoint': 'var(--table-responsive-breakpoint)',
      },
      // Pagination
      pagination: {
        'item-size': 'var(--pagination-item-size)',
        'item-radius': 'var(--pagination-item-radius)',
        'item-margin': 'var(--pagination-item-margin)',
        'font-size': 'var(--pagination-font-size)',
        'font-weight': 'var(--pagination-font-weight)',
        'active-bg': 'var(--pagination-active-bg)',
        'active-text': 'var(--pagination-active-text)',
        'hover-bg': 'var(--pagination-hover-bg)',
        'disabled-opacity': 'var(--pagination-disabled-opacity)',
        'icon-size': 'var(--pagination-icon-size)',
        'selector-min-width': 'var(--pagination-selector-min-width)',
      },
      // Skeleton
      skeleton: {
        'bg': 'hsl(var(--skeleton-bg))',
        'highlight': 'hsl(var(--skeleton-highlight))',
        'animation-duration': 'var(--skeleton-animation-duration)',
        'border-radius': 'var(--skeleton-border-radius)',
        'circle-border-radius': 'var(--skeleton-circle-border-radius)',
        'pulse-opacity-from': 'var(--skeleton-pulse-opacity-from)',
        'pulse-opacity-to': 'var(--skeleton-pulse-opacity-to)',
        'wave-from': 'var(--skeleton-wave-from)',
        'wave-to': 'var(--skeleton-wave-to)',
      },
      // ProgressBar
      progress: {
        'height': 'var(--progress-height)',
        'border-radius': 'var(--progress-border-radius)',
        'bg': 'hsl(var(--progress-bg))',
        'primary-color': 'hsl(var(--progress-primary-color))',
        'secondary-color': 'hsl(var(--progress-secondary-color))',
        'success-color': 'hsl(var(--progress-success-color))',
        'warning-color': 'hsl(var(--progress-warning-color))',
        'danger-color': 'hsl(var(--progress-danger-color))',
        'indeterminate-animation-duration': 'var(--progress-indeterminate-animation-duration)',
        'label-font-size': 'var(--progress-label-font-size)',
        'label-font-weight': 'var(--progress-label-font-weight)',
        'text-margin': 'var(--progress-text-margin)',
      },
      // Toast
      toast: {
        'z-index': 'var(--toast-z-index)',
        'width': 'var(--toast-width)',
        'gap': 'var(--toast-gap)',
        'padding': 'var(--toast-padding)',
        'border-radius': 'var(--toast-border-radius)',
        'border-width': 'var(--toast-border-width)',
        'shadow': 'var(--toast-shadow)',
        'font-size': 'var(--toast-font-size)',
        'line-height': 'var(--toast-line-height)',
        'title-font-weight': 'var(--toast-title-font-weight)',
        'description-opacity': 'var(--toast-description-opacity)',
        'animation-duration': 'var(--toast-animation-duration)',
        'auto-dismiss-duration': 'var(--toast-auto-dismiss-duration)',
        'transition-duration': 'var(--toast-transition-duration)',
        'max-height': 'var(--toast-max-height)',
        'icon-size': 'var(--toast-icon-size)',
        'action-gap': 'var(--toast-action-gap)',
        'action-hover-opacity': 'var(--toast-action-hover-opacity)',
      },
      // Stepper
      stepper: {
        'icon-size-sm': 'var(--stepper-icon-size-sm)',
        'icon-size-md': 'var(--stepper-icon-size-md)',
        'icon-size-lg': 'var(--stepper-icon-size-lg)',
        'font-size-sm': 'var(--stepper-font-size-sm)',
        'font-size-md': 'var(--stepper-font-size-md)',
        'font-size-lg': 'var(--stepper-font-size-lg)',
        'label-font-weight': 'var(--stepper-label-font-weight)',
        'description-font-weight': 'var(--stepper-description-font-weight)',
        'spacing-sm': 'var(--stepper-spacing-sm)',
        'spacing-md': 'var(--stepper-spacing-md)',
        'spacing-lg': 'var(--stepper-spacing-lg)',
        'disabled-opacity': 'var(--stepper-disabled-opacity)',
        'border-radius': 'var(--stepper-border-radius)',
        'transition-duration': 'var(--stepper-transition-duration)',
      },
      // Calendar
      calendar: {
        'cell-size': 'var(--calendar-cell-size)',
        'header-padding': 'var(--calendar-header-padding)',
        'border-radius': 'var(--calendar-border-radius)',
        'width': 'var(--calendar-width)',
        'max-width': 'var(--calendar-max-width)',
        'shadow': 'var(--calendar-shadow)',
        'disabled-opacity': 'var(--calendar-disabled-opacity)',
        'outside-month-opacity': 'var(--calendar-outside-month-opacity)',
        'nav-button-size': 'var(--calendar-nav-button-size)',
        'transition-duration': 'var(--calendar-transition-duration)',
        'heading-font-weight': 'var(--calendar-heading-font-weight)',
        'day-font-size': 'var(--calendar-day-font-size)',
        'weekday-font-size': 'var(--calendar-weekday-font-size)',
        'weekday-font-weight': 'var(--calendar-weekday-font-weight)',
      },
      
      // DatePicker
      datepicker: {
        'width': 'var(--datepicker-width)',
        'max-width': 'var(--datepicker-max-width)',
        'icon-size': 'var(--datepicker-icon-size)',
        'input-padding-right': 'var(--datepicker-input-padding-right)',
        'trigger-width': 'var(--datepicker-trigger-width)',
        'clear-button-size': 'var(--datepicker-clear-button-size)',
        'clear-icon-size': 'var(--datepicker-clear-icon-size)',
        'clear-color': 'var(--datepicker-clear-color)',
        'trigger-color': 'var(--datepicker-trigger-color)',
        'dropdown-width': 'var(--datepicker-dropdown-width)',
        'dropdown-padding': 'var(--datepicker-dropdown-padding)',
        'dropdown-margin-top': 'var(--datepicker-dropdown-margin-top)',
        'dropdown-shadow': 'var(--datepicker-dropdown-shadow)',
      },

      // Drawer
      drawer: {
        'overlay-background': 'var(--drawer-overlay-background)',
        'overlay-blur': 'var(--drawer-overlay-blur)',
        'overlay-z-index': 'var(--drawer-overlay-z-index)',
        'content-z-index': 'var(--drawer-content-z-index)',
        'width-side': 'var(--drawer-width-side)',
        'max-width-side': 'var(--drawer-max-width-side)',
        'height-bottom': 'var(--drawer-height-bottom)',
        'max-height-bottom': 'var(--drawer-max-height-bottom)',
        'content-gap': 'var(--drawer-content-gap)',
        'content-padding': 'var(--drawer-content-padding)',
        'content-shadow': 'var(--drawer-content-shadow)',
        'title-font-size': 'var(--drawer-title-font-size)',
        'title-font-weight': 'var(--drawer-title-font-weight)',
        'close-right': 'var(--drawer-close-right)',
        'close-top': 'var(--drawer-close-top)',
        'close-size': 'var(--drawer-close-size)',
        'close-icon-size': 'var(--drawer-close-icon-size)',
        'animation-duration': 'var(--drawer-animation-duration)',
      },

      // Separator
      separator: {
        'thickness-regular': 'var(--separator-thickness-regular)',
        'thickness-thick': 'var(--separator-thickness-thick)',
        'gap': 'var(--separator-gap)',
        'label-padding-x': 'var(--separator-label-padding-x)',
      },

      // Sidebar
      sidebar: {
        'width': 'var(--sidebar-width)',
        'collapsed-width': 'var(--sidebar-collapsed-width)',
        'z-index': 'var(--sidebar-z-index)',
        'padding-x': 'var(--sidebar-padding-x)',
        'padding-y': 'var(--sidebar-padding-y)',
        'gap': 'var(--sidebar-gap)',
        'transition-duration': 'var(--sidebar-transition-duration)',
        'shadow': 'var(--sidebar-shadow)',
        'header-height': 'var(--sidebar-header-height)',
        'footer-height': 'var(--sidebar-footer-height)',
        'item-height': 'var(--sidebar-item-height)',
        'item-padding-x': 'var(--sidebar-item-padding-x)',
        'item-padding-y': 'var(--sidebar-item-padding-y)',
        'item-radius': 'var(--sidebar-item-radius)',
        'item-gap': 'var(--sidebar-item-gap)',
        'section-padding-y': 'var(--sidebar-section-padding-y)',
      },
      
      // Carousel
      carousel: {
        'item-gap': 'var(--carousel-item-gap)',
        'control-size': 'var(--carousel-control-size)',
        'indicator-size': 'var(--carousel-indicator-size)',
        'indicator-active-size': 'var(--carousel-indicator-active-size)',
        'indicator-gap': 'var(--carousel-indicator-gap)',
        'slide-transition-duration': 'var(--carousel-slide-transition-duration)',
        'slide-transition-timing': 'var(--carousel-slide-transition-timing)',
        'padding-x': 'var(--carousel-padding-x)',
        'padding-y': 'var(--carousel-padding-y)',
        'height': 'var(--carousel-height)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  safelist: [
    // ────────────────────────────────
    // Layout: Grid and Flex utilities
    // ────────────────────────────────
    { pattern: /^col-span-(1[0-2]?|[1-9])$/ },
    { pattern: /^row-span-(1[0-2]?|[1-9])$/ },
    { pattern: /^col-start-(1[0-2]?|[1-9])$/ },
    { pattern: /^row-start-(1[0-2]?|[1-9])$/ },
    { pattern: /^grid-cols-(1[0-2]?|[1-9])$/ },
    { pattern: /^grid-rows-(1[0-6])$/ },
    { pattern: /^grid-flow-(row|col|dense|row-dense|col-dense)$/ },

    // ────────────────────────────────
    // Spacing
    // ────────────────────────────────
    { pattern: /^gap(-(xs|sm|md|lg|xl|0))?$/ },
    { pattern: /^gap-x-(xs|sm|md|lg|xl|0)$/ },
    { pattern: /^gap-y-(xs|sm|md|lg|xl|0)$/ },
    { pattern: /^p[trblxy]?-(xs|sm|md|lg|xl|0)$/ },
    { pattern: /^m[trblxy]?-(xs|sm|md|lg|xl|0)$/ },

    // ────────────────────────────────
    // Typography
    // ────────────────────────────────
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|muted|foreground|primary|center|left|right)$/ },
    { pattern: /^font-(sans|serif|mono|bold|medium|semibold|light)$/ },
    { pattern: /^leading-(none|tight|snug|normal|relaxed|loose)$/ },
    { pattern: /^tracking-(tighter|tight|normal|wide|wider|widest)$/ },

    // ────────────────────────────────
    // Colors: Background, text, border
    // ────────────────────────────────
    { pattern: /^bg-(muted|primary|accent|background|foreground|white|black)$/ },
    { pattern: /^text-(muted|primary|accent|background|foreground|white|black)$/ },
    { pattern: /^border(-(muted|primary|accent|foreground|background|white|black))?$/ },

    // ────────────────────────────────
    // Alignment
    // ────────────────────────────────
    { pattern: /^items-(start|center|end|stretch|baseline)$/ },
    { pattern: /^justify-(start|center|end|between|around|evenly)$/ },
    { pattern: /^justify-items-(start|center|end|stretch)$/ },
    { pattern: /^content-(start|center|end|between|around|evenly)$/ },

    // ────────────────────────────────
    // Sizing
    // ────────────────────────────────
    { pattern: /^w-(full|auto|min|max|screen|[\d]+)$/ },
    { pattern: /^h-(full|auto|min|max|screen|[\d]+)$/ },
    { pattern: /^min-w-(0|full|min|max|[\d]+)$/ },
    { pattern: /^min-h-(0|full|min|max|[\d]+)$/ },

    // ────────────────────────────────
    // Borders and Radius
    // ────────────────────────────────
    { pattern: /^rounded(-(none|sm|md|lg|xl|2xl|full))?$/ },
    { pattern: /^border(-(0|2|4|8))?$/ },
    { pattern: /^border-[trbl](-(0|2|4|8))?$/ },

    // ────────────────────────────────
    // Effects
    // ────────────────────────────────
    { pattern: /^shadow(-(sm|md|lg|xl|2xl|none))?$/ },
    { pattern: /^opacity-(0|25|50|75|100)$/ },
    { pattern: /^transition(-(all|colors|opacity|transform))?$/ },
    { pattern: /^duration-(75|100|150|200|300|500)$/ },
    { pattern: /^ease-(linear|in|out|in-out)$/ },
  ],
}