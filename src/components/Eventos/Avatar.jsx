import { forwardRef } from "react";
import { useMemo } from "react";
import React from "react";
import { AvatarIcon, useAvatar, Image } from "@nextui-org/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyAvatar = forwardRef((props, ref) => {
  const {
    src,
    icon = <AvatarIcon />,
    alt,
    classNames,
    slots,
    name,
    showFallback,
    fallback: fallbackComponent,
    getInitials,
    getAvatarProps,
    getImageProps,
  } = useAvatar({
    ref,
    ...props,
  });

  const fallback = useMemo(() => {
    if (!showFallback && src) return null;

    const ariaLabel = alt || name || "avatar";

    if (fallbackComponent) {
      return (
        <div
          aria-label={ariaLabel}
          className={slots.fallback({ class: classNames?.fallback })}
          role="img"
        >
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span
        aria-label={ariaLabel}
        className={slots.name({ class: classNames?.name })}
        role="img"
      >
        {getInitials(name)}
      </span>
    ) : (
      <span
        aria-label={ariaLabel}
        className={slots.icon({ class: classNames?.icon })}
        role="img"
      >
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, name, classNames]);

  return (
    <div {...getAvatarProps()}>
      {src && (
         <LazyLoadImage
         alt="NextUI hero Image with delay"
         className="object-cover rounded-xl"
         src={props.imagen}
         effect="blur"
         //style={LogoStyle}
         delayMethod="debounce"
         delayTime={300}
         placeholderSrc={props.imagen}
         useIntersectionObserver={true}
         visibleByDefault = {true}
         {...getImageProps()}
       />
         
        
      )}
      {fallback}
    </div>
  );
});

MyAvatar.displayName = "MyAvatar";

export default MyAvatar;
