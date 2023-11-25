import { forwardRef, memo } from "react";
import { useMemo } from "react";
import React from "react";
import { AvatarIcon, useAvatar, Image, Avatar } from "@nextui-org/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MemoizedDiv = memo(function Div({ children, ...props }) {
 return <div {...props}>{children}</div>;
});

const MemoizedSpan = memo(function Span({ children, ...props }) {
 return <span {...props}>{children}</span>;
});

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
      <MemoizedDiv
        aria-label={ariaLabel}
        className={slots.fallback({ class: classNames?.fallback })}
        role="img"
      >
        {fallbackComponent}
      </MemoizedDiv>
    );
  }

  return name ? (
    <MemoizedSpan
      aria-label={ariaLabel}
      className={slots.name({ class: classNames?.name })}
      role="img"
    >
      {getInitials(name)}
    </MemoizedSpan>
  ) : (
    <MemoizedSpan
      aria-label={ariaLabel}
      className={slots.icon({ class: classNames?.icon })}
      role="img"
    >
      {icon}
    </MemoizedSpan>
  );
 }, [showFallback, src, fallbackComponent, name, classNames]);

 return (
  <MemoizedDiv {...getAvatarProps()}>
    {src && (
       <Avatar
       alt="NextUI hero Image with delay"
       className="object-cover rounded-xl"
       src={props.imagen}
       effect="blur"
       delayMethod="debounce"
       delayTime={300}
       placeholderSrc={props.imagen}
       useIntersectionObserver={true}
       visibleByDefault = {true}
       {...getImageProps()}
     />
       
      
    )}
    {fallback}
  </MemoizedDiv>
 );
});

MyAvatar.displayName = "MyAvatar";

export default MyAvatar;
