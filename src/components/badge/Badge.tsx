import React, { ForwardedRef, ReactElement } from 'react';
import clsx from 'clsx';
import { ForwardRefComponent } from '@radix-ui/react-polymorphic';
import { useButton,  } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { AriaButtonProps } from '@react-types/button';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  OmittedAriaProps,
  StyleProps
} from '@/utils';
import { useOptionalRef } from '@/hooks';
import { Icon } from '../icon';
import Avatar from '../avatar/Avatar'
import type { AvatarProps } from '../avatar/Avatar';
import { DismissButton } from '..';

export type BadgeProps = StyleProps &
  Omit<
    AriaButtonProps<'button'>,
    OmittedAriaProps | 'href' | 'rel' | 'target'
  > & {
    /**
     * Size of the badge.
     * @default "medium"
     */
    size?: 'small' | 'medium';

    /**
     * The badge's visual appearance.
     * @default "default"
     */
    variant?: 'default' | 'primary' | 'success' | 'danger' | 'dark' | 'info' | 'warning';

    /**
     * Whether the badge is visually outlined.
     * @default 'false'
     */
    isOutline?: boolean;

    /**
     * Whether the badge is light mode
     * @default 'false'
     */
    isLight?: boolean;

    /**
     * Whether the badge has de-emphasized (ghost) styles.
     * @default 'false'
     */
    isGhost?: boolean;

    /** The badge's icon (svg path). */
    icon?: string;

    /** Avatar of the badge */
    avatar?: AvatarProps['image'];

    /** The badge's label */
    children?: string | number;

    /** Whether the badge is dismissible */
    isDismissible?: boolean;

    /**
     * Handler that is called when the badge is dismissed.
     * Whether the badge can be dismissed is determined by this value
     */
    onDismiss?: () => void;
  };

const ROOT = makeRootClassName('Badge');
const el = makeElementClassNameFactory(ROOT);

const PolymorphicBadge = React.forwardRef(function PolymorphicBadge(
  { as: Comp = 'div', ...props },
  forwardedRef
) {
  return <Comp {...props} ref={forwardedRef} />;
}) as ForwardRefComponent<'div', unknown>;

const DEFAULT_PROPS = {
  size: 'medium',
  variant: 'default',
  isOutlined: false,
  isLight: false,
  isGhost: false,
} as const;


function Badge(
  props: BadgeProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLDivElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  const isInteractive = !!p.onDismiss;
  const { buttonProps, isPressed } = useButton(p, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const interactiveProps = isInteractive ? [buttonProps, hoverProps] : [];
  const behaviorProps = mergeProps(...interactiveProps);

  console.log(isInteractive, isHovered)
  return (
    <PolymorphicBadge
      as={isInteractive ? 'button' : 'div'}
      {...behaviorProps}
      className={clsx([
        `${ROOT} size-${p.size} variant-${p.variant}`,
        {
          'is-outline': p.isOutline,
          'is-light': p.isLight,
          'is-ghost': p.isGhost,
          'has-icon': p.icon,
          'has-avatar': p.avatar,
          'has-trailing-icon': p.isDismissible,
          'is-interactive': isInteractive,
          'is-hovered': isHovered,
          'is-pressed': isPressed,
        },
        p.className,
      ])}
    >
      {p.icon && <Icon className={el`icon`} content={p.icon} size="custom" />}
      {p.avatar && <Avatar image={p.avatar} size="custom" className={el`avatar`} />}
      {p.children}
      {p.isDismissible && (
        <DismissButton
          onPress={p.onDismiss}
          size='custom'
          className={el`dismiss-button`}
        />
      )}
    </PolymorphicBadge>
  );
}

export default Badge;
