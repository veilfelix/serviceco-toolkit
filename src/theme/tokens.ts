/**
 * Breakpoints must be updated in three places:
 * - theme/index.css
 * - theme/tokens.ts
 * - tailwind.config.js
 * These values are used in JS/TS logic and should match Tailwind's config.
 */
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const tokens = {
  breakpoints,
  radii: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },
  fonts: {
    sans: 'var(--font-sans)',
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
  colors: {
    // Colors
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: 'hsl(var(--primary))',
    primaryForeground: 'hsl(var(--primary-foreground))',
    secondary: 'hsl(var(--secondary))',
    secondaryForeground: 'hsl(var(--secondary-foreground))',
    muted: 'hsl(var(--muted))',
    mutedForeground: 'hsl(var(--muted-foreground))',
    accent: 'hsl(var(--accent))',
    accentForeground: 'hsl(var(--accent-foreground))',
    destructive: 'hsl(var(--destructive))',
    destructiveForeground: 'hsl(var(--destructive-foreground))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    // Slider Colors
    sliderTrack: 'hsl(var(--slider-track-bg))',
    sliderRange: 'hsl(var(--slider-range-bg))',
    sliderThumb: 'hsl(var(--slider-thumb-bg))',
    sliderThumbBorder: 'hsl(var(--slider-thumb-border))',
    // Alert Colors
    alertSuccessBg: 'hsl(var(--alert-success-bg))',
    alertSuccessText: 'hsl(var(--alert-success-text))',
    alertSuccessBorder: 'hsl(var(--alert-success-border))',
    alertWarningBg: 'hsl(var(--alert-warning-bg))',
    alertWarningText: 'hsl(var(--alert-warning-text))',
    alertWarningBorder: 'hsl(var(--alert-warning-border))',
    alertErrorBg: 'hsl(var(--alert-error-bg))',
    alertErrorText: 'hsl(var(--alert-error-text))',
    alertErrorBorder: 'hsl(var(--alert-error-border))',
    alertInfoBg: 'hsl(var(--alert-info-bg))',
    alertInfoText: 'hsl(var(--alert-info-text))',
    alertInfoBorder: 'hsl(var(--alert-info-border))',
    // Badge Colors
    badgeSuccessBg: 'hsl(var(--badge-success-bg))',
    badgeSuccessText: 'hsl(var(--badge-success-text))',
    badgeWarningBg: 'hsl(var(--badge-warning-bg))',
    badgeWarningText: 'hsl(var(--badge-warning-text))',
    // Dialog Colors
    dialogOverlayBackground: 'var(--dialog-overlay-background)',
    dialogCloseTextColor: 'var(--dialog-close-text-color)',
    // Avatar Status Colors
    avatarStatusOnline: 'hsl(var(--avatar-status-color-online))',
    avatarStatusAway: 'hsl(var(--avatar-status-color-away))',
    avatarStatusBusy: 'hsl(var(--avatar-status-color-busy))',
    avatarFallbackColorBlueBg: 'hsl(var(--avatar-fallback-color-blue-bg))',
    avatarFallbackColorBlueText: 'hsl(var(--avatar-fallback-color-blue-text))',
    avatarFallbackColorGreenBg: 'rgb(var(--avatar-fallback-color-green-bg))',
    avatarFallbackColorGreenText: 'rgb(var(--avatar-fallback-color-green-text))',
    avatarFallbackColorYellowBg: 'rgb(var(--avatar-fallback-color-yellow-bg))',
    avatarFallbackColorYellowText: 'rgb(var(--avatar-fallback-color-yellow-text))',
    avatarFallbackColorRedBg: 'rgb(var(--avatar-fallback-color-red-bg))',
    avatarFallbackColorRedText: 'rgb(var(--avatar-fallback-color-red-text))',
  },
  // Switch Sizes
  switch: {
    sm: {
      trackHeight: 'var(--switch-sm-track-height)',
      trackWidth: 'var(--switch-sm-track-width)',
      thumbSize: 'var(--switch-sm-thumb-size)',
      translate: 'var(--switch-sm-translate)',
    },
    md: {
      trackHeight: 'var(--switch-md-track-height)',
      trackWidth: 'var(--switch-md-track-width)',
      thumbSize: 'var(--switch-md-thumb-size)',
      translate: 'var(--switch-md-translate)',
    },
    lg: {
      trackHeight: 'var(--switch-lg-track-height)',
      trackWidth: 'var(--switch-lg-track-width)',
      thumbSize: 'var(--switch-lg-thumb-size)',
      translate: 'var(--switch-lg-translate)',
    },
  },
  // Accordion
  accordion: {
    triggerPaddingY: 'var(--accordion-trigger-padding-y)',
    triggerFontWeight: 'var(--accordion-trigger-font-weight)',
    triggerHoverOpacity: 'var(--accordion-trigger-hover-opacity)',
    iconSize: 'var(--accordion-icon-size)',
    iconTransition: 'var(--accordion-icon-transition)',
    contentPaddingBottom: 'var(--accordion-content-padding-bottom)',
    animationDuration: 'var(--accordion-animation-duration)',
  },
  // Dialog
  dialog: {
    overlayBlur: 'var(--dialog-overlay-blur)',
    overlayZIndex: 'var(--dialog-overlay-z-index)',
    contentZIndex: 'var(--dialog-content-z-index)',
    contentWidth: 'var(--dialog-content-width)',
    contentMaxWidth: 'var(--dialog-content-max-width)',
    contentGap: 'var(--dialog-content-gap)',
    contentPadding: 'var(--dialog-content-padding)',
    contentBorderRadius: 'var(--dialog-content-border-radius)',
    titleFontSize: 'var(--dialog-title-font-size)',
    titleFontWeight: 'var(--dialog-title-font-weight)',
    closeRight: 'var(--dialog-close-right)',
    closeTop: 'var(--dialog-close-top)',
    closeIconSize: 'var(--dialog-close-icon-size)',
  },
  // Tabs
  tabs: {
    listHeight: 'var(--tabs-list-height)',
    listPadding: 'var(--tabs-list-padding)',
    listBorderRadius: 'var(--tabs-list-border-radius)',
    triggerBorderRadius: 'var(--tabs-trigger-border-radius)',
    contentBorderRadius: 'var(--tabs-content-border-radius)',
  },
  // Popover
  popover: {
    contentZIndex: 'var(--popover-content-z-index)',
    contentWidth: 'var(--popover-content-width)',
    contentPadding: 'var(--popover-content-padding)',
    closeRight: 'var(--popover-close-right)',
    closeTop: 'var(--popover-close-top)',
    closeSize: 'var(--popover-close-size)',
    closeBorderRadius: 'var(--popover-close-border-radius)',
    closeIconSize: 'var(--popover-close-icon-size)',
  },
  // Header
  header: {
    paddingY: 'var(--header-padding-y)',
    titleFontWeight: 'var(--header-title-font-weight)',
    navItemGap: 'var(--header-nav-item-gap)',
  },
  // Button
  button: {
    fontWeight: 'var(--button-font-weight)',
    transition: 'var(--button-transition)',
    focusOutline: 'var(--button-focus-outline)',
    focusRingWidth: 'var(--button-focus-ring-width)',
    focusRingOffset: 'var(--button-focus-ring-offset)',
    disabledOpacity: 'var(--button-disabled-opacity)',
    disabledEvents: 'var(--button-disabled-events)',
    borderRadius: 'var(--button-border-radius)',
    paddingY: {
      sm: 'var(--button-padding-y-sm)',
      md: 'var(--button-padding-y-md)',
      lg: 'var(--button-padding-y-lg)',
    },
    hoverBackgroundOpacity: 'var(--button-hover-background-opacity)',
    disabledCursor: 'var(--button-disabled-cursor)',
  },
  // Card
  card: {
    shadow: 'var(--card-shadow)',
    header: {
      gap: 'var(--card-header-gap)',
    },
    title: {
      lineHeight: 'var(--card-title-line-height)',
      letterSpacing: 'var(--card-title-letter-spacing)',
      fontWeight: 'var(--card-title-font-weight)',
    },
    footer: {
      paddingTop: 'var(--card-footer-padding-top)',
    },
    content: {
      paddingTop: 'var(--card-content-padding-top)',
    },
  },
  // Input
  input: {
    width: 'var(--input-width)',
    borderRadius: 'var(--input-border-radius)',
    borderWidth: 'var(--input-border-width)',
    background: 'var(--input-background)',
    paddingY: 'var(--input-padding-y)',
    ringOffsetColor: 'var(--input-ring-offset-color)',
    focusOutline: 'var(--input-focus-outline)',
    focusRingWidth: 'var(--input-focus-ring-width)',
    focusRingOffset: 'var(--input-focus-ring-offset)',
    disabledCursor: 'var(--input-disabled-cursor)',
    disabledOpacity: 'var(--input-disabled-opacity)',
  },
  // Avatar
  avatar: {
    shrink: 'var(--avatar-shrink)',
    overflow: 'var(--avatar-overflow)',
    size: {
      xs: 'var(--avatar-size-xs)',
      sm: 'var(--avatar-size-sm)',
      md: 'var(--avatar-size-md)',
      lg: 'var(--avatar-size-lg)',
      xl: 'var(--avatar-size-xl)',
    },
    borderWidth: 'var(--avatar-border-width)',
    status: {
      borderRadius: 'var(--avatar-status-border-radius)',
      borderWidth: 'var(--avatar-status-border-width)',
      size: {
        xs: 'var(--avatar-status-size-xs)',
        sm: 'var(--avatar-status-size-sm)',
        md: 'var(--avatar-status-size-md)',
        lg: 'var(--avatar-status-size-lg)',
        xl: 'var(--avatar-status-size-xl)',
      },
    },
    image: {
      height: 'var(--avatar-image-height)',
      width: 'var(--avatar-image-width)',
      fit: 'var(--avatar-image-fit)',
    },
    fallback: {
      height: 'var(--avatar-fallback-height)',
      width: 'var(--avatar-fallback-width)',
      fontWeight: 'var(--avatar-fallback-font-weight)',
    },
  },
  // Slider
  slider: {
    trackHeight: 'var(--slider-track-height)',
    thumbSize: 'var(--slider-thumb-size)',
    thumbShadow: 'var(--slider-thumb-shadow)',
    thumbRingWidth: 'var(--slider-thumb-ring-width)',
    tooltipBg: 'var(--slider-tooltip-bg)',
    tooltipText: 'var(--slider-tooltip-text)',
  },
  // Table & TableResponsive
  table: {
    borderColor: 'var(--table-border-color)',
    headerBg: 'var(--table-header-bg)',
    headerFontWeight: 'var(--table-header-font-weight)',
    rowHoverBg: 'var(--table-row-hover-bg)',
    rowStripeBg: 'var(--table-row-stripe-bg)',
    stickyHeaderShadow: 'var(--table-sticky-header-shadow)',
    responsiveCardPadding: 'var(--table-responsive-card-padding)',
    responsiveStackedSpacing: 'var(--table-responsive-stacked-spacing)',
    responsiveBreakpoint: 'var(--table-responsive-breakpoint)',
  },
  // Pagination
  pagination: {
    itemSize: 'var(--pagination-item-size)',
    itemRadius: 'var(--pagination-item-radius)',
    itemMargin: 'var(--pagination-item-margin)',
    fontSize: 'var(--pagination-font-size)',
    fontWeight: 'var(--pagination-font-weight)',
    activeBg: 'var(--pagination-active-bg)',
    activeText: 'var(--pagination-active-text)',
    hoverBg: 'var(--pagination-hover-bg)',
    disabledOpacity: 'var(--pagination-disabled-opacity)',
    iconSize: 'var(--pagination-icon-size)',
    selectorMinWidth: 'var(--pagination-selector-min-width)',
  },
  // Skeleton
  skeleton: {
    bg: 'hsl(var(--skeleton-bg))',
    highlight: 'hsl(var(--skeleton-highlight))',
    animationDuration: 'var(--skeleton-animation-duration)',
    borderRadius: 'var(--skeleton-border-radius)',
    circleBorderRadius: 'var(--skeleton-circle-border-radius)',
    pulseOpacityFrom: 'var(--skeleton-pulse-opacity-from)',
    pulseOpacityTo: 'var(--skeleton-pulse-opacity-to)',
    waveFrom: 'var(--skeleton-wave-from)',
    waveTo: 'var(--skeleton-wave-to)',
  },
  // ProgressBar
  progress: {
    height: 'var(--progress-height)',
    borderRadius: 'var(--progress-border-radius)',
    bg: 'hsl(var(--progress-bg))',
    primaryColor: 'hsl(var(--progress-primary-color))',
    secondaryColor: 'hsl(var(--progress-secondary-color))',
    successColor: 'hsl(var(--progress-success-color))',
    warningColor: 'hsl(var(--progress-warning-color))',
    dangerColor: 'hsl(var(--progress-danger-color))',
    indeterminateAnimationDuration: 'var(--progress-indeterminate-animation-duration)',
    labelFontSize: 'var(--progress-label-font-size)',
    labelFontWeight: 'var(--progress-label-font-weight)',
    textMargin: 'var(--progress-text-margin)',
  },
}